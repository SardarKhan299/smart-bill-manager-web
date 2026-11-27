import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budget Calculator — Free Monthly Household Budget Planner",
  description:
    "Free monthly budget calculator. Allocate income across housing, food, transport and household spending categories privately in your browser — no account needed.",
  keywords: [
    "budget calculator",
    "monthly budget calculator",
    "household budget planner",
    "free budget calculator no sign up",
    "private budget tool",
  ],
  alternates: { canonical: "/tools/budget-calculator/" },
  openGraph: {
    title: "Budget Calculator — Free Monthly Household Budget Planner | Smart Bill Manager",
    description:
      "Build a simple monthly household budget from income and spending categories privately in your browser.",
    url: "/tools/budget-calculator/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Budget Calculator — Smart Bill Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Calculator — Free Monthly Household Budget Planner",
    description:
      "Plan monthly income and category spending limits in seconds — private, free, and browser-only.",
    images: ["/og-image.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
