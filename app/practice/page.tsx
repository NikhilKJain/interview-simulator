"use client";

import { Header } from "@/components/Header";
import { CategorySelector } from "@/components/CategorySelector";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";
import { QuestionCard } from "@/components/QuestionCard";
import { AnswerSection } from "@/components/AnswerSection";
import { FeedbackView } from "@/components/FeedbackView";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <main className="flex-1 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {(["setup", "answering", "feedback"] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={`h-px w-8 ${
                      ["setup", "answering", "feedback"].indexOf(state.step) >= i
                        ? "bg-teal-500"
                        : "bg-border"
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                    state.step === s
                      ? "bg-teal-500 text-white"
                      : ["setup", "answering", "feedback"].indexOf(state.step) >
                        ["setup", "answering", "feedback"].indexOf(s)
                      ? "bg-teal-100 text-teal-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm hidden sm:inline ${
                    state.step === s ? "font-medium" : "text-muted-foreground"
                  }`}
                >
                  {s === "setup" ? "Setup" : s === "answering" ? "Answer" : "Feedback"}
                </span>
              </div>
            ))}
          </div>

          {/* Error display */}
          {state.error && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-sm text-red-700">{state.error}</p>
              </CardContent>
            </Card>
          )}

          {/* Setup Step */}
          {state.step === "setup" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Interview Practice</h1>
                <p className="text-muted-foreground mt-1">
                  Choose how you want to practice for your biotech corp dev interview.
                </p>
              </div>

              {/* Mode toggle */}
              <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
                <button
                  onClick={() => setMode("category")}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    state.mode === "category"
                      ? "bg-white shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  By Category
                </button>
                <button
                  onClick={() => setMode("job-description")}
                  className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    state.mode === "job-description"
                      ? "bg-white shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  From Job Description
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

              <Button
                onClick={generateQuestion}
                disabled={state.isGenerating || !canGenerate}
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                size="lg"
              >
                {state.isGenerating ? "Generating..." : "Generate Question"}
              </Button>

              {state.isGenerating && <LoadingState type="generating" />}
            </div>
          )}

          {/* Answering Step */}
          {state.step === "answering" && state.currentQuestion && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Your Question</h1>
                <Button variant="ghost" size="sm" onClick={reset}>
                  Back to Setup
                </Button>
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

              <Button
                onClick={submitAnswer}
                disabled={state.isEvaluating || !canSubmitAnswer}
                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                size="lg"
              >
                {state.isEvaluating ? "Analyzing..." : "Submit Answer"}
              </Button>

              {state.isEvaluating && <LoadingState type="evaluating" />}
            </div>
          )}

          {/* Feedback Step */}
          {state.step === "feedback" && state.feedback && state.currentQuestion && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Your Feedback</h1>
                <p className="text-muted-foreground mt-1">
                  Here&apos;s how you did on this question.
                </p>
              </div>

              <QuestionCard question={state.currentQuestion} />

              <FeedbackView
                feedback={state.feedback}
                questionType={state.currentQuestion.type}
              />

              <div className="flex gap-3">
                <Button
                  onClick={reset}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
                  size="lg"
                >
                  Try Another Question
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
