"use client";

import { Header, BottomNav } from "@/components/Header";
import { CategorySelector } from "@/components/CategorySelector";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";
import { QuestionCard } from "@/components/QuestionCard";
import { AnswerSection } from "@/components/AnswerSection";
import { FeedbackView } from "@/components/FeedbackView";
import { LoadingState } from "@/components/LoadingState";
import { useInterview } from "@/hooks/useInterview";

export default function PracticePage() {
  const {
    state,
    setMode,
    setCategory,
    setDifficulty,
    setJobDescription,
    setAnswerMode,
    setAnswerText,
    setSelectedOption,
    generateQuestion,
    submitAnswer,
    reset,
  } = useInterview();

  const canSubmitAnswer =
    state.answerMode === "free-form"
      ? state.answerText.trim().length > 0
      : state.selectedOption.length > 0;

  const canGenerate =
    state.mode === "category" || state.jobDescription.trim().length > 0;

  return (
    <>
      <Header />
      <main className="flex-1 bg-brand-purple pb-24">
        <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2">
            {(["setup", "answering", "feedback"] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={`h-0.5 w-8 rounded-full ${
                      ["setup", "answering", "feedback"].indexOf(state.step) >= i
                        ? "bg-brand-green"
                        : "bg-white/20"
                    }`}
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    state.step === s
                      ? "bg-brand-yellow text-gray-900 scale-110"
                      : ["setup", "answering", "feedback"].indexOf(state.step) >
                        ["setup", "answering", "feedback"].indexOf(s)
                      ? "bg-brand-green text-white"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {i + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Error display */}
          {state.error && (
            <div className="bg-brand-coral/20 backdrop-blur rounded-2xl p-4">
              <p className="text-sm text-brand-coral font-medium">{state.error}</p>
            </div>
          )}

          {/* Setup Step */}
          {state.step === "setup" && (
            <div className="space-y-5">
              <div className="text-center">
                <h1 className="text-2xl font-black text-white">let&apos;s practice</h1>
                <p className="text-white/50 text-sm mt-1">
                  pick your question type and difficulty
                </p>
              </div>

              {/* Mode toggle */}
              <div className="flex items-center gap-1 rounded-2xl bg-white/10 p-1">
                <button
                  onClick={() => setMode("category")}
                  className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
                    state.mode === "category"
                      ? "bg-white text-[#6C3CE1] shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  by category
                </button>
                <button
                  onClick={() => setMode("job-description")}
                  className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
                    state.mode === "job-description"
                      ? "bg-white text-[#6C3CE1] shadow-md"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  from job description
                </button>
              </div>

              {state.mode === "category" ? (
                <CategorySelector
                  category={state.category}
                  difficulty={state.difficulty}
                  onCategoryChange={setCategory}
                  onDifficultyChange={setDifficulty}
                />
              ) : (
                <JobDescriptionInput
                  value={state.jobDescription}
                  onChange={setJobDescription}
                />
              )}

              <button
                onClick={generateQuestion}
                disabled={state.isGenerating || !canGenerate}
                className="w-full bg-brand-yellow text-gray-900 font-black text-sm py-4 rounded-2xl hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {state.isGenerating ? "generating..." : "generate question"}
              </button>

              {state.isGenerating && <LoadingState type="generating" />}
            </div>
          )}

          {/* Answering Step */}
          {state.step === "answering" && state.currentQuestion && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-black text-white">your question</h1>
                <button
                  onClick={reset}
                  className="text-xs font-bold text-white/50 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full"
                >
                  back
                </button>
              </div>

              <QuestionCard question={state.currentQuestion} />

              <AnswerSection
                answerMode={state.answerMode}
                answerText={state.answerText}
                selectedOption={state.selectedOption}
                multipleChoiceOptions={state.currentQuestion.multipleChoiceOptions}
                onModeChange={setAnswerMode}
                onTextChange={setAnswerText}
                onOptionChange={setSelectedOption}
              />

              <button
                onClick={submitAnswer}
                disabled={state.isEvaluating || !canSubmitAnswer}
                className="w-full bg-brand-green text-white font-black text-sm py-4 rounded-2xl hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {state.isEvaluating ? "analyzing..." : "submit answer"}
              </button>

              {state.isEvaluating && <LoadingState type="evaluating" />}
            </div>
          )}

          {/* Feedback Step */}
          {state.step === "feedback" && state.feedback && state.currentQuestion && (
            <div className="space-y-5">
              <div className="text-center">
                <h1 className="text-2xl font-black text-white">your results</h1>
                <p className="text-white/50 text-sm mt-1">here&apos;s how you did</p>
              </div>

              <QuestionCard question={state.currentQuestion} />

              <FeedbackView
                feedback={state.feedback}
                questionType={state.currentQuestion.type}
              />

              <button
                onClick={reset}
                className="w-full bg-brand-yellow text-gray-900 font-black text-sm py-4 rounded-2xl hover:brightness-105 transition-all shadow-lg"
              >
                try another question
              </button>
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </>
  );
}
