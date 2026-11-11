import { Link } from 'react-router-dom'
import { ArrowRight, Inbox, LoaderCircle } from 'lucide-react'

export function SectionHeading({ eyebrow, title, description, href, action='View all assets' }) {
  return <div className="flex items-end justify-between gap-4 mb-7">
    <div>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="heading-section">{title}</h2>
      {description && <p className="mt-2.5 text-sm sm:text-base text-[#9b9ab0] max-w-xl">{description}</p>}
    </div>
    {href && <Link className="inline-flex items-center gap-2 text-[12px] sm:text-sm font-semibold text-[#c3b9ff] whitespace-nowrap hover:text-white" to={href}>{action} <ArrowRight size={16}/></Link>}
  </div>
}
export function EmptyState({ title='No matching assets', description='Try adjusting your search or filters.' }) {
  return <div className="rounded-2xl border border-dashed border-white/10 bg-white/[.015] px-5 py-16 text-center"><Inbox className="mx-auto text-[#8278a2]" size={40}/><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="text-sm text-[#9c98ad] mt-2">{description}</p></div>
}
export function LoadingState() {
  return <div className="flex items-center justify-center gap-2 py-24 text-[#b4abc8]"><LoaderCircle size={21} className="animate-spin"/> Loading assets…</div>
}
export function Notice({ children }) { return <div className="rounded-xl border border-amber-300/25 bg-amber-400/[.07] p-4 text-sm text-[#e4d4ae]">{children}</div> }
