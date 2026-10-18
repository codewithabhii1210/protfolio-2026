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

## Local development

```bash
npm install --prefix client && npm install --prefix server
cp server/.env.example server/.env   # set MONGO_URI and JWT_SECRET
npm run seed --prefix server          # optional: admin user + SehatSaarthi project
npm run dev --prefix server           # API on :5000
npm run dev --prefix client           # client on :5173, proxies /api to :5000
```
