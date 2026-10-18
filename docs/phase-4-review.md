# Phase 4 Verification

Date: October 18, 2026. Environment: macOS, Node.js 24.12.0, npm 11.6.2.

## Scope and Git authorization

Phase 3 commit `b8bcd12c630d242724c3997a360f30538341628a` was pushed to the existing GitHub repository. The user authorized pushing subsequent completed milestone commits; this does not authorize implementing future phases without confirmation. Phase 4's commit is `feat: add expense form with validation`.

## Implemented behavior

- `/expenses/new` has four labeled required fields in one column: USD amount, description, native category select, and date.
- Pure validation produces integer cents, trims descriptions, enforces amount/length/category rules, and rejects missing, impossible, or future dates.
- The browser's local date initializes the native date input after mount, avoiding a server timezone default. Input supports React 19 native ref props.
- Validation errors are adjacent to fields, connected with aria-describedby/aria-invalid, and use actionable wording. Submission focuses the first invalid field. The uncontrolled form retains all typed values.
- Valid submission adds a record to a root-mounted in-memory context and navigates to `/expenses`. Temporary records show description, category, date, and formatted USD amount. Feedback says `Expense added for this visit`, not `Expense saved`.
- A synchronous guard prevents duplicate submissions during navigation. An add failure preserves values, explains the issue, and permits retry. Cancel links to records without submitting.
- Home, empty states, the form, and the list make the temporary lifecycle clear. No durable history, totals, edit/delete, localStorage, backend, account, or API was implemented. The unused generic placeholder component was removed.

## Executed verification

| Check | Actual result |
| --- | --- |
| Validation test-first cycle | 53 tests failed against empty function stubs with expected assertion failures; the implemented validator then passed all 53 |
| Full automated suite | 60/60 pass: 53 validation/date tests and seven real-component simulated-DOM integration tests |
| UTC+14 run | The same 60 tests pass with `TZ=Pacific/Kiritimati`, including local-date initialization |
| TypeScript | `npm run typecheck` passes |
| ESLint | `npm run lint` passes with zero warnings/errors |
| Production build | `npm run build` succeeds; four routes statically prerendered using the existing Webpack setup |
| Production HTTP | `/`, `/expenses/new`, `/expenses`, `/summary` all return HTTP 200 |
| Form markup | Four real labeled required controls, native category select, decimal input mode, browser-initialized date, hint ids, and temporary-data notice verified in rendered HTML |
| Page structure | One h1, one correct current navigation item, shared route links, skip link, and resolved ARIA references on all four pages |
| Production dependencies | `npm audit --omit=dev` reports zero vulnerabilities |
| Documentation/source | English content, local links, unchanged matching Mermaid, package/lock metadata, no storage integration, and whitespace reviewed before commit |

## What the DOM tests prove

The tests render the real ExpenseForm, ExpenseProvider, ExpenseList, and shared field components with React DOM in jsdom. The navigation boundary is a small AppRouterContext adapter that changes the rendered route while retaining the actual provider. Assertions cover user-visible records rather than mock calls. The only fault injection replaces UUID generation for a submission-failure/retry check.

The seven integration cases cover local-date/required labels; invalid submission retaining all values and focusing the amount; empty submission with all missing errors; correcting an error and duplicate submission producing one real record; failed add preserving input and clean retry; a fresh provider having no prior entries; and focus/error association on the native category select. An initial test-environment failure was caused by missing browser-global `self`; adding jsdom's window alias fixed the harness. No production browser behavior is inferred from that setup correction.

Development-only dependencies jsdom, its types, and tsx make these checks repeatable without adding runtime packages. Node 24+ is the documented project baseline, matching the tested runtime and Node type declarations. The earlier lint-only advisory chain remains documented in the Phase 2 review; no forced downgrade was applied.

## Independent review

A separate read-only reviewer inspected the implementation, tests, and documentation against the Phase 4 scope. No Critical or Important issues were found. One minor documentation issue was corrected: the design-system component table no longer refers to the deleted generic placeholder component. The reviewer did not independently run the tests/build or inspect an actual browser.

Ruling: actual browser behavior and Phase 5 persistence remain unverified; do not infer either from the DOM harness. The cost is possible browser-specific interaction defects until those tests can run. Completed milestone pushes are authorized, but Phase 5 implementation is not part of this task.

## Browser and phase limitations

Browser discovery still reports no available connection. No actual browser keyboard, date-picker, screen-reader, responsive visual, client-navigation, or deployed usability test was run. DOM focus/retention tests and HTTP responses are useful evidence but do not substitute for those checks.

Refreshing/closing has not been tested as durable persistence because durable persistence does not exist in this phase. A fresh provider is tested to be empty; this confirms the intended temporary-state contract, not localStorage behavior. Phase 5 must implement and test real refresh/reopen, empty/invalid/corrupt data, durable history, editing and deletion. Weekly totals and category analysis remain later work.

## Handoff

After independent review and final checks, create and push the single Phase 4 milestone commit, verify the remote hash, and stop before Phase 5. The local preview at `http://localhost:3000` is available for user review.
