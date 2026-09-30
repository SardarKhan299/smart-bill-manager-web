import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";

export const metadata = {
  title: "Expense Tracker for Everyday Spending",
  description: "Record everyday expenses and understand household spending with Smart Bill Manager for Android.",
  alternates: { canonical: "/expense-tracker/" },
};

export default function Page() {
  return <main className="page seo-page"><Breadcrumbs items={[{name:"Expense Tracker"}]}/><div className="container prose">
    <div className="kicker">EXPENSE TRACKER</div>
    <h1>Understand where your household money is going.</h1>
    <p className="lead">Record everyday spending in Smart Bill Manager and bring expenses together with bills, subscriptions and planning.</p>
    <h2>Record everyday expenses</h2>
    <p>Keep a practical record of household purchases and spending so you have more context when reviewing your finances.</p>
    <h2>Connect spending with planning</h2>
    <p>Expense records can be used alongside budgets, forecasts and Safe-to-Spend information to help you review spending in context.</p>
    <h2>Designed for practical tracking</h2>
    <ul><li>Record day-to-day expenses.</li><li>Organise spending with categories.</li><li>Review spending alongside recurring commitments.</li><li>Use spending information in planning views.</li></ul>
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/budget-planner/">Budget planner</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link> · <Link href="/receipt-manager/">Receipt manager</Link></p>
  </div></main>;
}