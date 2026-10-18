# Phase 4: Expense Form Implementation Plan

## Scope and authorization

Implement the Phase 4 milestone from the approved product brief. Phase 3 was pushed as requested. The user also authorizes pushing subsequent completed milestone commits; implementation remains limited to the next phase at a time. Commit: `feat: add expense form with validation`.

## Design

- A single-column client form on `/expenses/new`: amount (USD), description, a native category select, and date defaulted to the browser's local today.
- Reuse Button, Input, FormField, and Card; provide SelectField with the same label/hint/error conventions.
- Validate a normalized draft in a pure TypeScript function before submission. Use integer cents, amount > 0 and <= $999,999.99 with at most two decimals, trimmed description 1-100 characters, an allowed category, and a real date no later than today.
- Keep the native form uncontrolled so errors never reset what the user typed. Focus the first invalid field; associate adjacent errors with controls, and show a short error announcement.
- Default the date only after mount using the native input ref, avoiding server/client timezone hydration differences. React 19 native ref props pass through Input/FormField.
- Store added records only in a client context mounted above route children, allowing Next client navigation to `/expenses` without losing the record. Show this visit's entries, per-record amount, and a temporary-entry confirmation. No aggregate totals, edit/delete, or durable storage.
- Mark the preview's refresh/close data loss clearly on the form, first-visit, and records views. No `Expense saved` or current local-save guarantee until Phase 5.
- Cancel navigates back to records without creating a record. Prevent duplicate valid submissions while navigating. If temporary submission fails, keep the form values and allow retry.

## Tests and verification

1. Write Node built-in TypeScript validation tests using hand-checked fixtures; see them fail before implementation.
2. Implement validation and run the complete test suite, covering cents precision, bounds, invalid formats, all required fields, categories, impossible/future dates, trimming, and non-mutation of raw values.
3. Run typecheck, zero-warning ESLint, and production build sequentially.
4. Check the rendered form's labels, ids, required fields, error-state markup, controls, and route links. Request the four production routes. Browser interaction is a separate check if a connection is available.
5. Update docs and inspect the diff. Get an independent read-only review, fix real findings, then commit and push this milestone. Stop before Phase 5.

## Boundaries

No new runtime dependency, backend, accounts, APIs, localStorage/sessionStorage, weekly calculations, or fake sample purchases. The temporary record view is an integration aid allowed by the phase plan, not the durable history milestone. Full first-run and revisit checks remain mandatory after deployment in Phase 7.
