/**
 * Tournament Hills hyperlocal content — FAQs, market display, and schema inputs.
 * Factual community details sourced from public MLS listings and area guides;
 * verify price bands via current MLS before publishing updates.
 *
 * @see docs/seo/tournament-hills-hyperlocal-spec.md
 */

import type { FAQItem, NeighborhoodData } from "./schema";

export const tournamentHillsMarket = {
  lastUpdated: "June 2026",
  zip: "89134",
  /** Active listing band from public MLS samples — not a computed median */
  priceRangeFormatted: "$3.5M – $7M+",
  communityType: "Guard-gated luxury golf community",
  golfCourse: "TPC Summerlin (PGA Tour venue)",
};

export const tournamentHillsNeighborhood: NeighborhoodData = {
  name: "Tournament Hills",
  slug: "tournament-hills",
  description:
    "Guard-gated luxury community in central Summerlin, Las Vegas, built around TPC Summerlin with custom estates, golf course views, and Red Rock Canyon proximity.",
  medianPrice: tournamentHillsMarket.priceRangeFormatted,
  latitude: 36.169,
  longitude: -115.333,
  containedIn: "Summerlin, Las Vegas",
};

export const tournamentHillsFaqs: FAQItem[] = [
  {
    question: "Where is Tournament Hills located in Las Vegas?",
    answer:
      "Tournament Hills is a guard-gated luxury community in central Summerlin, Las Vegas, Nevada (zip code 89134). It sits around the Tournament Players Club (TPC) at Summerlin with convenient access to Summerlin Parkway, US-95, and the 215 Beltway for Strip and airport commutes.",
  },
  {
    question: "What is special about TPC Summerlin and Tournament Hills?",
    answer:
      "Tournament Hills wraps TPC Summerlin, a PGA Tour venue that hosts events including the Shriners Hospitals for Children Open. The course is membership-based; Tournament Hills residents enjoy guard-gated streets, landscaped common areas, and custom luxury homes with golf and mountain views.",
  },
  {
    question: "What price range are Tournament Hills homes?",
    answer:
      "Tournament Hills is an ultra-luxury enclave. Active listings commonly fall in the multi-million-dollar range (often $3.5M and above depending on size, lot, and golf frontage). Dr. Jan Duffy can provide a current MLS snapshot and comparable sales for your target criteria.",
  },
  {
    question: "Is Tournament Hills guard-gated?",
    answer:
      "Yes. Tournament Hills is a guard-gated community within Summerlin. Controlled access adds privacy and security valued by luxury buyers relocating to Las Vegas from higher-cost markets.",
  },
  {
    question: "What amenities are near Tournament Hills?",
    answer:
      "Residents are minutes from Downtown Summerlin, Tivoli Village, Boca Park, Summerlin Hospital, Red Rock Canyon National Conservation Area, City National Arena (Vegas Golden Knights practice facility), and Las Vegas Ballpark. Costco, Trader Joe's, and major dining clusters are a short drive away.",
  },
  {
    question: "What schools serve Tournament Hills families?",
    answer:
      "Tournament Hills is in the Clark County School District. Highly rated options nearby include John W. Bonner Elementary, West Career & Technical Academy, Patricia A. Bendorf Elementary, and several other Summerlin schools rated 9/10 or higher on GreatSchools. Private options include The Meadows School and Bishop Gorman.",
  },
  {
    question: "How does Tournament Hills compare to The Ridges or other Summerlin villages?",
    answer:
      "Tournament Hills offers a golf-centric, guard-gated lifestyle centered on TPC Summerlin with custom estate homes. The Ridges is another ultra-luxury guard-gated Summerlin community with a different village character and price profile. Dr. Jan Duffy can tour both and match you with the village that fits your lifestyle and budget.",
  },
  {
    question: "Why work with Dr. Jan Duffy for Tournament Hills real estate?",
    answer:
      "Dr. Jan Duffy, REALTOR® (License S.0197614.LLC) with Berkshire Hathaway HomeServices Nevada Properties, has served Las Vegas since 2008. She provides guard-gated community expertise, off-market awareness, and negotiation support for luxury Summerlin buyers and sellers. Call (702) 500-1942 for a private consultation.",
  },
];

/** Google “People also search for” / PAA-style queries — mirrored in FAQPage schema. */
export const tournamentHillsPeopleAlsoSearchFaqs: FAQItem[] = [
  {
    question:
      "Are there Tournament Hills gated community homes for sale in Summerlin Las Vegas?",
    answer:
      "Yes. Tournament Hills is a guard-gated luxury golf community in central Summerlin, Las Vegas (zip 89134), with custom estates for sale around TPC Summerlin. Browse live MLS listings on this site or call Dr. Jan Duffy at (702) 500-1942 for golf-front and off-market opportunities.",
  },
  {
    question: "Tournament Hills gated community Las Vegas Summerlin — homes for sale?",
    answer:
      "Tournament Hills homes for sale are marketed through the Las Vegas MLS. Inventory is ultra-luxury—often $3.5M and above for custom single-family estates. Search current listings on tournamenthillshomes.com or request a curated tour from Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties.",
  },
  {
    question: "What do reviews say about Tournament Hills in Summerlin Las Vegas?",
    answer:
      "Buyers choose Tournament Hills for guard-gated privacy, TPC Summerlin golf adjacency, and central Summerlin access. For agent reviews, Dr. Jan Duffy holds a 4.9 client rating across 500+ Las Vegas transactions—ask for recent references. HOA and seller disclosures provide the authoritative community rules during a purchase.",
  },
  {
    question: "Are Tournament Hills Summerlin rentals available?",
    answer:
      "Tournament Hills is primarily owner-occupied luxury housing. Long-term rentals appear occasionally but are uncommon; guard-gated HOA rules and price points limit the rental pool. Contact Dr. Jan Duffy at (702) 500-1942 if you need lease options in Summerlin or comparable guard-gated villages.",
  },
  {
    question: "Where is Tournament Hills on the map in Summerlin Las Vegas?",
    answer:
      "Tournament Hills is in central Summerlin, Las Vegas, Nevada 89134, surrounding TPC Summerlin west of the Summerlin Parkway corridor. Use the map on our Tournament Hills neighborhood guide or search “TPC Summerlin” / zip 89134 in Google Maps for directions.",
  },
  {
    question: "What are Tournament Hills HOA fees in Summerlin?",
    answer:
      "HOA and guard-gate assessments in Tournament Hills vary by home and section—they are not a single published flat fee. Costs typically cover gated security, common-area landscaping, and community standards common to Summerlin luxury enclaves. Dr. Jan Duffy provides current HOA disclosures from seller documents during a consultation; verify amounts before you offer.",
  },
  {
    question: "Can I find Tournament Hills Las Vegas homes on Zillow?",
    answer:
      "Zillow and similar portals may show some Tournament Hills history, but guard-gated Summerlin listings are often incomplete or delayed on third-party sites. For accurate, current MLS inventory around TPC Summerlin, use the RealScout search on tournamenthillshomes.com or work with Dr. Jan Duffy for direct MLS access and private showings.",
  },
  {
    question: "Who lives in Tournament Hills Las Vegas?",
    answer:
      "Tournament Hills attracts executives, golf enthusiasts, successful professionals, and luxury buyers relocating from higher-cost markets—often from California. The enclave features custom estates on premium lots with guard-gated privacy rather than production suburban density. Dr. Jan Duffy can describe street character and lifestyle fit on a confidential tour.",
  },
];

/** Full FAQ set for homepage, neighborhood hub, and FAQPage JSON-LD. */
export const tournamentHillsAllFaqs: FAQItem[] = [
  ...tournamentHillsFaqs,
  ...tournamentHillsPeopleAlsoSearchFaqs,
];

export const tournamentHillsPeopleAlsoSearchQueries = [
  "Tournament Hills gated community Las Vegas Summerlin homes for sale",
  "Tournament Hills gated community Las Vegas Summerlin reviews",
  "Tournament Hills gated community Las Vegas Summerlin rentals",
  "Tournament Hills gated community Las Vegas Summerlin map",
  "Tournament Hills gated community Las Vegas Summerlin for sale",
  "Tournament Hills gated community Las Vegas Summerlin HOA fees",
  "Tournament Hills Las Vegas Zillow",
  "Who lives in Tournament Hills Las Vegas",
];

export const tournamentHillsBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Neighborhoods", url: "/neighborhoods" },
  { name: "Tournament Hills", url: "/neighborhoods/tournament-hills" },
];
