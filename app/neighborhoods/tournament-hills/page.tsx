import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import {
  Phone,
  MapPin,
  TreePine,
  Mountain,
  GraduationCap,
  ShoppingBag,
  Shield,
  Flag,
} from "lucide-react";
import type { Metadata } from "next";
import SchemaScript from "@/components/SchemaScript";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateNeighborhoodSchema,
  combineSchemas,
} from "@/lib/schema";
import {
  tournamentHillsBreadcrumbs,
  tournamentHillsFaqs,
  tournamentHillsMarket,
  tournamentHillsNeighborhood,
} from "@/lib/tournament-hills-content";
import { agentInfo, officeInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Tournament Hills Homes for Sale | TPC Summerlin Luxury | Summerlin West",
  description:
    "Explore Tournament Hills homes for sale in guard-gated Summerlin West, Las Vegas (89134). TPC Summerlin golf community with custom luxury estates. Dr. Jan Duffy, BHHS Nevada. Call (702) 500-1942.",
  keywords: [
    "Tournament Hills homes for sale",
    "TPC Summerlin real estate",
    "Tournament Hills Summerlin",
    "guard gated luxury Summerlin",
    "89134 luxury homes",
    "Berkshire Hathaway Tournament Hills",
  ],
};

const pageSchemas = combineSchemas(
  generateBreadcrumbSchema(tournamentHillsBreadcrumbs),
  generateNeighborhoodSchema(tournamentHillsNeighborhood),
  generateFAQSchema(tournamentHillsFaqs)
);

export default function TournamentHillsPage() {
  return (
    <>
      <SchemaScript schema={pageSchemas} id="tournament-hills-schema" />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Guard-Gated Luxury · Zip {tournamentHillsMarket.zip}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Tournament Hills Real Estate in Summerlin
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Custom luxury homes in a guard-gated enclave surrounding TPC Summerlin—Las Vegas&apos;s
              premier PGA Tour golf address in the heart of Summerlin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                {agentInfo.phoneFormatted}
              </a>
              <Link
                href="/listings"
                className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                Search Listings
              </Link>
            </div>
          </div>

          {/* Market snapshot */}
          <section className="mb-16 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Active Price Band", value: tournamentHillsMarket.priceRangeFormatted },
                { label: "Community Type", value: "Guard-Gated" },
                { label: "Zip Code", value: tournamentHillsMarket.zip },
                { label: "Golf", value: "TPC Summerlin" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white border border-slate-200 rounded-lg p-6 text-center shadow-sm"
                >
                  <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                  <div className="text-slate-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">
              Market data last updated {tournamentHillsMarket.lastUpdated}. Price band reflects public
              MLS listing samples—not a computed median. Contact Dr. Jan Duffy for current comps.
            </p>
          </section>

          {/* Main content */}
          <section className="mb-16 max-w-4xl mx-auto prose prose-slate prose-lg">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 not-prose">
              Living in Tournament Hills, Summerlin
            </h2>
            <p>
              <strong>Tournament Hills</strong> is one of Summerlin&apos;s most exclusive guard-gated
              addresses—a collection of custom luxury estates wrapped around{" "}
              <strong>TPC Summerlin</strong>, a PGA Tour venue that hosts events including the
              Shriners Hospitals for Children Open. Buyers who discover Tournament Hills are typically
              relocating from coastal luxury markets, upgrading within Summerlin, or seeking a
              golf-forward lifestyle with Red Rock Canyon views and Strip access without sacrificing
              privacy.
            </p>
            <p>
              Unlike broader Summerlin villages with production builders, Tournament Hills emphasizes
              architect-designed residences on premium lots—many with golf course frontage, resort-style
              pools, and indoor-outdoor living suited to the desert climate. The guard gate provides
              controlled access valued by executives, entertainers, and families who prioritize security
              alongside location.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12 not-prose">
              TPC Summerlin & Golf Lifestyle
            </h2>
            <p>
              TPC Summerlin is a membership-based championship course managed under the TPC network.
              While membership is separate from homeownership, living in Tournament Hills places you
              steps from fairways where PGA Tour history was made—including Tiger Woods&apos;s first PGA
              Tour victory. The course conditions, practice facilities, and tournament atmosphere define
              the neighborhood&apos;s character year-round.
            </p>
            <p>
              For buyers comparing <Link href="/neighborhoods/the-ridges">The Ridges</Link> or other
              guard-gated Summerlin communities, Tournament Hills offers a distinctly golf-centric
              identity with central Summerlin convenience rather than west-village seclusion.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12 not-prose">
              Location, Commute & Nearby Amenities
            </h2>
            <div className="grid md:grid-cols-2 gap-8 not-prose mb-8">
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-slate-900">Shopping & Dining</h3>
                </div>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>
                    <strong>Downtown Summerlin:</strong> City National Arena, Las Vegas Ballpark,
                    retail, dining.
                  </li>
                  <li>
                    <strong>Tivoli Village & Boca Park:</strong> Boutique shopping and chef-driven
                    restaurants minutes away.
                  </li>
                  <li>
                    <strong>Costco & Trader Joe&apos;s:</strong> Everyday errands along Summerlin
                    Parkway corridor.
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mountain className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-slate-900">Recreation & Outdoors</h3>
                </div>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>
                    <strong>Red Rock Canyon:</strong> Hiking, climbing, and scenic drives west of
                    Summerlin.
                  </li>
                  <li>
                    <strong>Bruce Trent Park, Hills Park, Pueblo Park:</strong> Local parks for
                    trails, sports, and family outings.
                  </li>
                  <li>
                    <strong>150+ Summerlin parks & trails:</strong> Master-planned open space network.
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-slate-900">Schools (CCSD)</h3>
                </div>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>John W. Bonner Elementary — highly rated Summerlin elementary.</li>
                  <li>West Career & Technical Academy — top-ranked magnet high school.</li>
                  <li>Patricia A. Bendorf Elementary and other 9/10+ GreatSchools options nearby.</li>
                  <li>Private: The Meadows School, Bishop Gorman (short drive).</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-slate-900">Healthcare & Commute</h3>
                </div>
                <ul className="text-slate-600 text-sm space-y-2">
                  <li>
                    <strong>Summerlin Hospital</strong> and Red Rock medical campus for full-service
                    care.
                  </li>
                  <li>Summerlin Parkway, US-95, and 215 Beltway for Strip and airport access.</li>
                  <li>Car-oriented enclave; most errands are a short drive.</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12 not-prose">
              Adjacent Summerlin Villages
            </h2>
            <p>
              Tournament Hills sits among established Summerlin villages including The Vistas, The
              Paseos, The Cliffs, and Eagle Hills—each with distinct price points and housing stock.
              Dr. Jan Duffy helps buyers tour multiple villages in one day so you understand how
              Tournament Hills compares before you write an offer.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-6 mt-12 not-prose">
              Buying or Selling in Tournament Hills
            </h2>
            <p>
              Ultra-luxury Summerlin transactions require off-market awareness, accurate golf-front
              comps, and negotiation experience with discretionary sellers. As a{" "}
              <strong>Berkshire Hathaway HomeServices</strong> agent, Dr. Jan Duffy combines local
              guard-gated expertise with a globally trusted brand—critical when you are competing for
              a one-of-a-kind Tournament Hills estate or positioning your home for qualified buyers.
            </p>
            <p>
              Request a private consultation for a current MLS snapshot,{" "}
              <Link href="/home-valuation">home valuation</Link>, or curated{" "}
              <Link href="/listings">Tournament Hills listing search</Link>.
            </p>
          </section>

          {/* Feature icons */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Shield, label: "Guard-Gated" },
                { icon: Flag, label: "TPC Summerlin" },
                { icon: TreePine, label: "Summerlin Parks" },
                { icon: Mountain, label: "Red Rock Views" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center p-4">
                  <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Map */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Tournament Hills Area</h2>
            <div className="aspect-video rounded-lg overflow-hidden border border-slate-200">
              <iframe
                title="Tournament Hills Summerlin map"
                src="https://maps.google.com/maps?q=Tournament+Hills+Summerlin+Las+Vegas+NV+89134&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-center text-sm text-slate-500 mt-3">
              {officeInfo.address.full} · {agentInfo.phoneFormatted}
            </p>
          </section>

          {/* Expert quote */}
          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                &ldquo;Tournament Hills buyers want privacy, golf, and a true Summerlin address—not a
                compromise. I tour guard-gated communities weekly and can show you which streets deliver
                the views, lot size, and value you are targeting.&rdquo;
              </blockquote>
              <cite className="text-slate-900 font-semibold">
                — Dr. Jan Duffy, Berkshire Hathaway HomeServices Nevada Properties
              </cite>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Tournament Hills Real Estate FAQ
            </h2>
            <div className="space-y-6">
              {tournamentHillsFaqs.map((faq) => (
                <div key={faq.question} className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore Tournament Hills?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact Dr. Jan Duffy for a private tour, off-market insights, and current luxury
              Summerlin listings.
            </p>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call {agentInfo.phoneFormatted}
            </a>
            <p className="mt-4 text-blue-200 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties · License {agentInfo.license}
            </p>
          </section>
        </div>
        <div className="text-center text-sm text-slate-500 mt-8">
          Last Updated: {tournamentHillsMarket.lastUpdated}
        </div>
      </main>
      <Footer />
    </>
  );
}
