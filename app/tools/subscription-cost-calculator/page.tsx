"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../../conversion-cta";
import { SeoFaqJsonLd } from "../../seo-faq";
import {
  SUPPORTED_CURRENCIES,
  SUBSCRIPTION_FREQUENCIES,
  calculateSubscriptionSummary,
  formatMoney,
} from "../calculator-math.mjs";

const DEFAULT_INCOME = "4000";
const DEFAULT_SUBSCRIPTIONS = [
  { name: "Streaming Video", amount: "15.99", frequency: "monthly" },
  { name: "Music & Cloud Storage", amount: "11.99", frequency: "monthly" },
  { name: "Annual Membership", amount: "120", frequency: "yearly" },
];

const faq = [
  {
    question: "How is annualized subscription cost calculated?",
    answer:
      "Each recurring charge is multiplied by its billing cycles per year: weekly × 52, bi-weekly × 26, monthly × 12, quarterly × 4, and yearly × 1. Monthly equivalent equals the annual cost divided by 12.",
  },
  {
    question: "Does this subscription calculator connect to my bank or email?",
    answer:
      "No. Everything runs privately inside your browser from the amounts you enter. Nothing is uploaded to servers or analytics.",
  },
  {
    question: "How can I get renewal reminders before a subscription auto-renews?",
    answer:
      "Record your recurring subscriptions in Smart Bill Manager on Android to get offline cancel-before reminders, annualized drain summaries, and price-hike tracking on your device.",
  },
];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [monthlyIncome, setMonthlyIncome] = useState(DEFAULT_INCOME);
  const [subscriptions, setSubscriptions] = useState(DEFAULT_SUBSCRIPTIONS);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(
    () => calculateSubscriptionSummary(subscriptions, monthlyIncome),
    [subscriptions, monthlyIncome]
  );
  const format = (value: number) => formatMoney(value, currency);

  const addSubscription = () =>
    setSubscriptions([...subscriptions, { name: "", amount: "", frequency: "monthly" }]);
  const removeSubscription = (index: number) =>
    setSubscriptions(
      subscriptions.length > 1
        ? subscriptions.filter((_, i) => i !== index)
        : [{ name: "", amount: "", frequency: "monthly" }]
    );
  const reset = () => {
    setMonthlyIncome(DEFAULT_INCOME);
    setSubscriptions(DEFAULT_SUBSCRIPTIONS);
    setCopied(false);
  };

  const share = async () => {
    const text = `Subscription Cost Calculator: ${format(summary.monthlyTotal)}/month (${format(summary.annualTotal)}/year) across listed subscriptions.`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Subscription Cost Calculator",
          text,
          url: window.location.href,
        });
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
      <Breadcrumbs
        items={[{ name: "Tools", href: "/tools/" }, { name: "Subscription Cost Calculator" }]}
      />
      <CalculatorJsonLd
        name="Subscription Cost Calculator"
        path="/tools/subscription-cost-calculator/"
        description="Free browser-based subscription cost calculator for estimating monthly equivalent, annualized, and 5-year recurring subscription spend."
      />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOL</div>
        <h1>Subscription Cost Calculator</h1>
        <p className="lead">
          See what your weekly, monthly, quarterly and yearly subscriptions really cost per month, per year, and over 5 years — privately in your browser.
        </p>
        <div className="seo-callout">
          <strong>Annualized formula</strong>
          <p>
            <code>Annual cost = amount × cycles per year</code> (weekly × 52, bi-weekly × 26, monthly × 12, quarterly × 4, yearly × 1), and <code>Monthly equivalent = annual cost ÷ 12</code>. No bank login, no email scraping, and zero data sent to servers.
          </p>
        </div>

        <h2>Audit your recurring subscriptions</h2>
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
          Optional monthly take-home income
          <input
            inputMode="decimal"
            placeholder="e.g. 4000 (leave blank to skip income %)"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
          />
          <span className="input-hint">
            Used only to show what percentage of monthly income goes to subscriptions.
          </span>
        </label>

        {subscriptions.map((sub, i) => (
          <div className="tool-row-sub" key={i}>
            <input
              aria-label={`Subscription ${i + 1} name`}
              placeholder="Service name (e.g. Streaming, Gym)"
              value={sub.name}
              onChange={(e) => {
                const next = [...subscriptions];
                next[i] = { ...next[i], name: e.target.value };
                setSubscriptions(next);
              }}
            />
            <input
              inputMode="decimal"
              aria-label={`Subscription ${i + 1} amount`}
              placeholder="0.00"
              value={sub.amount}
              onChange={(e) => {
                const next = [...subscriptions];
                next[i] = { ...next[i], amount: e.target.value };
                setSubscriptions(next);
              }}
            />
            <select
              aria-label={`Subscription ${i + 1} billing frequency`}
              value={sub.frequency}
              onChange={(e) => {
                const next = [...subscriptions];
                next[i] = { ...next[i], frequency: e.target.value };
                setSubscriptions(next);
              }}
            >
              {SUBSCRIPTION_FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
            <button
              className="btn-remove"
              type="button"
              aria-label={`Remove subscription ${i + 1}`}
              onClick={() => removeSubscription(i)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="tool-controls">
          <button className="btn btn-secondary" type="button" onClick={addSubscription}>
            Add subscription
          </button>
          <button className="btn btn-secondary" type="button" onClick={reset}>
            Reset example
          </button>
        </div>

        <div
          className="seo-callout"
          role="region"
          aria-live="polite"
          aria-label="Subscription cost calculation result"
        >
          <strong>Monthly equivalent: {format(summary.monthlyTotal)} / month</strong>
          <p>
            Annualized subscription drain: <strong>{format(summary.annualTotal)} / year</strong>
          </p>
          <p>
            5-year cost at current prices: <strong>{format(summary.fiveYearTotal)}</strong>
          </p>
          {summary.incomeSharePercent !== null && (
            <p>
              Share of monthly income: <strong>{summary.incomeSharePercent}%</strong>
              {summary.remainingAfterSubscriptions !== null && (
                <>
                  {" "}· Remaining after subscriptions:{" "}
                  <strong className={summary.remainingAfterSubscriptions < 0 ? "negative-value" : ""}>
                    {format(summary.remainingAfterSubscriptions)}
                  </strong>
                </>
              )}
            </p>
          )}
          {summary.remainingAfterSubscriptions !== null && summary.remainingAfterSubscriptions < 0 && (
            <p className="negative-value">
              Your listed subscriptions exceed your monthly income by{" "}
              {format(Math.abs(summary.remainingAfterSubscriptions))}.
            </p>
          )}
          {summary.hasNegativeInput && (
            <p className="input-hint">
              Note: negative amounts were entered and reduce the calculated subscription total.
            </p>
          )}
          <div className="tool-actions">
            <button className="btn btn-secondary" type="button" onClick={share}>
              {copied ? "Result copied" : "Share result"}
            </button>
          </div>
          <div className="actions">
            <OpenInAppCta
              route="subscriptions"
              placement="subscription-calculator-result-open"
              label="Track Subscriptions in App"
            />
            <PlayCta
              placement="subscription-calculator-result-play"
              label="Download on Google Play"
              secondary
            />
          </div>
        </div>

        <h2>How to run a quick subscription audit</h2>
        <ol>
          <li>List every recurring streaming service, app membership, cloud plan, gym fee and annual software renewal.</li>
          <li>Select the actual billing cycle for each item so yearly and quarterly charges are converted into a true monthly equivalent.</li>
          <li>Cancel services you no longer use, and save the rest in Smart Bill Manager so you get local reminders before renewal dates.</li>
        </ol>

        <h2>Subscription cost calculator FAQs</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <h2>Related tools &amp; guides</h2>
        <p className="related">
          <Link href="/subscription-tracker/">Subscription Tracker</Link> ·{" "}
          <Link href="/tools/bill-calculator/">Bill Calculator</Link> ·{" "}
          <Link href="/tools/budget-calculator/">Budget Calculator</Link> ·{" "}
          <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link> ·{" "}
          <Link href="/blog/subscription-audit-guide/">Subscription audit guide</Link> ·{" "}
          <Link href="/blog/how-to-track-subscriptions/">How to track subscriptions</Link>
        </p>
      </div>
    </main>
  );
}
