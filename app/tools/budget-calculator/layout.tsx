import type { Metadata } from "next";
export const metadata: Metadata = { title: "Budget Calculator", description: "Free budget calculator for building a simple monthly household budget from income and spending categories." };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }