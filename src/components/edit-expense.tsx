"use client";

import Link from "next/link";
import { useExpenses } from "@/components/expense-provider";
import { ExpenseForm } from "@/components/expense-form";
import { Card } from "@/components/ui/card";
import { buttonStyles } from "@/components/ui/button";

export function EditExpense({ id }: { id: string }) {
  const { expenses } = useExpenses();
  const expense = expenses.find(item => item.id === id);
  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight">{expense ? "Edit expense" : "Expense not found"}</h1>
      {expense ? <Card><ExpenseForm key={expense.id} expense={expense} /></Card> : <Card><p className="mb-5 leading-7 text-muted">This expense may have been deleted. Open your records to choose another purchase.</p><Link href="/expenses" className={buttonStyles()}>Back to expenses</Link></Card>}
    </div>
  );
}
