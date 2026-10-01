"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "../../breadcrumbs";

export default function Page() {
  const [income,setIncome]=useState("4000");
  const [items,setItems]=useState([{name:"Housing",amount:"1500"},{name:"Food",amount:"500"},{name:"Transport",amount:"300"},{name:"Other",amount:"200"}]);
  const total=useMemo(()=>items.reduce((s,x)=>s+(Number(x.amount)||0),0),[items]);
  const remaining=Math.max((Number(income)||0)-total,0);
  const add=()=>setItems([...items,{name:"",amount:""}]);
  return <main className="page seo-page"><Breadcrumbs items={[{name:"Tools"},{name:"Budget Calculator"}]}/><div className="container prose"><div className="kicker">FREE FINANCIAL TOOL</div><h1>Budget Calculator</h1><p className="lead">Build a simple household budget by entering monthly income and planned spending categories.</p>
    <div className="seo-callout"><strong>Plan before you spend</strong><p>The calculator totals the spending categories you enter and subtracts them from the income you enter. It does not connect to a bank.</p></div>
    <h2>Build your monthly budget</h2><label>Monthly income<input inputMode="decimal" value={income} onChange={e=>setIncome(e.target.value)}/></label>
    {items.map((x,i)=><div className="tool-row" key={i}><input aria-label="Category name" placeholder="Category" value={x.name} onChange={e=>{const a=[...items];a[i]={...a[i],name:e.target.value};setItems(a)}}/><input inputMode="decimal" aria-label="Category amount" placeholder="Amount" value={x.amount} onChange={e=>{const a=[...items];a[i]={...a[i],amount:e.target.value};setItems(a)}}/></div>)}
    <button className="btn btn-secondary" type="button" onClick={add}>Add category</button><div className="seo-callout"><strong>Planned spending: {total.toFixed(2)}</strong><p>Unallocated amount: <strong>{remaining.toFixed(2)}</strong></p></div>
    <h2>Budget planning steps</h2><ol><li>Enter the income available for the period.</li><li>Add your planned spending categories.</li><li>Review the unallocated amount before adding more commitments.</li></ol>
    <h2>Related</h2><p><Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link> · <Link href="/blog/household-budget-guide/">Household budget guide</Link></p>
  </div></main>;
}