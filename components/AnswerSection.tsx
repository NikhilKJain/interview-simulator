"use client";

import { AnswerMode } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
        <button
          onClick={() => onModeChange("free-form")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            answerMode === "free-form"
              ? "bg-white shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Free-Form Answer
        </button>
        <button
          onClick={() => onModeChange("multiple-choice")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            answerMode === "multiple-choice"
              ? "bg-white shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Multiple Choice
        </button>
      </div>

      {answerMode === "free-form" ? (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            Write your answer below. For behavioral questions, use the STAR method
            (Situation, Task, Action, Result).
          </Label>
          <Textarea
            placeholder="Type your answer here..."
            value={answerText}
            onChange={(e) => onTextChange(e.target.value)}
            rows={10}
            className="resize-none"
          />
          <div className="text-xs text-muted-foreground text-right">
            {answerText.length > 0
              ? `${answerText.split(/\s+/).filter(Boolean).length} words`
              : ""}
          </div>
        </div>
      ) : (
        <RadioGroup value={selectedOption} onValueChange={onOptionChange} className="space-y-3">
          {multipleChoiceOptions.map((option, i) => (
            <label
              key={i}
              className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-all hover:bg-muted/50 ${
                selectedOption === option ? "ring-2 ring-teal-500 bg-teal-50/50" : ""
              }`}
            >
              <RadioGroupItem value={option} className="mt-0.5" />
              <span className="text-sm leading-relaxed">{option}</span>
            </label>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}
