# Deployed endpoints

- Admin panel: https://sketchnoobdeveloper.github.io/bomberman-build/admin/
- Policy page: https://sketchnoobdeveloper.github.io/bomberman-build/policy.html
- Supabase: https://hntulavzuaxpvgflcbvo.supabase.co

## Not yet deployed (needs a provider token)
- Worker → Fly.io (`worker/fly.toml` is ready; `fly deploy` + two secrets).
  Until then run it on any host: `npm ci && npm run build && node dist/index.js`.
- Admin → Vercel (optional; Pages is live already).

## Secrets on this repo
`SRC_PAT`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
