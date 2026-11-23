# Deploy

1. `npx firebase-tools login:ci` → add the printed token as `FIREBASE_TOKEN` here.
2. Run the `deploy` workflow (`what=all`).
3. Firebase console → Project settings → `snd.bomberman` → add both SHA-1 fingerprints from
   `bomberman-android/app/keys` (documented in the runbook).
4. Sign in to the deck once, then run `scripts/seed.mjs` with a service-account JSON.

## Vercel hosting for the deck
Framework preset **Vite**, root `admin`, build `npm run build`, output `dist`.
Env vars (Production + Preview): `VITE_FB_API_KEY`, `VITE_FB_AUTH_DOMAIN`, `VITE_FB_PROJECT`,
`VITE_FB_APP_ID`, `VITE_FB_MESSAGING_SENDER`, `VITE_FB_STORAGE`, `VITE_FB_REGION`.
Then Firebase console → Authentication → Settings → Authorized domains → add the `*.vercel.app` domain
(otherwise Google popup returns `auth/unauthorized-domain`).
