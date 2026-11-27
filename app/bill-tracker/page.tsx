import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Bill Tracker & Monthly Bill Organiser App for Android",
  description:
    "Track household bills, due dates and recurring commitments privately with Smart Bill Manager for Android — no bank connection required.",
  keywords: [
    "household bill tracker",
    "monthly bill tracker app",
    "offline bill organiser android",
    "track recurring bills privately",
  ],
  alternates: { canonical: "/bill-tracker/" },
  openGraph: {
    title: "Bill Tracker & Monthly Bill Organiser | Smart Bill Manager",
    description:
      "Keep recurring household bills, due dates and upcoming commitments organised locally on Android.",
    url: "/bill-tracker/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Bill Tracker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bill Tracker & Monthly Bill Organiser | Smart Bill Manager",
    description:
      "Track household bills, due dates and recurring commitments privately on Android.",
    images: ["/og-image.svg"],
  },
};

const faq = [
  {
    question: "What is a household bill tracker?",
    answer:
      "A household bill tracker keeps bill amounts, due dates and recurring commitments organised so upcoming payments are easier to review before you spend.",
  },
  {
    question: "Can Smart Bill Manager track recurring bills offline?",
    answer:
      "Yes. Smart Bill Manager stores recurring bills locally on your Android device, sends local reminders, and includes commitments in Safe-to-Spend planning.",
  },
  {
    question: "Does a bill tracker replace my bank balance?",
    answer:
      "No. Smart Bill Manager is a planning and record-keeping tool. It does not connect to your bank or provide an authorised bank balance.",
  },
];

export default function Page() {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: "Bill Tracker" }]} />
      <div className="container prose">
        <div className="kicker">BILL TRACKER</div>
        <h1>Keep every household bill in view.</h1>
        <p className="lead">
          Smart Bill Manager is a private Android bill tracking app for recording household bills, due dates and recurring commitments in one place.
        </p>
        <div className="seo-callout">
          <strong>Why use a bill tracker?</strong>
          <p>
            Recording amounts and due dates gives you a clearer view of upcoming household commitments instead of relying on scattered notes or memory.
          </p>
        </div>
        <h2>What you can track</h2>
        <ul>
          <li>Monthly, quarterly, annual and custom recurring household bills.</li>
          <li>Expected bill amounts, due dates and paid history.</li>
          <li>Home-screen upcoming bill widgets with 1-tap Mark Paid.</li>
          <li>Bill commitments subtracted automatically in Safe-to-Spend views.</li>
        </ul>
        <h2>Built for private household records</h2>
        <p>
          Smart Bill Manager is designed as a local-first household finance app. Your financial records stay on your device; no bank login or cloud account is required.
        </p>
        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <div className="actions">
          <OpenInAppCta route="bills" placement="bill-tracker-open" label="Open Bills in App" />
          <PlayCta placement="bill-tracker-play" label="Download on Google Play" secondary />
        </div>
        <p className="related">
          <Link href="/bill-reminder-app/">Bill reminder app</Link> ·{" "}
          <Link href="/tools/bill-calculator/">Bill Calculator</Link> ·{" "}
          <Link href="/subscription-tracker/">Subscription tracker</Link> ·{" "}
          <Link href="/safe-to-spend/">Safe-to-Spend</Link> ·{" "}
          <Link href="/blog/how-to-track-monthly-bills/">Guide: how to track monthly bills</Link> ·{" "}
          <Link href="/blog/household-bill-checklist/">Household bill checklist</Link>
        </p>
      </div>
    </main>
  );
}
