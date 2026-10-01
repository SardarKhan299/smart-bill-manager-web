const SITE_URL = "https://smart-bill-manager-web.sardar-khan299.workers.dev";

export function CalculatorJsonLd({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const url = new URL(path, SITE_URL).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url + "#webpage",
        url,
        name,
        isPartOf: { "@id": SITE_URL + "/#website" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Tools", item: SITE_URL + "/tools/" },
          { "@type": "ListItem", position: 3, name, item: url },
        ],
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
