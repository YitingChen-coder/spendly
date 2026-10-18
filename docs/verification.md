# Acceptance and Verification Plan

## Evidence policy

Phase 1 is documentation-only. The following application checks are **planned, not executed**. Record browser, URL/origin, date, exact steps, expected and actual results, and outcome when executing them. A future test plan is not evidence of working software.

## First visit and form (Phases 3-4)

- Start with no Spendly storage key: see a clear purpose, local-data explanation, and an immediate entry action.
- Navigate using only the keyboard; identify the active route and return without a dead end.
- Submit an empty form; see actionable messages adjacent to fields, with focus on the first error.
- Enter valid text in some fields and invalid values in others; all entered values remain.
- Check zero, negative, nonnumeric, too-large, and overprecision amounts; blank/overlong descriptions; missing category; invalid and future dates.
- Save a valid expense; verify the record, success announcement, and weekly total. Save an older expense; verify history changes but this week's total does not.
- Check cancel/back behavior and direct links to each page.

## Persistence and recovery (Phase 5)

| Case | Procedure | Required result |
| --- | --- | --- |
| Refresh | Add at least three known expenses, reload the page, then open history and summary | Exact records, ids, dates, cents, and totals persist without duplicates |
| Close and return | Close all Spendly tabs, open a new tab to the same origin in the same normal browser profile | Records and totals persist; returning experience appears |
| Missing key | Remove only the Spendly key, then reload | Normal actionable first visit, no crash |
| Valid empty data | Store a version 1 envelope with an empty expenses array | Normal empty state; no false corruption warning |
| Empty string / null payload | Set the key to an empty string or JSON null, then reload | Recovery state, no crash or silent overwrite |
| Invalid envelope | Use the wrong expenses type or unsupported version | Recovery message; original stored value preserved |
| Invalid records | Use negative, fractional or unsafe cents, missing fields, impossible dates, unknown categories, duplicate ids, and invalid timestamps | Dataset rejected safely; original data preserved; no fabricated totals |
| Corrupted JSON | Store a truncated or malformed JSON string, then reload | Recovery state; retry, raw download, and confirmed reset available |
| Storage unavailable | Simulate a read exception or denied access | Clear storage problem rather than an empty first visit |
| Write failure | Simulate quota/security failure during add/edit/delete | No durable-success claim; preserve form and stored records; retry does not duplicate |
| Recovery reset | Cancel reset, then confirm it separately | Cancel preserves original value; confirmed reset yields a valid empty dataset |
| Edit/delete persistence | Edit one expense and delete another; reload and reopen | Updated records and totals persist; deletion stays deleted |

Use a disposable browser profile/dataset for destructive and corrupt-data checks. Test the same origin; localhost and Vercel do not share localStorage. Closing a tab is distinct from refreshing. Record both separately.

## Returning, calculations, and accessibility (Phase 6)

- Verify Monday/Sunday boundaries and local dates, including an expense near midnight.
- Verify total cents, category totals, counts, and percentages against a known dataset.
- Verify a new week with old history: clear current-week empty state and reachable historical records.
- Verify no-record summary, missing edit id, canceled deletion, and deletion of the last record.
- Check keyboard order, focus visibility and restoration, labels and error associations, status announcements, and meaningful headings.
- Measure text contrast: at least 4.5:1 for normal text and 3:1 for large text. Check control boundaries and focus indicators as applicable.
- Review narrow mobile and desktop layouts; ensure form fields, navigation, and totals remain readable.

## Deployed agent first-run check (Phase 7)

An agent must actually access the deployed Vercel URL using a browser. Start with a fresh profile or clear only that origin's Spendly key. Give it this goal: `Record three everyday purchases, find where most of your money went this week, and come back to check that your records remain.`

1. Observe the first screen and whether the next action is understandable.
2. Trigger and correct one form error; confirm retained input.
3. Add three expenses in at least two categories and verify records and totals.
4. Open the weekly summary and identify the largest category.
5. Refresh, then separately close the website and reopen the same deployed origin/profile.
6. Verify the saved entries and returning experience.
7. Report observed friction with reproduction steps and severity.
8. Fix genuine issues within scope; repeat affected steps on the updated deployment.
9. Put date, actual live URL, environment, feedback, changes, retest outcomes, and limitations in README.md. Do not substitute localhost checks or source inspection for this test.

If access or deployment is blocked, record the blocker and leave this requirement unfulfilled rather than claiming completion.

## Phase 1 requirements audit

The completed Phase 1 audit is recorded separately in `phase-1-review.md`. Runtime requirements remain pending until their assigned phases.
