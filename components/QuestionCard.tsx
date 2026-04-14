"use client";

import { Question } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
}

const typeStyles: Record<string, string> = {
  behavioral: "bg-brand-yellow text-gray-900",
  case: "bg-brand-green text-white",
  situational: "bg-brand-blue text-white",
};

const diffStyles: Record<string, string> = {
  easy: "bg-green-400/20 text-green-300",
  medium: "bg-yellow-400/20 text-yellow-300",
  hard: "bg-red-400/20 text-red-300",
};

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${typeStyles[question.type]}`}>
          {question.type === "behavioral"
            ? "behavioral (STAR)"
            : question.type === "case"
            ? "case study"
            : "situational"}
        </span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600`}>
          {question.difficulty}
        </span>
      </div>
      <p className="text-base leading-relaxed text-gray-800 font-medium">{question.text}</p>
      {question.context && (
        <p className="mt-4 text-sm text-gray-500 italic border-t border-gray-100 pt-3">
          {question.context}
        </p>
      )}
    </div>
  );
}
