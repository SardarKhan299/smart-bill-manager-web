import Link from "next/link";
import { Breadcrumbs } from "./breadcrumbs";
import { OpenInAppCta, PlayCta } from "./conversion-cta";
import { SeoFaqJsonLd } from "./seo-faq";

export interface ComparisonRow {
  factor: string;
  app: string;
  spreadsheet: string;
}

export interface SpreadsheetComparisonProps {
  slug: string;
  route: string;
  breadcrumbName: string;
  kicker: string;
  title: string;
  lead: string;
  summaryCalloutTitle: string;
  summaryCalloutBody: string;
  rows: ComparisonRow[];
  spreadsheetWins: string[];
  appWins: string[];
  hybridNote: string;
  openLabel: string;
  calculatorHref: string;
  calculatorLabel: string;
  faq: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ href: string; label: string }>;
}

export function SpreadsheetComparisonLanding({
  slug,
  route,
  breadcrumbName,
  kicker,
  title,
  lead,
  summaryCalloutTitle,
  summaryCalloutBody,
  rows,
  spreadsheetWins,
  appWins,
  hybridNote,
  openLabel,
  calculatorHref,
  calculatorLabel,
  faq,
  relatedLinks,
}: SpreadsheetComparisonProps) {
  return (
    <main className="page seo-page">
      <SeoFaqJsonLd items={faq} />
      <Breadcrumbs
        items={[
          { name: "Compare", href: "/compare/" },
          { name: breadcrumbName },
        ]}
      />
      <div className="container prose">
        <div className="kicker">{kicker}</div>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>

        <div className="seo-callout">
          <strong>{summaryCalloutTitle}</strong>
          <p>{summaryCalloutBody}</p>
        </div>

        <h2>Side-by-side workflow comparison</h2>
        <div className="comparison">
          <div className="compare-row-3 compare-head">
            <div>Workflow factor</div>
            <div>Smart Bill Manager</div>
            <div>Spreadsheet</div>
          </div>
          {rows.map((row) => (
            <div className="compare-row-3" key={row.factor}>
              <div>{row.factor}</div>
              <div>{row.app}</div>
              <div>{row.spreadsheet}</div>
            </div>
          ))}
        </div>

        <h2>When a spreadsheet is the better choice</h2>
        <ul>
          {spreadsheetWins.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>When Smart Bill Manager is the better choice</h2>
        <ul>
          {appWins.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Use both together with local CSV import &amp; export</h2>
        <p>{hybridNote}</p>

        <div className="conversion-panel">
          <h2>Try the browser calculator or open on Android</h2>
          <p>
            Test your numbers first with our free{" "}
            <Link href={calculatorHref}>
              <strong>{calculatorLabel}</strong>
            </Link>
            , or keep everything organised offline on your phone.
          </p>
          <div className="actions">
            <OpenInAppCta
              route={route}
              placement={`compare-${slug}-open`}
              label={openLabel}
            />
            <PlayCta
              placement={`compare-${slug}-play`}
              label="Download on Google Play"
              secondary
            />
          </div>
        </div>

        <h2>Frequently asked questions</h2>
        {faq.map((item) => (
          <section className="faq-item" key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </section>
        ))}

        <p className="related">
          <Link href="/compare/">All comparisons</Link> ·{" "}
          <Link href={calculatorHref}>{calculatorLabel}</Link>
          {relatedLinks.map((link) => (
            <span key={link.href}>
              {" "}· <Link href={link.href}>{link.label}</Link>
            </span>
          ))}
        </p>
      </div>
    </main>
  );
}
