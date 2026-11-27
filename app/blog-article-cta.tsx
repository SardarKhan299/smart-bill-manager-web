import { OpenInAppCta, PlayCta } from "./conversion-cta";

export function BlogArticleCta({
  slug,
  route,
  heading = "Put this guide into practice on Android",
  body = "Smart Bill Manager keeps your household bills, subscriptions, expenses, receipts and warranties organised locally on your phone — with no bank login or cloud account required.",
  openLabel = "Open in Smart Bill Manager",
}: {
  slug: string;
  route: string;
  heading?: string;
  body?: string;
  openLabel?: string;
}) {
  return (
    <div className="conversion-panel">
      <h2>{heading}</h2>
      <p>{body}</p>
      <div className="actions">
        <OpenInAppCta route={route} placement={`blog-${slug}-open`} label={openLabel} />
        <PlayCta placement={`blog-${slug}-play`} label="Download on Google Play" secondary />
      </div>
    </div>
  );
}
