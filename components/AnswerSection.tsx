"use client";

import { AnswerMode } from "@/lib/types";

interface AnswerSectionProps {
  answerMode: AnswerMode;
  answerText: string;
  selectedOption: string;
  multipleChoiceOptions: string[];
  onModeChange: (mode: AnswerMode) => void;
  onTextChange: (text: string) => void;
  onOptionChange: (option: string) => void;
}

export function AnswerSection({
  answerMode,
  answerText,
  selectedOption,
  multipleChoiceOptions,
  onModeChange,
  onTextChange,
  onOptionChange,
}: AnswerSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1 rounded-2xl bg-white/10 p-1">
        <button
          onClick={() => onModeChange("free-form")}
          className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
            answerMode === "free-form"
              ? "bg-white text-[#6C3CE1] shadow-md"
              : "text-white/60 hover:text-white"
          }`}
        >
          free-form
        </button>
        <button
          onClick={() => onModeChange("multiple-choice")}
          className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition-all ${
            answerMode === "multiple-choice"
              ? "bg-white text-[#6C3CE1] shadow-md"
              : "text-white/60 hover:text-white"
          }`}
        >
          multiple choice
        </button>
      </div>

      {answerMode === "free-form" ? (
        <div className="space-y-2">
          <p className="text-xs text-white/50">
            For behavioral questions, use STAR: Situation, Task, Action, Result.
          </p>
          <textarea
            placeholder="type your answer here..."
            value={answerText}
            onChange={(e) => onTextChange(e.target.value)}
            rows={8}
            className="w-full rounded-2xl bg-white text-gray-800 placeholder:text-gray-300 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#6C3CE1]/30 shadow-inner"
          />
          {answerText.length > 0 && (
            <p className="text-xs text-white/40 text-right">
              {answerText.split(/\s+/).filter(Boolean).length} words
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {multipleChoiceOptions.map((option, i) => (
            <button
              key={i}
              onClick={() => onOptionChange(option)}
              className={`w-full text-left rounded-2xl p-4 text-sm transition-all ${
                selectedOption === option
                  ? "bg-white text-[#6C3CE1] shadow-lg font-semibold ring-2 ring-[#6C3CE1]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${
                selectedOption === option
                  ? "bg-[#6C3CE1] text-white"
                  : "bg-white/20 text-white/70"
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
