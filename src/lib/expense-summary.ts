import { categories as expenseCategories, getLocalDate, type Expense } from "./expense.ts";

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

export function weeklyReview(expenses: readonly Expense[], today: string) {
  const week = weeklySpending(expenses, today);
  const records = expenses.filter(item => item.date >= week.start && item.date <= week.end);
  const categories = expenseCategories.map(category => {
    const matches = records.filter(item => item.category === category);
    const amountCents = matches.reduce((sum, item) => sum + item.amountCents, 0);
    return { category, amountCents, count: matches.length, percentage: week.amountCents ? Math.round(amountCents / week.amountCents * 1000) / 10 : 0 };
  }).filter(item => item.count > 0).sort((a, b) => b.amountCents - a.amountCents);
  const largestCategories = categories.filter(item => item.amountCents === categories[0]?.amountCents).map(item => item.category);
  return { ...week, count: records.length, categories, largestCategories };
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export function formatMoney(cents: number) { return currency.format(cents / 100); }
