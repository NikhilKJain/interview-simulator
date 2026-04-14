import Link from "next/link";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-white" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              AI-Powered Interview Practice
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
              Ace Your Biotech
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                {" "}Corp Dev{" "}
              </span>
              Interview
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Practice M&A, licensing, and strategic partnership interview questions
              tailored to the life sciences industry. Get instant AI feedback on your
              answers with STAR framework evaluation.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/practice"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-teal-600 to-blue-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 transition-all hover:-translate-y-0.5"
              >
                Start Practicing
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base">Life Sciences Question Bank</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Behavioral, case study, and situational questions covering M&A deal
                evaluation, pipeline analysis, licensing, and regulatory strategy.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base">AI-Powered Feedback</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Get detailed analysis of your answers including STAR framework
                evaluation, strengths, improvement areas, and a model strong answer.
              </p>
            </div>

            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
              <h3 className="font-semibold text-base">Role-Specific Prep</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Paste any biotech/pharma job description and get interview questions
                tailored to that specific role&apos;s requirements and competencies.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-muted/40 border-t">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
            <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Choose Your Focus",
                  desc: "Select a question type and difficulty, or paste a job description for role-specific questions.",
                },
                {
                  step: "2",
                  title: "Answer the Question",
                  desc: "Write a free-form response using the STAR method, or choose from multiple-choice options.",
                },
                {
                  step: "3",
                  title: "Get AI Feedback",
                  desc: "Receive detailed scoring, strengths, improvements, and a model answer to learn from.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm mx-auto">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mt-4">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center text-xs text-muted-foreground">
          BioPrep Interview Simulator — Powered by Claude AI
        </div>
      </footer>
    </>
  );
}
