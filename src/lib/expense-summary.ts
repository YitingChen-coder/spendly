import { getLocalDate, type Expense } from "./expense.ts";

export function weeklySpending(expenses: readonly Expense[], today: string) {
  const [year, month, day] = today.split("-").map(Number);
  const monday = new Date(0);
  monday.setFullYear(year, month - 1, day);
  monday.setHours(12, 0, 0, 0);
  monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  const start = getLocalDate(monday);
  const end = getLocalDate(sunday);
  const amountCents = expenses.reduce((sum, expense) => expense.date >= start && expense.date <= end ? sum + expense.amountCents : sum, 0);
  return { start, end, amountCents };
}
