import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";

export const metadata = {
  title: "Budget Planner for Household Spending",
  description: "Plan household spending with budgets, forecasts and what-if tools in Smart Bill Manager.",
  alternates: { canonical: "/budget-planner/" },
};

export default function Page() {
  return <main className="page seo-page"><Breadcrumbs items={[{name:"Budget Planner"}]}/><div className="container prose">
    <div className="kicker">BUDGET PLANNER</div>
    <h1>Plan household spending with more context.</h1>
    <p className="lead">Smart Bill Manager brings budgets, everyday expenses and upcoming commitments together to support forward-looking household planning.</p>
    <h2>Set up practical spending plans</h2>
    <p>Use category budgets and recorded spending to keep an organised view of planned household expenses.</p>
    <h2>Look ahead before you spend</h2>
    <p>Forecasting and what-if tools let you explore how upcoming expenses can affect your plan.</p>
    <h2>Use budgets with the rest of your financial picture</h2>
    <ul><li>Track category budgets.</li><li>Review spending against your plan.</li><li>Consider upcoming bills and recurring commitments.</li><li>Explore potential changes with what-if planning.</li></ul>
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link></p>
  </div></main>;
}