"use client";

import Link from "next/link";
import { useExpenses } from "@/components/expense-provider";
import { FirstVisit } from "@/components/first-visit";
import { WeeklyTotal } from "@/components/weekly-total";
import { Card } from "@/components/ui/card";
import { buttonStyles } from "@/components/ui/button";
import { useLocalDate } from "@/hooks/use-local-date";
import { formatMoney, weeklyReview } from "@/lib/expense-summary";

export function Overview() {
  const { expenses } = useExpenses();
  const review = weeklyReview(expenses, useLocalDate());
  if (!expenses.length) return <FirstVisit />;
  return (
    <div className="max-w-2xl space-y-8">
      <div><p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">Overview</p><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back.</h1><p className="mt-4 text-base leading-7 text-muted">Your purchases are right where you left them. Take a moment to see what adds up.</p></div>
      <WeeklyTotal expenses={expenses} />
      {review.count === 0 && <p className="rounded-control bg-brand-soft p-4 text-sm leading-6 text-ink">No expenses recorded this week. Your earlier records are still available below.</p>}
      <div className="flex flex-wrap gap-3"><Link href="/expenses/new" className={buttonStyles()}>Add expense</Link><Link href="/summary" className={buttonStyles("secondary")}>Review this week</Link></div>
      <Card>
        <h2 className="mb-5 text-xl font-semibold tracking-tight">Recent expenses</h2>
        <ul aria-label="Recent saved expenses" className="divide-y divide-line">
          {expenses.slice(0, 3).map(expense => <li key={expense.id} className="flex flex-wrap items-baseline justify-between gap-3 py-4"><div className="min-w-0 flex-1"><p className="font-semibold wrap-anywhere">{expense.description}</p><p className="mt-1 text-sm text-muted">{expense.category} · <time dateTime={expense.date}>{expense.date}</time></p></div><span className="font-semibold tabular-nums">{formatMoney(expense.amountCents)}</span></li>)}
        </ul>
        <Link href="/expenses" className={buttonStyles("secondary", "mt-5")}>View all expenses</Link>
      </Card>
      <p className="text-sm leading-6 text-muted">Saved in this browser only. Records do not sync across devices. Clearing site data removes them.</p>
    </div>
  );
}
