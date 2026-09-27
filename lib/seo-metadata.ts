import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/** Shared Open Graph image (served from /public/Image). */
export const DEFAULT_OG_IMAGE = {
  url: "/Image/hero_bg_1.jpg",
  width: 1200,
  height: 630,
  alt: "Tournament Hills homes for sale in Summerlin West, Las Vegas",
};

export const defaultOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: siteConfig.name,
  images: [DEFAULT_OG_IMAGE],
};

export const defaultTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  images: [DEFAULT_OG_IMAGE.url],
};
