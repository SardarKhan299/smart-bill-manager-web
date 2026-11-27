import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { PlayCta } from "../conversion-cta";

export const metadata = {
  title: "Privacy Policy",
  description: "Smart Bill Manager Privacy Policy: local-first Android storage, on-device receipt OCR, third-party SDK disclosures (Google Play, AdMob, Firebase, RevenueCat) and website privacy.",
  keywords: ["smart bill manager privacy policy", "offline budget app privacy", "local finance app data policy"],
  alternates: { canonical: "/privacy/" },
  openGraph: {
    title: "Privacy Policy | Smart Bill Manager",
    description: "How Smart Bill Manager protects your household bills, receipts and warranties with local-first Android storage and transparent SDK disclosures.",
    url: "/privacy/",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Smart Bill Manager",
    description: "How Smart Bill Manager protects your household bills, receipts and warranties with local-first Android storage.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <main className="page seo-page">
      <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
      <div className="container prose">
        <div className="kicker">PRIVACY POLICY</div>
        <h1>Your financial records stay on your device.</h1>
        <p className="lead">
          <strong>Effective Date:</strong> August 29, 2026 · <strong>Last Updated:</strong> November 27, 2026 · <strong>Developer:</strong> Sardar Khan
        </p>
        <p>
          Smart Bill Manager is designed as an offline-first Android application for managing household bills, subscriptions, daily cash expenses, debts, receipts and warranties. This Privacy Policy explains how both the <strong>Android app</strong> and this <strong>website</strong> handle information.
        </p>

        <h2>1. Android App: Local-First Financial Data</h2>
        <p>
          Financial records you enter into Smart Bill Manager — including bills, amounts, due dates, subscriptions, daily cash log entries, debts, savings goals, receipt images and warranty notes — are stored locally on your Android device in an on-device SQLite (Room) database.
        </p>
        <ul>
          <li>We do <strong>not</strong> require an account or bank login.</li>
          <li>We do <strong>not</strong> upload, sell or sync your bills, receipts or financial records to external cloud servers.</li>
          <li>Receipt text extraction (OCR) runs on-device so receipt photos do not need to leave your phone.</li>
          <li>Optional biometric/PIN app lock and encrypted local backup export help protect records stored on your device.</li>
        </ul>

        <h2>2. Android App: Third-Party SDKs</h2>
        <p>
          To keep the core app free, maintain stability and verify optional Pro subscriptions, the Android app integrates the following third-party services:
        </p>
        <ul>
          <li><strong>Google Play Services &amp; Google Play Billing:</strong> Processes in-app purchases, subscriptions and free trials securely through Google Play.</li>
          <li><strong>RevenueCat:</strong> Validates active Pro subscription entitlements with Google Play Billing.</li>
          <li><strong>Google AdMob:</strong> Displays advertisements on the free tier (interstitial, app open and voluntary rewarded video ads) so free users can unlock bonus features without paying. Pro subscribers do not see ads.</li>
          <li><strong>Firebase Analytics &amp; Firebase Crashlytics:</strong> Collects anonymous app-usage telemetry and crash diagnostics to fix bugs and improve reliability. Financial record contents, bill amounts and receipt text are not sent to analytics.</li>
        </ul>

        <h2>3. Android Device Permissions</h2>
        <ul>
          <li><code>INTERNET</code>: Used for AdMob ads on the free tier, anonymous Firebase diagnostics and Google Play / RevenueCat subscription checks.</li>
          <li><code>POST_NOTIFICATIONS</code>: Used strictly to deliver local due-date reminders for upcoming bills and expiring warranties.</li>
          <li><code>BILLING</code>: Used for optional Google Play in-app purchases and Pro subscriptions.</li>
          <li>Camera / Photos (when granted): Used only when you choose to scan or attach a receipt or warranty image locally on your device.</li>
        </ul>

        <h2>4. Website Data Processing</h2>
        <p>
          This website (<code>smart-bill-manager-web.sardar-khan299.workers.dev</code>) is served as a static site on Cloudflare Workers. Our free web calculators (Bill Calculator, Budget Calculator and Safe-to-Spend Calculator) run directly in your browser and do not transmit your entered financial numbers to our servers. Cloudflare may process standard web request metadata (such as IP address and user agent) for security and content delivery.
        </p>

        <h2>5. Data Retention &amp; Deletion</h2>
        <p>
          Because your Android app records live locally on your phone, you control them directly. You can edit or delete any bill, receipt, cash entry or warranty inside the app at any time, clear app data in Android Settings, or uninstall the app to remove local data from your device.
        </p>

        <h2>6. Children&apos;s Privacy</h2>
        <p>
          Smart Bill Manager is a general-audience household utility and does not knowingly collect personal information from children under 13.
        </p>

        <h2>7. Contact</h2>
        <p>
          For privacy questions or data inquiries, contact the developer directly at{" "}
          <a href="mailto:sardarkhan.dev@gmail.com">sardarkhan.dev@gmail.com</a>.
        </p>

        <div className="actions">
          <PlayCta placement="privacy-play" label="Download on Google Play" />
          <Link className="btn btn-secondary" href="/support/">Contact Support</Link>
        </div>
      </div>
    </main>
  );
}
