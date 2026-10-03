"use client";

import Link from "next/link";

export const metadata = {
  title: "Safe-to-Spend Calculator",
  description: "Use a free Safe-to-Spend calculator to estimate a planning amount after committed bills and planned spending.",
  alternates: { canonical: "/tools/safe-to-spend-calculator/" },
};
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";

const currencies = ["USD", "GBP", "EUR", "CAD", "AUD", "CHF", "PKR"];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [balance, setBalance] = useState("4000");
  const [committed, setCommitted] = useState("1800");
  const [planned, setPlanned] = useState("500");
  const [copied, setCopied] = useState(false);

  const rawResult = useMemo(() => (Number(balance) || 0) - (Number(committed) || 0) - (Number(planned) || 0), [balance, committed, planned]);
  const result = Math.max(rawResult, 0);
  const format = (value: number) => new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);

  const share = async () => {
    const text = `Safe-to-Spend Calculator: estimated planning amount ${format(result)}.`;
    try {
      if (navigator.share) await navigator.share({ title: "Safe-to-Spend Calculator", text, url: window.location.href });
      else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  return <main className="page seo-page">
    <Breadcrumbs items={[{ name: "Tools" }, { name: "Safe-to-Spend Calculator" }]} />
    <CalculatorJsonLd name="Safe-to-Spend Calculator" path="/tools/safe-to-spend-calculator/" />
    <div className="container prose">
      <div className="kicker">FREE FINANCIAL TOOL</div>
      <h1>Safe-to-Spend Calculator</h1>
      <p className="lead">Estimate a planning amount after subtracting the bills, recurring commitments and planned spending you enter.</p>

      <div className="seo-callout"><strong>Transparent calculation</strong><p>Estimated Safe-to-Spend = current balance − committed amount − planned spending. A negative result is displayed as zero because this tool is estimating an amount available to spend. It is not an authorised bank balance or financial advice.</p></div>

      <h2>Enter your numbers</h2>
      <label>Currency<select value={currency} onChange={e => setCurrency(e.target.value)}>{currencies.map(code => <option key={code}>{code}</option>)}</select></label>
      <label>Current balance<input inputMode="decimal" value={balance} onChange={e => setBalance(e.target.value)} /></label>
      <label>Committed bills and recurring costs<input inputMode="decimal" value={committed} onChange={e => setCommitted(e.target.value)} /></label>
      <label>Planned spending<input inputMode="decimal" value={planned} onChange={e => setPlanned(e.target.value)} /></label>

      <div className="seo-callout">
        <strong>Estimated Safe-to-Spend: {format(result)}</strong>
        {rawResult < 0 && <p className="negative-value">Your entered commitments and planned spending exceed the current balance by {format(Math.abs(rawResult))}.</p>}
        <p>Keep your actual account balance and obligations as the source of truth.</p>
        <div className="tool-actions"><button className="btn btn-secondary" type="button" onClick={share}>{copied ? "Result copied" : "Share result"}</button><Link className="btn btn-primary" href="/download/">Get the app</Link></div>
      </div>

      <h2>When this calculator can help</h2>
      <p>It can provide a quick way to test whether money currently visible in an account is already allocated to commitments you have identified.</p>

      <h2>Safe-to-Spend calculator FAQs</h2>
      <div className="faq-item"><h3>Is Safe-to-Spend the same as my bank balance?</h3><p>No. It is a planning estimate that subtracts the commitments and planned spending you enter from a balance you enter.</p></div>
      <div className="faq-item"><h3>Why does the result become zero?</h3><p>When the entered commitments and planned spending exceed the entered balance, the calculator treats the estimated amount available to spend as zero and shows the shortfall separately.</p></div>
      <div className="faq-item"><h3>Does this calculator access my bank?</h3><p>No. It runs from the numbers you enter in the browser.</p></div>

      <h2>Related</h2>
      <p><Link href="/safe-to-spend/">Safe-to-Spend planning</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link> · <Link href="/blog/safe-to-spend-vs-bank-balance/">Safe-to-Spend vs bank balance</Link></p>
    </div>
  </main>;
}
