import Link from "next/link";
import { Icon } from "@/components/icon";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "Keep it quick.",
    description: "A purchase, an amount, a category. Keep the details simple.",
    icon: "plus",
  },
  {
    title: "Keep it together.",
    description: "One place for the everyday purchases that are easy to forget.",
    icon: "expenses",
  },
  {
    title: "See where it goes.",
    description: "Come back each week for a clearer picture of your spending.",
    icon: "summary",
  },
] as const;

export function FirstVisit() {
  return (
    <div className="space-y-8 sm:space-y-10">
      <section aria-labelledby="welcome-title" className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
          Welcome to Spendly
        </p>
        <h1 id="welcome-title" className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          Know where your money goes.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          Keep everyday expenses simple. Record the small purchases, then see
          what adds up each week.
        </p>
      </section>

      <Card className="relative overflow-hidden">
        <div className="max-w-xl py-2 sm:py-5">
          <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
            <Icon name="leaf" width="26" height="26" />
          </span>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Start with one everyday purchase.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            Lunch, groceries, or the ride home. Your own spending is the starting
            point. No account setup or bank connection needed.
          </p>
          <Link
            href="/expenses/new"
            className={buttonStyles("primary", "mt-7 w-full sm:w-auto")}
            aria-describedby="entry-preview-note"
          >
            <Icon name="plus" />
            Add your first expense
          </Link>
          <p id="entry-preview-note" className="mt-3 text-sm leading-6 text-muted">
            Preview: entries last only for this visit. Refreshing or closing this page clears them.
          </p>
        </div>
      </Card>

      <section aria-labelledby="how-it-works-title">
        <h2 id="how-it-works-title" className="mb-4 text-lg font-semibold tracking-tight">
          A small habit. A clearer picture.
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map(({ title, description, icon }, index) => (
            <li key={title}>
              <Card className="h-full">
                <div className="mb-5 flex items-center justify-between text-brand">
                  <Icon name={icon} />
                  <span className="text-xs font-semibold text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <aside aria-labelledby="local-data-title" className="rounded-card border border-line px-5 py-5 sm:px-6">
        <h2 id="local-data-title" className="text-sm font-semibold">
          Made for your browser, without an account.
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          When saving is available, your records will stay in this browser on
          this device. They will not sync across devices, and clearing site data
          will remove them.
        </p>
      </aside>
    </div>
  );
}
