import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart, LockKeyhole } from 'lucide-react'
import Brand from './Brand'

const linkClass = 'block text-[13px] leading-6 text-[#aaa8bd] hover:text-white transition-colors focus-visible:text-white'

const exploreLinks = [
  { label: 'All Assets', to: '/assets' },
  { label: 'New Assets', to: '/assets?sort=newest' },
  { label: 'Popular Downloads', to: '/assets?sort=popular' },
  { label: "Editor's Choice", to: '/' },
  { label: 'Curated Collections', to: '/collections' },
  { label: 'Saved Assets', to: '/favorites' },
]

const categoryLinks = [
  { label: '3D Assets', to: '/category/3d' },
  { label: '2D Assets', to: '/category/2d' },
  { label: 'Audio', to: '/category/audio' },
  { label: 'Tools', to: '/category/tools' },
  { label: 'Visual Effects', to: '/category/vfx' },
  { label: 'Templates', to: '/category/templates' },
  { label: 'SDKs', to: '/category/sdks' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[.07] mt-24 bg-[#0d0d18]">
      <div className="container-main pt-14 pb-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-10 xl:gap-8">
          <div className="xl:col-span-4">
            <Brand small />
            <p className="text-sm text-[#a5a1b7] mt-5 max-w-sm leading-7">
              Explore a thoughtfully organized selection of game-development assets.
              Discover new resources, review detailed previews, and build your next project with confidence.
            </p>
            <div className="inline-flex items-center gap-2 mt-5 px-3 py-2 rounded-full border border-violet-400/20 bg-violet-400/[.055] text-[#c8bcf2] text-xs font-semibold">
              <LockKeyhole size={14} aria-hidden="true" /> Downloads for authorized members
            </div>
          </div>

          <nav aria-label="Explore store" className="xl:col-span-2">
            <h3 className="text-sm font-bold tracking-wide mb-5 text-white">Explore</h3>
            <div className="space-y-2.5">
              {exploreLinks.map(({ label, to }) => (
                <Link key={label} className={linkClass} to={to}>{label}</Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Browse categories" className="xl:col-span-3">
            <h3 className="text-sm font-bold tracking-wide mb-5 text-white">Categories</h3>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {categoryLinks.map(({ label, to }) => (
                <Link key={label} className={linkClass} to={to}>{label}</Link>
              ))}
            </div>
          </nav>

          <div className="xl:col-span-3">
            <h3 className="text-sm font-bold tracking-wide mb-5 text-white">About Parwana Store</h3>
            <p className="text-[13px] leading-7 text-[#aaa8bd]">
              A dedicated place to discover game assets with curated picks,
              helpful previews, and clear testing information. Asset downloads are
              available to authorized members only.
            </p>
            <div className="flex flex-col items-start gap-3 mt-4">
              <Link to="/about" className="inline-flex items-center gap-1.5 text-sm text-[#bbaaff] hover:text-white transition-colors">
                About the Store <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
              <Link to="/members" className="inline-flex items-center gap-1.5 text-sm text-[#bbaaff] hover:text-white transition-colors">
                Membership & Access <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[.08] mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-[12px] text-[#888499]">
          <p>© {new Date().getFullYear()} Parwana Store. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made for creators, with</span>
            <Heart size={12} className="text-violet-400" aria-label="care" />
            <span>and curiosity.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
