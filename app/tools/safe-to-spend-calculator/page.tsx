"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "../../breadcrumbs";

export default function Page() {
  const [balance,setBalance]=useState("4000");
  const [committed,setCommitted]=useState("1800");
  const [planned,setPlanned]=useState("500");
  const result=useMemo(()=>Math.max((Number(balance)||0)-(Number(committed)||0)-(Number(planned)||0),0),[balance,committed,planned]);
  return <main className="page seo-page"><Breadcrumbs items={[{name:"Tools"},{name:"Safe-to-Spend Calculator"}]}/><div className="container prose"><div className="kicker">FREE FINANCIAL TOOL</div><h1>Safe-to-Spend Calculator</h1><p className="lead">Estimate a planning amount after subtracting the bills, recurring commitments and planned spending you enter.</p>
    <div className="seo-callout"><strong>Transparent calculation</strong><p>Estimated amount = current balance − committed amount − planned spending. The result is a planning estimate, not an authorised bank balance or financial advice.</p></div>
    <h2>Enter your numbers</h2><label>Current balance<input inputMode="decimal" value={balance} onChange={e=>setBalance(e.target.value)}/></label><label>Committed bills and recurring costs<input inputMode="decimal" value={committed} onChange={e=>setCommitted(e.target.value)}/></label><label>Planned spending<input inputMode="decimal" value={planned} onChange={e=>setPlanned(e.target.value)}/></label>
    <div className="seo-callout"><strong>Estimated Safe-to-Spend: {result.toFixed(2)}</strong><p>Keep your actual account balance and obligations as the source of truth.</p></div>
    <h2>When this calculator can help</h2><p>It can provide a quick way to test whether money currently visible in an account is already allocated to commitments you have identified.</p>
    <h2>Related</h2><p><Link href="/safe-to-spend/">Safe-to-Spend planning</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link> · <Link href="/blog/safe-to-spend-vs-bank-balance/">Safe-to-Spend vs bank balance</Link></p>
  </div></main>;
}