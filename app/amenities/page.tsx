import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { Phone, MapPin } from "lucide-react";
import SchemaScript from "@/components/SchemaScript";
import AmenityMapSection from "@/components/maps/AmenityMapSection";
import {
  generateBreadcrumbSchema,
  generateCommunityPlaceSchema,
  generateFAQSchema,
  generateFeaturedPlacesItemList,
  combineSchemas,
} from "@/lib/schema";
import {
  amenitiesBreadcrumbs,
  amenitiesCommuteNotes,
  amenitiesPageFaqs,
  curatedAmenityPlaces,
  getAmenitiesPageTitle,
} from "@/lib/tournament-hills-amenities-content";
import { tournamentHillsMapCenter } from "@/lib/community-map-config";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { tournamentHillsMarket } from "@/lib/tournament-hills-content";

const pageUrl = `${siteConfig.url.replace(/\/$/, "")}/amenities`;

export const metadata: Metadata = {
  title: `${getAmenitiesPageTitle()} | Dr. Jan Duffy REALTOR®`,
  description:
    "Interactive map and guide to restaurants, golf, parks, healthcare, grocery, and shopping near Tournament Hills and TPC Summerlin in Summerlin, Las Vegas 89134. Dr. Jan Duffy, BHHS Nevada. Call (702) 500-1942.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: getAmenitiesPageTitle(),
    description:
      "Explore verified nearby amenities around Tournament Hills — guard-gated luxury near TPC Summerlin, Summerlin Las Vegas.",
    url: pageUrl,
    type: "website",
  },
};

const featuredForSchema = curatedAmenityPlaces.map((p) => ({
  name: p.name,
  schemaType: p.schemaType,
  streetAddress: p.streetAddress,
  city: p.city,
  postalCode: p.postalCode,
}));

const pageSchemas = combineSchemas(
  generateBreadcrumbSchema(amenitiesBreadcrumbs),
  generateCommunityPlaceSchema({
    name: tournamentHillsMapCenter.communityName,
    description:
      "Guard-gated luxury golf community surrounding TPC Summerlin in central Summerlin, Las Vegas.",
    slug: "tournament-hills",
    latitude: tournamentHillsMapCenter.lat,
    longitude: tournamentHillsMapCenter.lng,
    postalCode: tournamentHillsMapCenter.postalCode,
  }),
  generateFeaturedPlacesItemList(
    featuredForSchema,
    "Places near Tournament Hills, Summerlin",
  ),
  generateFAQSchema(amenitiesPageFaqs),
);

export default function AmenitiesPage() {
  return (
    <>
      <SchemaScript schema={pageSchemas} id="amenities-page-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-blue-700 mb-3">
              Summerlin · Zip {tournamentHillsMapCenter.postalCode}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {getAmenitiesPageTitle()}
            </h1>
            <p className="text-lg text-slate-600">
              Guard-gated luxury living around TPC Summerlin — dining, golf,
              healthcare, parks, and daily errands within a short drive of
              Tournament Hills.
            </p>
          </header>

          <div className="max-w-6xl mx-auto mb-16">
            <AmenityMapSection showViewAllLink={false} hideHeading />
          </div>

          <article className="max-w-4xl mx-auto prose prose-slate lg:prose-lg">
            <h2>Dining near Tournament Hills</h2>
            <p>
              Tournament Hills is a car-friendly Summerlin enclave, so most
              residents dine at nearby clusters rather than walking out the
              gate. <strong>Downtown Summerlin</strong> (1980 Festival Plaza
              Drive) and <strong>Tivoli Village</strong> (440 S Rampart
              Boulevard) are the primary restaurant destinations — from coffee
              and casual lunch to upscale dinner service along Rampart and
              Sahara corridors.
            </p>

            <h2>Golf &amp; recreation</h2>
            <p>
              <strong>TPC Summerlin</strong> at 1700 Village Center Circle is
              the defining amenity — a private PGA Tour club that hosts events
              including the Shriners Hospitals for Children Open. Membership is
              separate from homeownership, but the course shapes Tournament
              Hills streetscapes and views. For public recreation, Summerlin
              offers 150+ parks; <strong>Bruce Trent Park</strong> (8851 Vegas
              Drive), <strong>Hills Park</strong> (8301 W Charleston Boulevard),
              and <strong>Pueblo Park</strong> (6320 W Maule Avenue) are popular
              options within a reasonable drive.
            </p>
            <p>
              <strong>Red Rock Canyon National Conservation Area</strong> is
              west of Summerlin for hiking and scenic drives —{" "}
              {amenitiesCommuteNotes.redRock}
            </p>

            <h2>Healthcare</h2>
            <p>
              <strong>Summerlin Hospital Medical Center</strong> at 657 Town
              Center Drive anchors west-Summerlin healthcare, with physician
              offices and urgent care along Town Center and the Red Rock medical
              campus corridor. Always confirm in-network providers with your
              insurance before relocating.
            </p>

            <h2>Grocery &amp; shopping</h2>
            <p>
              Daily shopping concentrates at <strong>Downtown Summerlin</strong>{" "}
              and <strong>Boca Park Fashion Village</strong> (750 S Rampart
              Boulevard). Many buyers also use Trader Joe&apos;s, Costco, and
              other Summerlin grocers along Charleston and Rampart — verify
              drive times from your specific Tournament Hills address.
            </p>

            <h2>Schools (CCSD)</h2>
            <p>
              Tournament Hills families attend Clark County School District
              schools; nearby examples include{" "}
              <strong>John W. Bonner Elementary</strong> (765 Crestda Lane) and{" "}
              <strong>Patricia A. Bendorf Elementary</strong> (3850 S Town
              Center Drive). Boundaries change — confirm assigned schools on
              CCSD and GreatSchools before you write an offer.
            </p>

            <h2>Commute &amp; key destinations</h2>
            <ul>
              <li>
                <strong>Las Vegas Strip:</strong>{" "}
                {amenitiesCommuteNotes.strip}
              </li>
              <li>
                <strong>Harry Reid International Airport (LAS):</strong>{" "}
                {amenitiesCommuteNotes.airport}
              </li>
              <li>
                <strong>Downtown Summerlin:</strong>{" "}
                {amenitiesCommuteNotes.downtownSummerlin}
              </li>
            </ul>
            <p className="text-sm text-slate-500 not-prose">
              Drive times are approximate and traffic-dependent. Last updated:{" "}
              {amenitiesCommuteNotes.lastUpdated}.
            </p>
          </article>

          <section
            className="max-w-4xl mx-auto mt-16"
            aria-labelledby="amenities-faq-heading"
          >
            <h2
              id="amenities-faq-heading"
              className="text-3xl font-bold text-slate-900 mb-8 text-center"
            >
              Nearby Amenities FAQ
            </h2>
            <div className="space-y-4">
              {amenitiesPageFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border border-slate-200 rounded-lg p-6 bg-white"
                >
                  <h3 className="font-bold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="max-w-4xl mx-auto mt-16 text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">
              Your Tournament Hills REALTOR®
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Dr. Jan Duffy helps luxury buyers and sellers navigate guard-gated
              Summerlin communities with MLS accuracy and local street-level
              knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-3 rounded-md font-bold hover:bg-blue-50 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden />
                Call {agentInfo.phoneFormatted}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-md font-bold transition-colors"
              >
                Contact Dr. Jan Duffy
              </Link>
            </div>
            <p className="text-sm text-blue-200 flex flex-col sm:flex-row items-center justify-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {officeInfo.address.full} · License {agentInfo.license} ·{" "}
              {agentInfo.brokerage}
            </p>
            <p className="text-sm text-blue-200 mt-4">
              <Link href="/neighborhoods/tournament-hills" className="underline">
                Tournament Hills neighborhood guide
              </Link>
              {" · "}
              <Link href="/listings" className="underline">
                Search listings
              </Link>
            </p>
          </section>

          <p className="text-center text-sm text-slate-500 mt-10">
            Community market band: {tournamentHillsMarket.priceRangeFormatted}{" "}
            · Updated {tournamentHillsMarket.lastUpdated}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
