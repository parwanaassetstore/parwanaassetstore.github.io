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
  // Members-only mode: do not publish private file links in a public GitHub JSON.
  if (a.downloadUrl) issues.push(`Asset ${a.slug}: downloadUrl is public! Use Asset Manager V5 → Public assets.json export (removes private links).`)
  if (a.versions !== undefined) {
    if (!Array.isArray(a.versions) || !a.versions.length) issues.push(`Asset ${a.slug}: versions must be a nonempty list`)
    else {
      const used = new Set()
      a.versions.forEach((v, j) => {
        const label = v && typeof v.version === 'string' ? v.version.trim() : ''
        if (!/^[A-Za-z0-9][A-Za-z0-9._+ -]{0,79}$/.test(label)) issues.push(`Asset ${a.slug}: invalid version at index ${j}`)
        if (used.has(label)) issues.push(`Asset ${a.slug}: duplicate version ${label}`)
        used.add(label)
        if (v && (v.downloadUrl || v.driveFileId || v.fileId || v.url || v.link)) issues.push(`Asset ${a.slug}: private version link in PUBLIC assets.json`)
        if (v && Object.keys(v).some(k=>!['version','size'].includes(k))) issues.push(`Asset ${a.slug}: unexpected private/public version field at index ${j}`)
      })
      if (a.versions[0] && a.versions[0].version !== a.version) issues.push(`Asset ${a.slug}: first version must match latest asset.version`)
    }
  }

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
