# Schema Route Matrix

Maps each route to JSON-LD types. **One combined `@graph` per page** via `combineSchemas()`.

| Route | JSON-LD types | Generator / source |
|-------|---------------|-------------------|
| All pages (layout) | `RealEstateAgent`, `WebSite` | `generateRealEstateAgentSchema()`, `generateWebSiteSchema()` in `lib/schema.ts` |
| `/` | + `FAQPage` | `generateFAQPageSchema(tournamentHillsFaqs)` |
| `/neighborhoods/tournament-hills` | `BreadcrumbList`, `Place`, `FAQPage` | `generateBreadcrumbSchema`, `generateNeighborhoodSchema`, TH FAQs |
| `/neighborhoods/summerlin` | `BreadcrumbList`, `Place`, `FAQPage` | Inline in page |
| `/contact` | `ContactPage` | `generateContactPageSchema()` if present |
| `/faq` | `FAQPage` | `gbpFAQs` or merged set |
| `/listings` | (optional) `ItemList` | Future — listing carousel |

---

## @id conventions

| Entity | @id |
|--------|-----|
| Organization / agent | `https://www.tournamenthillshomes.com/#organization` |
| WebSite | `https://www.tournamenthillshomes.com/#website` |
| Tournament Hills Place | `https://www.tournamenthillshomes.com/neighborhoods/tournament-hills#place` |

---

## Rules

1. Do not duplicate `RealEstateAgent` on homepage if layout already emits it.
2. FAQ visible text must match schema `name` / `acceptedAnswer.text`.
3. No `aggregateRating` without GBP-verified counts.
4. `openingHoursSpecification` = M–F 9–6, Sat 10–4.

---

*Last updated: June 2026*
