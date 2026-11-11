import { useMemo, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clipboard, Download, ExternalLink, FileArchive, Heart, Info, Layers3, Package, Share2, Tag } from 'lucide-react'
import AssetCard from '../components/AssetCard'
import { LoadingState, Notice, SectionHeading } from '../components/Shared'
import { assetDownloadUrl, assetImage, absoluteAssetUrl, categoryName, formatCount, isDownloadReady, niceDate } from '../lib/assets'

export default function AssetDetails({assets,loading,error,isFavorite,toggleFavorite}) {
  const {slug} = useParams()
  const asset = assets.find(a=>a.slug===slug)
  const [activeMedia,setActiveMedia] = useState(0)
  const [copied,setCopied] = useState(false)
  useEffect(()=>{setActiveMedia(0);setCopied(false)},[slug])
  const related = useMemo(()=>asset ? assets.filter(a=>a.id!==asset.id && (a.category===asset.category || a.tags?.some(t=>asset.tags?.includes(t)))).slice(0,4) : [],[asset,assets])
  if(loading) return <div className="container-main"><LoadingState/></div>
  if(!asset) return <div className="container-main pt-20"><h1 className="text-3xl font-extrabold">Asset not found</h1><p className="mt-3 text-[#a8a4ba]">This asset may have been removed or unpublished.</p><Link className="violet-button mt-7" to="/assets"><ArrowLeft size={17}/> Browse assets</Link>{error&&<div className="mt-4"><Notice>{error}</Notice></div>}</div>
  const images = asset.gallery?.length ? asset.gallery : [asset.image]
  const ready = isDownloadReady(asset)
  const share=async()=>{try { await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),2000) } catch {setCopied(false)} }
  return <div className="container-main pt-9 sm:pt-12 animate-fade-in">
    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#8e899f] mb-7"><Link to="/" className="hover:text-white">Home</Link><ChevronRight size={13}/><Link to="/assets" className="hover:text-white">Assets</Link><ChevronRight size={13}/><Link to={`/category/${asset.category}`} className="hover:text-white">{categoryName(asset.category)}</Link><ChevronRight size={13}/><span className="text-[#d6d0e3] line-clamp-1">{asset.title}</span></div>
    <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)] gap-8 lg:gap-10">
      <div className="min-w-0">
        <div className="relative bg-[#191627] rounded-[20px] border border-white/10 overflow-hidden"><img src={absoluteAssetUrl(images[Math.min(activeMedia,images.length-1)])} alt={`${asset.title} preview`} className="w-full aspect-[1.47] object-cover"/><span className="absolute left-4 bottom-4 text-[11px] font-semibold px-3 py-1.5 rounded-lg bg-[#0b0b16]/80 backdrop-blur border border-white/10">Preview image</span></div>
        {images.length>1 && <div className="flex gap-3 mt-3 flex-wrap">{images.map((path,i)=><button key={`${path}-${i}`} onClick={()=>setActiveMedia(i)} aria-label={`View image ${i+1}`} className={`rounded-lg overflow-hidden w-24 h-16 border-2 ${activeMedia===i?'border-violet-400':'border-transparent'}`}><img src={absoluteAssetUrl(path)} alt="" className="w-full h-full object-cover"/></button>)}</div>}
        <div className="mt-10 border-b border-white/10 pb-3 flex items-center gap-7"><span className="tab-link active">Overview</span><a href="#specifications" className="tab-link hover:text-white">Specifications</a></div>
        <div className="mt-7 prose-details"><h2>About this asset</h2><p>{asset.description}</p><h2 className="mt-10">What you'll get</h2><p>Check the file format, compatibility, and version details below before downloading. The asset owner controls the linked Google Drive file and its contents.</p>
          <div className="flex flex-wrap gap-2 mt-5">{(asset.tags||[]).map(t=><Link key={t} to={`/assets?q=${encodeURIComponent(t)}`} className="filter-chip"><Tag size={12}/>{t}</Link>)}</div>
        </div>
        <div id="specifications" className="mt-11 scroll-mt-28"><h2 className="text-xl font-extrabold mb-5">Technical specifications</h2><div className="rounded-2xl border border-white/10 overflow-hidden">{[['File format',asset.format],['Package size',asset.size || 'Not provided'],['Unity version',asset.unityVersion || 'Not specified'],['Render pipeline',asset.pipeline || 'Not specified'],['Asset version',asset.version || 'Not specified'],['Published',niceDate(asset.published)],['Last updated',niceDate(asset.updated || asset.published)]].map(([label,value],i)=><div key={label} className={`grid grid-cols-2 gap-4 px-5 py-3.5 text-[13px] ${i%2?'bg-white/[.025]':'bg-[#141521]'}`}><span className="text-[#9693a9]">{label}</span><span className="text-[#e4e1f0] font-semibold text-right">{value}</span></div>)}</div></div>
      </div>
      <aside className="lg:sticky lg:top-[105px] self-start"><div className="rounded-[20px] border border-white/[.1] bg-[#171824] p-6 sm:p-7 shadow-[0_15px_50px_#00000024]">
        <div className="flex items-center justify-between"><span className="kicker !text-[10px]"><Layers3 size={12}/>{categoryName(asset.category)}</span><span className="rounded-lg bg-emerald-400/10 text-[#7de9b8] border border-emerald-400/20 text-xs font-extrabold px-3 py-1.5">FREE</span></div>
        <h1 className="mt-5 font-extrabold text-[28px] sm:text-[31px] leading-[1.18] tracking-[-.045em]">{asset.title}</h1><p className="text-[14px] text-[#a4a0b5] mt-3 leading-7">{asset.subtitle}</p>
        <p className="mt-5 text-[12px] text-[#aaa5ba]">by <span className="text-[#c5b8ff] font-semibold">{asset.publisher}</span></p>
        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between gap-2"><span className="flex items-center gap-2 text-[12px] text-[#b6b2c4]"><Download size={15} className="text-[#a48af9]"/> {formatCount(asset.downloads)} demo downloads</span><span className="text-[12px] text-[#868399]">v{asset.version || '1.0'}</span></div>
        {ready ? <a href={assetDownloadUrl(asset)} target="_blank" rel="noopener noreferrer" className="violet-button w-full mt-6 !py-4"><Download size={18}/> {/^https:\/\/drive\.google\.com/i.test(asset.downloadUrl)?'Open Google Drive file':'Download asset'} <ExternalLink size={14}/></a> : <button disabled className="w-full rounded-xl mt-6 py-4 flex items-center justify-center gap-2 bg-[#343043] text-[#a9a1c0] text-sm font-bold cursor-not-allowed"><Download size={18}/> Download not available</button>}
        {!ready && <p className="text-[#8e889f] text-[11px] text-center leading-5 mt-3">Demo listing — add a public Google Drive link in <code>assets.json</code> to enable downloads.</p>}
        <div className="grid grid-cols-2 gap-3 mt-3"><button onClick={()=>toggleFavorite(asset.id)} aria-pressed={isFavorite(asset.id)} className="ghost-button !py-3 text-xs"><Heart size={16} fill={isFavorite(asset.id)?'currentColor':'none'} className={isFavorite(asset.id)?'text-[#ff82a4]':''}/>{isFavorite(asset.id)?'Saved':'Save asset'}</button><button onClick={share} className="ghost-button !py-3 text-xs">{copied?<Check size={16}/>:<Share2 size={16}/>} {copied?'Copied':'Share'}</button></div>
        <p className="flex gap-2 items-start mt-5 pt-5 border-t border-white/10 text-[11px] leading-5 text-[#9692a9]"><Info size={15} className="shrink-0 mt-0.5"/> Downloads open the owner's configured file link. No account or payment is required on this site.</p>
      </div></aside>
    </div>
    {related.length>0&&<section className="section-space"><SectionHeading eyebrow="More to explore" title="You might also like" description="Keep creating with related assets." href="/assets"/><div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{related.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div></section>}
  </div>
}
