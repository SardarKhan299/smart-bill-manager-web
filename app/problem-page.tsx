import Link from "next/link";
import { Breadcrumbs } from "./breadcrumbs";
import { OpenInAppCta, PlayCta } from "./conversion-cta";
import { SeoFaqJsonLd } from "./seo-faq";

export interface ProblemFaqItem {
  question: string;
  answer: string;
}

export interface ProblemSection {
  heading: string;
  body: string;
}

export interface ProblemLandingProps {
  route: string;
  breadcrumbName: string;
  kicker: string;
  title: string;
  lead: string;
  painCalloutTitle: string;
  painCalloutBody: string;
  bulletsHeading: string;
  bullets: string[];
  sections: ProblemSection[];
  openLabel: string;
  faq: ProblemFaqItem[];
  relatedLinks: Array<{ href: string; label: string }>;
}

export function ProblemLanding({
  route,
  breadcrumbName,
  kicker,
  title,
  lead,
  painCalloutTitle,
  painCalloutBody,
  bulletsHeading,
  bullets,
  sections,
  openLabel,
  faq,
  relatedLinks,
}: ProblemLandingProps) {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs items={[{ name: breadcrumbName }]} />
      <div className="container prose">
        <div className="kicker">{kicker}</div>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        <div className="seo-callout">
          <strong>{painCalloutTitle}</strong>
          <p>{painCalloutBody}</p>
        </div>
        <div className="conversion-panel">
          <h2>Solve this directly in Smart Bill Manager</h2>
          <p style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <OpenInAppCta route={route} placement={`problem-${route}-open-top`} label={openLabel} />
            <PlayCta placement={`problem-${route}-play-top`} label="Download on Google Play" secondary />
          </p>
        </div>
        <h2>{bulletsHeading}</h2>
        <ul>
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}
        <p style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <OpenInAppCta route={route} placement={`problem-${route}-open-bottom`} label={openLabel} />
          <PlayCta placement={`problem-${route}-play-bottom`} label="Download on Google Play" secondary />
        </p>
        <p className="related">
          {relatedLinks.map((link, index) => (
            <span key={link.href}>
              {index > 0 ? " · " : ""}
              <Link href={link.href}>{link.label}</Link>
            </span>
          ))}
        </p>
      </div>
    </main>
  );
}
