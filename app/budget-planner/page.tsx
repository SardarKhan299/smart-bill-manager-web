import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Budget Planner for Household Spending — Offline Category Caps",
  description:
    "Plan monthly household spending with category budgets, forecasts and Safe-to-Spend views privately on Android with Smart Bill Manager.",
  keywords: [
    "household budget planner",
    "category budget app android",
    "offline monthly budget planner",
    "budgeting without bank login",
  ],
  alternates: { canonical: "/budget-planner/" },
  openGraph: {
    title: "Budget Planner for Household Spending | Smart Bill Manager",
    description:
      "Set practical category budgets and compare planned vs. real household spending privately on Android.",
    url: "/budget-planner/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Budget Planner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Budget Planner for Household Spending | Smart Bill Manager",
    description:
      "Bring category budgets, everyday expenses and upcoming bills into one private Android planning view.",
    images: ["/og-image.svg"],
  },
};

const faq = [
  {
    question: "What is a household budget planner?",
    answer:
      "A household budget planner organises planned spending by category and compares it against recorded expenses and upcoming bill commitments.",
  },
  {
    question: "Can I use bills in my budget planning?",
    answer:
      "Yes. Smart Bill Manager considers recurring bills and subscriptions alongside category budgets and everyday spending records.",
  },
  {
    question: "Can I test a monthly budget in my browser first?",
    answer:
      "Yes. Use our free browser-only Budget Calculator to allocate income across categories before setting up persistent category caps in the Android app.",
  },
];

export default function Page() {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: "Budget Planner" }]} />
      <div className="container prose">
        <div className="kicker">BUDGET PLANNER</div>
        <h1>Plan household spending with more context.</h1>
        <p className="lead">
          Smart Bill Manager is a private household budget planner that brings category caps, everyday cash expenses and upcoming bills into one planning view.
        </p>
        <h2>Set practical category budgets</h2>
        <p>
          Use category budgets and recorded spending to keep a clear view of groceries, utilities, transport and discretionary limits without connecting a bank account.
        </p>
        <h2>Compare your plan with real spending</h2>
        <p>
          Review recorded expenses alongside your budget during the month so adjustments happen before categories overrun.
        </p>
        <h2>Private, local-first household planning</h2>
        <p>
          Your financial records stay locally on your Android device, with no cloud account required for core budgeting.
        </p>
        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <div className="actions">
          <OpenInAppCta route="analytics" placement="budget-planner-open" label="Open Budget & Analytics in App" />
          <PlayCta placement="budget-planner-play" label="Download on Google Play" secondary />
        </div>
        <p className="related">
          <Link href="/offline-budget-app/">Offline budget app</Link> ·{" "}
          <Link href="/tools/budget-calculator/">Budget Calculator</Link> ·{" "}
          <Link href="/expense-tracker/">Expense tracker</Link> ·{" "}
          <Link href="/safe-to-spend/">Safe-to-Spend</Link> ·{" "}
          <Link href="/blog/household-budget-guide/">Guide: household budgeting</Link> ·{" "}
          <Link href="/blog/budget-vs-expense-tracker/">Budget vs expense tracker</Link>
        </p>
      </div>
    </main>
  );
}
