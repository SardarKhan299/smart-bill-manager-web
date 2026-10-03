"use client";

import Link from "next/link";

import { useMemo, useState } from "react";
import { CalculatorJsonLd } from "../../calculator-jsonld";
import { Breadcrumbs } from "../../breadcrumbs";

const currencies = ["USD", "GBP", "EUR", "CAD", "AUD", "CHF", "PKR"];

export default function Page() {
  const [currency, setCurrency] = useState("USD");
  const [income, setIncome] = useState("4000");
  const [items, setItems] = useState([
    { name: "Housing", amount: "1500" },
    { name: "Food", amount: "500" },
    { name: "Transport", amount: "300" },
    { name: "Other", amount: "200" },
  ]);
  const [copied, setCopied] = useState(false);

  const total = useMemo(() => items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0), [items]);
  const remaining = (Number(income) || 0) - total;
  const format = (value: number) => new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);

  const add = () => setItems([...items, { name: "", amount: "" }]);
  const share = async () => {
    const text = `Budget Calculator: ${format(total)} planned spending and ${format(remaining)} unallocated.`;
    try {
      if (navigator.share) await navigator.share({ title: "Budget Calculator", text, url: window.location.href });
      else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  return <main className="page seo-page">
    <Breadcrumbs items={[{ name: "Tools" }, { name: "Budget Calculator" }]} />
    <CalculatorJsonLd name="Budget Calculator" path="/tools/budget-calculator/" />
    <div className="container prose">
      <div className="kicker">FREE FINANCIAL TOOL</div>
      <h1>Budget Calculator</h1>
      <p className="lead">Build a simple monthly household budget by entering income and planned spending categories.</p>
      <div className="seo-callout"><strong>Plan before you spend</strong><p>Unallocated amount = income − planned spending. This calculator does not connect to a bank or predict future income.</p></div>
      <h2>Build your monthly budget</h2>
      <label>Currency<select value={currency} onChange={e => setCurrency(e.target.value)}>{currencies.map(code => <option key={code}>{code}</option>)}</select></label>
      <label>Monthly income<input inputMode="decimal" value={income} onChange={e => setIncome(e.target.value)} /></label>
      {items.map((item, i) => <div className="tool-row" key={i}>
        <input aria-label="Category name" placeholder="Category" value={item.name} onChange={e => { const next = [...items]; next[i] = { ...next[i], name: e.target.value }; setItems(next); }} />
        <input inputMode="decimal" aria-label="Category amount" placeholder="Amount" value={item.amount} onChange={e => { const next = [...items]; next[i] = { ...next[i], amount: e.target.value }; setItems(next); }} />
      </div>)}
      <button className="btn btn-secondary" type="button" onClick={add}>Add category</button>
      <div className="seo-callout">
        <strong>Planned spending: {format(total)}</strong>
        <p>Unallocated amount: <strong className={remaining < 0 ? "negative-value" : ""}>{format(remaining)}</strong></p>
        {remaining < 0 && <p className="negative-value">Your planned spending exceeds the income entered by {format(Math.abs(remaining))}.</p>}
        <div className="tool-actions"><button className="btn btn-secondary" type="button" onClick={share}>{copied ? "Result copied" : "Share result"}</button><Link className="btn btn-primary" href="/download/">Get the app</Link></div>
      </div>
      <h2>Budget planning steps</h2>
      <ol><li>Enter the income available for the period.</li><li>Add planned spending categories such as housing, food and transport.</li><li>Review the unallocated amount before adding more commitments.</li></ol>
      <h2>Budget calculator FAQs</h2>
      <div className="faq-item"><h3>What is an unallocated amount?</h3><p>It is the income entered minus all planned spending categories entered in the calculator.</p></div>
      <div className="faq-item"><h3>What happens if my budget goes over income?</h3><p>The calculator shows the negative amount so you can see the size of the shortfall.</p></div>
      <div className="faq-item"><h3>Is this a complete household budget?</h3><p>No. It is a simple planning tool. Add all relevant categories and commitments before relying on the result.</p></div>
      <h2>Related</h2>
      <p><Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link> · <Link href="/blog/household-budget-guide/">Household budget guide</Link></p>
    </div>
  </main>;
}
