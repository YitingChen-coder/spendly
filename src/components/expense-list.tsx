"use client";

import Link from "next/link";
import { useExpenses } from "@/components/expense-provider";
import { EmptyWorkspace } from "@/components/empty-workspace";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function ExpenseList() {
  const { expenses, lastAddedId } = useExpenses();
  if (!expenses.length) {
    return <EmptyWorkspace eyebrow="Expenses" title="The details, all together." description="A place for your everyday purchases, ready when you are." heading="Your spending story starts with one purchase." message="Add an everyday purchase to see it here. Preview entries last only for this visit and clear when you refresh or close the page." icon="expenses" />;
  }
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">Expenses</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your purchases, together.</h1>
        <p className="mt-4 text-base leading-7 text-muted">The expenses you added during this visit.</p>
      </div>
      <p className="rounded-control bg-brand-soft p-4 text-sm leading-6 text-ink">Preview: these entries are temporary. Refreshing or closing this page clears them.</p>
      {lastAddedId && <p role="status" className="text-sm font-medium text-brand">Expense added for this visit.</p>}
      <ul aria-label="Expenses added this visit" className="space-y-3">
        {expenses.map((expense) => (
          <li key={expense.id}>
            <Card className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1 basis-40">
                <h2 className="font-semibold wrap-anywhere">{expense.description}</h2>
                <p className="mt-2 text-sm text-muted">{expense.category} · <time dateTime={expense.date}>{expense.date}</time></p>
              </div>
              <p className="text-lg font-semibold tabular-nums">{money.format(expense.amountCents / 100)}</p>
            </Card>
          </li>
        ))}
      </ul>
      <Link href="/expenses/new" className={buttonStyles()}>Add another expense</Link>
    </div>
  );
}
