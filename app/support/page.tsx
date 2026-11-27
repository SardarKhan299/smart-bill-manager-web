import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";

export const metadata = {
  title: "Support & Help Centre",
  description: "Get support for Smart Bill Manager on Android. Contact the developer, troubleshoot reminders, restore Pro subscriptions, or learn how offline backups work.",
  keywords: ["smart bill manager support", "restore pro subscription android", "bill reminder notifications help", "smart bill manager contact"],
  alternates: { canonical: "/support/" },
  openGraph: {
    title: "Support & Help Centre | Smart Bill Manager",
    description: "Direct developer support and troubleshooting help for Smart Bill Manager on Android.",
    url: "/support/",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Support" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Support & Help Centre | Smart Bill Manager",
    description: "Direct developer support and troubleshooting help for Smart Bill Manager on Android.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <main className="page seo-page">
      <Breadcrumbs items={[{ name: "Support" }]} />
      <div className="container prose">
        <div className="kicker">SUPPORT</div>
        <h1>Smart Bill Manager support.</h1>
        <p className="lead">
          Need help with bill reminders, offline receipt scanning, warranties, encrypted backups or a Pro subscription? Contact the developer directly or check the quick fixes below.
        </p>

        <div className="conversion-panel">
          <h2>Contact Developer Support</h2>
          <p>
            Email:{" "}
            <a href="mailto:sardarkhan.dev@gmail.com?subject=Smart%20Bill%20Manager%20Support">
              <strong>sardarkhan.dev@gmail.com</strong>
            </a>
          </p>
          <p>When emailing about a bug or billing issue, please include:</p>
          <ul>
            <li>Your Smart Bill Manager app version (visible in Settings → About)</li>
            <li>Your Android OS version and phone model</li>
            <li>A short description of what happened (and screenshots if helpful)</li>
          </ul>
          <div className="actions">
            <a
              className="btn btn-primary"
              href="mailto:sardarkhan.dev@gmail.com?subject=Smart%20Bill%20Manager%20Support"
            >
              Email Support
            </a>
            <OpenInAppCta route="bills" placement="support-open-app" label="Open Smart Bill Manager" secondary />
          </div>
        </div>

        <h2>Quick Troubleshooting</h2>
        <ul>
          <li><strong>Restore a Pro purchase or free trial:</strong> Open Smart Bill Manager → Settings → Upgrade to Pro → tap <em>Restore Purchases</em> while signed into the same Google Play account.</li>
          <li><strong>Cancel or manage a subscription:</strong> Open Google Play Store → Profile icon → <em>Payments &amp; subscriptions</em> → <em>Subscriptions</em> → Smart Bill Manager.</li>
          <li><strong>Bill reminder notifications not appearing:</strong> In Android Settings → Apps → Smart Bill Manager → enable <em>Notifications</em> and allow unrestricted/optimized background reminders.</li>
          <li><strong>Moving data to a new Android phone:</strong> Export an encrypted local backup in Smart Bill Manager Settings before switching devices, then import it on your new phone.</li>
        </ul>

        <div className="actions">
          <PlayCta placement="support-play" label="Download / Update on Google Play" />
          <Link className="btn btn-secondary" href="/faq/">Read FAQ</Link>
        </div>

        <p className="related">
          <Link href="/faq/">FAQ</Link> · <Link href="/privacy/">Privacy Policy</Link> · <Link href="/how-it-works/">How it works</Link> · <Link href="/pricing/">Pricing</Link>
        </p>
      </div>
    </main>
  );
}
