import assert from "node:assert/strict";
import test, { afterEach } from "node:test";
import { JSDOM } from "jsdom";
import { readExpenseData, writeExpenseData, type StoragePort } from "../src/lib/expense-storage.ts";
import type { Expense } from "../src/lib/expense.ts";

const purchase: Expense = { id: "purchase-1", amountCents: 1234, description: "Lunch", category: "Food & Drink", date: "2026-10-18", createdAt: "2026-10-18T12:00:00.000Z", updatedAt: "2026-10-18T12:00:00.000Z" };
const windows: JSDOM[] = [];
function storage(raw: string | null = null) {
  const dom = new JSDOM("", { url: "https://spendly.test" }); windows.push(dom);
  if (raw !== null) dom.window.localStorage.setItem("spendly:data", raw);
  return dom.window.localStorage;
}
const envelope = (expenses: unknown[]) => JSON.stringify({ version: 1, expenses });
afterEach(() => { for (const dom of windows.splice(0)) dom.window.close(); });

test("missing data is a valid first visit without creating a key", () => {
  const local = storage();
  assert.deepEqual(readExpenseData(local), { status: "ready", raw: null, expenses: [] });
  assert.equal(local.getItem("spendly:data"), null);
});
test("a versioned empty dataset is accepted", () => {
  const raw = envelope([]); assert.deepEqual(readExpenseData(storage(raw)), { status: "ready", raw, expenses: [] });
});
test("a new read restores the exact saved cents, dates, ids and fields", () => {
  const local = storage(); const raw = writeExpenseData(local, [purchase], null);
  assert.equal(local.getItem("spendly:data"), raw);
  assert.deepEqual(readExpenseData(local), { status: "ready", raw, expenses: [purchase] });
});
for (const raw of ["", "{", "null", "[]", '"text"', '{"version":2,"expenses":[]}', '{"version":1,"expenses":{}}', '{"expenses":[]}']) {
  test(`rejects invalid data without overwriting ${JSON.stringify(raw)}`, () => {
    const local = storage(raw); const result = readExpenseData(local);
    assert.equal(result.status, "invalid"); assert.equal(local.getItem("spendly:data"), raw);
    if (result.status === "invalid") assert.equal(result.raw, raw);
  });
}
for (const changes of [
  { amountCents: 0 }, { amountCents: -1 }, { amountCents: 1.1 }, { amountCents: 100000000 }, { amountCents: Number.MAX_SAFE_INTEGER + 1 },
  { amountCents: "12" }, { description: "" }, { description: " Lunch " }, { description: "x".repeat(101) },
  { category: "Unknown" }, { date: "2026-02-30" }, { date: "2026-1-01" },
  { id: "" }, { id: "two words" }, { id: "bad/id" }, { id: "x".repeat(101) }, { createdAt: "bad" }, { updatedAt: "2026-10-17T12:00:00.000Z" },
  { createdAt: undefined }, { date: null },
]) {
  test(`rejects a dataset containing an invalid record (${JSON.stringify(changes)})`, () => {
    const raw = envelope([purchase, { ...purchase, id: "other", ...changes }]); const local = storage(raw);
    assert.equal(readExpenseData(local).status, "invalid"); assert.equal(local.getItem("spendly:data"), raw);
  });
}
test("duplicate ids invalidate the whole dataset", () => {
  const raw = envelope([purchase, purchase]); const local = storage(raw);
  assert.equal(readExpenseData(local).status, "invalid"); assert.equal(local.getItem("spendly:data"), raw);
});
test("records are sorted by date, then timestamp, then id", () => {
  const older = { ...purchase, id: "older", date: "2026-10-17" };
  const later = { ...purchase, id: "later", createdAt: "2026-10-18T13:00:00.000Z", updatedAt: "2026-10-18T13:00:00.000Z" };
  const result = readExpenseData(storage(envelope([older, purchase, later])));
  assert.equal(result.status, "ready"); if (result.status === "ready") assert.deepEqual(result.expenses.map(x => x.id), ["later", "purchase-1", "older"]);
});
test("denied reads are unavailable, not an empty first visit", () => {
  const local: StoragePort = { getItem() { throw new Error("Denied"); }, setItem() { throw new Error("Unexpected write"); } };
  assert.equal(readExpenseData(local).status, "unavailable");
});
test("a failed write preserves the previously saved value", () => {
  const raw = envelope([purchase]); const local = storage(raw);
  const failing: StoragePort = { getItem: key => local.getItem(key), setItem() { throw new Error("Quota exceeded"); } };
  assert.throws(() => writeExpenseData(failing, [], raw), /save|storage/i);
  assert.equal(local.getItem("spendly:data"), raw);
});
test("a changed raw value cannot be silently overwritten by a stale writer", () => {
  const original = envelope([purchase]); const local = storage(original); const newer = envelope([{ ...purchase, description: "Updated lunch" }]);
  local.setItem("spendly:data", newer);
  assert.throws(() => writeExpenseData(local, [], original), /changed|reload/i);
  assert.equal(local.getItem("spendly:data"), newer);
});
test("reset can replace a known corrupt value, but never an unseen replacement", () => {
  const local = storage("{"); const raw = writeExpenseData(local, [], "{");
  assert.deepEqual(JSON.parse(raw), { version: 1, expenses: [] });
  local.setItem("spendly:data", envelope([purchase]));
  assert.throws(() => writeExpenseData(local, [], raw), /changed|reload/i);
  assert.notEqual(local.getItem("spendly:data"), envelope([]));
});
