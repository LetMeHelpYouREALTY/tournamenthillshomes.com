import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import SchemaScript from "@/components/SchemaScript";
import {
  combineSchemas,
  generateRealEstateAgentSchema,
  generateWebSiteSchema,
} from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { REALSCOUT_SCRIPT_URL } from "@/lib/realscout-config";
import RealScoutAfterHero from "@/components/realscout/RealScoutAfterHero";

const siteWideSchemas = combineSchemas(
  generateRealEstateAgentSchema(),
  generateWebSiteSchema()
);

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || "";
  const config = getDomainConfig(domain);
  const metadataBase = new URL(siteConfig.url);
  return {
    metadataBase,
    title: `${config.neighborhood} | Dr. Jan Duffy, REALTOR® | BHHS Nevada`,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.heroHeadline,
      description: config.description,
      type: "website",
      url: metadataBase,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        {/* WidgetTracker */}
        <Script id="widget-tracker" strategy="afterInteractive">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
        <Script
          id="realscout-web-components"
          src={REALSCOUT_SCRIPT_URL}
          strategy="afterInteractive"
          type="module"
        />
      </head>
      <body>
        <SchemaScript schema={siteWideSchemas} id="site-wide-schema" />
        <RealScoutAfterHero />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
