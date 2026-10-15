/**
 * Single source for Tournament Hills map center and amenity map settings.
 * Center: TPC Summerlin clubhouse — 1700 Village Center Circle, Las Vegas, NV 89134
 * (public course address; Tournament Hills wraps this PGA Tour venue).
 */

export const tournamentHillsMapCenter = {
  lat: 36.189726,
  lng: -115.299855,
  label: "Tournament Hills",
  communityName: "Tournament Hills",
  city: "Las Vegas",
  region: "NV",
  postalCode: "89134",
  containedIn: "Summerlin, Las Vegas",
  /** Documented anchor for PR / schema alignment */
  coordinateSource:
    "TPC Summerlin clubhouse, 1700 Village Center Circle, Las Vegas NV 89134 (PGA Tour TPC public listing coordinates)",
} as const;

export type AmenityCategoryId =
  | "golf"
  | "parks"
  | "healthcare"
  | "grocery"
  | "restaurants"
  | "fitness"
  | "shopping"
  | "cafes"
  | "pharmacies"
  | "parking"
  | "schools";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places (New) primary types — first match used for searchNearby */
  primaryTypes: string[];
  ariaLabel: string;
};

/** Luxury golf enclave: lead with golf, recreation, healthcare, daily needs */
export const amenityCategories: AmenityCategory[] = [
  {
    id: "golf",
    label: "Golf",
    primaryTypes: ["golf_course"],
    ariaLabel: "Show golf courses near Tournament Hills",
  },
  {
    id: "parks",
    label: "Parks",
    primaryTypes: ["park"],
    ariaLabel: "Show parks near Tournament Hills",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    primaryTypes: ["hospital"],
    ariaLabel: "Show hospitals and healthcare near Tournament Hills",
  },
  {
    id: "grocery",
    label: "Grocery",
    primaryTypes: ["grocery_store", "supermarket"],
    ariaLabel: "Show grocery stores near Tournament Hills",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    primaryTypes: ["restaurant"],
    ariaLabel: "Show restaurants near Tournament Hills",
  },
  {
    id: "fitness",
    label: "Fitness",
    primaryTypes: ["gym", "fitness_center"],
    ariaLabel: "Show fitness centers near Tournament Hills",
  },
  {
    id: "shopping",
    label: "Shopping",
    primaryTypes: ["shopping_mall"],
    ariaLabel: "Show shopping near Tournament Hills",
  },
  {
    id: "cafes",
    label: "Cafes",
    primaryTypes: ["cafe", "coffee_shop"],
    ariaLabel: "Show cafes near Tournament Hills",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    primaryTypes: ["pharmacy"],
    ariaLabel: "Show pharmacies near Tournament Hills",
  },
  {
    id: "parking",
    label: "Parking",
    primaryTypes: ["parking"],
    ariaLabel: "Show parking near Tournament Hills",
  },
  {
    id: "schools",
    label: "Schools",
    primaryTypes: ["school", "primary_school", "secondary_school"],
    ariaLabel: "Show schools near Tournament Hills",
  },
];

export const AMENITY_MAP_DEFAULT_CATEGORY: AmenityCategoryId = "golf";

export const AMENITY_SEARCH_RADIUS_METERS = 8000;

export function getGoogleMapsEmbedUrl(
  lat: number = tournamentHillsMapCenter.lat,
  lng: number = tournamentHillsMapCenter.lng,
  zoom = 14,
): string {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export function getDirectionsUrl(lat: number, lng: number, placeName?: string): string {
  const query = placeName
    ? encodeURIComponent(placeName)
    : `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}
