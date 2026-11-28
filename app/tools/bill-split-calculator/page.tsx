"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../../conversion-cta";
import { SeoFaqJsonLd } from "../../seo-faq";
import {
  SUPPORTED_CURRENCIES,
  calculateBillSplit,
  formatBillSplitShareSlip,
  formatMoney,
} from "../calculator-math.mjs";

const TIP_PRESETS = ["0", "10", "15", "18", "20"];

const DEFAULT_TITLE = "Electricity & Internet";
const DEFAULT_BASE = "180";
const DEFAULT_TIP = "0";
const DEFAULT_EXTRA_FEE = "6.50";
const DEFAULT_PEOPLE = "3";

const faq = [
  {
    question: "How is each person's share calculated?",
    answer:
      "The calculator computes tip on the base bill amount, adds any flat tax, service or delivery fee to get the grand total, and divides evenly by the number of people (from 1 to 100).",
  },
  {
    question: "Do roommates or friends need to create an account to see the split?",
    answer:
      "No. You can copy or share a plain-text breakdown directly into WhatsApp, SMS or email without forcing anyone to install an app or register an account.",
  },
  {
    question: "How can I track who has paid me back?",
    answer:
      "Open Smart Bill Manager on Android to split bills and save unpaid shares as private offline IOUs with repayment reminders.",
  },
];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [billTitle, setBillTitle] = useState(DEFAULT_TITLE);
  const [baseAmount, setBaseAmount] = useState(DEFAULT_BASE);
  const [tipPercent, setTipPercent] = useState(DEFAULT_TIP);
  const [extraFee, setExtraFee] = useState(DEFAULT_EXTRA_FEE);
  const [peopleCount, setPeopleCount] = useState(DEFAULT_PEOPLE);
  const [copied, setCopied] = useState(false);

  const split = useMemo(
    () => calculateBillSplit(baseAmount, tipPercent, extraFee, peopleCount),
    [baseAmount, tipPercent, extraFee, peopleCount]
  );

  const format = (value: number) => formatMoney(value, currency);
  const shareSlip = useMemo(
    () => formatBillSplitShareSlip(billTitle, split, currency),
    [billTitle, split, currency]
  );

  const reset = () => {
    setBillTitle(DEFAULT_TITLE);
    setBaseAmount(DEFAULT_BASE);
    setTipPercent(DEFAULT_TIP);
    setExtraFee(DEFAULT_EXTRA_FEE);
    setPeopleCount(DEFAULT_PEOPLE);
    setCopied(false);
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Bill Split: ${billTitle || "Shared Bill"}`,
          text: shareSlip,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(shareSlip);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs
        items={[
          { name: "Tools", href: "/tools/" },
          { name: "Bill Split Calculator" },
        ]}
      />
      <CalculatorJsonLd
        name="Bill Split Calculator"
        path="/tools/bill-split-calculator/"
        description="Free browser-based shared bill and rent split calculator with tip, extra fees, and 1-tap shareable payment breakdown."
      />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOL</div>
        <h1>Bill Split Calculator</h1>
        <p className="lead">
          Split shared rent, household utilities, groceries or group dinners fairly — and copy a clean per-person summary to send in chat without forcing anyone onto an account.
        </p>

        <div className="seo-callout">
          <strong>Transparent split formula</strong>
          <p>
            <code>Grand total = base amount + (base × tip %) + extra fee</code>, and{" "}
            <code>Each person pays = grand total ÷ people</code>. Calculated 100% locally in your browser.
          </p>
        </div>

        <h2>Calculate each person&apos;s share</h2>
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
          Bill or expense name
          <input
            placeholder="e.g. Monthly Internet, Shared Groceries, Dinner"
            value={billTitle}
            onChange={(e) => setBillTitle(e.target.value)}
          />
        </label>

        <label>
          Base bill amount (before tip &amp; fees)
          <input
            inputMode="decimal"
            placeholder="0.00"
            value={baseAmount}
            onChange={(e) => setBaseAmount(e.target.value)}
          />
        </label>

        <label>
          Tip percentage (%)
          <input
            inputMode="decimal"
            placeholder="0"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
          />
        </label>
        <div className="chip-row" role="group" aria-label="Quick tip presets">
          {TIP_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              className="btn-chip"
              aria-pressed={tipPercent.trim() === preset}
              onClick={() => setTipPercent(preset)}
            >
              {preset}%
            </button>
          ))}
        </div>

        <label>
          Extra fee, tax or service charge
          <input
            inputMode="decimal"
            placeholder="0.00"
            value={extraFee}
            onChange={(e) => setExtraFee(e.target.value)}
          />
          <span className="input-hint">
            Optional flat fee (such as utility service charge, tax or delivery fee) added to the total before splitting.
          </span>
        </label>

        <label>
          Split between how many people? (1–100)
          <input
            inputMode="numeric"
            placeholder="2"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
          />
        </label>

        <div className="tool-controls">
          <button className="btn btn-secondary" type="button" onClick={reset}>
            Reset example
          </button>
        </div>

        <div
          className="seo-callout"
          role="region"
          aria-live="polite"
          aria-label="Bill split calculation result"
        >
          <strong>
            Each person pays: {format(split.perPersonShare)} ({split.peopleCount}{" "}
            {split.peopleCount === 1 ? "person" : "people"})
          </strong>
          <p>
            Grand total: <strong>{format(split.grandTotal)}</strong> (Base {format(split.baseAmount)}
            {split.tipAmount > 0 ? ` + Tip ${format(split.tipAmount)}` : ""}
            {split.extraFee > 0 ? ` + Fee/Tax ${format(split.extraFee)}` : ""})
          </p>
          {split.roundingDifference !== 0 && (
            <p className="input-hint">
              Rounding note: {split.peopleCount} × {format(split.perPersonShare)} ={" "}
              {format(split.perPersonShare * split.peopleCount)} (a{" "}
              {format(Math.abs(split.roundingDifference))} cent rounding remainder vs.{" "}
              {format(split.grandTotal)}).
            </p>
          )}
          {split.wasPeopleClamped && (
            <p className="input-hint">
              Note: number of people is clamped to whole numbers between 1 and 100.
            </p>
          )}
          {split.hasNegativeInput && (
            <p className="input-hint">
              Note: negative values were ignored and clamped to zero.
            </p>
          )}

          <div className="tool-actions">
            <button className="btn btn-secondary" type="button" onClick={share}>
              {copied ? "Split summary copied" : "Copy / share split summary"}
            </button>
          </div>
          <div className="actions">
            <OpenInAppCta
              route="bill-splitter"
              placement="bill-split-calculator-result-open"
              label="Split Bills & Track IOUs in App"
            />
            <PlayCta
              placement="bill-split-calculator-result-play"
              label="Download on Google Play"
              secondary
            />
          </div>
        </div>

        <h2>How to split household bills without awkward follow-ups</h2>
        <ol>
          <li>Enter the base utility, rent or grocery bill plus any shared service fee or tip.</li>
          <li>Copy the itemized split summary and paste it into your household or group chat so everyone sees the exact math.</li>
          <li>Record unpaid roommate shares in Smart Bill Manager&apos;s offline Debt Tracker so you get local reminders until everyone settles up.</li>
        </ol>

        <h2>Bill split calculator FAQs</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <h2>Related tools &amp; guides</h2>
        <p className="related">
          <Link href="/debt-tracker/">Personal Debt Tracker &amp; Bill Splitter</Link> ·{" "}
          <Link href="/tools/debt-payoff-calculator/">Debt Payoff Calculator</Link> ·{" "}
          <Link href="/tools/bill-calculator/">Bill Calculator</Link> ·{" "}
          <Link href="/bill-reminder-app/">Bill Reminder App</Link> ·{" "}
          <Link href="/blog/household-bill-checklist/">Household bill checklist</Link>
        </p>
      </div>
    </main>
  );
}
