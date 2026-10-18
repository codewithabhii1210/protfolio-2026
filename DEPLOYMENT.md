# Vercel deployment

Production: https://abhishekprotfolio.vercel.app (Git-connected to `codewithabhii1210/protfolio-2026`, branch `main`).

`abhishekprotfolio.vercel.app` is an **alias** on the latest production deployment, not a
project-generated domain (Vercel appended `-chi` to that one). After any new production
deploy, re-point it:

```bash
vercel alias set <deployment-url> abhishekprotfolio.vercel.app
```

The canonical/OG/robots/sitemap URLs in `client/index.html`, `client/public/robots.txt`
and `client/public/sitemap.xml` all point at `https://abhishekprotfolio.vercel.app/` —
update them together if the domain ever changes.

## Project settings (must match)

- **Root Directory: empty (repository root).** Never set it to `client` — that makes the
  install command look for `client/client/package.json` and the build dies with `ENOENT`.
- Install command, build command and output directory come from the root `vercel.json`
  (`npm install --prefix client && npm install --prefix server`,
  `npm --prefix client run build`, `client/dist`).
- `vercel.json` uses legacy `routes`, **not** `rewrites`:

  ```json
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/[...path].js" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
  ```

  The explicit `dest` is required: with `rewrites` only single-segment paths
  (`/api/contact`) reached the Express function, while `/api/auth/login` and
  `/api/projects/:id` returned an edge `404: NOT_FOUND`. Do not switch back.

## Environment variables (Settings → Environment Variables)

Server side (stored as secrets):

| Name | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string, including the database name (e.g. `...mongodb.net/portfolio`) |
| `JWT_SECRET` | Long random string used to sign admin tokens |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Credentials created by the seed script |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Optional; only needed for image upload in the admin area |
| `GMAIL_USER` / `GMAIL_APP_PASSWORD` | Gmail SMTP login used to email contact-form submissions (`GMAIL_APP_PASSWORD` is a 16-char Google *app password*, never the account password) |
| `NOTIFY_EMAIL_TO` | Inbox that receives submissions; defaults to `GMAIL_USER` |
| `CALLMEBOT_APIKEY` | CallMeBot key that pushes each submission to WhatsApp |
| `NOTIFY_WHATSAPP_TO` | WhatsApp number in international format, no `+` (default `917440497125`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Optional replacements for the Gmail SMTP defaults, e.g. Brevo |

Client side (build time, every name must start with `VITE_`):

| Name | Purpose |
| --- | --- |
| `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_EMAIL`, `VITE_PHOTO` | Contact/social links and photo |
| `VITE_NEURALX_GITHUB`, `VITE_NEURALX_LIVE` | NexHeal project buttons (env names kept as-is) |
| `VITE_SEVENHEAVEN_GITHUB`, `VITE_SEVENHEAVEN_LIVE` | SevenHeaven project buttons |
| `VITE_SEHATSAARTHI_GITHUB`, `VITE_SEHATSAARTHI_LIVE` | SehatSaarthi project buttons |
| `VITE_CERT_IMAGE` | Certificate image; the card stays non-interactive while empty |

The three project cards are rendered from `CONFIG.projects` in `client/src/config.js`;
each entry's `github`/`live` falls back to the verified production URL when the matching
`VITE_*` variable is unset.

An empty link value hides that button, so a missing variable never produces a dead `#` link.
`VITE_*` values are baked in at build time — changing one requires a redeploy.

Run the seed once per database: `npm run seed --prefix server`. Never prefix database
secrets with `VITE_`; those are shipped to the browser.

## Contact form notifications

`POST /api/contact` answers in milliseconds. The MongoDB write and the WhatsApp +
email notifications are handed to Vercel's `waitUntil()` (`server/services/background.js`)
so a cold database connect can no longer make the form hang. A hidden honeypot field
is filled only by bots: those submissions return `201` but are neither stored nor
delivered.

- WhatsApp goes through **CallMeBot** (`server/services/notify.js`): once, add
  `+34 644 84 44 86` to your contacts and WhatsApp the message
  `I allow callmebot to send me messages`. The bot replies with the API key → set it
  as `CALLMEBOT_APIKEY`. Recover a lost key by sending `Recover APIKey` to the same bot.
- Email goes through **Gmail SMTP**: Google Account → Security → 2-Step Verification →
  **App passwords** → create one for "Mail" → set the 16-char value as
  `GMAIL_APP_PASSWORD` (and `GMAIL_USER` as the Gmail address).
- Both channels are optional and independent. A missing or wrong credential never
  fails the visitor's request; it is reported in the function logs instead.
- Check delivery: `vercel logs <deployment-url>` and look for `[contact] notify:` —
  each channel reports `"ok": true` or the reason it was skipped.

Direct contact links on the site (WhatsApp `wa.me` link, email, LinkedIn, GitHub) come
from `CONFIG` in `client/src/config.js`; the phone number and WhatsApp URL are
overridable with `VITE_PHONE` and `VITE_WHATSAPP_URL`.

## Local development

```bash
npm install --prefix client && npm install --prefix server
cp server/.env.example server/.env   # set MONGO_URI and JWT_SECRET
npm run seed --prefix server          # optional: admin user + SehatSaarthi project
npm run dev --prefix server           # API on :5000
npm run dev --prefix client           # client on :5173, proxies /api to :5000
```
