# Onboarding Research Synthesis

Research date: October 18, 2026.

## Three independent researchers

The parent agent dispatched three separate subagent tasks concurrently. Each researched only one competitor and wrote its own report. The parent reviewed all reports and independently reopened a core official guide for each product before synthesis.

| Subagent task | Product | Report |
| --- | --- | --- |
| `research_spendee` | Spendee | [Evidence and analysis](spendee.md) |
| `research_wallet` | Wallet by BudgetBakers | [Evidence and analysis](wallet.md) |
| `research_goodbudget` | Goodbudget | [Evidence and analysis](goodbudget.md) |

## Comparative findings

| Question | Spendee | Wallet | Goodbudget |
| --- | --- | --- | --- |
| First experience supported by evidence | Public signup text; official guide places signup before use and promotes bank connection | Public sign-in text; official guide starts with registration and currency selection | Public signup/plan page text; documented authenticated Android landing is Envelopes |
| Information requested in documented flow | Email/password or social sign-in; manual amount/category; bank route adds bank credentials | Registration method, currency; automatically created cash account; transaction details include amount, account, and category | Recommended guide introduces envelopes/planned amounts, accounts/balances, income, allocation, then expenses |
| Earliest useful outcome | One manual transaction in a timeline; later category overview | One saved manual record; category statistics once data exists | Recorded expense changes an envelope balance; later reports/history |
| What happens before that value | Account and wallet context; bank import adds more setup if chosen | Account and currency setup; manual route does not require bank linking | Budget concepts and setup in the recommended tutorial; mandatory enforcement not verified |
| Measured time to value | Not measured | Not measured | Not measured |

Steps, not invented seconds, describe time to value. Exact current first-installed screens, required-field validation, and authenticated success feedback were not tested. Existing official guides can be older than the current applications. Public page text is not visual screenshot verification.

Core official sources independently checked by the parent: [Spendee account setup](https://help.spendee.com/article/113-set-up-spendee-account), [Wallet getting started](https://support.budgetbakers.com/hc/en-us/articles/7151352625938-Getting-Started-with-Wallet), and [Goodbudget getting started](https://goodbudget.com/help/getting-started-guide/). Each report includes additional primary evidence and limitations.

## Decisions adopted for Spendly

1. **Immediate action before setup.** Open to a useful first-visit explanation with `Add your first expense`. Do not ask for identity, bank information, wallet/account creation, budget amounts, or income.
2. **Visible cause and effect.** A successful save leads to the saved record and updated weekly total together, with an accessible confirmation. This follows the connection between entry and financial feedback documented in the competitors, not an observed Spendly result.
3. **Simple defaults.** Preset categories, one clearly displayed currency, and today's date avoid configuration before value.
4. **A reason to return.** Separate all-expense history from a weekly category review; label the date range and show amounts, percentages, and count.
5. **Honest persistence expectations.** Explain `Saved in this browser`; do not borrow the competitors' cross-device sync promise.
6. **Honest empty states.** Invite an entry without fake saved purchases or unsupported trend claims. Old history remains reachable when the current week is empty.

## Recommendations adjusted during synthesis

The independent researchers suggested an optional description/note and, in places, opening directly to a form. The Phase 1 design instead uses a short required description so each historical entry remains identifiable, and a brief actionable first-visit overview that leads directly to the form. The four-field form and today's date default keep the task short. These are deliberate Spendly design decisions, not assignment requirements or competitor facts. They should be evaluated during the later first-run check.

Researchers sometimes used `History` and `This Week` as conceptual labels. The shared navigation baseline is `Overview`, `Expenses`, `Weekly Summary`, and `Add Expense`, matching the routes in the product brief.

## Not adopted

Account signup, bank sync, currency configuration, envelope budgets, income setup, transfers, location permission, recurring schedules, subscriptions, and configurable dashboard widgets. These add setup or scope without serving the assignment's local manual-entry loop.

## Research limits and future validation

This phase fulfills three independent, sourced onboarding studies, not three hands-on usability tests. No account was created, no authenticated onboarding was completed, no product screenshots were independently inspected, and no elapsed time was measured. Goodbudget's signup embed did not expose its fields. These gaps remain explicit rather than filled with assumptions. Spendly itself must receive an actual browser-based deployed first-run test in Phase 7.
