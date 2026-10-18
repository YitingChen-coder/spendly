import assert from "node:assert/strict";
import test from "node:test";
import { getLocalDate, validateExpense, type ExpenseValues } from "../src/lib/expense.ts";

const today = "2026-10-18";
const valid: ExpenseValues = { amount: "12.34", description: "Lunch", category: "Food & Drink", date: today };

function expectInvalid(changes: Partial<ExpenseValues>, field: keyof ExpenseValues) {
  const result = validateExpense({ ...valid, ...changes }, today);
  assert.equal(result.success, false);
  if (!result.success) assert.ok(result.errors[field], `Expected an actionable ${field} error`);
}

test("accepts a purchase and converts dollars into exact integer cents", () => {
  assert.deepEqual(validateExpense(valid, today), {
    success: true,
    data: { amountCents: 1234, description: "Lunch", category: "Food & Drink", date: today },
  });
});

for (const [amount, cents] of [["0.01", 1], ["0.29", 29], [".50", 50], ["2.5", 250], [" 12.30 ", 1230], ["999999.99", 99999999]] as const) {
  test(`converts ${amount} into ${cents} cents without floating-point rounding`, () => {
    const result = validateExpense({ ...valid, amount }, today);
    assert.equal(result.success, true);
    if (result.success) assert.equal(result.data.amountCents, cents);
  });
}

for (const amount of ["", " ", "0", "0.00", "-1", "1.001", "1000000", "999999.999", "1e2", "Infinity", "NaN", "$12", "1,000", "2.", "abc"]) {
  test(`rejects invalid amount ${JSON.stringify(amount)}`, () => expectInvalid({ amount }, "amount"));
}

test("trims a valid description but preserves the original values object", () => {
  const values = { ...valid, description: "  Coffee  " };
  const original = { ...values };
  const result = validateExpense(values, today);
  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.description, "Coffee");
  assert.deepEqual(values, original);
});

for (const description of ["", "   ", "x".repeat(101)]) {
  test(`rejects a blank or overlong description (${description.length} characters)`, () => expectInvalid({ description }, "description"));
}

test("accepts the description length boundary", () => {
  assert.equal(validateExpense({ ...valid, description: "x".repeat(100) }, today).success, true);
});

for (const category of ["", "Unknown", "food & drink"]) {
  test(`rejects an unselected or unknown category ${JSON.stringify(category)}`, () => expectInvalid({ category }, "category"));
}

for (const category of ["Food & Drink", "Groceries", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Other"]) {
  test(`accepts the allowed ${category} category`, () => assert.equal(validateExpense({ ...valid, category }, today).success, true));
}

for (const date of ["", "2026-10-19", "2026-02-29", "2026-04-31", "2026-13-01", "2026-00-10", "2026-10-00", "0000-01-01", "2026-1-01", "not-a-date"]) {
  test(`rejects an impossible, missing, or future date ${JSON.stringify(date)}`, () => expectInvalid({ date }, "date"));
}

for (const date of ["2024-02-29", "2026-01-01", today]) {
  test(`accepts the real current/past date ${date}`, () => assert.equal(validateExpense({ ...valid, date }, today).success, true));
}

test("reports all invalid fields and leaves typed values untouched", () => {
  const values = { amount: "-2", description: " ", category: "Unknown", date: "2026-02-30" };
  const original = { ...values };
  const result = validateExpense(values, today);
  assert.equal(result.success, false);
  if (!result.success) assert.deepEqual(Object.keys(result.errors).sort(), ["amount", "category", "date", "description"]);
  assert.deepEqual(values, original);
});

test("defaults the calendar date using local fields near midnight", () => {
  assert.equal(getLocalDate(new Date(2026, 0, 2, 0, 15)), "2026-01-02");
  assert.equal(getLocalDate(new Date(2026, 9, 18, 23, 59)), "2026-10-18");
});
