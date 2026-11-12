import { Link } from 'react-router-dom'
import { ArrowUpRight, Download, Heart, Layers3 } from 'lucide-react'
import { categoryName, formatCount, isCopyrightedAsset } from '../lib/assets'
import AssetImage from './AssetImage'

export default function AssetCard({ asset, isFavorite, toggleFavorite }) {
  return <article className="asset-card group relative min-w-0 overflow-hidden rounded-[17px] border border-white/[.085] bg-[#171824] transition duration-300 hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_20px_45px_rgba(0,0,0,.26)]">
    <Link to={`/asset/${asset.slug}`} className="block relative aspect-[1.48] overflow-hidden bg-[#27223c]" aria-label={`View ${asset.title}`}>
      <AssetImage src={asset.image} alt={`${asset.title} artwork`} className="h-full w-full object-cover duration-500 transition group-hover:scale-[1.06]"/>
      <span className="absolute top-3 left-3 rounded-md bg-[#121325]/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 text-[10px] tracking-wide font-bold text-[#d9d1fe]">{categoryName(asset.category)}</span>
      {isCopyrightedAsset(asset)&&<span className="absolute left-3 bottom-3 rounded-md bg-rose-900/85 border border-rose-400/30 px-2 py-1 text-[9px] font-bold text-rose-100">Copyrighted</span>}
      <span className="absolute bottom-3 right-3 rounded-md bg-[#151521]/85 border border-white/10 backdrop-blur px-2 py-1 text-[10px] font-bold tracking-wide text-[#95f2c8]">FREE</span>
      <span className="absolute bottom-3 left-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition rounded-full bg-white/90 text-[#171521] p-2"><ArrowUpRight size={16}/></span>
    </Link>
    <button aria-label={isFavorite?'Remove from favorites':'Save to favorites'} aria-pressed={isFavorite} onClick={()=>toggleFavorite(asset.id)} className={`absolute top-3 right-3 rounded-full w-9 h-9 flex items-center justify-center backdrop-blur-md border border-white/10 transition z-10 ${isFavorite ? 'text-[#ff85a9] bg-[#292036]' : 'text-white bg-[#151521]/75 hover:bg-[#2d2844]'}`}><Heart size={17} fill={isFavorite?'currentColor':'none'}/></button>
    <div className="px-4 pt-3.5 pb-4">
      <div className="flex items-center gap-2 mb-1.5"><span className="text-[10px] uppercase tracking-[.11em] font-semibold text-[#a797ff]">{asset.publisher}</span></div>
      <Link to={`/asset/${asset.slug}`} className="block text-[14px] sm:text-[15px] font-bold text-[#f6f4ff] leading-snug truncate hover:text-violet-300 transition">{asset.title}</Link>
      <p className="text-[12px] text-[#9696aa] mt-1 leading-relaxed min-h-[35px] line-clamp-2">{asset.subtitle}</p>
      <div className="border-t border-white/[.065] pt-3.5 mt-3.5 flex justify-between items-center gap-1 text-[11px] text-[#9f9eb4]">
        <span className="inline-flex items-center gap-1.5"><Layers3 size={13}/> {asset.format}</span>
        <span className="inline-flex items-center gap-1.5" title="Approved download-link clicks (updates periodically)"><Download size={13}/> {formatCount(asset.downloads)}</span>
      </div>
    </div>
  </article>
}
