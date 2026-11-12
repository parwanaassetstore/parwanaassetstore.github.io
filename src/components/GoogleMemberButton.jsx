import { useEffect, useRef } from 'react'
import { useMemberAccess } from '../lib/useMemberAccess'

export default function GoogleMemberButton() {
  const div = useRef(null)
  const { configured, googleReady, profile, signOut } = useMemberAccess()
  useEffect(() => {
    if (!configured || !googleReady || !div.current || profile) return
    div.current.textContent = ''
    window.google?.accounts?.id?.renderButton(div.current, {theme:'filled_black', size:'large', text:'signin_with', shape:'pill'})
  }, [configured, googleReady, profile])
  if (!configured) return <p className="text-xs leading-6 text-amber-200">Member downloads abhi setup hone baqi hain. Admin ko Google Login aur Apps Script configure karna hoga.</p>
  if (profile) return <div className="flex flex-wrap items-center gap-3 text-xs text-[#b9b3ca]"><span className="break-all">Signed in: <b className="text-white">{profile.email}</b></span><button type="button" className="text-[#c5b6ff] underline" onClick={signOut}>Sign out</button></div>
  return <div className="space-y-2"><div ref={div} aria-label="Sign in with Google"/>{!googleReady && <p className="text-xs text-[#b1a9bf]">Loading Google sign-in…</p>}</div>
}
