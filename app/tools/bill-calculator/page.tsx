"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../../conversion-cta";
import { SeoFaqJsonLd } from "../../seo-faq";
import {
  SUPPORTED_CURRENCIES,
  calculateBillSummary,
  formatMoney,
} from "../calculator-math.mjs";

const DEFAULT_INCOME = "4000";
const DEFAULT_BILLS = [
  { name: "Housing", amount: "1500" },
  { name: "Utilities", amount: "250" },
  { name: "Insurance", amount: "150" },
];

const faq = [
  {
    question: "What does this bill calculator calculate?",
    answer:
      "It sums the household bills you list and subtracts that total from the monthly income you enter. Everything runs locally in your browser without connecting to a bank account.",
  },
  {
    question: "What if my bills are higher than my income?",
    answer:
      "The calculator displays the negative remaining amount and exact shortfall clearly so you can adjust planned commitments before bills come due.",
  },
  {
    question: "Can I use different currencies and track due dates automatically?",
    answer:
      "Yes. Choose a display currency above for instant planning, or open Smart Bill Manager on Android to save recurring due dates, receive local reminders, and mark bills paid offline.",
  },
];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [income, setIncome] = useState(DEFAULT_INCOME);
  const [bills, setBills] = useState(DEFAULT_BILLS);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => calculateBillSummary(income, bills), [income, bills]);
  const format = (value: number) => formatMoney(value, currency);

  const addBill = () => setBills([...bills, { name: "", amount: "" }]);
  const removeBill = (index: number) =>
    setBills(bills.length > 1 ? bills.filter((_, i) => i !== index) : [{ name: "", amount: "" }]);
  const reset = () => {
    setIncome(DEFAULT_INCOME);
    setBills(DEFAULT_BILLS);
    setCopied(false);
  };

  const share = async () => {
    const text = `Bill Calculator: ${format(summary.remaining)} remaining after ${format(summary.totalBills)} in listed bills.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Bill Calculator", text, url: window.location.href });
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
      <Breadcrumbs items={[{ name: "Tools", href: "/tools/" }, { name: "Bill Calculator" }]} />
      <CalculatorJsonLd
        name="Bill Calculator"
        path="/tools/bill-calculator/"
        description="Free browser-based monthly household bill calculator for estimating total bills and remaining income."
      />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOL</div>
        <h1>Bill Calculator</h1>
        <p className="lead">
          Estimate how much of your monthly income remains after the household bills you enter — privately in your browser with zero account sign-up.
        </p>
        <div className="seo-callout">
          <strong>Simple planning formula</strong>
          <p>
            <code>Remaining amount = monthly income − total listed bills</code>. Your numbers stay in your browser and are never sent to analytics or servers. This is a planning estimate, not an authorised bank balance or financial advice.
          </p>
        </div>

        <h2>Calculate your monthly bills</h2>
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
          Monthly take-home income
          <input
            inputMode="decimal"
            placeholder="e.g. 4000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <span className="input-hint">Enter your expected net income for the month (numbers and decimals supported).</span>
        </label>

        {bills.map((bill, i) => (
          <div className="tool-row-removable" key={i}>
            <input
              aria-label={`Bill ${i + 1} name`}
              placeholder="Bill name (e.g. Rent, Electricity)"
              value={bill.name}
              onChange={(e) => {
                const next = [...bills];
                next[i] = { ...next[i], name: e.target.value };
                setBills(next);
              }}
            />
            <input
              inputMode="decimal"
              aria-label={`Bill ${i + 1} amount`}
              placeholder="0.00"
              value={bill.amount}
              onChange={(e) => {
                const next = [...bills];
                next[i] = { ...next[i], amount: e.target.value };
                setBills(next);
              }}
            />
            <button
              className="btn-remove"
              type="button"
              aria-label={`Remove bill ${i + 1}`}
              onClick={() => removeBill(i)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="tool-controls">
          <button className="btn btn-secondary" type="button" onClick={addBill}>
            Add another bill
          </button>
          <button className="btn btn-secondary" type="button" onClick={reset}>
            Reset example
          </button>
        </div>

        <div className="seo-callout" role="region" aria-live="polite" aria-label="Bill calculation result">
          <strong>Total listed bills: {format(summary.totalBills)}</strong>
          <p>
            Estimated amount after listed bills:{" "}
            <strong className={summary.remaining < 0 ? "negative-value" : ""}>
              {format(summary.remaining)}
            </strong>
          </p>
          {summary.shortfall > 0 && (
            <p className="negative-value">
              The listed bills exceed the income entered by {format(summary.shortfall)}.
            </p>
          )}
          {summary.hasNegativeInput && (
            <p className="input-hint">
              Note: one or more negative values were entered, which reduces total commitments or income accordingly.
            </p>
          )}
          <div className="tool-actions">
            <button className="btn btn-secondary" type="button" onClick={share}>
              {copied ? "Result copied" : "Share result"}
            </button>
          </div>
          <div className="actions">
            <OpenInAppCta route="bills" placement="bill-calculator-result-open" label="Open Bills in App" />
            <PlayCta placement="bill-calculator-result-play" label="Download on Google Play" secondary />
          </div>
        </div>

        <h2>How to use a monthly bill calculator</h2>
        <ol>
          <li>Enter the monthly take-home income you want to plan around.</li>
          <li>List every fixed and recurring bill due during the month (housing, utilities, internet, insurance, debt minimums).</li>
          <li>Review what remains before committing to discretionary spending, and save your recurring due dates in Smart Bill Manager so you get local reminders before each bill is due.</li>
        </ol>

        <h2>Bill calculator FAQs</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <h2>Related household finance tools &amp; guides</h2>
        <p className="related">
          <Link href="/tools/subscription-cost-calculator/">Subscription Cost Calculator</Link> ·{" "}
          <Link href="/tools/budget-calculator/">Budget Calculator</Link> ·{" "}
          <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link> ·{" "}
          <Link href="/bill-reminder-app/">Bill Reminder App</Link> ·{" "}
          <Link href="/offline-budget-app/">Offline Budget App</Link> ·{" "}
          <Link href="/blog/how-to-track-monthly-bills/">How to track monthly bills</Link>
        </p>
      </div>
    </main>
  );
}
