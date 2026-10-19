# Phase 7: Deployment and First-Run Verification

## Authorized scope

Deploy the finished localStorage app on the user's Vercel Hobby account, run the required actual online first-run/return check, fix real findings and retest, finalize README/submission links, and create/push the final milestone commit. Do not add paid services, a database, authentication or external runtime APIs. If no implementation issue is found, use a truthful documentation commit rather than inventing a fix.

## Steps

1. Verify existing Vercel CLI authentication and account/project. Prefer the existing local login; keep tokens and `.vercel` metadata out of source control.
2. Run the final automated suite, typecheck, lint and production build. Verify repository/source inputs before deployment.
3. Deploy to Vercel and obtain a stable public production URL. Check remote build status and all routes/assets over HTTP.
4. In an actual connected browser, start with no Spendly data at that origin. Add three real test purchases in at least two categories, trigger/correct an error, inspect records and category totals, refresh, then close/reopen in the same browser profile. Check keyboard, narrow/desktop layouts, storage recovery and the GitHub flow diagram.
5. Record exact environment/date/URL, observed feedback, changes and retest results. Never substitute jsdom, HTTP or file-backed Node tests for the actual online browser check.
6. Review, commit and push the final milestone only when its required evidence exists. Re-deploy any app fixes and verify the final public version. Record the production and GitHub URLs in README.

## Initial access findings

The browser runtime currently exposes no available connection. No actual browser test is possible until that changes. A local Vercel authentication file exists; its secret contents were not printed. A Vercel integration was found in the plugin directory but is not installed; temporary CLI use can use the existing local login without requiring an extra integration.

The user has been asked to enable Browser while independent deployment preparation continues. This is missing execution capability, not a request to reauthorize the already requested deployment.
