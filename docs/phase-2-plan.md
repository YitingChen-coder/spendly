# Phase 2 Implementation Plan

> For agentic workers: use the executing-plans workflow for this single foundation milestone. The user's explicit Phase 2 instruction authorizes execution in the existing repository and one checked milestone commit.

## Goal and architecture

Initialize Next.js App Router, TypeScript, Tailwind CSS, and ESLint while preserving Phase 1 documentation and history. Server-render the shared shell and placeholder pages; only navigation needs a small client boundary for the active pathname. Implement no expense data, onboarding, forms with business behavior, storage, or statistics.

Spec: `docs/product.md`, the Phase 2 row in `docs/phase-plan.md`, and the user's Phase 2 scope. The later product flows are not authorization to implement them now.

## Global constraints

- English code, comments, documentation, interface copy, and commits; Chinese discussion.
- Four routes: `/`, `/expenses/new`, `/expenses`, `/summary`.
- Neutral warm background, white surfaces, dark green accent, readable dark text, system sans-serif fonts, consistent spacing/radii, responsive navigation.
- Native semantic controls and links, real field labels, error associations, visible keyboard focus, and skip navigation.
- One Phase 2 commit, no Phase 3 work, no automatic Phase 2 push.

## Tasks

### 1. Baseline and application configuration

- [x] Verify and push the Phase 1 commit; confirm GitHub recognizes the README Mermaid through its rendered-content API.
- [ ] Visually inspect the GitHub Mermaid graph in a browser (blocked: no browser connection).
- [x] Update root AGENTS.md to the newly authorized phase and read it directly.
- [x] Add package.json/lockfile, tsconfig.json, next-env.d.ts, next.config.ts, eslint.config.mjs, and postcss.config.mjs in place; install only framework/tooling dependencies.
- [x] Keep the existing README, research, flows, .gitignore, and Git history.

### 2. Design system, shared components, and navigation

- [x] Define CSS/Tailwind tokens in `src/app/globals.css`; document them in `docs/design-system.md`.
- [x] Create `src/components/ui/button.tsx`, `input.tsx`, `form-field.tsx`, and `card.tsx`. Native props pass through; button defaults to `type="button"`; FormField connects label, hint, error, and input ids. Disabled inputs/buttons retain native semantics.
- [x] Create `src/components/navigation.tsx`, `app-shell.tsx`, and `page-placeholder.tsx`, plus a small code-native SVG icon component. Use Next Link, active aria-current, and a skip link.
- [x] Native props and accessibility are verified by static rendering/type checks and later browser review. Do not add a general test framework for static placeholder components.

### 3. Placeholder routes and checks

- [x] Create `src/app/layout.tsx` and the four page.tsx files. Every page has one h1 and explicitly unavailable placeholder content, with no fabricated expense data or nonfunctional action controls.
- [x] Run `npm run typecheck`, `npm run lint`, and `npm run build`; fix real failures.
- [x] Start the production server and request all four routes, checking HTTP 200, titles, navigation targets, and active states. Review UI in-browser if a connection exists; otherwise record that limitation.
- [x] Inspect component label/error markup and measure token contrast; do not represent source checks as keyboard/browser tests.
- [x] Update README status, commands, design-system link, and `docs/phase-2-review.md` with actual evidence. Keep the Mermaid block unchanged.
- [x] Review the complete diff and verify phase boundaries.
Milestone commit after the completed checks: `chore: initialize Next.js app and shared UI`. Stop before Phase 3.

## Review focus

- A nested add route must not mark both Expenses and Add Expense as active.
- Mobile navigation must wrap or scroll without clipping page content.
- FormField hints and errors must reference the actual input and survive ordinary native props.
- Placeholder pages must not suggest saved data or working expense functionality.
- System fonts must build without a network font dependency.

## Execution record

Phase 1 push succeeded after a single-command direct connection bypassed an unavailable local proxy. No global network configuration changed. Browser discovery returned no available browsers; actual GitHub Mermaid visual inspection remains pending a browser connection. The existing clean checkout is used as explicitly requested rather than creating a separate worktree. Low-impact static foundations use the required type/lint/build and semantic checks; business-logic tests belong to later phases.

Final review: an independent read-only reviewer found no Critical or Important issues. Two documentation minors were corrected: the unavailable edit route is no longer listed as a current page, and this checklist now reflects actual execution. Visual/browser behavior and the final GitHub graph remain unverified, as recorded in the review.
