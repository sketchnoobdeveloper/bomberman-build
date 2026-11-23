# Deploy

1. `npx firebase-tools login:ci` → add the printed token as `FIREBASE_TOKEN`.
2. Run the `deploy` workflow (`what=all`) → database rules + functions.
3. Firebase console → Project settings → `snd.bomberman` → add both SHA-1s from
   `bomberman-android/app/keys` (see the runbook). `snd.bomberman.console` needs its own app entry
   if you want Google sign-in inside the console (otherwise the console builds but sign-in 10s).
4. Install the console APK, sign in, hit **Initialize fleet** on the Deck if lists are empty.

Realtime Database is already in open test mode, so seeded data is readable/writable today;
deploying the repo rules (`database.rules.json`) locks writes to signed-in accounts.
