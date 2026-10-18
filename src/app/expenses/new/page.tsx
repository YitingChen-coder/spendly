import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Add Expense" };

export default function NewExpensePage() {
  return <PagePlaceholder eyebrow="Add Expense" title="Keep the small things simple." description="An uncluttered space for recording an everyday purchase, without the extra steps." cardTitle="A simpler way to keep track." cardDescription="Expense entry will be available here. This preview does not collect or save any information." icon="plus" />;
}
