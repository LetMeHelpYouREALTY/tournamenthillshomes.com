import { headers } from "next/headers";
import SchemaScript from "@/components/SchemaScript";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

const SEGMENT_LABELS: Record<string, string> = {
  neighborhoods: "Neighborhoods",
  "tournament-hills": "Tournament Hills",
  "55-plus-communities": "55+ Communities",
  buyers: "Buyers",
  sellers: "Sellers",
  listings: "Listings",
  contact: "Contact",
  about: "About",
  faq: "FAQ",
  services: "Services",
  "market-report": "Market Report",
  "market-update": "Market Update",
  "market-insights": "Market Insights",
  "home-valuation": "Home Valuation",
  "luxury-homes": "Luxury Homes",
  "new-construction": "New Construction",
  "investment-properties": "Investment Properties",
  relocation: "Relocation",
  "google-business": "Google Business",
  "why-berkshire-hathaway": "Why Berkshire Hathaway",
  "security-policy": "Security Policy",
};

function labelForSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) {
    return SEGMENT_LABELS[segment];
  }
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Emits BreadcrumbList JSON-LD for inner pages based on the request path.
 */
export default function BreadcrumbSchemaFromPath() {
  const pathname = headers().get("x-pathname") ?? "/";
  if (pathname === "/" || pathname === "") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const items = [{ name: "Home", url: baseUrl }];

  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    items.push({
      name: labelForSegment(segment),
      url: `${baseUrl}${path}`,
    });
  }

  return (
    <SchemaScript
      schema={generateBreadcrumbSchema(items)}
      id="breadcrumb-schema-from-path"
    />
  );
}
