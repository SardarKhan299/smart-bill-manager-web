import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";

export const metadata = {
  title: "Download Smart Bill Manager",
  description: "Download Smart Bill Manager for Android from Google Play or jump straight into bills, receipt scanner and warranties.",
  alternates: { canonical: "/download/" },
};

export default function Page() {
  return (
    <main className="page">
      <Breadcrumbs items={[{ name: "Download" }]} />
      <div className="container prose">
        <div className="kicker">ANDROID APP</div>
        <h1>Get a clearer view of your household money.</h1>
        <p className="lead">Track bills, subscriptions, expenses and upcoming financial commitments from your Android phone.</p>
        <div className="conversion-panel">
          <h2>Start with the core household workflow</h2>
          <ul>
            <li>Record bills and recurring commitments.</li>
            <li>Scan receipts offline with on-device OCR.</li>
            <li>Track subscriptions and everyday cash expenses.</li>
            <li>Review Safe-to-Spend information and analytics.</li>
            <li>Organise receipts, purchases and warranties privately.</li>
          </ul>
          <p style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <PlayCta placement="download-primary" label="Download on Google Play" />
            <OpenInAppCta route="bills" placement="download-open-app" label="Already installed? Open App" secondary />
          </p>
        </div>
        <h2>Jump straight to a screen in the app</h2>
        <p className="related">
          <Link href="/scan/">Scan Receipt</Link> · <Link href="/bills/">Upcoming Bills</Link> · <Link href="/warranties/">Warranty Vault</Link> · <Link href="/cash-log/">Daily Cash Log</Link> · <Link href="/analytics/">Analytics</Link> · <Link href="/pro/">Pro 7-Day Trial</Link>
        </p>
        <h2>Before you install</h2>
        <p>Smart Bill Manager is designed around local-first household financial management. Core records do not require an account or cloud database. The app may use third-party services for analytics, crash reporting, advertising and subscription management.</p>
        <h2>Want to understand the workflow first?</h2>
        <p>Explore <Link href="/how-it-works/">how it works</Link>, <Link href="/features/">all features</Link>, <Link href="/pricing/">pricing</Link> or the <Link href="/faq/">FAQ</Link>.</p>
        <p className="related"><Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link> · <Link href="/support/">Support</Link></p>
      </div>
    </main>
  );
}
