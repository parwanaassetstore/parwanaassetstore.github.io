import { useEffect, useState } from 'react'
import { memberSettings, memberAccessConfigured } from '../config/memberAccess'

export function useAssets() {
  const [state, setState] = useState({ assets: [], loading: true, error: '' })
  useEffect(() => {
    let active = true
    let lastCounts = null
    let script = null
    let callbackName = ''
    const updateStats = () => {
      if (!active || !memberAccessConfigured() || script) return
      callbackName = `__parwanaCounts${Math.floor(Math.random()*1e9)}`
      const key = callbackName
      window[key] = counts => {
        if (!active || !counts || typeof counts !== 'object') return
        lastCounts = counts
        setState(old => ({...old, assets: old.assets.map(a => ({...a, downloads: Object.prototype.hasOwnProperty.call(counts,a.id) ? Math.max(0,Number(counts[a.id]) || 0) : (a.downloads || 0)}))}))
        script?.remove(); script = null; delete window[key]
      }
      script = document.createElement('script')
      script.src = `${memberSettings.appsScriptUrl}?action=stats&callback=${encodeURIComponent(key)}&ts=${Date.now()}`
      script.async = true
      script.onerror = () => {script?.remove(); script=null;delete window[key]}
      document.head.appendChild(script)
    }
    fetch(`${import.meta.env.BASE_URL}data/assets.json`)
      .then(r => { if (!r.ok) throw new Error('Asset catalog could not be loaded'); return r.json() })
      .then(data => {
        if (!active) return
        setState({ assets: data.filter(a=>a.status==='published').map(a => ({
          ...a,
          downloads: lastCounts && Object.prototype.hasOwnProperty.call(lastCounts,a.id) ? Number(lastCounts[a.id]) || 0 : Number(a.downloads) || 0,
          category: a.copyrighted && a.category && !a.category.startsWith('copyrighted/') ? `copyrighted/${a.category}` : a.category
        })), loading: false, error: '' })
        updateStats()
      })
      .catch(e => {if(active)setState({assets:[],loading:false,error:e.message})})
    const refresh = () => updateStats()
    window.addEventListener('focus', refresh)
    const timer = window.setInterval(refresh, 60000)
    return () => {active=false; window.clearInterval(timer); window.removeEventListener('focus',refresh); if(script)script.remove(); if(callbackName)delete window[callbackName]}
  }, [])
  return state
}
