import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safe-to-Spend Calculator",
  description: "Free Safe-to-Spend calculator for estimating a planning amount after committed bills and planned spending.",
  alternates: { canonical: "/tools/safe-to-spend-calculator/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
