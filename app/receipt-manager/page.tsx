import Link from "next/link";

export const metadata = {
  title: "Receipt & Warranty Manager",
  description: "Organise purchase records, receipts and warranty information with Smart Bill Manager.",
  alternates: { canonical: "/receipt-manager/" },
};

export default function Page() {
  return <main className="page seo-page"><div className="container prose">
    <div className="kicker">RECEIPTS & WARRANTIES</div>
    <h1>Keep receipts, purchases and warranties organised.</h1>
    <p className="lead">Smart Bill Manager brings purchase records, receipt information and warranty details into your household finance workspace.</p>
    <h2>Keep purchase records together</h2>
    <p>Organise important purchase information so it is easier to find when you need it.</p>
    <h2>Use receipt intelligence where supported</h2>
    <p>The app includes receipt scanning and extracted information features where supported by the current app experience.</p>
    <h2>Stay aware of warranty information</h2>
    <p>Store warranty-related information with purchase records instead of relying on scattered paper receipts or separate notes.</p>
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/expense-tracker/">Expense tracker</Link> · <Link href="/features/">All features</Link> · <Link href="/support/">Support</Link></p>
  </div></main>;
}