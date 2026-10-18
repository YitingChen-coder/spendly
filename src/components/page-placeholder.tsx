import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  cardTitle: string;
  cardDescription: string;
  icon: IconName;
};

export function PagePlaceholder({ eyebrow, title, description, cardTitle, cardDescription, icon }: PagePlaceholderProps) {
  return (
    <div className="space-y-9">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">{eyebrow}</p>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">{description}</p>
      </div>
      <Card className="flex min-h-80 flex-col items-start justify-center sm:min-h-96">
        <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand"><Icon name={icon} width="24" height="24" /></span>
        <div className="mb-3 inline-flex rounded-full bg-canvas px-3 py-1 text-xs font-medium text-muted">Coming soon</div>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{cardTitle}</h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{cardDescription}</p>
      </Card>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-md text-sm leading-6 text-muted">A simpler view of your everyday spending, taking shape.</p>
        <Link href={eyebrow === "Overview" ? "/expenses" : "/"} className={buttonStyles("secondary")}>
          {eyebrow === "Overview" ? "Explore expenses" : "Back to overview"}<Icon name="arrow" />
        </Link>
      </div>
    </div>
  );
}
