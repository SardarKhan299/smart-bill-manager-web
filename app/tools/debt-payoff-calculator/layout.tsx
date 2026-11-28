import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator — Snowball vs. Avalanche Comparison",
  description:
    "Free Debt Snowball vs. Debt Avalanche payoff calculator. Compare months to debt-free and total interest saved privately in your browser — no bank login.",
  keywords: [
    "debt payoff calculator",
    "debt snowball vs avalanche calculator",
    "debt snowball calculator",
    "debt avalanche calculator",
    "credit card payoff calculator",
  ],
  alternates: { canonical: "/tools/debt-payoff-calculator/" },
  openGraph: {
    title: "Debt Payoff Calculator — Snowball vs. Avalanche | Smart Bill Manager",
    description:
      "Compare Debt Snowball (fastest first win) vs. Debt Avalanche (lowest total interest) privately in your browser.",
    url: "/tools/debt-payoff-calculator/",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Debt Payoff Calculator — Smart Bill Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Debt Payoff Calculator — Snowball vs. Avalanche Comparison",
    description:
      "Calculate months to debt-free and interest saved between Debt Snowball and Debt Avalanche — 100% private in your browser.",
    images: ["/og-image.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
