import { useEffect, useState } from 'react'

const KEY = 'nexvault-favorites-v1'
function initial() {
  try { const data = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(data) ? data : [] }
  catch { return [] }
}
export function useFavorites() {
  const [favorites, setFavorites] = useState(initial)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(favorites)) } catch { /* storage disabled */ } }, [favorites])
  const toggle = (id) => setFavorites(list => list.includes(id) ? list.filter(x => x !== id) : [...list,id])
  return { favorites, toggle, isFavorite: (id) => favorites.includes(id) }
}
