import Link from "next/link";

export const metadata = {
  title: "Safe-to-Spend Money Planner",
  description: "See a clearer view of what you may be able to spend after considering relevant household financial commitments.",
  alternates: { canonical: "/safe-to-spend/" },
};

export default function Page() {
  return <main className="page seo-page"><div className="container prose">
    <div className="kicker">SAFE-TO-SPEND</div>
    <h1>Know what you can safely spend.</h1>
    <p className="lead">A current bank balance does not always show the money already committed to upcoming bills and planned spending. Smart Bill Manager puts those factors into a clearer planning view.</p>
    <h2>Look beyond today's balance</h2>
    <p>Safe-to-Spend is designed to consider relevant financial commitments when presenting an available-spending view.</p>
    <h2>See the factors behind the number</h2>
    <p>Smart Bill Manager is designed around transparent calculations, so the Safe-to-Spend concept can be understood in relation to the records and commitments you have entered.</p>
    <h2>Explore spending scenarios</h2>
    <p>Use what-if planning to explore how a potential expense can affect your household plan before you make a decision.</p>
    <p><Link className="btn btn-primary" href="/download/">Try Smart Bill Manager</Link></p>
    <p className="related"><Link href="/bill-tracker/">Bill tracker</Link> · <Link href="/budget-planner/">Budget planner</Link> · <Link href="/cash-flow-forecast/">Cash-flow forecast</Link></p>
  </div></main>;
}