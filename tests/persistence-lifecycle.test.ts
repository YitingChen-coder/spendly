import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

// This exercises real file-backed Web Storage, not a browser refresh or tab close.
test("file-backed Web Storage survives a stopped runtime and a new runtime without reseeding", () => {
  const directory = mkdtempSync(join(tmpdir(), "spendly-lifecycle-"));
  const file = join(directory, "storage.db");
  const moduleUrl = new URL("../src/lib/expense-store.ts", import.meta.url).href;
  function run(body: string) {
    const script = `import { createExpenseStore } from ${JSON.stringify(moduleUrl)}; const store = createExpenseStore(() => globalThis.localStorage); store.reload(); ${body}`;
    const result = spawnSync(process.execPath, ["--experimental-webstorage", `--localstorage-file=${file}`, "--import", "tsx", "--input-type=module", "--eval", script], { cwd: process.cwd(), encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(result.stdout);
  }
  try {
    const first = run('store.add({ amountCents: 1234, description: "Lunch", category: "Food & Drink", date: "2024-02-01" }); console.log(JSON.stringify(store.getSnapshot()));');
    assert.equal(first.status, "ready"); assert.equal(first.expenses.length, 1);
    const reopened = run("console.log(JSON.stringify(store.getSnapshot()));");
    assert.equal(reopened.status, "ready"); assert.deepEqual(reopened.expenses, first.expenses);
    const again = run("console.log(JSON.stringify(store.getSnapshot()));");
    assert.deepEqual(again.expenses, first.expenses);
  } finally { rmSync(directory, { recursive: true, force: true }); }
});
