import { Breadcrumbs } from "../breadcrumbs";
import Link from "next/link";

export const metadata={title:"Money Management Guides",description:"Practical guides for tracking household bills, subscriptions, spending, budgets, receipts and Safe-to-Spend planning with Smart Bill Manager.",alternates:{canonical:"/blog/"}};

const posts=[
["how-to-track-monthly-bills","How to Track Monthly Bills Without Missing Due Dates","A practical way to organise recurring household bills and keep upcoming commitments visible."],
["household-bill-checklist","Household Bill Checklist: What to Track Each Month","A practical checklist for recurring payments, due dates, changing amounts and monthly planning."],
["safe-to-spend-vs-bank-balance","Safe-to-Spend vs Bank Balance: What Is the Difference?","Why your current bank balance may not represent the amount you can comfortably spend."],
["how-safe-to-spend-is-calculated","How a Safe-to-Spend Planning Calculation Works","Understand the inputs behind a simple Safe-to-Spend planning calculation and its limitations."],
["how-to-track-subscriptions","How to Track Subscriptions and Understand Their Real Cost","A simple approach to recurring subscriptions, renewal dates and annualised costs."],
["subscription-audit-guide","How to Do a Household Subscription Audit","A practical method for reviewing recurring services, renewal dates, price changes and longer-term costs."],
["household-budget-guide","How to Build a Simple Household Budget","A practical framework for combining recurring commitments, everyday spending and savings goals."],
["budget-vs-expense-tracker","Budget Planner vs Expense Tracker: What Each One Does","Understand the difference between planning a household budget and recording actual everyday expenses."],
["monthly-expense-categories","Monthly Expense Categories for a Household Budget","A practical way to organise everyday household spending into useful monthly expense categories."],
["household-cash-flow-planning","How to Plan Household Cash Flow","A practical guide to looking ahead at household income, bills, recurring expenses and planned spending."],
["recurring-expense-guide","How to Find Recurring Expenses You May Have Forgotten","How repeated spending patterns can be identified and reviewed before they become overlooked commitments."],
["recurring-expense-audit","How to Audit Recurring Household Expenses","A practical recurring-expense audit for finding repeated spending patterns and deciding what to monitor."],
["receipt-and-warranty-guide","How to Organise Receipts and Warranties","Keep proof of purchase, return deadlines and warranty information easier to find."],
["receipt-retention-warranty-guide","How Long to Keep Receipts and Warranty Records","A practical way to organise receipts, proof of purchase, return information and warranty records."]
];

export default function Blog(){return <main className="page"><Breadcrumbs items={[{"name":"Blog"}]}/><div className="container"><div className="section-head"><div className="kicker">RESOURCES</div><h1>Practical guides for everyday household money management.</h1><p className="lead">Straightforward guides covering bills, subscriptions, spending, budgeting, planning and household records.</p></div><div className="grid-3">{posts.map(([slug,title,description],i)=><article className="card" key={slug}><div className="feature-icon">{String(i+1).padStart(2,"0")}</div><h2 className="card-title">{title}</h2><p>{description}</p><p className="related"><Link href={"/blog/"+slug+"/"}>Read guide →</Link></p></article>)}</div><div className="dark cta blog-cta"><div className="kicker">SMART BILL MANAGER</div><h2>Put the ideas into practice.</h2><p className="lead">Track bills, subscriptions, expenses and financial commitments in one Android app.</p><Link className="btn btn-secondary" href="/download/">Download the app</Link></div></div></main>}