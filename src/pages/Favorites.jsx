import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import AssetCard from '../components/AssetCard'
import { EmptyState, LoadingState } from '../components/Shared'

export default function Favorites({assets,loading,favorites,isFavorite,toggleFavorite}) {
  const saved=assets.filter(a=>favorites.includes(a.id))
  return <div className="container-main pt-10 sm:pt-13 animate-fade-in"><p className="eyebrow">Your shortlist</p><h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 flex items-center gap-3"><Heart size={30} className="text-[#a18aff]"/> Saved assets</h1><p className="mt-4 text-sm text-[#aaa5ba] max-w-2xl leading-7">Keep your favorite assets close. Your list is saved in this browser, no account required.</p><div className="mt-10">{loading?<LoadingState/>:saved.length?<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">{saved.map(a=><AssetCard key={a.id} asset={a} isFavorite={isFavorite(a.id)} toggleFavorite={toggleFavorite}/>)}</div>:<div><EmptyState title="No saved assets yet" description="Use the heart icon on any asset to add it to your list."/><Link to="/assets" className="violet-button mt-5">Discover assets</Link></div>}</div></div>
}
