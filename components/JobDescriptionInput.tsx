"use client";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-white/70 uppercase tracking-wide">
        job description
      </label>
      <p className="text-xs text-white/50">
        Paste a JD for a biotech/pharma corp dev role and get tailored questions.
      </p>
      <textarea
        placeholder="Paste the job description here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="w-full rounded-2xl bg-white/10 backdrop-blur border-0 text-white placeholder:text-white/30 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
      />
    </div>
  );
}
