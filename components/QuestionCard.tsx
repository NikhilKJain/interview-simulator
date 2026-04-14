"use client";

import { Question } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  question: Question;
}

const typeColors: Record<string, string> = {
  behavioral: "bg-blue-100 text-blue-700",
  case: "bg-purple-100 text-purple-700",
  situational: "bg-amber-100 text-amber-700",
};

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  hard: "bg-red-100 text-red-700",
};

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className="border-l-4 border-l-teal-500">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className={typeColors[question.type]}>
            {question.type === "behavioral"
              ? "Behavioral (STAR)"
              : question.type === "case"
              ? "Case Study"
              : "Situational"}
          </Badge>
          <Badge variant="secondary" className={difficultyColors[question.difficulty]}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base leading-relaxed">{question.text}</p>
        {question.context && (
          <p className="mt-3 text-sm text-muted-foreground italic border-t pt-3">
            {question.context}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
