"use client";

import { QuestionCategory, Difficulty } from "@/lib/types";
import { CATEGORIES, DIFFICULTIES } from "@/lib/constants";

interface CategorySelectorProps {
  category: QuestionCategory;
  difficulty: Difficulty;
  onCategoryChange: (category: QuestionCategory) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const categoryColors: Record<QuestionCategory, string> = {
  behavioral: "bg-brand-yellow text-gray-900",
  case: "bg-brand-green text-white",
  situational: "bg-brand-blue text-white",
};

const categoryInactiveColors: Record<QuestionCategory, string> = {
  behavioral: "bg-yellow-100 text-gray-600",
  case: "bg-green-100 text-gray-600",
  situational: "bg-blue-100 text-gray-600",
};

export function CategorySelector({
  category,
  difficulty,
  onCategoryChange,
  onDifficultyChange,
}: CategorySelectorProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="text-xs font-bold text-white/70 uppercase tracking-wide">question type</label>
        <div className="grid gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`rounded-2xl p-4 text-left transition-all ${
                category === cat.value
                  ? categoryColors[cat.value]
                  : categoryInactiveColors[cat.value]
              }`}
            >
              <div className="font-bold text-sm">{cat.label}</div>
              <div className={`text-xs mt-0.5 ${
                category === cat.value ? "opacity-80" : "opacity-60"
              }`}>
                {cat.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-white/70 uppercase tracking-wide">difficulty</label>
        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.value}
              onClick={() => onDifficultyChange(diff.value)}
              className={`rounded-2xl p-3 text-center transition-all ${
                difficulty === diff.value
                  ? "bg-white text-[#6C3CE1] shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <div className="font-bold text-sm">{diff.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
