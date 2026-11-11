import { useEffect, useMemo, useState } from 'react'
import { ImageOff, ExternalLink } from 'lucide-react'
import { googleDriveFileId, mediaImageCandidates } from '../lib/media'

export default function AssetImage({ src, alt = 'Asset image', className = '', loading = 'lazy', fallbackClassName = '', allowOpenLink = false }) {
  const urls = useMemo(() => mediaImageCandidates(src, import.meta.env.BASE_URL), [src])
  const [attempt, setAttempt] = useState(0)
  useEffect(() => setAttempt(0), [src])
  if (attempt >= urls.length) return <div className={`${className} ${fallbackClassName} flex flex-col items-center justify-center gap-2 bg-[#29243b] text-[#b6afcc] text-center p-3`} role="img" aria-label={`${alt} (not available)`}>
    <ImageOff size={28}/><span className="text-xs font-semibold">Image unavailable</span>
    {allowOpenLink && googleDriveFileId(src) && <a href={src} target="_blank" rel="noreferrer noopener" className="text-[11px] text-[#d0bdff] hover:underline inline-flex items-center gap-1">Open in Drive <ExternalLink size={11}/></a>}
  </div>
  return <img src={urls[attempt]} alt={alt} loading={loading} className={className} onError={() => setAttempt(n => n + 1)} referrerPolicy="no-referrer" />
}
