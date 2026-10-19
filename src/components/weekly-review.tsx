"use client";

import Link from "next/link";
import { useExpenses } from "@/components/expense-provider";
import { WeeklyTotal } from "@/components/weekly-total";
import { Card } from "@/components/ui/card";
import { buttonStyles } from "@/components/ui/button";
import { useLocalDate } from "@/hooks/use-local-date";
import { formatMoney, weeklyReview } from "@/lib/expense-summary";

export function WeeklyReview() {
  const { expenses } = useExpenses();
  const review = weeklyReview(expenses, useLocalDate());
  const largest = review.categories[0];
  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">Weekly Summary</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">See where your money went.</h1>
        <p className="mt-4 text-base leading-7 text-muted">Your recorded spending, grouped by category. A week runs Monday through Sunday.</p>
      </div>
      <WeeklyTotal expenses={expenses} />
      {review.count > 0 ? (
        <>
          <Card>
            <h2 className="text-xl font-semibold tracking-tight">{review.largestCategories.length > 1 ? "Your top categories are tied." : `${largest.category} leads this week.`}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {review.largestCategories.length > 1 ? `${review.largestCategories.join(", ")} each account for ${formatMoney(largest.amountCents)} of your recorded spending.` : `${largest.percentage}% of your recorded spending went to ${largest.category}.`}
            </p>
            <p className="mt-3 text-sm text-muted">{review.count} {review.count === 1 ? "expense" : "expenses"} recorded this week.</p>
          </Card>
          <Card>
            <h2 className="mb-6 text-xl font-semibold tracking-tight">Where it went</h2>
            <ol aria-label="Weekly spending by category" className="space-y-6">
              {review.categories.map(item => (
                <li key={item.category}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-semibold">{item.category}</h3><span className="font-semibold tabular-nums">{formatMoney(item.amountCents)}</span></div>
                  <p className="mt-2 text-sm text-muted">{item.percentage === 0 ? "<0.1" : item.percentage}% · {item.count} {item.count === 1 ? "expense" : "expenses"}</p>
                  <div aria-hidden="true" className="mt-3 h-2 overflow-hidden rounded-full bg-brand-soft"><div className="h-full rounded-full bg-brand" style={{ width: `${item.percentage}%` }} /></div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs leading-5 text-muted">Percentages are rounded and may not add up to exactly 100%. Only recorded expenses are included.</p>
          </Card>
        </>
      ) : (
        <Card>
          <h2 className="text-xl font-semibold">No expenses recorded this week.</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{expenses.length ? "Your earlier expenses are still in your history. Add a purchase when you are ready to start this week's picture." : "Start with one everyday purchase. Your own records will build the weekly category breakdown."}</p>
        </Card>
      )}
      <div className="flex flex-wrap gap-3"><Link href="/expenses/new" className={buttonStyles()}>{expenses.length ? "Add expense" : "Add your first expense"}</Link><Link href="/expenses" className={buttonStyles("secondary")}>{review.count === 0 && expenses.length ? "View earlier expenses" : "View all expenses"}</Link></div>
    </div>
  );
}
