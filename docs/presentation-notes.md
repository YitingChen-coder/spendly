# Spendly Class Presentation Notes

## Design process

Spendly is for an individual who wants to understand where everyday money goes. Quick manual entry supports weekly category review. The user chose this priority, approved the scope and worked through distinct checked milestones rather than accepting one generated application. Research borrowed clear entry/category feedback while omitting account, wallet and budget setup.

## Onboarding

A first visit explains the tool and offers an immediate first-expense action. Four fields are enough: amount, description, category and date. Date defaults to local today. Adjacent errors explain the correction and keep existing input. No signup or mandatory tour delays entry.

## Return motivation and retained data

The weekly review identifies category amounts, shares, counts and tied leaders honestly. Returning home shows recent purchases and keeps older history reachable during an empty week. Browser localStorage stores versioned validated expenses. It is local to the browser profile/origin and does not sync across devices. Clearing site data removes records.

## Agent feedback and changes

Independent code review found that a failed save followed by a corrupt/denied reload could unmount the uncontrolled form and lose its draft. Regression tests reproduced it; guarded form reload now preserves input. Another review caught conflicting card spacing and stale documentation, which were corrected. These are code/design review findings, not online new-user usability feedback.

A user-supplied report from a separate remote Codex session records successful deployed Chromium first-run, validation, totals, persistence and recovery checks. No application defect was reported, so no usability-driven code fix is claimed. README records the feedback and source limitations. Screenshot files and comprehensive manual accessibility checks remain outstanding.

## Agentic workflow

The user set the product priority, language rules, phase boundaries, commit policy and mandatory research/persistence/deployed-test requirements. Three independent research agents studied separate products. The implementation used test-first validation/storage boundaries, focused review and meaningful milestone commits. Difficult parts included local-date handling, preserving drafts through recovery, honest test claims and deployment/browser access. Code, docs and commits use English; discussion uses Chinese.
