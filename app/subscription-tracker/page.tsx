import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Subscription Tracker",
  description: "Track recurring subscriptions, understand recurring costs and stay aware of subscription price changes with Smart Bill Manager.",
  alternates: { canonical: "/subscription-tracker/" },
};

const faq = [
  { question: "What does a subscription tracker do?", answer: "A subscription tracker keeps recurring subscriptions organised so you can review their prices, recurring costs and contribution to household spending." },
  { question: "Can I track subscription price changes?", answer: "Smart Bill Manager includes subscription price-change insights so recorded recurring costs can be reviewed over time." },
  { question: "Can I see the longer-term cost of subscriptions?", answer: "Smart Bill Manager includes longer-term subscription cost insights based on the recurring records you enter." },
];

export default function Page() {
  return <main className="page seo-page"><SeoFaqJsonLd items={faq}/><Breadcrumbs items={[{name:"Subscription Tracker"}]}/><div className="container prose">
    <div className="kicker">SUBSCRIPTION TRACKER</div>
    <h1>Know what your subscriptions cost over time.</h1>
    <p className="lead">Smart Bill Manager is a subscription tracker for organising recurring services and understanding how subscription costs affect household spending.</p>
    <h2>Track recurring subscriptions</h2>
    <p>Record subscription commitments alongside bills and everyday expenses so recurring costs are easier to see in one household finance workspace.</p>
    <h2>Understand recurring, price-change and lifetime cost</h2>
    <ul><li>Review recurring subscription costs.</li><li>See recorded subscription price changes.</li><li>Understand longer-term subscription spend.</li><li>Use subscription information when planning household finances.</li></ul>
    <h2>How it helps with a subscription review</h2>
    <p>Review the subscriptions you have recorded, consider their recurring cost and look at the longer-term impact before deciding which services still belong in your household budget.</p>
    <h2>Example: audit your recurring services</h2>
    <p>Put streaming, software, memberships and other recurring services into one list. A single view makes it easier to notice how many ongoing commitments you are carrying.</p>
    <h2>Keep recurring records private</h2>
    <p>Smart Bill Manager is designed as a local-first household finance app. Your financial records are intended to stay on your device, with no account or cloud database required for the core record-keeping experience.</p>
    <h2>Frequently asked questions</h2>
    {faq.map((item) => <section className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/blog/how-to-track-subscriptions/">Guide: how to track subscriptions</Link> · <Link href="/blog/subscription-audit-guide/">Subscription audit guide</Link> · <Link href="/bill-tracker/">Bill tracker</Link></p>
  </div></main>;
}