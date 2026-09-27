"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  amenityCategories,
  AMENITY_MAP_DEFAULT_CATEGORY,
  AMENITY_SEARCH_RADIUS_METERS,
  getDirectionsUrl,
  getGoogleMapsEmbedUrl,
  tournamentHillsMapCenter,
  type AmenityCategoryId,
} from "@/lib/community-map-config";
import { curatedAmenityPlaces } from "@/lib/tournament-hills-amenities-content";
import { cn } from "@/lib/utils";

type MapMode = "interactive" | "fallback";

const MAP_HEIGHT_CLASS = "min-h-[420px] h-[420px] md:h-[480px]";

function AmenityMapSkeleton() {
  return (
    <div
      className={cn(
        MAP_HEIGHT_CLASS,
        "w-full rounded-lg bg-slate-100 animate-pulse border border-slate-200",
      )}
      aria-hidden="true"
    />
  );
}

function CuratedPlacesList({ compact }: { compact?: boolean }) {
  const grouped = amenityCategories.reduce<
    Record<string, typeof curatedAmenityPlaces>
  >((acc, cat) => {
    const items = curatedAmenityPlaces.filter((p) => {
      const map: Partial<Record<AmenityCategoryId, string[]>> = {
        golf: ["Golf"],
        parks: ["Parks & recreation"],
        healthcare: ["Healthcare"],
        shopping: ["Shopping", "Shopping & dining"],
        schools: ["Schools (CCSD)"],
      };
      const labels = map[cat.id];
      return labels?.some((l) => p.category.includes(l) || p.category === l);
    });
    if (items.length) acc[cat.label] = items;
    return acc;
  }, {});

  return (
    <ul
      className={cn(
        "grid gap-4 text-sm text-slate-700",
        compact ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {Object.entries(grouped).map(([label, places]) => (
        <li key={label} className="border border-slate-200 rounded-lg p-4 bg-white">
          <h3 className="font-semibold text-slate-900 mb-2">{label}</h3>
          <ul className="space-y-2">
            {places.map((place) => (
              <li key={place.name}>
                <span className="font-medium">{place.name}</span>
                <br />
                <span className="text-slate-600">
                  {place.streetAddress}, {place.city}, NV {place.postalCode}
                </span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function FallbackMapView({ compact }: { compact?: boolean }) {
  return (
    <div className="space-y-6">
      <div
        className={cn(
          "rounded-lg overflow-hidden border border-slate-200",
          MAP_HEIGHT_CLASS,
        )}
      >
        <iframe
          title={`Map of ${tournamentHillsMapCenter.communityName}, Summerlin Las Vegas`}
          src={getGoogleMapsEmbedUrl()}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {!compact && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Curated places near Tournament Hills
          </h3>
          <CuratedPlacesList />
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    google: typeof google;
  }
}

async function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (window.google?.maps) return;
  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector('script[data-google-maps="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Google Maps failed to load")),
      );
      if (window.google?.maps) resolve();
      return;
    }
    const script = document.createElement("script");
    script.dataset.googleMaps = "true";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });
}

type CommunityAmenityMapProps = {
  compact?: boolean;
  defaultCategory?: AmenityCategoryId;
  className?: string;
};

export default function CommunityAmenityMap({
  compact = false,
  defaultCategory = AMENITY_MAP_DEFAULT_CATEGORY,
  className,
}: CommunityAmenityMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [mode, setMode] = useState<MapMode>(apiKey ? "interactive" : "fallback");
  const [activeCategory, setActiveCategory] =
    useState<AmenityCategoryId>(defaultCategory);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const clearPlaceMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const searchPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || !window.google?.maps) return;
      const category = amenityCategories.find((c) => c.id === categoryId);
      if (!category) return;

      setIsLoading(true);
      clearPlaceMarkers();

      const center = {
        lat: tournamentHillsMapCenter.lat,
        lng: tournamentHillsMapCenter.lng,
      };

      const infoWindow =
        infoWindowRef.current ?? new google.maps.InfoWindow();
      infoWindowRef.current = infoWindow;

      const showInfo = (
        marker: google.maps.Marker,
        title: string,
        address: string,
        rating?: number | null,
        mapsUri?: string | null,
      ) => {
        const ratingLine =
          rating != null && rating > 0
            ? `<p class="text-sm mt-1">Rating: ${rating.toFixed(1)}</p>`
            : "";
        const dest = mapsUri || getDirectionsUrl(center.lat, center.lng, title);
        infoWindow.setContent(
          `<div style="max-width:260px;font-family:system-ui,sans-serif">
            <strong>${title}</strong>
            ${ratingLine}
            <p class="text-sm" style="margin:8px 0">${address}</p>
            <a href="${dest}" target="_blank" rel="noopener noreferrer">Directions</a>
          </div>`,
        );
        infoWindow.open({ map: mapRef.current!, anchor: marker });
      };

      try {
        const placesLib = (await google.maps.importLibrary(
          "places",
        )) as google.maps.PlacesLibrary;
        const PlaceCtor = placesLib.Place;

        if (PlaceCtor?.searchNearby) {
          const primaryType = category.primaryTypes[0];
          const { places } = await PlaceCtor.searchNearby({
            fields: [
              "displayName",
              "location",
              "formattedAddress",
              "rating",
              "googleMapsURI",
            ],
            locationRestriction: {
              center,
              radius: AMENITY_SEARCH_RADIUS_METERS,
            },
            includedPrimaryTypes: [primaryType],
            maxResultCount: 20,
          });

          places.forEach((place) => {
            const loc = place.location;
            if (!loc) return;
            const marker = new google.maps.Marker({
              map: mapRef.current!,
              position: loc,
              title: place.displayName ?? "Place",
            });
            marker.addListener("click", () => {
              showInfo(
                marker,
                place.displayName ?? "Place",
                place.formattedAddress ?? "",
                place.rating,
                place.googleMapsURI,
              );
            });
            markersRef.current.push(marker);
          });
          setIsLoading(false);
          return;
        }
      } catch {
        // Fall through to legacy Nearby Search
      }

      try {
        const service = new google.maps.places.PlacesService(mapRef.current);
        const type = category.primaryTypes[0] as string;
        await new Promise<void>((resolve) => {
          service.nearbySearch(
            {
              location: new google.maps.LatLng(center.lat, center.lng),
              radius: AMENITY_SEARCH_RADIUS_METERS,
              type,
            },
            (results, status) => {
              if (
                status !== google.maps.places.PlacesServiceStatus.OK ||
                !results
              ) {
                resolve();
                return;
              }
              results.slice(0, 20).forEach((result) => {
                if (!result.geometry?.location) return;
                const marker = new google.maps.Marker({
                  map: mapRef.current!,
                  position: result.geometry.location,
                  title: result.name,
                });
                marker.addListener("click", () => {
                  showInfo(
                    marker,
                    result.name ?? "Place",
                    result.vicinity ?? result.formatted_address ?? "",
                    result.rating,
                    result.place_id
                      ? `https://www.google.com/maps/place/?q=place_id:${result.place_id}`
                      : undefined,
                  );
                });
                markersRef.current.push(marker);
              });
              resolve();
            },
          );
        });
      } catch {
        setLoadError("Unable to load nearby places.");
      } finally {
        setIsLoading(false);
      }
    },
    [clearPlaceMarkers],
  );

  const mapInitializedRef = useRef(false);
  const [mapReady, setMapReady] = useState(false);

  const initMap = useCallback(async () => {
    if (!apiKey || !mapDivRef.current || mapInitializedRef.current) return;
    try {
      await loadGoogleMapsScript(apiKey);
      const { Map } = (await google.maps.importLibrary(
        "maps",
      )) as google.maps.MapsLibrary;

      const center = {
        lat: tournamentHillsMapCenter.lat,
        lng: tournamentHillsMapCenter.lng,
      };

      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: !compact,
        fullscreenControl: true,
      };
      if (mapId) {
        mapOptions.mapId = mapId;
      }

      mapRef.current = new Map(mapDivRef.current, mapOptions);
      mapInitializedRef.current = true;

      communityMarkerRef.current = new google.maps.Marker({
        map: mapRef.current,
        position: center,
        title: tournamentHillsMapCenter.label,
        zIndex: 1000,
      });

      const infoWindow = new google.maps.InfoWindow();
      infoWindowRef.current = infoWindow;
      communityMarkerRef.current.addListener("click", () => {
        infoWindow.setContent(
          `<div style="font-family:system-ui,sans-serif">
            <strong>${tournamentHillsMapCenter.communityName}</strong>
            <p style="margin:8px 0">Guard-gated luxury near TPC Summerlin<br/>Summerlin, Las Vegas NV ${tournamentHillsMapCenter.postalCode}</p>
            <a href="https://www.google.com/maps?q=${center.lat},${center.lng}" target="_blank" rel="noopener noreferrer">View on Google Maps</a>
          </div>`,
        );
        infoWindow.open({
          map: mapRef.current!,
          anchor: communityMarkerRef.current!,
        });
      });

      setMode("interactive");
      setMapReady(true);
    } catch {
      setMode("fallback");
      setLoadError(null);
    }
  }, [apiKey, compact, mapId]);

  useEffect(() => {
    if (mode !== "interactive" || !apiKey) return;
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.1 },
    );
    observerRef.current.observe(containerRef.current);
    return () => observerRef.current?.disconnect();
  }, [apiKey, mode]);

  useEffect(() => {
    if (!isVisible || mode !== "interactive") return;
    void initMap();
  }, [initMap, isVisible, mode]);

  useEffect(() => {
    if (mode !== "interactive" || !mapReady) return;
    void searchPlaces(activeCategory);
  }, [activeCategory, mapReady, mode, searchPlaces]);

  if (mode === "fallback") {
    return (
      <div className={className}>
        <FallbackMapView compact={compact} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("space-y-4", className)}>
      <div
        role="tablist"
        aria-label="Filter nearby amenities by category"
        className="flex flex-wrap gap-2"
      >
        {amenityCategories.map((cat) => {
          const selected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={cat.ariaLabel}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                selected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-300 hover:border-blue-400",
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {loadError && (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          {loadError} Showing map with community pin; try another category.
        </p>
      )}

      <div className="relative rounded-lg overflow-hidden border border-slate-200">
        {!isVisible && <AmenityMapSkeleton />}
        <div
          ref={mapDivRef}
          className={cn(MAP_HEIGHT_CLASS, "w-full", !isVisible && "hidden")}
          aria-label={`Interactive map of amenities near ${tournamentHillsMapCenter.communityName}`}
          role="application"
        />
        {isLoading && isVisible && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 pointer-events-none">
            <span className="text-sm font-medium text-slate-700">
              Loading places…
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
