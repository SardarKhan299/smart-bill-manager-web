import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Cash-Flow Forecast for Household Finances — Look Ahead Before Payday",
  description:
    "Spot upcoming bill clusters, paydays and spending pressure points early with offline household cash-flow forecasting in Smart Bill Manager for Android.",
  keywords: [
    "household cash flow forecast",
    "manage money until payday app",
    "upcoming bills forecast android",
    "personal cash flow planner",
  ],
  alternates: { canonical: "/cash-flow-forecast/" },
  openGraph: {
    title: "Cash-Flow Forecast for Household Finances | Smart Bill Manager",
    description:
      "Look ahead across bills, subscriptions and planned spending to spot cash-flow pressure points early.",
    url: "/cash-flow-forecast/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Cash-Flow Forecast" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cash-Flow Forecast for Household Finances | Smart Bill Manager",
    description:
      "Turn recorded bills and recurring commitments into a forward-looking household plan on Android.",
    images: ["/og-image.svg"],
  },
};

const faq = [
  {
    question: "What is a household cash-flow forecast?",
    answer:
      "A household cash-flow forecast is a forward-looking view of recorded bills, recurring renewals and planned expenses that highlights when commitments cluster before your next payday.",
  },
  {
    question: "What can Smart Bill Manager include in planning?",
    answer:
      "Its planning views combine recorded bills, subscriptions, recurring expense patterns and scheduled commitments stored on your device.",
  },
  {
    question: "Is a forecast guaranteed to predict my future bank balance?",
    answer:
      "No. A forecast reflects only the records and assumptions you enter and should be used as a planning aid alongside your actual bank account.",
  },
];

export default function Page() {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: "Cash-Flow Forecast" }]} />
      <div className="container prose">
        <div className="kicker">CASH-FLOW FORECAST</div>
        <h1>See what may be coming before it arrives.</h1>
        <p className="lead">
          Smart Bill Manager&apos;s cash-flow forecasting helps you look ahead across bills, subscriptions and planned spending so busy payment weeks are easier to spot.
        </p>
        <h2>Turn recorded commitments into a forward view</h2>
        <p>
          Upcoming bills, subscriptions and recurring expenses are reviewed together so you can prepare before several obligations land in the same week.
        </p>
        <h2>Forecasts are transparent planning tools</h2>
        <p>
          A forecast depends on the records you enter and will not include unrecorded transactions. Always keep your actual bank account and contractual due dates as the source of truth.
        </p>
        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <div className="actions">
          <OpenInAppCta route="analytics" placement="cash-flow-forecast-open" label="Open Cash-Flow Analytics in App" />
          <PlayCta placement="cash-flow-forecast-play" label="Download on Google Play" secondary />
        </div>
        <p className="related">
          <Link href="/safe-to-spend/">Safe-to-Spend</Link> ·{" "}
          <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link> ·{" "}
          <Link href="/bill-tracker/">Bill tracker</Link> ·{" "}
          <Link href="/budget-planner/">Budget planner</Link> ·{" "}
          <Link href="/blog/household-cash-flow-planning/">Guide: household cash-flow planning</Link>
        </p>
      </div>
    </main>
  );
}
