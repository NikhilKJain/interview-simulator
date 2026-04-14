"use client";

import { useState } from "react";
import { FeedbackResult, QuestionCategory } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface FeedbackViewProps {
  feedback: FeedbackResult;
  questionType: QuestionCategory;
}

function ScoreRing({ score }: { score: number }) {
  const percentage = score * 10;
  const color =
    score >= 7 ? "text-green-600" : score >= 5 ? "text-yellow-600" : "text-red-600";
  const bgColor =
    score >= 7 ? "stroke-green-500" : score >= 5 ? "stroke-yellow-500" : "stroke-red-500";

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          className={bgColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${percentage * 2.64} ${264 - percentage * 2.64}`}
        />
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${color}`}>
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-xs text-muted-foreground">/10</span>
      </div>
    </div>
  );
}

export function FeedbackView({ feedback, questionType }: FeedbackViewProps) {
  const [showSuggested, setShowSuggested] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <ScoreRing score={feedback.overallScore} />
          <p className="text-center text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
            {feedback.summary}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-700">Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-0.5 shrink-0">&#10003;</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-amber-700">
              Areas for Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.improvements.map((imp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-amber-500 mt-0.5 shrink-0">&#9679;</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {questionType === "behavioral" && feedback.starEvaluation && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">STAR Framework Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(["situation", "task", "action", "result"] as const).map((component) => {
              const data = feedback.starEvaluation![component];
              return (
                <div key={component} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{component}</span>
                    <span className="text-sm text-muted-foreground">{data.score}/10</span>
                  </div>
                  <Progress value={data.score * 10} className="h-2" />
                  <p className="text-xs text-muted-foreground">{data.feedback}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <button
            onClick={() => setShowSuggested(!showSuggested)}
            className="flex items-center justify-between w-full"
          >
            <CardTitle className="text-sm font-medium">Suggested Strong Answer</CardTitle>
            <span className="text-muted-foreground text-xs">
              {showSuggested ? "Hide" : "Show"}
            </span>
          </button>
        </CardHeader>
        {showSuggested && (
          <>
            <Separator />
            <CardContent className="pt-4">
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {feedback.suggestedAnswer}
              </p>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
