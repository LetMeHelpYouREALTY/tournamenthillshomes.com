# Tournament Hills Hyperlocal SEO Spec

**Site:** [www.tournamenthillshomes.com](https://www.tournamenthillshomes.com)  
**Agent:** Dr. Jan Duffy, REALTOR® — License S.0197614.LLC — Berkshire Hathaway HomeServices Nevada Properties  
**Primary community:** Tournament Hills, Summerlin, Las Vegas, NV **89134**

This document is the single source of truth for SEO, AEO, GEO, and JSON-LD work on this microsite.

---

## 1. Mission and canonical host

| Item | Value |
|------|--------|
| Canonical URL | `https://www.tournamenthillshomes.com` |
| Apex redirect | `tournamenthillshomes.com` → 308 → www (Vercel + `next.config.js`) |
| Primary keyword cluster | Tournament Hills homes for sale, TPC Summerlin luxury, Summerlin guard-gated |
| Env var | `NEXT_PUBLIC_SITE_URL=https://www.tournamenthillshomes.com` |

---

## 2. Entity model (GEO)

Two distinct entities — do not merge office NAP with the residential community.

### Agent / office entity

- **Type:** `RealEstateAgent`
- **@id:** `https://www.tournamenthillshomes.com/#organization`
- **Name:** Dr. Jan Duffy — Berkshire Hathaway HomeServices Nevada Properties
- **Office NAP:** 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134
- **Phone:** (702) 500-1942
- **Email:** `DrDuffyDells@TournamentHillsHomes.com` (override via `NEXT_PUBLIC_CONTACT_EMAIL` in Vercel if needed)
- **License:** S.0197614.LLC
- **areaServed:** Tournament Hills, Summerlin, Las Vegas, Clark County NV

### Community entity

- **Type:** `Place` (or `ResidentialComplex` when golf-club amenities are emphasized)
- **@id:** `https://www.tournamenthillshomes.com/neighborhoods/tournament-hills#place`
- **Name:** Tournament Hills, Summerlin
- **Zip:** 89134
- **Context:** Guard-gated luxury community around **TPC Summerlin** (PGA Tour venue; Shriners Hospitals for Children Open)

Stable `@id` and canonical URLs must match visible copy on every page.

---

## 3. Community facts (hyperlocal reference)

Synthesized from public competitor area guides and MLS listing pages ([Luxury Homes of Las Vegas](https://luxuryhomesoflasvegas.com/communities/tournament-hills/), [Huntington & Ellis](https://huntingtonandellis.com/neighborhoods/tournament-hills)). **Re-verify before each quarterly content refresh.**

| Topic | Content guidance |
|-------|------------------|
| Community type | Guard-gated luxury; custom traditional and contemporary estates |
| Golf | TPC Summerlin — PGA Tour history; membership course adjacent to community |
| Price band | Ultra-luxury; public active listings commonly **$3.5M – $7M+** (use range, not a fabricated median) |
| Location | Central Summerlin; Summerlin Parkway, US-95, 215 access |
| Nearby retail | Downtown Summerlin, Tivoli Village, Boca Park |
| Healthcare | Summerlin Hospital, Red Rock medical campus |
| Recreation | Red Rock Canyon, City National Arena, Las Vegas Ballpark, 150+ Summerlin parks |
| Parks (nearby) | Bruce Trent Park, Hills Park, Pueblo Park |
| Schools (examples) | Bonner Elementary, West CTA, Bendorf Elementary — CCSD; verify ratings on GreatSchools |
| Lifestyle scores | Car-oriented community (Walk Score ~40s typical for enclave) |

**Content integrity:** Never invent medians, DOM, or review counts. Cite `lastUpdated` on market sections.

---

## 4. GBP alignment checklist

Before publishing stats or review schema:

- [ ] Visible NAP on every page matches JSON-LD
- [ ] Phone `(702) 500-1942` everywhere (no legacy 702-222-1964)
- [ ] Office address matches GBP: 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134
- [ ] Hours in schema match GBP (M–F 9–6, Sat 10–4, Sun by appointment)
- [ ] `aggregateRating` only if verified against GBP / documented reviews
- [ ] GBP business name decision documented in [`gbp-nap-audit.md`](./gbp-nap-audit.md)

---

## 5. Page inventory and content requirements

| Route | Title/H1 focus | Min words | Required sections |
|-------|----------------|-----------|-------------------|
| `/` | Tournament Hills Homes for Sale | 600+ | Domain hero, TH market band, RealScout, TH FAQ + FAQPage, NAP, CTA |
| `/neighborhoods/tournament-hills` | Tournament Hills Summerlin Real Estate | 800+ | Breadcrumb, market band, TPC/golf, guard-gate, amenities table, schools, commute, map embed, FAQ + schema, CTA |
| `/listings` | Tournament Hills / Summerlin listings | 300+ | RealScout widget, MLS disclaimer |
| `/contact` | Contact Dr. Jan Duffy | 300+ | NAP, hours, map, ContactPage schema |
| `/home-valuation` | Tournament Hills home value | 300+ | Lead form, localized copy |
| `/faq` | Tournament Hills + BHHS FAQs | 500+ | TH subset + general; FAQPage |

Every page: business name, address, phone in footer; LocalBusiness/RealEstateAgent on layout or page.

---

## 6. Schema map

See [`schema-route-matrix.md`](./schema-route-matrix.md). Rule: **one `@graph` per page**, no duplicate `@id` for the same entity type.

---

## 7. FAQ inventory (AEO)

Implemented in [`lib/tournament-hills-content.ts`](../../lib/tournament-hills-content.ts):

1. Where is Tournament Hills located?
2. What is special about TPC Summerlin?
3. What price range are Tournament Hills homes?
4. Is Tournament Hills guard-gated?
5. What amenities are near Tournament Hills?
6. What schools serve Tournament Hills?
7. Tournament Hills vs The Ridges / other Summerlin villages?
8. Why work with Dr. Jan Duffy?

Visible FAQ text must match `FAQPage` JSON-LD exactly.

---

## 8. Internal linking map

| From | To | Anchor text example |
|------|-----|---------------------|
| `/` | `/neighborhoods/tournament-hills` | Tournament Hills neighborhood guide |
| `/` | `/listings` | Tournament Hills homes for sale |
| `/` | `/home-valuation` | Free Tournament Hills home valuation |
| `/` | `/contact` | Contact Dr. Jan Duffy |
| `/neighborhoods/tournament-hills` | `/listings` | Search Tournament Hills listings |
| `/neighborhoods/tournament-hills` | `/luxury-homes` | Las Vegas luxury homes |
| `/neighborhoods` | `/neighborhoods/tournament-hills` | Tournament Hills (featured first) |

---

## 9. GSC workflow

| Step | Action |
|------|--------|
| Property | `https://www.tournamenthillshomes.com` |
| Sitemap | `https://www.tournamenthillshomes.com/sitemap.xml` |
| Priority URLs | `/`, `/neighborhoods/tournament-hills`, `/contact`, `/listings` |
| Validate | [Rich Results Test](https://search.google.com/test/rich-results) |
| Index | URL Inspection → Request indexing (sparingly) after deploy |

Do **not** block `/_next/static` in robots.

---

## 10. Implementation phases

| Phase | Status | Scope |
|-------|--------|--------|
| P0 | Done | This spec + research appendix + NAP audit + schema matrix |
| P1 | Done | TH neighborhood page, layout schema, homepage FAQ/NAP, sitemap |
| P2 | Done | `metadataBase`, expanded gbpFAQs, homepage market band from `tournamentHillsMarket` |
| P3 | In progress | robots via `app/robots.ts`, consolidate FAQ generators, Rich Results QA |

---

## 11. Verification checklist

- [ ] Apex 308 → www
- [ ] NAP consistent site-wide
- [ ] `/neighborhoods/tournament-hills` 200, 800+ words, unique H1
- [ ] Homepage FAQ = FAQPage JSON-LD
- [ ] Rich Results: no critical errors on `/`, `/neighborhoods/tournament-hills`, `/contact`
- [ ] GSC sitemap submitted

---

## Related docs

- [Research appendix](./research/hyperlocal-seo-geo-aeo-2026.md)
- [GBP NAP audit](./gbp-nap-audit.md)
- [Schema route matrix](./schema-route-matrix.md)
- [AGENTS.md](../../AGENTS.md)
