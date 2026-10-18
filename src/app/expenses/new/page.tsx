import type { Metadata } from "next";
import { ExpenseForm } from "@/components/expense-form";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = { title: "Add Expense" };

export default function NewExpensePage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">Add Expense</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Keep the small things simple.</h1>
        <p className="mt-4 text-base leading-7 text-muted">Record an everyday purchase. All four fields are required.</p>
      </div>
      <Card><ExpenseForm /></Card>
    </div>
  );
}
