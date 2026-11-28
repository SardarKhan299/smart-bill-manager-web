"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../../conversion-cta";
import { SeoFaqJsonLd } from "../../seo-faq";
import {
  SUPPORTED_CURRENCIES,
  calculateDebtPayoffPlan,
  formatMoney,
} from "../calculator-math.mjs";

const DEFAULT_EXTRA = "150";
const DEFAULT_DEBTS = [
  { name: "Store Card", balance: "850", interestRate: "24.99", minimumPayment: "35" },
  { name: "Credit Card", balance: "3200", interestRate: "19.9", minimumPayment: "95" },
  { name: "Personal Loan", balance: "5400", interestRate: "9.5", minimumPayment: "160" },
];

const faq = [
  {
    question: "What is the difference between Debt Snowball and Debt Avalanche?",
    answer:
      "Both strategies pay the required minimum on every debt and direct all extra money toward one target debt. Debt Snowball targets the smallest balance first for quick psychological wins, while Debt Avalanche targets the highest APR first to minimize total interest paid.",
  },
  {
    question: "How does rollover acceleration work as debts are paid off?",
    answer:
      "When a debt reaches zero, its former minimum payment is kept inside your monthly debt budget and rolled directly onto the next priority balance — accelerating each remaining payoff.",
  },
  {
    question: "Are my debt balances or APRs sent to any server?",
    answer:
      "No. Every amortization step runs locally inside your browser. Zero debt amounts, balances or APRs are sent to servers or analytics.",
  },
];

function formatDuration(months: number): string {
  if (months <= 0) return "0 months";
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${months} ${months === 1 ? "month" : "months"}`;
  if (rem === 0) return `${years} ${years === 1 ? "year" : "years"} (${months} mo)`;
  return `${years} yr ${rem} mo (${months} months)`;
}

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [strategy, setStrategy] = useState<"snowball" | "avalanche">("snowball");
  const [extraPayment, setExtraPayment] = useState(DEFAULT_EXTRA);
  const [debts, setDebts] = useState(DEFAULT_DEBTS);
  const [copied, setCopied] = useState(false);

  const plan = useMemo(
    () => calculateDebtPayoffPlan(debts, extraPayment, strategy),
    [debts, extraPayment, strategy]
  );
  const format = (value: number) => formatMoney(value, currency);

  const addDebt = () =>
    setDebts([
      ...debts,
      { name: "", balance: "", interestRate: "", minimumPayment: "" },
    ]);

  const removeDebt = (index: number) =>
    setDebts(
      debts.length > 1
        ? debts.filter((_, i) => i !== index)
        : [{ name: "", balance: "", interestRate: "", minimumPayment: "" }]
    );

  const reset = () => {
    setStrategy("snowball");
    setExtraPayment(DEFAULT_EXTRA);
    setDebts(DEFAULT_DEBTS);
    setCopied(false);
  };

  const share = async () => {
    const label = strategy === "avalanche" ? "Debt Avalanche" : "Debt Snowball";
    const text = `${label} Payoff Plan: Debt-free in ${formatDuration(plan.totalMonths)} with ${format(plan.totalInterestPaid)} total interest on ${format(plan.totalDebt)} debt (${format(plan.monthlyPaymentBudget)}/mo budget).`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Debt Payoff Calculator",
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
        items={[
          { name: "Tools", href: "/tools/" },
          { name: "Debt Payoff Calculator" },
        ]}
      />
      <CalculatorJsonLd
        name="Debt Payoff Calculator — Snowball vs. Avalanche"
        path="/tools/debt-payoff-calculator/"
        description="Free browser-based Debt Snowball vs. Debt Avalanche calculator to estimate months to debt-free, monthly rollover payments, and interest saved."
      />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOL</div>
        <h1>Debt Payoff Calculator (Snowball vs. Avalanche)</h1>
        <p className="lead">
          Compare Debt Snowball (smallest balance first) against Debt Avalanche (highest interest rate first) to see your debt-free timeline and interest savings — 100% privately in your browser.
        </p>

        <div className="seo-callout">
          <strong>Monthly rollover amortization</strong>
          <p>
            Each month, interest accrues at <code>balance × (APR ÷ 12)</code>, minimums are paid across all balances, and your extra monthly payment plus any paid-off minimums roll onto the top-priority debt. Nothing leaves your device.
          </p>
        </div>

        <h2>Enter your balances and extra monthly payment</h2>
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
          Payoff strategy
          <select
            value={strategy}
            onChange={(e) =>
              setStrategy(e.target.value === "avalanche" ? "avalanche" : "snowball")
            }
          >
            <option value="snowball">
              Debt Snowball — Smallest balance first (fastest first win)
            </option>
            <option value="avalanche">
              Debt Avalanche — Highest APR first (lowest total interest)
            </option>
          </select>
        </label>

        <label>
          Extra monthly payment above minimums
          <input
            inputMode="decimal"
            placeholder="e.g. 150"
            value={extraPayment}
            onChange={(e) => setExtraPayment(e.target.value)}
          />
          <span className="input-hint">
            Added on top of your required minimum payments every month and rolled forward as each balance hits zero.
          </span>
        </label>

        {debts.map((debt, i) => (
          <div className="tool-row-debt" key={i}>
            <input
              aria-label={`Debt ${i + 1} name`}
              placeholder="Debt name (e.g. Visa, Loan)"
              value={debt.name}
              onChange={(e) => {
                const next = [...debts];
                next[i] = { ...next[i], name: e.target.value };
                setDebts(next);
              }}
            />
            <input
              inputMode="decimal"
              aria-label={`Debt ${i + 1} balance`}
              placeholder="Balance"
              value={debt.balance}
              onChange={(e) => {
                const next = [...debts];
                next[i] = { ...next[i], balance: e.target.value };
                setDebts(next);
              }}
            />
            <input
              inputMode="decimal"
              aria-label={`Debt ${i + 1} APR percent`}
              placeholder="APR %"
              value={debt.interestRate}
              onChange={(e) => {
                const next = [...debts];
                next[i] = { ...next[i], interestRate: e.target.value };
                setDebts(next);
              }}
            />
            <input
              inputMode="decimal"
              aria-label={`Debt ${i + 1} minimum monthly payment`}
              placeholder="Min / mo"
              value={debt.minimumPayment}
              onChange={(e) => {
                const next = [...debts];
                next[i] = { ...next[i], minimumPayment: e.target.value };
                setDebts(next);
              }}
            />
            <button
              className="btn-remove"
              type="button"
              aria-label={`Remove debt ${i + 1}`}
              onClick={() => removeDebt(i)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="tool-controls">
          <button className="btn btn-secondary" type="button" onClick={addDebt}>
            Add debt
          </button>
          <button className="btn btn-secondary" type="button" onClick={reset}>
            Reset example
          </button>
        </div>

        <div
          className="seo-callout"
          role="region"
          aria-live="polite"
          aria-label="Debt payoff calculation result"
        >
          <strong>
            {plan.totalDebt === 0
              ? "Enter at least one positive debt balance to calculate your payoff timeline."
              : `Debt-free in ${formatDuration(plan.totalMonths)} (${strategy === "avalanche" ? "Debt Avalanche" : "Debt Snowball"})`}
          </strong>
          <p>
            Total starting debt: <strong>{format(plan.totalDebt)}</strong> · Monthly debt budget:{" "}
            <strong>{format(plan.monthlyPaymentBudget)}/mo</strong> ({format(plan.totalMinimumRequired)} minimums +{" "}
            {format(plan.extraMonthlyPayment)} extra)
          </p>
          <p>
            Total interest paid: <strong>{format(plan.totalInterestPaid)}</strong> · First balance cleared in:{" "}
            <strong>{formatDuration(plan.firstDebtPaidMonths)}</strong>
          </p>

          {plan.totalDebt > 0 && (
            <p>
              <strong>Snowball vs. Avalanche comparison:</strong> Avalanche takes{" "}
              <strong>{formatDuration(plan.comparison.avalancheTotalMonths)}</strong> (
              {format(plan.comparison.avalancheTotalInterest)} interest) vs. Snowball{" "}
              <strong>{formatDuration(plan.comparison.snowballTotalMonths)}</strong> (
              {format(plan.comparison.snowballTotalInterest)} interest).
              {plan.comparison.interestSavedWithAvalanche > 0
                ? ` Avalanche saves ${format(plan.comparison.interestSavedWithAvalanche)} in interest.`
                : " Both strategies cost the same total interest for these balances."}
              {plan.comparison.fasterFirstWinMonthsWithSnowball > 0
                ? ` Snowball clears your first debt ${plan.comparison.fasterFirstWinMonthsWithSnowball} ${plan.comparison.fasterFirstWinMonthsWithSnowball === 1 ? "month" : "months"} sooner.`
                : ""}
            </p>
          )}

          {plan.orderedDebts.length > 0 && (
            <ul>
              {plan.orderedDebts.map((item, idx) => (
                <li key={`${item.name}-${idx}`}>
                  <strong>
                    #{idx + 1} {item.name}
                  </strong>{" "}
                  ({format(item.balance)} at {item.apr}% APR, {format(item.minimumPayment)}/mo min) — paid off in{" "}
                  <strong>{formatDuration(item.monthsToPayoff)}</strong> ({format(item.totalInterestPaid)} interest)
                </li>
              ))}
            </ul>
          )}

          {plan.usedEstimatedMinimum && (
            <p className="input-hint">
              Note: where minimum payment was left blank on an interest-bearing balance, a standard 2% (or 25.00 floor) minimum payment estimate was applied.
            </p>
          )}
          {plan.unpayableWarning && (
            <p className="negative-value">
              Warning: your monthly payment budget does not cover monthly interest accrual (or exceeds 50 years). Increase your extra monthly payment or minimum payments to pay down principal.
            </p>
          )}
          {plan.hasNegativeInput && (
            <p className="input-hint">
              Note: negative values were ignored and clamped to zero.
            </p>
          )}

          <div className="tool-actions">
            <button className="btn btn-secondary" type="button" onClick={share}>
              {copied ? "Result copied" : "Share result"}
            </button>
          </div>
          <div className="actions">
            <OpenInAppCta
              route="debt-tracker"
              placement="debt-payoff-calculator-result-open"
              label="Open Debt Tracker in App"
            />
            <PlayCta
              placement="debt-payoff-calculator-result-play"
              label="Download on Google Play"
              secondary
            />
          </div>
        </div>

        <h2>Should you choose Debt Snowball or Debt Avalanche?</h2>
        <ul>
          <li>
            <strong>Choose Debt Snowball</strong> if knocking out small balances quickly keeps you motivated and frees up mental clutter from multiple monthly due dates.
          </li>
          <li>
            <strong>Choose Debt Avalanche</strong> if you carry high-APR credit cards alongside low-rate loans and want to keep as much money out of interest charges as possible.
          </li>
          <li>
            <strong>Track repayments offline:</strong> Smart Bill Manager includes the same Snowball &amp; Avalanche planner on Android alongside partial payment history and local repayment reminders.
          </li>
        </ul>

        <h2>Debt payoff calculator FAQs</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <h2>Related tools &amp; guides</h2>
        <p className="related">
          <Link href="/debt-tracker/">Personal Debt Tracker &amp; Bill Splitter</Link> ·{" "}
          <Link href="/tools/bill-split-calculator/">Bill Split Calculator</Link> ·{" "}
          <Link href="/tools/budget-calculator/">Budget Calculator</Link> ·{" "}
          <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link> ·{" "}
          <Link href="/offline-budget-app/">Offline Budget App</Link>
        </p>
      </div>
    </main>
  );
}
