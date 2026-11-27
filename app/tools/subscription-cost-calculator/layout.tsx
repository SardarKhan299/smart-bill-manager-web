import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Cost Calculator — Annual & Monthly Drain Estimator",
  description:
    "Free subscription cost calculator. Convert weekly, monthly, quarterly and yearly subscriptions into monthly and annual household spend privately in your browser.",
  keywords: [
    "subscription cost calculator",
    "annual subscription calculator",
    "monthly subscription calculator",
    "recurring subscription audit tool",
    "how much do my subscriptions cost a year",
  ],
  alternates: { canonical: "/tools/subscription-cost-calculator/" },
  openGraph: {
    title: "Subscription Cost Calculator — Annual & Monthly Drain Estimator | Smart Bill Manager",
    description:
      "Calculate your true monthly, annual and 5-year subscription cost across weekly, monthly, quarterly and yearly plans.",
    url: "/tools/subscription-cost-calculator/",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Subscription Cost Calculator — Smart Bill Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscription Cost Calculator — Annual & Monthly Drain Estimator",
    description:
      "See what your recurring subscriptions really cost per month, per year, and over 5 years — free and private.",
    images: ["/og-image.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
