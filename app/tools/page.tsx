import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";

const tools = [
  { href: "/tools/bill-calculator/", title: "Bill Calculator", text: "Estimate what remains after the household bills you enter." },
  { href: "/tools/budget-calculator/", title: "Budget Calculator", text: "Build a simple monthly budget from income and spending categories." },
  { href: "/tools/safe-to-spend-calculator/", title: "Safe-to-Spend Calculator", text: "Estimate a planning amount after committed and planned spending." },
];

export default function Page() {
  return <main className="page"><div className="container"><Breadcrumbs items={[{ name: "Tools" }]} /><div className="prose">
    <div className="kicker">FREE FINANCIAL TOOLS</div>
    <h1>Free household finance calculators.</h1>
    <p className="lead">Use these simple calculators for quick planning. They use the numbers you enter and do not connect to your bank.</p>
    <div className="grid-3 tool-grid">{tools.map(tool => <article className="card" key={tool.href}><h2 className="card-title">{tool.title}</h2><p>{tool.text}</p><p><Link className="btn btn-secondary" href={tool.href}>Open calculator</Link></p></article>)}</div>
    <h2>Use calculators as planning aids</h2>
    <p>Results depend on the figures and assumptions you enter. Keep your actual accounts, bills and obligations as the source of truth for financial decisions.</p>
    <p><Link href="/budget-planner/">Explore the Budget Planner</Link> · <Link href="/safe-to-spend/">Learn about Safe-to-Spend</Link> · <Link href="/download/">Download Smart Bill Manager</Link></p>
  </div></div></main>;
}