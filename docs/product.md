# Spendly Product Brief

Status: Phase 1 product design baseline. Phase 2 provides the shared foundation; Phase 3 adds first-visit presentation and entry links. Phase 4 adds form validation and temporary in-memory entries. Durable storage and reporting below remain planned.
Date: October 18, 2026.

## Positioning

Spendly is a simple personal expense tracker that helps people understand where their money goes. Fast manual entry supports the main outcome: a clear weekly picture of spending by category.

## Target user and recurring need

An individual, such as a student or someone managing everyday purchases, who wants to record expenses on one device and review spending each week without setting up a financial account. The student example is a design persona, not a restriction on who can use the tool.

Daily motivation: capture a purchase while it is fresh. Weekly motivation: identify the largest spending category and review the purchases behind it. A returning user should see their existing data immediately, including older records when the current week has no entries.

## User-confirmed intent

Record an expense -> immediately see the record and updated total -> return a few days later -> review history and this week's spending distribution.

The user confirmed Next.js, Tailwind CSS, localStorage, three independent competitor-research subagents, meaningful phased commits, persistence edge-case testing, and an actual deployed agent usability check. Phases 1-3 were approved. Phase 4 is authorized for the form and temporary submission feedback. The user authorizes pushing completed milestone commits; Phase 5 implementation still requires confirmation.

## Minimum feature scope

- An actionable first visit with a short explanation and a prominent `Add your first expense` action; no mandatory tour or setup wizard.
- Add an expense using amount, description, category, and date.
- Show saved records, a save confirmation, and an immediately updated weekly total.
- View all historical expenses, newest date first, with a stable ordering for entries on the same date.
- Edit an existing expense and delete an expense after a clear confirmation. Totals update after either operation.
- Show this week's total, category totals, percentages, and expense count in readable text; a simple proportional bar may supplement the values.
- Save valid records locally and recover gracefully from unavailable or invalid storage.
- Shared navigation, mobile-friendly layouts, and accessible interactions.

## Routes and navigation

| Route | Purpose | Key states |
| --- | --- | --- |
| `/` | First visit or returning overview | Loading, no expenses, current-week overview, historical data only, storage recovery |
| `/expenses/new` | Add an expense | Pristine, editing, validation errors, saving, save failure |
| `/expenses` | Expense history and immediate result | No records, saved confirmation, populated history, delete confirmation |
| `/expenses/[id]/edit` | Correct a saved record | Loaded values, errors, save failure, missing record |
| `/summary` | Weekly spending review | Current-week distribution, no expenses this week, storage failure |

Shared navigation: `Overview`, `Expenses`, `Weekly Summary`, and a prominent `Add Expense` action. Every route has a page title and a clear route back. Navigation becomes available without an onboarding gate. The first visit is the empty-data state of `/`, not a separate tour route.

## Expense fields and rules

| Field | Rule | Example error |
| --- | --- | --- |
| Amount | Required; USD; greater than zero; maximum $999,999.99; at most two decimal places | Enter an amount greater than 0 with up to 2 decimal places. |
| Description | Required after trimming; 1-100 characters | Enter what you spent money on. |
| Category | Required; one of Food & Drink, Groceries, Transport, Shopping, Bills, Entertainment, Health, Other | Choose a spending category. |
| Date | Required valid calendar date; defaults to today; cannot be in the future | Choose today or an earlier date. |

No merchant, payment method, receipt, or account fields. Keep all user input when any field fails. Move focus to the first invalid field and connect errors using `aria-describedby` and `aria-invalid`. After a successful save, navigate to `/expenses`, announce `Expense saved`, show the record and updated weekly total, and offer another entry. An older dated purchase appears in history but does not increase this week's total; make the reporting period explicit.

## Reporting and data decisions

These are explicit Phase 1 design decisions, open to user revision before implementation:

- Currency: USD only. No conversion or currency selector.
- Week: Monday through Sunday in the browser's local calendar. Display the actual date range so the meaning of `This week` is clear.
- Dates: save expense dates as local `YYYY-MM-DD` strings, avoiding UTC date shifts. Save creation/update timestamps separately.
- Amounts: integer cents; calculations use cents and format to two decimals.
- Category percentage: category cents divided by total cents; with zero total, show no percentages and invite an entry. Rounding may make displayed percentages differ slightly from 100%.
- Suggested storage key: `spendly:data`, containing a versioned object with `version: 1` and an `expenses` array. Each record has a unique id, amountCents, description, category, date, createdAt, and updatedAt.
- Validate both the envelope and every record, including unique ids, safe integer cents, allowed categories, valid dates, bounded strings, and timestamps. A missing key or a valid empty array is a normal first visit.
- Malformed JSON, unsupported versions, or any invalid record triggers a recovery state. Do not silently drop entries or replace the original key. Offer retry, an explicit local raw-data download for recovery, and a separately confirmed reset. Only a confirmed reset may replace the invalid dataset with an empty one.
- A failed read is not a first visit. A failed write preserves form input, shows an actionable error, and must not claim durable success. A retry should not duplicate the expense.
- Editing a missing record shows a clear message and a link to history. Deleting the last record returns to an actionable first-visit state.
- Storage remains local to the browser profile and origin. It does not sync across devices; clearing browser data removes records. Explain this briefly near the product's local-save message.

## Returning experience

Show `This week` with its date range, total, and recent expenses, plus a link to the category summary. When the current week is empty but history exists, say `No expenses recorded this week`, retain access to past records, and invite the next entry. Do not pretend an empty week has zero real-world spending or manufacture a comparison against missing data.

## Out of scope

Accounts, databases, backend services, external runtime APIs, bank sync, income tracking, budgeting systems, recurring automation, multi-currency support, cross-device sync, CSV import/export, receipt scanning, custom categories, analytics services, and complex chart libraries. The recovery-only raw-data download is distinct from a general export feature.

## Success criteria

A new user can record an expense without setup, recover from a form error without retyping valid fields, and immediately see saved data. A returning user can find history and understand the largest weekly spending category. Persistence, accessibility, and deployed first-run claims require the actual checks in `verification.md`; none is claimed as passed in Phase 1.
