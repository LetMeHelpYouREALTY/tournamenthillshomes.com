/**
 * Hyperlocal amenities copy, curated places, and amenities-page FAQ (AEO).
 * Addresses verified against primary sources (sourceUrl on each curated place).
 */

import type { FAQItem } from "./schema";
import type { AmenityCategoryId } from "./community-map-config";
import { tournamentHillsMapCenter } from "./community-map-config";

export type CuratedAmenityPlace = {
  name: string;
  schemaType:
    | "Restaurant"
    | "Park"
    | "Hospital"
    | "GolfCourse"
    | "ShoppingCenter"
    | "School"
    | "Store"
    | "Pharmacy"
    | "Place";
  streetAddress: string;
  city: string;
  postalCode: string;
  /** Maps to amenity map chip filters */
  amenityCategoryId: AmenityCategoryId;
  sourceUrl: string;
  note?: string;
};

export const curatedAmenityPlaces: CuratedAmenityPlace[] = [
  {
    name: "TPC Summerlin",
    schemaType: "GolfCourse",
    streetAddress: "1700 Village Center Circle",
    city: "Las Vegas",
    postalCode: "89134",
    amenityCategoryId: "golf",
    sourceUrl: "https://tpc.com/summerlin/contact-directions/",
    note: "Private PGA Tour club adjacent to Tournament Hills",
  },
  {
    name: "Summerlin Hospital Medical Center",
    schemaType: "Hospital",
    streetAddress: "657 N. Town Center Drive",
    city: "Las Vegas",
    postalCode: "89144",
    amenityCategoryId: "healthcare",
    sourceUrl: "https://www.summerlinhospital.com/about/contact-us",
  },
  {
    name: "Downtown Summerlin",
    schemaType: "ShoppingCenter",
    streetAddress: "1980 Festival Plaza Drive",
    city: "Las Vegas",
    postalCode: "89135",
    amenityCategoryId: "shopping",
    sourceUrl: "https://www.downtownsummerlin.com/",
  },
  {
    name: "Tivoli Village",
    schemaType: "ShoppingCenter",
    streetAddress: "400 S Rampart Boulevard",
    city: "Las Vegas",
    postalCode: "89145",
    amenityCategoryId: "restaurants",
    sourceUrl: "https://tivolivillagelv.com/",
    note: "Shopping and dining destination on Rampart Boulevard",
  },
  {
    name: "Boca Park Fashion Village",
    schemaType: "ShoppingCenter",
    streetAddress: "750 S Rampart Boulevard",
    city: "Las Vegas",
    postalCode: "89145",
    amenityCategoryId: "shopping",
    sourceUrl: "https://bocaparklasvegas.com/",
  },
  {
    name: "Whole Foods Market",
    schemaType: "Store",
    streetAddress: "2475 S Town Center Drive",
    city: "Las Vegas",
    postalCode: "89135",
    amenityCategoryId: "grocery",
    sourceUrl: "https://www.wholefoodsmarket.com/stores/summerlin",
  },
  {
    name: "Bruce Trent Park",
    schemaType: "Park",
    streetAddress: "8851 Vegas Drive",
    city: "Las Vegas",
    postalCode: "89128",
    amenityCategoryId: "parks",
    sourceUrl:
      "https://www.lasvegasnevada.gov/Residents/Parks-Facilities/Bruce-Trent-Park",
  },
  {
    name: "The Hills Park",
    schemaType: "Park",
    streetAddress: "9100 Hillpointe Road",
    city: "Las Vegas",
    postalCode: "89134",
    amenityCategoryId: "parks",
    sourceUrl: "https://summerlin.com/explore/parks/",
    note: "Summerlin North community park",
  },
  {
    name: "The Pueblo Park",
    schemaType: "Park",
    streetAddress: "7663 W Lake Mead Boulevard",
    city: "Las Vegas",
    postalCode: "89128",
    amenityCategoryId: "parks",
    sourceUrl: "https://summerlin.com/explore/parks/",
  },
  {
    name: "John W. Bonner Elementary School",
    schemaType: "School",
    streetAddress: "765 Crestdale Lane",
    city: "Las Vegas",
    postalCode: "89144",
    amenityCategoryId: "schools",
    sourceUrl: "https://www.bonnerelementary.com/contact",
  },
  {
    name: "Patricia A. Bendorf Elementary School",
    schemaType: "School",
    streetAddress: "3550 Kevin Way",
    city: "Las Vegas",
    postalCode: "89147",
    amenityCategoryId: "schools",
    sourceUrl: "https://www.bendorfelementary.org/apps/contact/",
  },
];

export const amenitiesPageFaqs: FAQItem[] = [
  {
    question: "What grocery stores are near Tournament Hills?",
    answer:
      "Tournament Hills residents often shop at Whole Foods Market at 2475 S Town Center Drive in Summerlin, plus grocers at Downtown Summerlin and along the Charleston and Rampart corridors. Drive times vary by address—verify with your navigation app before showings.",
  },
  {
    question: "How far is Tournament Hills from the Las Vegas Strip?",
    answer:
      "Tournament Hills in central Summerlin is roughly 12–18 miles from major Strip resorts depending on your route—often about 20–35 minutes by car in typical traffic via Summerlin Parkway and I-15 or US-95 (approximate; verify with your navigation app before showings).",
  },
  {
    question: "Are there hospitals near Tournament Hills?",
    answer:
      "Yes. Summerlin Hospital Medical Center at 657 N. Town Center Drive is the primary full-service hospital serving west Summerlin, with additional medical offices and urgent care along Town Center and Rampart corridors.",
  },
  {
    question: "What dining is close to Tournament Hills?",
    answer:
      "Downtown Summerlin and Tivoli Village on Rampart Boulevard offer concentrated dining—from casual cafes to chef-driven restaurants—within a few miles of the TPC Summerlin / Tournament Hills enclave.",
  },
  {
    question: "Is TPC Summerlin part of Tournament Hills?",
    answer:
      "Tournament Hills is a guard-gated residential community surrounding TPC Summerlin, a private PGA Tour golf club at 1700 Village Center Circle; membership is separate from homeownership, but the course defines the neighborhood's golf-centric setting.",
  },
  {
    question: "How do I get to Harry Reid International Airport from Tournament Hills?",
    answer:
      "Most drivers use Summerlin Parkway east to US-95 or I-215 toward the airport—commonly about 25–40 minutes depending on time of day (approximate; check live traffic before travel).",
  },
  {
    question: "What parks are near Tournament Hills in Summerlin?",
    answer:
      "Summerlin maintains 150+ parks. Bruce Trent Park (8851 Vegas Drive), The Hills Park (9100 Hillpointe Road), and The Pueblo Park (7663 W Lake Mead Boulevard) are well-known options within a reasonable drive of Tournament Hills for trails, sports fields, and community events.",
  },
  {
    question: "What CCSD schools are assigned to Tournament Hills addresses?",
    answer:
      "Tournament Hills is in the Clark County School District. Nearby public schools include John W. Bonner Elementary and Patricia A. Bendorf Elementary—verify your assigned schools with the CCSD Zoning Search before you buy.",
  },
];

export const amenitiesBreadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Nearby Amenities", url: "/amenities" },
];

export const amenitiesCommuteNotes = {
  lastUpdated: "September 2026",
  strip:
    "Approximate 12–18 miles to central Strip resorts via Summerlin Parkway and I-15 or US-95; typical drive often 20–35 minutes (traffic-dependent).",
  airport:
    "Approximate 25–40 minutes to Harry Reid International Airport (LAS) via Summerlin Parkway and US-95 or I-215 (traffic-dependent).",
  downtownSummerlin:
    "Downtown Summerlin retail and dining at 1980 Festival Plaza Drive is roughly 3–5 miles from the TPC Summerlin area.",
  redRock:
    "Red Rock Canyon National Conservation Area visitor access is roughly 15–25 minutes west via Charleston Boulevard (traffic-dependent).",
};

export function getAmenitiesPageTitle(): string {
  return `Nearby Amenities in ${tournamentHillsMapCenter.communityName}, Las Vegas`;
}

export function getCuratedPlacesForCategory(
  categoryId: AmenityCategoryId,
): CuratedAmenityPlace[] {
  return curatedAmenityPlaces.filter((p) => p.amenityCategoryId === categoryId);
}
