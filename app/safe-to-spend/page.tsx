import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Safe-to-Spend Money Planner",
  description: "See a clearer view of what you may be able to spend after considering relevant household financial commitments.",
  alternates: { canonical: "/safe-to-spend/" },
};

const faq = [
  { question: "What does Safe-to-Spend mean?", answer: "Safe-to-Spend is a planning view that considers relevant recorded commitments rather than treating the current bank balance as the same thing as freely available spending money." },
  { question: "Is Safe-to-Spend my bank balance?", answer: "No. Safe-to-Spend is a planning calculation based on the financial records and commitments you enter into Smart Bill Manager; it is not an authorised bank balance." },
  { question: "Can I test a potential purchase?", answer: "Yes. Smart Bill Manager includes what-if planning so you can explore how a potential expense may affect your household plan." },
];

export default function Page() {
  return <main className="page seo-page"><SeoFaqJsonLd items={faq}/><Breadcrumbs items={[{name:"Safe-to-Spend"}]}/><div className="container prose">
    <div className="kicker">SAFE-TO-SPEND</div>
    <h1>Know what you can safely spend.</h1>
    <p className="lead">Smart Bill Manager's Safe-to-Spend view helps you consider upcoming commitments before treating your current balance as available spending money.</p>
    <div className="seo-callout"><strong>Balance is not the whole picture.</strong><p>Money shown in a current balance may already be needed for upcoming bills, recurring costs or planned spending.</p></div>
    <h2>How Safe-to-Spend works</h2>
    <p>Safe-to-Spend is designed to consider relevant financial commitments recorded in the app and present a clearer planning view. The result depends on the records and assumptions you enter.</p>
    <h2>See the factors behind the number</h2>
    <p>Smart Bill Manager is designed around transparent calculations, so the Safe-to-Spend concept can be understood in relation to the records and commitments you have entered.</p>
    <h2>Test a potential expense</h2>
    <p>Use what-if planning to explore how a potential purchase or expense may affect your household plan before making a decision.</p>
    <h2>Example: avoid spending money already committed</h2>
    <p>If your current balance includes money needed for several upcoming bills, reviewing those commitments before making a discretionary purchase can give you a more useful planning view than the balance alone.</p>
    <h2>Important limitation</h2>
    <p>Safe-to-Spend is a planning aid, not financial advice and not a bank-authorised available-balance figure. Keep your bank account and actual obligations as the source of truth for financial decisions.</p>
    <h2>Frequently asked questions</h2>
    {faq.map((item) => <section className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
    <p><Link className="btn btn-primary" href="/download/">Try Smart Bill Manager</Link></p>
    <p className="related"><Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link> · <Link href="/blog/safe-to-spend-vs-bank-balance/">Guide: Safe-to-Spend vs bank balance</Link> · <Link href="/blog/how-safe-to-spend-is-calculated/">How Safe-to-Spend is calculated</Link> · <Link href="/tools/safe-to-spend-calculator/">Safe-to-Spend Calculator</Link></p>
  </div></main>;
}