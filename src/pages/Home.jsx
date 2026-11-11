import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Box, ChevronRight, Download, Layers3, Search, Sparkles, Zap } from 'lucide-react'
import AssetCard from '../components/AssetCard'
import { SectionHeading, LoadingState, Notice } from '../components/Shared'
import { categories } from '../data/categories'
import { assetImage, formatCount, sortAssets } from '../lib/assets'
import { collections } from '../data/collections'

export default function Home({assets,loading,error,toggleFavorite,isFavorite}) {
  const [query,setQuery] = useState('')
  const navigate = useNavigate()
  const featured = assets.filter(a=>a.featured).slice(0,4)
  const newest = sortAssets(assets,'newest').slice(0,4)
  const popular = sortAssets(assets,'popular').slice(0,4)
  const heroAsset = assets.find(a=>a.slug==='fantasy-village') || assets[0]
  const submitSearch=(e)=>{e.preventDefault();navigate(`/assets${query.trim()?`?q=${encodeURIComponent(query.trim())}`:''}`)}
  return <>
    <section className="container-main pt-7 sm:pt-9 animate-fade-in">
      <div className="hero-stage relative overflow-hidden rounded-[26px] min-h-[520px] lg:min-h-[510px] flex items-center">
        <div className="hero-glow"/>
        <div className="relative z-10 px-6 py-12 sm:px-11 lg:px-16 lg:py-16 w-full lg:w-[57%]">
          <span className="kicker"><Sparkles size={13}/> THE CREATOR'S RESOURCE HUB</span>
          <h1 className="text-[40px] sm:text-[54px] xl:text-[65px] leading-[1.08] font-extrabold tracking-[-.063em] mt-6 max-w-[650px]">Your next big idea <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b29aff] to-[#edbbf0]">starts here.</span></h1>
          <p className="text-[#a9a6bd] text-[14px] sm:text-[16px] mt-5 leading-[1.85] max-w-[485px]">Discover beautiful game-ready assets. From stunning 3D worlds to tools that supercharge your workflow.</p>
          <form role="search" onSubmit={submitSearch} className="mt-8 max-w-[535px] flex items-center gap-3 rounded-xl bg-[#f7f5ff] text-[#29243e] p-1.5 pl-4 shadow-[0_14px_40px_#07061755]">
            <Search size={20} className="text-[#69627f] shrink-0"/>
            <input aria-label="Find game assets" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search 3D models, sounds, tools..." className="min-w-0 flex-1 text-xs sm:text-sm font-medium outline-none bg-transparent placeholder:text-[#89849c]"/>
            <button type="submit" className="violet-button !rounded-[9px] !py-3 !px-3 sm:!px-5"><span className="hidden sm:inline">Explore</span><ArrowRight size={17}/></button>
          </form>
          <div className="flex items-center flex-wrap gap-5 sm:gap-7 mt-9 text-[#a3a0b8] text-[12px]">
            <div className="flex gap-2 items-center"><span className="w-7 h-7 grid place-items-center rounded-lg bg-white/[.08]"><Layers3 size={15} className="text-[#c4b5ff]"/></span><strong className="text-white text-sm">{loading?'—':assets.length}</strong> Assets</div>
            <div className="flex gap-2 items-center"><span className="w-7 h-7 grid place-items-center rounded-lg bg-white/[.08]"><Box size={15} className="text-[#c4b5ff]"/></span><strong className="text-white text-sm">{categories.length}</strong> Categories</div>
            <div className="flex gap-2 items-center"><span className="w-7 h-7 grid place-items-center rounded-lg bg-white/[.08]"><Download size={15} className="text-[#c4b5ff]"/></span> <span>Free to browse</span></div>
          </div>
        </div>
        {heroAsset && <div className="pointer-events-none absolute right-[-55px] bottom-[-55px] lg:right-[2%] lg:bottom-[10%] w-[72%] lg:w-[48%] opacity-[.27] lg:opacity-100">
          <div className="hero-art overflow-hidden rounded-[24px] border border-[#e3caff39] bg-[#251845] p-2.5"><img src={assetImage(heroAsset)} className="aspect-[1.22] object-cover w-full rounded-[17px]" alt=""/><div className="flex justify-between items-center pt-3 px-2 pb-1"><div><p className="text-xs sm:text-sm font-bold text-white">Featured World</p><p className="text-[10px] text-[#c5b5de] mt-0.5">A universe waiting to be built</p></div><span className="rounded-lg bg-[#a18aff30] px-2.5 py-1 text-xs text-[#dbcfff] font-bold">FREE</span></div></div>
          <div className="absolute -top-6 -right-2 bg-[#222036] border border-[#ffffff29] shadow-xl rounded-xl p-3 flex items-center gap-2"><Zap size={17} className="text-[#ffd58c]"/><span className="text-xs text-white font-bold">Made for creators</span></div>
        </div>}
      </div>
    </section>
    <div className="container-main">
      {error && <div className="mt-7"><Notice>Couldn't load the catalog: {error}</Notice></div>}
      <section className="section-space"><SectionHeading eyebrow="Find your inspiration" title="Explore by category" description="Whatever you're building, find the perfect assets to bring it to life." href="/assets" action="Explore everything"/>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">{categories.map(c=><Link to={`/category/${c.slug}`} key={c.slug} className="category-tile p-4 sm:p-5 rounded-2xl group min-h-[155px] flex flex-col justify-between"><div className="rounded-xl w-11 h-11 grid place-items-center" style={{background:`${c.tint}20`}}><c.Icon size={22} style={{color:c.tint}}/></div><div className="flex justify-between items-end gap-2 mt-4"><div><h3 className="font-bold text-[13px] sm:text-sm text-white">{c.name}</h3><p className="text-[11px] mt-1.5 text-[#8e8d9f] leading-snug">{c.short}</p></div><ArrowUpRight size={15} className="text-[#77728d] group-hover:text-white transition shrink-0"/></div></Link>)}</div>
      </section>
      <section className="section-space"><SectionHeading eyebrow="Hand-picked inspiration" title="Featured this week" description="Standout assets worth checking out." href="/assets"/>
        {loading?<LoadingState/>:<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{featured.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div>}
      </section>
      <section className="section-space"><div className="relative overflow-hidden rounded-[23px] border border-[#846fbe55] bg-gradient-to-br from-[#292046] via-[#1c1b35] to-[#121d2d] p-8 sm:p-11 lg:p-12 flex flex-col lg:flex-row justify-between gap-7 lg:items-center"><div className="absolute -top-20 right-[15%] w-[280px] h-[280px] rounded-full bg-[#9c67ff22] blur-[70px]"/><div className="relative"><p className="eyebrow">CRAFT SOMETHING AMAZING</p><h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">One library. Endless possibilities.</h2><p className="text-sm text-[#b3accb] mt-3 max-w-xl leading-7">Explore curated collections that bring together assets for your next creative breakthrough.</p></div><Link to="/collections" className="violet-button relative self-start lg:self-auto whitespace-nowrap">Explore Collections <ArrowRight size={17}/></Link></div></section>
      <section className="section-space"><SectionHeading eyebrow="Fresh from the vault" title="New & noteworthy" description="The latest additions to discover and explore." href="/assets?sort=newest"/>
        {loading?<LoadingState/>:<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{newest.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div>}
      </section>
      <section className="section-space"><SectionHeading eyebrow="Community favorites" title="Popular downloads" description="Frequently explored examples from our demo catalog." href="/assets?sort=popular" action="See all popular"/>
        {loading?<LoadingState/>:<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{popular.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div>}
      </section>
      <section className="section-space"><SectionHeading eyebrow="Curated for your workflow" title="Creative collections" description="Take a shortcut to the assets that go together." href="/collections" action="All collections"/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{collections.map(c=>{const cover=assets.find(a=>a.slug===c.cover);return <Link key={c.slug} to={`/collections#${c.slug}`} className="relative group overflow-hidden min-h-[240px] rounded-2xl border border-white/10 bg-[#1c1930]"><div className="absolute inset-0" style={{backgroundImage:cover?`linear-gradient(0deg,#100f1efa 0%,#16132455 78%),url('${assetImage(cover)}')`:undefined,backgroundSize:'cover',backgroundPosition:'center',transition:'transform .4s'}}/><div className="absolute inset-0 p-6 flex flex-col justify-end"><p className="text-[10px] uppercase font-bold tracking-[.16em] text-[#c8b9ff] mb-2">Curated collection</p><h3 className="text-xl font-extrabold tracking-tight">{c.name}</h3><p className="text-[#c3bdce] text-xs mt-2">{c.assetIds.length} assets <ChevronRight size={14} className="inline"/></p></div></Link>})}</div>
      </section>
    </div>
  </>
}
