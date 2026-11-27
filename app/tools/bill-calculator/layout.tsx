import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bill Calculator — Free Monthly Household Bill Estimator",
  description:
    "Free monthly bill calculator. Subtract rent, utilities and recurring household bills from your income privately in your browser — no bank login required.",
  keywords: [
    "bill calculator",
    "monthly bill calculator",
    "household bill calculator",
    "income minus bills calculator",
    "free bill planner",
  ],
  alternates: { canonical: "/tools/bill-calculator/" },
  openGraph: {
    title: "Bill Calculator — Free Monthly Household Bill Estimator | Smart Bill Manager",
    description:
      "Estimate your total monthly household bills and remaining income privately in your browser without connecting a bank account.",
    url: "/tools/bill-calculator/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Bill Calculator — Smart Bill Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bill Calculator — Free Monthly Household Bill Estimator",
    description:
      "Subtract recurring household bills from monthly income in seconds — private, free, and browser-only.",
    images: ["/og-image.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
