import { DeepLinkLanding } from "../deep-link-page";

export const metadata = {
  title: "Warranty Vault – Smart Bill Manager",
  description: "Open your offline Warranty Vault in Smart Bill Manager or download on Google Play.",
  alternates: { canonical: "/warranties/" },
  openGraph: {
    title: "Warranty Vault – Smart Bill Manager",
    description: "Open your offline Warranty Vault in Smart Bill Manager or download on Google Play.",
    url: "/warranties/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Warranty Vault" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warranty Vault – Smart Bill Manager",
    description: "Open your offline Warranty Vault in Smart Bill Manager or download on Google Play.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <DeepLinkLanding
      route="warranties"
      breadcrumbName="Warranties"
      kicker="OFFLINE WARRANTY VAULT"
      title="Store product warranties and receipts in one private vault."
      lead="Get alerts before appliance and electronics warranties expire — with purchase receipts attached locally on your device."
      openLabel="Open Warranty Vault"
      highlights={[
        "Track expiry dates for electronics, appliances and household purchases.",
        "Attach receipt photos directly to each warranty record.",
        "Offline-first local storage with zero cloud account required.",
      ]}
      relatedHref="/receipt-manager/"
      relatedLabel="Receipt & Warranty Manager"
    />
  );
}
