import type { Metadata } from "next";
import Link from "next/link";
import { DesktopQrBridge, OpenInAppCta, PlayCta } from "./conversion-cta";

export const metadata: Metadata = {
  title: "Smart Bill Manager – Offline Bill Tracker, Receipt Scanner & Budget App",
  description:
    "Smart Bill Manager is a private, offline-first Android app for tracking household bills, subscriptions, daily cash expenses, receipts, warranties and Safe-to-Spend.",
  keywords: [
    "smart bill manager",
    "offline bill tracker app",
    "offline budget app android",
    "bill reminder and receipt scanner",
    "safe to spend app",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Smart Bill Manager – Offline Bill Tracker, Receipt Scanner & Budget App",
    description:
      "Track bills, subscriptions, daily cash expenses, receipts and warranties privately on Android — no bank login required.",
    url: "/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager — private household money assistant" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Bill Manager – Offline Bill Tracker, Receipt Scanner & Budget App",
    description:
      "Know what you owe and what you can safely spend with a private, local-first Android finance app.",
    images: ["/og-image.svg"],
  },
};

const features = [
  ["01", "Bills & reminders", "Keep recurring bills, due dates, calendar alerts and home-screen widgets organised in one place."],
  ["02", "Subscriptions", "See monthly and annualized subscription costs and spot recorded price hikes before renewals."],
  ["03", "Everyday cash log", "Record daily cash expenses in seconds and build no-spend streaks without bank syncing."],
  ["04", "Safe-to-Spend", "Subtract upcoming committed bills from your balance to see what is genuinely free to spend."],
  ["05", "On-device AI OCR", "Scan paper receipts locally on your phone to extract merchant, date and total privately."],
  ["06", "Warranty vault & debts", "Keep purchase receipts, warranty expiry alerts, personal IOUs and split bills organised offline."],
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">PRIVATE HOUSEHOLD MONEY ASSISTANT</span>
            <h1>Know what you owe. Know what you can safely spend.</h1>
            <p className="lead">
              Smart Bill Manager is an offline-first bill tracker, subscription tracker, receipt scanner, warranty vault and budgeting app for Android. Keep upcoming commitments in one private place.
            </p>
            <div className="actions">
              <PlayCta placement="homepage-hero-play" />
              <OpenInAppCta route="bills" placement="homepage-hero-open" label="Open in App" secondary />
            </div>
            <div className="conversion-trust">
              <strong>Private, local-first design.</strong> No bank login or cloud account is required for core household record-keeping.
            </div>
            <DesktopQrBridge
              heading="Browsing on desktop? Scan with your Android camera"
              body="Open Smart Bill Manager straight in Google Play on your phone — 100% offline bill reminders, receipt OCR and Safe-to-Spend."
            />
          </div>
          <div className="phone">
            <div className="phone-screen">
              <div className="fake-top">
                <span>Smart Bill Manager</span>
                <span>Today</span>
              </div>
              <div className="spend-card">
                <div className="spend-label">Safe to spend</div>
                <div className="spend-value">£1,240</div>
                <span className="pill">After commitments</span>
              </div>
              <div className="fake-list">
                <div className="fake-row">
                  <span>Electricity</span>
                  <b>£86</b>
                </div>
                <div className="fake-row">
                  <span>Subscriptions</span>
                  <b>£42</b>
                </div>
                <div className="fake-row">
                  <span>Groceries</span>
                  <b>£180</b>
                </div>
                <div className="fake-row">
                  <span>Upcoming</span>
                  <b>£315</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <div className="kicker">BILLS, SUBSCRIPTIONS &amp; EXPENSES</div>
            <h2>One app for everyday household money management.</h2>
            <p className="lead">
              Track household bills, recurring subscriptions, everyday cash expenses and budgets while keeping upcoming commitments visible.
            </p>
          </div>
          <div className="grid-3">
            {features.slice(0, 3).map(([n, t, d]) => (
              <div className="card" key={n}>
                <div className="feature-icon">{n}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <p className="related">
            <Link href="/offline-budget-app/">Offline budget app</Link> ·{" "}
            <Link href="/bill-reminder-app/">Bill reminder app</Link> ·{" "}
            <Link href="/daily-cash-tracker/">Daily cash tracker</Link> ·{" "}
            <Link href="/subscription-tracker/">Subscription tracker</Link> ·{" "}
            <Link href="/debt-tracker/">Debt tracker</Link> ·{" "}
            <Link href="/safe-to-spend/">Safe-to-Spend</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <div className="kicker">SAFE-TO-SPEND</div>
            <h2>Know what you can safely spend.</h2>
            <p className="lead">
              Instead of looking only at today&apos;s bank balance, Smart Bill Manager subtracts upcoming committed bills so you can make clearer day-to-day spending decisions.
            </p>
            <div className="checks">
              <div className="check">✓ <span>Account for upcoming bills and subscriptions before spending</span></div>
              <div className="check">✓ <span>Transparent calculation based on your own offline records</span></div>
              <div className="check">✓ <span>Try free browser calculators before installing</span></div>
            </div>
            <div className="actions">
              <Link className="btn btn-primary" href="/tools/safe-to-spend-calculator/">
                Try Safe-to-Spend Calculator
              </Link>
              <Link className="btn btn-secondary" href="/tools/subscription-cost-calculator/">
                Subscription Cost Calculator
              </Link>
            </div>
          </div>
          <div className="card">
            <div className="feature-icon">£</div>
            <h3>One question, answered clearly</h3>
            <p>
              &ldquo;How much can I safely spend?&rdquo; becomes a transparent household-finance check instead of a guess based only on your current balance.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <div className="kicker">STAY AHEAD</div>
            <h2>Receipts, warranties and forward planning in one vault.</h2>
            <p className="lead">
              Scan paper receipts offline, store proof-of-purchase warranties, and spot upcoming cash-flow pressure points early.
            </p>
          </div>
          <div className="grid-3">
            {features.slice(3).map(([n, t, d]) => (
              <div className="card" key={n}>
                <div className="feature-icon">{n}</div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <p className="related">
            <Link href="/offline-receipt-scanner/">Offline receipt scanner</Link> ·{" "}
            <Link href="/warranty-tracker/">Warranty vault</Link> ·{" "}
            <Link href="/tools/bill-calculator/">Bill Calculator</Link> ·{" "}
            <Link href="/tools/budget-calculator/">Budget Calculator</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container section-head">
          <div className="kicker">LEARN</div>
          <h2>Practical guides for managing household money.</h2>
          <p className="lead">
            Learn how to track monthly bills, audit subscriptions, build an offline household budget, and organise receipts and warranties.
          </p>
          <p className="related">
            <Link href="/blog/household-bill-checklist/">Bill checklist</Link> ·{" "}
            <Link href="/blog/subscription-audit-guide/">Subscription audit</Link> ·{" "}
            <Link href="/blog/budget-vs-expense-tracker/">Budget vs expense tracker</Link> ·{" "}
            <Link href="/blog/receipt-retention-warranty-guide/">Receipt &amp; warranty guide</Link>
          </p>
          <p>
            <Link className="btn btn-secondary" href="/blog/">
              Read the Smart Bill Manager blog
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dark cta">
            <div className="kicker">SMART BILL MANAGER</div>
            <h2>Your household finances. One clear view.</h2>
            <p className="lead">
              Track bills, subscriptions, cash expenses, receipts and warranties with a private Android money assistant.
            </p>
            <div className="actions">
              <PlayCta placement="homepage-final-play" label="Download on Google Play" secondary />
              <OpenInAppCta route="scan" placement="homepage-final-scan" label="Scan a Receipt in App" />
            </div>
            <p className="cta-note">Android app · Google Play · Free core features with optional Pro 7-day trial.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
