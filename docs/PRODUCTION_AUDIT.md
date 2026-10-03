# C1 Production / Live-Site Audit

## Purpose
Validate the deployed Smart Bill Manager website at:
https://smart-bill-manager-web.sardar-khan299.workers.dev

This is a live-site check, separate from npm run seo:audit, which validates the local out/ build.

## Command
npm run seo:production

The audit fetches robots.txt, sitemap.xml and app-ads.txt, discovers sitemap URLs, checks HTTP 200 and HTML content type, validates title/meta description, canonical and og:url against the final URL, checks OG/Twitter images, exactly one H1, retired-domain/noindex regressions, and robots/sitemap consistency. It also warns when app-ads.txt is not served as text/plain.

## Initial C1 findings — October 3, 2026
- The workers.dev production site is reachable.
- robots.txt points to the current workers.dev sitemap.
- The live sitemap currently exposes 36 URLs.
- app-ads.txt is reachable and contains a Google authorized-seller line; its response Content-Type should be verified as text/plain.
- The homepage has the expected production canonical and OG/Twitter image metadata.
- Several non-homepage routes currently expose the root/default title, description and OG URL in their generated metadata. This is a production SEO issue and should be fixed before calling C1 green.
- Re-run the production audit after metadata fixes and deployment.

## Exit criteria
C1 is green when all sitemap URLs and required routes return 200, each indexable page has page-specific title/description, canonical and og:url match the final URL, OG/Twitter images exist, each page has one H1, robots/sitemap are consistent, no retired domain/noindex regression exists, app-ads.txt is verified as plain text, and the fresh deployment passes the audit.

## Cloudflare deployment model
The repository uses Workers Static Assets with assets.directory set to ./out and not_found_handling set to 404-page. Cloudflare documents that static assets are uploaded from the configured directory and served by the Worker. A 404-page configuration is appropriate for this static site because unknown routes should remain 404s rather than fall back to the homepage.

## C2 boundary
C2 requires Google Search Console ownership verification and sitemap submission. That is an account-level action and should not use credentials stored in the repository.
