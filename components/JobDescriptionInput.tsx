"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Job Description</Label>
      <p className="text-xs text-muted-foreground">
        Paste a job description for a biotech/pharma corporate development role.
        Questions will be tailored to the specific responsibilities and requirements.
      </p>
      <Textarea
        placeholder="Paste the job description here... (e.g., VP Corporate Development at Gilead Sciences, Associate Director BD&L at Pfizer, etc.)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={8}
        className="resize-none"
      />
    </div>
  );
}
