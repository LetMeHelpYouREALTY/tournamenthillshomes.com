# tournamenthillshomes.com

Hyperlocal real estate site for **Tournament Hills** (Summerlin West, Las Vegas), powered by Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties.

## Stack

- Next.js 14 (App Router)
- TypeScript, Tailwind CSS, shadcn/ui
- RealScout listings, Follow Up Boss CRM, Turnstile
- Vercel (primary) + optional Cloudflare Workers edge layer

## Development

```bash
pnpm install
cp .env.example .env.local
pnpm run next-dev
```

For production builds, use Vercel:

```bash
vercel build
vercel dev
```

## Site configuration

Domain-specific content lives in:

- `lib/site-config.ts` — NAP, URLs, agent info
- `lib/domain-config.ts` — Tournament Hills hero copy and SEO keywords

Set `NEXT_PUBLIC_SITE_URL=https://www.tournamenthillshomes.com` in Vercel environment variables.

## SEO spec

Hyperlocal SEO/GEO/AEO documentation:

- [`docs/seo/tournament-hills-hyperlocal-spec.md`](docs/seo/tournament-hills-hyperlocal-spec.md) — main spec
- [`AGENTS.md`](AGENTS.md) — agent entrypoint for Cursor

## Deploy

1. Connect this repo to Vercel
2. Add env vars from `.env.example` and service-specific examples (`.env.fub.example`, etc.)
3. Point `tournamenthillshomes.com` DNS to Vercel (Cloudflare: gray cloud / DNS only)

## License

Private — LetMeHelpYouREALTY
