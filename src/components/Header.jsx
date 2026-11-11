import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Heart, Menu, Search, X } from 'lucide-react'
import Brand from './Brand'

const menu = [{label:'Explore',to:'/assets'},{label:'3D Assets',to:'/category/3d'},{label:'2D Assets',to:'/category/2d'},{label:'Audio',to:'/category/audio'},{label:'Tools',to:'/category/tools'},{label:'Collections',to:'/collections'}]

export default function Header({ savedCount }) {
  const [query,setQuery] = useState('')
  const [open,setOpen] = useState(false)
  const navigate=useNavigate()
  const search = (e) => { e.preventDefault(); setOpen(false); navigate(`/assets${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`) }
  return <>
    <div className="announcement text-center text-[11px] sm:text-xs font-medium tracking-wide py-2 px-4 text-[#cec7eb]">✦&nbsp; A curated universe of game-ready assets &nbsp;<Link to="/assets" className="text-white inline-flex gap-1 items-center hover:underline">Explore the library <ArrowUpRight size={12}/></Link></div>
    <header className="site-header sticky top-0 z-50 border-b border-white/[.065] bg-[#0b0c15]/90 backdrop-blur-xl">
      <div className="container-main h-[76px] flex items-center justify-between gap-6">
        <Brand />
        <nav className="hidden xl:flex items-center gap-7 ml-7 whitespace-nowrap" aria-label="Main navigation">
          {menu.map(m=><NavLink key={m.to} to={m.to} className={({isActive})=>`nav-link text-[13px] font-semibold transition ${isActive ? 'text-white' : 'text-[#9293a8] hover:text-white'}`}>{m.label}</NavLink>)}
        </nav>
        <form onSubmit={search} role="search" className="hidden md:flex ml-auto items-center h-10 w-[220px] lg:w-[280px] rounded-xl border border-white/[.08] bg-[#171823] px-3.5 gap-2 focus-within:border-violet-400/60 transition">
          <Search size={16} className="text-[#8f8ba4] shrink-0"/>
          <input value={query} onChange={e=>setQuery(e.target.value)} aria-label="Search assets" placeholder="Search assets..." className="bg-transparent w-full min-w-0 text-[13px] text-white placeholder:text-[#858397] focus:outline-none" />
          <button type="submit" aria-label="Submit search" className="text-[10px] font-semibold text-[#a5a0b5] border border-white/10 bg-white/[.035] rounded px-1.5 py-0.5">↵</button>
        </form>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link to="/favorites" className="relative header-icon" aria-label={`Favorites (${savedCount})`}><Heart size={19}/>{savedCount>0 && <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-0.5 text-[9px] font-bold bg-violet-600 rounded-full text-white grid place-items-center">{savedCount}</span>}</Link>
          <Link to="/assets" className="hidden sm:inline-flex violet-button !py-2.5 !px-4 text-xs">Browse Assets <ArrowUpRight size={14}/></Link>
          <button onClick={()=>setOpen(!open)} className="header-icon xl:hidden" aria-label={open?'Close menu':'Open menu'} aria-expanded={open}>{open?<X size={21}/>:<Menu size={21}/>}</button>
        </div>
      </div>
      {open && <div className="border-t border-white/10 bg-[#10101b] xl:hidden">
        <div className="container-main py-5 space-y-4">
          <form onSubmit={search} role="search" className="flex md:hidden items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-3"><Search size={17} className="text-[#aaa5b9]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search assets..." aria-label="Search assets" className="bg-transparent flex-1 min-w-0 outline-none text-sm"/><button type="submit" aria-label="Search"><ArrowUpRight size={18}/></button></form>
          <nav className="grid grid-cols-2 gap-2">{menu.map(m=><NavLink key={m.to} to={m.to} onClick={()=>setOpen(false)} className="rounded-xl border border-white/[.06] p-3 text-sm text-[#ddd7ec] bg-white/[.025] hover:bg-white/[.07]">{m.label}</NavLink>)}</nav>
        </div>
      </div>}
    </header>
  </>
}
