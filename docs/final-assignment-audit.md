# Final Assignment 3 Audit

Date: October 19, 2026 (America/Chicago).
Source: all four pages of the user-supplied Design, Build, Ship - Assignment 3 - Patterns & Flows.pdf, reread for this audit.

## Assessment deliverables

| Requirement | Evidence and result |
| --- | --- |
| New everyday/weekly tool | Spendly's individual expense-entry and weekly-review purpose, docs/product.md and staged project history |
| First Visit, Main Task, Returning Visit | flows.md, README arrow sentence and Mermaid; overview, add, history and summary routes with shared navigation |
| Diagram shown in README | Matching Mermaid source in README and flows.md; user screenshot confirms GitHub rendering, recorded separately from the blocked remote attempt |
| Immediate first-visit value | Actionable empty states and direct first-expense action; optional, dismissible floating guide; deployed acceptance evidence |
| Shared components and navigation | Button, Input, FormField, Card, navigation, consistent route/active states |
| Single-column form and actionable retained-input errors | Real-component tests and deployed invalid-form/retained-values walkthrough |
| Reason to return and local persistence | Recent records, weekly category totals; exact raw data retained across refresh, tab reopen and full Chromium restart |
| Accessibility checks | Real labels, documented contrast ratios, automated focus/error checks and actual keyboard-only entry; comprehensive accessibility certification is not claimed |
| Agent first-run feedback in README | Deployed Chromium report, findings, screenshots and final guide-control follow-up linked from README |
| Next.js, Tailwind, localStorage; no accounts/database/APIs | Application implementation and package/source review; Vercel Hobby deployment |
| Three competitor subagents | Independent Spendee, Wallet and Goodbudget reports and synthesis with primary sources, first-use steps and explicitly unmeasured timing |
| Progressive GitHub history | Seven implementation milestones plus truthful documentation/verification follow-ups; not a one-shot submission |
| Class explanation | docs/presentation-notes.md covers design, onboarding, retention, agent feedback and workflow; the user must prepare to explain these personally |

## Fresh checks in this local audit

- 131 tests passed, zero failures/skips.
- TypeScript route generation/typecheck passed.
- ESLint passed with zero warnings.
- Production build passed.
- Anonymous HTTP checks returned 200 for /, /expenses/new, /expenses, /summary and /expenses/missing/edit.
- README/report internal evidence links and matching Mermaid source were checked.
- These local/HTTP checks do not claim a new browser walkthrough. Actual interaction evidence comes from the committed remote Chromium reports and user-provided GitHub screenshot.

## Process qualifications

The PDF specifically mentions plan mode (/plan) and checking loaded context with /context. Agent-assisted planning, user review and direct reading/application of root AGENTS.md are established. No execution record for either exact slash command exists. The user explicitly accepted the existing planning as complete; this does not retroactively prove command execution or guarantee how the instructor will assess that process detail. There is no CLAUDE.md to migrate.

The optional guide remains skippable; the useful first purchase does not require completing a tour. No defect or fix has been invented to satisfy the feedback requirement.

## Submission actions

The main product and assessment artifacts have evidence. Google Classroom submission is not confirmed, and readiness to present is a user responsibility. Submit the production and GitHub links before the PDF's October 20, 5:30 PM deadline; the PDF does not state a timezone. Safari/Firefox, screen-reader use and exhaustive keyboard/state/device coverage remain explicitly outside the verified test scope.
