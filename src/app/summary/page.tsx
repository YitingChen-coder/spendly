import type { Metadata } from "next";
import { WeeklyReview } from "@/components/weekly-review";

export const metadata: Metadata = { title: "Weekly Summary" };
export default function SummaryPage() { return <WeeklyReview />; }
