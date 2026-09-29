import Link from "next/link";

export const metadata = {
  title: "Subscription Tracker",
  description: "Track recurring subscriptions, understand recurring costs and stay aware of subscription price changes with Smart Bill Manager.",
  alternates: { canonical: "/subscription-tracker/" },
};

export default function Page() {
  return <main className="page seo-page"><div className="container prose">
    <div className="kicker">SUBSCRIPTION TRACKER</div>
    <h1>Know what your subscriptions cost over time.</h1>
    <p className="lead">Smart Bill Manager helps you keep recurring subscriptions organised and understand how they contribute to household spending.</p>
    <h2>Put recurring subscriptions in one place</h2>
    <p>Record subscription commitments alongside bills and everyday expenses so recurring costs are easier to see.</p>
    <h2>Understand recurring and lifetime cost</h2>
    <p>Use subscription insights to examine recurring prices, price changes and the longer-term cost of subscriptions you keep paying.</p>
    <h2>Make recurring spending easier to review</h2>
    <ul><li>Track recurring subscription commitments.</li><li>Review subscription price changes.</li><li>Understand longer-term subscription spend.</li><li>Use subscription data when planning household finances.</li></ul>
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/budget-planner/">Budget planner</Link></p>
  </div></main>;
}