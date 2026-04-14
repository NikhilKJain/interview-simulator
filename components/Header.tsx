"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  return (
    <header className="bg-brand-purple px-4 pt-4 pb-2">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-brand-green flex items-center justify-center">
            <span className="text-white font-black text-sm">B</span>
          </div>
          <span className="font-black text-xl text-white tracking-tight">bioprep</span>
        </Link>
      </div>
    </header>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${
            pathname === "/" ? "text-[#6C3CE1]" : "text-gray-400"
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link
          href="/practice"
          className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors ${
            pathname === "/practice" ? "text-[#6C3CE1]" : "text-gray-400"
          }`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <span className="text-[10px] font-bold">Practice</span>
        </Link>
        <Link
          href="/practice"
          className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl text-gray-400"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
          </svg>
          <span className="text-[10px] font-bold">Settings</span>
        </Link>
      </div>
    </nav>
  );
}
