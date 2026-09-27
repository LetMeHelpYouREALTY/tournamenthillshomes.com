/**
 * Hyperlocal amenities copy, curated places, and amenities-page FAQ (AEO).
 * Only verified names/addresses — no fabricated ratings or drive times as facts.
 */

import type { FAQItem } from "./schema";
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
  category: string;
  note?: string;
};

export const curatedAmenityPlaces: CuratedAmenityPlace[] = [
  {
    name: "TPC Summerlin",
    schemaType: "GolfCourse",
    streetAddress: "1700 Village Center Circle",
    city: "Las Vegas",
    postalCode: "89134",
    category: "Golf",
    note: "PGA Tour venue adjacent to Tournament Hills",
  },
  {
    name: "Summerlin Hospital Medical Center",
    schemaType: "Hospital",
    streetAddress: "657 Town Center Drive",
    city: "Las Vegas",
    postalCode: "89144",
    category: "Healthcare",
  },
  {
    name: "Downtown Summerlin",
    schemaType: "ShoppingCenter",
    streetAddress: "1980 Festival Plaza Drive",
    city: "Las Vegas",
    postalCode: "89135",
    category: "Shopping & dining",
  },
  {
    name: "Tivoli Village",
    schemaType: "ShoppingCenter",
    streetAddress: "440 S Rampart Boulevard",
    city: "Las Vegas",
    postalCode: "89145",
    category: "Shopping & dining",
  },
  {
    name: "Boca Park Fashion Village",
    schemaType: "ShoppingCenter",
    streetAddress: "750 S Rampart Boulevard",
    city: "Las Vegas",
    postalCode: "89145",
    category: "Shopping",
  },
  {
    name: "Bruce Trent Park",
    schemaType: "Park",
    streetAddress: "8851 Vegas Drive",
    city: "Las Vegas",
    postalCode: "89134",
    category: "Parks & recreation",
  },
  {
    name: "Hills Park",
    schemaType: "Park",
    streetAddress: "8301 W Charleston Boulevard",
    city: "Las Vegas",
    postalCode: "89117",
    category: "Parks & recreation",
  },
  {
    name: "Pueblo Park",
    schemaType: "Park",
    streetAddress: "6320 W Maule Avenue",
    city: "Las Vegas",
    postalCode: "89139",
    category: "Parks & recreation",
  },
  {
    name: "John W. Bonner Elementary School",
    schemaType: "School",
    streetAddress: "765 Crestda Lane",
    city: "Las Vegas",
    postalCode: "89144",
    category: "Schools (CCSD)",
  },
  {
    name: "Patricia A. Bendorf Elementary School",
    schemaType: "School",
    streetAddress: "3850 S Town Center Drive",
    city: "Las Vegas",
    postalCode: "89135",
    category: "Schools (CCSD)",
  },
];

export const amenitiesPageFaqs: FAQItem[] = [
  {
    question: "What grocery stores are near Tournament Hills?",
    answer:
      "Tournament Hills residents typically shop at Downtown Summerlin grocers (including Whole Foods Market at 1980 Festival Plaza Drive), Trader Joe's and Costco locations along the Summerlin corridor, and additional supermarkets within a short drive on Charleston Boulevard and Rampart Boulevard.",
  },
  {
    question: "How far is Tournament Hills from the Las Vegas Strip?",
    answer:
      "Tournament Hills in central Summerlin is roughly 12–18 miles from major Strip resorts depending on your route—often about 20–35 minutes by car in typical traffic via Summerlin Parkway and I-15 or US-95 (approximate; verify with your navigation app before showings).",
  },
  {
    question: "Are there hospitals near Tournament Hills?",
    answer:
      "Yes. Summerlin Hospital Medical Center at 657 Town Center Drive is the primary full-service hospital serving the Summerlin area west of Tournament Hills, with additional medical offices and urgent care along Town Center and Rampart corridors.",
  },
  {
    question: "What dining is close to Tournament Hills?",
    answer:
      "Downtown Summerlin and Tivoli Village on Rampart Boulevard offer concentrated dining—from casual cafes to chef-driven restaurants—within a few miles of the TPC Summerlin / Tournament Hills enclave.",
  },
  {
    question: "Is TPC Summerlin part of Tournament Hills?",
    answer:
      "Tournament Hills is a guard-gated residential community surrounding TPC Summerlin, a private PGA Tour golf club at 1700 Village Center Circle; membership is separate from homeownership, but the course defines the neighborhood's golf-centric lifestyle.",
  },
  {
    question: "How do I get to Harry Reid International Airport from Tournament Hills?",
    answer:
      "Most drivers use Summerlin Parkway east to US-95 or I-215 toward the airport—commonly about 25–40 minutes depending on time of day (approximate; check live traffic before travel).",
  },
  {
    question: "What parks are near Tournament Hills in Summerlin?",
    answer:
      "Summerlin maintains 150+ parks; Bruce Trent Park, Hills Park, and Pueblo Park are well-known options within a reasonable drive of Tournament Hills for trails, sports fields, and community events.",
  },
  {
    question: "What schools serve Tournament Hills families?",
    answer:
      "Tournament Hills is in the Clark County School District; nearby public schools include John W. Bonner Elementary and Patricia A. Bendorf Elementary, with West Career & Technical Academy and other Summerlin schools a short drive away—verify boundaries and ratings on CCSD and GreatSchools before you buy.",
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
