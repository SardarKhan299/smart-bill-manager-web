import Link from "next/link";
import { Breadcrumbs } from "../breadcrumbs";
import { OpenInAppCta, PlayCta } from "../conversion-cta";
import { SeoFaqJsonLd } from "../seo-faq";

export const metadata = {
  title: "Receipt & Warranty Manager — Private Proof-of-Purchase Vault",
  description:
    "Organise purchase records, scanned paper receipts and warranty expiry dates locally on Android with Smart Bill Manager.",
  keywords: [
    "receipt and warranty manager",
    "proof of purchase app android",
    "offline receipt organiser",
    "warranty expiry tracker",
  ],
  alternates: { canonical: "/receipt-manager/" },
  openGraph: {
    title: "Receipt & Warranty Manager | Smart Bill Manager",
    description:
      "Keep scanned receipts, purchase details and warranty expiry reminders together privately on Android.",
    url: "/receipt-manager/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Receipt & Warranty Manager" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Receipt & Warranty Manager | Smart Bill Manager",
    description:
      "Store receipts, return windows and warranty records locally on your Android phone.",
    images: ["/og-image.svg"],
  },
};

const faq = [
  {
    question: "What is a receipt and warranty manager?",
    answer:
      "It keeps proof-of-purchase photos, merchant details, return windows and warranty expiry dates organised so you can find them quickly when filing a claim.",
  },
  {
    question: "Are receipt images uploaded to cloud servers?",
    answer:
      "No. Smart Bill Manager performs receipt OCR locally on your Android device and stores receipt images in local app storage.",
  },
  {
    question: "Should I double-check OCR-extracted totals and dates?",
    answer:
      "Yes. Thermal paper quality varies, so you can review and edit extracted merchant, amount and date fields before saving.",
  },
];

export default function Page() {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: "Receipt & Warranty Manager" }]} />
      <div className="container prose">
        <div className="kicker">RECEIPTS &amp; WARRANTIES</div>
        <h1>Keep receipts, purchases and warranties organised.</h1>
        <p className="lead">
          Smart Bill Manager keeps purchase records, scanned receipts and warranty expiry dates together locally on your Android phone.
        </p>
        <h2>Scan receipts locally on your device</h2>
        <p>
          Capture fading thermal receipts right after buying electronics or appliances, review extracted details, and attach them to the purchase record.
        </p>
        <h2>Keep warranty dates with proof of purchase</h2>
        <p>
          Store warranty expiry reminders alongside the receipt photo and serial/model notes instead of hunting through drawers months later.
        </p>
        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <div className="actions">
          <OpenInAppCta route="scan" placement="receipt-manager-open" label="Open Receipt Scanner in App" />
          <PlayCta placement="receipt-manager-play" label="Download on Google Play" secondary />
        </div>
        <p className="related">
          <Link href="/offline-receipt-scanner/">Offline AI receipt scanner</Link> ·{" "}
          <Link href="/warranty-tracker/">Warranty vault</Link> ·{" "}
          <Link href="/expense-tracker/">Expense tracker</Link> ·{" "}
          <Link href="/blog/receipt-and-warranty-guide/">Guide: receipts and warranties</Link> ·{" "}
          <Link href="/blog/receipt-retention-warranty-guide/">Receipt retention &amp; warranty guide</Link>
        </p>
      </div>
    </main>
  );
}
