import { Cloud, CloudOff, CloudUpload, Heart, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import AssetCard from '../components/AssetCard'
import GoogleMemberButton from '../components/GoogleMemberButton'
import { EmptyState, LoadingState } from '../components/Shared'

export default function Favorites({ assets, loading, favorites, isFavorite, toggleFavorite, syncStatus, syncError, retrySync, loggedIn }) {
  const saved = assets.filter(a => favorites.includes(a.id))
  return <div className="container-main pt-10 sm:pt-13 pb-20 animate-fade-in">
    <p className="eyebrow">Your personal shortlist</p>
    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 flex items-center gap-3">
      <Heart size={30} className="text-[#a18aff]"/> Saved assets
    </h1>
    <p className="mt-4 text-sm text-[#aaa5ba] max-w-3xl leading-7">
      Bina login ke favorites is browser mein save hoti hain. Google Sign in karne par aapki guest list account mein merge ho kar doosre devices par bhi available hoti hai.
    </p>

    <div className="rounded-2xl border border-white/10 bg-[#191827] p-5 sm:p-6 mt-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {syncStatus === 'guest' ? <CloudOff size={22} className="text-violet-300"/> : syncStatus === 'synced' ? <Cloud size={22} className="text-emerald-400"/> : <CloudUpload size={22} className="text-violet-300"/>}
          <div>
            <h2 className="font-bold text-white text-sm sm:text-base">
              {syncStatus === 'guest' ? 'Saved in this browser' : syncStatus === 'synced' ? 'Synced with your Google account' : syncStatus === 'error' ? 'Cloud sync needs attention' : 'Syncing your saved assets…'}
            </h2>
            <p className="text-[#aaa5ba] text-xs mt-1">
              {syncStatus === 'guest' ? 'Sign in to keep this list across your devices.' : syncStatus === 'synced' ? 'Your saved assets are linked to this Google account.' : syncStatus === 'error' ? 'Your recent changes remain on this browser. Retry to save them online.' : 'Your browser favorites and account favorites are being combined.'}
            </p>
          </div>
        </div>
        {loggedIn && <button type="button" onClick={retrySync} className="inline-flex items-center gap-2 text-xs rounded-lg border border-violet-400/30 text-violet-200 py-2.5 px-3 hover:bg-violet-400/10">
          <RefreshCw size={15}/> Sync now
        </button>}
      </div>
      {syncStatus === 'error' && <p role="alert" className="text-amber-200 text-xs mt-4">{syncError}</p>}
      {!loggedIn && <div className="mt-5"><GoogleMemberButton/></div>}
    </div>

    <div className="mt-10">{loading ? <LoadingState/> : saved.length ?
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {saved.map(asset => <AssetCard key={asset.id} asset={asset} isFavorite={isFavorite(asset.id)} toggleFavorite={toggleFavorite}/>)}
      </div> : <div><EmptyState title="No saved assets yet" description="Use the heart icon on any asset to add it to your saved list."/><Link to="/assets" className="violet-button mt-5">Discover assets</Link></div>}
    </div>
  </div>
}
