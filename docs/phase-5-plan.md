# Phase 5: Local Persistence Implementation Plan

## Scope

Implement the approved Phase 5 milestone: versioned localStorage, validated durable records, immediate weekly total, history, edit/delete, loading and returning states, and recovery. Commit and push `feat: persist and manage expenses locally`, then stop before Phase 6. Category breakdown and deployment remain later work.

## Interfaces and tasks

1. `src/lib/expense-storage.ts`: a StoragePort boundary; read/validate a version 1 envelope under `spendly:data`; reject an entire invalid dataset without modifying its raw value. Validate cents, fields, calendar dates, timestamps and unique ids. Guard writes against an externally changed raw value. Sorting is deterministic.
2. `src/lib/expense-store.ts`: a small subscribable client store with loading/ready/invalid/unavailable states. Read only after subscribing in the browser; emit successful add/update/delete state only after localStorage writes succeed. Failed writes keep current records and preserve the form. Explicit reset must compare the original raw value before overwriting.
3. `ExpenseProvider` uses useSyncExternalStore with a stable loading server snapshot. StorageStatus gives retry, local raw download when readable, and a separately confirmed reset. Avoid an empty-state flash or treating denied storage as a first visit.
4. Reuse ExpenseForm for add/edit. The edit page loads saved values, handles missing ids, retains values on failures, and redirects only after a successful write. History has a separately confirmed deletion, cancel, error feedback and focus management. Home distinguishes no records from loaded history. A shared weekly-total view supplies date range and total without category analysis.
5. Update temporary preview wording to truthful browser-only persistence copy. Keep private data local and expose no database, auth, backend or external runtime API.

## Tests

Write failing storage tests before implementation, then run them against real Web Storage in jsdom and the pure validation functions. Cover missing/empty/invalid/corrupt envelopes, invalid records/versions, unavailable read, quota/write errors, conflict protection, reset confirmation, exact cents and ordering. Add real-component integration tests for add/reload, a new provider lifetime retaining data, failed writes preserving form/records, edit/missing-id/delete/cancel/recovery. Node/DOM reload simulation is not an actual browser refresh or close/reopen.

Browser discovery currently reports no connections. Continue with automated and production-route checks; actual browser refresh, closing/reopening and visual/accessibility interactions must stay explicitly unverified if that remains true. No simulated storage result may be reported as passing an actual browser lifecycle test.

## Design decisions

Stored calendar dates remain valid even if the browser clock/timezone later changes; future-date prohibition applies when adding/editing. Timestamp validation requires canonical ISO strings and updatedAt >= createdAt. Cross-tab changes are protected by a raw-value comparison before writes; no multi-tab transactional guarantee is claimed. Local saving is confined to the current browser profile and origin. No new dependencies are needed.
