import Link from "next/link";
import dynamic from "next/dynamic";
import { tournamentHillsMapCenter } from "@/lib/community-map-config";
import type { AmenityCategoryId } from "@/lib/community-map-config";

const CommunityAmenityMap = dynamic(
  () => import("@/components/maps/CommunityAmenityMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[420px] h-[420px] md:h-[480px] w-full rounded-lg bg-slate-100 animate-pulse border border-slate-200"
        aria-hidden="true"
      />
    ),
  },
);

type AmenityMapSectionProps = {
  /** Homepage / listings use compact copy */
  variant?: "default" | "compact";
  defaultCategory?: AmenityCategoryId;
  showViewAllLink?: boolean;
  hideHeading?: boolean;
  className?: string;
};

export default function AmenityMapSection({
  variant = "default",
  defaultCategory,
  showViewAllLink = true,
  hideHeading = false,
  className,
}: AmenityMapSectionProps) {
  const compact = variant === "compact";
  const title = compact
    ? `What's Near ${tournamentHillsMapCenter.communityName}`
    : `Life Near ${tournamentHillsMapCenter.communityName}`;

  return (
    <section
      className={className}
      aria-labelledby={
        hideHeading ? undefined : "amenity-map-section-heading"
      }
    >
      {!hideHeading && (
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h2
            id="amenity-map-section-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-3"
          >
            {title}
          </h2>
          <p className="text-slate-600 text-lg">
            Explore golf, parks, healthcare, grocery, dining, and shopping
            around TPC Summerlin in central Summerlin, Las Vegas{" "}
            {tournamentHillsMapCenter.postalCode}.
          </p>
          {showViewAllLink && (
            <p className="mt-4">
              <Link
                href="/amenities"
                className="text-blue-600 font-semibold hover:underline"
              >
                View full nearby amenities guide →
              </Link>
            </p>
          )}
        </div>
      )}
      <CommunityAmenityMap compact={compact} defaultCategory={defaultCategory} />
    </section>
  );
}
