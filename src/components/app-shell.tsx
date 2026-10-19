import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";
import { Navigation } from "@/components/navigation";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
      <a href="#main-content" className="fixed top-4 left-4 z-50 -translate-y-24 rounded-control bg-brand px-5 py-3 font-semibold text-white focus:translate-y-0">Skip to content</a>
      <header className="border-b border-line bg-surface px-4 py-5 sm:px-6 lg:flex lg:min-h-dvh lg:flex-col lg:border-r lg:border-b-0 lg:px-5 lg:py-9">
        <Link href="/" aria-label="Spendly home" className="mb-5 inline-flex w-fit items-center gap-3 rounded-control lg:mb-12 lg:ml-3">
          <span className="flex size-10 items-center justify-center rounded-control bg-brand text-white"><Icon name="leaf" width="25" height="25" /></span>
          <span className="text-2xl font-bold tracking-tight">spendly<span className="text-brand">.</span></span>
        </Link>
        <Navigation />
        <p className="mt-auto hidden px-4 pt-16 text-xs leading-5 text-muted lg:block">A little clarity.<br />Every day.</p>
      </header>
      <div className="flex min-w-0 flex-col">
        <div className="flex min-h-20 items-center justify-between gap-3 border-b border-line px-5 sm:px-9 lg:px-12">
          <span className="text-sm font-medium text-muted">Your personal spending space</span>
          <span className="shrink-0 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">Local only</span>
        </div>
        <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-5 py-9 sm:px-9 sm:py-12 lg:px-12 lg:py-14">
          {children}
        </main>
        <footer className="mx-auto w-full max-w-6xl px-5 py-6 text-xs text-muted sm:px-9 lg:px-12">Spendly · Simple by design.</footer>
      </div>
    </div>
  );
}
