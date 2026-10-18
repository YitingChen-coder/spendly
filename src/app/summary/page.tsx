import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Weekly Summary" };

export default function SummaryPage() {
  return <PagePlaceholder eyebrow="Weekly Summary" title="Make room for perspective." description="A weekly view to help you understand the purchases behind your spending." cardTitle="Your week, with a little more clarity." cardDescription="Weekly totals and a category breakdown are coming soon. This preview does not calculate spending or display sample financial data." icon="summary" />;
}
