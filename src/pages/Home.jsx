import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronRight, FolderTree } from 'lucide-react'
import AssetCard from '../components/AssetCard'
import CategoryTree from '../components/CategoryTree'
import { SectionHeading, LoadingState, Notice } from '../components/Shared'
import { categories } from '../data/categories'
import { sortAssets } from '../lib/assets'

export default function Home({assets,loading,error,toggleFavorite,isFavorite}) {
  const [selected, setSelected] = useState('3d')
  const active = categories.find(c=>c.slug===selected) || categories[0]
  // New assets are sorted by published date, most recent first.
  const newest = sortAssets(assets,'newest').slice(0,8)
  // This uses the downloads value saved in assets.json, not a live automatic counter.
  const popular = sortAssets(assets,'popular').slice(0,8)
  const cards = list => <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{list.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div>
  return <div className="container-main pt-9 sm:pt-12 animate-fade-in">
    {error&&<div className="mb-7"><Notice>Couldn't load the catalog: {error}</Notice></div>}
    <section aria-labelledby="explore-categories">
      <div className="mb-7"><p className="eyebrow mb-3">PARWANA STORE / CATEGORY DIRECTORY</p><h1 id="explore-categories" className="heading-section">Explore by Category</h1><p className="text-sm text-[#a7a4b8] mt-3 leading-7">Browse game-development assets by type. Select a category to see all its subcategories and assets.</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">{categories.map(c=><Link to={`/category/${c.slug}`} key={c.slug} className="category-tile rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[134px] group" title={`Browse ${c.name} assets`}>
        <span className="rounded-xl w-11 h-11 grid place-items-center" style={{background:`${c.tint}25`, color:c.tint}}><c.Icon size={23}/></span>
        <span className="mt-5 flex items-center justify-between gap-2"><span className="text-white text-[15px] font-extrabold">{c.name}</span><ArrowUpRight size={15} className="text-[#a498bf] group-hover:text-white"/></span>
        <span className="text-[#8f8d9f] text-[11px] leading-4 mt-1">{c.short}</span>
      </Link>)}</div>
      <div className="mt-6 rounded-[20px] overflow-hidden border border-white/[.085] bg-[#151624]">
        <div className="border-b border-white/[.08] px-5 sm:px-6 py-5 flex flex-wrap items-center gap-3 justify-between"><div className="flex items-center gap-2"><FolderTree size={18} className="text-[#ad9eff]"/><h2 className="text-base sm:text-lg font-bold">All Subcategories</h2></div><p className="text-xs text-[#918da5]">Click a name to open its page. Use arrows to expand.</p></div>
        <div className="flex gap-2 overflow-x-auto px-4 sm:px-5 py-4 border-b border-white/[.06]">{categories.map(c=><button type="button" key={c.slug} onClick={()=>setSelected(c.slug)} className={`shrink-0 rounded-lg px-4 py-2.5 text-xs font-bold transition ${selected===c.slug?'bg-[#8c6cf5] text-white':'bg-white/[.055] text-[#bbb5cf] hover:bg-white/10'}`}>{c.name}</button>)}</div>
        <div className="p-4 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3 mb-4"><h3 className="text-white font-bold text-lg">{active.name} <span className="text-[#a6a0b9] font-normal">subcategories</span></h3><Link to={`/category/${active.slug}`} className="text-[#b3a4ff] font-semibold text-xs hover:text-white flex items-center gap-1">View all {active.name}<ChevronRight size={14}/></Link></div>
          {active.children?.length ? <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">{active.children.map(child=><div key={child.slug} className="rounded-xl border border-white/[.07] bg-white/[.025] p-3 sm:p-4"><Link to={`/category/${child.slug}`} className="block mb-2 text-sm font-bold text-white hover:text-[#c1b0ff]">{child.name} <ArrowUpRight size={13} className="inline text-[#9b90ba]"/></Link><CategoryTree items={child.children||[]} defaultExpanded/></div>)}</div> : <p className="text-sm text-[#a5a0b8]">Browse all {active.name} assets from the link above.</p>}
        </div>
      </div>
    </section>
    <section className="section-space"><SectionHeading eyebrow="Freshly added" title="New Assets" description="The most recently published assets appear here automatically based on their publish date." href="/assets?sort=newest" action="See all new assets"/>
      {loading?<LoadingState/>:newest.length?cards(newest):<p className="text-[#a6a1b6] text-sm">No published assets yet.</p>}
    </section>
    <section className="section-space"><SectionHeading eyebrow="Most downloaded" title="Popular Downloads" description="Popular assets ranked by their saved download count." href="/assets?sort=popular" action="See all popular"/>
      {loading?<LoadingState/>:popular.length?cards(popular):<p className="text-[#a6a1b6] text-sm">No published assets yet.</p>}
    </section>
  </div>
}
