import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";

export const metadata = {
  title: "How It Works — Private Offline Household Money Workflow",
  description:
    "Learn how Smart Bill Manager organises recurring bills, subscriptions, receipt scans, everyday cash spending and Safe-to-Spend planning privately on Android.",
  keywords: [
    "how smart bill manager works",
    "offline bill tracking workflow",
    "how to track bills without bank connection",
    "local first budget app android",
  ],
  alternates: { canonical: "/how-it-works/" },
  openGraph: {
    title: "How It Works | Smart Bill Manager",
    description:
      "Five simple steps to manage bills, subscriptions, cash spending, receipts and Safe-to-Spend privately on Android.",
    url: "/how-it-works/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "How Smart Bill Manager Works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | Smart Bill Manager",
    description:
      "Organise bills, subscriptions, receipts and Safe-to-Spend locally on your Android phone.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <main className="page seo-page">
      <Breadcrumbs items={[{ name: "How It Works" }]} />
      <div className="container prose">
        <div className="kicker">HOW IT WORKS</div>
        <h1>One place for the financial commitments that matter.</h1>
        <p className="lead">
          Smart Bill Manager helps you organise household financial obligations offline on your Android phone — with no bank login and no cloud account required.
        </p>
        <h2>1. Add your recurring bills and subscriptions</h2>
        <p>
          Enter rent, utilities, internet, insurance and subscriptions with due dates and recurrence so local notifications and the home-screen widget remind you before payments are due.
        </p>
        <h2>2. Scan receipts or log daily cash in seconds</h2>
        <p>
          Snap paper receipts with on-device OCR or use the Quick Cash log to record everyday spending as it happens.
        </p>
        <h2>3. Check Safe-to-Spend before discretionary purchases</h2>
        <p>
          Review your Safe-to-Spend planning card so money already spoken for by upcoming bills is subtracted before you spend.
        </p>
        <h2>4. Store warranties and track personal debts</h2>
        <p>
          Save proof-of-purchase receipts with warranty expiry dates and keep track of personal IOUs or split household bills.
        </p>
        <h2>5. Export statements &amp; encrypted local backups</h2>
        <p>
          Generate PDF/CSV summaries whenever you review your month, and export encrypted backup files when moving to a new phone.
        </p>
        <div className="actions">
          <OpenInAppCta route="bills" placement="how-it-works-open" label="Open Smart Bill Manager" />
          <PlayCta placement="how-it-works-play" label="Download on Google Play" secondary />
        </div>
        <p className="related">
          <Link href="/offline-budget-app/">Offline budget app</Link> ·{" "}
          <Link href="/offline-receipt-scanner/">Receipt scanner</Link> ·{" "}
          <Link href="/warranty-tracker/">Warranty vault</Link> ·{" "}
          <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link> ·{" "}
          <Link href="/tools/subscription-cost-calculator/">Subscription Cost Calculator</Link> ·{" "}
          <Link href="/faq/">FAQ</Link>
        </p>
      </div>
    </main>
  );
}
