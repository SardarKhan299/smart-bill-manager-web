import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Free Financial Calculators", template: "%s | Smart Bill Manager" },
  description: "Free household finance calculators for bills, budgeting and Safe-to-Spend planning.",
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}