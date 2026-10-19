# Cloud verification — October 19, 2026

## Scope and provenance

This session checked out existing main at a0f0db3. Phases 3–7 already have commits in history and origin/main contains them. No phase history was rewritten. Application source, dependency declarations and the committed lockfile were preserved. This report records newly executed local checks, separately from earlier user-supplied deployed reports.

## Setup

Node.js 24.19.0; npm 11.9.0; Linux; Next.js 16.4.2 using the supported Webpack scripts. Native HTTPS Git read succeeded with platform authentication.

Standard npm ci failed because the committed lockfile is missing @emnapi/runtime@1.11.3 and @emnapi/core@1.11.3, referenced by WASM dependencies. Legacy peer mode also failed. To preserve tracked files during onboarding, package.json and package-lock.json were copied to /workspace/spendly-tooling. Running npm install --package-lock-only there completed the external lockfile; npm ci there installed 420 packages. The checkout uses a local node_modules symlink with a private Git exclude. TLS and artifact integrity verification were retained. Repeating external lockfile preparation succeeded. The repository lockfile still needs a separately reviewed repair before ordinary fresh npm ci will work without this workaround.

Reusable install_script and start_skill were saved in the environment draft, including working directories, Node major validation, dependency preparation, checks, service restart and readiness guidance. Local development needs no credentials or external APIs. Publication and restoration into a new task have not been verified.

## Executed outcomes

- npm test: 131 passed, zero failed/skipped/canceled.
- npm run typecheck: passed, including route type generation.
- npm run lint: passed with zero warnings.
- npm run build: passed; all intended routes generated.
- npm run start -- --hostname 0.0.0.0: started successfully; actual browser hydration and interactions passed.
- Actual headless Chromium 154.0.8037.57, isolated persistent profile, America/Chicago timezone: guide Next/Back/Skip, dismissal after reload, replay, Escape and launcher focus passed.
- Empty submission focused Amount. Three real form submissions across Food & Drink/Groceries/Transport saved integer cents totaling 4000; summary displayed $40.00.
- Editing lunch from $12.50 to $15.00 produced 4250 cents. Canceling bus deletion preserved exact data and restored trigger focus; confirmed deletion produced 3500 cents.
- Exact saved data survived refresh, tab close/reopen and full Chromium shutdown/relaunch in the same isolated profile.
- Corrupt JSON displayed recovery without changing the raw value.
- Summary at 375/768/1280 by 900 pixels: no horizontal overflow; screenshots retained. The 375px screenshot was visually inspected. No uncaught page errors were recorded during the initial walkthrough browser lifetime.

These are actual local production-server checks. They are not deployed-site verification, human research, comprehensive accessibility certification, or a complete test of every page at every viewport.

## Remaining external prerequisites

HTTP access to spendly-nu-liard.vercel.app failed with proxy CONNECT 403. Actual Chromium navigation independently failed with ERR_TUNNEL_CONNECTION_FAILED. No TLS bypass was attempted. The environment draft adds spendly-nu-liard.vercel.app and api.vercel.com to its custom network destinations while retaining package-manager presets.

VERCEL_TOKEN, VERCEL_ORG_ID and VERCEL_PROJECT_ID are unset. Standard Vercel CLI auth locations and checkout linking metadata are absent. A VERCEL_TOKEN requirement for api.vercel.com was saved for secure entry in environment settings; no credential values were requested in chat or committed. Review and save settings, provide authorized Vercel authentication if redeployment is needed, then publish the environment. Draft saving itself does not apply runtime network changes or publish a snapshot.

After access is restored, rerun the online first-run/return/guide walkthrough, record the actual deployed revision and outcomes, and deploy/retest any resulting fixes. Comprehensive keyboard/screen-reader use, all-page mobile checks, Safari/Firefox and visual GitHub Mermaid rendering remain unverified. Earlier remote screenshots were not recovered; the screenshots here are newly captured local artifacts.
