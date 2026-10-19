"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useExpenses } from "@/components/expense-provider";
import { Button } from "@/components/ui/button";
import type { Expense } from "@/lib/expense";

export function DeleteExpense({ expense, onDeleted }: { expense: Expense; onDeleted: () => void }) {
  const { deleteExpense } = useExpenses();
  const confirmationId = useId();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const confirm = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => { if (confirming) confirm.current?.querySelector("button")?.focus(); }, [confirming]);
  return (
    <div>
      <Button variant="secondary" aria-label={`Delete ${expense.description}`} onClick={event => { trigger.current = event.currentTarget; setConfirming(true); }}>Delete</Button>
      {confirming && (
        <div ref={confirm} className="mt-3 rounded-control border border-control p-4" aria-labelledby={confirmationId}>
          <p id={confirmationId} className="text-sm font-medium wrap-anywhere">Delete “{expense.description}”?</p>
          <p className="mt-2 text-sm text-muted">This removes the saved expense from this browser.</p>
          {error && <p role="alert" className="mt-3 text-sm text-danger">{error}</p>}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => { try { deleteExpense(expense.id); onDeleted(); } catch (caught) { setError(caught instanceof Error ? caught.message : "The expense could not be deleted. Please retry."); } }}>Confirm delete</Button>
            <Button variant="secondary" onClick={() => { setConfirming(false); setError(""); trigger.current?.focus(); }}>Cancel delete</Button>
          </div>
        </div>
      )}
    </div>
  );
}
