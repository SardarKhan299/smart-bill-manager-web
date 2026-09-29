# Google Search Console — Smart Bill Manager

## Property
Use the **Domain property** for smartbillmanager.com when possible. This covers the site across protocols and subdomains.

If DNS verification is not available, use a URL-prefix property for:
https://smartbillmanager.com/

## Verification
Verification must be completed in the Google account that owns the website. The verification token is account-specific, so it is intentionally not committed to this repository.

For a Domain property, add the TXT record Google provides to the DNS zone for smartbillmanager.com.

After verification, open Search Console and submit:
https://smartbillmanager.com/sitemap.xml

## Initial checks
Use **URL Inspection** for:
- https://smartbillmanager.com/
- https://smartbillmanager.com/bill-tracker/
- https://smartbillmanager.com/safe-to-spend/
- https://smartbillmanager.com/subscription-tracker/

Request indexing for important pages after the first production deployment. Google notes that crawling and indexing can take time.

## What Phase 3 implements
- Canonical URLs through Next.js metadata.
- Index/follow directives.
- XML sitemap at /sitemap.xml.
- Sitemap declaration in /robots.txt.
- Organization structured data.
- SoftwareApplication structured data for the Android app.
- Open Graph and Twitter metadata.
- Web app manifest.
- Semantic primary navigation and accessible navigation labeling.

## Ongoing Search Console checks
1. **Performance** — impressions, clicks, CTR, queries and pages.
2. **Pages / indexing** — indexed versus excluded URLs and crawl issues.
3. **Sitemaps** — sitemap processing and discovered URLs.
4. **Enhancements / structured data** — validate any detected structured-data issues.
5. **Security & Manual Actions** — review if Google reports an issue.

Do not expect structured data to guarantee a rich result. Google uses structured data to understand pages and may choose whether to show enhanced search features.

## Technical SEO checklist
- Keep canonical URLs on the preferred HTTPS hostname.
- Keep every indexable page linked from the site or sitemap.
- Do not add noindex to public landing pages.
- Avoid duplicate landing pages with substantially identical content.
- Keep titles and descriptions unique and descriptive.
- Keep the sitemap limited to canonical, indexable URLs.
- Update public/sitemap.xml when new public pages are added.

## Official Google guidance
- Search Console: https://search.google.com/search-console
- Search Central: https://developers.google.com/search
- Structured data: https://developers.google.com/search/docs/appearance/structured-data
