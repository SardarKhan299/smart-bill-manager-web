import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Cash-Flow Forecast for Household Finances",
  description: "Look ahead at household bills, spending and financial commitments with cash-flow forecasting in Smart Bill Manager.",
  alternates: { canonical: "/cash-flow-forecast/" },
};

const faq = [
  { question: "What is a household cash-flow forecast?", answer: "A household cash-flow forecast is a forward-looking view of recorded money movements and commitments that can help you review what may be coming next." },
  { question: "What can Smart Bill Manager include in planning?", answer: "Its planning views can use recorded bills, subscriptions, recurring expenses and other relevant financial commitments." },
  { question: "Is a forecast guaranteed to predict my future balance?", answer: "No. A forecast is based on the records and assumptions entered into the app and should be treated as a planning aid rather than a guaranteed future balance." },
];

export default function Page() {
  return <main className="page seo-page"><SeoFaqJsonLd items={faq}/><Breadcrumbs items={[{name:"Cash-Flow Forecast"}]}/><div className="container prose">
    <div className="kicker">CASH-FLOW FORECAST</div>
    <h1>See what may be coming before it arrives.</h1>
    <p className="lead">Smart Bill Manager's cash-flow forecasting helps you look ahead across bills, recurring expenses and planned spending so upcoming financial pressure points are easier to spot.</p>
    <h2>Turn recorded commitments into a forward view</h2>
    <p>Upcoming bills, subscriptions and recurring expenses can be reviewed together as part of a forward-looking household plan.</p>
    <h2>Use a forecast for household planning</h2>
    <ul><li>Review upcoming recorded commitments.</li><li>Consider recurring household costs.</li><li>Look ahead before a larger planned expense.</li><li>Explore potential changes with what-if planning.</li></ul>
    <h2>Example: prepare for a month with extra costs</h2>
    <p>If a regular month includes an additional planned purchase, a forward view can help you consider how that expense fits alongside bills and recurring spending already recorded.</p>
    <h2>Forecasts are planning tools</h2>
    <p>A forecast depends on the information you enter and may not include every future transaction or change. Use your actual accounts and obligations as the source of truth.</p>
    <h2>Keep household planning local-first</h2>
    <p>Smart Bill Manager is designed as a local-first household finance app. Your financial records are intended to stay on your device, with no account or cloud database required for the core record-keeping experience.</p>
    <h2>Frequently asked questions</h2>
    {faq.map((item) => <section className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link></p>
  </div></main>;
}