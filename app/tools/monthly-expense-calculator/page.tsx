"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../../conversion-cta";
import { SeoFaqJsonLd } from "../../seo-faq";
import {
  SUPPORTED_CURRENCIES,
  EXPENSE_FREQUENCIES,
  calculateMonthlyExpenses,
  formatMoney,
} from "../calculator-math.mjs";

const DEFAULT_INCOME = "4000";
const DEFAULT_EXPENSES = [
  { name: "Groceries & Household", amount: "145", frequency: "weekly" },
  { name: "Coffee & Work Lunches", amount: "8.50", frequency: "daily" },
  { name: "Fuel & Public Transit", amount: "55", frequency: "weekly" },
  { name: "Dining Out & Family", amount: "180", frequency: "monthly" },
];

const faq = [
  {
    question: "How are daily and weekly expenses converted into a monthly total?",
    answer:
      "Because most months are slightly longer than 4 weeks (52 weeks ÷ 12 = 4.33 weeks), each item is annualized first (daily × 365, weekly × 52, bi-weekly × 26, monthly × 12, yearly × 1) and divided by 12 for an accurate monthly equivalent.",
  },
  {
    question: "Why multiply weekly groceries by 4.33 instead of 4?",
    answer:
      "Multiplying weekly spending by 4 undercounts 4 full weeks per year (nearly an entire extra month of groceries and fuel). Using 52 ÷ 12 prevents surprise budget overruns in 5-week months.",
  },
  {
    question: "How can I track real everyday cash spending without linking my bank?",
    answer:
      "Use Smart Bill Manager's 1-tap Daily Cash Log, Quick Cash home-screen widget, or offline receipt OCR on Android — or import monthly bank CSV exports locally.",
  },
];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [monthlyIncome, setMonthlyIncome] = useState(DEFAULT_INCOME);
  const [items, setItems] = useState(DEFAULT_EXPENSES);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(
    () => calculateMonthlyExpenses(items, monthlyIncome),
    [items, monthlyIncome]
  );
  const format = (value: number) => formatMoney(value, currency);

  const addItem = () =>
    setItems([...items, { name: "", amount: "", frequency: "weekly" }]);

  const removeItem = (index: number) =>
    setItems(
      items.length > 1
        ? items.filter((_, i) => i !== index)
        : [{ name: "", amount: "", frequency: "monthly" }]
    );

  const reset = () => {
    setMonthlyIncome(DEFAULT_INCOME);
    setItems(DEFAULT_EXPENSES);
    setCopied(false);
  };

  const share = async () => {
    const text = `Monthly Expense Calculator: ${format(summary.monthlyTotal)}/month (${format(summary.dailyAverage)}/day · ${format(summary.annualTotal)}/year) across everyday categories.`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Monthly Expense Calculator",
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
          { name: "Monthly Expense Calculator" },
        ]}
      />
      <CalculatorJsonLd
        name="Monthly Expense Calculator"
        path="/tools/monthly-expense-calculator/"
        description="Free browser-based monthly expense calculator that converts daily, weekly, bi-weekly, monthly, and annual spending habits into true monthly and yearly totals."
      />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOL</div>
        <h1>Monthly Expense Calculator</h1>
        <p className="lead">
          Convert daily coffee runs, weekly grocery trips, commuting fuel and monthly categories into your true monthly, daily-average and annual household spend — privately in your browser.
        </p>

        <div className="seo-callout">
          <strong>True 52-week monthly conversion</strong>
          <p>
            Weekly habits happen <strong>4.33 times per month</strong> (<code>amount × 52 ÷ 12</code>) and daily habits happen <strong>30.42 times per month</strong> (<code>amount × 365 ÷ 12</code>). Calculating the exact monthly equivalent stops 5-week months from breaking your budget.
          </p>
        </div>

        <h2>Add your everyday spending habits</h2>
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
            placeholder="e.g. 4000 (leave blank to skip income comparison)"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
          />
        </label>

        {items.map((item, i) => (
          <div className="tool-row-sub" key={i}>
            <input
              aria-label={`Expense ${i + 1} category`}
              placeholder="Category (e.g. Groceries, Coffee)"
              value={item.name}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...next[i], name: e.target.value };
                setItems(next);
              }}
            />
            <input
              inputMode="decimal"
              aria-label={`Expense ${i + 1} amount`}
              placeholder="0.00"
              value={item.amount}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...next[i], amount: e.target.value };
                setItems(next);
              }}
            />
            <select
              aria-label={`Expense ${i + 1} frequency`}
              value={item.frequency}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...next[i], frequency: e.target.value };
                setItems(next);
              }}
            >
              {EXPENSE_FREQUENCIES.map((freq) => (
                <option key={freq.value} value={freq.value}>
                  {freq.label}
                </option>
              ))}
            </select>
            <button
              className="btn-remove"
              type="button"
              aria-label={`Remove expense ${i + 1}`}
              onClick={() => removeItem(i)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="tool-controls">
          <button className="btn btn-secondary" type="button" onClick={addItem}>
            Add expense category
          </button>
          <button className="btn btn-secondary" type="button" onClick={reset}>
            Reset example
          </button>
        </div>

        <div
          className="seo-callout"
          role="region"
          aria-live="polite"
          aria-label="Monthly expense calculation result"
        >
          <strong>True monthly spending: {format(summary.monthlyTotal)} / month</strong>
          <p>
            Daily average: <strong>{format(summary.dailyAverage)}/day</strong> · Annualized total:{" "}
            <strong>{format(summary.annualTotal)}/year</strong>
            {summary.topCategoryName ? (
              <>
                {" "}· Top category: <strong>{summary.topCategoryName}</strong>
              </>
            ) : null}
          </p>

          {summary.incomeSharePercent !== null && (
            <p>
              Share of monthly income: <strong>{summary.incomeSharePercent}%</strong>
              {summary.remainingAfterExpenses !== null && (
                <>
                  {" "}· Left for fixed bills &amp; savings:{" "}
                  <strong className={summary.remainingAfterExpenses < 0 ? "negative-value" : ""}>
                    {format(summary.remainingAfterExpenses)}
                  </strong>
                </>
              )}
            </p>
          )}

          {summary.breakdown.some((b) => b.monthlyEquivalent > 0) && (
            <ul>
              {summary.breakdown
                .filter((b) => b.monthlyEquivalent > 0)
                .map((b, idx) => (
                  <li key={`${b.name}-${idx}`}>
                    <strong>{b.name}:</strong> {format(b.monthlyEquivalent)}/mo ({b.sharePercent}% of spend ·{" "}
                    {format(b.annualTotal)}/yr)
                  </li>
                ))}
            </ul>
          )}

          {summary.hasNegativeInput && (
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
              route="cash-log"
              placement="monthly-expense-calculator-result-open"
              label="Open Daily Cash Log in App"
            />
            <PlayCta
              placement="monthly-expense-calculator-result-play"
              label="Download on Google Play"
              secondary
            />
          </div>
        </div>

        <h2>Compare estimated habits against real daily spending</h2>
        <p>
          Most households underestimate small daily purchases by 20–35% until they log a single week of real expenses. Use Smart Bill Manager&apos;s 3-second Daily Cash Log or offline receipt scanner on Android to compare your real spend against these estimates and build motivating no-spend streaks.
        </p>

        <h2>Monthly expense calculator FAQs</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <h2>Related tools &amp; guides</h2>
        <p className="related">
          <Link href="/expense-tracker/">Expense Tracker</Link> ·{" "}
          <Link href="/daily-cash-tracker/">Daily Cash Tracker &amp; Streaks</Link> ·{" "}
          <Link href="/tools/budget-calculator/">Budget Calculator</Link> ·{" "}
          <Link href="/tools/bill-calculator/">Bill Calculator</Link> ·{" "}
          <Link href="/blog/monthly-expense-categories/">Monthly expense categories</Link> ·{" "}
          <Link href="/blog/import-bank-csv-offline-guide/">Import bank CSV offline guide</Link>
        </p>
      </div>
    </main>
  );
}
