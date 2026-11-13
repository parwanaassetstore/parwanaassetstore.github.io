import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  BookmarkCheck,
  Compass,
  Layers3,
  LockKeyhole,
  SearchCheck,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'

const highlights = [
  {
    Icon: Compass,
    title: 'Discover what you need',
    text: 'Explore 3D, 2D, audio, tools, visual effects, templates, and more through an organized asset catalog.',
  },
  {
    Icon: Sparkles,
    title: 'Handpicked recommendations',
    text: "Find new releases, popular assets, and Editor’s Choice selections curated by Parwana Store.",
  },
  {
    Icon: SearchCheck,
    title: 'Explore before you choose',
    text: 'Review asset previews, videos, descriptions, and specifications to find a resource that fits your project.',
  },
]

const capabilities = [
  {
    Icon: BadgeCheck,
    title: 'Clear verification status',
    text: 'Look for Verified by Parwana, Known Issues, or Not Yet Verified labels to understand the testing status of an asset.',
  },
  {
    Icon: Layers3,
    title: 'Available versions',
    text: 'Where multiple versions are provided, authorized members can choose the version they want to download.',
  },
  {
    Icon: BookmarkCheck,
    title: 'Keep your favorites close',
    text: 'Save interesting assets while browsing. Sign in with Google to sync your favorites across devices.',
  },
]

export default function About() {
  return (
    <div className="container-main py-14 sm:py-20 animate-fade-in max-w-6xl">
      <section aria-labelledby="about-heading" className="relative overflow-hidden rounded-3xl border border-white/[.08] bg-[#161524] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-violet-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <p className="eyebrow">ABOUT PARWANA STORE</p>
          <h1 id="about-heading" className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.13] mt-4 max-w-3xl">
            Built for creators.<br />
            <span className="text-[#b29aff]">Made for discovery.</span>
          </h1>
          <p className="text-[#b4afc2] text-base sm:text-lg leading-8 max-w-3xl mt-6">
            Parwana Store helps game developers and creators discover resources for their next project.
            Browse an organized asset library, explore detailed previews, and find selections that match your creative goals.
          </p>
          <p className="text-[#b4afc2] text-sm sm:text-base leading-7 max-w-3xl mt-4">
            Asset information is open to explore. Downloads are reserved for authorized members who sign in with an approved Google account.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link to="/assets" className="violet-button">Explore Assets <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link to="/members" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/[.035] hover:bg-white/[.075] text-sm font-semibold text-[#e4dfff] transition-colors">
              <LockKeyhole size={16} aria-hidden="true" /> Member Access
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14 sm:mt-16" aria-labelledby="discover-heading">
        <p className="eyebrow">DISCOVER WITH CONFIDENCE</p>
        <h2 id="discover-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3">More than a list of assets</h2>
        <p className="text-[#9f9caf] leading-7 text-sm sm:text-base mt-3 max-w-3xl">From discovery to detailed previews, every step is designed to help you make informed choices.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-7">
          {highlights.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-[#181925] p-6">
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 text-[#ad98ff] grid place-items-center"><Icon size={23} aria-hidden="true" /></div>
              <h3 className="font-bold text-lg mt-5">{title}</h3>
              <p className="text-sm text-[#aaa5b7] mt-2 leading-7">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 sm:mt-16" aria-labelledby="features-heading">
        <p className="eyebrow">THOUGHTFUL FEATURES</p>
        <h2 id="features-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-3">A better way to explore</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-7">
          {capabilities.map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-white/[.075] bg-white/[.025] p-6">
              <Icon size={23} className="text-[#b29aff]" aria-hidden="true" />
              <h3 className="font-bold mt-4">{title}</h3>
              <p className="text-sm text-[#a7a2b7] mt-2 leading-7">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 sm:mt-16 rounded-3xl border border-violet-400/20 bg-[#181629] p-6 sm:p-9 flex flex-col md:flex-row gap-6 md:items-center md:justify-between" aria-labelledby="access-heading">
        <div className="flex gap-4 items-start max-w-2xl">
          <div className="shrink-0 w-12 h-12 rounded-2xl grid place-items-center bg-violet-500/10 text-[#b9a8ff]">
            <ShieldCheck size={24} aria-hidden="true" />
          </div>
          <div>
            <h2 id="access-heading" className="text-xl sm:text-2xl font-bold">Ready to access your next asset?</h2>
            <p className="text-[#b0abc0] text-sm leading-7 mt-2">Explore the catalog anytime. To download asset files, sign in and request membership. Access is available after approval.</p>
          </div>
        </div>
        <Link to="/members" className="violet-button shrink-0">Membership & Access <ArrowRight size={17} aria-hidden="true" /></Link>
      </section>
    </div>
  )
}
