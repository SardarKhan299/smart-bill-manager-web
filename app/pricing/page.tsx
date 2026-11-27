import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";

export const metadata = {
  title: "Pricing — Free Core Bill Tracking & Optional Pro Plans",
  description:
    "Smart Bill Manager is free to download on Android with unlimited core bill tracking, plus an optional Pro 7-day free trial or Lifetime unlock on Google Play.",
  keywords: [
    "smart bill manager pricing",
    "free bill tracker android",
    "offline budget app lifetime purchase",
    "smart bill manager pro trial",
  ],
  alternates: { canonical: "/pricing/" },
  openGraph: {
    title: "Pricing | Smart Bill Manager",
    description:
      "Start free with unlimited bill tracking, cash log and starter offline OCR scans, or unlock Pro on Google Play.",
    url: "/pricing/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Smart Bill Manager",
    description:
      "Free core household bill tracking on Android with optional Pro subscription or Lifetime unlock.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <main className="page">
      <Breadcrumbs items={[{ name: "Pricing" }]} />
      <div className="container">
        <div className="section-head">
          <div className="kicker">PRICING</div>
          <h1>Start free with the core features you need.</h1>
          <p className="lead">
            Smart Bill Manager uses an ethical freemium model on Google Play. Core bill tracking stays free; exact regional pricing and current offers are shown directly in Google Play.
          </p>
        </div>
        <div className="grid-3">
          <div className="card">
            <h3>Free Tier</h3>
            <p>
              Unlimited recurring bill reminders, daily cash expense logging, Safe-to-Spend planning, warranty vault basics, and starter on-device receipt OCR scans (supported by ads).
            </p>
          </div>
          <div className="card">
            <h3>Pro (Monthly or Annual)</h3>
            <p>
              Ad-free experience, unlimited on-device AI receipt scanning, extended multi-horizon analytics, PDF/CSV statement exports, and full power features — includes a 7-day free trial where eligible on Google Play.
            </p>
          </div>
          <div className="card">
            <h3>Lifetime Unlock</h3>
            <p>
              Prefer a one-time purchase instead of a recurring subscription? Unlock Pro permanently with the one-time Lifetime option inside the Android app via Google Play Billing.
            </p>
          </div>
        </div>
        <div className="conversion-panel">
          <h2>Try Smart Bill Manager free or start your 7-day Pro trial</h2>
          <p>All purchases, trials, restores and cancellations are handled securely through your Google Play account.</p>
          <div className="actions">
            <OpenInAppCta route="pro" placement="pricing-open-pro" label="Start 7-Day Free Trial in App" />
            <PlayCta placement="pricing-play" label="Download Free on Google Play" secondary />
          </div>
        </div>
        <p className="related">
          <Link href="/features/">All features</Link> ·{" "}
          <Link href="/tools/">Free web calculators</Link> ·{" "}
          <Link href="/faq/">FAQ</Link> ·{" "}
          <Link href="/support/">Billing &amp; restore support</Link>
        </p>
      </div>
    </main>
  );
}
