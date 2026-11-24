import { DeepLinkLanding } from "../deep-link-page";

export const metadata = {
  title: "Daily Cash Log & Expense Tracker – Smart Bill Manager",
  description: "Open your Daily Cash Log in Smart Bill Manager or download on Google Play.",
  alternates: { canonical: "/cash-log/" },
};

export default function Page() {
  return (
    <DeepLinkLanding
      route="cash-log"
      breadcrumbName="Cash Log"
      kicker="DAILY EXPENSE TRACKER"
      title="Log daily cash spending in 3 seconds."
      lead="Track everyday expenses, build no-spend streaks and see your Safe-to-Spend balance update automatically."
      openLabel="Open Daily Cash Log"
      highlights={[
        "Quick daily expense logging with clean category summaries.",
        "Track no-spend streaks and earn bonus offline OCR receipt scans.",
        "Private on-device storage with no bank linking required.",
      ]}
      relatedHref="/expense-tracker/"
      relatedLabel="Expense Tracker Guide"
    />
  );
}
