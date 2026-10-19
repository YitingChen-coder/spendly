"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { createExpenseStore, loadingState } from "@/lib/expense-store";
import { StorageStatus } from "@/components/storage-status";

type Store = ReturnType<typeof createExpenseStore>;
type Value = { state: ReturnType<Store["getSnapshot"]>; store: Store };
const ExpenseContext = createContext<Value | null>(null);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createExpenseStore());
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, () => loadingState);
  return (
    <ExpenseContext.Provider value={{ state, store }}>
      {state.status === "ready" ? children : <StorageStatus state={state} onRetry={store.reload} onReset={store.reset} />}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context || context.state.status !== "ready") throw new Error("Expenses must be used inside the ready ExpenseProvider.");
  return { expenses: context.state.expenses, notice: context.state.notice, addExpense: context.store.add, updateExpense: context.store.update, deleteExpense: context.store.remove, reload: context.store.reload, reloadForEditing: context.store.reloadForEditing };
}
