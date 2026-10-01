import type {Metadata} from "next";
import "./globals.css";
import Link from "next/link";
import {SiteJsonLd} from "./site-jsonld";

const SITE_URL = "https://smart-bill-manager-web.sardar-khan299.workers.dev";

export const metadata:Metadata={
  metadataBase:new URL(SITE_URL),
  alternates:{canonical:"/"},
  title:{
    default:"Smart Bill Manager – Bill Tracker, Budget & Expense App",
    template:"%s | Smart Bill Manager"
  },
  description:"Smart Bill Manager is a private household finance app for tracking bills, subscriptions, expenses, budgets and upcoming commitments. See what you can safely spend.",
  openGraph:{
    title:"Smart Bill Manager – Bill Tracker, Budget & Expense App",
    description:"Track bills, subscriptions, expenses and budgets. Know what you owe and what you can safely spend.",
    url:SITE_URL,
    siteName:"Smart Bill Manager",
    type:"website",
    locale:"en_GB",
    images:[{
      url:"/og-image.svg",
      width:1200,
      height:630,
      alt:"Smart Bill Manager — private household money assistant"
    }]
  },
  twitter:{
    card:"summary_large_image",
    title:"Smart Bill Manager – Bill Tracker, Budget & Expense App",
    description:"Track bills, subscriptions, expenses and budgets. Know what you owe and what you can safely spend.",
    images:["/og-image.svg"]
  },
  applicationName:"Smart Bill Manager",
  icons:{icon:"/icon.svg",shortcut:"/icon.svg",apple:"/icon.svg"},
  manifest:"/manifest.webmanifest",
  category:"finance",
  robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en-GB"><body>
    <SiteJsonLd/>
    <header><div className="container nav">
      <Link className="logo" href="/"><span className="logo-mark">SB</span>Smart Bill Manager</Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/features/">Features</Link><Link href="/bill-tracker/">Bill Tracker</Link><Link href="/blog/">Blog</Link><Link href="/tools/">Tools</Link><Link href="/faq/">FAQ</Link><Link href="/pricing/">Pricing</Link><Link href="/support/">Support</Link>
      </nav>
      <Link className="btn btn-primary" href="/download/">Download</Link>
    </div></header>
    {children}
    <footer><div className="container footer-grid"><span>© 2026 Smart Bill Manager</span><span><Link href="/blog/">Blog</Link> · <Link href="/tools/">Tools</Link> · <Link href="/faq/">FAQ</Link> · <Link href="/compare/">Compare</Link> · <Link href="/privacy/">Privacy</Link> · <Link href="/support/">Support</Link></span></div></footer>
  </body></html>;
}
