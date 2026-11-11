import { Link } from 'react-router-dom'

export default function Brand({small=false}) {
  return <Link to="/" aria-label="Parwana Store home" className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 group">
    <div className={`${small?'w-8 h-8':'w-8 h-8 sm:w-10 sm:h-10'} brand-mark rounded-xl grid place-items-center shadow-[0_0_30px_rgba(139,92,246,.22)]`}>
      <svg viewBox="0 0 40 40" fill="none" className="w-[76%] h-[76%]" aria-hidden="true"><path d="M10 32V8h12c7 0 11 4 11 10 0 7-5 11-12 11h-6" stroke="white" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 12h8M16 18h12" stroke="#DACEFF" strokeWidth="2" strokeLinecap="round"/></svg>
    </div>
    <span className={`${small?'text-lg':'text-[15px] sm:text-xl'} font-extrabold tracking-[-.045em] text-white whitespace-nowrap`}>Parwana <span className="text-[#b49bff]">Store</span></span>
  </Link>
}
