"use client";

import Link from "next/link";
import { useExpenses } from "@/components/expense-provider";
import { FirstVisit } from "@/components/first-visit";
import { WeeklyTotal } from "@/components/weekly-total";
import { buttonStyles } from "@/components/ui/button";

export function Overview() {
  const { expenses } = useExpenses();
  if (!expenses.length) return <FirstVisit />;
  return (
    <div className="max-w-2xl space-y-8">
      <div><p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">Overview</p><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your spending, together.</h1><p className="mt-4 text-base leading-7 text-muted">Your saved purchases are ready to review in this browser.</p></div>
      <WeeklyTotal expenses={expenses} />
      <div className="flex flex-wrap gap-3"><Link href="/expenses/new" className={buttonStyles()}>Add expense</Link><Link href="/expenses" className={buttonStyles("secondary")}>View saved expenses</Link></div>
      <p className="text-sm leading-6 text-muted">Saved in this browser only. Records do not sync across devices. Clearing site data removes them.</p>
    </div>
  );
}
