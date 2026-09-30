import Link from "next/link";

type BreadcrumbItem = { name: string; href?: string };

const SITE_URL = "https://smart-bill-manager-web.sardar-khan299.workers.dev";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const list = [
    { name: "Home", href: "/" },
    ...items,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: new URL(item.href, SITE_URL).toString() } : {}),
    })),
  };

  return (
    <>
      <nav className="breadcrumbs container" aria-label="Breadcrumb">
        {list.map((item, index) => (
          <span key={item.name}>
            {index > 0 && <span aria-hidden="true"> / </span>}
            {item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
          </span>
        ))}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
