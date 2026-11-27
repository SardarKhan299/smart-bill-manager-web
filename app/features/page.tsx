import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";

export const metadata = {
  title: "Features — Offline Bills, Receipt OCR, Warranties & Safe-to-Spend",
  description:
    "Explore Smart Bill Manager features for Android: offline bill reminders, on-device AI receipt scanning, subscription tracking, Safe-to-Spend, daily cash log, debt tracker and warranty vault.",
  keywords: [
    "smart bill manager features",
    "offline bill reminder features",
    "on-device receipt ocr android",
    "warranty vault and debt tracker",
  ],
  alternates: { canonical: "/features/" },
  openGraph: {
    title: "Features | Smart Bill Manager",
    description:
      "Offline bill reminders, Safe-to-Spend planning, on-device receipt OCR, subscription audit, daily cash log and warranty vault on Android.",
    url: "/features/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Features" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features | Smart Bill Manager",
    description:
      "Explore offline bill tracking, receipt scanning, Safe-to-Spend planning and warranty management on Android.",
    images: ["/og-image.svg"],
  },
};

const items = [
  ["Bills & reminders", "Track recurring bills, due dates, Android calendar sync and Material You home-screen widgets."],
  ["Subscription management", "See monthly and annualized subscription costs, renewal countdowns and recorded price changes."],
  ["Safe-to-Spend", "Review available discretionary money after subtracting upcoming committed bills."],
  ["On-device receipt OCR", "Extract merchant name, date and total locally on your phone without uploading receipt photos."],
  ["Daily cash log & streaks", "Record everyday cash spending fast and earn +1 free OCR scan on Day-3 no-spend streaks."],
  ["Warranty & receipt vault", "Attach receipt photos, purchase dates and warranty expiry reminders to household items."],
  ["Debt tracker & bill splitter", "Track personal IOUs, snowball/avalanche debt payoff plans and shared group bills."],
  ["Category budget caps", "Set practical monthly category limits and compare planned vs. recorded household spending."],
  ["Cash-flow forecasting", "Spot upcoming paydays, concentrated bill weeks and cash-flow pressure points early."],
  ["Savings goals", "Track target amounts and progress toward household emergency funds and planned purchases."],
  ["PDF & CSV statements", "Export clean PDF/CSV financial statements or import CSV transactions locally."],
  ["Biometric lock & backups", "Protect records with Android fingerprint/PIN lock and export encrypted local backups."],
];

export default function Page() {
  return (
    <main className="page">
      <Breadcrumbs items={[{ name: "Features" }]} />
      <div className="container">
        <div className="section-head">
          <div className="kicker">FEATURES</div>
          <h1>Tools for the financial commitments around everyday life.</h1>
          <p className="lead">
            Smart Bill Manager brings offline bills, subscriptions, cash expenses, receipt scanning and warranties together on Android.
          </p>
          <div className="actions">
            <OpenInAppCta route="bills" placement="features-top-open" label="Open Smart Bill Manager" />
            <PlayCta placement="features-top-play" label="Download on Google Play" secondary />
          </div>
        </div>
        <div className="grid-3">
          {items.map(([t, d], i) => (
            <div className="card" key={t}>
              <div className="feature-icon">{String(i + 1).padStart(2, "0")}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <p className="related">
          <Link href="/offline-budget-app/">Offline budget app</Link> ·{" "}
          <Link href="/offline-receipt-scanner/">Offline receipt scanner</Link> ·{" "}
          <Link href="/warranty-tracker/">Warranty tracker</Link> ·{" "}
          <Link href="/bill-reminder-app/">Bill reminder app</Link> ·{" "}
          <Link href="/daily-cash-tracker/">Daily cash tracker</Link> ·{" "}
          <Link href="/debt-tracker/">Debt tracker</Link> ·{" "}
          <Link href="/tools/">Free calculators</Link>
        </p>
      </div>
    </main>
  );
}
