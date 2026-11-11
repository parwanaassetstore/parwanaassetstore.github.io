import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Heart, Menu, Search, X, ArrowUpRight } from 'lucide-react'
import Brand from './Brand'
import CategoryTree from './CategoryTree'
import { categories } from '../data/categories'

export default function Header({ savedCount }) {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDesktop, setActiveDesktop] = useState('')
  const [activeMobile, setActiveMobile] = useState('3d')
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {setMobileOpen(false);setActiveDesktop('')}, [location.pathname, location.search])
  useEffect(() => {
    const onEscape = (event) => {if (event.key === 'Escape') {setMobileOpen(false);setActiveDesktop('')}}
    window.addEventListener('keydown',onEscape)
    return () => window.removeEventListener('keydown',onEscape)
  }, [])
  const search = (event) => {event.preventDefault();navigate(`/assets${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);setMobileOpen(false)}
  const selected = categories.find(c => c.slug === activeDesktop)
  return <header className="site-header sticky top-0 z-50 bg-[#0c0d17]/95 border-b border-white/[.08] backdrop-blur-xl">
    <div className="container-main h-[72px] flex items-center gap-4 lg:gap-7">
      <Brand/>
      <form onSubmit={search} className="hidden sm:flex max-w-[570px] flex-1 ml-auto h-11 items-center gap-3 px-4 bg-[#191a28] border border-white/[.09] rounded-xl focus-within:border-[#a28bff] transition" role="search">
        <Search size={18} className="text-[#a09ab7] shrink-0"/>
        <input className="outline-none bg-transparent min-w-0 w-full text-sm text-white placeholder:text-[#78768d]" aria-label="Search assets" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search game assets..."/>
        <button type="submit" className="text-[#b5a6ff] text-xs font-bold hover:text-white">Search</button>
      </form>
      <Link to="/favorites" className="relative header-icon ml-auto sm:ml-0 shrink-0" aria-label={`Saved assets (${savedCount})`}><Heart size={19}/>{savedCount>0&&<span className="absolute -top-1 -right-1 px-1 min-w-4 h-4 text-[9px] bg-violet-600 text-white rounded-full grid place-items-center">{savedCount}</span>}</Link>
      <Link to="/assets" className="hidden md:flex violet-button !py-2.5 !px-4 whitespace-nowrap text-xs">Browse All <ArrowUpRight size={15}/></Link>
      <button type="button" onClick={()=>setMobileOpen(v=>!v)} className="header-icon lg:hidden" aria-expanded={mobileOpen} aria-label={mobileOpen?'Close category menu':'Open category menu'}>{mobileOpen?<X size={21}/>:<Menu size={21}/>}</button>
    </div>
    <div className="hidden lg:block border-t border-white/[.07]" onMouseLeave={()=>setActiveDesktop('')}>
      <nav className="container-main flex items-center gap-1 xl:gap-3 h-[51px]" aria-label="Main categories">
        {categories.map(c=><div key={c.slug} className="h-full flex items-center" onMouseEnter={()=>setActiveDesktop(c.children.length?c.slug:'')}>
          <Link to={`/category/${c.slug}`} className={`top-category-link ${activeDesktop===c.slug?'is-open':''}`}>{c.name}</Link>
          {c.children.length>0&&<button type="button" aria-label={`Show ${c.name} subcategories`} aria-expanded={activeDesktop===c.slug} onClick={()=>setActiveDesktop(v=>v===c.slug?'':c.slug)} className="h-9 w-6 grid place-items-center text-[#9391a5] hover:text-white"><ChevronDown size={13}/></button>}
        </div>)}
        <div className="ml-auto"><Link to="/assets" className="text-[12px] text-[#aaa3c4] hover:text-white font-semibold">All Assets</Link></div>
      </nav>
      {selected?.children?.length>0&&<div className="absolute top-full inset-x-0 bg-[#121320] shadow-[0_30px_65px_#0009] border-y border-violet-400/20" onMouseEnter={()=>setActiveDesktop(selected.slug)}>
        <div className="container-main py-6 max-h-[min(72vh,680px)] overflow-y-auto category-mega-scroll">
          <div className="flex items-center justify-between gap-4 mb-4"><div className="flex gap-3 items-center"><span className="w-9 h-9 rounded-xl grid place-items-center" style={{background:`${selected.tint}24`, color:selected.tint}}><selected.Icon size={19}/></span><div><p className="font-bold text-white text-lg">{selected.name} Categories</p><p className="text-xs text-[#9391a9]">Choose any category to open its page</p></div></div><Link to={`/category/${selected.slug}`} className="text-[#b9a9ff] hover:text-white text-xs font-semibold">View all {selected.name} →</Link></div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">{selected.children.map(child=><div key={child.slug} className="p-3 rounded-xl bg-[#191a2a] border border-white/[.065]"><Link to={`/category/${child.slug}`} className="flex items-center justify-between gap-2 font-bold text-sm text-white mb-2 px-1 py-1 hover:text-[#c3b4ff]">{child.name}<ArrowUpRight size={13} className="text-[#aaa1c2]"/></Link><CategoryTree items={child.children||[]} defaultExpanded/></div>)}</div>
        </div>
      </div>}
    </div>
    {mobileOpen&&<div className="lg:hidden absolute top-full inset-x-0 bg-[#121320] shadow-2xl border-b border-white/10 max-h-[80vh] overflow-y-auto">
      <div className="container-main py-4">
        <form onSubmit={search} className="sm:hidden flex items-center gap-2 px-3 py-3 rounded-xl border border-white/10 bg-white/5 mb-4"><Search size={18} className="text-[#aaa3bc]"/><input className="outline-none bg-transparent flex-1 min-w-0 text-sm" value={query} onChange={e=>setQuery(e.target.value)} aria-label="Search assets" placeholder="Search assets..."/><button type="submit" className="text-[#bbacff] text-sm">Go</button></form>
        <nav aria-label="Mobile categories" className="space-y-2">{categories.map(c=><div key={c.slug} className="border border-white/[.07] rounded-xl overflow-hidden"><div className="flex items-center gap-2 bg-[#1a1b2a] px-3"><Link to={`/category/${c.slug}`} className="font-bold text-sm py-3 flex-1 text-[#f4f1ff]">{c.name}</Link>{c.children.length>0&&<button type="button" onClick={()=>setActiveMobile(v=>v===c.slug?'':c.slug)} aria-expanded={activeMobile===c.slug} aria-label={`Expand ${c.name}`} className="h-10 w-10 grid place-items-center text-[#b4a8dc]"><ChevronDown size={17} className={activeMobile===c.slug?'rotate-180 transition':'transition'}/></button>}</div>{activeMobile===c.slug&&c.children.length>0&&<div className="p-3"><CategoryTree items={c.children} defaultExpanded onNavigate={()=>setMobileOpen(false)}/></div>}</div>)}</nav>
        <Link to="/assets" onClick={()=>setMobileOpen(false)} className="violet-button w-full mt-4">Explore all assets <ArrowUpRight size={15}/></Link>
      </div>
    </div>}
  </header>
}
