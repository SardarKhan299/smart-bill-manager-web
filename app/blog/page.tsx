import Link from "next/link";

export const metadata={title:"Money Management Guides",description:"Practical guides for tracking household bills, subscriptions, spending, budgets, receipts and Safe-to-Spend planning with Smart Bill Manager.",alternates:{canonical:"/blog/"}};

const posts=[
["how-to-track-monthly-bills","How to Track Monthly Bills Without Missing Due Dates","A practical way to organise recurring household bills and keep upcoming commitments visible."],
["safe-to-spend-vs-bank-balance","Safe-to-Spend vs Bank Balance: What Is the Difference?","Why your current bank balance may not represent the amount you can comfortably spend."],
["how-to-track-subscriptions","How to Track Subscriptions and Understand Their Real Cost","A simple approach to recurring subscriptions, renewal dates and annualised costs."],
["household-budget-guide","How to Build a Simple Household Budget","A practical framework for combining recurring commitments, everyday spending and savings goals."],
["recurring-expense-guide","How to Find Recurring Expenses You May Have Forgotten","How repeated expenses can be identified and reviewed before they become overlooked commitments."],
["receipt-and-warranty-guide","How to Organise Receipts and Warranties","Keep proof of purchase, return deadlines and warranty information easier to find."]
];

export default function Blog(){return <main className="page"><div className="container"><div className="section-head"><div className="kicker">RESOURCES</div><h1>Practical guides for everyday household money management.</h1><p className="lead">Straightforward guides covering bills, subscriptions, spending, budgeting, planning and household records.</p></div><div className="grid-3">{posts.map(([slug,title,description],i)=><article className="card" key={slug}><div className="feature-icon">{String(i+1).padStart(2,"0")}</div><h2 className="card-title">{title}</h2><p>{description}</p><p className="related"><Link href={"/blog/"+slug+"/"}>Read guide →</Link></p></article>)}</div><div className="dark cta blog-cta"><div className="kicker">SMART BILL MANAGER</div><h2>Put the ideas into practice.</h2><p className="lead">Track bills, subscriptions, expenses and financial commitments in one Android app.</p><Link className="btn btn-secondary" href="/download/">Download the app</Link></div></div></main>}