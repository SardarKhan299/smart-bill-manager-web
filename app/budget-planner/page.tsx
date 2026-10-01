import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Budget Planner for Household Spending",
  description: "Plan household spending with budgets, forecasts and what-if tools in Smart Bill Manager.",
  alternates: { canonical: "/budget-planner/" },
};

const faq = [
  { question: "What is a household budget planner?", answer: "A household budget planner helps organise planned spending by category and compare it with recorded expenses and upcoming commitments." },
  { question: "Can I use bills in my budget planning?", answer: "Yes. Smart Bill Manager lets you consider bills and recurring commitments alongside category budgets and spending records." },
  { question: "Does Smart Bill Manager support what-if planning?", answer: "Yes. Its what-if planning features are designed to help explore how potential expenses or changes may affect your household plan." },
];

export default function Page() {
  return <main className="page seo-page"><SeoFaqJsonLd items={faq}/><Breadcrumbs items={[{name:"Budget Planner"}]}/><div className="container prose">
    <div className="kicker">BUDGET PLANNER</div>
    <h1>Plan household spending with more context.</h1>
    <p className="lead">Smart Bill Manager is a household budget planner that brings category budgets, everyday expenses and upcoming commitments into one planning view.</p>
    <h2>Set practical category budgets</h2>
    <p>Use category budgets and recorded spending to keep an organised view of planned household expenses.</p>
    <h2>Compare your plan with real spending</h2>
    <p>Review recorded expenses alongside your budget so your plan has context from what you have already spent.</p>
    <h2>Look ahead before you spend</h2>
    <p>Forecasting and what-if tools let you explore how upcoming expenses and potential changes can affect your plan.</p>
    <h2>Example: plan around upcoming commitments</h2>
    <p>When a month includes regular bills plus an unusual purchase, looking at budgets and upcoming commitments together can help you understand the effect on the rest of your planned spending.</p>
    <h2>Private, local-first household planning</h2>
    <p>Smart Bill Manager is designed as a local-first household finance app. Your financial records are intended to stay on your device, with no account or cloud database required for the core record-keeping experience.</p>
    <h2>Frequently asked questions</h2>
    {faq.map((item) => <section className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link> · <Link href="/blog/household-budget-guide/">Guide: household budgeting</Link></p>
  </div></main>;
}