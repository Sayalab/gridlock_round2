"use client";

import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass-strong flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2.5 shadow-glass">
        <Link href="/" className="flex items-center gap-2.5 pl-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            Gridlock
          </span>
        </Link>

        <div className="hidden items-center gap-1 text-sm text-white/60 md:flex">
          <a href="#engines" className="rounded-full px-4 py-1.5 transition hover:bg-white/[0.05] hover:text-white">
            Engines
          </a>
          <a href="#how" className="rounded-full px-4 py-1.5 transition hover:bg-white/[0.05] hover:text-white">
            How it works
          </a>
          <a href="#stack" className="rounded-full px-4 py-1.5 transition hover:bg-white/[0.05] hover:text-white">
            Stack
          </a>
          <Link href="/fleet-api" className="rounded-full px-4 py-1.5 transition hover:bg-white/[0.05] hover:text-white">
            Fleet API
          </Link>
        </div>

        <Link href="/dashboard" className="btn-accent !px-5 !py-2 text-[13px]">
          Launch Console
        </Link>
      </nav>
    </header>
  );
}
