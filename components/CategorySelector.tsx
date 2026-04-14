"use client";

import { QuestionCategory, Difficulty } from "@/lib/types";
import { CATEGORIES, DIFFICULTIES } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface CategorySelectorProps {
  category: QuestionCategory;
  difficulty: Difficulty;
  onCategoryChange: (category: QuestionCategory) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

export function CategorySelector({
  category,
  difficulty,
  onCategoryChange,
  onDifficultyChange,
}: CategorySelectorProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Question Type</Label>
        <div className="grid gap-3">
          {CATEGORIES.map((cat) => (
            <Card
              key={cat.value}
              className={`cursor-pointer transition-all hover:shadow-md ${
                category === cat.value
                  ? "ring-2 ring-teal-500 bg-teal-50/50"
                  : "hover:bg-muted/50"
              }`}
              onClick={() => onCategoryChange(cat.value)}
            >
              <CardContent className="p-4">
                <div className="font-medium text-sm">{cat.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{cat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Difficulty Level</Label>
        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTIES.map((diff) => (
            <button
              key={diff.value}
              onClick={() => onDifficultyChange(diff.value)}
              className={`rounded-lg border p-3 text-center transition-all hover:shadow-sm ${
                difficulty === diff.value
                  ? "border-teal-500 bg-teal-50 text-teal-700"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="font-medium text-sm">{diff.label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                {diff.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
