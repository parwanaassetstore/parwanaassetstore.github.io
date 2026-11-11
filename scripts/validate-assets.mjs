import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
const here = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(readFileSync(resolve(here, '../public/data/assets.json'), 'utf8'))
const categories = ['3d','2d','audio','vfx','tools','templates','shaders','ui','games']
const fields = ['id','slug','title','subtitle','description','category','image','format','published','status']
const ids = new Set(), slugs = new Set()
let issues = []
if (!Array.isArray(data)) throw new Error('assets.json must contain a JSON array')
for (const [i, a] of data.entries()) {
  for (const f of fields) if (typeof a[f] !== 'string' || !a[f].trim()) issues.push(`Asset ${i+1}: missing/invalid ${f}`)
  if (ids.has(a.id)) issues.push(`Duplicate id: ${a.id}`)
  if (slugs.has(a.slug)) issues.push(`Duplicate slug: ${a.slug}`)
  if (a.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug)) issues.push(`Invalid slug: ${a.slug}`)
  if (a.category && !categories.includes(a.category)) issues.push(`Asset ${a.slug}: invalid category ${a.category}`)
  if (a.status && !['published','draft','archived'].includes(a.status)) issues.push(`Asset ${a.slug}: invalid status`)
  if (a.downloadUrl && !(/^https:\/\//.test(a.downloadUrl) || /^demo\//.test(a.downloadUrl))) issues.push(`Asset ${a.slug}: downloadUrl must be an HTTPS or demo/ URL`)
  if (a.tags && (!Array.isArray(a.tags) || a.tags.some(x=>typeof x!=='string'))) issues.push(`Asset ${a.slug}: tags must be strings`)
  ids.add(a.id); slugs.add(a.slug)
}
if (issues.length) { console.error(issues.join('\n')); process.exit(1) }
console.log(`✓ Catalog valid: ${data.length} assets (${data.filter(x=>x.status==='published').length} published)`)
