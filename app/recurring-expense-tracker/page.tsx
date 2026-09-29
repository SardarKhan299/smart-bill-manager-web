import Link from "next/link";

export const metadata = {
  title: "Recurring Expense Tracker",
  description: "Find and understand recurring household expenses with Smart Bill Manager.",
  alternates: { canonical: "/recurring-expense-tracker/" },
};

export default function Page() {
  return <main className="page seo-page"><div className="container prose">
    <div className="kicker">RECURRING EXPENSES</div>
    <h1>Make recurring spending easier to spot.</h1>
    <p className="lead">Smart Bill Manager helps you identify and review recurring household expenses so repeated spending does not disappear into day-to-day transactions.</p>
    <h2>Review repeated spending</h2>
    <p>Recurring expense detection can help surface patterns in your recorded spending and bring them into a more useful view.</p>
    <h2>Connect recurring costs to planning</h2>
    <p>Recurring expenses can be considered alongside subscriptions, bills and budgets when reviewing household finances.</p>
    <h2>Build a clearer picture of commitments</h2>
    <ul><li>Review detected recurring expense patterns.</li><li>Understand repeated household costs.</li><li>Use recurring costs in forward planning.</li><li>Keep financial records organised in one app.</li></ul>
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/subscription-tracker/">Subscription tracker</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link></p>
  </div></main>;
}