# AGENTS.md — tournamenthillshomes.com

Hyperlocal SEO microsite for **Tournament Hills** (Summerlin West, Las Vegas 89134).

## Start here

1. Read [`docs/seo/tournament-hills-hyperlocal-spec.md`](docs/seo/tournament-hills-hyperlocal-spec.md)
2. NAP source: [`lib/site-config.ts`](lib/site-config.ts) — phone **(702) 500-1942**
3. Tournament Hills copy/FAQs: [`lib/tournament-hills-content.ts`](lib/tournament-hills-content.ts)

## Agent

- **Dr. Jan Duffy** (never "Janet") — License S.0197614.LLC
- Berkshire Hathaway HomeServices Nevada Properties
- Office: 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134

## Canonical URL

`https://www.tournamenthillshomes.com` — set `NEXT_PUBLIC_SITE_URL` in Vercel.

## Do not

- Modify `/components/idx/*` without explicit approval
- Fabricate medians or DOM stats — use price *bands* with `lastUpdated`
- Duplicate `RealEstateAgent` JSON-LD on pages (layout emits site-wide schema)
- Block `/_next/static` in robots

## Build

```bash
pnpm install
vercel dev
vercel build
```

## Key routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage + Tournament Hills FAQ |
| `/neighborhoods/tournament-hills` | Primary hyperlocal hub |
| `/listings` | RealScout search |
| `/contact` | NAP + lead capture |

## RealScout CSP

Script: `em.realscout.com` · API: `www.realscout.com` — both in `next.config.js`.
