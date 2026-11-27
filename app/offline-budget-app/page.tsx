import { ProblemLanding } from "../problem-page";

export const metadata = {
  title: "Offline Budget App Without Bank Account",
  description: "Track bills, receipts and daily spending on Android with a 100% offline budget app — no bank login, no account required, AES-256 local privacy.",
  keywords: ["offline budget app", "budget app without bank account", "private expense tracker no login", "offline finance app android", "no bank linking budget app"],
  alternates: { canonical: "/offline-budget-app/" },
  openGraph: {
    title: "Offline Budget App Without Bank Account | Smart Bill Manager",
    description: "Track bills, receipts and daily spending on Android 100% offline — no bank login or cloud account required.",
    url: "/offline-budget-app/",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager offline budget app" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offline Budget App Without Bank Account | Smart Bill Manager",
    description: "Track bills, receipts and daily spending on Android 100% offline — no bank login or cloud account required.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <ProblemLanding
      route="bills"
      breadcrumbName="Offline Budget App"
      kicker="100% OFFLINE & PRIVATE FINANCE"
      title="An offline budget app that never asks for your bank login."
      lead="Track household bills, daily expenses, subscriptions and Safe-to-Spend on Android without creating an account or syncing sensitive finances to the cloud."
      painCalloutTitle="Tired of finance apps demanding bank passwords?"
      painCalloutBody="Most budgeting apps force you to link bank credentials, create an online profile and upload your transaction history. Smart Bill Manager keeps your financial records strictly on your device."
      bulletsHeading="What works 100% offline"
      bullets={[
        "Bill due-date reminders, recurring schedules and Safe-to-Spend overview.",
        "On-device AI receipt scanning (OCR) without uploading receipt photos to external servers.",
        "Daily cash expense logging, warranty vault, debt tracking and category analytics.",
        "Optional biometric/PIN app lock and encrypted local backups.",
      ]}
      sections={[
        {
          heading: "Zero account setup — start in seconds",
          body: "Open Smart Bill Manager and add your first bill or receipt immediately. There is no email sign-up wall, no bank-aggregation token and no cloud database holding your household spending.",
        },
        {
          heading: "Built for real privacy on Android",
          body: "Your bills, receipts and cash log stay on your Android phone with AES-256 local backup encryption and optional fingerprint or PIN lock so only you can view your numbers.",
        },
      ]}
      openLabel="Open Offline Budget in App"
      faq={[
        {
          question: "Do I need to link my bank account to use Smart Bill Manager?",
          answer: "No. Smart Bill Manager never asks for bank logins or open-banking credentials. You record bills, receipts and cash expenses directly on your device.",
        },
        {
          question: "Does Smart Bill Manager work completely offline?",
          answer: "Yes. Core bill tracking, due-date reminders, daily cash logging, warranty vault and on-device OCR receipt scanning all work offline.",
        },
        {
          question: "Can I protect my financial records with a lock screen?",
          answer: "Yes. You can enable biometric or PIN app lock inside Settings so your bills and receipts stay private.",
        },
      ]}
      relatedLinks={[
        { href: "/bill-reminder-app/", label: "Bill reminder app" },
        { href: "/offline-receipt-scanner/", label: "Offline receipt scanner" },
        { href: "/safe-to-spend/", label: "Safe-to-Spend" },
        { href: "/privacy/", label: "Privacy policy" },
      ]}
    />
  );
}
