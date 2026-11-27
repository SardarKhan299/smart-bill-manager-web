"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../../conversion-cta";
import { SeoFaqJsonLd } from "../../seo-faq";
import {
  SUPPORTED_CURRENCIES,
  calculateSafeToSpend,
  formatMoney,
} from "../calculator-math.mjs";

const DEFAULT_BALANCE = "4000";
const DEFAULT_COMMITTED = "1800";
const DEFAULT_PLANNED = "500";

const faq = [
  {
    question: "Is Safe-to-Spend the same as my bank balance?",
    answer:
      "No. Your bank balance often includes money already spoken for by rent, utilities and subscriptions due later in the month. Safe-to-Spend subtracts the commitments and planned essentials you enter to estimate true discretionary room.",
  },
  {
    question: "Why does Safe-to-Spend display zero when commitments exceed my balance?",
    answer:
      "When upcoming commitments and planned essentials exceed your entered balance, the discretionary amount available to spend is zero, and the calculator displays the exact shortfall right underneath.",
  },
  {
    question: "Does this calculator connect to my bank account?",
    answer:
      "No. It runs privately in your browser using only the figures you type, and never transmits financial inputs to servers or analytics.",
  },
];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [balance, setBalance] = useState(DEFAULT_BALANCE);
  const [committed, setCommitted] = useState(DEFAULT_COMMITTED);
  const [planned, setPlanned] = useState(DEFAULT_PLANNED);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(
    () => calculateSafeToSpend(balance, committed, planned),
    [balance, committed, planned]
  );
  const format = (value: number) => formatMoney(value, currency);

  const reset = () => {
    setBalance(DEFAULT_BALANCE);
    setCommitted(DEFAULT_COMMITTED);
    setPlanned(DEFAULT_PLANNED);
    setCopied(false);
  };

  const share = async () => {
    const text = `Safe-to-Spend Calculator: estimated discretionary planning amount ${format(summary.safeToSpend)}.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Safe-to-Spend Calculator", text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: "Tools", href: "/tools/" }, { name: "Safe-to-Spend Calculator" }]} />
      <CalculatorJsonLd
        name="Safe-to-Spend Calculator"
        path="/tools/safe-to-spend-calculator/"
        description="Free browser-based Safe-to-Spend calculator for estimating discretionary funds after upcoming bills and planned essentials."
      />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOL</div>
        <h1>Safe-to-Spend Calculator</h1>
        <p className="lead">
          Estimate how much money is genuinely free to spend after subtracting upcoming bills, subscriptions and planned essentials from your current balance.
        </p>
        <div className="seo-callout">
          <strong>Transparent formula</strong>
          <p>
            <code>Estimated Safe-to-Spend = max(0, available balance − committed bills − planned essentials)</code>. If commitments exceed your balance, Safe-to-Spend shows zero and highlights the shortfall separately. Always treat your actual bank account and bill due dates as the final source of truth.
          </p>
        </div>

        <h2>Enter your numbers</h2>
        <label>
          Display currency
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {SUPPORTED_CURRENCIES.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
        <label>
          Current available balance
          <input
            inputMode="decimal"
            placeholder="e.g. 4000"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
          <span className="input-hint">Cash or checking balance currently available for this period.</span>
        </label>
        <label>
          Upcoming committed bills &amp; subscriptions
          <input
            inputMode="decimal"
            placeholder="e.g. 1800"
            value={committed}
            onChange={(e) => setCommitted(e.target.value)}
          />
          <span className="input-hint">Unpaid rent, utilities, subscriptions, and debt minimums due before next payday.</span>
        </label>
        <label>
          Planned essentials &amp; savings buffer
          <input
            inputMode="decimal"
            placeholder="e.g. 500"
            value={planned}
            onChange={(e) => setPlanned(e.target.value)}
          />
          <span className="input-hint">Groceries, fuel, transport, and any savings commitment you want protected.</span>
        </label>

        <div className="tool-controls">
          <button className="btn btn-secondary" type="button" onClick={reset}>
            Reset example
          </button>
        </div>

        <div className="seo-callout" role="region" aria-live="polite" aria-label="Safe-to-Spend calculation result">
          <strong>Estimated Safe-to-Spend: {format(summary.safeToSpend)}</strong>
          {summary.shortfall > 0 && (
            <p className="negative-value">
              Your entered commitments and planned essentials exceed the current balance by {format(summary.shortfall)}.
            </p>
          )}
          {summary.hasNegativeInput && (
            <p className="input-hint">
              Note: negative values were entered. Use positive amounts for standard bills and planned essentials.
            </p>
          )}
          <p>Keep your actual account balance and scheduled obligations as the source of truth.</p>
          <div className="tool-actions">
            <button className="btn btn-secondary" type="button" onClick={share}>
              {copied ? "Result copied" : "Share result"}
            </button>
          </div>
          <div className="actions">
            <OpenInAppCta
              route="bills"
              placement="safe-to-spend-calculator-result-open"
              label="Track Safe-to-Spend in App"
            />
            <PlayCta placement="safe-to-spend-calculator-result-play" label="Download on Google Play" secondary />
          </div>
        </div>

        <h2>When this calculator helps most</h2>
        <p>
          Checking your bank balance mid-month can create a false sense of comfort when rent, electricity or annual renewals have not cleared yet. Subtracting upcoming bills first shows what is actually safe for discretionary purchases.
        </p>

        <h2>Safe-to-Spend calculator FAQs</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <h2>Related tools &amp; guides</h2>
        <p className="related">
          <Link href="/safe-to-spend/">Safe-to-Spend planning</Link> ·{" "}
          <Link href="/tools/bill-calculator/">Bill Calculator</Link> ·{" "}
          <Link href="/tools/budget-calculator/">Budget Calculator</Link> ·{" "}
          <Link href="/tools/subscription-cost-calculator/">Subscription Cost Calculator</Link> ·{" "}
          <Link href="/offline-budget-app/">Offline Budget App</Link> ·{" "}
          <Link href="/blog/safe-to-spend-vs-bank-balance/">Safe-to-Spend vs bank balance</Link>
        </p>
      </div>
    </main>
  );
}
