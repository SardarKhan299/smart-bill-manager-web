import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";
import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about Smart Bill Manager: offline bill reminders, on-device AI receipt scanner, warranty vault, daily cash log, debts, privacy and 7-day Pro trial on Android.",
  keywords: ["smart bill manager faq", "offline budget app faq", "offline receipt scanner android", "warranty tracker app", "bill reminder app without bank login"],
  alternates: { canonical: "/faq/" },
  openGraph: {
    title: "Frequently Asked Questions | Smart Bill Manager",
    description: "Answers about offline bill reminders, on-device AI receipt scanning, warranty vault, daily cash log, privacy and Pro on Android.",
    url: "/faq/",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | Smart Bill Manager",
    description: "Answers about offline bill reminders, on-device AI receipt scanning, warranty vault, daily cash log, privacy and Pro on Android.",
    images: ["/og-image.svg"],
  },
};

const faqs = [
  ["What is Smart Bill Manager?", "Smart Bill Manager is an offline-first Android household finance app for organising bills, scanning receipts with on-device AI, logging daily cash expenses, tracking subscriptions, managing debts and storing product warranties."],
  ["Does Smart Bill Manager require a bank account connection?", "No. Smart Bill Manager never asks for bank logins, open-banking credentials or cloud account sign-up. You record and manage your bills, receipts and cash expenses directly on your Android device."],
  ["Where are my financial records stored?", "Your bills, receipts, warranties and daily cash log stay in your phone's local database with optional biometric/PIN lock and AES-256 encrypted local backups. The production app may use third-party services for analytics, crash reporting, advertising and subscription management."],
  ["Does the AI receipt scanner work offline without uploading my receipts?", "Yes. On-device OCR extracts merchant names, amounts and due dates locally on your Android phone without uploading receipt photos to external servers."],
  ["Can I track product warranties and expiry dates?", "Yes. The built-in Warranty Vault lets you attach receipt photos to electronics and appliances and track expiry reminders in one searchable place."],
  ["Can I log daily cash spending and build no-spend streaks?", "Yes. The Daily Cash Log and Quick Cash home-screen widget let you log cash purchases in 3 seconds, track no-spend day streaks and earn bonus offline OCR scans."],
  ["Does Smart Bill Manager track personal debts and split bills?", "Yes. You can track money you owe and money owed to you in the Debt Tracker, set repayment reminders, split shared household bills and track savings goals."],
  ["What is Safe-to-Spend?", "Safe-to-Spend is a planning view that subtracts upcoming unpaid bills and commitments from your available amount so you can see what is truly free to spend today."],
  ["Is Safe-to-Spend a bank-authorised spending limit?", "No. It is a planning aid based on the records and settings maintained in the app, not a bank transaction authorisation or guarantee."],
  ["Can I track subscriptions and recurring bills?", "Yes. Smart Bill Manager tracks recurring monthly, quarterly and annual bills and subscriptions, shows annualized costs, and includes a Material You home-screen widget to mark bills paid in 1 tap."],
  ["Is there a free version and a Pro free trial?", "Yes. Core bill tracking, daily cash log, warranty vault and starter offline OCR scans are free. Smart Bill Manager Pro offers a 7-day free trial on Monthly and Annual plans (plus a Lifetime unlock) for unlimited OCR scans, encrypted backups and an ad-free experience."],
  ["Is Smart Bill Manager available on Android?", "Yes. Smart Bill Manager is distributed through Google Play for Android and supports verified Android App Links to open specific screens directly."],
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main className="page">
      <Breadcrumbs items={[{ name: "FAQ" }]} />
      <div className="container prose">
        <div className="kicker">FAQ</div>
        <h1>Smart Bill Manager frequently asked questions.</h1>
        <p className="lead">Clear answers about offline bill reminders, on-device AI receipt scanning, warranty vault, daily cash log, privacy and Safe-to-Spend.</p>
        {faqs.map(([q, a]) => (
          <section className="faq-item" key={q}>
            <h2>{q}</h2>
            <p>{a}</p>
          </section>
        ))}
        <div className="conversion-panel">
          <h2>Jump straight into Smart Bill Manager</h2>
          <p>Already have the app installed on Android? Open your exact screen directly, or install free on Google Play.</p>
          <div className="actions">
            <OpenInAppCta route="bills" placement="faq-open-app" label="Open Smart Bill Manager" />
            <PlayCta placement="faq-play-download" label="Download on Google Play" secondary />
          </div>
          <p className="related">
            <Link href="/scan/">Scan Receipt</Link> · <Link href="/bills/">Upcoming Bills</Link> · <Link href="/warranties/">Warranty Vault</Link> · <Link href="/cash-log/">Daily Cash Log</Link> · <Link href="/analytics/">Analytics</Link> · <Link href="/pro/">7-Day Pro Trial</Link>
          </p>
        </div>
        <p className="related">
          <Link href="/offline-budget-app/">Offline budget app</Link> · <Link href="/offline-receipt-scanner/">Offline receipt scanner</Link> · <Link href="/warranty-tracker/">Warranty tracker</Link> · <Link href="/bill-reminder-app/">Bill reminder app</Link> · <Link href="/daily-cash-tracker/">Daily cash tracker</Link> · <Link href="/debt-tracker/">Debt tracker</Link>
        </p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
