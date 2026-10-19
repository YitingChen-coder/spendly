# Final online browser acceptance — October 19, 2026

## Environment and scope

Target: https://spendly-nu-liard.vercel.app/. Executed October 19, 2026, approximately 13:51–13:55 America/Chicago, using actual headless Chromium 154.0.8037.57 controlled by Python Playwright. The main walkthrough used a fresh isolated persistent profile, then closed and relaunched Chromium with the same profile. The keyboard walkthrough used a separate clean browser context. No personal browser storage was touched. No deployment, Vercel token, application change, or new product dependency was needed. The exact deployed Git SHA was not independently established.

Browser discovery exposed no remote browser connector. Only system Chromium was installed; Playwright Firefox/WebKit binaries were absent. This actual browser run uses the public HTTPS production origin, independently of the retained localhost checks.

## Network and certificate diagnosis

Earlier proxy CONNECT 403 observations remain historical evidence. In this attempt curl returned HTTP 200 with TLS verification enabled. Initial Chromium navigation failed with ERR_CERT_AUTHORITY_INVALID. The environment's existing system-trusted proxy CA was temporarily imported for the browser checks in the same execution context; certificate verification stayed enabled. No ignore_https_errors or certificate-error bypass was used. Final certificate listing contained only the four pre-existing OpenAI nicknames, with no acceptance-test nickname. One preliminary cleanup command exited 255 because the requested temporary nickname was already absent; subsequent cleanup checked presence before removal and completed successfully.

The production page loaded HTTP 200 with no failed requests in the initial network probe. GitHub repository HTML also loaded HTTP 200, but 156 requests failed, including github.githubassets.com CSS/JavaScript and avatars.githubusercontent.com. No identical blocked asset request loop or proxy bypass was attempted. Full request evidence is in [network-results.json](network-results.json).

## Acceptance matrix

| Requested check | Actual steps and result | Status |
| --- | --- | --- |
| First visit and Quick Guide | Fresh profile showed welcome content and guide. Activated Next using Enter; next heading received focus. Back and Skip worked. Reload retained dismissal; launcher reopened guide; Escape closed it and returned focus. Desktop and 375px first-visit screenshots saved. | Passed; Done/final guide link verified in the follow-up below |
| Add, edit and delete | Submitted $12.50 lunch, $20.00 groceries and $7.50 bus. Records appeared. Edited lunch to $15.00. Canceled bus deletion and verified exact data/focus preservation, then confirmed deletion and verified its absence. | Passed |
| Validation and input retention | Empty submission focused Amount. Entered description Retained draft and amount -3, submitted again, and asserted both exact values remained. Saved validation screenshot. | Passed for these invalid submissions |
| Weekly total and categories | Stored cents totaled 4000; summary showed $40.00 and 31.3%, 50%, 18.8% for Food & Drink/Groceries/Transport. Edit changed total to 4250 cents; deletion changed it to 3500 cents. Returning overview displayed $35.00. | Passed |
| Persistence | Compared the complete raw stored value after refresh, tab closure/new tab, then full Chromium shutdown/relaunch with the same persistent profile. All comparisons matched. | Passed |
| Keyboard and responsive layout | Used Tab/Enter for skip link, Add Expense navigation, field entry, category selection and form submission without mouse actions in that walkthrough. Stored keyboard-only purchase was 125 cents. Also checked invalid-field focus, guide Enter/Escape and delete-cancel focus. At 375px captured Overview, Add Expense, Expenses and Summary with no horizontal overflow. Summary also checked at 768/1280px. | Passed for these paths/viewports; not comprehensive accessibility certification |
| GitHub Mermaid rendering | Opened actual GitHub repository. HTML contained two Mermaid-related containers, but no renderer iframe loaded and required CSS/JavaScript requests were blocked. Saved actual degraded README screenshot. Source/container presence does not establish a rendered diagram. | Blocked / visual rendering unverified |

Additional recovery check: replaced data with malformed JSON in the disposable profile; recovery appeared and the exact raw value remained unchanged. No uncaught page errors were observed during the main walkthrough's first browser lifetime. Page errors were not aggregated over every restarted browser lifetime.

## Agent feedback and observed limitations

The first purchase action was identifiable without account setup. Invalid submissions provided a correction path and focused the amount field while retaining draft input. Submitted purchases immediately appeared in history and affected weekly totals. Editing/deleting preserved the expected cents, and canceling deletion returned focus to its trigger. Returning after a full browser restart restored the same saved data. The guide could be dismissed and recalled without changing expense records.

Desktop first visit, mobile first visit, mobile form and narrow summary screenshots were visually inspected. The layout kept navigation and fields readable. The fixed guide/launcher visibly overlays some underlying content at narrow viewport positions; scrolling and guide dismissal remain available, and keyboard submission succeeded. No blocking application defect was confirmed, so no application fix, redeployment, or post-fix retest is claimed. Screenshot evidence is retained rather than claiming every overlap/device was exhaustively checked.

One keyboard automation attempt stopped because a selector matched both Add Expense links. The helper was corrected to check whether any matching element had keyboard focus; the keyboard-only run then passed. This was an automation selector issue, not an application failure.

## Evidence and remaining work

- [First visit](first-visit.png), [mobile first guide](mobile-first-guide.png), [retained invalid values](validation-retained.png).
- [Summary 375px](summary-375.png), [768px](summary-768.png), [1280px](summary-1280.png).
- [Mobile form](mobile-expenses-new.png), [history](mobile-expenses.png), [overview](mobile-overview.png).
- [After edit/delete](after-edit-delete.png), [return after browser restart](return-after-browser-restart.png), [keyboard focus](keyboard-submit-focus.png), [keyboard save](keyboard-saved.png), [recovery](corrupt-data-recovery.png).
- [GitHub README with blocked assets](github-readme-assets-blocked.png).

Remaining: verify Mermaid visually once authorized GitHub static/renderer assets are accessible. Screen-reader testing, Safari/Firefox, complete keyboard coverage, every mobile page/state remain outside the verified scope. Existing local Chromium screenshots/tests remain separate evidence in ../cloud-2026-10-19/. Do not mark Mermaid as passed or the entire requested matrix as complete while that item remains blocked.

## Follow-up: final guide controls and GitHub Mermaid

Executed **October 19, 2026, 13:58 America/Chicago** in actual Playwright-controlled **Chromium 154.0.8037.57**, 1280×900 viewport, fresh isolated browser context. The existing environment CA was used with TLS verification enabled; final certificate inspection retained only the four pre-existing OpenAI nicknames. No deployment, application change or personal browser access occurred.

### Quick Guide — passed

1. Opened the production site and created one actual $8.75 Food & Drink purchase named Guide acceptance existing purchase through the form. Captured the exact raw spendly:data value as the baseline.
2. Opened Quick guide and clicked Next twice. Verified the third-step heading Review your week. [Third-step screenshot](final-two-checks/guide-third-step.png).
3. Clicked Done. Asserted the guide closed. Refreshed, asserted it remained closed and the launcher was available. Compared the entire raw expense value with the baseline: unchanged. [Closed after refresh](final-two-checks/done-after-refresh.png).
4. Clicked the launcher and Next twice again, proving reopening and navigation still worked. [Reopened third step](final-two-checks/guide-reopened-third-step.png).
5. Clicked Add an expense. Asserted the actual URL was https://spendly-nu-liard.vercel.app/expenses/new and the guide was closed. Entered 2.50, Unsaved form usability check and Groceries; fields accepted input. Did not submit this draft, so no extra purchase was created. [Working form after guide link](final-two-checks/guide-link-working-form.png).
6. Compared the complete raw expense value after each guide sequence, refresh and form navigation: every comparison matched. Existing expense data was not changed by the guide. No uncaught page errors were recorded.

### GitHub Mermaid — still unverified

Opened https://github.com/YitingChen-coder/spendly in the actual browser: repository HTML returned HTTP 200. Scrolled to the Mermaid block. The screenshot visibly shows Mermaid source and a loading indicator, not a diagram. The document contained the text First Visit, Main Task and Returning Visit, but zero rendered Mermaid SVGs and no renderer frame. These observations do not satisfy the rendering requirement.

156 resource requests failed with ERR_TUNNEL_CONNECTION_FAILED, affecting github.githubassets.com and avatars.githubusercontent.com. Stopped after this attempt; did not repeatedly request the same blocked assets. No Mermaid syntax error or product defect was established because required rendering resources did not load. [Actual source/loading screenshot](final-two-checks/github-mermaid-current.png). [Structured browser results and failed requests](final-two-checks/results.json).

The only outstanding item from these two follow-up checks is visual Mermaid confirmation in a browser able to load GitHub's required resources. No application behavior was modified. Earlier local and online evidence remains preserved.
