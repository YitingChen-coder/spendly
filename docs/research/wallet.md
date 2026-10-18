# Wallet by BudgetBakers: onboarding research

Access date: **2026-10-18**. Research method: live web search and opening official public pages; no account creation, personal data, bank connection, or authenticated app testing. This is a documented-flow review, with one public sign-in interface inspected through indexed page text. It is not a timed usability test.

## Evidence register

| ID | Official source | Evidence type |
| --- | --- | --- |
| W1 | [Wallet public sign-in](https://web.budgetbakers.com/sign-in?callbackUrl=%2Fsignin) | Public interface text returned by live search. Opening `/login` redirected to `/sign-in` but returned no substantive app body. |
| W2 | [Getting Started with Wallet](https://support.budgetbakers.com/hc/en-us/articles/7151352625938-Getting-Started-with-Wallet) | Official onboarding instructions, dated March 31, 2026. |
| W3 | [Adding an Account](https://support.budgetbakers.com/hc/en-us/articles/34453128217618-Adding-an-Account) | Official setup instructions, updated April 14, 2026. |
| W4 | [Everything About Transactions](https://support.budgetbakers.com/hc/en-us/articles/7149271363090-Everything-About-Transactions-Add-edit-clone-split-duplicates) | Official platform-specific entry instructions, updated December 12, 2025. |
| W5 | [How To Start](https://budgetbakers.com/en/how-to-start/) | Official acquisition/onboarding guidance. |
| W6 | [Understanding Your Wallet Statistics](https://support.budgetbakers.com/hc/en-us/articles/31001090941970-Understanding-Your-Wallet-Statistics) | Official analytics explanation, updated November 12, 2025. |
| W7 | [Wallet Web App](https://support.budgetbakers.com/hc/en-us/articles/7181432342034-Wallet-Web-App) | Official cross-device explanation, updated October 13, 2026. |

## First interface and initial commitment

**Public interface evidence [W1]:** the sign-in page presents a financial overview promise, a device illustration, Google/Facebook/Apple sign-in choices, an email input and Log In action, plus terms/privacy links and mobile-app QR options. No public expense-entry form appeared in the retrieved text. This establishes an authentication-oriented public entry; it does not prove the exact first screen of a freshly installed mobile app. Visual hierarchy, focus order, and interaction behavior were not verified.

**Official documented sequence [W2]:** install the mobile app → register with Google, Facebook, email, or Apple on iOS → select a default currency → add financial accounts → track transactions → configure dashboard widgets. The guide warns that changing the default currency requires deleting all user data and starting over. It says email registration uses an email associated with the phone. Some dashboard charts require a paid plan. These are meaningful setup decisions before a newcomer has experienced their own spending data.

**Important qualification [W3]:** selecting currency automatically creates at least one cash account. Therefore, adding another account or connecting a bank should not be represented as mandatory for the manual-entry route. The account documentation offers manual tracking alongside bank sync, payment integrations, and imports. The wide choice supports complex finances but creates a larger conceptual surface than Spendly needs.

## Route to the first useful expense

**Documented web route [W4]:** open Records → select + Add → fill record details → select Add Record. Listed core details are transaction type, amount, account, and category; additional fields include note, labels, payee, date, payment type/status, and location. The article does not establish which core fields are preselected or strictly required by validation.

On Android, the published route is menu → Records → plus → New Record → details → save. Extra details sit behind an arrow. On iOS it is More → Records → plus → details → dismiss the number pad to expose Save. These are documented navigation stages, not measured tap counts: selecting fields and keyboard interactions add actions. The iOS save instruction suggests a discoverability risk; no firsthand failure was observed.

**First-value boundary:** saving one categorized expense is a plausible first useful result. However, this research did not authenticate, save a record, or observe the resulting record list, balance refresh, confirmation, error recovery, or persistence. Do not claim those outcomes were tested.

## Route to an insight and a later visit

The marketing guide emphasizes account aggregation and automatic categorization on day one, more accounts and labels in week one, and budgeting later [W5]. This positions first insight around an imported financial picture rather than one small manual success. Its daily-review and weekly/monthly-report suggestions support a repeat-review habit; they are recommendations, not observed user behavior.

Official statistics documentation describes pie charts as primarily analyzing expenditure and distinguishes income, expenses, and transfers [W6]. This validates categorized spending as a useful feedback mechanism, but does not verify the exact route, default reporting period, weekly filter, empty state, or minimum record count needed for a chart.

Wallet documents cloud synchronization across mobile and web after registration [W7]. Spendly's localStorage persistence can support returning to the same browser, but must not imply equivalent account-based recovery or cross-device synchronization.

## Friction and concrete implications for Spendly

The following are design inferences from the evidence, not measured conversion findings.

| Evidence-based opportunity | Spendly decision |
| --- | --- |
| Identity and currency setup precede entry in the documented Wallet journey [W2]. | Open directly to an expense form. Request no login, email, bank details, income, or financial account setup. Show the currency clearly; avoid an irreversible onboarding choice. |
| Wallet lists a broad record model and navigation through Records [W4]. | Make amount and category the primary inputs, with date defaulting to today and description optional. Keep the primary Add expense action visible, including above an open mobile keyboard. |
| Android documentation separates extra details [W4]. | Adopt progressive disclosure when needed, but omit unsupported fields such as transfers, receipt uploads, and bank synchronization from this assignment. |
| Wallet supports categories and expenditure charts [W4, W6]. | After saving, immediately show the new record and recomputed spending total. Make weekly category distribution available without chart/widget configuration. |
| Wallet promotes daily review and weekly analysis [W5]. | Keep History and This week easy to return to. Show the selected week and dates so users can interpret the distribution. |
| Wallet can supply history through connected accounts [W5]; Spendly starts locally and empty. | Use an honest empty state: “Add your first expense to see your weekly breakdown.” Do not display fabricated spending or imply a meaningful trend from one record. |
| Cloud sync is part of Wallet's return experience [W7]. | Persist records locally and restore totals/history on reload. Explain “Saved in this browser” concisely, with no promise of cross-device backup. |

Proposed Spendly first-value sequence: open app → enter amount and category → Add expense → see the saved row and updated total → return in the same browser → inspect history and weekly category distribution. Validate this sequence separately in the implementation; it was not tested as part of this competitor review.

## Limits

- No hands-on access beyond public web content; no account was created and no onboarding was completed.
- No screenshots, screen recordings, mobile app installation, measured completion time, or observed user study. Public sign-in evidence is text-level rather than visual QA.
- Official guidance mixes mobile onboarding with a web product that may have different defaults. Exact current authenticated layouts and undocumented shortcuts remain unverified.
- Required-field validation, verification prompts, permissions, paywall placement, and post-save feedback remain unverified. “Listed fields” must not be read as a tested mandatory-field list.
- Currency setup and default cash-account behavior are explicitly documented; bank linking is not necessary to describe the available manual route.
