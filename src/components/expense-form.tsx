"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useExpenses } from "@/components/expense-provider";
import { Button, buttonStyles } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { SelectField } from "@/components/ui/select-field";
import { categories, getLocalDate, validateExpense, type ExpenseErrors } from "@/lib/expense";

const fieldOrder = ["amount", "description", "category", "date"] as const;

export function ExpenseForm() {
  const router = useRouter();
  const { addExpense } = useExpenses();
  const [errors, setErrors] = useState<ExpenseErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submissionStarted = useRef(false);
  const dateInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dateInput.current) {
      const today = getLocalDate();
      if (!dateInput.current.value) dateInput.current.value = today;
      dateInput.current.max = today;
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionStarted.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      amount: String(data.get("amount") ?? ""),
      description: String(data.get("description") ?? ""),
      category: String(data.get("category") ?? ""),
      date: String(data.get("date") ?? ""),
    };
    const result = validateExpense(values, getLocalDate());
    setSubmitError("");
    if (!result.success) {
      setErrors(result.errors);
      const first = fieldOrder.find((field) => result.errors[field]);
      if (first) {
        const control = form.elements.namedItem(first);
        if (control instanceof HTMLElement) control.focus();
      }
      return;
    }

    submissionStarted.current = true;
    setSubmitting(true);
    setErrors({});
    try {
      addExpense(result.data);
    } catch {
      submissionStarted.current = false;
      setSubmitting(false);
      setSubmitError("Your expense could not be added. Your entries are still here. Please try again.");
      return;
    }
    router.push("/expenses");
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="temporary-data-note" className="space-y-6">
      <p id="temporary-data-note" className="rounded-control bg-brand-soft p-4 text-sm leading-6 text-ink">
        Preview: expenses stay only for this visit. Refreshing or closing this page clears them. Saving between visits is coming next.
      </p>
      {Object.keys(errors).length > 0 && <p role="alert" className="text-sm font-medium text-danger">Check the highlighted fields and try again.</p>}
      {submitError && <p role="alert" className="text-sm text-danger">{submitError}</p>}
      <FormField id="amount" name="amount" label="Amount (USD)" hint="For example, 12.50. Up to $999,999.99." type="text" inputMode="decimal" autoComplete="off" required error={errors.amount} />
      <FormField id="description" name="description" label="What was it for?" hint="A short description, up to 100 characters." type="text" autoComplete="off" required error={errors.description} />
      <SelectField id="category" name="category" label="Category" defaultValue="" required error={errors.category}>
        <option value="" disabled>Choose a category</option>
        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
      </SelectField>
      <FormField id="date" name="date" label="Date" hint="Today or an earlier date." type="date" min="0001-01-01" ref={dateInput} required error={errors.date} />
      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
        <Button type="submit" disabled={submitting}>{submitting ? "Adding expense…" : "Add expense"}</Button>
        <Link href="/expenses" className={buttonStyles("secondary")}>Cancel</Link>
      </div>
    </form>
  );
}
