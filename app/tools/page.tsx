import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";

export const metadata = {
  title: "Free Household Finance Calculators — Bills, Subscriptions & Safe-to-Spend",
  description:
    "Free browser-only household finance calculators for monthly bills, recurring subscription costs, budgets and Safe-to-Spend planning — no bank login required.",
  keywords: [
    "free financial calculators",
    "bill calculator",
    "subscription cost calculator",
    "budget calculator",
    "safe to spend calculator",
  ],
  alternates: { canonical: "/tools/" },
  openGraph: {
    title: "Free Household Finance Calculators | Smart Bill Manager",
    description:
      "Estimate monthly bills, annualized subscription costs, category budgets and Safe-to-Spend privately in your browser.",
    url: "/tools/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Free Financial Calculators — Smart Bill Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Household Finance Calculators | Smart Bill Manager",
    description:
      "Free browser-only calculators for monthly bills, subscription costs, budgets and Safe-to-Spend planning.",
    images: ["/og-image.svg"],
  },
};

const tools = [
  {
    href: "/tools/bill-calculator/",
    title: "Bill Calculator",
    text: "Estimate how much monthly income remains after the fixed household bills you enter.",
  },
  {
    href: "/tools/subscription-cost-calculator/",
    title: "Subscription Cost Calculator",
    text: "Convert weekly, monthly, quarterly and yearly subscriptions into monthly, annual and 5-year spend.",
  },
  {
    href: "/tools/budget-calculator/",
    title: "Budget Calculator",
    text: "Build a simple monthly household budget from income and planned spending categories.",
  },
  {
    href: "/tools/safe-to-spend-calculator/",
    title: "Safe-to-Spend Calculator",
    text: "Subtract upcoming committed bills and essentials from your balance before you spend.",
  },
];

export default function Page() {
  return (
    <main className="page seo-page">
      <Breadcrumbs items={[{ name: "Tools" }]} />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOLS</div>
        <h1>Free household finance calculators.</h1>
        <p className="lead">
          Use these private browser calculators for quick planning. Everything runs locally from the numbers you enter — with no account sign-up and no bank connection.
        </p>
        <div className="grid-3 tool-grid">
          {tools.map((tool) => (
            <article className="card" key={tool.href}>
              <h2 className="card-title">{tool.title}</h2>
              <p>{tool.text}</p>
              <p>
                <Link className="btn btn-secondary" href={tool.href}>
                  Open calculator
                </Link>
              </p>
            </article>
          ))}
        </div>

        <div className="conversion-panel">
          <h2>Ready to automate reminders on Android?</h2>
          <p>
            Save recurring bills, subscriptions, daily cash expenses, receipts and warranties offline on your phone with Smart Bill Manager.
          </p>
          <div className="actions">
            <OpenInAppCta route="bills" placement="tools-hub-open" label="Open Smart Bill Manager" />
            <PlayCta placement="tools-hub-play" label="Download on Google Play" secondary />
          </div>
        </div>

        <h2>Use calculators as planning aids</h2>
        <p>
          Results depend on the figures and assumptions you enter. Keep your actual bank accounts, scheduled bills and contractual obligations as the source of truth for financial decisions.
        </p>
        <p className="related">
          <Link href="/offline-budget-app/">Offline Budget App</Link> ·{" "}
          <Link href="/bill-reminder-app/">Bill Reminder App</Link> ·{" "}
          <Link href="/subscription-tracker/">Subscription Tracker</Link> ·{" "}
          <Link href="/safe-to-spend/">Safe-to-Spend</Link> ·{" "}
          <Link href="/download/">Download Smart Bill Manager</Link>
        </p>
      </div>
    </main>
  );
}
