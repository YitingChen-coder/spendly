import type { Metadata } from "next";
import { EmptyWorkspace } from "@/components/empty-workspace";

export const metadata: Metadata = { title: "Weekly Summary" };

export default function SummaryPage() {
  return (
    <EmptyWorkspace
      eyebrow="Weekly Summary"
      title="See what adds up."
      description="The bigger picture starts with the small things you record."
      heading="A clearer week starts with an expense."
      message="Record everyday purchases to build a weekly view of spending by category. The category breakdown is coming next. View your saved purchases and this week’s total on Expenses."
      icon="summary"
    />
  );
}
