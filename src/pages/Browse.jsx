import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import AssetCard from '../components/AssetCard'
import { EmptyState, LoadingState, Notice } from '../components/Shared'
import { allCategories, assetMatchesCategory, categories, categoryBySlug, getAncestors, getCategory } from '../data/categories'
import { containsText, sortAssets } from '../lib/assets'

const PAGE_SIZE = 12
export default function Browse({assets,loading,error,isFavorite,toggleFavorite}) {
  const paramsRoute = useParams()
  const routeCategory = paramsRoute['*'] || paramsRoute.category || ''
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const selectedCategory = params.get('category') || routeCategory || ''
  const selectedNode = getCategory(selectedCategory)
  const ancestors = getAncestors(selectedCategory)
  const searchQuery = params.get('q') || ''
  const selectedFormat = params.get('format') || ''
  const selectedPipeline = params.get('pipeline') || ''
  const sort = params.get('sort') || 'newest'
  const page = Math.max(1, Number.parseInt(params.get('page') || '1',10) || 1)
  const [draft,setDraft] = useState(searchQuery)
  const [mobileFilters,setMobileFilters] = useState(false)
  useEffect(()=>setDraft(searchQuery),[searchQuery])
  const formats = [...new Set(assets.map(a=>a.format))].filter(Boolean).sort()
  const pipelines = ['Any','Built-in','URP','HDRP']
  const update = patch => {
    const next = new URLSearchParams(params)
    if(routeCategory && !params.has('category')) next.set('category',routeCategory)
    Object.entries(patch).forEach(([key,value])=>!value?next.delete(key):next.set(key,String(value)))
    if(!Object.hasOwn(patch,'page'))next.delete('page')
    navigate(`/assets${next.size?'?'+next.toString():''}`)
  }
  const clear = ()=>navigate('/assets')
  const results=useMemo(()=>sortAssets(assets.filter(asset =>
    assetMatchesCategory(asset.category,selectedCategory) &&
    (!selectedFormat||asset.format===selectedFormat) &&
    (!selectedPipeline||asset.pipeline===selectedPipeline) &&
    containsText(asset,searchQuery)
  ),sort),[assets,selectedCategory,selectedFormat,selectedPipeline,searchQuery,sort])
  const totalPages=Math.max(1,Math.ceil(results.length/PAGE_SIZE))
  const currentPage=Math.min(page,totalPages)
  const visible=results.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE)
  const hasFilters=Boolean(selectedCategory||selectedFormat||selectedPipeline||searchQuery)
  return <div className="container-main pt-9 sm:pt-12 animate-fade-in">
    <nav aria-label="Breadcrumb" className="text-[12px] text-[#9b97ad] flex items-center flex-wrap gap-2 mb-5">
      <Link to="/" className="hover:text-white">Home</Link><ChevronRight size={12}/>
      {selectedCategory ? ancestors.map((node,i)=><span key={node.slug} className="inline-flex items-center gap-2"><Link to={`/category/${node.slug}`} className={`${i===ancestors.length-1?'text-[#ddd6ff]':'hover:text-white'}`}>{node.name}</Link>{i!==ancestors.length-1&&<ChevronRight size={12}/>}</span>) : <span className="text-[#ddd6ff]">All Assets</span>}
    </nav>
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow mb-3">PARWANA STORE / ASSET LIBRARY</p><h1 className="text-3xl sm:text-4xl font-extrabold tracking-[-.055em]">{selectedNode?`${selectedNode.name} Assets`:'Explore All Assets'}</h1><p className="mt-3 text-sm leading-6 text-[#a8a4b9]">{selectedNode?'Browse this category and all of its subcategories.':'Explore every published asset in the library.'}</p></div><span className="rounded-full border border-white/10 px-4 py-2 text-xs text-[#aca5be]">{results.length} {results.length===1?'asset':'assets'} found</span></div>
    {selectedNode?.children?.length>0&&<section className="mt-8 rounded-2xl border border-white/[.085] bg-[#161724] p-5 sm:p-6"><h2 className="font-bold text-white mb-4">Browse {selectedNode.name} subcategories</h2><div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">{selectedNode.children.map(child=><Link key={child.slug} to={`/category/${child.slug}`} className="flex items-center justify-between gap-2 rounded-xl bg-white/[.045] border border-white/[.08] py-3 px-4 text-sm text-[#e5e0f5] hover:bg-violet-400/10 hover:border-violet-400/30 transition"><span>{child.name}</span><ChevronRight size={15} className="text-[#b2a3e8] shrink-0"/></Link>)}</div></section>}
    <form onSubmit={event=>{event.preventDefault();update({q:draft})}} role="search" className="flex items-center gap-3 bg-[#191a27] border border-white/[.1] mt-8 rounded-xl h-14 px-4 focus-within:border-violet-400/50"><Search size={19} className="text-[#a7a2b9]"/><input placeholder="Search assets, tags, formats..." aria-label="Search catalog" value={draft} onChange={e=>setDraft(e.target.value)} className="flex-1 min-w-0 outline-none bg-transparent text-sm placeholder:text-[#878498]"/><button type="submit" className="text-xs font-bold rounded-lg px-4 py-2 bg-[#382d66] text-[#dacfff] hover:bg-[#49377c]">Search</button></form>
    <div className="mt-7 flex items-center justify-between flex-wrap gap-3"><div className="flex flex-wrap gap-2"><button onClick={()=>setMobileFilters(!mobileFilters)} className="ghost-button !py-2.5 lg:hidden"><SlidersHorizontal size={15}/> Filters</button>{categories.map(c=><Link key={c.slug} to={`/category/${c.slug}`} className={`filter-chip ${selectedCategory===c.slug?'active':''}`}>{c.name}</Link>)}</div><div className="flex items-center gap-2"><span className="text-[#9895a8] text-xs">Sort by</span><select aria-label="Sort assets" className="sidebar-select !w-auto !py-2 !px-3" value={sort} onChange={e=>update({sort:e.target.value})}><option value="newest">Newest</option><option value="popular">Most popular</option><option value="updated">Recently updated</option><option value="az">Name A–Z</option><option value="oldest">Oldest</option></select></div></div>
    <div className="mt-7 flex flex-col lg:flex-row gap-7 lg:gap-8 items-start">
      <aside className={`${mobileFilters?'block':'hidden'} lg:block w-full lg:w-[250px] lg:shrink-0 lg:sticky lg:top-[145px] rounded-2xl border lg:border-none border-white/10 bg-[#151622] lg:bg-transparent p-5 lg:p-0`}>
        <div className="flex justify-between items-center mb-6"><h2 className="text-sm font-bold flex gap-2 items-center"><SlidersHorizontal size={15}/> Filters</h2><button onClick={clear} className="text-[11px] text-[#a89bff] hover:text-white flex gap-1 items-center"><RotateCcw size={13}/> Reset</button></div>
        <label className="block text-xs font-bold text-[#d7d3e3] mb-3" htmlFor="category-filter">Category / Subcategory</label><select id="category-filter" className="sidebar-select mb-7" value={selectedCategory} onChange={e=>update({category:e.target.value})}><option value="">All categories</option>{allCategories.map(c=><option key={c.slug} value={c.slug}>{'— '.repeat(c.depth)}{c.name}</option>)}</select>
        <label className="block text-xs font-bold text-[#d7d3e3] mb-3" htmlFor="format-filter">File format</label><select id="format-filter" className="sidebar-select mb-7" value={selectedFormat} onChange={e=>update({format:e.target.value})}><option value="">Any format</option>{formats.map(f=><option key={f}>{f}</option>)}</select>
        <label className="block text-xs font-bold text-[#d7d3e3] mb-3" htmlFor="pipeline-filter">Render pipeline</label><select id="pipeline-filter" className="sidebar-select mb-7" value={selectedPipeline} onChange={e=>update({pipeline:e.target.value})}><option value="">All pipelines</option>{pipelines.map(f=><option key={f}>{f}</option>)}</select>
        <div className="rounded-xl bg-[#242038] border border-[#8870cf3b] p-4"><p className="text-xs font-bold text-white">Explore the directory</p><p className="mt-2 text-[11px] leading-5 text-[#b7aec8]">Click a category in the top menu to see its subcategories and assets.</p><Link to="/" className="text-[11px] mt-3 flex items-center gap-1 text-[#c8b5ff]">All categories <ArrowUpRight size={13}/></Link></div>
        {mobileFilters&&<button className="violet-button mt-4 w-full lg:hidden" onClick={()=>setMobileFilters(false)}>Show {results.length} results</button>}
      </aside>
      <div className="flex-1 min-w-0 w-full">
        {hasFilters&&<div className="mb-4 flex flex-wrap items-center gap-2"><span className="text-xs text-[#8d8ba0]">Active:</span>{[['q',searchQuery],['category',selectedCategory],['format',selectedFormat],['pipeline',selectedPipeline]].filter(x=>x[1]).map(([key,val])=><button key={key} onClick={()=>update({[key]:''})} className="filter-chip !py-1.5 !text-[11px]">{key==='category'?(categoryBySlug[val]?.name||val):val}<X size={12}/></button>)}<button className="text-[11px] text-[#ad9af6] hover:text-white" onClick={clear}>Clear all</button></div>}
        {error&&<Notice>{error}</Notice>}
        {loading?<LoadingState/>:visible.length?<div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">{visible.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div>:<EmptyState/>}
        {totalPages>1&&<nav aria-label="Catalog pages" className="flex items-center justify-center gap-2 mt-10"><button disabled={currentPage===1} onClick={()=>update({page:String(currentPage-1)})} className="ghost-button !p-2.5 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={17}/></button>{Array.from({length:totalPages},(_,i)=><button key={i} onClick={()=>update({page:String(i+1)})} className={`w-10 h-10 rounded-lg text-sm font-bold border ${currentPage===i+1?'bg-violet-600 border-violet-600 text-white':'border-white/10 text-[#b8b4c9] hover:bg-white/10'}`}>{i+1}</button>)}<button disabled={currentPage===totalPages} onClick={()=>update({page:String(currentPage+1)})} className="ghost-button !p-2.5 disabled:opacity-40" aria-label="Next page"><ChevronRight size={17}/></button></nav>}
        {!loading&&results.length>0&&<p className="text-center text-[11px] text-[#747187] mt-6">Showing {(currentPage-1)*PAGE_SIZE+1}–{Math.min(results.length,currentPage*PAGE_SIZE)} of {results.length} assets</p>}
      </div>
    </div>
  </div>
}
