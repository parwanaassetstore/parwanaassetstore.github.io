import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import AssetDetails from './pages/AssetDetails'
import Collections from './pages/Collections'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Members from './pages/Members'
import { MemberProvider } from './lib/useMemberAccess'
import NotFound from './pages/NotFound'
import { useAssets } from './lib/useAssets'
import { useFavorites } from './lib/useFavorites'

function ScrollReset() {
  const location = useLocation()
  useEffect(()=>{window.scrollTo({top:0,behavior:'instant'})},[location.pathname])
  return null
}
function Site() {
  const { assets, loading, error } = useAssets()
  const { favorites, toggle, isFavorite, syncStatus, syncError, retrySync, loggedIn } = useFavorites()
  const shared = { assets, loading, error, toggleFavorite: toggle, isFavorite }
  return <div className="min-h-screen flex flex-col">
    <ScrollReset/>
    <Header savedCount={favorites.length}/>
    <main className="flex-1"><Routes>
      <Route path="/" element={<Home {...shared}/>}/>
      <Route path="/assets" element={<Browse {...shared}/>}/>
      <Route path="/category/*" element={<Browse {...shared}/>}/>
      <Route path="/asset/:slug" element={<AssetDetails {...shared}/>}/>
      <Route path="/collections" element={<Collections {...shared}/>}/>
      <Route path="/favorites" element={<Favorites {...shared} favorites={favorites} syncStatus={syncStatus} syncError={syncError} retrySync={retrySync} loggedIn={loggedIn}/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/members" element={<Members/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes></main>
    <Footer/>
  </div>
}

export default function App() {
  // Favorites must be inside MemberProvider so Google account changes are visible.
  return <MemberProvider><Site/></MemberProvider>
}
