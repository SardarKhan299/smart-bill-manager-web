import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bill Calculator",
  description: "Free bill calculator for estimating monthly household bills and the amount remaining after listed bills.",
  alternates: { canonical: "/tools/bill-calculator/" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
