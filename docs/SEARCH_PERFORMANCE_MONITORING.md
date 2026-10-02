# B10 — Search Performance Monitoring

Status: **IMPLEMENTED**

## Goal

Turn Google Search Console data into a repeatable monthly/weekly monitoring process without inventing SEO metrics or pretending the site has Search Console access when it does not.

Production property:

https://smart-bill-manager-web.sardar-khan299.workers.dev/

## Source of truth

Google Search Console Performance is the source of truth for:
- clicks
- impressions
- CTR
- average position
- queries
- pages
- countries
- devices
- search appearance
- date trends

Google's current Performance report supports these metrics and dimensions. Google also notes that chart totals and dimension tables can use different aggregation methods, and exported table data can be limited to the rows shown in the report. citeturn1search0turn1search1turn1search2

Do not infer traffic, rankings, or indexed-page counts from third-party tools.

## Monitoring cadence

### Weekly quick check

Review:
1. Clicks
2. Impressions
3. Major traffic drops/spikes
4. Newly visible queries
5. Newly visible pages
6. Indexing/security/manual-action warnings
7. Recently changed pages

### Monthly SEO review

Compare:
- Last 28 days vs previous 28 days
- Last 3 months vs previous comparable period
- Query performance
- Landing-page performance
- Countries
- Devices
- Search appearance where available
- New vs declining pages
- High-impression / low-CTR opportunities

Google recommends using trends in impressions and clicks rather than relying on average position alone. citeturn1search6

## Export workflow

Create this local structure:

~~~
reports/
  search-console/
    current/
      performance.csv
      queries.csv
      pages.csv
      countries.csv
      devices.csv
    previous/
      performance.csv
      queries.csv
      pages.csv
      countries.csv
      devices.csv
~~~

Export the corresponding Search Console Performance tables as CSV. The script accepts whichever dimension files are available; missing files are reported as unavailable rather than fabricated.

Then run:

~~~
npm run seo:performance
~~~

Or:

~~~
node scripts/search-performance-report.mjs --input reports/search-console --output reports/search-performance.md
~~~

The generated report contains:
- current vs previous clicks
- impressions
- CTR
- average position
- top queries
- top landing pages
- countries
- devices
- high-impression / low-CTR candidates
- a monthly decision log

The report is intentionally an offline analysis tool. It does not require Google credentials and does not send Search Console data anywhere.

## Opportunity rules

### High-impression / low-CTR

Treat these as investigation candidates, not automatic SEO fixes.

Check:
- Is the query relevant to the page?
- Is the current title accurate and useful?
- Is the meta description aligned with the page?
- Is search intent satisfied above the fold?
- Is another page on the site a better match?
- Is the result competing against a different search intent?

Google specifically recommends examining low-CTR pages and considering title/description alignment and content alignment. citeturn1search6

### Declining pages

Investigate a decline when:
- clicks fall materially,
- impressions also fall,
- a page's query mix changes,
- indexing/canonicalization changed,
- the page was recently edited,
- internal links changed,
- or Search Console shows data freshness/preliminary-data caveats.

Do not call a decline a ranking penalty without evidence.

### New queries

Use new queries to:
- expand useful content,
- improve existing pages,
- discover missing FAQ/guide topics,
- improve internal linking,
- identify unexpected intent.

Do not create pages solely because a query appeared once.

## International monitoring

B9 introduced 15 SEO locale targets:
- en-GB
- en-US
- en-AU
- en-CA
- nl-NL
- de-DE
- fr-FR
- fr-CA
- es-ES
- it-IT
- pt-PT
- ar
- ur-PK
- hi-IN
- zh-CN

Track meaningful organic demand by country and, where useful, compare the corresponding localized URL path. Remember that Search Console page reporting is based largely on canonical URL assignment, so localized performance should be interpreted together with canonical/hreflang configuration. citeturn1search9turn1search11

## Discover / multimodal

B8 added article imagery and image-sitemap signals.

Search Console now also reports web multimodal search data, including Lens, Circle to Search, image uploads to Google Search and Chrome's “Search this image” flow as rollout continues. Review the Performance report's multimodal filter when the property has data. citeturn0search5

Do not fabricate Discover or multimodal traffic when no report data exists.

## Data limitations

- Search Console anonymizes some queries.
- Performance tables may not contain every query/page row.
- Exported report data reflects the selected report view.
- Property-level and page-level aggregation can differ.
- Newest Performance data can be preliminary.
- Average position is not the same as a simple rank tracker number.

These are reasons to keep the raw export alongside the generated report and to record the exact reporting window. citeturn1search0turn1search2turn1search9

## Change log

Record meaningful SEO changes beside the measurement period:

| Date | Change | URL/cluster | Expected signal | Actual result | Decision |
|---|---|---|---|---|---|
| YYYY-MM-DD | — | — | — | — | — |

## B10 completion criteria

- [x] Monitoring KPI set documented.
- [x] Weekly and monthly review cadence documented.
- [x] Current vs previous period comparison defined.
- [x] Query/page/country/device monitoring defined.
- [x] High-impression / low-CTR workflow defined.
- [x] International monitoring defined.
- [x] B8 multimodal/Discover monitoring included.
- [x] Offline CSV report generator added.
- [x] No fabricated baseline metrics.
- [ ] Live Search Console API integration — intentionally deferred until authenticated API access is available.
