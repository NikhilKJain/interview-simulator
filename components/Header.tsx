"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">BI</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">BioPrep</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/practice"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Practice
          </Link>
        </nav>
      </div>
    </header>
  );
}
