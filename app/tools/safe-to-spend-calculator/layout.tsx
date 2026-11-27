import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safe-to-Spend Calculator — Discretionary Money Estimator",
  description:
    "Free Safe-to-Spend calculator. Subtract upcoming committed bills and planned essentials from your current balance to see what is genuinely free to spend.",
  keywords: [
    "safe to spend calculator",
    "discretionary spending calculator",
    "money left after bills calculator",
    "manage money until payday calculator",
    "free safe to spend tool",
  ],
  alternates: { canonical: "/tools/safe-to-spend-calculator/" },
  openGraph: {
    title: "Safe-to-Spend Calculator — Discretionary Money Estimator | Smart Bill Manager",
    description:
      "Subtract upcoming committed bills and planned spending from your balance to estimate what is safe to spend before payday.",
    url: "/tools/safe-to-spend-calculator/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Safe-to-Spend Calculator — Smart Bill Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe-to-Spend Calculator — Discretionary Money Estimator",
    description:
      "Check how much of your balance is genuinely free to spend after upcoming bills — private and browser-only.",
    images: ["/og-image.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
