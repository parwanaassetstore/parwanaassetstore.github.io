import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import AssetCard from '../components/AssetCard'
import { EmptyState, LoadingState, Notice } from '../components/Shared'
import { categories, categoryBySlug } from '../data/categories'
import { containsText, sortAssets } from '../lib/assets'

const PAGE_SIZE = 8
export default function Browse({assets,loading,error,isFavorite,toggleFavorite}) {
  const {category:routeCategory} = useParams()
  const [params] = useSearchParams()
  const navigate=useNavigate()
  const selectedCategory = params.get('category') || routeCategory || ''
  const searchQuery = params.get('q') || ''
  const selectedFormat = params.get('format') || ''
  const selectedPipeline = params.get('pipeline') || ''
  const sort = params.get('sort') || 'newest'
  const page = Math.max(1, Number.parseInt(params.get('page') || '1',10) || 1)
  const [draft,setDraft] = useState(searchQuery)
  const [mobileFilters,setMobileFilters] = useState(false)
  useEffect(()=>setDraft(searchQuery),[searchQuery])
  const formats = [...new Set(assets.map(a=>a.format))].sort()
  const pipelines = ['Any','Built-in','URP','HDRP']
  const update = (patch) => {
    const next = new URLSearchParams(params)
    // Category routes are normalized to /assets so every filter becomes shareable.
    if (routeCategory && !params.has('category')) next.set('category',routeCategory)
    for (const [key,val] of Object.entries(patch)) { if (!val) next.delete(key); else next.set(key,String(val)) }
    if (!('page' in patch)) next.delete('page')
    const qs=next.toString()
    navigate(`/assets${qs ? `?${qs}` : ''}`)
  }
  const clear = () => navigate('/assets')
  const results=useMemo(()=>sortAssets(assets.filter(a=>
    (!selectedCategory||a.category===selectedCategory) &&
    (!selectedFormat||a.format===selectedFormat) &&
    (!selectedPipeline||a.pipeline===selectedPipeline) &&
    containsText(a,searchQuery)
  ),sort),[assets,selectedCategory,selectedFormat,selectedPipeline,searchQuery,sort])
  const totalPages = Math.max(1,Math.ceil(results.length/PAGE_SIZE))
  const currentPage = Math.min(page,totalPages)
  const visible = results.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE)
  const searchSubmit=(e)=>{e.preventDefault();update({q:draft})}
  const hasFilters=Boolean(selectedCategory||selectedFormat||selectedPipeline||searchQuery)
  return <div className="container-main pt-10 sm:pt-13 animate-fade-in">
    <div className="text-[12px] text-[#858197] mb-5"><Link to="/" className="hover:text-white">Home</Link><span className="mx-2">/</span><span className="text-[#d0c8ed]">{selectedCategory && categoryBySlug[selectedCategory] ? categoryBySlug[selectedCategory].name : 'Browse Assets'}</span></div>
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow mb-3">THE COMPLETE CATALOG</p><h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-.055em]">{selectedCategory && categoryBySlug[selectedCategory] ? `${categoryBySlug[selectedCategory].name} Assets` : 'Explore all assets'}</h1><p className="mt-3 text-sm text-[#aaa8bc]">Find exactly what you need for your next project.</p></div><span className="rounded-full border border-white/10 px-4 py-2 text-xs text-[#a5a2b8]">{results.length} {results.length===1?'asset':'assets'} found</span></div>
    <form onSubmit={searchSubmit} role="search" className="flex items-center gap-3 bg-[#191a27] border border-white/[.1] mt-8 rounded-xl h-14 px-4 focus-within:border-violet-400/50"><Search size={19} className="text-[#a7a2b9]"/><input placeholder="Search assets, tags, formats, publishers..." aria-label="Search catalog" value={draft} onChange={e=>setDraft(e.target.value)} className="flex-1 min-w-0 outline-none bg-transparent text-sm placeholder:text-[#878498]"/><button type="submit" className="text-xs font-bold rounded-lg px-4 py-2 bg-[#382d66] text-[#dacfff] hover:bg-[#49377c]">Search</button></form>
    <div className="mt-7 flex items-center justify-between flex-wrap gap-3"><div className="flex gap-2 flex-wrap"><button onClick={()=>setMobileFilters(!mobileFilters)} className="ghost-button !py-2.5 lg:hidden"><SlidersHorizontal size={15}/> Filters {(selectedCategory||selectedFormat||selectedPipeline)?'•':''}</button>{categories.slice(0,6).map(c=><button key={c.slug} onClick={()=>update({category:selectedCategory===c.slug?'':c.slug})} className={`filter-chip ${selectedCategory===c.slug?'active':''}`}>{c.name}</button>)}<Link to="/assets" className="filter-chip hidden sm:inline-flex">All</Link></div><div className="flex items-center gap-2"><span className="text-[#9895a8] text-xs">Sort by</span><select aria-label="Sort assets" className="sidebar-select !w-auto !py-2 !px-3" value={sort} onChange={e=>update({sort:e.target.value})}><option value="newest">Newest</option><option value="popular">Most popular</option><option value="updated">Recently updated</option><option value="az">Name A–Z</option><option value="oldest">Oldest</option></select></div></div>
    <div className="mt-7 flex flex-col lg:flex-row gap-7 lg:gap-8 items-start">
      <aside className={`${mobileFilters?'block':'hidden'} lg:block w-full lg:w-[235px] lg:shrink-0 lg:sticky lg:top-[100px] rounded-2xl lg:rounded-none border lg:border-none border-white/10 bg-[#151622] lg:bg-transparent p-5 lg:p-0`}>
        <div className="flex justify-between items-center mb-6"><h2 className="text-sm font-bold flex gap-2 items-center"><SlidersHorizontal size={15}/> Filters</h2><button onClick={clear} className="text-[11px] text-[#a89bff] hover:text-white flex gap-1 items-center"><RotateCcw size={13}/> Reset</button></div>
        <label className="block text-xs font-bold text-[#d7d3e3] mb-3" htmlFor="category-filter">Category</label><select id="category-filter" className="sidebar-select mb-7" value={selectedCategory} onChange={e=>update({category:e.target.value})}><option value="">All categories</option>{categories.map(c=><option key={c.slug} value={c.slug}>{c.name}</option>)}</select>
        <label className="block text-xs font-bold text-[#d7d3e3] mb-3" htmlFor="format-filter">File format</label><select id="format-filter" className="sidebar-select mb-7" value={selectedFormat} onChange={e=>update({format:e.target.value})}><option value="">Any format</option>{formats.map(f=><option key={f}>{f}</option>)}</select>
        <label className="block text-xs font-bold text-[#d7d3e3] mb-3" htmlFor="pipeline-filter">Render pipeline</label><select id="pipeline-filter" className="sidebar-select mb-7" value={selectedPipeline} onChange={e=>update({pipeline:e.target.value})}><option value="">All pipelines</option>{pipelines.map(f=><option key={f}>{f}</option>)}</select>
        <div className="rounded-xl bg-[#27213a] border border-[#8870cf3b] p-4"><p className="text-xs font-bold text-white">Can't find something?</p><p className="mt-2 text-[11px] leading-5 text-[#b7aec8]">Try a different keyword, reset your filters, or explore a collection.</p><Link to="/collections" className="text-[11px] mt-3 flex items-center gap-1 text-[#c8b5ff]">Browse collections <ArrowRight size={13}/></Link></div>
        {mobileFilters&&<button className="violet-button mt-4 w-full lg:hidden" onClick={()=>setMobileFilters(false)}>Show {results.length} results</button>}
      </aside>
      <div className="flex-1 min-w-0">
        {hasFilters&&<div className="mb-4 flex flex-wrap items-center gap-2"><span className="text-xs text-[#8d8ba0]">Active:</span>{[['q',searchQuery],['category',selectedCategory],['format',selectedFormat],['pipeline',selectedPipeline]].filter(x=>x[1]).map(([key,val])=><button key={key} onClick={()=>update({[key]:''})} className="filter-chip !py-1.5 !text-[11px]">{key==='category'?(categoryBySlug[val]?.name || val):val}<X size={12}/></button>)}<button className="text-[11px] text-[#ad9af6] hover:text-white" onClick={clear}>Clear all</button></div>}
        {error&&<Notice>{error}</Notice>}
        {loading?<LoadingState/>:visible.length?<div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">{visible.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div>:<EmptyState/>}
        {totalPages>1&&<div className="flex items-center justify-center gap-2 mt-10"><button disabled={currentPage===1} onClick={()=>update({page:String(currentPage-1)})} className="ghost-button !p-2.5 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={17}/></button>{Array.from({length:totalPages},(_,i)=><button key={i} onClick={()=>update({page:String(i+1)})} className={`w-10 h-10 rounded-lg text-sm font-bold border ${currentPage===i+1?'bg-violet-600 border-violet-600 text-white':'border-white/10 text-[#b8b4c9] hover:bg-white/10'}`}>{i+1}</button>)}<button disabled={currentPage===totalPages} onClick={()=>update({page:String(currentPage+1)})} className="ghost-button !p-2.5 disabled:opacity-40" aria-label="Next page"><ChevronRight size={17}/></button></div>}
        {!loading&&results.length>0&&<p className="text-center text-[11px] text-[#747187] mt-6">Showing {(currentPage-1)*PAGE_SIZE+1}–{Math.min(results.length,currentPage*PAGE_SIZE)} of {results.length} assets</p>}
      </div>
    </div>
  </div>
}
