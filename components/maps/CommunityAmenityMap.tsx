"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  amenityCategories,
  AMENITY_MAP_DEFAULT_CATEGORY,
  getDirectionsUrl,
  getGoogleMapsEmbedUrl,
  tournamentHillsMapCenter,
  type AmenityCategoryId,
} from "@/lib/community-map-config";
import {
  getCuratedPlacesForCategory,
  type CuratedAmenityPlace,
} from "@/lib/tournament-hills-amenities-content";
import {
  loadGoogleMaps,
  mapsAuthFailed,
} from "@/lib/google-maps-loader";
import { searchCategory } from "@/lib/places-search";
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

function CuratedPlaceCard({ place }: { place: CuratedAmenityPlace }) {
  return (
    <li>
      <span className="font-medium">{place.name}</span>
      <br />
      <span className="text-slate-600">
        {place.streetAddress}, {place.city}, NV {place.postalCode}
      </span>
      {place.note && (
        <p className="text-slate-500 text-xs mt-1">{place.note}</p>
      )}
    </li>
  );
}

function CuratedPlacesList({
  compact,
  categoryId,
}: {
  compact?: boolean;
  categoryId?: AmenityCategoryId;
}) {
  if (categoryId) {
    const items = getCuratedPlacesForCategory(categoryId);
    if (!items.length) return null;
    const label =
      amenityCategories.find((c) => c.id === categoryId)?.label ?? "Places";
    return (
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          Curated {label.toLowerCase()} near Tournament Hills
        </h3>
        <ul className="space-y-2 text-sm text-slate-700">
          {items.map((place) => (
            <CuratedPlaceCard key={place.name} place={place} />
          ))}
        </ul>
      </div>
    );
  }

  const grouped = amenityCategories.reduce<
    Record<string, CuratedAmenityPlace[]>
  >((acc, cat) => {
    const items = getCuratedPlacesForCategory(cat.id);
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
              <CuratedPlaceCard key={place.name} place={place} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function FallbackMapView({
  compact,
  categoryId,
}: {
  compact?: boolean;
  categoryId?: AmenityCategoryId;
}) {
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
          {categoryId ? (
            <CuratedPlacesList categoryId={categoryId} />
          ) : (
            <>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Curated places near Tournament Hills
              </h3>
              <CuratedPlacesList />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function openPlaceInfoWindow(
  infoWindow: google.maps.InfoWindow,
  map: google.maps.Map,
  marker: google.maps.Marker,
  title: string,
  address: string,
  mapsUri?: string | null,
) {
  const center = {
    lat: tournamentHillsMapCenter.lat,
    lng: tournamentHillsMapCenter.lng,
  };
  const dest =
    mapsUri ?? getDirectionsUrl(center.lat, center.lng, title);

  const root = document.createElement("div");
  root.style.maxWidth = "260px";
  root.style.fontFamily = "system-ui, sans-serif";

  const strong = document.createElement("strong");
  strong.textContent = title;
  root.appendChild(strong);

  const addr = document.createElement("p");
  addr.style.margin = "8px 0";
  addr.style.fontSize = "0.875rem";
  addr.textContent = address;
  root.appendChild(addr);

  const link = document.createElement("a");
  link.href = dest;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Directions";
  root.appendChild(link);

  infoWindow.setContent(root);
  infoWindow.open({ map, anchor: marker });
}

function placePosition(
  location: google.maps.LatLng | google.maps.LatLngLiteral,
): google.maps.LatLngLiteral {
  if (typeof (location as google.maps.LatLng).lat === "function") {
    const ll = location as google.maps.LatLng;
    return { lat: ll.lat(), lng: ll.lng() };
  }
  return location as google.maps.LatLngLiteral;
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

  const [mode, setMode] = useState<MapMode>(() =>
    !apiKey || mapsAuthFailed ? "fallback" : "interactive",
  );
  const [activeCategory, setActiveCategory] =
    useState<AmenityCategoryId>(defaultCategory);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placesSearchFailed, setPlacesSearchFailed] = useState(false);
  const mapInitializedRef = useRef(false);
  const [mapReady, setMapReady] = useState(false);

  const clearPlaceMarkers = useCallback(() => {
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
  }, []);

  const teardownMap = useCallback(() => {
    clearPlaceMarkers();
    communityMarkerRef.current?.setMap(null);
    communityMarkerRef.current = null;
    mapRef.current = null;
    mapInitializedRef.current = false;
    setMapReady(false);
    if (mapDivRef.current) {
      mapDivRef.current.replaceChildren();
    }
  }, [clearPlaceMarkers]);

  const enterFallback = useCallback(() => {
    teardownMap();
    setMode("fallback");
    setIsLoading(false);
    setPlacesSearchFailed(false);
  }, [teardownMap]);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () => window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

  const searchPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      if (!mapRef.current || mode !== "interactive") return;
      const category = amenityCategories.find((c) => c.id === categoryId);
      if (!category) return;

      setIsLoading(true);
      setPlacesSearchFailed(false);
      clearPlaceMarkers();

      const center = {
        lat: tournamentHillsMapCenter.lat,
        lng: tournamentHillsMapCenter.lng,
      };

      const infoWindow =
        infoWindowRef.current ?? new google.maps.InfoWindow();
      infoWindowRef.current = infoWindow;

      try {
        const places = await searchCategory(
          center,
          categoryId,
          category.primaryTypes,
        );

        places.forEach((place) => {
          const loc = place.location;
          if (!loc) return;
          const position = placePosition(loc);
          const marker = new google.maps.Marker({
            map: mapRef.current!,
            position,
            title: place.displayName ?? "Place",
          });
          marker.addListener("click", () => {
            openPlaceInfoWindow(
              infoWindow,
              mapRef.current!,
              marker,
              place.displayName ?? "Place",
              place.formattedAddress ?? "",
              place.googleMapsURI,
            );
          });
          markersRef.current.push(marker);
        });
      } catch {
        setPlacesSearchFailed(true);
      } finally {
        setIsLoading(false);
      }
    },
    [clearPlaceMarkers, mode],
  );

  const initMap = useCallback(async () => {
    if (!apiKey || !mapDivRef.current || mapInitializedRef.current) return;
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    try {
      await loadGoogleMaps(apiKey);
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
        openPlaceInfoWindow(
          infoWindow,
          mapRef.current!,
          communityMarkerRef.current!,
          tournamentHillsMapCenter.communityName,
          `Guard-gated luxury near TPC Summerlin — Summerlin, Las Vegas NV ${tournamentHillsMapCenter.postalCode}`,
          `https://www.google.com/maps?q=${center.lat},${center.lng}`,
        );
      });

      setMode("interactive");
      setMapReady(true);
    } catch {
      enterFallback();
    }
  }, [apiKey, compact, enterFallback, mapId]);

  useEffect(() => {
    if (mode !== "interactive" || !apiKey || mapsAuthFailed) return;
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
        <FallbackMapView compact={compact} categoryId={activeCategory} />
      </div>
    );
  }

  const curatedForCategory = getCuratedPlacesForCategory(activeCategory);

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

      {placesSearchFailed && curatedForCategory.length > 0 && (
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
          <p className="text-sm text-slate-700 mb-3">
            Live place results are unavailable right now. Here are verified
            nearby options for this category:
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            {curatedForCategory.map((place) => (
              <CuratedPlaceCard key={place.name} place={place} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
