import { ProblemLanding } from "../problem-page";

export const metadata = {
  title: "Bill Reminder App for Android – Never Pay Late Fees",
  description: "Get reliable offline bill due-date reminders, 1-tap preset bill entry and home-screen widgets on Android with Smart Bill Manager.",
  keywords: ["bill reminder app", "monthly bill due date reminder", "offline bill reminder android", "bill payment tracker", "home screen bill widget"],
  alternates: { canonical: "/bill-reminder-app/" },
  openGraph: {
    title: "Bill Reminder App for Android | Smart Bill Manager",
    description: "Reliable offline bill due-date alerts, 1-tap preset bills and a Material You home-screen widget.",
    url: "/bill-reminder-app/",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager bill reminder app" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bill Reminder App for Android | Smart Bill Manager",
    description: "Reliable offline bill due-date alerts, 1-tap preset bills and a Material You home-screen widget.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <ProblemLanding
      route="add-bill"
      breadcrumbName="Bill Reminder App"
      kicker="BILL DUE-DATE REMINDERS"
      title="Never forget a monthly bill or pay another avoidable late fee."
      lead="Track rent, electricity, internet, credit cards and recurring subscriptions with timely offline due-date alerts and a 1-tap home-screen widget."
      painCalloutTitle="One missed due date costs more than a full year of organization"
      painCalloutBody="Juggling rent, utilities, phone bills and card due dates in your head or calendar leads to stressful late fees. Smart Bill Manager keeps every upcoming due date front and center."
      bulletsHeading="Why people use Smart Bill Manager for bill reminders"
      bullets={[
        "1-tap preset bill entry for Rent, Utilities, Internet, Phone and Subscriptions.",
        "Offline due-date reminders and optional Android Calendar sync.",
        "Home-screen Bills widget so you can check upcoming due dates and mark bills paid in 1 tap.",
        "Instant Safe-to-Spend total showing what remains after upcoming bills are covered.",
      ]}
      sections={[
        {
          heading: "Mark bills paid right from your home screen",
          body: "With the Material You Upcoming Bills widget, you see what is due next without even opening the app — and mark a bill paid in a single tap.",
        },
        {
          heading: "Works offline across 15+ languages and currencies",
          body: "Whether you track bills in USD, EUR, GBP, IDR, PKR, INR or BRL, your reminders fire reliably on-device with no bank sync required.",
        },
      ]}
      openLabel="Add Your First Bill in App"
      faq={[
        {
          question: "Do bill reminders work when my phone is offline?",
          answer: "Yes. Due-date notifications are scheduled locally on your Android device so they work even without an internet connection.",
        },
        {
          question: "Can I track recurring monthly and annual bills?",
          answer: "Yes. Smart Bill Manager supports weekly, monthly, quarterly and yearly recurring schedules so bills roll forward automatically.",
        },
        {
          question: "Is there a home-screen widget for upcoming bills?",
          answer: "Yes. You can add the Upcoming Bills widget to your Android home screen and mark bills paid with one tap.",
        },
      ]}
      relatedLinks={[
        { href: "/bills/", label: "Open Bills Deep Link" },
        { href: "/bill-tracker/", label: "Bill tracker" },
        { href: "/offline-budget-app/", label: "Offline budget app" },
        { href: "/tools/bill-calculator/", label: "Bill calculator" },
      ]}
    />
  );
}
