# Seven-Phase Delivery Plan

The repository's pre-existing `Initial commit` is not counted as one of these seven assignment milestones. Each phase must be checked before its corresponding commit. Scope changes should update this plan transparently.

| Phase | Deliverable and exit criteria | Planned commit |
| --- | --- | --- |
| 1 | Product scope, three independent sourced research reports, complete flows, README Mermaid, AGENTS.md, and a documented requirements check | `docs: define Spendly scope and user flows` |
| 2 | Next.js and Tailwind scaffold, route shell, shared UI and navigation; build and lint checks | `chore: initialize Next.js app and shared UI` |
| 3 | Actionable first visit, local-data explanation, entry links, responsive and keyboard review of onboarding | `feat: create first-visit onboarding` |
| 4 | Single-column expense form, field validation, input retention, accessible feedback; verify valid/invalid submission behavior | `feat: add expense form with validation` |
| 5 | Durable local storage, history, immediate totals, edit/delete, storage recovery; execute refresh, close/reopen, empty, invalid, and corrupt-data checks | `feat: persist and manage expenses locally` |
| 6 | Weekly category review and returning states; check date boundaries, calculations, keyboard access, labels, focus, and contrast | `feat: add weekly spending review` |
| 7 | Deploy to Vercel, actual online agent first-run and revisit check, fix observed issues and retest, finalize README evidence and submission links | `fix: address first-run feedback and finalize documentation` |

## Phase boundaries

Phase 1 is documentation and research only. Phase 2 must not start without the user's confirmation. Do not install Next.js or generate application files in Phase 1.

Phase 4 may use temporary in-memory state for integration checks. Durable persistence and final edit/delete behavior belong to Phase 5. Never describe in-memory success as persistence. Phase 6 must use the already verified storage layer. Phase 7's exact commit wording should describe actual changes if no implementation defects are found; do not invent defects to justify a `fix` message.

## Collaborative process

The user chooses the product direction, reviews the design and milestones, and evaluates the findings. Preserve meaningful decisions and actual feedback in documentation. This is an iterative assignment, not a one-shot generated submission.

## Submission and presentation

Submit a working Vercel URL and the GitHub repository URL in Google Classroom. The assignment states October 20, 2026, at 5:30 PM; its timezone is not specified. Prepare to explain the target user, first-use value, return motivation, retained data, agent feedback and fixes, and what was easy or difficult about the agent workflow.
