import { DeepLinkLanding } from "../deep-link-page";

export const metadata = {
  title: "Smart Bill Manager Pro – 7-Day Free Trial",
  description: "Start your 7-day free trial of Smart Bill Manager Pro on Android.",
  alternates: { canonical: "/pro/" },
};

export default function Page() {
  return (
    <DeepLinkLanding
      route="pro"
      breadcrumbName="Pro"
      kicker="SMART BILL MANAGER PRO"
      title="Unlock unlimited offline OCR scans, ad-free focus & Pro backups."
      lead="Try Smart Bill Manager Pro free for 7 days on Android — cancel anytime directly in Google Play."
      openLabel="Start 7-Day Free Trial in App"
      highlights={[
        "7-day free trial available on Monthly and Annual Pro plans.",
        "Unlimited offline AI receipt scanning, ad-free experience and biometric lock.",
        "Encrypted local backups and full analytics included.",
      ]}
      relatedHref="/pricing/"
      relatedLabel="Compare Free vs. Pro"
    />
  );
}
