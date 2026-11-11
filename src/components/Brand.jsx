import { Link } from 'react-router-dom'

export default function Brand({ small = false }) {
  return <Link to="/" aria-label="NexVault home" className="flex shrink-0 items-center gap-2.5 group">
    <div className={`${small ? 'h-8 w-8' : 'h-9 w-9'} brand-mark grid place-items-center rounded-xl shadow-[0_0_28px_rgba(139,92,246,.22)]`}>
      <svg viewBox="0 0 32 32" fill="none" className="h-[70%] w-[70%]" aria-hidden="true">
        <path d="M16 3 28 10v12L16 29 4 22V10L16 3Z" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M4 10 16 17 28 10M16 17v12" stroke="white" strokeWidth="2.2" strokeLinejoin="round"/>
      </svg>
    </div>
    <span className={`${small ? 'text-lg' : 'text-xl'} font-extrabold tracking-[-.055em] text-white`}>NEX<span className="text-violet-400">VAULT</span></span>
  </Link>
}
