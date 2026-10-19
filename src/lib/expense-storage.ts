import { validateExpense, type Expense } from "./expense.ts";

export const storageKey = "spendly:data";
export type StoragePort = Pick<Storage, "getItem" | "setItem">;
export type StorageRead =
  | { status: "ready"; raw: string | null; expenses: Expense[] }
  | { status: "invalid"; raw: string; message: string }
  | { status: "unavailable"; message: string };

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function timestamp(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;
}
function record(value: unknown): value is Expense {
  if (!object(value) || typeof value.id !== "string" || !/^[A-Za-z0-9_-]{1,100}$/.test(value.id) ||
    typeof value.amountCents !== "number" || !Number.isSafeInteger(value.amountCents) || value.amountCents <= 0 || value.amountCents > 99999999 ||
    typeof value.description !== "string" || value.description.trim() !== value.description || typeof value.category !== "string" || typeof value.date !== "string" ||
    !timestamp(value.createdAt) || !timestamp(value.updatedAt) || Date.parse(value.updatedAt) < Date.parse(value.createdAt)) return false;
  return validateExpense({ amount: (value.amountCents / 100).toFixed(2), description: value.description, category: value.category, date: value.date }, value.date).success;
}
export function sortExpenses(expenses: readonly Expense[]): Expense[] {
  return [...expenses].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id));
}
function decode(raw: string): Expense[] | null {
  try {
    const value: unknown = JSON.parse(raw);
    if (!object(value) || value.version !== 1 || !Array.isArray(value.expenses) || !value.expenses.every(record)) return null;
    const expenses = value.expenses as Expense[];
    if (new Set(expenses.map(item => item.id)).size !== expenses.length) return null;
    return sortExpenses(expenses);
  } catch { return null; }
}
export function readExpenseData(storage: StoragePort): StorageRead {
  let raw: string | null;
  try { raw = storage.getItem(storageKey); }
  catch { return { status: "unavailable", message: "Browser storage could not be read. Check this site's storage permissions, then retry." }; }
  if (raw === null) return { status: "ready", raw, expenses: [] };
  const expenses = decode(raw);
  return expenses ? { status: "ready", raw, expenses } : { status: "invalid", raw, message: "Your saved data could not be read safely. The original data has been kept." };
}
export function writeExpenseData(storage: StoragePort, expenses: readonly Expense[], expectedRaw: string | null): string {
  const raw = JSON.stringify({ version: 1, expenses: sortExpenses(expenses) });
  if (decode(raw) === null) throw new Error("These expenses could not be saved safely. Check the record details and try again.");
  let current: string | null;
  try { current = storage.getItem(storageKey); }
  catch { throw new Error("Browser storage could not be read. Check storage permissions and try again."); }
  if (current !== expectedRaw) throw new Error("Your saved data changed. Reload saved data before trying again.");
  try { storage.setItem(storageKey, raw); }
  catch { throw new Error("Could not save in this browser. Check storage permissions or available space, then try again."); }
  return raw;
}
