import { memberSettings } from '../config/memberAccess'

// Apps Script does not expose CORS headers for a normal fetch response.
// A hidden FORM POST sends the ID token in the body; the HTML-service iframe
// returns the result via postMessage. Never put the ID token in a URL / JSONP.
const ALLOWED_RESPONSE_ORIGIN = /^https:\/\/(?:[a-z0-9-]+\.)*(?:googleusercontent\.com|script\.google\.com)$/i

function randomNonce() {
  if (!globalThis.crypto?.getRandomValues) throw new Error('Secure browser required for account sync.')
  const bytes = new Uint8Array(16)
  globalThis.crypto.getRandomValues(bytes)
  return [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join('')
}

export function syncFavoritesGateway(credential, guestIds, changes) {
  return new Promise((resolve, reject) => {
    if (!credential) { reject(new Error('Sign in to sync favorites.')); return }
    const nonce = randomNonce()
    const frameName = `parwana_favorites_${nonce}`
    const frame = document.createElement('iframe')
    frame.name = frameName
    frame.style.cssText = 'display:none;width:0;height:0;border:0'
    frame.setAttribute('aria-hidden', 'true')
    frame.setAttribute('title', 'Favorites sync')
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = memberSettings.appsScriptUrl
    form.target = frameName
    form.style.display = 'none'
    form.referrerPolicy = 'no-referrer'
    let done = false
    let timer
    const cleanup = () => {
      clearTimeout(timer)
      window.removeEventListener('message', receive)
      form.remove()
      frame.remove()
    }
    const finish = (error, result) => {
      if (done) return
      done = true
      cleanup()
      if (error) reject(error)
      else resolve(result)
    }
    const receive = event => {
      if (!ALLOWED_RESPONSE_ORIGIN.test(event.origin)) return
      const data = event.data
      if (!data || data.channel !== 'parwana-favorites-v1' || data.requestId !== nonce) return
      if (!data.ok || !Array.isArray(data.favorites)) {
        finish(new Error(String(data.error || 'Favorites sync failed.')))
        return
      }
      finish(null, data.favorites)
    }
    const add = (key, value) => {
      const input = document.createElement('input')
      input.name = key
      input.type = 'hidden'
      input.value = value
      form.appendChild(input)
    }
    add('action', 'favoritesSync')
    add('credential', credential)
    add('requestId', nonce)
    add('guestIds', JSON.stringify(guestIds))
    add('changes', JSON.stringify(changes))
    window.addEventListener('message', receive)
    document.body.append(frame, form)
    timer = setTimeout(() => finish(new Error('Sync response nahi mili. Retry Sync dabayein.')), 25000)
    try { form.submit() } catch (error) { finish(error) }
  })
}
