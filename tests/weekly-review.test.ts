import assert from "node:assert/strict";
import test from "node:test";
import { weeklyReview } from "../src/lib/expense-summary.ts";
import type { Expense } from "../src/lib/expense.ts";
const base: Expense = { id: "one", amountCents: 100, description: "Purchase", category: "Food & Drink", date: "2026-10-18", createdAt: "2026-10-18T12:00:00.000Z", updatedAt: "2026-10-18T12:00:00.000Z" };

test("groups weekly expenses using integer cents, counts, percentages and descending spending", () => {
  const rows = [base, { ...base, id: "two", amountCents: 200 }, { ...base, id: "three", category: "Transport" as const, amountCents: 100 }, { ...base, id: "old", date: "2026-10-11", amountCents: 99999 }];
  assert.deepEqual(weeklyReview(rows, "2026-10-18"), {
    start: "2026-10-12", end: "2026-10-18", amountCents: 400, count: 3,
    categories: [{ category: "Food & Drink", amountCents: 300, count: 2, percentage: 75 }, { category: "Transport", amountCents: 100, count: 1, percentage: 25 }], largestCategories: ["Food & Drink"],
  });
});
test("reports every largest category in a tie instead of inventing one winner", () => {
  const result = weeklyReview([base, { ...base, id: "two", category: "Groceries" }], "2026-10-18");
  assert.deepEqual(result.largestCategories, ["Food & Drink", "Groceries"]);
  assert.deepEqual(result.categories.map(item => item.percentage), [50, 50]);
});
test("rounds percentages to one decimal while preserving exact cents", () => {
  const result = weeklyReview([base, { ...base, id: "two", category: "Groceries" }, { ...base, id: "three", category: "Transport" }], "2026-10-18");
  assert.equal(result.amountCents, 300); assert.deepEqual(result.categories.map(item => item.percentage), [33.3, 33.3, 33.3]);
});
test("a new week keeps totals empty and never leaks old categories", () => {
  assert.deepEqual(weeklyReview([base], "2026-10-19"), { start: "2026-10-19", end: "2026-10-25", amountCents: 0, count: 0, categories: [], largestCategories: [] });
});
test("missing records produce no percentages or invented insight", () => {
  const result = weeklyReview([], "2026-10-18"); assert.equal(result.count, 0); assert.equal(result.amountCents, 0); assert.deepEqual(result.categories, []); assert.deepEqual(result.largestCategories, []);
});
