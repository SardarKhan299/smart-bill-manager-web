import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Expense Tracker for Everyday Spending",
  description: "Record everyday expenses and understand household spending with Smart Bill Manager for Android.",
  alternates: { canonical: "/expense-tracker/" },
};

const faq = [
  { question: "What is an expense tracker?", answer: "An expense tracker records everyday spending so household purchases can be reviewed by category and alongside other financial commitments." },
  { question: "Can Smart Bill Manager organise expenses by category?", answer: "Yes. Smart Bill Manager supports expense categories so recorded spending can be reviewed in a more organised way." },
  { question: "Does an expense tracker connect to my bank?", answer: "Smart Bill Manager is designed for manual/local-first financial records and does not require a bank connection for its core expense tracking." },
];

export default function Page() {
  return <main className="page seo-page"><SeoFaqJsonLd items={faq}/><Breadcrumbs items={[{name:"Expense Tracker"}]}/><div className="container prose">
    <div className="kicker">EXPENSE TRACKER</div>
    <h1>Understand where your household money is going.</h1>
    <p className="lead">Smart Bill Manager is an expense tracker for recording everyday household spending and reviewing it alongside bills, subscriptions and budgets.</p>
    <h2>Record everyday household expenses</h2>
    <p>Keep a practical record of purchases and spending so you have more context when reviewing your finances.</p>
    <h2>Organise spending with categories</h2>
    <p>Use categories to make repeated areas of household spending easier to review and compare with your plans.</p>
    <h2>Connect expenses with planning</h2>
    <ul><li>Record day-to-day household expenses.</li><li>Organise spending with categories.</li><li>Review spending alongside recurring commitments.</li><li>Use spending information with budgets and planning views.</li></ul>
    <h2>Example: understand a high-spend month</h2>
    <p>When a month feels more expensive than expected, reviewing recorded expenses by category can help you see where the additional spending occurred.</p>
    <h2>Keep your financial records private</h2>
    <p>Smart Bill Manager is designed as a local-first household finance app. Your financial records are intended to stay on your device, with no account or cloud database required for the core record-keeping experience.</p>
    <h2>Frequently asked questions</h2>
    {faq.map((item) => <section className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/budget-planner/">Budget planner</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link> · <Link href="/receipt-manager/">Receipt manager</Link> · <Link href="/blog/household-budget-guide/">Guide: household budgeting</Link></p>
  </div></main>;
}