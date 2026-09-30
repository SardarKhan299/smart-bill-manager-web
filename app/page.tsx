import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smart Bill Manager – Bill Tracker, Budget & Expense App",
  description: "Smart Bill Manager is a private household finance app for tracking bills, subscriptions, expenses, budgets and upcoming commitments. See what you can safely spend.",
  alternates: { canonical: "/" },
};

const features=[["01","Bills & reminders","Keep recurring bills, due dates and upcoming commitments organised in one place."],["02","Subscriptions","See recurring subscription costs and stay aware of what you commit to over time."],["03","Everyday spending","Record expenses and understand where your household money is going."],["04","Safe-to-Spend","Get a clearer view of what may be available after considering your financial commitments."],["05","Planning & forecasts","Use forward-looking insights to understand upcoming financial pressure points."],["06","Receipts & warranties","Keep purchase records, receipts and warranty information organised."]];

export default function Home(){
  return <main>
    <section className="hero"><div className="container hero-grid"><div>
      <span className="eyebrow">PRIVATE HOUSEHOLD MONEY ASSISTANT</span>
      <h1>Know what you owe. Know what you can safely spend.</h1>
      <p className="lead">Smart Bill Manager is a household bill tracker, subscription tracker, expense tracker and budgeting app for Android. Keep upcoming financial commitments in one simple place.</p>
      <div className="actions"><Link className="btn btn-primary" href="/download/">Download on Google Play</Link><Link className="btn btn-secondary" href="/how-it-works/">See how it works</Link></div>
      <div className="hero-note">Designed around local-first household financial management.</div>
    </div><div className="phone"><div className="phone-screen"><div className="fake-top"><span>Smart Bill Manager</span><span>Today</span></div><div className="spend-card"><div className="spend-label">Safe to spend</div><div className="spend-value">£1,240</div><span className="pill">After commitments</span></div><div className="fake-list"><div className="fake-row"><span>Electricity</span><b>£86</b></div><div className="fake-row"><span>Subscriptions</span><b>£42</b></div><div className="fake-row"><span>Groceries</span><b>£180</b></div><div className="fake-row"><span>Upcoming</span><b>£315</b></div></div></div></div></div></section>

    <section className="section section-muted"><div className="container"><div className="section-head"><div className="kicker">BILLS, SUBSCRIPTIONS & EXPENSES</div><h2>One app for everyday household money management.</h2><p className="lead">Track household bills, recurring subscriptions, everyday expenses and budgets while keeping upcoming commitments visible.</p></div><div className="grid-3">{features.slice(0,3).map(([n,t,d])=><div className="card" key={n}><div className="feature-icon">{n}</div><h3>{t}</h3><p>{d}</p></div>)}</div><p className="related"><Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/subscription-tracker/">Subscription tracker</Link> · <Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/budget-planner/">Budget planner</Link></p></div></section>

    <section className="section"><div className="container split"><div><div className="kicker">SAFE-TO-SPEND</div><h2>Know what you can safely spend.</h2><p className="lead">Instead of looking only at today's balance, Smart Bill Manager brings relevant commitments into one view so you can make more informed day-to-day spending decisions.</p><div className="checks"><div className="check">✓ <span>Consider upcoming financial commitments</span></div><div className="check">✓ <span>See a transparent view of the factors behind the amount</span></div><div className="check">✓ <span>Use what-if planning to explore spending scenarios</span></div></div><Link className="btn btn-primary" href="/safe-to-spend/">Learn about Safe-to-Spend</Link></div><div className="card"><div className="feature-icon">£</div><h3>One question, answered clearly</h3><p>“How much can I safely spend?” becomes a practical household-finance question instead of a guess based only on your current balance.</p></div></div></section>

    <section className="section section-muted"><div className="container"><div className="section-head"><div className="kicker">STAY AHEAD</div><h2>See what needs your attention.</h2><p className="lead">From bills and subscriptions to receipts, warranties and forward planning, keep important financial tasks in one place.</p></div><div className="grid-3">{features.slice(3).map(([n,t,d])=><div className="card" key={n}><div className="feature-icon">{n}</div><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

    <section className="section"><div className="container section-head"><div className="kicker">LEARN</div><h2>Practical guides for managing household money.</h2><p className="lead">Learn how to track monthly bills, manage subscriptions, build a household budget, understand recurring expenses and organise receipts.</p><p><Link className="btn btn-secondary" href="/blog/">Read the Smart Bill Manager blog</Link></p></div></section>

    <section className="section"><div className="container"><div className="dark cta"><div className="kicker">SMART BILL MANAGER</div><h2>Your household finances. One clear view.</h2><p className="lead">Track bills, subscriptions, expenses and financial commitments with a private household money assistant.</p><div className="actions"><Link className="btn btn-secondary" href="/download/">Get Smart Bill Manager</Link></div></div></div></section>
  </main>
}
