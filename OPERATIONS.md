# Operations

## Endpoints
- Admin panel: `/admin/` (GitHub Pages)
- Policy page: `/policy.html`
- Edge function `bm-test` (admin-only template tester)

## Daily flows
- **Add an API**: admin → API Templates → New template → pick tool, method, URL with `#PLACEHOLDER`
  (POST adds a body field) → set success/fail regex → Test Console → Save.
- **Template broken**: health dot turns red after 5 consecutive failures and the worker skips it.
  Fix or toggle it; no app release needed.
- **Refunds**: automatic per failed request when a job finalizes.
- **Coin adjust**: admin → Users → open user → Adjust coins (writes ledger + audit).
- **Orders**: admin → Orders & Coins → approve credits the package coins.

## Failure triage
| Symptom | Check |
|---|---|
| jobs stuck `queued` | worker running? `/health` reachable? `bm_job_requests` rows pending |
| everything `fail` | template URL/regex, upstream status codes in Analytics |
| `insufficient_coins` reports | real balance vs cost; refunds land on job finish |
| admin panel 403 | `bm_profiles.role` not admin/mod, or `status` banned |

## Safety switches
- `bm_tools.is_active` — per-tool kill switch
- `bm_tools.daily_limit` / `cooldown_sec` — abuse caps
- `bm_settings` — trial amount, signup open, maintenance, min app version
