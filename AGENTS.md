# Spendly Project Instructions

## Product and scope

Spendly helps people understand where their money goes while making daily expense entry simple and fast. Build for an individual who records everyday purchases and reviews weekly category totals.

Use Next.js, Tailwind CSS, and browser localStorage. Do not add accounts, authentication, a database, backend services, bank connections, external runtime APIs, or unnecessary packages. Public website research is allowed; the application itself must not depend on external APIs.

## Language

Converse with the user in Chinese. All code, identifiers, comments, interface copy, project documentation, README content, and Git commit messages must be English.

## Workflow

Follow the seven phases in `docs/phase-plan.md`. Make each phase a meaningful, checked commit; do not generate the entire application at once or split finished work into artificial commits. The existing repository initialization commit is separate from the seven planned assignment commits.

The user currently authorizes **Phase 5 only**: localStorage persistence, durable history, edit/delete, immediate weekly totals, first-visit/loaded-data distinction, and recovery for invalid or unavailable storage. Do not implement weekly category analysis or deployment yet. The user has authorized pushing subsequent completed milestone commits to the existing GitHub remote. Check, commit, and push Phase 5 as `feat: persist and manage expenses locally`, then stop before Phase 6 until the user confirms. Keep actual-browser and simulated-DOM evidence distinct, especially refresh and close/reopen checks. Update this statement when a later phase is authorized.

Phase 1 must use three actual independent subagents, one per competitor. Save sourced findings and distinguish official documentation from hands-on observations. Never claim an unperformed test or an unmeasured duration.

Before committing a phase, inspect the diff, check its acceptance criteria, and record actual verification. Use the planned English commit message unless the user changes it. Do not push, publish, or submit merely because a local commit is authorized.

## Design and implementation rules for later phases

- Preserve the first-visit, main-task, and returning-visit flows in `flows.md` and show the diagram in README.md.
- Give each primary step a route with shared navigation and a clear active state.
- Use consistent shared buttons, fields, error messages, cards, and navigation.
- Use a single-column expense form with real labels, adjacent actionable errors, and preserved values after validation or storage failures.
- Support keyboard navigation, visible focus, accessible status announcements, and sufficient text contrast. Never use color alone to convey categories or errors.
- Store money as integer cents, use one currency (USD) initially, and format amounts consistently.
- Validate stored data before using it. Never silently discard or overwrite corrupted data. Handle loading and storage failures without misreporting that a record was saved.
- Read localStorage only in the browser after hydration. Keep persistence logic separate from presentation.
- Implement only scoped features. Ask before materially expanding scope.

## Verification obligations

Use `docs/verification.md` as the acceptance matrix. In later phases, actually verify persistence after refresh and after closing/reopening the site, plus missing, empty, invalid, and corrupted storage. Check keyboard use, labels, contrast, and responsive layouts.

After Vercel deployment, an agent must actually visit the live URL as a new user, add expenses, inspect records and totals, and revisit. Fix observed issues, retest, and record feedback and changes in README.md. Local tests or plans do not substitute for the deployed first-run check.

Record test environment, steps, expected and actual outcomes, and remaining limitations. Keep planned, passed, failed, and blocked work clearly distinct. Never fabricate feedback, deployment URLs, screenshots, or test results.
