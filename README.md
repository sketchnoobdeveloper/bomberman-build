# BomberMan Build

Public CI repo. Checks out the private source repos with `SRC_PAT` and builds.

| Workflow | Target |
|---|---|
| android | `bomberman-android` — unit tests + debug/release APK |
| admin | `bomberman-admin` — typecheck + production build |
| worker | `bomberman-worker` — typecheck + build + docker image |

Secrets: `SRC_PAT`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
