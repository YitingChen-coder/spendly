import Link from "next/link";
import { Icon, type IconName } from "@/components/icon";
import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type EmptyWorkspaceProps = {
  eyebrow: string;
  title: string;
  description: string;
  heading: string;
  message: string;
  icon: IconName;
};

export function EmptyWorkspace({ eyebrow, title, description, heading, message, icon }: EmptyWorkspaceProps) {
  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-brand uppercase">{eyebrow}</p>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">{description}</p>
      </div>
      <Card>
        <span className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <Icon name={icon} width="24" height="24" />
        </span>
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{heading}</h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted">{message}</p>
        <Link href="/expenses/new" className={buttonStyles("primary", "mt-6 w-full sm:w-auto")} aria-describedby="empty-preview-note">
          <Icon name="plus" />Add your first expense
        </Link>
        <p id="empty-preview-note" className="mt-3 text-sm leading-6 text-muted">Preview: expense entry and saving are not available yet.</p>
      </Card>
      <Link href="/" className={buttonStyles("secondary")}>Back to overview<Icon name="arrow" /></Link>
    </div>
  );
}
