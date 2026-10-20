import assert from "node:assert/strict";
import test, { after, afterEach, mock } from "node:test";
import { JSDOM } from "jsdom";
import { act } from "react";
import { QuickGuide } from "../src/components/quick-guide";

const dom = new JSDOM("<!doctype html><html><body></body></html>", { url: "http://localhost" });
for (const name of ["window", "document", "HTMLElement", "Event", "MouseEvent", "KeyboardEvent"]) {
  Object.defineProperty(globalThis, name, { value: dom.window[name as keyof Window], configurable: true });
}
Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", { value: true, configurable: true });
const { createRoot } = await import("react-dom/client");
let root: ReturnType<typeof createRoot> | undefined;
async function mount() {
  const container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root!.render(<QuickGuide />));
}
async function click(label: string) {
  const button = [...document.querySelectorAll("button")].find(item => item.textContent === label || item.getAttribute("aria-label") === label);
  assert.ok(button, label);
  await act(async () => button.click());
}
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  document.body.replaceChildren();
  mock.restoreAll();
  dom.window.localStorage.clear();
});
after(() => dom.window.close());

test("first visit offers three steps, back navigation and a direct expense action", async () => {
  await mount();
  assert.match(document.body.textContent!, /Record your first expense/);
  await click("Next");
  assert.match(document.body.textContent!, /See your saved records/);
  await click("Back");
  assert.match(document.body.textContent!, /Record your first expense/);
  await click("Next");
  await click("Next");
  assert.match(document.body.textContent!, /Review your week/);
  assert.equal(document.querySelector('a[href="/expenses/new"]')?.textContent, "Add an expense");
});

test("skip persists independently of expense data, survives remount and allows replay", async () => {
  dom.window.localStorage.setItem("spendly:data", "keep expenses");
  await mount();
  await click("Skip");
  assert.equal(document.querySelector('[aria-label="Quick start guide"]'), null);
  assert.equal(dom.window.localStorage.getItem("spendly:data"), "keep expenses");
  await act(async () => root!.unmount());
  root = undefined;
  await mount();
  assert.equal(document.querySelector('[aria-label="Quick start guide"]'), null);
  await click("Quick guide");
  assert.match(document.body.textContent!, /Record your first expense/);
  assert.equal(document.activeElement?.tagName, "H2");
  await act(async () => document.dispatchEvent(new dom.window.KeyboardEvent("keydown", { key: "Escape", bubbles: true })));
  assert.equal(document.activeElement?.textContent, "Quick guide");
});

test("blocked storage does not prevent opening or dismissing the guide", async () => {
  mock.method(dom.window.Storage.prototype, "getItem", () => { throw new Error("Denied"); });
  mock.method(dom.window.Storage.prototype, "setItem", () => { throw new Error("Denied"); });
  await mount();
  await click("Close guide");
  assert.equal(document.querySelector('[aria-label="Quick start guide"]'), null);
  await click("Quick guide");
  assert.ok(document.querySelector('[aria-label="Quick start guide"]'));
});

test("starting the main task collapses the guide without moving focus or touching saved data", async () => {
  dom.window.localStorage.setItem("spendly:data", "keep expenses");
  await mount();
  const main = document.createElement("main");
  const input = document.createElement("input");
  main.append(input);
  document.body.append(main);
  await act(async () => input.focus());
  assert.equal(document.querySelector('[aria-label="Quick start guide"]') === null, true);
  assert.equal(document.activeElement === input, true);
  assert.equal(dom.window.localStorage.getItem("spendly:data"), "keep expenses");
  assert.equal(dom.window.localStorage.getItem("spendly:quick-guide:v1"), null);
  await click("Quick guide");
  assert.ok(document.querySelector('[aria-label="Quick start guide"]'));
});
