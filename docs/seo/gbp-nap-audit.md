# GBP NAP Audit — tournamenthillshomes.com

Reconcile visible site copy, JSON-LD, and Google Business Profile before each deploy.

---

## Canonical NAP (source of truth)

| Field | Value |
|-------|--------|
| **Business / agent display** | Dr. Jan Duffy — Berkshire Hathaway HomeServices Nevada Properties |
| **Street** | 9406 W Lake Mead Blvd, Suite 100 |
| **City, state, zip** | Las Vegas, NV 89134 |
| **Phone** | (702) 500-1942 |
| **Phone tel:** | `tel:+17025001942` |
| **Email** | DrDuffyDells@TournamentHillsHomes.com |
| **License** | S.0197614.LLC |
| **Website** | https://www.tournamenthillshomes.com |

---

## Hours (schema + visible)

| Day | Hours |
|-----|--------|
| Monday – Friday | 9:00 AM – 6:00 PM |
| Saturday | 10:00 AM – 4:00 PM |
| Sunday | By appointment |

---

## Known discrepancies to fix

| Location | Issue | Fix |
|----------|--------|-----|
| `app/page.tsx` | Legacy phone 702-222-1964 | → (702) 500-1942 |
| `lib/gbp-schema.ts` vs `lib/schema.ts` | Duplicate FAQ generators | Consolidate in Phase 3 |
| Neighborhood zip in old notes | 89135 mentioned | Community is **89134** per MLS/area guides |
| `marketStats.lasVegas.medianPrice` on homepage | Valley-wide $450K | Use Tournament Hills / luxury band on TH site |

---

## GBP checklist

- [ ] GBP primary category: Real estate agent (or equivalent)
- [ ] Service area includes Tournament Hills / Summerlin
- [ ] Website URL = https://www.tournamenthillshomes.com
- [ ] Phone matches table above
- [ ] Address matches office (not residential community)
- [ ] Posts reference Tournament Hills when relevant

---

## Verification commands

After deploy, spot-check:

1. View source — search `500-1942`, `9406 W Lake Mead`
2. Rich Results Test on `/` and `/contact`
3. Click-to-call on mobile footer and hero

---

*Last updated: June 2026*
