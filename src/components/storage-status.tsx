"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ExpenseState } from "@/lib/expense-store";
import { getLocalDate } from "@/lib/expense";

type Props = { state: Exclude<ExpenseState, { status: "ready" }>; onRetry: () => void; onReset: () => void };

export function StorageStatus({ state, onRetry, onReset }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const confirmation = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => { if (confirming) confirmation.current?.querySelector("button")?.focus(); }, [confirming]);

  if (state.status === "loading") return <div role="status"><h1 className="text-2xl font-semibold">Loading your expenses…</h1><p className="mt-3 text-muted">Checking saved data in this browser.</p></div>;

  function download() {
    if (state.status !== "invalid") return;
    try {
      const url = URL.createObjectURL(new Blob([state.raw], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url; link.download = `spendly-recovery-${getLocalDate()}.json`;
      document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { setError("The download could not start. Your original saved data has not been changed."); }
  }
  function reset() {
    try { onReset(); } catch (caught) { setError(caught instanceof Error ? caught.message : "The reset could not be saved. Please retry."); }
  }
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Let’s check your saved data.</h1>
      <Card>
        <p role="alert" className="leading-7 text-ink">{state.message}</p>
        <p className="mt-3 text-sm leading-6 text-muted">No saved expenses have been replaced. Retry after checking this browser’s storage settings.</p>
        {error && <p role="alert" className="mt-4 text-sm text-danger">{error}</p>}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={() => { setConfirming(false); setError(""); onRetry(); }}>Retry loading</Button>
          {state.status === "invalid" && <><Button variant="secondary" onClick={download}>Download original data</Button><Button variant="secondary" onClick={event => { trigger.current = event.currentTarget; setConfirming(true); setError(""); }}>Reset saved data</Button></>}
        </div>
        {confirming && state.status === "invalid" && (
          <div ref={confirmation} aria-labelledby="reset-title" className="mt-6 rounded-control border border-control p-4">
            <h2 id="reset-title" className="font-semibold">Replace the saved data with an empty list?</h2>
            <p className="mt-2 text-sm leading-6 text-muted">This deletes the original value in this browser. Download it first if you want to keep a copy.</p>
            <div className="mt-4 flex flex-wrap gap-3"><Button onClick={reset}>Confirm reset</Button><Button variant="secondary" onClick={() => { setConfirming(false); setError(""); trigger.current?.focus(); }}>Cancel reset</Button></div>
          </div>
        )}
      </Card>
    </div>
  );
}
