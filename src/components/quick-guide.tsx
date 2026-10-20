"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button, buttonStyles } from "@/components/ui/button";

const guideKey = "spendly:quick-guide:v1";
const guideEvent = "spendly:guide-change";
const steps = [
  { title: "Record your first expense", description: "Choose Add Expense. Enter the amount, a short description, category and date, then save. No account needed." },
  { title: "See your saved records", description: "Open Expenses to see your purchase and updated weekly total. You can edit a record or confirm its deletion at any time." },
  { title: "Review your week", description: "Open Weekly Summary to see where your money went. Come back in this browser to continue. Clearing site data removes your records." },
];

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(guideEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(guideEvent, callback);
  };
}
function wasDismissed() {
  try { return window.localStorage.getItem(guideKey) === "dismissed"; }
  catch { return false; }
}

export function QuickGuide() {
  const dismissed = useSyncExternalStore(subscribe, wasDismissed, () => true);
  const [sessionDismissed, setSessionDismissed] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const [step, setStep] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const panel = useRef<HTMLElement>(null);
  const open = manualOpen || (!dismissed && !sessionDismissed);

  function close() {
    const returnFocus = panel.current?.contains(document.activeElement);
    setSessionDismissed(true);
    setManualOpen(false);
    try { window.localStorage.setItem(guideKey, "dismissed"); } catch { /* Keep dismissal for this page session when storage is unavailable. */ }
    window.dispatchEvent(new Event(guideEvent));
    if (returnFocus) trigger.current?.focus();
  }

  useEffect(() => {
    if (manualOpen) heading.current?.focus();
  }, [manualOpen, step]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        const returnFocus = panel.current?.contains(document.activeElement);
        setSessionDismissed(true);
        setManualOpen(false);
        try { window.localStorage.setItem(guideKey, "dismissed"); } catch { /* Dismiss without requiring storage access. */ }
        window.dispatchEvent(new Event(guideEvent));
        if (returnFocus) trigger.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onTaskFocus(event: FocusEvent) {
      if (event.target instanceof HTMLElement && event.target.closest("main")) {
        // Keep the non-modal guide from covering keyboard focus in the task.
        setSessionDismissed(true);
        setManualOpen(false);
      }
    }
    document.addEventListener("focusin", onTaskFocus);
    return () => document.removeEventListener("focusin", onTaskFocus);
  }, [open]);

  return (
    <div className="fixed right-4 bottom-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open && (
        <section ref={panel} id="quick-guide-panel" aria-label="Quick start guide" className="max-h-[calc(100dvh-7rem)] w-80 max-w-full overflow-y-auto rounded-card border border-control bg-surface p-5 shadow-xl">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold tracking-wide text-brand">QUICK START · {step + 1} OF {steps.length}</p>
            <button type="button" aria-label="Close guide" onClick={close} className="flex min-h-11 min-w-11 items-center justify-center rounded-control text-xl text-muted">×</button>
          </div>
          <div aria-live="polite" aria-atomic="true">
            <h2 ref={heading} tabIndex={-1} className="rounded-control text-xl font-semibold">{steps[step].title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{steps[step].description}</p>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {step > 0 && <Button variant="secondary" onClick={() => { setManualOpen(true); setStep(step - 1); }}>Back</Button>}
            {step < steps.length - 1 ? <Button onClick={() => { setManualOpen(true); setStep(step + 1); }}>Next</Button> : <a href="/expenses/new" onClick={close} className={buttonStyles()}>Add an expense</a>}
            <button type="button" onClick={close} className="min-h-11 rounded-control px-3 text-sm font-semibold text-muted">{step === steps.length - 1 ? "Done" : "Skip"}</button>
          </div>
        </section>
      )}
      <Button ref={trigger} aria-expanded={open} aria-controls={open ? "quick-guide-panel" : undefined} onClick={() => { if (open) close(); else { setStep(0); setManualOpen(true); } }} className="shadow-lg">Quick guide</Button>
    </div>
  );
}
