import { categoryBySlug } from '../data/categories'
import { mediaImageCandidates } from './media'

export const absoluteAssetUrl = (path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return `${import.meta.env.BASE_URL}${String(path).replace(/^\//, '')}`
}

export const assetImage = (asset) => mediaImageCandidates(asset?.image, import.meta.env.BASE_URL)[0] || ''
export const isCopyrightedAsset = asset => Boolean(asset?.copyrighted || asset?.category?.startsWith('copyrighted/'))
export const assetCategoryUrl = asset => asset?.category?.startsWith('copyrighted/') ? asset.category : (asset?.copyrighted ? `copyrighted/${asset.category}` : asset?.category || '')
export const categoryName = (slug) => categoryBySlug[slug]?.name || slug
export const formatCount = (n) => new Intl.NumberFormat('en-US', {notation: 'compact', maximumFractionDigits: 1}).format(n || 0)
export const isDownloadReady = (a) => Boolean(a?.downloadUrl && (/^https:\/\//i.test(a.downloadUrl) || /^demo\//.test(a.downloadUrl)))
export const assetDownloadUrl = (a) => isDownloadReady(a) ? absoluteAssetUrl(a.downloadUrl) : ''
export const niceDate = (date) => {
  if (!date) return '—'
  const d = new Date(`${date}T00:00:00`)
  return Number.isNaN(d.getTime()) ? date : d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })
}
export const containsText = (asset, search) => {
  const query = search.trim().toLowerCase()
  if (!query) return true
  const haystack = [asset.title, asset.subtitle, asset.description, asset.category, (categoryBySlug[asset.category]?.name || ''), (isCopyrightedAsset(asset) ? 'Copyrighted' : ''), asset.publisher, asset.format, ...(asset.tags || [])].join(' ').toLowerCase()
  return query.split(/\s+/).every(word => haystack.includes(word))
}
export const sortAssets = (assets, sort) => [...assets].sort((a, b) => {
  if (sort === 'oldest') return a.published.localeCompare(b.published)
  if (sort === 'popular') return (b.downloads || 0) - (a.downloads || 0)
  if (sort === 'az') return a.title.localeCompare(b.title)
  if (sort === 'updated') return (b.updated || b.published).localeCompare(a.updated || a.published)
  return b.published.localeCompare(a.published)
})
