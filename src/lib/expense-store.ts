import { getLocalDate, validateExpense, type Expense, type ExpenseDraft } from "./expense.ts";
import { readExpenseData, sortExpenses, writeExpenseData, type StoragePort, type StorageRead } from "./expense-storage.ts";

type Ready = Extract<StorageRead, { status: "ready" }> & { notice: string };
export type ExpenseState = { status: "loading" } | Exclude<StorageRead, { status: "ready" }> | Ready;
export const loadingState: ExpenseState = { status: "loading" };

export function createExpenseStore(getStorage: () => StoragePort = () => window.localStorage) {
  let state: ExpenseState = loadingState;
  let initialized = false;
  const listeners = new Set<() => void>();
  function publish(next: ExpenseState) { state = next; for (const listener of listeners) listener(); }
  function read(): StorageRead {
    let result: StorageRead;
    try { result = readExpenseData(getStorage()); }
    catch { result = { status: "unavailable", message: "Browser storage is unavailable. Check this site's storage permissions, then retry." }; }
    return result;
  }
  function load() {
    const result = read();
    publish(result.status === "ready" ? { ...result, notice: "" } : result);
  }
  function ready(): Ready {
    if (state.status !== "ready") throw new Error("Wait for saved data to load before making changes.");
    return state;
  }
  function validate(draft: ExpenseDraft) {
    const checked = validateExpense({ amount: (draft.amountCents / 100).toFixed(2), description: draft.description, category: draft.category, date: draft.date }, getLocalDate());
    if (!Number.isSafeInteger(draft.amountCents) || !checked.success) throw new Error("Check the expense details before saving.");
    return checked.data;
  }
  function persist(expenses: Expense[], notice: string) {
    const previous = ready();
    let storage: StoragePort;
    try { storage = getStorage(); } catch { throw new Error("Browser storage is unavailable. Your changes have not been saved."); }
    const raw = writeExpenseData(storage, expenses, previous.raw);
    publish({ status: "ready", raw, expenses: sortExpenses(expenses), notice });
  }
  return {
    getSnapshot: () => state,
    subscribe(listener: () => void) {
      listeners.add(listener);
      if (!initialized) { initialized = true; load(); }
      return () => { listeners.delete(listener); };
    },
    reload: load,
    reloadForEditing() {
      ready();
      const result = read();
      if (result.status !== "ready") throw new Error(`${result.message} Your entries are still here. Open Expenses and reload saved data there to recover it.`);
      publish({ ...result, notice: "" });
    },
    add(draft: ExpenseDraft) {
      const previous = ready();
      const checked = validate(draft);
      const now = new Date().toISOString();
      persist([...previous.expenses, { ...checked, id: crypto.randomUUID(), createdAt: now, updatedAt: now }], "Expense saved.");
    },
    update(id: string, draft: ExpenseDraft) {
      const previous = ready();
      const existing = previous.expenses.find(item => item.id === id);
      if (!existing) throw new Error("This expense no longer exists. Return to Expenses to continue.");
      const checked = validate(draft);
      const updatedAt = new Date(Math.max(Date.now(), Date.parse(existing.createdAt))).toISOString();
      persist(previous.expenses.map(item => item.id === id ? { ...item, ...checked, updatedAt } : item), "Expense updated.");
    },
    remove(id: string) {
      const previous = ready();
      if (!previous.expenses.some(item => item.id === id)) throw new Error("This expense no longer exists. Reload saved data.");
      persist(previous.expenses.filter(item => item.id !== id), "Expense deleted.");
    },
    reset() {
      if (state.status !== "invalid") throw new Error("Reload saved data before requesting a reset.");
      const raw = writeExpenseData(getStorage(), [], state.raw);
      publish({ status: "ready", raw, expenses: [], notice: "Saved data reset." });
    },
  };
}
