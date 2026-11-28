import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings Goal Calculator — Monthly Deposit & Target Timeline Planner",
  description:
    "Free savings goal calculator. Estimate how many months it takes to reach an emergency fund or purchase goal and the monthly deposit needed by your target deadline.",
  keywords: [
    "savings goal calculator",
    "monthly savings calculator",
    "emergency fund calculator",
    "how much to save per month calculator",
    "sinking fund calculator",
  ],
  alternates: { canonical: "/tools/savings-goal-calculator/" },
  openGraph: {
    title: "Savings Goal Calculator — Monthly Deposit & Timeline | Smart Bill Manager",
    description:
      "Plan emergency funds and sinking funds privately in your browser — see months to goal, required monthly deposit and milestone targets.",
    url: "/tools/savings-goal-calculator/",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Savings Goal Calculator — Smart Bill Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savings Goal Calculator — Monthly Deposit & Target Timeline Planner",
    description:
      "Calculate monthly savings needed for emergency funds, holidays or annual bills privately in your browser.",
    images: ["/og-image.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
