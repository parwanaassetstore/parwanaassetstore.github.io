// Google Drive sharing links are VIEW links, not direct image links.
// Try a public Google thumbnail endpoint first, then a public image endpoint.
// Both are best-effort: Google Drive is not a guaranteed public image CDN.
export function googleDriveFileId(input) {
  if (!input || typeof input !== 'string') return ''
  try {
    const url = new URL(input)
    if (!['drive.google.com', 'www.drive.google.com', 'docs.google.com'].includes(url.hostname)) return ''
    const match = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/)
    const id = match?.[1] || url.searchParams.get('id') || ''
    return /^[a-zA-Z0-9_-]{10,}$/.test(id) ? id : ''
  } catch { return '' }
}
export function mediaImageCandidates(input, baseUrl = '/') {
  if (!input || typeof input !== 'string') return []
  const path = input.trim()
  const id = googleDriveFileId(path)
  if (id) return [
    `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600`,
    `https://lh3.googleusercontent.com/d/${encodeURIComponent(id)}=w1600`
  ]
  if (/^https:\/\//i.test(path)) return [path]
  if (/^https?:\/\//i.test(path) || /^(javascript|data):/i.test(path)) return []
  return [`${baseUrl}${path.replace(/^\/+/, '')}`]
}
export function youtubeVideoId(input) {
  if (!input || typeof input !== 'string') return ''
  try {
    const url = new URL(input)
    const host = url.hostname.toLowerCase()
    let id = ''
    if (host === 'youtu.be' || host === 'www.youtu.be') id = url.pathname.split('/')[1]
    else if (['youtube.com','www.youtube.com','m.youtube.com','www.youtube-nocookie.com','youtube-nocookie.com'].includes(host)) {
      if (url.pathname === '/watch') id = url.searchParams.get('v')
      else if (/^\/(embed|shorts|live)\//.test(url.pathname)) id = url.pathname.split('/')[2]
    }
    return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? id : ''
  } catch {return ''}
}
export const youtubeEmbedUrl = input => {
  const id = youtubeVideoId(input)
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : ''
}
