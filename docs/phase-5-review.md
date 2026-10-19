# Phase 5 Verification

Date: October 18, 2026. Environment: macOS, Node.js 24.12.0, npm 11.6.2. Storage key: `spendly:data`; schema version: 1.

## Implemented scope

Durable add/edit/delete, sorted history, weekly total with date range, first-visit versus loaded-data view, and recovery for corrupt/invalid/unavailable storage. The dynamic edit route preserves ids and creation timestamps and handles missing records. Writes complete before success feedback and state publication. Failed saves preserve the uncontrolled form and existing saved data. Deletion and reset require separate confirmation; cancellation does not write. Deleted-last-record returns an actionable empty view.

Read/validation and mutations live outside UI components. The provider reads storage after hydration using a stable loading snapshot; denied reads are not empty first visits. Schema validation is all-or-nothing: envelope/version, safe positive integer cents within limits, trimmed description, allowed category, real calendar date, canonical ISO timestamps, update order, URL-safe bounded unique ids. Stored calendar dates are not invalidated solely by a changed browser clock/timezone. Sorting uses expense date, creation timestamp, then id.

Recovery retains the original raw value, offers retry, a local raw download and separately confirmed reset. Expected-raw checks prevent stale writes/reset overwriting an externally changed value; this is a best-effort conflict guard, not a multi-tab transaction guarantee. Form-specific reload rejects invalid/denied reads without unmounting the draft.

## Automated evidence

- Storage tests were written against stubs and failed before implementation, then passed. Weekly-boundary tests also failed against an initial stub before implementation.
- Final suite: **116/116 pass**. Coverage includes missing key, valid empty dataset, empty string, JSON null, malformed JSON, invalid envelope/version, record types/limits/calendar dates/timestamps/ids, duplicates, deterministic sorting, denied reads, failed add/edit/delete/reset writes, conflicts, and raw preservation.
- Real-component React DOM/jsdom tests cover saved-value edit prefill, same-id updates, missing ids, form retention after quota failures, one clean retry, confirmed/canceled deletion and reset, delete focus, denied storage retry, valid external reload, and corrupt/denied reload preserving all draft fields.
- Provider remount restores records from the same jsdom Web Storage. This simulates losing component memory while keeping the storage area; it is not a browser refresh.
- A separate test uses Node's experimental file-backed Web Storage: one process writes and exits, two fresh processes read exactly the saved records without reseeding. This verifies physical storage across process lifetimes, not actual browser tab/site close behavior.
- Weekly totals use exact cents and Monday-Sunday local calendar boundaries; tests cover older entries, Monday/Sunday, year changes and a daylight-saving week. Category analysis is not included.
- Typecheck, zero-warning ESLint and production build pass. Production requests to `/`, `/expenses`, `/expenses/new`, `/summary`, and `/expenses/missing/edit` all return HTTP 200 with one heading/current navigation item and the stable loading shell. Server HTML contains no premature form/empty state. Final English-document/link/fence/whitespace checks pass; Mermaid and dependency files are unchanged.

## Independent review and fixes

A read-only reviewer found one Important recovery issue: after a failed save, a reload that encountered corrupt or denied storage would replace the route with recovery and unmount the form. Two regression cases reproduced the loss (114 passing, two failing), then passed after adding a guarded form reload. The form now stays mounted until the user explicitly navigates elsewhere; no corrupt data is overwritten. Full suite after the fix: 116 passing.

The reviewer also noted that data ids should not determine DOM confirmation ids. Delete confirmation now uses React useId. Separately, storage ids are validated as URL-safe tokens; two added cases first failed and then passed. There are no outstanding Critical or Important findings from that review. The reviewer did not rerun tests/build or perform browser checks.

## Browser lifecycle requirements: not yet verified

Browser discovery returned no available connections. Therefore actual page refresh, closing all site tabs and reopening in the same browser profile, real keyboard/date-picker/reader behavior and responsive visuals remain **not run**. The two lifecycle simulations above must not be reported as satisfying an actual browser check. Raw-data download code is implemented but its browser download interaction was not exercised.

When a browser is available, add three known expenses on the deployed/local origin, refresh and compare ids/cents/dates/totals, then separately close all site tabs and reopen that exact origin/profile. Also retest recovery, keyboard/focus and the download. Record environment and actual results. The deployed agent first-run check remains mandatory in Phase 7.

## Phase boundary and follow-on authorization

No category breakdown, backend, account, database, external runtime API or deployment was added. No new dependency was installed. The user's later “continue the next part” instruction arrived during final review and authorizes Phase 6 after this checked Phase 5 milestone is separately committed and pushed. Do not combine the two phases in one commit.
