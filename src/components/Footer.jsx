import { Link } from 'react-router-dom'
import { ArrowUpRight, Github, Heart } from 'lucide-react'
import Brand from './Brand'

export default function Footer() {
  return <footer className="border-t border-white/[.07] mt-24 bg-[#0d0d18]">
    <div className="container-main pt-14 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
        <div><Brand small/><p className="text-sm text-[#918fa5] mt-5 max-w-xs leading-7">A growing library of creative resources for developers, artists and makers. Find inspiration. Build something great.</p></div>
        <div><h3 className="text-sm font-bold tracking-wide mb-5">Discover</h3><div className="grid grid-cols-2 gap-y-3 text-[13px] text-[#aaa8bd]"><Link className="hover:text-white" to="/assets">Explore Assets</Link><Link className="hover:text-white" to="/">Browse Categories</Link><Link className="hover:text-white" to="/category/3d">3D</Link><Link className="hover:text-white" to="/category/audio">Audio</Link><Link className="hover:text-white" to="/category/vfx">Visual Effects</Link><Link className="hover:text-white" to="/favorites">Saved Assets</Link></div></div>
        <div><h3 className="text-sm font-bold tracking-wide mb-5">About Parwana Store</h3><p className="text-[13px] text-[#9a99ac] leading-7">Browse freely. No login required. Asset files are linked from Google Drive when provided by the site owner.</p><Link to="/about" className="mt-4 inline-flex text-sm text-[#bbaaff] gap-1.5 items-center hover:text-white">Learn more <ArrowUpRight size={15}/></Link></div>
      </div>
      <div className="border-t border-white/[.08] mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-[12px] text-[#77768c]"><p>© {new Date().getFullYear()} Parwana Store. Built for creators.</p><div className="flex items-center gap-2"><span>Made with</span><Heart size={12} className="text-violet-400"/><span>and curiosity.</span></div></div>
    </div>
  </footer>
}
