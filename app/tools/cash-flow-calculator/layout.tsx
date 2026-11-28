import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cash-Flow Calculator — 30-Day Payday & Bill Crunch Forecaster",
  description:
    "Free 30-day household cash-flow calculator. Simulate starting balance, upcoming paydays, bill due dates and daily spending to spot mid-month cash dips early.",
  keywords: [
    "cash flow calculator",
    "personal cash flow calculator",
    "30 day bill forecast calculator",
    "balance before payday calculator",
    "household cash flow planner",
  ],
  alternates: { canonical: "/tools/cash-flow-calculator/" },
  openGraph: {
    title: "Cash-Flow Calculator — 30-Day Payday & Bill Forecaster | Smart Bill Manager",
    description:
      "Simulate upcoming paychecks and bill due dates day by day to catch pre-payday cash crunches privately in your browser.",
    url: "/tools/cash-flow-calculator/",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Cash-Flow Calculator — Smart Bill Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cash-Flow Calculator — 30-Day Payday & Bill Crunch Forecaster",
    description:
      "Project your lowest balance before payday across upcoming bills and paychecks — 100% private in your browser.",
    images: ["/og-image.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
