import { ProblemLanding } from "../problem-page";

export const metadata = {
  title: "Personal Debt Tracker & Bill Splitter App (Offline)",
  description: "Track who owes you money, manage personal debts, split shared bills and monitor savings goals offline on Android with Smart Bill Manager.",
  keywords: ["personal debt tracker app", "who owes me money app", "offline bill splitter android", "iou tracker offline", "debt repayment reminder app"],
  alternates: { canonical: "/debt-tracker/" },
  openGraph: {
    title: "Personal Debt Tracker & Bill Splitter App | Smart Bill Manager",
    description: "Track who owes you money, split shared household bills and manage debts offline on Android.",
    url: "/debt-tracker/",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager debt tracker and bill splitter" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Debt Tracker & Bill Splitter App | Smart Bill Manager",
    description: "Track who owes you money, split shared household bills and manage debts offline on Android.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <ProblemLanding
      route="bills"
      breadcrumbName="Debt Tracker & Bill Splitter"
      kicker="DEBTS, IOUS & SHARED BILLS"
      title="Keep track of who owes you, personal debts and split bills — without messy notes."
      lead="Replace scattered chat messages and spreadsheets with a private offline Debt Tracker, Bill Splitter and Savings Goals built right into Smart Bill Manager."
      painCalloutTitle="Awkward IOUs and forgotten repayments add up fast"
      painCalloutBody="Splitting rent, utilities or dinner with friends and family gets confusing when amounts live in old chats. Keeping debts, repayments and reminders in one private app keeps everything clear."
      bulletsHeading="What you can organize"
      bullets={[
        "Personal debts (money you owe and money owed to you) with partial payment history.",
        "Timely debt repayment reminders so nothing slips through the cracks.",
        "Built-in Bill Splitter for shared rent, utilities and group expenses.",
        "Savings Goals and Net Worth tracking alongside your monthly bills.",
      ]}
      sections={[
        {
          heading: "All household commitments in one offline app",
          body: "Instead of installing separate apps for bills, IOUs, receipts and savings goals, Smart Bill Manager brings them together in one lightweight, private Android experience.",
        },
        {
          heading: "Your personal debts stay private on your phone",
          body: "No cloud account, no public social feed and no bank login required — lock your records with biometric or PIN protection anytime.",
        },
      ]}
      openLabel="Open Debt Tracker in App"
      faq={[
        {
          question: "Can I track both money I owe and money owed to me?",
          answer: "Yes. Smart Bill Manager's Debt Tracker lets you record balances, log repayments and set reminders in one place.",
        },
        {
          question: "Does it include a bill splitter for shared household bills?",
          answer: "Yes. You can split shared bills and track each person's share alongside your regular monthly bills.",
        },
        {
          question: "Is my debt list synced to any server?",
          answer: "No. Your debt, bill and savings records stay locally on your Android device.",
        },
      ]}
      relatedLinks={[
        { href: "/offline-budget-app/", label: "Offline budget app" },
        { href: "/bill-reminder-app/", label: "Bill reminder app" },
        { href: "/daily-cash-tracker/", label: "Daily cash tracker" },
        { href: "/download/", label: "Download app" },
      ]}
    />
  );
}
