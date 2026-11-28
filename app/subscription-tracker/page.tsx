import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Subscription Tracker — Offline Recurring Cost & Renewal App",
  description:
    "Track recurring subscriptions, see annualized costs, and spot subscription price hikes privately on Android with Smart Bill Manager.",
  keywords: [
    "subscription tracker app",
    "offline subscription tracker android",
    "recurring subscription manager",
    "annual subscription cost tracker",
  ],
  alternates: { canonical: "/subscription-tracker/" },
  openGraph: {
    title: "Subscription Tracker | Smart Bill Manager",
    description:
      "Track recurring subscriptions, annualized drain, and renewal dates privately on Android without linking a bank account.",
    url: "/subscription-tracker/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Subscription Tracker — Smart Bill Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscription Tracker | Smart Bill Manager",
    description:
      "Organise recurring subscriptions and understand annualized cost offline on Android.",
    images: ["/og-image.svg"],
  },
};

const faq = [
  {
    question: "What does a subscription tracker do?",
    answer:
      "A subscription tracker keeps recurring subscriptions organised so you can review their prices, billing cycles, renewal dates and annualized contribution to household spending.",
  },
  {
    question: "Can I track subscription price changes?",
    answer:
      "Smart Bill Manager includes local subscription price-change insights based on your recorded history so price hikes are easier to spot.",
  },
  {
    question: "Can I calculate my annual subscription cost right now?",
    answer:
      "Yes. Try our free browser-based Subscription Cost Calculator or record recurring subscriptions in Smart Bill Manager on Android.",
  },
];

export default function Page() {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: "Subscription Tracker" }]} />
      <div className="container prose">
        <div className="kicker">SUBSCRIPTION TRACKER</div>
        <h1>Know what your subscriptions cost over time.</h1>
        <p className="lead">
          Smart Bill Manager is a private Android subscription tracker for organising recurring services and seeing how monthly and annual renewals affect your household budget.
        </p>
        <div className="seo-callout">
          <strong>Want a quick browser estimate first?</strong>
          <p>
            Use the free <Link href="/tools/subscription-cost-calculator/"><strong>Subscription Cost Calculator</strong></Link> to see your monthly equivalent, annual drain and 5-year spend in seconds.
          </p>
        </div>
        <h2>Track recurring subscriptions</h2>
        <p>
          Record subscription commitments alongside bills and everyday expenses so recurring costs are visible in one offline household finance workspace.
        </p>
        <h2>Understand recurring, price-change and lifetime cost</h2>
        <ul>
          <li>Review monthly and annualized subscription costs across billing cycles.</li>
          <li>Spot recorded subscription price hikes over time.</li>
          <li>Receive local reminders before upcoming renewal dates.</li>
          <li>Include recurring subscriptions automatically in Safe-to-Spend planning.</li>
        </ul>
        <h2>Keep recurring records private</h2>
        <p>
          Smart Bill Manager is designed as a local-first household finance app. Your financial records stay on your device, with no bank login or cloud account required.
        </p>
        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <div className="actions">
          <OpenInAppCta route="bills" placement="subscription-tracker-open" label="Open Subscriptions in App" />
          <PlayCta placement="subscription-tracker-play" label="Download on Google Play" secondary />
        </div>
        <p className="related">
          <Link href="/tools/subscription-cost-calculator/">Subscription Cost Calculator</Link> ·{" "}
          <Link href="/compare/subscription-tracker-vs-spreadsheet/">Subscription tracker vs spreadsheet</Link> ·{" "}
          <Link href="/bill-tracker/">Bill tracker</Link> ·{" "}
          <Link href="/expense-tracker/">Expense tracker</Link> ·{" "}
          <Link href="/budget-planner/">Budget planner</Link> ·{" "}
          <Link href="/blog/how-to-track-subscriptions/">Guide: how to track subscriptions</Link> ·{" "}
          <Link href="/blog/subscription-audit-guide/">Subscription audit guide</Link>
        </p>
      </div>
    </main>
  );
}
