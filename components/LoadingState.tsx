"use client";

interface LoadingStateProps {
  type: "generating" | "evaluating";
}

export function LoadingState({ type }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center">
          <div className="w-10 h-10 border-3 border-gray-900 border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-green" />
      </div>
      <p className="text-sm font-bold text-white/70">
        {type === "generating"
          ? "crafting your question..."
          : "analyzing your answer..."}
      </p>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "150ms" }} />
        <div className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
