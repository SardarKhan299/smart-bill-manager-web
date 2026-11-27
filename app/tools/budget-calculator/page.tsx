"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../../conversion-cta";
import { SeoFaqJsonLd } from "../../seo-faq";
import {
  SUPPORTED_CURRENCIES,
  calculateBudgetSummary,
  formatMoney,
} from "../calculator-math.mjs";

const DEFAULT_INCOME = "4000";
const DEFAULT_ITEMS = [
  { name: "Housing", amount: "1500" },
  { name: "Food & Groceries", amount: "500" },
  { name: "Transport", amount: "300" },
  { name: "Utilities & Subscriptions", amount: "200" },
];

const faq = [
  {
    question: "What is an unallocated amount in a monthly budget?",
    answer:
      "It is your entered monthly income minus all planned category amounts. Positive unallocated funds can be assigned to savings, debt payoff, or a Safe-to-Spend buffer.",
  },
  {
    question: "What happens if my planned budget exceeds my income?",
    answer:
      "The calculator highlights the negative unallocated balance and shows the exact shortfall so you can trim categories before the month starts.",
  },
  {
    question: "Does this budget calculator store or upload my numbers?",
    answer:
      "No. Calculations happen solely in your browser. If you want persistent offline category caps and daily expense tracking on Android, open Smart Bill Manager below.",
  },
];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [income, setIncome] = useState(DEFAULT_INCOME);
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => calculateBudgetSummary(income, items), [income, items]);
  const format = (value: number) => formatMoney(value, currency);

  const addCategory = () => setItems([...items, { name: "", amount: "" }]);
  const removeCategory = (index: number) =>
    setItems(items.length > 1 ? items.filter((_, i) => i !== index) : [{ name: "", amount: "" }]);
  const reset = () => {
    setIncome(DEFAULT_INCOME);
    setItems(DEFAULT_ITEMS);
    setCopied(false);
  };

  const share = async () => {
    const text = `Budget Calculator: ${format(summary.plannedSpending)} planned spending (${summary.allocationPercent}% of income) and ${format(summary.unallocated)} unallocated.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Budget Calculator", text, url: window.location.href });
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
      <Breadcrumbs items={[{ name: "Tools", href: "/tools/" }, { name: "Budget Calculator" }]} />
      <CalculatorJsonLd
        name="Budget Calculator"
        path="/tools/budget-calculator/"
        description="Free browser-based monthly household budget calculator for planning spending categories against income."
      />
      <div className="container prose">
        <div className="kicker">FREE FINANCIAL TOOL</div>
        <h1>Budget Calculator</h1>
        <p className="lead">
          Build a clean monthly household budget by entering your income and planned spending categories — with zero bank connections or sign-ups.
        </p>
        <div className="seo-callout">
          <strong>Plan before you spend</strong>
          <p>
            <code>Unallocated amount = monthly income − sum of planned categories</code>. Calculations stay locally in your browser and are never transmitted to analytics.
          </p>
        </div>

        <h2>Build your monthly budget</h2>
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
          Monthly income
          <input
            inputMode="decimal"
            placeholder="e.g. 4000"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
          <span className="input-hint">Enter total household take-home income for the period.</span>
        </label>

        {items.map((item, i) => (
          <div className="tool-row-removable" key={i}>
            <input
              aria-label={`Category ${i + 1} name`}
              placeholder="Category (e.g. Groceries, Savings)"
              value={item.name}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...next[i], name: e.target.value };
                setItems(next);
              }}
            />
            <input
              inputMode="decimal"
              aria-label={`Category ${i + 1} amount`}
              placeholder="0.00"
              value={item.amount}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...next[i], amount: e.target.value };
                setItems(next);
              }}
            />
            <button
              className="btn-remove"
              type="button"
              aria-label={`Remove category ${i + 1}`}
              onClick={() => removeCategory(i)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="tool-controls">
          <button className="btn btn-secondary" type="button" onClick={addCategory}>
            Add category
          </button>
          <button className="btn btn-secondary" type="button" onClick={reset}>
            Reset example
          </button>
        </div>

        <div className="seo-callout" role="region" aria-live="polite" aria-label="Budget calculation result">
          <strong>
            Planned spending: {format(summary.plannedSpending)}
            {summary.income > 0 ? ` (${summary.allocationPercent}% of income)` : ""}
          </strong>
          <p>
            Unallocated amount:{" "}
            <strong className={summary.unallocated < 0 ? "negative-value" : ""}>
              {format(summary.unallocated)}
            </strong>
          </p>
          {summary.shortfall > 0 && (
            <p className="negative-value">
              Your planned spending exceeds the income entered by {format(summary.shortfall)}.
            </p>
          )}
          {summary.hasNegativeInput && (
            <p className="input-hint">
              Note: negative values were entered and reduce total planned spending or income.
            </p>
          )}
          <div className="tool-actions">
            <button className="btn btn-secondary" type="button" onClick={share}>
              {copied ? "Result copied" : "Share result"}
            </button>
          </div>
          <div className="actions">
            <OpenInAppCta
              route="analytics"
              placement="budget-calculator-result-open"
              label="Open Budget & Analytics in App"
            />
            <PlayCta placement="budget-calculator-result-play" label="Download on Google Play" secondary />
          </div>
        </div>

        <h2>Budget planning steps</h2>
        <ol>
          <li>Enter the net income available for the month.</li>
          <li>Add essential categories first (housing, utilities, groceries, transport, debt payments).</li>
          <li>Assign remaining unallocated money to savings goals and everyday discretionary spending.</li>
        </ol>

        <h2>Budget calculator FAQs</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <h2>Related tools &amp; guides</h2>
        <p className="related">
          <Link href="/tools/bill-calculator/">Bill Calculator</Link> ·{" "}
          <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link> ·{" "}
          <Link href="/tools/subscription-cost-calculator/">Subscription Cost Calculator</Link> ·{" "}
          <Link href="/offline-budget-app/">Offline Budget App</Link> ·{" "}
          <Link href="/daily-cash-tracker/">Daily Cash Tracker</Link> ·{" "}
          <Link href="/blog/household-budget-guide/">Household budget guide</Link>
        </p>
      </div>
    </main>
  );
}
