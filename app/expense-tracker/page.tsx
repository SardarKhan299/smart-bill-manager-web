import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Expense Tracker for Everyday Spending — Private Offline Android App",
  description:
    "Record everyday cash and household expenses by category privately on Android with Smart Bill Manager — no bank login required.",
  keywords: [
    "offline expense tracker android",
    "everyday spending tracker app",
    "manual expense tracker no bank",
    "household expense log",
  ],
  alternates: { canonical: "/expense-tracker/" },
  openGraph: {
    title: "Expense Tracker for Everyday Spending | Smart Bill Manager",
    description:
      "Record daily household purchases by category and review them alongside bills and budgets privately on Android.",
    url: "/expense-tracker/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Expense Tracker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expense Tracker for Everyday Spending | Smart Bill Manager",
    description:
      "Track daily household spending offline on Android without connecting your bank account.",
    images: ["/og-image.svg"],
  },
};

const faq = [
  {
    question: "What is an expense tracker?",
    answer:
      "An expense tracker records everyday spending so household purchases can be reviewed by category alongside recurring bills and monthly budgets.",
  },
  {
    question: "Can Smart Bill Manager organise expenses by category?",
    answer:
      "Yes. Smart Bill Manager supports clear household categories, a 1-tap Quick Cash widget, and on-device receipt scanning.",
  },
  {
    question: "Does Smart Bill Manager require a bank connection?",
    answer:
      "No. Smart Bill Manager is built for local-first financial records on your Android device and never asks for banking credentials.",
  },
];

export default function Page() {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: "Expense Tracker" }]} />
      <div className="container prose">
        <div className="kicker">EXPENSE TRACKER</div>
        <h1>Understand where your household money is going.</h1>
        <p className="lead">
          Smart Bill Manager is an offline expense tracker for recording everyday spending and reviewing it alongside recurring bills, subscriptions and budgets.
        </p>
        <h2>Record everyday household expenses fast</h2>
        <p>
          Log cash or card purchases in seconds from the app or Quick Cash home-screen widget, or scan paper receipts locally with on-device OCR.
        </p>
        <h2>Organise spending with practical categories</h2>
        <p>
          Group groceries, dining, transport and household supplies consistently so high-spend areas stand out immediately during your monthly review.
        </p>
        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <div className="actions">
          <OpenInAppCta route="cash-log" placement="expense-tracker-open" label="Open Daily Cash Log in App" />
          <PlayCta placement="expense-tracker-play" label="Download on Google Play" secondary />
        </div>
        <p className="related">
          <Link href="/daily-cash-tracker/">Daily cash tracker &amp; streaks</Link> ·{" "}
          <Link href="/tools/monthly-expense-calculator/">Monthly Expense Calculator</Link> ·{" "}
          <Link href="/compare/expense-tracker-vs-spreadsheet/">Expense tracker vs spreadsheet</Link> ·{" "}
          <Link href="/offline-receipt-scanner/">Offline receipt scanner</Link> ·{" "}
          <Link href="/budget-planner/">Budget planner</Link> ·{" "}
          <Link href="/tools/budget-calculator/">Budget Calculator</Link> ·{" "}
          <Link href="/blog/monthly-expense-categories/">Monthly expense categories</Link>
        </p>
      </div>
    </main>
  );
}
