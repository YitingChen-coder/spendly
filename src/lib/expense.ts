export const categories = [
  "Food & Drink", "Groceries", "Transport", "Shopping",
  "Bills", "Entertainment", "Health", "Other",
] as const;

export type Category = (typeof categories)[number];
export type ExpenseValues = { amount: string; description: string; category: string; date: string };
export type ExpenseErrors = Partial<Record<keyof ExpenseValues, string>>;
export type ExpenseDraft = { amountCents: number; description: string; category: Category; date: string };
export type Expense = ExpenseDraft & { id: string; createdAt: string; updatedAt: string };
export type ValidationResult = { success: true; data: ExpenseDraft } | { success: false; errors: ExpenseErrors };

export function getLocalDate(date = new Date()): string {
  return [date.getFullYear().toString().padStart(4, "0"),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0")].join("-");
}

function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) return false;
  const candidate = new Date(0);
  candidate.setFullYear(year, month - 1, day);
  return candidate.getFullYear() === year && candidate.getMonth() === month - 1 && candidate.getDate() === day;
}

export function validateExpense(values: ExpenseValues, today: string): ValidationResult {
  const errors: ExpenseErrors = {};
  const amount = values.amount.trim();
  const description = values.description.trim();
  let amountCents = 0;

  if (!/^(?:\d+(?:\.\d{1,2})?|\.\d{1,2})$/.test(amount)) {
    errors.amount = "Enter an amount greater than 0 with up to 2 decimal places.";
  } else {
    const [whole, fraction = ""] = amount.split(".");
    amountCents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
    if (!Number.isSafeInteger(amountCents) || amountCents > 99999999) {
      errors.amount = "Enter an amount no greater than $999,999.99.";
    } else if (amountCents <= 0) {
      errors.amount = "Enter an amount greater than 0.";
    }
  }

  if (!description) errors.description = "Enter what you spent money on.";
  else if (description.length > 100) errors.description = "Keep the description to 100 characters or fewer.";
  const category = categories.find((item) => item === values.category);
  if (!category) errors.category = "Choose a spending category.";
  if (!isCalendarDate(values.date)) errors.date = "Choose a valid calendar date.";
  else if (values.date > today) errors.date = "Choose today or an earlier date.";
  if (Object.keys(errors).length || !category) return { success: false, errors };
  return { success: true, data: { amountCents, description, category, date: values.date } };
}
