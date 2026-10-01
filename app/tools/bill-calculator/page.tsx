"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "../../breadcrumbs";

export default function Page() {
  const [income, setIncome] = useState("4000");
  const [bills, setBills] = useState([{name:"Housing",amount:"1500"},{name:"Utilities",amount:"250"},{name:"Insurance",amount:"150"}]);
  const total=useMemo(()=>bills.reduce((s,b)=>s+(Number(b.amount)||0),0),[bills]);
  const remainder=Math.max((Number(income)||0)-total,0);
  const add=()=>setBills([...bills,{name:"",amount:""}]);
  return <main className="page seo-page"><Breadcrumbs items={[{name:"Tools"},{name:"Bill Calculator"}]}/><div className="container prose">
    <div className="kicker">FREE FINANCIAL TOOL</div><h1>Bill Calculator</h1>
    <p className="lead">Add your monthly income and household bills to estimate how much remains after the bills you entered.</p>
    <div className="seo-callout"><strong>Simple planning calculation</strong><p>This calculator uses only the numbers you enter: remaining amount = income − listed bills. It is not a bank balance or financial advice.</p></div>
    <h2>Calculate your monthly bills</h2>
    <label>Monthly income<input inputMode="decimal" value={income} onChange={e=>setIncome(e.target.value)}/></label>
    {bills.map((b,i)=><div className="tool-row" key={i}><input aria-label="Bill name" placeholder="Bill name" value={b.name} onChange={e=>{const x=[...bills];x[i]={...x[i],name:e.target.value};setBills(x)}}/><input inputMode="decimal" aria-label="Bill amount" placeholder="Amount" value={b.amount} onChange={e=>{const x=[...bills];x[i]={...x[i],amount:e.target.value};setBills(x)}}/></div>)}
    <button className="btn btn-secondary" type="button" onClick={add}>Add another bill</button>
    <div className="seo-callout"><strong>Total listed bills: {total.toFixed(2)}</strong><p>Estimated amount after listed bills: <strong>{remainder.toFixed(2)}</strong></p></div>
    <h2>How to use it</h2><ol><li>Enter the monthly income you want to plan around.</li><li>Add the bills that apply to the month.</li><li>Use the result as a planning estimate.</li></ol>
    <h2>Related household finance tools</h2><p><Link href="/budget-planner/">Budget planner</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link> · <Link href="/tools/budget-calculator/">Budget Calculator</Link></p>
  </div></main>;
}