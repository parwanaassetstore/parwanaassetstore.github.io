import { ShieldCheck, UserPlus, LockKeyhole, Info } from 'lucide-react'
import GoogleMemberButton from '../components/GoogleMemberButton'
import { useMemberAccess } from '../lib/useMemberAccess'

export default function Members() {
  const { profile, configured, submitMemberAction } = useMemberAccess()
  return <div className="container-main pt-12 max-w-4xl pb-20">
    <span className="eyebrow">PARWANA STORE MEMBERSHIP</span>
    <h1 className="text-4xl font-extrabold mt-3">Members-only downloads</h1>
    <p className="text-[#a9a4bc] leading-7 mt-4">Assets ki images, videos aur details sab dekh sakte hain. ZIP aur Unitypackage files sirf approved Google accounts ko milengi.</p>
    <div className="rounded-3xl bg-[#191827] border border-white/10 p-6 sm:p-8 mt-8">
      <h2 className="font-bold text-xl flex items-center gap-2"><UserPlus size={21}/> Register / Sign in</h2>
      <div className="mt-5"><GoogleMemberButton/></div>
      {profile && configured && <button type="button" onClick={()=>submitMemberAction('request')} className="violet-button mt-5 w-full sm:w-auto"><ShieldCheck size={18}/> Request membership / Check approval</button>}
      <p className="mt-4 text-[#a8a3b9] text-sm">Request button ek naya tab kholega. Admin apni private Google Sheet mein status ko <b>approved</b> karke access dega.</p>
    </div>
    <div className="grid sm:grid-cols-2 gap-4 mt-7">
      <div className="p-5 rounded-xl border border-white/10"><LockKeyhole size={21} className="text-violet-400"/><h3 className="font-bold mt-3">Private Google Drive</h3><p className="text-sm text-[#a49db6] leading-6 mt-2">Original asset files Restricted sharing par rakhi jaati hain. Approved user ke Google email ko access diya jata hai.</p></div>
      <div className="p-5 rounded-xl border border-white/10"><Info size={21} className="text-violet-400"/><h3 className="font-bold mt-3">Download count</h3><p className="text-sm text-[#a49db6] leading-6 mt-2">Count approved users ke download-link clicks par barhta hai, file completion par nahi. Repeated clicks ke liye small cooldown hai.</p></div>
    </div>
  </div>
}
