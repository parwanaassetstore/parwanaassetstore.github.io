import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
export default function NotFound(){return <div className="container-main py-28 text-center"><p className="text-[#a78bfa] font-extrabold text-7xl">404</p><h1 className="text-3xl font-extrabold tracking-tight mt-5">We couldn't find that page.</h1><p className="text-[#aaa5b8] mt-3">Let's get you back to exploring.</p><Link to="/" className="violet-button mt-8"><ArrowLeft size={17}/> Back home</Link></div>}
