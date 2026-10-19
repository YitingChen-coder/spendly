"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icon";

const items: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Overview", icon: "overview" },
  { href: "/expenses", label: "Expenses", icon: "expenses" },
  { href: "/summary", label: "Weekly Summary", icon: "summary" },
  { href: "/expenses/new", label: "Add Expense", icon: "plus" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="flex flex-wrap gap-1 lg:flex-col lg:gap-2">
      {items.map(({ href, label, icon }) => {
        const active = pathname === href || (href === "/expenses" && /^\/expenses\/[^/]+\/edit$/.test(pathname));
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 items-center gap-2 rounded-control px-3 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none lg:gap-3 lg:px-4 ${active ? "bg-brand-soft text-brand" : "text-muted hover:bg-canvas hover:text-ink"}`}
          >
            <Icon name={icon} className="shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
