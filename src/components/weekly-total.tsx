"use client";

import { type Expense } from "@/lib/expense";
import { formatMoney, weeklySpending } from "@/lib/expense-summary";
import { Card } from "@/components/ui/card";

import { useLocalDate } from "@/hooks/use-local-date";
export function WeeklyTotal({ expenses }: { expenses: readonly Expense[] }) {
  const week = weeklySpending(expenses, useLocalDate());
  return (
    <Card>
      <h2 className="text-sm font-semibold text-muted">This week</h2>
      <p className="mt-1 text-xs text-muted">Recorded spending</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums" aria-label={`This week's spending: ${formatMoney(week.amountCents)}`}>{formatMoney(week.amountCents)}</p>
      <p className="mt-2 text-sm text-muted"><time dateTime={week.start}>{week.start}</time> – <time dateTime={week.end}>{week.end}</time></p>
    </Card>
  );
}
