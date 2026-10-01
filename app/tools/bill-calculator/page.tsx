"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";

const currencies = ["USD", "GBP", "EUR", "CAD", "AUD", "CHF", "PKR"];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [income, setIncome] = useState("4000");
  const [bills, setBills] = useState([
    { name: "Housing", amount: "1500" },
    { name: "Utilities", amount: "250" },
    { name: "Insurance", amount: "150" },
  ]);
  const [copied, setCopied] = useState(false);

  const total = useMemo(() => bills.reduce((sum, bill) => sum + (Number(bill.amount) || 0), 0), [bills]);
  const remainder = (Number(income) || 0) - total;
  const format = (value: number) => new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);

  const add = () => setBills([...bills, { name: "", amount: "" }]);
  const share = async () => {
    const text = `Bill Calculator: ${format(remainder)} remaining after ${format(total)} in listed bills.`;
    try {
      if (navigator.share) await navigator.share({ title: "Bill Calculator", text, url: window.location.href });
      else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  return <main className="page seo-page">
    <Breadcrumbs items={[{ name: "Tools" }, { name: "Bill Calculator" }]} />
    <CalculatorJsonLd name="Bill Calculator" path="/tools/bill-calculator/" />
    <div className="container prose">
      <div className="kicker">FREE FINANCIAL TOOL</div>
      <h1>Bill Calculator</h1>
      <p className="lead">Estimate how much of your monthly income remains after the household bills you enter.</p>

      <div className="seo-callout"><strong>Simple planning calculation</strong><p>Remaining amount = income − listed bills. This tool uses only the numbers you enter and is not a bank balance or financial advice.</p></div>

      <h2>Calculate your monthly bills</h2>
      <label>Currency<select value={currency} onChange={e => setCurrency(e.target.value)}>{currencies.map(code => <option key={code}>{code}</option>)}</select></label>
      <label>Monthly income<input inputMode="decimal" value={income} onChange={e => setIncome(e.target.value)} /></label>

      {bills.map((bill, i) => <div className="tool-row" key={i}>
        <input aria-label="Bill name" placeholder="Bill name" value={bill.name} onChange={e => { const next = [...bills]; next[i] = { ...next[i], name: e.target.value }; setBills(next); }} />
        <input inputMode="decimal" aria-label="Bill amount" placeholder="Amount" value={bill.amount} onChange={e => { const next = [...bills]; next[i] = { ...next[i], amount: e.target.value }; setBills(next); }} />
      </div>)}

      <button className="btn btn-secondary" type="button" onClick={add}>Add another bill</button>
      <div className="seo-callout">
        <strong>Total listed bills: {format(total)}</strong>
        <p>Estimated amount after listed bills: <strong className={remainder < 0 ? "negative-value" : ""}>{format(remainder)}</strong></p>
        {remainder < 0 && <p className="negative-value">The listed bills exceed the income entered by {format(Math.abs(remainder))}.</p>}
        <div className="tool-actions"><button className="btn btn-secondary" type="button" onClick={share}>{copied ? "Result copied" : "Share result"}</button><Link className="btn btn-primary" href="/download/">Get the app</Link></div>
      </div>

      <h2>How to use a bill calculator</h2>
      <ol><li>Enter the monthly income you want to plan around.</li><li>List the bills that apply to the period.</li><li>Review the remaining amount and add any missing commitments.</li></ol>

      <h2>Bill calculator FAQs</h2>
      <div className="faq-item"><h3>What does this bill calculator calculate?</h3><p>It subtracts the household bills you list from the income you enter. It does not connect to your bank account.</p></div>
      <div className="faq-item"><h3>What if my bills are higher than my income?</h3><p>The calculator shows a negative remaining amount so the shortfall is visible instead of hiding it.</p></div>
      <div className="faq-item"><h3>Can I use different currencies?</h3><p>Yes. Select a supported currency for the displayed result. The calculation itself is based on the numerical amounts you enter.</p></div>

      <h2>Related household finance tools</h2>
      <p><Link href="/budget-planner/">Budget planner</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link> · <Link href="/tools/budget-calculator/">Budget Calculator</Link></p>
    </div>
  </main>;
}
