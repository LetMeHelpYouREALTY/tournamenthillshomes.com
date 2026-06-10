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

export const tournamentHillsBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Neighborhoods", url: "/neighborhoods" },
  { name: "Tournament Hills", url: "/neighborhoods/tournament-hills" },
];
