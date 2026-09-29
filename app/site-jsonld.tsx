const SITE_URL = "https://smart-bill-manager-web.sardar-khan299.workers.dev";

export function SiteJsonLd(){
  const organization={
    "@context":"https://schema.org",
    "@type":"Organization",
    "@id":`${SITE_URL}/#organization`,
    "name":"Smart Bill Manager",
    "url":`${SITE_URL}/`,
    "logo":`${SITE_URL}/icon.svg`
  };

  const website={
    "@context":"https://schema.org",
    "@type":"WebSite",
    "@id":`${SITE_URL}/#website`,
    "name":"Smart Bill Manager",
    "url":`${SITE_URL}/`,
    "description":"Bill tracker, subscription tracker, expense tracker and household budgeting resources from Smart Bill Manager.",
    "publisher":{"@id":`${SITE_URL}/#organization`}
  };

  const application={
    "@context":"https://schema.org",
    "@type":"SoftwareApplication",
    "@id":`${SITE_URL}/#software`,
    "name":"Smart Bill Manager",
    "operatingSystem":"Android",
    "applicationCategory":"FinanceApplication",
    "description":"A private household money assistant for tracking bills, subscriptions, expenses, upcoming commitments, Safe-to-Spend planning, receipts and warranties.",
    "url":`${SITE_URL}/`,
    "downloadUrl":"https://play.google.com/store/apps/details?id=com.smartbillmanager",
    "publisher":{"@id":`${SITE_URL}/#organization`}
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(website)}}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(application)}}/>
  </>;
}
