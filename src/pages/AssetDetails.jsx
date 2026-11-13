import { useMemo, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Download, ExternalLink, Heart, Info, Layers3, LockKeyhole, Play, Share2, Tag, Youtube } from 'lucide-react'
import AssetCard from '../components/AssetCard'
import AssetImage from '../components/AssetImage'
import { LoadingState, Notice, SectionHeading } from '../components/Shared'
import { assetCategoryUrl, categoryName, formatCount, isCopyrightedAsset, niceDate } from '../lib/assets'
import GoogleMemberButton from '../components/GoogleMemberButton'
import { useMemberAccess } from '../lib/useMemberAccess'
import { youtubeEmbedUrl, youtubeVideoId } from '../lib/media'

export default function AssetDetails({assets,loading,error,isFavorite,toggleFavorite}) {
  const {slug} = useParams()
  const { configured, profile, submitMemberAction } = useMemberAccess()
  const asset = assets.find(a => a.slug === slug)
  const [activeMedia,setActiveMedia] = useState(0)
  const [isVideoPlaying,setIsVideoPlaying] = useState(false)
  const [copied,setCopied] = useState(false)
  const [activeTab,setActiveTab] = useState('overview')
  useEffect(() => {setActiveMedia(0);setIsVideoPlaying(false);setCopied(false);setActiveTab('overview')},[slug])
  const related = useMemo(() => asset ? assets.filter(a=>a.id!==asset.id && (a.category===asset.category || a.tags?.some(t=>asset.tags?.includes(t)))).slice(0,4) : [],[asset,assets])
  if(loading) return <div className="container-main"><LoadingState/></div>
  if(!asset) return <div className="container-main pt-20"><h1 className="text-3xl font-extrabold">Asset not found</h1><p className="mt-3 text-[#a8a4ba]">This asset may have been removed or unpublished.</p><Link className="violet-button mt-7" to="/assets"><ArrowLeft size={17}/> Browse assets</Link>{error&&<div className="mt-4"><Notice>{error}</Notice></div>}</div>

  const images = [...new Set([asset.image, ...(Array.isArray(asset.gallery) ? asset.gallery : [])].filter(Boolean))]
  const youtubeUrl = asset.youtubeUrl || asset.videoUrl || ''
  const videoId = youtubeVideoId(youtubeUrl)
  const videoEmbed = youtubeEmbedUrl(youtubeUrl)
  const videoThumbnail = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : ''
  // The YouTube preview always comes BEFORE screenshots when a video exists.
  const media = [
    ...(videoEmbed ? [{kind:'video',src:videoEmbed,thumbnail:videoThumbnail}] : []),
    ...images.map((src)=>({kind:'image',src}))
  ]
  const current = media[Math.min(activeMedia,media.length-1)]
  const selectMedia = (index) => {
    setIsVideoPlaying(false) // Unmount the iframe when leaving the video: stops playback.
    setActiveMedia(index)
  }
  const stepMedia = (offset) => {
    setIsVideoPlaying(false)
    setActiveMedia(index => (index + offset + media.length) % media.length)
  }
  const copiedShare = async () => { try {await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),2000)} catch {setCopied(false)} }
  const catUrl = assetCategoryUrl(asset)
  // Original store link is public reference metadata, NEVER the private Drive download link.
  const assetStoreUrl = (typeof asset.assetStoreUrl === 'string' && /^https:\/\//i.test(asset.assetStoreUrl.trim())) ? asset.assetStoreUrl.trim() : ''
  return <div className="container-main pt-9 sm:pt-12 animate-fade-in">
    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#8e899f] mb-7"><Link to="/" className="hover:text-white">Home</Link><ChevronRight size={13}/><Link to="/assets" className="hover:text-white">Assets</Link><ChevronRight size={13}/><Link to={`/category/${catUrl}`} className="hover:text-white">{isCopyrightedAsset(asset)?'Copyrighted / ':''}{categoryName(catUrl)}</Link><ChevronRight size={13}/><span className="text-[#d6d0e3] line-clamp-1">{asset.title}</span></div>
    <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)] gap-8 lg:gap-10">
      <div className="min-w-0">
        <div id="asset-preview-gallery" className="relative bg-[#191627] rounded-[20px] border border-white/10 overflow-hidden">
          {current?.kind === 'video' ? (
            isVideoPlaying ? (
              <div className="aspect-[1.47] w-full bg-black">
                <iframe
                  key={`${slug}-youtube-player`}
                  src={`${current.src}&autoplay=1`}
                  title={`${asset.title} YouTube video preview`}
                  className="w-full h-full"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsVideoPlaying(true)}
                aria-label={`Play YouTube preview for ${asset.title}`}
                className="group relative block w-full aspect-[1.47] overflow-hidden bg-[#151021] text-white"
              >
                <img src={current.thumbnail} alt={`${asset.title} YouTube video thumbnail`} loading="eager"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-300 group-hover:scale-[1.035]"
                  onError={(event) => {event.currentTarget.style.display = 'none'}} />
                <span className="absolute inset-0 bg-gradient-to-t from-[#0d0b18]/80 via-[#0d0b18]/20 to-[#0d0b18]/20" aria-hidden="true" />
                <span className="absolute top-4 left-4 flex items-center gap-2 rounded-lg border border-white/20 bg-[#0b0b16]/75 px-3 py-1.5 text-xs font-bold backdrop-blur"><Youtube size={16} className="text-red-400" /> YouTube preview</span>
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="grid h-[76px] w-[76px] place-items-center rounded-full bg-[#f02742] shadow-[0_12px_42px_#0008] transition-transform group-hover:scale-110"><Play size={32} fill="white" className="ml-1" /></span>
                  <span className="rounded-lg bg-[#0b0b16]/80 px-4 py-2 text-sm font-bold backdrop-blur">Play video preview</span>
                </span>
              </button>
            )
          ) : (
            <AssetImage src={current?.src} alt={`${asset.title} preview image ${activeMedia + 1}`}
              loading="eager" allowOpenLink className="w-full aspect-[1.47] object-contain bg-[#14111e]" />
          )}
          {current?.kind !== 'video' && <span className="absolute left-4 bottom-4 text-[11px] pointer-events-none font-semibold px-3 py-1.5 rounded-lg bg-[#0b0b16]/80 backdrop-blur border border-white/10">Preview image</span>}
          {current?.kind === 'video' && isVideoPlaying && <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-4 z-10 rounded-lg bg-black/75 px-3 py-2 text-xs font-semibold text-white hover:bg-black">Open on YouTube <ExternalLink size={12} className="inline ml-1" /></a>}
          {media.length > 1 && <>
            <button type="button" onClick={() => stepMedia(-1)} aria-label="Previous preview" className="absolute z-10 top-1/2 left-3 -translate-y-1/2 p-2 rounded-full bg-black/70 text-white hover:bg-violet-700"><ChevronLeft size={22}/></button>
            <button type="button" onClick={() => stepMedia(1)} aria-label="Next preview" className="absolute z-10 top-1/2 right-3 -translate-y-1/2 p-2 rounded-full bg-black/70 text-white hover:bg-violet-700"><ChevronRight size={22}/></button>
          </>}
        </div>
        {media.length > 1 && <div className="flex gap-3 mt-3 flex-wrap" role="tablist" aria-label="Asset preview gallery">
          {media.map((entry, i) => <button key={`${entry.src}-${i}`} type="button" onClick={() => selectMedia(i)} role="tab" aria-selected={activeMedia===i}
            aria-label={entry.kind === 'video' ? 'View YouTube video' : `View image ${i + (videoEmbed ? 0 : 1)}`}
            className={`relative rounded-lg overflow-hidden w-24 h-16 border-2 ${activeMedia===i ? 'border-violet-400' : 'border-transparent'} bg-[#242034] hover:border-violet-400/70`}>
            {entry.kind === 'video' ? <>
              <img src={entry.thumbnail} alt="" className="w-full h-full object-cover opacity-80" loading="lazy" onError={(event) => {event.currentTarget.style.display = 'none'}} />
              <span className="absolute inset-0 grid place-items-center bg-black/25"><span className="grid place-items-center rounded-full bg-[#f02742] w-9 h-9 shadow-md"><Play size={17} fill="white" className="ml-0.5 text-white" /></span></span>
            </> : <AssetImage src={entry.src} alt="" className="w-full h-full object-cover" />}
          </button>)}
        </div>}
        <div className="mt-10 border-b border-white/10 flex items-center gap-7" role="tablist" aria-label="Asset information">
          <button type="button" role="tab" id="overview-tab" aria-controls="overview-panel" aria-selected={activeTab==='overview'} onClick={()=>setActiveTab('overview')} className={`tab-link ${activeTab==='overview'?'active':'hover:text-white'}`}>Overview</button>
          <button type="button" role="tab" id="specifications-tab" aria-controls="specifications-panel" aria-selected={activeTab==='specifications'} onClick={()=>setActiveTab('specifications')} className={`tab-link ${activeTab==='specifications'?'active':'hover:text-white'}`}>Specifications</button>
          <button type="button" role="tab" id="asset-store-tab" aria-controls="asset-store-panel" aria-selected={activeTab==='asset-store'} onClick={()=>setActiveTab('asset-store')} className={`tab-link ${activeTab==='asset-store'?'active':'hover:text-white'}`}>Asset Store Page</button>
        </div>
        {activeTab === 'overview' ? (
          <section id="overview-panel" role="tabpanel" aria-labelledby="overview-tab" className="mt-7 prose-details">
            <h2>About this asset</h2>
            <p className="whitespace-pre-line">{asset.description}</p>
            <h2 className="mt-10">What you'll get</h2>
            <p>Review the package format, compatibility and version details before opening its Google Drive download link.</p>
            {videoEmbed && <button type="button" onClick={()=>{selectMedia(0);document.getElementById('asset-preview-gallery')?.scrollIntoView({behavior:'smooth',block:'center'})}} className="mt-4 text-[#c3b5ff] text-sm font-semibold inline-flex items-center gap-2 hover:text-white"><Play size={16}/> Watch video preview</button>}
            <div className="flex flex-wrap gap-2 mt-5">{(asset.tags||[]).map(t=><Link key={t} to={`/assets?q=${encodeURIComponent(t)}`} className="filter-chip"><Tag size={12}/>{t}</Link>)}</div>
          </section>
        ) : activeTab === 'specifications' ? (
          <section id="specifications-panel" role="tabpanel" aria-labelledby="specifications-tab" className="mt-7">
            <h2 className="text-xl font-extrabold mb-5">Technical specifications</h2>
            <div className="rounded-2xl border border-white/10 overflow-hidden">{[['Category',isCopyrightedAsset(asset)?'Copyrighted / '+categoryName(catUrl):categoryName(catUrl)],['File format',asset.format],['Package size',asset.size || 'Not provided'],['Unity version',asset.unityVersion || 'Not specified'],['Render pipeline',asset.pipeline || 'Not specified'],['Asset version',asset.version || 'Not specified'],['Published',niceDate(asset.published)],['Last updated',niceDate(asset.updated || asset.published)]].map(([label,value],i)=><div key={label} className={`grid grid-cols-2 gap-4 px-5 py-3.5 text-[13px] ${i%2?'bg-white/[.025]':'bg-[#141521]'}`}><span className="text-[#9693a9]">{label}</span><span className="text-[#e4e1f0] font-semibold text-right break-words">{value || 'Not specified'}</span></div>)}</div>
          </section>
        ) : (
          <section id="asset-store-panel" role="tabpanel" aria-labelledby="asset-store-tab" className="mt-7">
            <div className="rounded-2xl border border-white/10 bg-[#171824] p-5 sm:p-7">
              {assetStoreUrl ? (
                <>
                  <h2 className="text-xl font-extrabold text-white">Original Asset Store Page</h2>
                  <p className="mt-3 text-sm leading-7 text-[#a9a5bb]">Is asset ki original Asset Store listing neeche diye gaye link par dekh sakte hain. Download ke liye Parwana Store ka members-only section use karein.</p>
                  <a href={assetStoreUrl} target="_blank" rel="noopener noreferrer" className="violet-button mt-6 inline-flex items-center gap-2 max-w-full">
                    Open Original Asset Store Page <ExternalLink size={16} />
                  </a>
                </>
              ) : (
                <div className="rounded-xl border border-white/10 bg-[#0f101a] px-5 py-7 text-center" role="status">
                  <Info size={24} className="mx-auto mb-3 text-[#a995f8]" aria-hidden="true" />
                  <h2 className="text-lg font-bold text-white">Asset Store Page Not Available</h2>
                  <p className="mt-2 text-sm leading-6 text-[#b4aec7]">Is asset ka original Asset Store page link available nahi hai.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
      <aside className="lg:sticky lg:top-[105px] self-start"><div className="rounded-[20px] border border-white/[.1] bg-[#171824] p-6 sm:p-7 shadow-[0_15px_50px_#00000024]">
        <div className="flex items-center justify-between gap-2"><span className="kicker !text-[10px]"><Layers3 size={12}/>{isCopyrightedAsset(asset)?'Copyrighted · ':''}{categoryName(catUrl)}</span><span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-400/10 text-[#dacbff] border border-violet-400/25 text-[11px] font-extrabold px-3 py-1.5 whitespace-nowrap"><LockKeyhole size={13} aria-hidden="true"/> MEMBERS ONLY</span></div>
        <h1 className="mt-5 font-extrabold text-[28px] sm:text-[31px] leading-[1.18] tracking-[-.045em]">{asset.title}</h1><p className="text-[14px] text-[#a4a0b5] mt-3 leading-7">{asset.subtitle}</p>
        <p className="mt-5 text-[12px] text-[#aaa5ba]">by <span className="text-[#c5b8ff] font-semibold">{asset.publisher}</span></p>
        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-[12px] text-[#b6b2c4]"><Download size={15} className="text-[#a48af9]"/> {formatCount(asset.downloads)} downloads</span><span className="text-[12px] text-[#868399]">v{asset.version || '1.0'}</span></div>
        <div className="mt-6 p-4 rounded-xl border border-violet-400/25 bg-[#211e32]">
          <p className="font-bold text-sm text-white flex items-center gap-2"><Download size={16} className="text-[#a791ff]"/> Members-only download</p>
          <p className="text-[12px] mt-2 leading-6 text-[#bab2cb]">Google se login karein. Sirf admin-approved members asset file open kar sakte hain.</p>
          <div className="mt-3"><GoogleMemberButton/></div>
          {configured && profile && <button type="button" onClick={()=>submitMemberAction('download',asset.id)} className="violet-button mt-4 w-full !py-4"><Download size={18}/> Request access / Open Drive file <ExternalLink size={14}/></button>}
          {!profile && <p className="text-[11px] mt-3 text-[#a79dbe]">Naye members <Link to="/members" className="text-[#d3c6ff] underline">Register / Request approval</Link> se application submit kar sakte hain.</p>}
          <p className="text-[11px] mt-3 text-[#a79dbe]">Aapka request ya Drive file ek naye tab mein open hoga. Google Drive file Restricted honi chahiye.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3"><button onClick={()=>toggleFavorite(asset.id)} aria-pressed={isFavorite(asset.id)} className="ghost-button !py-3 text-xs"><Heart size={16} fill={isFavorite(asset.id)?'currentColor':'none'} className={isFavorite(asset.id)?'text-[#ff82a4]':''}/>{isFavorite(asset.id)?'Saved':'Save asset'}</button><button onClick={copiedShare} className="ghost-button !py-3 text-xs">{copied?<Check size={16}/>:<Share2 size={16}/>} {copied?'Copied':'Share'}</button></div>
        <p className="flex gap-2 items-start mt-5 pt-5 border-t border-white/10 text-[11px] leading-5 text-[#9692a9]"><Info size={15} className="shrink-0 mt-0.5"/> Download counts track approved link clicks, not completed transfers. Public Drive preview images are displayed on a best-effort basis.</p>
      </div></aside>
    </div>
    {related.length>0&&<section className="section-space"><SectionHeading eyebrow="More to explore" title="You might also like" description="Keep creating with related assets." href="/assets"/><div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{related.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div></section>}
  </div>
}
