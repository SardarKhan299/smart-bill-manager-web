import { DeepLinkLanding } from "../deep-link-page";

export const metadata = {
  title: "Spending Analytics & Cash Flow – Smart Bill Manager",
  description: "Open Spending Analytics in Smart Bill Manager or download on Google Play.",
  alternates: { canonical: "/analytics/" },
};

export default function Page() {
  return (
    <DeepLinkLanding
      route="analytics"
      breadcrumbName="Analytics"
      kicker="CASH FLOW ANALYTICS"
      title="Understand your bills, categories and Safe-to-Spend."
      lead="Visualise monthly commitments, category breakdowns and upcoming cash flow directly on your device."
      openLabel="Open Analytics"
      highlights={[
        "Clear category donut charts and monthly spending comparisons.",
        "Safe-to-Spend clarity across recurring bills and daily cash log.",
        "All financial analytics computed 100% locally on your phone.",
      ]}
      relatedHref="/cash-flow-forecast/"
      relatedLabel="Cash Flow Forecast"
    />
  );
}
