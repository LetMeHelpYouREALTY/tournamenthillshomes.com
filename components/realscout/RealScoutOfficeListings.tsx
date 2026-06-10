import { REALSCOUT_OFFICE_LISTINGS_HTML } from "@/lib/realscout-config";

type RealScoutOfficeListingsProps = {
  /** Optional heading above the widget */
  showHeading?: boolean;
  className?: string;
};

export default function RealScoutOfficeListings({
  showHeading = true,
  className = "",
}: RealScoutOfficeListingsProps) {
  return (
    <section
      className={`py-10 md:py-14 bg-slate-50 border-y border-slate-200/80 ${className}`}
      aria-label="Homes for sale"
    >
      <div className="container mx-auto px-4">
        {showHeading && (
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Homes for Sale
            </h2>
            <p className="text-slate-600 mt-2 text-sm md:text-base">
              Live MLS listings — $700K–$1M single-family homes in Las Vegas &amp; Summerlin
            </p>
          </div>
        )}
        <div
          className="realscout-office-listings-host w-full min-h-[320px]"
          dangerouslySetInnerHTML={{ __html: REALSCOUT_OFFICE_LISTINGS_HTML }}
        />
      </div>
    </section>
  );
}
