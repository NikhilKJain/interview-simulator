import Link from "next/link";
import { Header, BottomNav } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-brand-purple pb-24">
        <div className="max-w-lg mx-auto px-4 space-y-6 pt-4">

          {/* Today's Warm-Up Card */}
          <div className="bg-brand-yellow rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-yellow-300/60" />
            <div className="absolute bottom-2 right-8 w-10 h-10 rounded-full bg-yellow-300/40" />
            <div className="relative">
              <h2 className="text-xl font-black text-gray-900 leading-tight">
                today&apos;s warm-up:<br />
                behavioral basics
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Master the &quot;Tell me about yourself&quot; pitch for biotech corp dev in 3 minutes.
              </p>
              <Link
                href="/practice"
                className="inline-block mt-4 bg-gray-900 text-white font-bold text-sm px-6 py-3 rounded-2xl hover:bg-gray-800 transition-colors"
              >
                start session
              </Link>
            </div>
          </div>

          {/* Practice Labs */}
          <div>
            <h3 className="text-white/80 font-bold text-sm mb-3">practice labs</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/practice" className="block">
                <div className="bg-white rounded-3xl p-5 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-[#6C3CE1]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-gray-900">Mock Interview</span>
                </div>
              </Link>
              <Link href="/practice" className="block">
                <div className="bg-brand-green rounded-3xl p-5 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-white">Q&A Bank</span>
                </div>
              </Link>
              <Link href="/practice" className="block">
                <div className="bg-brand-blue rounded-3xl p-5 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-white">Job Match</span>
                </div>
              </Link>
              <Link href="/practice" className="block">
                <div className="bg-white rounded-3xl p-5 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7 text-[#6C3CE1]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm text-gray-900">STAR Method</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Your Metrics */}
          <div>
            <h3 className="text-white/80 font-bold text-sm mb-3">your metrics</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-brand-mint rounded-3xl p-5">
                <div className="w-16 h-16 rounded-full border-4 border-[#6C3CE1] flex items-center justify-center mx-auto mb-2 bg-white">
                  <span className="font-black text-lg text-[#6C3CE1]">--</span>
                </div>
                <p className="text-center text-sm font-bold text-gray-700">avg score</p>
              </div>
              <div className="bg-brand-coral rounded-3xl p-5">
                <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center mx-auto mb-2 bg-white/20">
                  <span className="font-black text-lg text-white">0</span>
                </div>
                <p className="text-center text-sm font-bold text-white">sessions</p>
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <h3 className="text-white/80 font-bold text-sm mb-3">focus areas</h3>
            <div className="space-y-2">
              {["M&A Deal Evaluation", "Pipeline Analysis", "Licensing & Partnerships"].map(
                (area) => (
                  <div
                    key={area}
                    className="bg-white/10 backdrop-blur rounded-2xl px-5 py-4 flex items-center justify-between"
                  >
                    <span className="text-white font-semibold text-sm">{area}</span>
                    <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
