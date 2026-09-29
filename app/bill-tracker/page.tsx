import Link from "next/link";

export const metadata = {
  title: "Bill Tracker & Bill Reminder App",
  description: "Track household bills, due dates and recurring commitments with Smart Bill Manager for Android.",
  alternates: { canonical: "/bill-tracker/" },
};

export default function Page() {
  return <main className="page seo-page"><div className="container prose">
    <div className="kicker">BILL TRACKER</div>
    <h1>Keep every household bill in view.</h1>
    <p className="lead">Smart Bill Manager helps you organise bills, due dates and recurring financial commitments so you can see what is coming up.</p>
    <div className="seo-callout"><strong>Why use a bill tracker?</strong><p>Important household payments are easier to manage when their amounts, dates and recurring patterns are recorded in one place.</p></div>
    <h2>Track bills and due dates</h2>
    <p>Add the bills that matter to your household and keep upcoming commitments visible alongside your other financial records.</p>
    <h2>See bills in the bigger picture</h2>
    <p>Bill information can contribute to Smart Bill Manager's planning and Safe-to-Spend views, helping you consider upcoming commitments rather than looking only at a current balance.</p>
    <h2>Built for everyday household use</h2>
    <ul><li>Record recurring bills and commitments.</li><li>Keep due dates organised.</li><li>Review upcoming financial pressure points.</li><li>Use bill information with planning features.</li></ul>
    <p><Link className="btn btn-primary" href="/download/">Download Smart Bill Manager</Link></p>
    <p className="related"><Link href="/subscription-tracker/">Subscription tracker</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/safe-to-spend/">Safe-to-Spend</Link></p>
  </div></main>;
}