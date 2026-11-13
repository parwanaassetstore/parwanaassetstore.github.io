import { useEffect, useMemo, useRef, useState } from 'react'
import { useMemberAccess } from './useMemberAccess'
import { syncFavoritesGateway } from './favoritesGateway'

const LEGACY_KEY = 'nexvault-favorites-v1'
const GUEST_KEY = 'parwana-guest-favorites-v2'
const USER_PREFIX = 'parwana-member-favorites-v2:'
const PENDING_PREFIX = 'parwana-pending-favorite-ops-v2:'
const MAX_FAVORITES = 400
const ID_PATTERN = /^[A-Za-z0-9_-]{2,100}$/

function normalized(value) {
  return Array.isArray(value) ? [...new Set(value.filter(x => typeof x === 'string' && ID_PATTERN.test(x)))].slice(0, MAX_FAVORITES) : []
}
function readArray(key) {
  try { return normalized(JSON.parse(localStorage.getItem(key) || '[]')) } catch { return [] }
}
function readChanges(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '{}')
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
    return Object.fromEntries(Object.entries(value).filter(([id,saved]) => ID_PATTERN.test(id) && typeof saved === 'boolean').slice(0, MAX_FAVORITES))
  } catch { return {} }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Private browser / storage unavailable */ }
}
function getGuest() {
  let guest = readArray(GUEST_KEY)
  // Existing V1 favorites are migrated into the guest collection one time only.
  try {
    const old = readArray(LEGACY_KEY)
    if (old.length) {
      guest = normalized([...guest, ...old])
      write(GUEST_KEY, guest)
    }
    localStorage.removeItem(LEGACY_KEY)
  } catch { /* Continue with in-memory favorites */ }
  return guest
}
function applyChanges(ids, changes) {
  const set = new Set(ids)
  for (const [id, saved] of Object.entries(changes)) {
    if (saved) set.add(id)
    else set.delete(id)
  }
  return normalized([...set])
}

export function useFavorites() {
  const { profile, credential, configured } = useMemberAccess()
  const sub = profile?.sub || ''
  const loggedIn = !!sub && configured && profile.exp * 1000 > Date.now()
  const [state, setState] = useState(() => ({ guest:getGuest(), sub:'', account:[], changes:{}, status:'guest', fetched:false, error:'' }))
  const current = useRef(state)
  const inflight = useRef(false)
  const syncInstance = useRef(0)
  const patch = updater => setState(previous => {
    const next = updater(previous)
    current.current = next
    return next
  })

  // Account and guest storage are intentionally separate. Signing into another
  // Google account will never show the prior account's cached favorites.
  useEffect(() => {
    syncInstance.current += 1
    inflight.current = false
    patch(previous => {
      if (!loggedIn) return { ...previous, sub:'', account:[], changes:{}, status:'guest', fetched:false, error:'' }
      return {
        ...previous, sub, account:readArray(USER_PREFIX + sub), changes:readChanges(PENDING_PREFIX + sub),
        status:'syncing', fetched:false, error:''
      }
    })
  }, [sub, loggedIn])

  useEffect(() => { write(GUEST_KEY, state.guest) }, [state.guest])
  useEffect(() => {
    if (!state.sub) return
    write(USER_PREFIX + state.sub, state.account)
    write(PENDING_PREFIX + state.sub, state.changes)
  }, [state.sub, state.account, state.changes])

  const sync = async () => {
    const before = current.current
    if (!loggedIn || before.sub !== sub || inflight.current) return
    if (before.fetched && !before.guest.length && !Object.keys(before.changes).length) return
    inflight.current = true
    const generation = syncInstance.current
    const guestSnapshot = [...before.guest]
    const changesSnapshot = { ...before.changes }
    patch(s => ({ ...s, status:'syncing', error:'' }))
    try {
      const remote = normalized(await syncFavoritesGateway(credential, guestSnapshot, changesSnapshot))
      if (generation !== syncInstance.current || current.current.sub !== sub) return
      patch(s => {
        const remainingChanges = { ...s.changes }
        for (const [id, saved] of Object.entries(changesSnapshot)) {
          if (remainingChanges[id] === saved) delete remainingChanges[id]
        }
        const remainingGuest = s.guest.filter(id => !guestSnapshot.includes(id))
        const account = applyChanges(remote, remainingChanges)
        return { ...s, guest:remainingGuest, account, changes:remainingChanges, status:(remainingGuest.length || Object.keys(remainingChanges).length) ? 'syncing' : 'synced', fetched:true, error:'' }
      })
    } catch (error) {
      if (generation === syncInstance.current) {
        patch(s => ({ ...s, status:'error', error:error.message || 'Cloud sync failed.' }))
      }
    } finally {
      if (generation === syncInstance.current) inflight.current = false
    }
  }

  // Automatically sync after Google sign-in, and after favorite edits.
  useEffect(() => {
    if (!loggedIn || state.sub !== sub || state.status !== 'syncing' || inflight.current) return
    const timeout = setTimeout(() => { void sync() }, 50)
    return () => clearTimeout(timeout)
  }, [loggedIn, sub, state.sub, state.status, state.guest, state.changes, state.fetched, credential])

  const favorites = useMemo(() => {
    if (!loggedIn || state.sub !== sub) return state.guest
    return normalized([...state.account, ...state.guest])
  }, [loggedIn, sub, state])

  const toggle = id => {
    if (!ID_PATTERN.test(String(id))) return
    patch(s => {
      const activeMember = loggedIn && s.sub === sub
      if (!activeMember) {
        const guest = s.guest.includes(id) ? s.guest.filter(x => x !== id) : normalized([...s.guest, id])
        return { ...s, guest }
      }
      const combined = normalized([...s.account, ...s.guest])
      const save = !combined.includes(id)
      const account = save ? normalized([...s.account, id]) : s.account.filter(x => x !== id)
      return { ...s, guest:save ? s.guest : s.guest.filter(x => x !== id), account, changes:{ ...s.changes, [id]:save }, status:'syncing', error:'' }
    })
  }
  const retrySync = () => {
    if (!loggedIn || state.sub !== sub) return
    patch(s => ({ ...s, fetched:false, status:'syncing', error:'' }))
  }
  // Guest changes stay on this device until a verified login + successful sync.
  return { favorites, toggle, isFavorite:id=>favorites.includes(id), syncStatus: loggedIn ? state.status : 'guest', syncError:state.error, retrySync, loggedIn }
}
