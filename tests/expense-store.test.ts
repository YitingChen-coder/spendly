import assert from "node:assert/strict";
import test, { afterEach } from "node:test";
import { JSDOM } from "jsdom";
import { createExpenseStore } from "../src/lib/expense-store.ts";
import { weeklySpending } from "../src/lib/expense-summary.ts";
import type { Expense } from "../src/lib/expense.ts";
const windows: JSDOM[] = [];
function local() { const dom = new JSDOM("", { url: "https://spendly.test" }); windows.push(dom); return dom.window.localStorage; }
afterEach(() => { for (const dom of windows.splice(0)) dom.window.close(); });
const draft = { amountCents: 1234, description: "Lunch", category: "Food & Drink" as const, date: "2024-02-01" };
const fixture: Expense = { ...draft, id: "one", createdAt: "2024-02-01T12:00:00.000Z", updatedAt: "2024-02-01T12:00:00.000Z" };

test("subscription loads existing records without writing, and add persists before success", () => {
  const storage = local(); const store = createExpenseStore(() => storage);
  assert.equal(store.getSnapshot().status, "loading");
  const stop = store.subscribe(() => {}); assert.equal(store.getSnapshot().status, "ready");
  assert.equal(storage.getItem("spendly:data"), null);
  store.add(draft); const snapshot = store.getSnapshot(); assert.equal(snapshot.status, "ready");
  if (snapshot.status === "ready") {
    assert.equal(snapshot.expenses.length, 1); assert.equal(snapshot.notice, "Expense saved.");
    assert.deepEqual(JSON.parse(storage.getItem("spendly:data")!).expenses, snapshot.expenses);
  }
  stop();
});
test("a new store lifetime restores add, edit and deletion from the same Web Storage", () => {
  const storage = local(); const store = createExpenseStore(() => storage); store.reload(); store.add(draft);
  let snapshot = store.getSnapshot(); assert.equal(snapshot.status, "ready"); if (snapshot.status !== "ready") return;
  const id = snapshot.expenses[0].id; const created = snapshot.expenses[0].createdAt;
  store.update(id, { ...draft, amountCents: 2500, description: "Updated lunch" });
  const reopened = createExpenseStore(() => storage); reopened.reload(); snapshot = reopened.getSnapshot();
  assert.equal(snapshot.status, "ready"); if (snapshot.status !== "ready") return;
  assert.equal(snapshot.expenses[0].amountCents, 2500); assert.equal(snapshot.expenses[0].createdAt, created);
  reopened.remove(id); const again = createExpenseStore(() => storage); again.reload(); const empty = again.getSnapshot();
  assert.equal(empty.status, "ready"); if (empty.status === "ready") assert.deepEqual(empty.expenses, []);
});
test("failed add, update and delete keep both the saved value and published records intact", () => {
  const storage = local(); let fail = false;
  const port = { getItem: (key: string) => storage.getItem(key), setItem(key: string, value: string) { if (fail) throw new Error("Quota"); storage.setItem(key, value); } };
  const store = createExpenseStore(() => port); store.reload(); store.add(draft);
  const before = store.getSnapshot(); assert.equal(before.status, "ready"); if (before.status !== "ready") return;
  const raw = storage.getItem("spendly:data"); fail = true;
  for (const operation of [() => store.add(draft), () => store.update(before.expenses[0].id, { ...draft, amountCents: 999 }), () => store.remove(before.expenses[0].id)]) {
    assert.throws(operation, /save|storage/i); assert.equal(store.getSnapshot(), before); assert.equal(storage.getItem("spendly:data"), raw);
  }
  fail = false; store.add(draft); const after = store.getSnapshot(); if (after.status === "ready") assert.equal(after.expenses.length, 2);
});
test("corrupt, denied and reset states never masquerade as an empty first visit", () => {
  const storage = local(); storage.setItem("spendly:data", "{"); const store = createExpenseStore(() => storage); store.reload();
  assert.equal(store.getSnapshot().status, "invalid"); assert.throws(() => store.add(draft)); assert.equal(storage.getItem("spendly:data"), "{");
  store.reset(); const reset = store.getSnapshot(); assert.equal(reset.status, "ready"); if (reset.status === "ready") assert.equal(reset.expenses.length, 0);
  const denied = createExpenseStore(() => { throw new Error("Denied"); }); denied.reload(); assert.equal(denied.getSnapshot().status, "unavailable");
});
test("missing edit/delete ids and invalid drafts cannot modify data", () => {
  const storage = local(); const store = createExpenseStore(() => storage); store.reload(); store.add(draft); const raw = storage.getItem("spendly:data");
  assert.throws(() => store.update("missing", draft), /no longer exists/); assert.throws(() => store.remove("missing"), /no longer exists/);
  assert.throws(() => store.add({ ...draft, amountCents: 1.1 })); assert.equal(storage.getItem("spendly:data"), raw);
});
test("an external valid or corrupt change is protected from stale add/update/delete", () => {
  const storage = local(); const store = createExpenseStore(() => storage); store.reload(); store.add(draft); const state = store.getSnapshot(); if (state.status !== "ready") throw new Error("Expected ready");
  storage.setItem("spendly:data", "{");
  assert.throws(() => store.add(draft), /changed/); assert.throws(() => store.update(state.expenses[0].id, draft), /changed/); assert.throws(() => store.remove(state.expenses[0].id), /changed/);
  assert.equal(storage.getItem("spendly:data"), "{"); assert.equal(store.getSnapshot(), state);
});
test("weekly total uses Monday-Sunday local dates and excludes older purchases", () => {
  const rows = [fixture, { ...fixture, id: "two", date: "2026-10-12", amountCents: 29 }, { ...fixture, id: "three", date: "2026-10-18", amountCents: 101 }, { ...fixture, id: "four", date: "2026-10-19", amountCents: 500 }];
  assert.deepEqual(weeklySpending(rows, "2026-10-18"), { start: "2026-10-12", end: "2026-10-18", amountCents: 130 });
});
test("weekly range handles Monday, year changes and daylight-saving weeks", () => {
  assert.deepEqual(weeklySpending([], "2026-10-19"), { start: "2026-10-19", end: "2026-10-25", amountCents: 0 });
  assert.deepEqual(weeklySpending([], "2026-01-01"), { start: "2025-12-29", end: "2026-01-04", amountCents: 0 });
  assert.deepEqual(weeklySpending([], "2026-03-08"), { start: "2026-03-02", end: "2026-03-08", amountCents: 0 });
});
