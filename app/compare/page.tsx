import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";

export const metadata = {
  title: "Compare Household Money Management Approaches — App vs Spreadsheet",
  description:
    "Compare Smart Bill Manager with spreadsheets and manual calendar reminders across bill tracking, subscriptions, receipt OCR, warranties and local-first privacy.",
  keywords: [
    "bill tracker app vs spreadsheet",
    "offline budget app comparison",
    "household bill management options",
    "private finance tracker vs cloud app",
  ],
  alternates: { canonical: "/compare/" },
  openGraph: {
    title: "Compare Household Money Management Approaches | Smart Bill Manager",
    description:
      "Factual comparison of Smart Bill Manager, manual spreadsheets, and basic calendar reminders.",
    url: "/compare/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Compare Household Money Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Household Money Management Approaches",
    description:
      "Compare offline bill tracking in Smart Bill Manager against spreadsheets and manual reminders.",
    images: ["/og-image.svg"],
  },
};

const rows = [
  ["Bills & recurring commitments", "Purpose-built with local alerts & widget", "Manual setup", "Basic date alerts only"],
  ["Subscription annual cost tracking", "Built-in annualized & hike insights", "Manual formulas", "Usually separate"],
  ["Everyday cash expense records", "1-tap Cash Log & widget", "Manual rows", "Not supported"],
  ["Safe-to-Spend planning", "Built-in calculation", "Formula-based", "Not supported"],
  ["Receipt OCR & warranty vault", "On-device OCR + expiry alerts", "Manual file links", "Usually separate"],
  ["Local-first financial privacy", "Stored locally on Android device", "Depends on cloud drive", "Depends on calendar sync"],
  ["Custom pivot formulas", "Structured app views + CSV export", "Highly flexible", "Limited"],
];

export default function Compare() {
  return (
    <main className="page">
      <Breadcrumbs items={[{ name: "Compare" }]} />
      <div className="container">
        <div className="section-head">
          <div className="kicker">COMPARE</div>
          <h1>Choose the household money workflow that fits you.</h1>
          <p className="lead">
            Different tools solve different problems. Here is a factual comparison of common household tracking approaches without bank account linking.
          </p>
        </div>
        <div className="comparison">
          <div className="compare-row compare-head">
            <div>Capability</div>
            <div>Smart Bill Manager</div>
            <div>Spreadsheet</div>
            <div>Manual reminders</div>
          </div>
          {rows.map((r) => (
            <div className="compare-row" key={r[0]}>
              {r.map((x, i) => (
                <div key={i}>{x}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="grid-3 compare-notes">
          <div className="card">
            <h3>Use a spreadsheet if…</h3>
            <p>You enjoy maintaining custom formulas on a laptop and don&apos;t need mobile due-date alerts or receipt scanning.</p>
          </div>
          <div className="card">
            <h3>Use manual reminders if…</h3>
            <p>Your only goal is remembering two or three monthly dates without tracking totals, receipts or Safe-to-Spend.</p>
          </div>
          <div className="card">
            <h3>Use Smart Bill Manager if…</h3>
            <p>You want bills, subscriptions, cash spending, receipt OCR and warranties working together privately on Android.</p>
          </div>
        </div>
        <div className="conversion-panel">
          <h2>Test the workflow in your browser or on Android</h2>
          <div className="actions">
            <OpenInAppCta route="bills" placement="compare-open" label="Open Smart Bill Manager" />
            <PlayCta placement="compare-play" label="Download on Google Play" secondary />
          </div>
        </div>
        <p className="related">
          <Link href="/offline-budget-app/">Offline budget app</Link> ·{" "}
          <Link href="/features/">All features</Link> ·{" "}
          <Link href="/tools/bill-calculator/">Bill Calculator</Link> ·{" "}
          <Link href="/tools/subscription-cost-calculator/">Subscription Cost Calculator</Link> ·{" "}
          <Link href="/faq/">FAQ</Link>
        </p>
      </div>
    </main>
  );
}
