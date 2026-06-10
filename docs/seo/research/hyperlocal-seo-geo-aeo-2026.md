# Hyperlocal SEO, GEO, and AEO — Research Appendix (2026)

Supporting research for [`tournament-hills-hyperlocal-spec.md`](./tournament-hills-hyperlocal-spec.md).

---

## 1. Hyperlocal SEO fundamentals

**Definition:** Content and technical signals that establish authority for a specific neighborhood or micro-market—not just a city or metro.

**2026 priorities:**

1. **Entity clarity** — Separate agent/office (`RealEstateAgent`) from place (`Place` / `ResidentialComplex`).
2. **NAP consistency** — Visible text = JSON-LD = Google Business Profile.
3. **Answer-first content** — FAQ blocks with matching `FAQPage` schema for AI Overviews and voice search.
4. **Stable `@id` URLs** — Same canonical host and fragment IDs across pages.
5. **E-E-A-T** — Named agent, license, brokerage, verifiable contact, local expertise signals.

**Sources:**

- Google Search Central — [Structured data intro](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- Schema.org — [RealEstateAgent](https://schema.org/RealEstateAgent), [FAQPage](https://schema.org/FAQPage), [Place](https://schema.org/Place)

---

## 2. GEO (Generative Engine Optimization)

LLMs and AI search surfaces favor:

| Signal | Implementation on this site |
|--------|----------------------------|
| Clear entity names | "Tournament Hills", "TPC Summerlin", "Dr. Jan Duffy" |
| Factual, citable structure | H2/H3 sections, tables, FAQ Q&A pairs |
| Geographic anchors | Zip 89134, Summerlin, Clark County NV |
| No fabricated stats | Price *ranges* from MLS samples; dated `lastUpdated` |
| Internal links | Neighborhood hub → listings → contact |

Avoid keyword stuffing; write for humans first, schema second.

---

## 3. AEO (Answer Engine Optimization)

- One question per H3 in FAQ sections.
- First sentence = direct answer (40–60 words ideal for snippet extraction).
- Mirror exact Q&A in `FAQPage` JSON-LD.
- Cover intent clusters: location, price, schools, golf, guard-gate, agent credentials.

---

## 4. Tournament Hills competitor content audit (June 2026)

**Purpose:** Inform original copy for Dr. Jan Duffy—not verbatim reuse.

| Source | URL | Useful facts |
|--------|-----|--------------|
| Luxury Homes of Las Vegas | https://luxuryhomesoflasvegas.com/communities/tournament-hills/ | Guard-gated; TPC Summerlin; Tiger Woods first PGA win; zip 89134; listing band ~$3.5M–$6.25M+; Tivoli Village, Summerlin Hospital, Red Rock proximity |
| Huntington & Ellis | https://huntingtonandellis.com/neighborhoods/tournament-hills | Shriners Open; parks (Bruce Trent, Hills, Pueblo); CCSD schools with GreatSchools ratings; Downtown Summerlin amenities (City National Arena, Ballpark); adjacent villages (Vistas, Paseos, Cliffs) |

**Our differentiation:** BHHS brand, Dr. Jan Duffy license and track record, RealScout search, FUB lead routing, Berkshire Hathaway trust narrative.

---

## 5. JSON-LD best practices (2026)

- Prefer `@graph` when multiple types on one page.
- One `FAQPage` per URL; questions must appear on-page.
- `aggregateRating` only with verifiable review source.
- `openingHoursSpecification` must match GBP.
- Use `metadataBase` in root layout for relative OG URLs.

---

## 6. Core Web Vitals (real estate sites)

- RealScout script: load once in root layout; CSP allows `em.realscout.com` + `www.realscout.com`.
- Lazy-load below-fold images; `priority` on hero only.
- Avoid duplicate JSON-LD blocks (layout vs page).

---

## 7. Quarterly refresh cadence

| Task | Frequency |
|------|-----------|
| MLS price band on TH page | Quarterly |
| FAQ accuracy (schools, events) | Quarterly |
| GSC coverage / CWV | Monthly |
| GBP NAP audit | On GBP change or monthly |
| Competitor page scan | Quarterly |

---

*Last updated: June 2026*
