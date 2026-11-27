import { ProblemLanding } from "../problem-page";

export const metadata = {
  title: "Warranty Tracker App & Receipt Vault for Android",
  description: "Never lose a paper receipt or miss a warranty expiry again. Store product warranties and receipts offline on Android with Smart Bill Manager.",
  alternates: { canonical: "/warranty-tracker/" },
};

export default function Page() {
  return (
    <ProblemLanding
      route="warranties"
      breadcrumbName="Warranty Tracker"
      kicker="OFFLINE WARRANTY VAULT"
      title="Stop losing paper receipts right before a warranty claim."
      lead="Store electronics, appliance and household purchase receipts alongside automatic warranty expiry reminders — 100% offline on your Android phone."
      painCalloutTitle="Why paper receipts fail when you need them most"
      painCalloutBody="Thermal receipts fade in drawers, emails get buried and warranties expire silently. Keeping receipt photos and expiry dates in one searchable Warranty Vault saves hundreds when an item breaks."
      bulletsHeading="What you can store in Warranty Vault"
      bullets={[
        "Appliances, laptops, phones, furniture and home electronics with purchase dates.",
        "Attached receipt photos captured via camera or gallery.",
        "Automatic expiry countdowns and timely alerts before coverage ends.",
        "Instant search across all warranties, bills and receipts on your device.",
      ]}
      sections={[
        {
          heading: "Snap the receipt once, find it years later",
          body: "Right after buying a phone, TV or kitchen appliance, scan the receipt into Smart Bill Manager. The purchase date, price, merchant and warranty expiry stay linked together offline.",
        },
        {
          heading: "Private local storage — no cloud account needed",
          body: "Your purchase receipts and serial notes remain on your device rather than a third-party server, with encrypted local backup support whenever you switch phones.",
        },
      ]}
      openLabel="Open Warranty Vault in App"
      faq={[
        {
          question: "Can I attach receipt photos to each warranty?",
          answer: "Yes. Smart Bill Manager lets you scan or attach receipt images directly to every warranty record so proof of purchase is always ready.",
        },
        {
          question: "Will the app remind me before a warranty expires?",
          answer: "Yes. You can track expiry dates and review upcoming expiring warranties before your return or coverage window closes.",
        },
        {
          question: "Are my receipts uploaded to the cloud?",
          answer: "No. Core warranty and receipt records are stored locally on your Android device with no account required.",
        },
      ]}
      relatedLinks={[
        { href: "/offline-receipt-scanner/", label: "Offline receipt scanner" },
        { href: "/receipt-manager/", label: "Receipt manager" },
        { href: "/warranties/", label: "Open Warranty Vault" },
        { href: "/download/", label: "Download app" },
      ]}
    />
  );
}
