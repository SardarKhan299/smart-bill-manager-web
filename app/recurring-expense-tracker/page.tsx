import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Recurring Expense Tracker — Spot Repeated Household Costs",
  description:
    "Identify and review repeated household spending patterns alongside bills and subscriptions privately on Android with Smart Bill Manager.",
  keywords: [
    "recurring expense tracker",
    "track recurring household costs",
    "repeated expense detector android",
    "offline recurring bill and expense app",
  ],
  alternates: { canonical: "/recurring-expense-tracker/" },
  openGraph: {
    title: "Recurring Expense Tracker | Smart Bill Manager",
    description:
      "Surface repeated household spending patterns and connect them to your monthly budget and Safe-to-Spend plan.",
    url: "/recurring-expense-tracker/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Recurring Expense Tracker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recurring Expense Tracker | Smart Bill Manager",
    description:
      "Spot repeated household expenses and review recurring commitments privately on Android.",
    images: ["/og-image.svg"],
  },
};

const faq = [
  {
    question: "What is a recurring expense tracker?",
    answer:
      "A recurring expense tracker surfaces spending patterns that repeat over time in your recorded history so ongoing household costs are easier to plan around.",
  },
  {
    question: "Does it scrape bank transactions automatically?",
    answer:
      "No. Smart Bill Manager analyses the bills and expenses you record or import locally on your device — without connecting to your bank.",
  },
  {
    question: "Are recurring expenses the same as subscriptions?",
    answer:
      "Subscriptions are formal recurring contracts, whereas recurring expense patterns can also include repeated utility top-ups, transit passes or regular household refills.",
  },
];

export default function Page() {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: "Recurring Expense Tracker" }]} />
      <div className="container prose">
        <div className="kicker">RECURRING EXPENSES</div>
        <h1>Make recurring spending easier to spot.</h1>
        <p className="lead">
          Smart Bill Manager helps identify and review recurring household expenses in your local records so repeated costs don&apos;t disappear into everyday spending.
        </p>
        <h2>Review repeated spending patterns</h2>
        <p>
          On-device pattern detection highlights repeated merchants and intervals across your recorded expenses so you can convert important ones into tracked commitments.
        </p>
        <h2>Understand recurring costs beyond subscriptions</h2>
        <p>
          Combine formal subscriptions, utility bills and repeated household refills in a single forward-looking budget view.
        </p>
        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <div className="actions">
          <OpenInAppCta route="bills" placement="recurring-expense-tracker-open" label="Open Recurring Bills in App" />
          <PlayCta placement="recurring-expense-tracker-play" label="Download on Google Play" secondary />
        </div>
        <p className="related">
          <Link href="/subscription-tracker/">Subscription tracker</Link> ·{" "}
          <Link href="/tools/subscription-cost-calculator/">Subscription Cost Calculator</Link> ·{" "}
          <Link href="/bill-reminder-app/">Bill reminder app</Link> ·{" "}
          <Link href="/blog/recurring-expense-guide/">Guide: recurring expenses</Link> ·{" "}
          <Link href="/blog/recurring-expense-audit/">Recurring expense audit</Link>
        </p>
      </div>
    </main>
  );
}
