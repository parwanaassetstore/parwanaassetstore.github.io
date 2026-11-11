import { useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Boxes, ChevronRight } from 'lucide-react'
import { collections } from '../data/collections'
import { assetImage } from '../lib/assets'
import AssetCard from '../components/AssetCard'
import { LoadingState, EmptyState } from '../components/Shared'

export default function Collections({assets,loading,isFavorite,toggleFavorite}) {
  const location = useLocation()
  useEffect(()=> { if (location.hash) { const target = document.getElementById(location.hash.slice(1)); target?.scrollIntoView({behavior:'smooth',block:'start'}) } },[location.hash,loading])
  const assetBySlug=useMemo(()=>Object.fromEntries(assets.map(a=>[a.slug,a])),[assets])
  return <div className="container-main pt-10 sm:pt-13 animate-fade-in">
    <p className="eyebrow">Made to explore together</p><h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">Curated collections</h1><p className="mt-4 text-sm text-[#aaa5ba] max-w-2xl leading-7">Hand-picked sets of resources to help you get moving on your next great idea.</p>
    {loading?<LoadingState/>:<div className="space-y-14 mt-10">{collections.map(c=>{
      const cover=assetBySlug[c.cover];const items=c.assetIds.map(id=>assetBySlug[id]).filter(Boolean)
      return <section id={c.slug} key={c.slug} className="scroll-mt-28"><div className="rounded-[20px] relative overflow-hidden border border-white/10 min-h-[230px] flex items-end" style={{backgroundImage:cover?`linear-gradient(90deg,#0b0d1efc 0%,#131226ed 42%,#21174050),url('${assetImage(cover)}')`:undefined,backgroundSize:'cover',backgroundPosition:'center'}}><div className="relative z-10 p-7 sm:p-10"><span className="kicker"><Boxes size={12}/> CURATED COLLECTION</span><h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">{c.name}</h2><p className="text-[#c2bdcc] text-sm mt-2 max-w-lg">{c.subtitle}</p><p className="text-[#aa9de4] text-xs font-semibold mt-4">{items.length} assets inside</p></div></div><div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-5">{items.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div></section>
    })}</div>}
  </div>
}
