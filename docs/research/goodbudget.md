# Goodbudget onboarding research

Access date: **2026-10-18**. Scope: public official web material; no account created, no personal data entered, and no authenticated app walkthrough performed. Research question: what can Spendly learn for fast manual entry, immediate totals, return visits, history, and weekly category distribution?

## Evidence and confidence

| ID | Official source | Evidence type and finding |
| --- | --- | --- |
| GB1 | [Sign up](https://goodbudget.com/signup) | Directly observed public page text: “Start Your Goodbudget,” plan comparison, and product image links. The embedded signup area returned “loading...” through the browsing tool; its actual fields and sequence were not verified. |
| GB2 | [Getting Started Guide](https://goodbudget.com/help/getting-started-guide/) | Official documented sequence: add envelopes, accounts, income, fill envelopes, then record expenses. This is a recommended tutorial sequence, not proof of a mandatory in-app wizard. |
| GB3 | [Step 1: Add Envelopes](https://goodbudget.com/help/getting-started-guide/step-1-add-envelopes/) | Official instructions: choose a budget period, create envelopes with planned amounts, check budget against income, save. Web uses Add/Edit in Envelopes; iPhone starts in Envelopes after login. |
| GB4 | [Getting Started with Accounts](https://goodbudget.com/help/using-accounts/getting-started-with-accounts/) | Official instructions: an account takes a name and current balance. Explains how financial accounts determine money available for envelopes. |
| GB5 | [Step 3: Add Income](https://goodbudget.com/help/getting-started-guide/step-3-add-income/) | Official web instructions: Add Transaction → Income, enter receipt date, source, and amount. Income remains Available until assigned through a Fill. |
| GB6 | [Step 5: Record Expenses](https://goodbudget.com/help/getting-started-guide/step-5-record-expenses/) | Official instructions: web Add Transaction opens an entry window; Android uses +. Describes Payee, Envelope, and Account suggestions, optional scheduling, and expenses counting against current envelope balances. |
| GB7 | [Get Started on Android](https://goodbudget.com/help/mobile-apps/get-started-android/) | Official documented landing/navigation: Envelopes overview after login; Transactions, Accounts, Reports tabs; category history by tapping an envelope. |

The tutorials display February 2020 update dates, although some text discusses bank sync. They are evidence of the currently published documentation, not confirmation that every current interface matches it. Public page text was inspected; tutorial screenshots and authenticated screen behavior were not independently visually verified.

## First interface and first useful outcome

The directly accessible acquisition page introduces envelope budgeting and presents plan choices [GB1]. The first authenticated screen is **documented**, rather than observed: Android opens on an envelope overview showing money remaining per category and entry actions [GB7].

The recommended path to a meaningful budget is setup-heavy relative to Spendly: define a period and envelopes → enter accounts/balances → record income → allocate funds → record an expense [GB2–GB5]. It asks users to reason about planned spending and financial starting state before the tutorial reaches actual spending. No measured completion time or exact click count is claimed. These steps are not verified technical prerequisites to saving an expense.

For expense recording, the documented web entry point is Add Transaction; Android has a + action [GB6]. Official material mentions payee, envelope, account, and amount concepts, but this research did not verify which fields are strictly required, their defaults, validation, or the save confirmation. An expense affects the current envelope balance [GB6].

For returning users, documented Android navigation separates overview, transaction history, accounts, and reports. Users can inspect a category’s history, edit a transaction, search history, and view Spending by Envelope or Income vs. Spending reports [GB7]. No weekly default or exact report filter behavior was verified.

## Friction and Spendly decisions

These are design interpretations, not measured user problems:

| Inference from evidence | Concrete Spendly decision |
| --- | --- |
| Budget periods, balances, income, and allocation introduce concepts before the tutorial’s first expense [GB2–GB5]. | Start with an immediately usable expense form and preset categories. Require amount and category; default date to today and keep description optional. Omit financial account and envelope setup. |
| A clear entry action and category overview connect daily action with financial feedback [GB6–GB7]. | Keep Add Expense prominent. After saving, show the new record and updated spending total in the same view, with a concise saved confirmation. |
| History and reports are distinct documented destinations [GB7]. | Provide plainly labeled History and This Week views; show category amounts and percentages with the week’s date range. Make category breakdown reachable immediately after saving. |
| Repeated-entry suggestions reduce later effort, but documented location support adds permission and data complexity [GB6]. | Use simple local defaults such as today’s date; avoid location permissions, bank APIs, and account signup. |
| Goodbudget’s synchronized household model assumes registration/login [GB7]. | Explain “Saved in this browser” near the first save and on return. Persist expenses in localStorage and make the browser/device scope explicit; do not imply cross-device sync. |

Spendly’s first useful outcome should be one saved expense visibly reflected in the total; its later outcome should be retained history and an honest weekly distribution. Empty insights should invite the first entry instead of displaying fabricated sample spending.

## Unverified areas

Signup fields, account-verification requirements, current first-run prompts, mandatory versus optional setup, exact expense validation, save feedback, responsive behavior, and weekly report controls remain unverified. No hands-on speed, usability, accessibility, retention, or success-rate claims are made.
