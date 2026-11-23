# Deploy

1. `npx firebase-tools login:ci` → add the printed token as `FIREBASE_TOKEN` here.
2. Run the `deploy` workflow (`what=all`).
3. Firebase console → Project settings → `snd.bomberman` → add both SHA-1 fingerprints from
   `bomberman-android/app/keys` (documented in the runbook).
4. Sign in to the deck once, then run `scripts/seed.mjs` with a service-account JSON.
