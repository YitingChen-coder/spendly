import { getLocalDate, type Expense } from "@/lib/expense";
import { weeklySpending } from "@/lib/expense-summary";
import { Card } from "@/components/ui/card";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export function WeeklyTotal({ expenses }: { expenses: readonly Expense[] }) {
  const week = weeklySpending(expenses, getLocalDate());
  return (
    <Card>
      <h2 className="text-sm font-semibold text-muted">This week</h2>
      <p className="mt-2 text-3xl font-semibold tabular-nums" aria-label={`This week's spending: ${money.format(week.amountCents / 100)}`}>{money.format(week.amountCents / 100)}</p>
      <p className="mt-2 text-sm text-muted"><time dateTime={week.start}>{week.start}</time> – <time dateTime={week.end}>{week.end}</time></p>
    </Card>
  );
}
