"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Expense, ExpenseDraft } from "@/lib/expense";

type ExpenseContextValue = {
  expenses: Expense[];
  lastAddedId: string | null;
  addExpense: (draft: ExpenseDraft) => void;
};

const ExpenseContext = createContext<ExpenseContextValue | null>(null);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  function addExpense(draft: ExpenseDraft) {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const expense: Expense = { ...draft, id, createdAt: now, updatedAt: now };
    setExpenses((current) => [expense, ...current]);
    setLastAddedId(id);
  }

  return <ExpenseContext.Provider value={{ expenses, lastAddedId, addExpense }}>{children}</ExpenseContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpenses must be used inside ExpenseProvider.");
  return context;
}
