import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monthly Expense Calculator — Daily, Weekly & Household Spend Roll-Up",
  description:
    "Free monthly expense calculator. Convert daily coffee, weekly groceries, fuel and monthly household categories into one clear monthly and annual spending total.",
  keywords: [
    "monthly expense calculator",
    "household expense calculator",
    "daily to monthly spending calculator",
    "personal expense estimator",
    "living expenses calculator",
  ],
  alternates: { canonical: "/tools/monthly-expense-calculator/" },
  openGraph: {
    title: "Monthly Expense Calculator — Household Spend Estimator | Smart Bill Manager",
    description:
      "Roll up daily, weekly and monthly household purchases into a clear monthly and annual spending breakdown privately in your browser.",
    url: "/tools/monthly-expense-calculator/",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Monthly Expense Calculator — Smart Bill Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monthly Expense Calculator — Daily, Weekly & Household Spend Roll-Up",
    description:
      "Convert daily and weekly spending habits into true monthly and annual household totals — 100% private.",
    images: ["/og-image.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
