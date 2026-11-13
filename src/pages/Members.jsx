import { ShieldCheck, UserPlus, CheckCircle2, Download } from 'lucide-react'
import GoogleMemberButton from '../components/GoogleMemberButton'
import { useMemberAccess } from '../lib/useMemberAccess'

const steps = [
  {
    icon: UserPlus,
    title: '1. Sign in / Register',
    text: 'Apne Google account se sign in karein. Naya member request button ke zariye access request bhej sakta hai.'
  },
  {
    icon: ShieldCheck,
    title: '2. Get approved',
    text: 'Admin approved members ko access deta hai. Approval ke baad protected asset files authorized account ke liye available ho jati hain.'
  },
  {
    icon: Download,
    title: '3. Download assets',
    text: 'Sirf authorized members hi protected asset files download kar sakte hain. Download ke liye approved Google account se login zaroori hai.'
  }
]

export default function Members() {
  const { profile, configured, submitMemberAction } = useMemberAccess()

  return (
    <div className="container-main pt-12 max-w-5xl pb-20">
      <span className="eyebrow">PARWANA STORE MEMBERSHIP</span>
      <h1 className="text-4xl font-extrabold mt-3">Members-only downloads</h1>
      <p className="text-[#a9a4bc] leading-7 mt-4 max-w-4xl">
        Sirf <b>authorized members</b> protected asset files download kar sakte hain.
        Approval ke baad aap apne approved Google account ke zariye members-only downloads access kar sakte hain.
      </p>

      <div className="rounded-3xl bg-[#191827] border border-white/10 p-6 sm:p-8 mt-8">
        <h2 className="font-bold text-xl flex items-center gap-2"><UserPlus size={21}/> Register / Sign in</h2>
        <div className="mt-5"><GoogleMemberButton/></div>
        {profile && configured && (
          <button
            type="button"
            onClick={() => submitMemberAction('request')}
            className="violet-button mt-5 w-full sm:w-auto"
          >
            <ShieldCheck size={18}/> Request membership / Check approval
          </button>
        )}
        <p className="mt-4 text-[#a8a3b9] text-sm leading-6">
          Request button ek naya tab kholega. Admin apni private Google Sheet mein aapka status <b>approved</b> karega,
          uske baad aap approved account se protected asset downloads use kar sakenge.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#10111d] p-6 sm:p-8 mt-7">
        <div className="flex items-start gap-3">
          <div className="w-11 h-11 rounded-2xl grid place-items-center bg-violet-500/10 text-violet-300 shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <h3 className="font-bold text-xl">How member access works</h3>
            <p className="text-sm text-[#a49db6] leading-6 mt-2 max-w-3xl">
              System simple rakha gaya hai: پہلے sign in, پھر approval, aur phir authorized account se members-only downloads.
              Is page par sirf wohi information rakhi gayi hai jo members ke liye useful ho.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl grid place-items-center bg-violet-500/10 text-violet-300">
                  <Icon size={20} />
                </div>
                <h4 className="font-bold mt-4">{step.title}</h4>
                <p className="text-sm text-[#a49db6] leading-6 mt-2">{step.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
