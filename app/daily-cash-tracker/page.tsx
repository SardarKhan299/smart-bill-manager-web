import { ProblemLanding } from "../problem-page";

export const metadata = {
  title: "Daily Cash Expense Tracker & Offline Cashbook",
  description: "Log daily cash spending in 3 seconds, build no-spend streaks and track everyday expenses offline on Android with Smart Bill Manager.",
  keywords: ["daily cash expense tracker", "offline cashbook app", "no spend day tracker", "cash spending log android", "private daily expense tracker"],
  alternates: { canonical: "/daily-cash-tracker/" },
  openGraph: {
    title: "Daily Cash Expense Tracker & Offline Cashbook | Smart Bill Manager",
    description: "Log daily cash spending in 3 seconds, build no-spend streaks and export PDF/CSV statements offline.",
    url: "/daily-cash-tracker/",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager daily cash tracker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Cash Expense Tracker & Offline Cashbook | Smart Bill Manager",
    description: "Log daily cash spending in 3 seconds, build no-spend streaks and export PDF/CSV statements offline.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <ProblemLanding
      route="cash-log"
      breadcrumbName="Daily Cash Tracker"
      kicker="DAILY CASH LOG & STREAKS"
      title="See where your everyday cash actually goes — in 3 seconds a day."
      lead="Bank apps miss cash purchases completely. Smart Bill Manager gives you a fast offline Daily Cash Log, Quick Cash home-screen widget and motivating no-spend streaks."
      painCalloutTitle="Small cash purchases quietly drain monthly budgets"
      painCalloutBody="Coffee, groceries, transport and small cash payments rarely show up in bank statements. Logging them in 3 seconds keeps your Safe-to-Spend balance honest."
      bulletsHeading="Built for fast everyday cash logging"
      bullets={[
        "Quick-entry Daily Cash Log with clean categories and instant monthly totals.",
        "Home-screen Quick Cash widget for 1-tap logging on the go.",
        "Daily No-Spend Day streak tracker that rewards consistency with bonus free OCR scans.",
        "Combined Analytics charts showing both fixed bills and daily cash spending together.",
      ]}
      sections={[
        {
          heading: "Reward yourself for no-spend days",
          body: "Had a day with zero discretionary cash spending? Mark a No-Spend Day in one tap, build your streak and unlock bonus offline AI receipt scans on Day 3.",
        },
        {
          heading: "Export clean PDF or CSV statements anytime",
          body: "Need a monthly record for personal budgeting or tax prep? Export your bills and daily cash log to PDF or CSV directly from Analytics.",
        },
      ]}
      openLabel="Open Daily Cash Log in App"
      faq={[
        {
          question: "Why track daily cash separately from bills?",
          answer: "Fixed bills are predictable, while daily cash spending fluctuates every day. Tracking both in one app shows your true remaining Safe-to-Spend balance.",
        },
        {
          question: "Does the Daily Cash Log work offline?",
          answer: "Yes. Every cash entry is saved instantly to your local on-device database with no internet or account required.",
        },
        {
          question: "Can I export my daily cash log?",
          answer: "Yes. Smart Bill Manager supports exporting clean PDF and CSV financial statements from the Analytics tab.",
        },
      ]}
      relatedLinks={[
        { href: "/cash-log/", label: "Open Cash Log Deep Link" },
        { href: "/expense-tracker/", label: "Expense tracker" },
        { href: "/offline-receipt-scanner/", label: "Offline receipt scanner" },
        { href: "/safe-to-spend/", label: "Safe-to-Spend" },
      ]}
    />
  );
}
