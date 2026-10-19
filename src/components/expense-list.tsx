"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useExpenses } from "@/components/expense-provider";
import { DeleteExpense } from "@/components/delete-expense";
import { WeeklyTotal } from "@/components/weekly-total";
import { Button, buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { formatMoney } from "@/lib/expense-summary";

export function ExpenseList() {
  const { expenses, notice, reload } = useExpenses();
  const [confirmReload, setConfirmReload] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">Expenses</p>
        <h1 ref={heading} tabIndex={-1} className="text-3xl font-semibold tracking-tight sm:text-4xl">Your purchases, together.</h1>
        <p className="mt-4 text-base leading-7 text-muted">Saved only in this browser. Clearing site data removes your records.</p>
      </div>
      <p role="status" aria-atomic="true" className="text-sm font-medium text-brand">{notice}</p>
      <WeeklyTotal expenses={expenses} />
      {expenses.length ? (
        <ul aria-label="Saved expenses" className="space-y-3">
          {expenses.map(expense => (
            <li key={expense.id}>
              <Card>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1 basis-40"><h2 className="font-semibold wrap-anywhere">{expense.description}</h2><p className="mt-2 text-sm text-muted">{expense.category} · <time dateTime={expense.date}>{expense.date}</time></p></div>
                  <p className="text-lg font-semibold tabular-nums">{formatMoney(expense.amountCents)}</p>
                </div>
                <div className="mt-5 flex flex-wrap items-start gap-3">
                  <Link href={`/expenses/${encodeURIComponent(expense.id)}/edit`} className={buttonStyles("secondary")} aria-label={`Edit ${expense.description}`}>Edit</Link>
                  <DeleteExpense expense={expense} onDeleted={() => heading.current?.focus()} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      ) : <Card><h2 className="text-xl font-semibold">Your spending story starts with one purchase.</h2><p className="mt-3 text-sm leading-6 text-muted">Add lunch, groceries, or another everyday purchase. Your records will be here when you return in this browser.</p></Card>}
      <div className="flex flex-wrap gap-3">
        <Link href="/expenses/new" className={buttonStyles()}>{expenses.length ? "Add another expense" : "Add your first expense"}</Link>
        <Button variant="secondary" onClick={() => setConfirmReload(!confirmReload)}>Reload saved data</Button>
      </div>
      {confirmReload && <div className="rounded-control border border-control p-4"><p className="text-sm leading-6 text-muted">Reload the latest records from this browser, including changes made in another tab.</p><Button className="mt-3" onClick={() => { setConfirmReload(false); reload(); }}>Reload now</Button></div>}
    </div>
  );
}
