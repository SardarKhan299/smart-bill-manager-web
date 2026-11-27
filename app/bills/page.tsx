import { DeepLinkLanding } from "../deep-link-page";

export const metadata = {
  title: "Upcoming Bills & Reminders – Smart Bill Manager",
  description: "Open your upcoming bills dashboard in Smart Bill Manager or download on Google Play.",
  alternates: { canonical: "/bills/" },
  openGraph: {
    title: "Upcoming Bills & Reminders – Smart Bill Manager",
    description: "Open your upcoming bills dashboard in Smart Bill Manager or download on Google Play.",
    url: "/bills/",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Smart Bill Manager Upcoming Bills" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming Bills & Reminders – Smart Bill Manager",
    description: "Open your upcoming bills dashboard in Smart Bill Manager or download on Google Play.",
    images: ["/og-image.svg"],
  },
};

export default function Page() {
  return (
    <DeepLinkLanding
      route="bills"
      breadcrumbName="Bills"
      kicker="OFFLINE BILL REMINDER"
      title="Track upcoming bills and never miss a due date."
      lead="See what is due soon, mark bills paid in one tap and know what is safe to spend — all stored privately on your Android phone."
      openLabel="Open Bills Dashboard"
      highlights={[
        "1-tap preset bill entry for rent, utilities, internet and subscriptions.",
        "Timely local due-date reminders that work offline.",
        "AES-256-GCM encrypted local backups with optional biometric app lock.",
      ]}
      relatedHref="/bill-tracker/"
      relatedLabel="Bill Tracker Guide"
    />
  );
}
