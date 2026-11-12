import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { memberAccessConfigured, memberSettings } from '../config/memberAccess'

const MemberContext = createContext(null)

function decodeProfile(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const parsed = JSON.parse(atob(payload))
    return { email: parsed.email || '', name: parsed.name || parsed.email || '', exp: parsed.exp || 0 }
  } catch { return null }
}

export function MemberProvider({ children }) {
  const [credential, setCredential] = useState('')
  const [googleReady, setGoogleReady] = useState(false)
  const configured = memberAccessConfigured()
  const profile = credential ? decodeProfile(credential) : null

  useEffect(() => {
    if (!configured) return
    let active = true
    const initialize = () => {
      if (!active || !window.google?.accounts?.id) return
      window.google.accounts.id.initialize({
        client_id: memberSettings.googleClientId,
        callback: ({ credential: token }) => {
          if (token) setCredential(token)
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      })
      setGoogleReady(true)
    }
    if (window.google?.accounts?.id) { initialize(); return () => { active = false } }
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.onload = initialize
    script.onerror = () => setGoogleReady(false)
    document.head.append(script)
    return () => { active = false; script.remove() }
  }, [configured])

  const signOut = () => {
    setCredential('')
    if (window.google?.accounts?.id) window.google.accounts.id.disableAutoSelect()
  }

  const submitMemberAction = useCallback((action, assetId = '') => {
    if (!configured || !credential || !profile || profile.exp * 1000 < Date.now()) {
      setCredential('')
      return false
    }
    // A regular browser FORM POST avoids Apps Script CORS issues. The ID token
    // is sent in the POST BODY, never the URL; server verifies it independently.
    const form = document.createElement('form')
    form.action = memberSettings.appsScriptUrl
    form.method = 'POST'
    form.target = '_blank'
    form.style.display = 'none'
    const add = (name, value) => {
      const input = document.createElement('input')
      input.type = 'hidden'; input.name = name; input.value = value
      form.appendChild(input)
    }
    add('action', action); add('credential', credential)
    if (assetId) add('assetId', assetId)
    document.body.appendChild(form)
    form.submit()
    form.remove()
    return true
  }, [configured, credential, profile])

  return <MemberContext.Provider value={{ configured, googleReady, credential, profile, signOut, submitMemberAction }}>
    {children}
  </MemberContext.Provider>
}

export function useMemberAccess() {
  const context = useContext(MemberContext)
  if (!context) throw new Error('Missing MemberProvider')
  return context
}
