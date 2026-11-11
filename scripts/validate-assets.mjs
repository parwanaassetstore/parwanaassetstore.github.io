import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
const here = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(readFileSync(resolve(here, '../public/data/assets.json'), 'utf8'))
const categoryTree = JSON.parse(readFileSync(resolve(here, '../public/data/categories.json'), 'utf8'))
const categories = new Set()
function loadCategories(nodes) { for (const node of nodes) { categories.add(node.slug); loadCategories(node.children || []) } }
loadCategories(categoryTree)
const fields = ['id','slug','title','subtitle','description','category','image','format','published','status']
const isAllowedImage = url => typeof url === 'string' && (/^https:\/\//i.test(url) || /^images\//.test(url))
const youtubeId = url => {
  try {
    const u = new URL(url)
    const host=u.hostname.toLowerCase()
    let id = ''
    if (['youtu.be','www.youtu.be'].includes(host)) id = u.pathname.split('/')[1]
    else if (['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(host)) id = u.pathname === '/watch' ? u.searchParams.get('v') : u.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1]
    return /^[a-zA-Z0-9_-]{11}$/.test(id || '')
  } catch {return false}
}
const ids = new Set(), slugs = new Set()
let issues = []
if (!Array.isArray(data)) throw new Error('assets.json must contain a JSON array')
for (const [i, a] of data.entries()) {
  for (const f of fields) if (typeof a[f] !== 'string' || !a[f].trim()) issues.push(`Asset ${i+1}: missing/invalid ${f}`)
  if (ids.has(a.id)) issues.push(`Duplicate id: ${a.id}`)
  if (slugs.has(a.slug)) issues.push(`Duplicate slug: ${a.slug}`)
  if (a.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug)) issues.push(`Invalid slug: ${a.slug}`)
  if (a.category && !categories.has(a.category)) issues.push(`Asset ${a.slug}: invalid category ${a.category}`)
  if (a.status && !['published','draft','archived'].includes(a.status)) issues.push(`Asset ${a.slug}: invalid status`)
  if (a.downloadUrl && !(/^https:\/\//.test(a.downloadUrl) || /^demo\//.test(a.downloadUrl))) issues.push(`Asset ${a.slug}: downloadUrl must be an HTTPS or demo/ URL`)
  if (a.tags && (!Array.isArray(a.tags) || a.tags.some(x=>typeof x!=='string'))) issues.push(`Asset ${a.slug}: tags must be strings`)
  if (a.image && !isAllowedImage(a.image)) issues.push(`Asset ${a.slug}: image must be https:// or a legacy images/ path`)
  if (a.gallery && (!Array.isArray(a.gallery) || a.gallery.some(x=>!isAllowedImage(x)))) issues.push(`Asset ${a.slug}: gallery images must be HTTPS URLs or images/ paths`)
  if ((a.youtubeUrl || a.videoUrl) && !youtubeId(a.youtubeUrl || a.videoUrl)) issues.push(`Asset ${a.slug}: invalid YouTube URL`)
  if (a.copyrighted !== undefined && typeof a.copyrighted !== 'boolean') issues.push(`Asset ${a.slug}: copyrighted must be true or false`)
  if (a.category?.startsWith('copyrighted/') && a.copyrighted === false) issues.push(`Asset ${a.slug}: copyrighted category conflicts with false flag`)
  ids.add(a.id); slugs.add(a.slug)
}
if (issues.length) { console.error(issues.join('\n')); process.exit(1) }
console.log(`✓ Catalog valid: ${data.length} assets (${data.filter(x=>x.status==='published').length} published)`)
