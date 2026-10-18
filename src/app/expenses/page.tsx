import type { Metadata } from "next";
import { EmptyWorkspace } from "@/components/empty-workspace";

export const metadata: Metadata = { title: "Expenses" };

export default function ExpensesPage() {
  return (
    <EmptyWorkspace
      eyebrow="Expenses"
      title="The details, all together."
      description="A place for your everyday purchases, ready when you are."
      heading="Your spending story starts with one purchase."
      message="There are no recorded expenses in this preview. Start with a purchase you want to keep track of, such as lunch or groceries."
      icon="expenses"
    />
  );
}
