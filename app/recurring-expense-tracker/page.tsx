import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Recurring Expense Tracker",
  description: "Find and understand recurring household expenses with Smart Bill Manager.",
  alternates: { canonical: "/recurring-expense-tracker/" },
};

const faq = [
  { question: "What is a recurring expense tracker?", answer: "A recurring expense tracker helps surface spending patterns that repeat over time so ongoing household costs are easier to review." },
  { question: "Can recurring expenses be used in planning?", answer: "Yes. Smart Bill Manager can bring recurring expense patterns into views used to review household commitments and forward planning." },
  { question: "Are recurring expenses the same as subscriptions?", answer: "Not necessarily. A subscription is one type of recurring cost; recurring expense detection can surface repeated spending patterns that may not have been recorded as subscriptions." },
];

export default function Page() {
  return <main className="page seo-page"><SeoFaqJsonLd items={faq}/><Breadcrumbs items={[{name:"Recurring Expense Tracker"}]}/><div className="container prose">
    <div className="kicker">RECURRING EXPENSES</div>
    <h1>Make recurring spending easier to spot.</h1>
    <p className="lead">Smart Bill Manager helps identify and review recurring household expenses so repeated spending does not disappear into day-to-day transactions.</p>
    <h2>Review repeated spending patterns</h2>
    <p>Recurring expense detection can help surface patterns in your recorded spending and bring them into a more useful view.</p>
    <h2>Understand recurring costs beyond subscriptions</h2>
    <p>A recurring expense does not have to be a subscription. Repeated household purchases or other ongoing spending patterns can also matter when reviewing your financial commitments.</p>
    <h2>Connect recurring costs to planning</h2>
    <ul><li>Review detected recurring expense patterns.</li><li>Understand repeated household costs.</li><li>Consider recurring costs in forward planning.</li><li>Keep financial records organised in one app.</li></ul>
    <h2>Example: spot a repeated household cost</h2>
    <p>If the same type of expense appears repeatedly in your recorded spending, recurring-expense insights can make the pattern easier to notice and consider during budgeting.</p>
    <h2>Keep your records local-first</h2>
    <p>Smart Bill Manager is designed as a local-first household finance app. Your financial records are intended to stay on your device, with no account or cloud database required for the core record-keeping experience.</p>
    <h2>Frequently asked questions</h2>
    {faq.map((item) => <section className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/subscription-tracker/">Subscription tracker</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link> · <Link href="/blog/recurring-expense-guide/">Guide: recurring expenses</Link> · <Link href="/blog/recurring-expense-audit/">Recurring expense audit</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link></p>
  </div></main>;
}