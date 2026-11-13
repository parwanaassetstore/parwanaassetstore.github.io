import { BadgeCheck, AlertTriangle, CircleHelp } from 'lucide-react'

/**
 * An admin-managed QA status, not a claim that the site has automated testing.
 * Existing records without testStatus are treated as untested.
 */
export const normalizeTestStatus = (status) => {
  if (status === 'verified') return 'verified'
  if (status === 'issues') return 'issues'
  return 'untested'
}

const appearances = {
  verified: {
    Icon: BadgeCheck,
    title: 'Verified by Parwana',
    classes: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30',
    tooltip: 'Marked tested by Parwana Store (latest asset version)'
  },
  issues: {
    Icon: AlertTriangle,
    title: 'Known Issues',
    classes: 'bg-rose-500/10 text-rose-300 border-rose-400/30',
    tooltip: 'Known errors or compatibility issues reported by Parwana Store'
  },
  untested: {
    Icon: CircleHelp,
    title: 'Not Yet Verified',
    classes: 'bg-slate-400/10 text-slate-300 border-slate-400/25',
    tooltip: 'Parwana Store has not confirmed this asset as tested'
  }
}

export default function VerificationBadge({ status, compact = false }) {
  const state = appearances[normalizeTestStatus(status)]
  const Icon = state.Icon
  return (
    <span
      className={`inline-flex max-w-full items-center gap-1.5 rounded-lg border font-bold tracking-wide ${state.classes} ${compact ? 'text-[10px] leading-4 px-2 py-1' : 'text-[11px] px-3 py-1.5'}`}
      title={state.tooltip}
    >
      <Icon size={compact ? 12 : 14} aria-hidden="true" className="shrink-0" />
      {state.title}
    </span>
  )
}
