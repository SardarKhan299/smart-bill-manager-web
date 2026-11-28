import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { DesktopQrBridge, OpenInAppCta, PlayCta } from "../conversion-cta";

export const metadata = {
  title: "Download Smart Bill Manager for Android",
  description:
    "Download Smart Bill Manager for Android on Google Play, or jump directly into bills, on-device receipt scanner, daily cash log and warranty vault.",
  keywords: [
    "download smart bill manager",
    "smart bill manager android google play",
    "offline bill tracker download",
  ],
  alternates: { canonical: "/download/" },
  openGraph: {
    title: "Download Smart Bill Manager for Android",
    description:
      "Install Smart Bill Manager from Google Play for private, offline-first bill reminders, receipt scanning and Safe-to-Spend planning.",
    url: "/download/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Download Smart Bill Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download Smart Bill Manager for Android",
    description:
      "Private household bill tracker, receipt scanner and warranty vault on Google Play.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <main className="page">
      <Breadcrumbs items={[{ name: "Download" }]} />
      <div className="container prose">
        <div className="kicker">ANDROID APP</div>
        <h1>Get a clearer view of your household money.</h1>
        <p className="lead">
          Track bills, subscriptions, daily cash expenses, receipts and warranties privately on your Android phone.
        </p>
        <div className="conversion-panel">
          <h2>Start with the core household workflow</h2>
          <ul>
            <li>Record recurring bills and receive local due-date reminders.</li>
            <li>Scan paper receipts offline with on-device OCR.</li>
            <li>Track subscriptions, annualized drain and everyday cash expenses.</li>
            <li>Review Safe-to-Spend planning and category analytics.</li>
            <li>Organise receipts, purchases and warranty expiry dates privately.</li>
          </ul>
          <div className="actions">
            <PlayCta placement="download-primary" label="Download on Google Play" />
            <OpenInAppCta route="bills" placement="download-open-app" label="Already installed? Open App" secondary />
          </div>
        </div>
        <DesktopQrBridge />
        <h2>Jump straight to a screen in the app</h2>
        <p className="related">
          <Link href="/scan/">Scan Receipt</Link> · <Link href="/bills/">Upcoming Bills</Link> ·{" "}
          <Link href="/warranties/">Warranty Vault</Link> · <Link href="/cash-log/">Daily Cash Log</Link> ·{" "}
          <Link href="/analytics/">Analytics</Link> · <Link href="/pro/">Pro 7-Day Trial</Link>
        </p>
        <h2>Before you install</h2>
        <p>
          Smart Bill Manager is designed around local-first household financial management. Core records stay on your device without requiring an account or bank login. See our <Link href="/privacy/">Privacy Policy</Link> for full SDK disclosures.
        </p>
        <p className="related">
          <Link href="/how-it-works/">How it works</Link> · <Link href="/features/">All features</Link> ·{" "}
          <Link href="/pricing/">Pricing</Link> · <Link href="/tools/">Free calculators</Link> ·{" "}
          <Link href="/faq/">FAQ</Link> · <Link href="/support/">Support</Link>
        </p>
      </div>
    </main>
  );
}
