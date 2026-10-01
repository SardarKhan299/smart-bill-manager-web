import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Receipt & Warranty Manager",
  description: "Organise purchase records, receipts and warranty information with Smart Bill Manager.",
  alternates: { canonical: "/receipt-manager/" },
};

const faq = [
  { question: "What is a receipt manager?", answer: "A receipt manager keeps purchase and receipt information organised so records are easier to find when you need them." },
  { question: "Can Smart Bill Manager store warranty information?", answer: "Yes. Smart Bill Manager supports warranty-related information alongside purchase records." },
  { question: "Does receipt scanning work for every receipt?", answer: "Receipt scanning and extracted information depend on the current app experience and the receipt provided, so extracted details should be checked before relying on them." },
];

export default function Page() {
  return <main className="page seo-page"><SeoFaqJsonLd items={faq}/><Breadcrumbs items={[{name:"Receipt & Warranty Manager"}]}/><div className="container prose">
    <div className="kicker">RECEIPTS & WARRANTIES</div>
    <h1>Keep receipts, purchases and warranties organised.</h1>
    <p className="lead">Smart Bill Manager is a receipt and warranty manager for keeping purchase records, receipt information and warranty details together with your household finance records.</p>
    <h2>Keep purchase records together</h2>
    <p>Organise important purchase information so it is easier to find when you need a receipt, purchase detail or warranty information.</p>
    <h2>Scan receipts where supported</h2>
    <p>The app includes receipt scanning and extracted-information features where supported by the current app experience. Review extracted details for accuracy.</p>
    <h2>Keep warranty information with the purchase</h2>
    <p>Store warranty-related information with purchase records instead of relying on scattered paper receipts or separate notes.</p>
    <h2>Example: keep a warranty record after a purchase</h2>
    <p>After buying a household item, keeping its purchase details, receipt information and warranty data together can make the record easier to find later if you need to check return or warranty information.</p>
    <h2>Designed for private household records</h2>
    <p>Smart Bill Manager is designed as a local-first household finance app. Your financial records are intended to stay on your device, with no account or cloud database required for the core record-keeping experience.</p>
    <h2>Frequently asked questions</h2>
    {faq.map((item) => <section className="faq-item" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></section>)}
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/features/">All features</Link> · <Link href="/support/">Support</Link> · <Link href="/blog/receipt-and-warranty-guide/">Guide: receipts and warranties</Link> · <Link href="/blog/receipt-retention-warranty-guide/">Receipt retention & warranty guide</Link> · <Link href="/expense-tracker/">Expense tracker</Link></p>
  </div></main>;
}