import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import AssetCard from '../components/AssetCard'
import { SectionHeading, LoadingState, Notice } from '../components/Shared'
import { categories } from '../data/categories'
import { sortAssets } from '../lib/assets'

export default function Home({assets,loading,error,toggleFavorite,isFavorite}) {
  // New assets are sorted by published date, most recent first.
  const newest = sortAssets(assets,'newest').slice(0,8)
  // When configured, live approved download-click counts come from Apps Script.
  const popular = sortAssets(assets,'popular').slice(0,8)
  const cards = list => <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{list.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div>
  return <div className="container-main pt-9 sm:pt-12 animate-fade-in">
    {error&&<div className="mb-7"><Notice>Couldn't load the catalog: {error}</Notice></div>}
    <section aria-labelledby="explore-categories">
      <div className="mb-7"><p className="eyebrow mb-3">PARWANA STORE / CATEGORY DIRECTORY</p><h1 id="explore-categories" className="heading-section">Explore by Category</h1><p className="text-sm text-[#a7a4b8] mt-3 leading-7">Browse game-development assets by type. Select a category to see all its subcategories and assets.</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">{categories.map(c=><Link to={`/category/${c.slug}`} key={c.slug} className="category-tile rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[134px] group" title={`Browse ${c.name} assets`}>
        <span className="rounded-xl w-11 h-11 grid place-items-center" style={{background:`${c.tint}25`, color:c.tint}}><c.Icon size={23}/></span>
        <span className="mt-5 flex items-center justify-between gap-2"><span className="text-white text-[15px] font-extrabold">{c.name}</span><ArrowUpRight size={15} className="text-[#a498bf] group-hover:text-white"/></span>
        <span className="text-[#8f8d9f] text-[11px] leading-4 mt-1">{c.short}</span>
      </Link>)}</div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[.065] bg-white/[.025] px-4 sm:px-5 py-3.5">
        <p className="text-xs sm:text-sm leading-6 text-[#a9a5ba]">Looking for a specific subcategory? Open the <span className="font-semibold text-[#ded6ff]">3D, 2D, Audio</span> and other menus above.</p>
        <Link to="/assets" className="text-xs sm:text-sm font-semibold text-[#c0b0ff] hover:text-white inline-flex items-center gap-1 shrink-0">Browse all assets <ArrowUpRight size={15}/></Link>
      </div>
    </section>
    <section className="section-space"><SectionHeading eyebrow="Freshly added" title="New Assets" description="The most recently published assets appear here automatically based on their publish date." href="/assets?sort=newest" action="See all new assets"/>
      {loading?<LoadingState/>:newest.length?cards(newest):<p className="text-[#a6a1b6] text-sm">No published assets yet.</p>}
    </section>
    <section className="section-space"><SectionHeading eyebrow="Most downloaded" title="Popular Downloads" description="Popular assets ranked by approved members’ download clicks." href="/assets?sort=popular" action="See all popular"/>
      {loading?<LoadingState/>:popular.length?cards(popular):<p className="text-[#a6a1b6] text-sm">No published assets yet.</p>}
    </section>
  </div>
}
