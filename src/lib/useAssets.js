import { useEffect, useState } from 'react'

export function useAssets() {
  const [state, setState] = useState({ assets: [], loading: true, error: '' })
  useEffect(() => {
    let active = true
    fetch(`${import.meta.env.BASE_URL}data/assets.json`)
      .then(r => { if (!r.ok) throw new Error('Asset catalog could not be loaded'); return r.json() })
      .then(data => { if (active) setState({assets:data.filter(a=>a.status === 'published').map(a => ({...a, category: a.copyrighted && a.category && !a.category.startsWith('copyrighted/') ? `copyrighted/${a.category}` : a.category})), loading:false, error:''}) })
      .catch(e => {if (active) setState({assets:[],loading:false,error:e.message})})
    return () => { active = false }
  }, [])
  return state
}
