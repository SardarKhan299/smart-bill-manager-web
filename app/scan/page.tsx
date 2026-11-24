import { DeepLinkLanding } from "../deep-link-page";

export const metadata = {
  title: "Scan Receipt Offline – Smart Bill Manager",
  description: "Open the offline AI receipt scanner in Smart Bill Manager or download on Google Play.",
  alternates: { canonical: "/scan/" },
};

export default function Page() {
  return (
    <DeepLinkLanding
      route="scan"
      breadcrumbName="Scan Receipt"
      kicker="OFFLINE AI RECEIPT SCANNER"
      title="Snap any receipt and extract totals offline."
      lead="Use Smart Bill Manager's on-device OCR to capture merchant names, amounts and due dates without uploading receipts to the cloud."
      openLabel="Open Receipt Scanner"
      highlights={[
        "Extract bill totals, merchants and due dates in seconds on your device.",
        "100% offline-first privacy — no bank login or cloud account required.",
        "Save receipts straight into Bills, Daily Cash Log or Warranty Vault.",
      ]}
      relatedHref="/receipt-manager/"
      relatedLabel="Receipt & Warranty Manager"
    />
  );
}
