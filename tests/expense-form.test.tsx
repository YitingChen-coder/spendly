import assert from "node:assert/strict";
import test, { after, afterEach, mock } from "node:test";
import { JSDOM } from "jsdom";
import { act, useState } from "react";
import { AppRouterContext, type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime.js";
import { ExpenseProvider } from "../src/components/expense-provider";
import { ExpenseForm } from "../src/components/expense-form";
import { ExpenseList } from "../src/components/expense-list";

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
  return <AppRouterContext.Provider value={router}><ExpenseProvider>{route === "/expenses/new" ? <ExpenseForm /> : <ExpenseList />}</ExpenseProvider></AppRouterContext.Provider>;
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

afterEach(async () => {
  if (root) await act(async () => { root!.unmount(); });
  root = undefined;
  document.body.replaceChildren();
  mock.restoreAll();
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

test("correcting an error adds one normalized purchase with clear temporary feedback", async () => {
  await mount();
  await submit();
  fillValid();
  const date = input("date").value;
  await submit(2);
  assert.equal(document.querySelector("form"), null);
  const list = document.querySelector('ul[aria-label="Expenses added this visit"]')!;
  assert.equal(list.children.length, 1);
  assert.match(list.textContent!, /Lunch/);
  assert.match(list.textContent!, /\$12\.34/);
  assert.match(list.textContent!, /Food & Drink/);
  assert.equal(list.querySelector("time")?.getAttribute("datetime"), date);
  assert.match(document.querySelector('[role="status"]')!.textContent!, /added for this visit/);
  assert.match(document.body.textContent!, /Refreshing or closing this page clears them/);
});

test("a failed temporary add preserves input and allows one clean retry", async () => {
  await mount();
  fillValid();
  const fail = mock.method(globalThis.crypto, "randomUUID", () => { throw new Error("Temporary id failure"); });
  await submit();
  assert.match(document.querySelector('[role="alert"]')!.textContent!, /could not be added/);
  assert.equal(input("amount").value, "12.34");
  assert.equal(input("description").value, "  Lunch  ");
  assert.equal(document.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled, false);
  fail.mock.restore();
  await submit();
  assert.equal(document.querySelector('ul[aria-label="Expenses added this visit"]')!.children.length, 1);
});

test("a fresh provider has no previous visit's temporary records", async () => {
  await mount();
  fillValid();
  await submit();
  assert.ok(document.querySelector('ul[aria-label="Expenses added this visit"]'));
  await act(async () => { root!.unmount(); });
  root = undefined;
  document.body.replaceChildren();
  await mount("/expenses");
  assert.equal(document.querySelector('ul[aria-label="Expenses added this visit"]'), null);
  assert.match(document.body.textContent!, /starts with one purchase/);
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
