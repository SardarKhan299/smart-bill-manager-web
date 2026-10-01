import type { Metadata } from "next";

const SITE_URL = "https://smart-bill-manager-web.sardar-khan299.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Free Financial Calculators", template: "%s | Smart Bill Manager" },
  description: "Free household finance calculators for bills, budgeting and Safe-to-Spend planning.",
  alternates: { canonical: "/tools/" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
