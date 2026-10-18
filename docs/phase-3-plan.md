# Phase 3: First-Visit Implementation Plan

## Scope

Implement the Phase 3 row of the seven-phase plan using the approved product brief and existing visual system. The user authorized pushing Phase 2 and beginning the next phase. Planned milestone: `feat: create first-visit onboarding`.

## Design and implementation

- Replace the generic home placeholder with a first-visit presentation: purpose, everyday purchase examples, a prominent first-expense link, and a brief browser/device data explanation.
- Use shared Card, buttonStyles, Icon, and the existing responsive shell. No tour, setup wizard, registration, or fabricated financial data.
- Explain the record -> history -> weekly review loop with three short supporting cards below the primary action. These are optional reading, not navigation gates.
- Give the directly opened Expenses and Weekly Summary pages useful empty-state guidance and an entry link using a shared EmptyWorkspace component.
- Keep `/expenses/new` as the existing honest placeholder. It provides a working back link. Actual form behavior belongs to Phase 4; durable saving belongs to Phase 5.
- Make the unfinished state explicit beside the entry links, using aria-describedby to associate the preview note with the action. Describe browser persistence as future behavior, not an existing save guarantee.
- Home always shows first-visit content at this milestone. Choosing first-visit versus returning content based on saved data belongs to Phase 5.

## Checks and phase boundary

Run typecheck, ESLint, production build, and HTTP/semantic checks for all four routes. Verify one h1/current nav item, real entry/back links, explicit preview notes, no new forms/storage/business logic, and unchanged flow diagrams. Reuse the existing contrast-checked palette. Check browser availability for keyboard and responsive visual review; if unavailable, record the limitation without treating source inspection as a browser test.

Review source and document changes before one milestone commit. Stop afterward; do not implement Phase 4. No extra dependencies are needed for static onboarding UI.

## Execution record

Phase 2 commit `9654aac6106cdf65376fd6a3a1ef89cd6ab8f102` was pushed successfully. Browser discovery again returned an empty list. The in-place implementation follows the user's staged workflow; this is a bounded extension of the existing application shell. Current authorization and the proposed commit message were reported before code changes.
