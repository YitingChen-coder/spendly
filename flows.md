# Spendly User Flows

## Main task in one sentence

I record an expense -> I immediately see the record and updated total -> I come back a few days later -> my history remains and I can review this week's spending by category.

## Flow diagram

The same diagram is embedded in README.md so GitHub can display it directly.

```mermaid
flowchart TD
    Open["Open Spendly at /"] --> Load["Read and validate local data"]
    Load --> State{"Storage state?"}
    State -->|"Missing key or valid empty data"| Welcome
    State -->|"Valid saved expenses"| Return
    State -->|"Read failure or invalid data"| Recovery["Show recovery message; preserve original data"]
    Recovery -->|"Retry"| Load
    Recovery -->|"Download raw data if readable"| Recovery
    Recovery -->|"Request reset"| Reset{"Confirm data reset?"}
    Reset -->|"Cancel"| Recovery
    Reset -->|"Confirm and write succeeds"| Welcome
    Reset -->|"Write fails"| Recovery

    subgraph FirstVisit["First Visit"]
        Welcome["/: Purpose, local-save explanation, and Add your first expense"]
        Welcome -->|"Add your first expense"| Form
        Welcome -->|"Open history or summary"| Empty["Actionable empty page with Add Expense"]
        Empty --> Form
    end

    subgraph MainTask["Main Task"]
        Form["/expenses/new: Amount, description, category, date"]
        Form -->|"Submit"| Valid{"All fields valid?"}
        Valid -->|"No"| Errors["Adjacent actionable errors; preserve values; focus first error"]
        Errors --> Form
        Valid -->|"Yes"| Save["Write validated expense to localStorage"]
        Save --> Saved{"Write succeeded?"}
        Saved -->|"No"| SaveError["Keep input; explain failure; offer retry"]
        SaveError --> Form
        Saved -->|"Yes"| History["/expenses: Saved record, confirmation, updated weekly total"]
        History -->|"Add another"| Form
        History -->|"Edit"| Edit["/expenses/id/edit: Prefilled form"]
        Edit -->|"Valid save; retain input on errors"| EditSave{"Write succeeded?"}
        EditSave -->|"No: preserve input and retry"| Edit
        EditSave -->|"Yes"| History
        History -->|"Delete"| Delete{"Confirm deletion?"}
        Delete -->|"Cancel"| History
        Delete -->|"Confirm"| DeleteSave{"Write succeeded?"}
        DeleteSave -->|"No: show error; keep record"| History
        DeleteSave -->|"Yes; records remain"| History
        DeleteSave -->|"Yes; last record removed"| Welcome
    end

    subgraph ReturningVisit["Returning Visit"]
        Later["Refresh or close and reopen in same browser"] --> Open
        Return["/: Weekly total, date range, recent records"]
        Return -->|"View all records"| History
        Return -->|"Review this week"| Summary
        Return -->|"Add Expense"| Form
        History -->|"Weekly Summary"| Summary
        Summary["/summary: Weekly total and category breakdown"] --> Week{"Any expenses this week?"}
        Week -->|"Yes"| Insight["Category amounts, percentages, and count"]
        Week -->|"No"| NoWeek["No expenses this week; retain history link and Add Expense"]
        NoWeek -->|"View history"| History
        NoWeek -->|"Add Expense"| Form
        Insight -->|"Add Expense"| Form
        Insight -->|"Return later"| Later
        History -->|"Return later"| Later
    end
```

## First Visit

Precondition: no saved expenses, either because the storage key is missing or the validated dataset is empty. Show purpose, a short local-data explanation, and a primary action to record the first expense. No registration, currency setup, required tour, or fabricated spending. Opening history/summary directly still gives an explanation and an add action. After entering and saving an expense, the user reaches the populated history page and sees their own first useful result.

## Main Task

The single-column form asks for amount, description, category, and date, defaulting date to today. Cancel returns to history without creating a record. Invalid submission preserves all values, displays field-specific guidance, and focuses the first error. A successful storage write precedes the saved confirmation and updated totals. Storage errors retain input and offer retry without a duplicate save. Corrections use a prefilled edit route with the same validation and failure behavior. Deletion requires confirmation and only updates the UI as saved when persistence succeeds. A missing edit id links back to history. Shared navigation provides an Overview route from every step.

## Returning Visit

Precondition: saved records in the same browser profile and origin. Read and validate storage before choosing the initial page state, avoiding an empty-state flash. Show current-week total and recent purchases, then let the user open all history or weekly category distribution. A week without expenses has an honest empty summary and still provides older history and the add action. Refresh and closing/reopening the site are separate persistence checks.

## Exceptional states

Do not treat loading or a storage read failure as a first visit. Malformed JSON, unsupported versions, and invalid records open recovery without overwriting data. Retry the read, download the original raw value if readable, or explicitly confirm a reset. Canceling reset keeps the original value. A reset write failure stays in recovery. Data is saved only in this browser; clearing site data or switching devices does not preserve it.

## Diagram maintenance

Keep the fenced Mermaid block here and in README.md identical. Small validation and navigation details are described in prose to keep the diagram readable.
