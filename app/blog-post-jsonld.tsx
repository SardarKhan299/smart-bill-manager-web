const SITE_URL = "https://smart-bill-manager-web.sardar-khan299.workers.dev";

export function BlogPostingJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = new URL(path, SITE_URL).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    publisher: {
      "@type": "Organization",
      name: "Smart Bill Manager",
      url: SITE_URL + "/",
      logo: { "@type": "ImageObject", url: SITE_URL + "/icon.svg" },
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
