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
      message="Record everyday purchases to build a weekly view of spending by category. The weekly breakdown is coming later; entries currently last only for this visit."
      icon="summary"
    />
  );
}
