# Phase 6: Weekly Review and Returning Visit

## Authorization and scope

The user authorized the next part while Phase 5 was finishing. Phase 5 is separately checked, committed and pushed before this milestone. Implement only Phase 6; deployment and the live first-run check remain Phase 7. Commit/push `feat: add weekly spending review`.

## Design

- Replace `/summary` with this week's recorded total, date range, expense count, category amounts, percentages and readable proportional bars. Categories are ordered by spending; ties are explained honestly. No sample data or chart dependency.
- Empty current-week summaries explicitly say no expenses were recorded this week, with add/history links. Older history remains reachable. No-record summaries invite the first purchase.
- The returning home view shows the week, a path to category analysis, and the three most recent saved purchases. A new week does not hide older records.
- Refresh the local calendar day on window focus, visibility changes and a lightweight minute check, so returning to an open tab after a week boundary updates the period without a new save.
- Use shared tokens, semantic headings/links/lists, visible focus and existing controls. Category values and labels carry the meaning independently of bar color; bars are decorative and have no motion.

## Verification

Write failing tests for exact cents/category sums/counts/rounding, ties, week boundaries and history exclusion before implementing review aggregation. Add real-component DOM cases for populated/tied/empty weeks, old history, no records, returning home and focus-triggered day rollover. Run full tests, typecheck, ESLint, production build and route checks. Recheck text/control contrast, ARIA references, reduced-motion behavior and responsive CSS. Actual visual/keyboard/screen-reader and browser lifecycle checks remain explicitly unverified if the browser connection stays unavailable.

No changes to storage schema, runtime dependencies, auth, APIs or deployment. Preserve the original flows and existing persistence checks.
