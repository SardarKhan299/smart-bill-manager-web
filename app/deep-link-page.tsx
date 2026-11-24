import Link from "next/link";
import { Breadcrumbs } from "./breadcrumbs";
import { OpenInAppCta, PlayCta } from "./conversion-cta";

export interface DeepLinkLandingProps {
  route: string;
  breadcrumbName: string;
  kicker: string;
  title: string;
  lead: string;
  openLabel: string;
  highlights: string[];
  relatedHref: string;
  relatedLabel: string;
}

export function DeepLinkLanding({
  route,
  breadcrumbName,
  kicker,
  title,
  lead,
  openLabel,
  highlights,
  relatedHref,
  relatedLabel,
}: DeepLinkLandingProps) {
  return (
    <main className="page">
      <Breadcrumbs items={[{ name: breadcrumbName }]} />
      <div className="container prose">
        <div className="kicker">{kicker}</div>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        <div className="conversion-panel">
          <h2>Open directly in the Android app</h2>
          <ul>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <OpenInAppCta route={route} placement={`deeplink-${route}-open`} label={openLabel} />
            <PlayCta placement={`deeplink-${route}-play`} label="Download on Google Play" secondary />
          </p>
        </div>
        <p className="related">
          <Link href={relatedHref}>{relatedLabel}</Link> · <Link href="/features/">All features</Link> · <Link href="/download/">Download</Link> · <Link href="/privacy/">Privacy</Link>
        </p>
      </div>
    </main>
  );
}
