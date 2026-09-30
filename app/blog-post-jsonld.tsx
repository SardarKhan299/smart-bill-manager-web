const SITE_URL = "https://smart-bill-manager-web.sardar-khan299.workers.dev";
const OG_IMAGE = `${SITE_URL}/og-image.svg`;

export function BlogPostingJsonLd({
  title,
  description,
  path,
  articleSection,
}: {
  title: string;
  description: string;
  path: string;
  articleSection?: string;
}) {
  const url = new URL(path, SITE_URL).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: [OG_IMAGE],
    articleSection,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    author: {
      "@type": "Organization",
      "name": "Smart Bill Manager",
      "url": `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Organization",
      "name": "Smart Bill Manager",
      "url": `${SITE_URL}/`,
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/icon.svg` },
    },
  };

  if (!articleSection) delete (jsonLd as { articleSection?: string }).articleSection;

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
