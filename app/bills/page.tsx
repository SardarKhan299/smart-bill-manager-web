import { DeepLinkLanding } from "../deep-link-page";

export const metadata = {
  title: "Upcoming Bills & Reminders – Smart Bill Manager",
  description: "Open your upcoming bills dashboard in Smart Bill Manager or download on Google Play.",
  alternates: { canonical: "/bills/" },
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
        "Timely due-date reminders that work offline.",
        "AES-256 local encryption with optional biometric app lock.",
      ]}
      relatedHref="/bill-tracker/"
      relatedLabel="Bill Tracker Guide"
    />
  );
}
