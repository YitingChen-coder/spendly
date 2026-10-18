import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Expenses" };

export default function ExpensesPage() {
  return <PagePlaceholder eyebrow="Expenses" title="The details, all together." description="A dedicated space for the everyday purchases that make up your bigger picture." cardTitle="Your expense history belongs here." cardDescription="A clear list of your recorded purchases is coming soon. There are no expense records in this preview." icon="expenses" />;
}
