# Spendee onboarding research

Access date: **2026-10-18**. Scope: official public web evidence, without registering, supplying personal information, or connecting a bank. This is a documented-flow review, not a hands-on completion test.

## Evidence and confidence

| ID | Official source and exact evidence location | What it establishes |
| --- | --- | --- |
| S1 | [Spendee web sign-up](https://app.spendee.com/auth/signup), public search extraction headed “Sign up to Spendee” | Email, password, confirm-password fields; Facebook, Google and Apple alternatives; terms and privacy links. Direct opening returned no extractable page text, so field details are search-index evidence rather than a rendered-screen inspection. |
| S2 | [How to set up Spendee account?](https://help.spendee.com/article/113-set-up-spendee-account), paragraphs 1–3; updated March 15, 2021 | Registration precedes use in the documented flow; email/password or social sign-in; welcome email; onboarding asks users to connect a bank for imported and categorized history. It does not establish whether that prompt is skippable today. |
| S3 | [Off To A Great Start! First Steps With Spendee](https://medium.com/spendee/off-to-a-great-start-first-steps-with-spendee-567d3815e4ca), January 12, 2021; “Add Your First Transaction” and “Understand Where It Goes” | Manual transactions live in a cash wallet; green Plus starts first entry. Public tutorial captions describe a transaction timeline with monthly cash flow and a category-distribution pie chart. The article recommends looking at Overviews after five transactions. This is advice, not a verified product gate. |
| S4 | [Spendee tips & tricks for the beginners](https://medium.com/spendee/spendee-tips-trick-for-the-beginners-d78a7249ccf7), December 21, 2017; sections 2, 3 and 7 | Entry includes category and amount; recurrence is lower on that screen. Notification settings support entry reminders. First-week analysis is described as indicative, with a later monthly return encouraged. Historical documentation, not proof of current interface. |
| S5 | [How to connect a bank account?](https://help.spendee.com/article/144-connect-a-bank-account), mobile/web numbered instructions; updated May 3, 2022 | Bank connection requires Premium. Documented sequence includes country, bank, credentials, optional credential storage, account selection and import wait. |
| S6 | [Is Spendee for Free?](https://help.spendee.com/article/200-is-spendee-for-free), basic-version feature list; updated January 4, 2021 | Official documentation includes a cash wallet and detailed overview in the free version, supporting a manual route independent of bank sync. Current free-plan limits were not tested. |

## First interface and path to value

The public web registration entry presents an account decision before recording an expense [S1]. Spendee’s official onboarding documentation also places sign-up first, then promotes bank connection [S2]. The exact first installed-app screen, carousel, currency selection, wallet creation defaults, and permission order remain unverified.

The documented manual route is: register → reach a cash wallet → tap green Plus → provide amount and category → save → review the timeline and cash-flow summary [S2–S4]. The save interaction, required versus optional field validation, date default, number of taps and wallet initialization are not established by the reviewed evidence. The timeline is documented; successful first-entry feedback was not observed.

The bank route adds subscription/access decisions, institution identification, authentication and an import wait before its promised ready-made history [S2, S5]. No bank connection was attempted, and no elapsed-time claim is supported.

The first useful result for a manual tracker is the recorded expense and changed total. Spendee documents a longer learning progression toward category distribution; its tutorial suggests five entries before exploring charts [S3]. Returning after a week supports an initial pattern check, while richer conclusions require more data [S4].

## Friction assessment — researcher interpretation

- Account registration introduces identity and password decisions before a user can prove the tracker useful. Social sign-in offers alternatives but remains a choice and authorization step [S1–S2].
- Wallet terminology and bank promotion add concepts to a simple manual-entry task [S2–S3]. The bank route offers substantial imported-history value but introduces authentication, payment eligibility and waiting [S5].
- Recurrence, reminders and customization support sustained use, but exposing all of them before a first entry could distract from the core action [S4]. This is a design inference; their actual onboarding placement was not tested.

## Recommended adoption for Spendly

Adopt the connection between a prominent add action, an immediately visible record/total, and a later category summary. Open Spendly directly to an empty expense list and clear “Add expense” action. Require amount and category, default the date to today, and keep a note optional. After saving, show the new row and updated spending total together. Let users open history and a weekly category distribution as soon as data exists; explain that early patterns reflect only recorded entries.

Avoid copying account registration, bank prompts, wallet setup or subscription decisions into Spendly’s onboarding. Its Next.js/Tailwind/localStorage scope supports a shorter loop: add → see saved result → return to history and weekly distribution. A brief local-storage explanation can set expectations without creating a setup wizard. These are recommendations for Spendly, not claims about Spendee behavior.

## Verification limitations

All cited pages were retrieved through live web search/open on the access date. Older official guides can lag the product. No signed-in app, installed mobile app, visual layout, empty state, actual persistence, chart threshold, success confirmation, keyboard interaction or completion time was tested. Public tutorial captions were read; screenshots were not independently inspected. Search results for similarly named Spendle/Spendi products were excluded.
