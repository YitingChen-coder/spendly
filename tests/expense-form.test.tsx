import assert from "node:assert/strict";
import test, { after, afterEach, beforeEach, mock } from "node:test";
import { JSDOM } from "jsdom";
import { act, useState } from "react";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime.js";
import { ExpenseProvider } from "../src/components/expense-provider";
import { ExpenseForm } from "../src/components/expense-form";
import { ExpenseList } from "../src/components/expense-list";
import { EditExpense } from "../src/components/edit-expense";
import { WeeklyReview } from "../src/components/weekly-review";
import { Overview } from "../src/components/overview";

const RealDate = Date;

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost/expenses/new" });
for (const name of ["window", "document", "HTMLElement", "HTMLInputElement", "HTMLSelectElement", "Event", "MouseEvent", "FormData"]) {
  Object.defineProperty(globalThis, name, { value: dom.window[name as keyof Window], configurable: true });
}
Object.defineProperty(globalThis, "self", { value: dom.window, configurable: true });
Object.defineProperty(globalThis, "navigator", { value: dom.window.navigator, configurable: true });
Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", { value: true, configurable: true });
const { createRoot } = await import("react-dom/client");
let root: ReturnType<typeof createRoot> | undefined;

function Workspace({ initialRoute = "/expenses/new" }: { initialRoute?: string }) {
  const [route, setRoute] = useState(initialRoute);
  const router: AppRouterInstance = {
    push: setRoute,
    replace: setRoute,
    back() { setRoute("/expenses"); },
    forward() {},
    refresh() {},
    prefetch() {},
    bfcacheId: "test-workspace",
  };
  return <AppRouterContext.Provider value={router}><ExpenseProvider>{route === "/" ? <Overview /> : route === "/summary" ? <WeeklyReview /> : route === "/expenses/new" ? <ExpenseForm /> : route.endsWith("/edit") ? <EditExpense id={route.split("/")[2]} /> : <ExpenseList />}</ExpenseProvider></AppRouterContext.Provider>;
}

async function mount(initialRoute = "/expenses/new") {
  const container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => { root!.render(<Workspace initialRoute={initialRoute} />); });
}

function input(name: string) {
  return document.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${name}"]`)!;
}

async function submit(times = 1) {
  const form = document.querySelector("form")!;
  await act(async () => {
    for (let index = 0; index < times; index++) form.dispatchEvent(new dom.window.Event("submit", { bubbles: true, cancelable: true }));
  });
}

function fillValid() {
  input("amount").value = "12.34";
  input("description").value = "  Lunch  ";
  input("category").value = "Food & Drink";
}

beforeEach(() => { dom.window.localStorage.clear(); });

afterEach(async () => {
  if (root) await act(async () => { root!.unmount(); });
  root = undefined;
  document.body.replaceChildren();
  mock.restoreAll();
  globalThis.Date = RealDate;
});
after(() => dom.window.close());

test("defaults to local today and presents four labeled required fields", async () => {
  await mount();
  const expected = new Intl.DateTimeFormat("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  assert.equal(input("date").value, expected);
  assert.equal(input("date").getAttribute("max"), expected);
  for (const name of ["amount", "description", "category", "date"]) {
    const control = input(name);
    assert.ok(control.required);
    assert.ok(document.querySelector(`label[for="${control.id}"]`));
  }
});

test("invalid submission preserves every typed value and focuses the first invalid field", async () => {
  await mount();
  input("amount").value = "-2";
  input("description").value = "Keep this description";
  input("category").value = "Transport";
  const date = input("date").value;
  await submit();
  assert.equal(document.activeElement, input("amount"));
  assert.equal(input("amount").value, "-2");
  assert.equal(input("description").value, "Keep this description");
  assert.equal(input("category").value, "Transport");
  assert.equal(input("date").value, date);
  assert.equal(input("amount").getAttribute("aria-invalid"), "true");
  assert.match(input("amount").getAttribute("aria-describedby")!, /amount-error/);
  assert.ok(document.getElementById("amount-error")?.textContent);
  assert.ok(document.querySelector("form"));
});

test("an empty submission reports all missing fields without losing today's date", async () => {
  await mount();
  await submit();
  assert.equal(document.activeElement, input("amount"));
  for (const name of ["amount", "description", "category"]) {
    assert.equal(input(name).getAttribute("aria-invalid"), "true");
    assert.ok(document.getElementById(`${name}-error`));
  }
  assert.notEqual(input("date").getAttribute("aria-invalid"), "true");
});

test("correcting an error adds one normalized purchase with durable feedback", async () => {
  await mount();
  await submit();
  fillValid();
  const date = input("date").value;
  await submit(2);
  assert.equal(document.querySelector("form"), null);
  const list = document.querySelector('ul[aria-label="Saved expenses"]')!;
  assert.equal(list.children.length, 1);
  assert.match(list.textContent!, /Lunch/);
  assert.match(list.textContent!, /\$12\.34/);
  assert.match(list.textContent!, /Food & Drink/);
  assert.equal(list.querySelector("time")?.getAttribute("datetime"), date);
  assert.match(document.querySelector('[role="status"]')!.textContent!, /Expense saved/);
  assert.match(document.body.textContent!, /Saved only in this browser/);
});

test("a failed add preserves input and allows one clean retry", async () => {
  await mount();
  fillValid();
  const fail = mock.method(globalThis.crypto, "randomUUID", () => { throw new Error("Temporary id failure"); });
  await submit();
  assert.match(document.querySelector('[role="alert"]')!.textContent!, /have not been saved/);
  assert.equal(input("amount").value, "12.34");
  assert.equal(input("description").value, "  Lunch  ");
  assert.equal(document.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled, false);
  fail.mock.restore();
  await submit();
  assert.equal(document.querySelector('ul[aria-label="Saved expenses"]')!.children.length, 1);
});

test("a new provider lifetime restores the previous visit's saved records", async () => {
  await mount();
  fillValid();
  await submit();
  assert.ok(document.querySelector('ul[aria-label="Saved expenses"]'));
  await act(async () => { root!.unmount(); });
  root = undefined;
  document.body.replaceChildren();
  await mount("/expenses");
  assert.equal(document.querySelector('ul[aria-label="Saved expenses"]')!.children.length, 1);
  assert.match(document.body.textContent!, /Lunch/);
});

test("focuses the category select when earlier fields are valid", async () => {
  await mount();
  input("amount").value = "10";
  input("description").value = "Bus";
  await submit();
  assert.equal(document.activeElement, input("category"));
  assert.equal(input("category").getAttribute("aria-invalid"), "true");
  assert.match(input("category").getAttribute("aria-describedby")!, /category-error/);
  assert.equal(input("amount").value, "10");
  assert.equal(input("description").value, "Bus");
});

function button(text: string) {
  const found = [...document.querySelectorAll<HTMLButtonElement>("button")].find(item => item.textContent === text);
  assert.ok(found, `Missing button: ${text}`);
  return found;
}
async function click(text: string) { await act(async () => { button(text).click(); }); }
function stored() { return JSON.parse(dom.window.localStorage.getItem("spendly:data")!).expenses; }
const saved = { id: "saved-one", amountCents: 1234, description: "Lunch", category: "Food & Drink", date: "2024-02-01", createdAt: "2024-02-01T12:00:00.000Z", updatedAt: "2024-02-01T12:00:00.000Z" };
function seed() { dom.window.localStorage.setItem("spendly:data", JSON.stringify({ version: 1, expenses: [saved] })); }

test("quota failure keeps every typed field and publishes no saved record until retry", async () => {
  await mount(); fillValid(); const date = input("date").value;
  const fail = mock.method(Object.getPrototypeOf(dom.window.localStorage), "setItem", () => { throw new Error("Quota"); });
  await submit();
  assert.ok(document.querySelector("form")); assert.equal(input("description").value, "  Lunch  "); assert.equal(input("amount").value, "12.34"); assert.equal(input("date").value, date);
  assert.equal(dom.window.localStorage.getItem("spendly:data"), null); assert.match(document.body.textContent!, /not been saved/);
  fail.mock.restore(); await submit(2); assert.equal(stored().length, 1); assert.match(document.body.textContent!, /Expense saved/);
});

test("editing loads saved values and persists changes under the same id", async () => {
  seed(); await mount("/expenses/saved-one/edit");
  assert.equal(input("amount").value, "12.34"); assert.equal(input("description").value, "Lunch"); assert.equal(input("date").value, "2024-02-01");
  input("amount").value = "25.50"; input("description").value = "Updated lunch"; await submit();
  assert.equal(stored()[0].id, "saved-one"); assert.equal(stored()[0].amountCents, 2550); assert.equal(stored()[0].createdAt, saved.createdAt);
  assert.match(document.body.textContent!, /Expense updated/); assert.match(document.body.textContent!, /Updated lunch/);
});

test("failed edit retains the form and original saved data", async () => {
  seed(); await mount("/expenses/saved-one/edit"); input("description").value = "Keep my edit";
  const raw = dom.window.localStorage.getItem("spendly:data"); const fail = mock.method(Object.getPrototypeOf(dom.window.localStorage), "setItem", () => { throw new Error("Quota"); });
  await submit(); assert.equal(input("description").value, "Keep my edit"); assert.equal(dom.window.localStorage.getItem("spendly:data"), raw);
  fail.mock.restore(); await submit(); assert.equal(stored()[0].description, "Keep my edit");
});

test("a missing edit id has a clear route back and does not modify storage", async () => {
  seed(); const raw = dom.window.localStorage.getItem("spendly:data"); await mount("/expenses/missing/edit");
  assert.match(document.body.textContent!, /Expense not found/); assert.equal(document.querySelector("form"), null);
  assert.equal(document.querySelector('a[href="/expenses"]')?.textContent, "Back to expenses"); assert.equal(dom.window.localStorage.getItem("spendly:data"), raw);
});

test("delete cancel preserves data; failed confirmation preserves it; a retry deletes the last record", async () => {
  seed(); await mount("/expenses"); const raw = dom.window.localStorage.getItem("spendly:data");
  await click("Delete"); assert.equal(document.activeElement, button("Confirm delete")); await click("Cancel delete"); assert.equal(document.activeElement, button("Delete")); assert.equal(dom.window.localStorage.getItem("spendly:data"), raw);
  await click("Delete"); const fail = mock.method(Object.getPrototypeOf(dom.window.localStorage), "setItem", () => { throw new Error("Quota"); });
  await click("Confirm delete"); assert.equal(dom.window.localStorage.getItem("spendly:data"), raw); assert.match(document.body.textContent!, /Could not save/);
  fail.mock.restore(); await click("Confirm delete"); assert.deepEqual(stored(), []); assert.match(document.body.textContent!, /starts with one purchase/);
  assert.equal(document.activeElement, document.querySelector("h1"));
});

test("corrupt data remains unchanged until a separately confirmed successful reset", async () => {
  dom.window.localStorage.setItem("spendly:data", "{"); await mount("/expenses");
  assert.match(document.body.textContent!, /original data has been kept/); assert.equal(document.querySelector("form"), null); assert.ok(button("Download original data"));
  await click("Reset saved data"); await click("Cancel reset"); assert.equal(document.activeElement, button("Reset saved data")); assert.equal(dom.window.localStorage.getItem("spendly:data"), "{");
  await click("Reset saved data"); const fail = mock.method(Object.getPrototypeOf(dom.window.localStorage), "setItem", () => { throw new Error("Quota"); });
  await click("Confirm reset"); assert.equal(dom.window.localStorage.getItem("spendly:data"), "{");
  fail.mock.restore(); await click("Confirm reset"); assert.deepEqual(stored(), []); assert.match(document.body.textContent!, /starts with one purchase/);
});

test("denied storage is a recovery screen; retry loads the existing dataset", async () => {
  seed(); const fail = mock.getter(dom.window, "localStorage", () => { throw new Error("Denied"); }); await mount("/expenses");
  assert.match(document.body.textContent!, /storage is unavailable/); assert.equal(document.querySelector('ul[aria-label="Saved expenses"]'), null);
  fail.mock.restore(); await click("Retry loading"); assert.match(document.body.textContent!, /Lunch/);
});

test("an external storage change cannot overwrite records, and reload retains the typed form", async () => {
  seed(); await mount(); fillValid(); dom.window.localStorage.setItem("spendly:data", JSON.stringify({ version: 1, expenses: [{ ...saved, description: "External change" }] }));
  await submit(); assert.match(document.body.textContent!, /saved data changed/); assert.equal(stored().length, 1); assert.equal(stored()[0].description, "External change");
  await click("Reload saved data"); assert.equal(input("description").value, "  Lunch  "); await submit(); assert.equal(stored().length, 2);
});

test("reloading corrupt storage after a failed save keeps the complete draft mounted", async () => {
  seed(); await mount(); fillValid(); const date = input("date").value;
  dom.window.localStorage.setItem("spendly:data", "{"); await submit(); await click("Reload saved data");
  assert.ok(document.querySelector("form"), "The recovery read must not unmount the form");
  assert.equal(input("description").value, "  Lunch  "); assert.equal(input("amount").value, "12.34"); assert.equal(input("category").value, "Food & Drink"); assert.equal(input("date").value, date);
  assert.equal(dom.window.localStorage.getItem("spendly:data"), "{");
  seed(); await click("Reload saved data"); await submit(); assert.equal(stored().length, 2);
});

test("denied storage during form reload preserves the draft and permits retry after repair", async () => {
  seed(); await mount(); fillValid(); const date = input("date").value;
  const fail = mock.getter(dom.window, "localStorage", () => { throw new Error("Denied"); });
  await submit(); await click("Reload saved data");
  assert.ok(document.querySelector("form"), "Denied reads must not unmount the form");
  assert.equal(input("description").value, "  Lunch  "); assert.equal(input("date").value, date);
  fail.mock.restore(); await click("Reload saved data"); await submit(); assert.equal(stored().length, 2);
});

function localClock(day = 18) {
  let now = new RealDate(2026, 9, day, 12).getTime();
  class ClockDate extends RealDate {
    constructor(value?: string | number) { super(value === undefined ? now : value); }
    static now() { return now; }
  }
  globalThis.Date = ClockDate as DateConstructor;
  return { moveToDay(nextDay: number) { now = new RealDate(2026, 9, nextDay, 12).getTime(); } };
}
function seedWeek(items: Record<string, unknown>[]) {
  dom.window.localStorage.setItem("spendly:data", JSON.stringify({ version: 1, expenses: items.map((item, index) => ({ ...saved, id: `week-${index}`, date: "2026-10-18", ...item })) }));
}

test("weekly summary shows category amounts, percentages, counts and the largest category", async () => {
  localClock(); seedWeek([{ amountCents: 300, description: "Lunch" }, { amountCents: 100, category: "Transport", description: "Bus" }]); await mount("/summary");
  assert.match(document.body.textContent!, /Food & Drink leads this week/); assert.match(document.body.textContent!, /75% of your recorded spending/); assert.match(document.body.textContent!, /2 expenses recorded this week/);
  const list = document.querySelector('ol[aria-label="Weekly spending by category"]')!; assert.equal(list.children.length, 2);
  assert.match(list.children[0].textContent!, /Food & Drink/); assert.match(list.children[0].textContent!, /\$3\.00/); assert.match(list.children[1].textContent!, /25%/);
  assert.ok(list.querySelector('[aria-hidden="true"]')); assert.equal(document.querySelector('a[href="/expenses"]')?.textContent, "View all expenses");
});

test("tied categories are described as tied, and a tiny category gets an honest rounded label", async () => {
  localClock(); seedWeek([{ amountCents: 100 }, { amountCents: 100, category: "Transport" }]); await mount("/summary");
  assert.match(document.body.textContent!, /top categories are tied/); assert.match(document.body.textContent!, /Food & Drink, Transport each account for/);
  await act(async () => root!.unmount()); root = undefined; document.body.replaceChildren();
  seedWeek([{ amountCents: 99999999 }, { amountCents: 1, category: "Transport" }]); await mount("/summary");
  assert.match(document.body.textContent!, /<0\.1%/); assert.match(document.body.textContent!, /\$0\.01/);
});

test("a week with only older history has no invented insight and retains a history link", async () => {
  localClock(); seed(); await mount("/summary");
  assert.match(document.body.textContent!, /No expenses recorded this week/); assert.match(document.body.textContent!, /earlier expenses are still in your history/);
  assert.equal(document.querySelector('ol[aria-label="Weekly spending by category"]'), null);
  assert.equal(document.querySelector('a[href="/expenses"]')?.textContent, "View earlier expenses"); assert.equal(stored().length, 1);
});

test("a completely empty weekly summary invites the first real expense", async () => {
  localClock(); await mount("/summary");
  assert.match(document.body.textContent!, /No expenses recorded this week/); assert.equal(document.querySelector('a[href="/expenses/new"]')?.textContent, "Add your first expense");
  assert.equal(document.querySelector('ol[aria-label="Weekly spending by category"]'), null);
});

test("returning overview shows the three most recent expenses and keeps old history in a new week", async () => {
  localClock(19); seedWeek([{ description: "One", date: "2026-10-18" }, { description: "Two", date: "2026-10-17" }, { description: "Three", date: "2026-10-16" }, { description: "Four", date: "2026-10-15" }]); await mount("/");
  assert.match(document.body.textContent!, /Welcome back/); assert.match(document.body.textContent!, /No expenses recorded this week/);
  const list = document.querySelector('ul[aria-label="Recent saved expenses"]')!; assert.equal(list.children.length, 3); assert.match(list.children[0].textContent!, /One/); assert.doesNotMatch(list.textContent!, /Four/);
  assert.equal(document.querySelector('a[href="/summary"]')?.textContent, "Review this week"); assert.equal(stored().length, 4);
});

test("returning to an open tab after Monday updates the weekly period and categories", async () => {
  const clock = localClock(); seedWeek([{ description: "Sunday lunch", amountCents: 1000 }, { description: "Monday bus", amountCents: 500, category: "Transport", date: "2026-10-19" }]); await mount("/summary");
  assert.match(document.body.textContent!, /Food & Drink leads this week/); assert.match(document.body.textContent!, /2026-10-12/);
  clock.moveToDay(19); await act(async () => { window.dispatchEvent(new dom.window.Event("focus")); });
  assert.match(document.body.textContent!, /Transport leads this week/); assert.match(document.body.textContent!, /2026-10-19/);
  assert.doesNotMatch(document.body.textContent!, /Food & Drink leads this week/); assert.equal(stored().length, 2);
});

test("summary, returning, delete/edit and recovery views have no dangling accessible references", async () => {
  localClock(); seedWeek([{ description: "Lunch" }]);
  function checkReferences() {
    for (const element of document.querySelectorAll("[aria-labelledby], [aria-describedby]")) {
      for (const attribute of ["aria-labelledby", "aria-describedby"]) {
        for (const id of (element.getAttribute(attribute) ?? "").split(/\s+/).filter(Boolean)) assert.ok(document.getElementById(id), `Missing accessible target: ${id}`);
      }
    }
    for (const control of document.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select")) assert.ok(control.labels?.length, `Unlabeled field: ${control.name}`);
  }
  async function next(route: string) {
    if (root) await act(async () => root!.unmount()); root = undefined; document.body.replaceChildren(); await mount(route); checkReferences();
  }
  await next("/summary"); await next("/"); await next("/expenses"); await click("Delete"); checkReferences();
  await next("/expenses/week-0/edit");
  if (root) await act(async () => root!.unmount()); root = undefined; document.body.replaceChildren();
  dom.window.localStorage.setItem("spendly:data", "{"); await mount("/expenses"); await click("Reset saved data"); checkReferences();
});
