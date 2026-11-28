import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bill Split Calculator — Split Rent, Utilities & Group Expenses",
  description:
    "Free shared bill and rent split calculator with tip, tax/fees and a 1-tap shareable summary. Split household bills fairly with no account sign-up.",
  keywords: [
    "bill split calculator",
    "split bill calculator",
    "rent split calculator",
    "utility bill splitter",
    "tip and bill split calculator",
  ],
  alternates: { canonical: "/tools/bill-split-calculator/" },
  openGraph: {
    title: "Bill Split Calculator — Split Rent, Utilities & Shared Bills | Smart Bill Manager",
    description:
      "Split rent, utilities, groceries or dinner with tip and extra fees privately in your browser — and copy a clean summary in 1 tap.",
    url: "/tools/bill-split-calculator/",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Bill Split Calculator — Smart Bill Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bill Split Calculator — Split Rent, Utilities & Group Expenses",
    description:
      "Calculate each person's share with tip and fees and share a clean breakdown — no sign-up required.",
    images: ["/og-image.svg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
