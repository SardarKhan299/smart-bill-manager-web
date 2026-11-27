import { ProblemLanding } from "../problem-page";

export const metadata = {
  title: "Offline AI Receipt Scanner App for Android",
  description: "Scan receipts and bills offline with on-device AI OCR on Android. Extract merchants, totals and due dates privately in Smart Bill Manager.",
  keywords: ["offline receipt scanner", "ai receipt scanner android", "ocr receipt scanner no cloud", "scan receipts to expense tracker", "private receipt scanner app"],
  alternates: { canonical: "/offline-receipt-scanner/" },
  openGraph: {
    title: "Offline AI Receipt Scanner App for Android | Smart Bill Manager",
    description: "Extract merchant names, totals and due dates on-device without uploading receipts to the cloud.",
    url: "/offline-receipt-scanner/",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager offline AI receipt scanner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offline AI Receipt Scanner App for Android | Smart Bill Manager",
    description: "Extract merchant names, totals and due dates on-device without uploading receipts to the cloud.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <ProblemLanding
      route="scan"
      breadcrumbName="Offline Receipt Scanner"
      kicker="ON-DEVICE AI OCR"
      title="Scan receipts in 3 seconds — without uploading them to the cloud."
      lead="Smart Bill Manager extracts merchant names, amounts and due dates right on your Android phone so you can skip manual typing while keeping receipts private."
      painCalloutTitle="Manual expense entry is why people quit finance apps"
      painCalloutBody="Typing every receipt by hand takes too long, while cloud receipt scanners upload your personal purchases to remote servers. On-device OCR gives you speed and privacy together."
      bulletsHeading="How offline receipt scanning helps"
      bullets={[
        "Snap a bill or receipt photo (or pick from your gallery) to auto-fill merchant, total and date.",
        "Review and save straight into Bills, Daily Cash Log or Warranty Vault.",
        "Works offline on your phone — try a free sample receipt or scan your own immediately.",
        "Earn bonus free OCR scans with daily no-spend streaks, or unlock unlimited scans with Pro.",
      ]}
      sections={[
        {
          heading: "From paper bill to scheduled reminder in one tap",
          body: "Scan a utility bill, rent invoice or store receipt and confirm the extracted fields in seconds. Smart Bill Manager turns it into a tracked bill reminder or cash log entry automatically.",
        },
        {
          heading: "Built for accuracy and privacy",
          body: "Because OCR runs locally on your Android device, your receipts never need to leave your phone. You always review extracted numbers before saving.",
        },
      ]}
      openLabel="Open Receipt Scanner in App"
      faq={[
        {
          question: "Does the receipt scanner work without internet?",
          answer: "Yes. On-device OCR runs locally on your Android device without uploading receipt images to an external server.",
        },
        {
          question: "Is receipt scanning free to try?",
          answer: "Yes. Free users get starter offline OCR scans, a 1-tap sample receipt demo, and bonus scans via streaks or rewarded videos. Pro unlocks unlimited scans with a 7-day free trial.",
        },
        {
          question: "What details does the scanner extract?",
          answer: "It extracts merchant names, totals and dates so you can review and save them into Bills, Cash Log or Warranties.",
        },
      ]}
      relatedLinks={[
        { href: "/scan/", label: "Launch Scanner Deep Link" },
        { href: "/warranty-tracker/", label: "Warranty tracker" },
        { href: "/daily-cash-tracker/", label: "Daily cash tracker" },
        { href: "/offline-budget-app/", label: "Offline budget app" },
      ]}
    />
  );
}
