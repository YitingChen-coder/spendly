import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { ExpenseProvider } from "@/components/expense-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Spendly | Personal Expense Tracker", template: "%s | Spendly" },
  description: "A simple space to record everyday expenses and understand where your money goes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body><ExpenseProvider><AppShell>{children}</AppShell></ExpenseProvider></body></html>;
}
