"use client";

import { useState } from "react";
import { FeedbackResult, QuestionCategory } from "@/lib/types";

interface FeedbackViewProps {
  feedback: FeedbackResult;
  questionType: QuestionCategory;
}

function ScoreRing({ score }: { score: number }) {
  const percentage = score * 10;
  const color =
    score >= 7 ? "#2DD4A0" : score >= 5 ? "#FBBF24" : "#FF6B6B";

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${percentage * 2.64} ${264 - percentage * 2.64}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black text-white">{score}</span>
        <span className="text-xs text-white/50">/10</span>
      </div>
    </div>
  );
}

function StarBar({ label, score }: { label: string; score: number }) {
  const color =
    score >= 7 ? "bg-brand-green" : score >= 5 ? "bg-brand-yellow" : "bg-brand-coral";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white capitalize">{label}</span>
        <span className="text-sm font-bold text-white/60">{score}/10</span>
      </div>
      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
    </div>
  );
}

export function FeedbackView({ feedback, questionType }: FeedbackViewProps) {
  const [showSuggested, setShowSuggested] = useState(false);

  return (
    <div className="space-y-4">
      {/* Score */}
      <div className="bg-white/10 backdrop-blur rounded-3xl p-6">
        <ScoreRing score={feedback.overallScore} />
        <p className="text-center text-sm text-white/70 mt-4 max-w-sm mx-auto">
          {feedback.summary}
        </p>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid gap-3">
        <div className="bg-brand-green/20 backdrop-blur rounded-3xl p-5">
          <h4 className="font-bold text-sm text-brand-green mb-3">strengths</h4>
          <ul className="space-y-2">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                <span className="text-brand-green mt-0.5 shrink-0">&#10003;</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-brand-coral/20 backdrop-blur rounded-3xl p-5">
          <h4 className="font-bold text-sm text-brand-coral mb-3">areas to improve</h4>
          <ul className="space-y-2">
            {feedback.improvements.map((imp, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                <span className="text-brand-coral mt-0.5 shrink-0">&#9679;</span>
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* STAR Breakdown */}
      {questionType === "behavioral" && feedback.starEvaluation && (
        <div className="bg-white/10 backdrop-blur rounded-3xl p-5 space-y-3">
          <h4 className="font-bold text-sm text-brand-yellow">STAR breakdown</h4>
          {(["situation", "task", "action", "result"] as const).map((component) => {
            const data = feedback.starEvaluation![component];
            return (
              <div key={component}>
                <StarBar label={component} score={data.score} />
                <p className="text-xs text-white/50 mt-1">{data.feedback}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Suggested Answer */}
      <div className="bg-white/10 backdrop-blur rounded-3xl overflow-hidden">
        <button
          onClick={() => setShowSuggested(!showSuggested)}
          className="w-full flex items-center justify-between p-5"
        >
          <span className="font-bold text-sm text-white">suggested strong answer</span>
          <span className="text-white/50 text-xs">{showSuggested ? "hide" : "show"}</span>
        </button>
        {showSuggested && (
          <div className="px-5 pb-5 border-t border-white/10 pt-4">
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
              {feedback.suggestedAnswer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
