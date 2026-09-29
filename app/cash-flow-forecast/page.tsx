import Link from "next/link";

export const metadata = {
  title: "Cash-Flow Forecast for Household Finances",
  description: "Look ahead at household bills, spending and financial commitments with cash-flow forecasting in Smart Bill Manager.",
  alternates: { canonical: "/cash-flow-forecast/" },
};

export default function Page() {
  return <main className="page seo-page"><div className="container prose">
    <div className="kicker">CASH-FLOW FORECAST</div>
    <h1>See what may be coming before it arrives.</h1>
    <p className="lead">Smart Bill Manager helps you look ahead across bills, recurring expenses and planned spending so upcoming financial pressure points are easier to spot.</p>
    <h2>Turn recorded commitments into a forward view</h2>
    <p>Upcoming bills, subscriptions and expenses can be reviewed together as part of a forward-looking household plan.</p>
    <h2>Use forecasts for planning</h2>
    <p>Forecasting is designed to help you explore upcoming financial situations rather than relying only on what has already happened.</p>
    <h2>Combine forecasting with what-if planning</h2>
    <p>Explore potential expenses and see how they may affect your forward plan.</p>
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link></p>
  </div></main>;
}