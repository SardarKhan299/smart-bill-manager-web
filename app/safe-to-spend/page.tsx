import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Safe-to-Spend Money Planner — Know What Is Free to Spend After Bills",
  description:
    "See how much money is genuinely free to spend after subtracting upcoming household bills and recurring commitments in Smart Bill Manager for Android.",
  keywords: [
    "safe to spend app",
    "money left after bills planner",
    "discretionary spending tracker android",
    "safe to spend vs bank balance",
  ],
  alternates: { canonical: "/safe-to-spend/" },
  openGraph: {
    title: "Safe-to-Spend Money Planner | Smart Bill Manager",
    description:
      "Subtract upcoming committed bills from your available funds so you don't accidentally spend rent or utility money.",
    url: "/safe-to-spend/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Safe-to-Spend Planner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safe-to-Spend Money Planner | Smart Bill Manager",
    description:
      "Know what you can safely spend after upcoming household bills — private and offline on Android.",
    images: ["/og-image.svg"],
  },
};

const faq = [
  {
    question: "What does Safe-to-Spend mean?",
    answer:
      "Safe-to-Spend subtracts upcoming unpaid bills and planned essentials from your entered funds so you don't treat money needed for upcoming bills as free spending cash.",
  },
  {
    question: "Is Safe-to-Spend my bank balance?",
    answer:
      "No. Safe-to-Spend is a user-maintained planning estimate inside Smart Bill Manager; it does not connect to a bank or provide an authorised bank balance.",
  },
  {
    question: "Can I try the Safe-to-Spend calculation in my browser right now?",
    answer:
      "Yes. Use our free browser-based Safe-to-Spend Calculator to test your numbers instantly without creating an account.",
  },
];

export default function Page() {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: "Safe-to-Spend" }]} />
      <div className="container prose">
        <div className="kicker">SAFE-TO-SPEND</div>
        <h1>Know what you can safely spend.</h1>
        <p className="lead">
          Smart Bill Manager&apos;s Safe-to-Spend view subtracts upcoming bills and commitments so you don&apos;t mistake today&apos;s raw balance for discretionary money.
        </p>
        <div className="seo-callout">
          <strong>Try the instant calculator</strong>
          <p>
            Want to test your numbers right now? Open the free <Link href="/tools/safe-to-spend-calculator/"><strong>Safe-to-Spend Calculator</strong></Link> in your browser.
          </p>
        </div>
        <h2>How Safe-to-Spend works</h2>
        <p>
          Safe-to-Spend starts with the budget or available funds you set and subtracts upcoming unpaid bills and recorded spending for the period. Everything is transparent and stored locally on your device.
        </p>
        <h2>Important limitation</h2>
        <p>
          Safe-to-Spend is a planning aid, not financial advice and not a bank-authorised balance. Always keep your actual bank account and scheduled obligations as the source of truth.
        </p>
        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <div className="actions">
          <OpenInAppCta route="bills" placement="safe-to-spend-open" label="Open Safe-to-Spend in App" />
          <PlayCta placement="safe-to-spend-play" label="Download on Google Play" secondary />
        </div>
        <p className="related">
          <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link> ·{" "}
          <Link href="/offline-budget-app/">Offline budget app</Link> ·{" "}
          <Link href="/bill-tracker/">Bill tracker</Link> ·{" "}
          <Link href="/cash-flow-forecast/">Cash-flow forecast</Link> ·{" "}
          <Link href="/blog/safe-to-spend-vs-bank-balance/">Safe-to-Spend vs bank balance</Link> ·{" "}
          <Link href="/blog/how-safe-to-spend-is-calculated/">How Safe-to-Spend is calculated</Link>
        </p>
      </div>
    </main>
  );
}
