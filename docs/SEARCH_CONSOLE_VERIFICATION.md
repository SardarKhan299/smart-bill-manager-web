# C2 — Google Search Console Verification

## Property

Use the exact URL-prefix property:

`https://smart-bill-manager-web.sardar-khan299.workers.dev/`

Google's URL-prefix property includes only URLs beginning with the specified protocol and prefix. For this workers.dev site, this exact HTTPS prefix is the appropriate property scope.

## Verification implementation

The site supports Google's HTML meta-tag verification through the build-time environment variable:

`GOOGLE_SITE_VERIFICATION`

The value must be the exact verification token Google gives in Search Console. Do not commit the token to Git, source code, documentation, or chat.

When the variable is present during the production Next.js build, the root layout emits Google's verification metadata on the homepage.

## Setup

1. Open Google Search Console.
2. Add property:
   `https://smart-bill-manager-web.sardar-khan299.workers.dev/`
3. Choose **URL-prefix** property.
4. Select **HTML tag** verification.
5. Copy only the value from Google's generated tag, for example:
   `content="YOUR_TOKEN"`
6. Add that value as the Cloudflare production build environment variable:
   `GOOGLE_SITE_VERIFICATION`
7. Redeploy the site.
8. Open the production homepage and inspect the HTML source for:
   `meta name="google-site-verification"`
9. Return to Search Console and click **Verify**.

Do not put the token in `NEXT_PUBLIC_*` variables. The value only needs to be available at build time to generate the verification metadata.

## GitHub Actions

If GitHub Actions is used for the production build, configure the same value as a repository/environment secret and expose it only to the build step as `GOOGLE_SITE_VERIFICATION`.

Do not paste the token into workflow YAML.

## After verification

Submit:

`https://smart-bill-manager-web.sardar-khan299.workers.dev/sitemap.xml`

Then use URL Inspection on the homepage and the highest-priority commercial/tool pages.

## Verification boundary

Search Console ownership is tied to the Google account and verification token. Repository automation can prepare the site for verification, but it cannot complete the account-level ownership action without the user's Google Search Console session.

## Security

The verification token is not a general website secret, but it is a user-specific ownership token. Keep it out of source control and do not publish it in documentation or chat.
