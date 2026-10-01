import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Bill Tracker & Bill Reminder App",
  description: "Track household bills, due dates and recurring commitments with Smart Bill Manager for Android.",
  alternates: { canonical: "/bill-tracker/" },
};

const faq = [
  { question: "What is a household bill tracker?", answer: "A household bill tracker keeps bill amounts, due dates and recurring commitments organised so upcoming payments are easier to review." },
  { question: "Can Smart Bill Manager track recurring bills?", answer: "Yes. Smart Bill Manager lets you record recurring bills and use those commitments in its household planning views." },
  { question: "Does a bill tracker replace my bank balance?", answer: "No. Smart Bill Manager is a planning and record-keeping tool. It does not replace your bank or provide an authorised bank balance." },
];

export default function Page() {
  return <main className="page seo-page"><SeoFaqJsonLd items={faq}/><Breadcrumbs items={[{name:"Bill Tracker"}]}/><div className="container prose">
    <div className="kicker">BILL TRACKER</div>
    <h1>Keep every household bill in view.</h1>
    <p className="lead">Smart Bill Manager is a bill tracking app for recording household bills, due dates and recurring commitments in one place.</p>
    <div className="seo-callout"><strong>Why use a bill tracker?</strong><p>Recording amounts and due dates gives you a clearer view of upcoming household commitments instead of relying on scattered notes or memory.</p></div>
    <h2>What you can track</h2>
    <ul><li>Monthly and recurring household bills.</li><li>Bill amounts and due dates.</li><li>Upcoming financial commitments.</li><li>Bill information used alongside planning features.</li></ul>
    <h2>How the bill tracker fits into planning</h2>
    <p>Add your relevant bills and review them with subscriptions, expenses and other commitments. Bill information can contribute to Smart Bill Manager's planning and Safe-to-Spend views.</p>
    <h2>Example: prepare for a busy month</h2>
    <p>If several household payments are due during the same month, keeping their dates and amounts together can make the upcoming commitments easier to review before you spend.</p>
    <h2>Built for private household records</h2>
    <p>Smart Bill Manager is designed as a local-first household finance app. Your financial records are intended to stay on your device; no account or cloud database is required for the core record-keeping experience.</p>
    <h2>Frequently asked questions</h2>
    {faq.map((item) => <section className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/subscription-tracker/">Subscription tracker</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link> · <Link href="/blog/how-to-track-monthly-bills/">Guide: how to track monthly bills</Link> · <Link href="/blog/household-bill-checklist/">Household bill checklist</Link> · <Link href="/tools/bill-calculator/">Bill Calculator</Link></p>
  </div></main>;
}