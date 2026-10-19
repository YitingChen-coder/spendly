# Phase 7: Deployment Evidence and Pending Browser Check

Date: October 18, 2026 (America/Chicago).
Status: **Remote browser-test report incorporated; user-approved floating guide implemented. Screenshot synchronization, deployed-guide interaction testing and remaining manual checks are outstanding.**

## Deployment completed

- Live production alias: https://spendly-nu-liard.vercel.app
- Vercel workspace: CS (`cs-0c90`), verified Hobby plan.
- Project: `spendly`, created through the user's existing authenticated CLI session. No paid plan, domain purchase, database, account system, or runtime API was added.
- Initial deployment: `dpl_97MkK3yadvsXE2cE7EmkNXTiQwRC`, READY. Cloud build ran the existing `npm run build` / Next.js Webpack configuration successfully.
- Initial immutable URL: https://spendly-2d84yxhlz-cs-0c90.vercel.app
- Cloud warning revealed that `engines.node >=24.0.0` could advance to a future major. Package and lock metadata now pin `24.x`, matching the tested runtime; the final deployment `dpl_Cs6PMW5Q6Q12ghD8fjURpBBBZ5FN` is READY with this pin at https://spendly-gov66pq65-cs-0c90.vercel.app. The authenticated project API confirms `nodeVersion: 24.x`. This is a deployment-configuration correction, not fabricated first-run usability feedback.
- Stable alias stays the same after redeployments. `.vercel/` and the CLI-created `.env.local` are ignored by Git; credential values were not printed or committed.
- GitHub auto-linking did not complete because the Vercel account lacks a GitHub Login Connection. CLI production deployment works independently. GitHub pushes do not currently trigger automatic Vercel deployments; use the authenticated CLI for subsequent updates.

## Executed checks

- Local final automated suite: 128/128 passed; TypeScript, zero-warning ESLint and production build passed.
- Anonymous HTTP requests to `/`, `/expenses/new`, `/expenses`, `/summary` and `/expenses/missing/edit` returned 200 at the stable production alias with no login redirect.
- Initial CSS and JavaScript asset requests all returned 200. The final Node-24 deployment was rechecked anonymously: all five routes and all 10 initial CSS/JavaScript assets returned 200 with no login redirect.
- Server HTML has the intended storage-loading shell, exactly one h1 and correct active navigation. This is not proof that JavaScript hydration or user flows work in a browser.
- Tests and HTTP checks do not enter purchases in an actual online browser or establish browser persistence.

## Earlier local attempt: browser unavailable

Browser discovery returned an empty connection list. A direct attempt to obtain a browser for the live URL returned `No browser is available`. The user was asked to enable a Browser connection while deployment preparation continued. No alternative browser, screenshot, account session or interaction is claimed.

Scenario pending at the time of the local attempt:

1. Open the stable production URL in a clean browser state at that origin; inspect the first visit.
2. Trigger a form error and confirm adjacent guidance, first-error focus and retention of other values.
3. Add three test purchases across at least two categories; verify records, cents, weekly total and category distribution.
4. Edit one record; cancel and confirm a deletion; check totals and feedback.
5. Refresh and verify exact saved ids, dates, cents and totals.
6. Separately close all site tabs, reopen the same stable origin/browser profile, and verify records and returning experience.
7. Exercise empty, invalid and corrupt storage in a disposable profile; verify raw preservation, recovery, reset cancellation and write-failure behavior where browser tooling supports it.
8. Check keyboard navigation, labels, focus, mobile/desktop layout and the GitHub Mermaid rendering.
9. Record actual usability feedback, fix real issues, redeploy, and retest on the final URL.

At the time of that local attempt, no online user-feedback/fix/retest observations were available. The Node/jsdom/file-backed tests from prior phases remain useful independent evidence and are not substituted for this scenario.

## Current handoff

The later user-supplied remote report below supersedes the earlier local browser blocker as the available test evidence. README now includes its findings and explicitly attributes them. Obtain the screenshot artifacts, retain outstanding manual-test limitations, and complete final verification before the seventh milestone commit. No application changes are required solely to manufacture a usability fix.

## October 19, 2026: user-requested first-run retry

The user explicitly supplied `https://spendly-nu-liard.vercel.app/expenses` and reiterated that the professor requires actual agent usability feedback in README. A fresh target-URL browser selection again returned `No browser is available`; discovery still returned an empty browser list. No product interactions or usability observations were possible. README now records the exact attempted goal and clearly labels every actual-browser check pending. This attempt does not complete the required first-run test and does not justify inventing a feedback/fix/retest record. No final Phase 7 commit has been made.

## User-supplied remote deployed browser verification

Source: the user pasted a report from a separate remote Codex session and supplied its README excerpt. That excerpt dates the run October 19, 2026. This local session did not execute the remote run or independently inspect its screenshots or deployed commit. The results below are attributed to that report.

- Target: https://spendly-nu-liard.vercel.app
- Browser: Playwright-controlled headless Chromium 154.0.8037.57, isolated persistent profile, America/Chicago timezone.
- Five application routes and homepage JavaScript/CSS assets returned HTTP 200.
- Fresh-profile onboarding exposed the first-expense action. Invalid submission produced actionable errors and focused the first invalid input.
- Real form entries of $12.50 Food & Drink, $20.00 Groceries and $7.50 Transport stored exact integer cents. Total: $40.00; shares: 31.3%, 50% and 18.8%.
- Refresh, tab close/reopen and complete Chromium shutdown/restart with the same profile retained the exact records.
- Editing $12.50 to $15.00 changed the total to $42.50. Canceling deletion retained data and returned focus; deleting $7.50 changed the total to $35.00.
- Weekly summary had no horizontal overflow at 375/768/1280px. Screenshots were reportedly captured and the 375px image visually inspected. Those artifacts have not been supplied to this local checkout.
- Malformed JSON and unsupported schema remained unchanged in recovery. Reset cancellation preserved raw data; confirmed reset produced valid empty data.
- Injected storage-write failure displayed failure feedback, retained form input and preserved saved records. No uncaught browser page errors were observed in the successful run.

### Environment and cleanup reported by the remote session

Initial attempts failed on cloud proxy certificate trust. The report states the user authorized temporary CA trust, TLS verification remained enabled, and the successful run used the environment proxy in an escalated context. Assertions passed; the shell later exited 255 because cleanup could not find the temporary certificate nickname. A follow-up inspection reportedly found only four pre-existing OpenAI certificate names and no `spendly-cloud-proxy` entry. This local session has not independently audited that certificate store. These were environment issues, not reported application defects.

The isolated profile did not change the user's browser data. The report states that the remote run made no application changes, commits or redeployments and left its repository clean. Its subsequent documentation edits are represented by the separately supplied README excerpt.

### Feedback, changes and limits

The reported first action, validation correction, immediate totals, returning records and recovery behavior worked in the selected tasks. No application defect was reported, so no code fix or post-fix application retest is claimed. Local documentation now incorporates the report and removes stale current-status claims; historical local failures remain recorded.

Manual screen-reader testing, comprehensive keyboard testing, all mobile screens and Safari/Firefox remain untested. The deployment commit was not independently identified. Dates followed the actual runtime clock rather than a frozen clock. The report does not establish that the assignment's `/plan` command was executed.

## User-requested floating quick guide

The user approved a three-step floating guide: add a purchase, inspect saved records, review the week. It appears on first visit, supports Back/Next, Skip/Close/Done and a direct expense-entry link, and remains available through its launcher. A separate dismissal key preserves expense data. Denied storage falls back to page-session dismissal. Automatic display leaves focus untouched; manual steps focus the title, and Escape/close return focus when appropriate. Footer spacing accommodates the launcher. No dependencies were added.

Three new component tests cover navigation/actions, dismissal/remount/replay/Escape/focus and denied storage. The previous remote browser run predates this feature; its results must not be represented as deployed-guide verification. Screenshot synchronization, actual keyboard walkthrough and `/plan` process evidence remain outstanding. The user explicitly requested implementation, commit and push; this approved addition is the final feature milestone, with remaining verification limitations recorded rather than claimed complete.

Final local verification after the guide addition: 131/131 tests passed, TypeScript and zero-warning ESLint passed, and the production build passed. The shared Button now accepts React 19 native button props, including the ref used for focus return.
