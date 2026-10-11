# devanshsati.com

Personal portfolio of Devansh Sati — researcher, developer, cybersecurity engineer.

Static Next.js site (no backend) with a Three.js particle field that morphs per page,
Motion animations, dark + light themes and a keyboard command palette.

| Page | Route | Background shape |
| --- | --- | --- |
| Home | `/` | Core sphere with orbital ring |
| Research | `/research/` | Perturbation field (adversarial pixels in amber) |
| Development | `/development/` | Layered system lattice |
| Exploration | `/exploration/` | Graticule globe with waypoint beacons |

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static output in ./out
npm start          # serve ./out locally
```

## Edit content

Everything — text, links, projects, experience, travel waypoints — lives in
**`src/data/profile.ts`**. Links left as `""` are hidden automatically.

Things to fill in:

- `links` → Google Scholar (and ORCID if you have one)
- `thesis.links` → LightDefend repo / thesis PDF
- `waypoints` → add trips (lat/lon puts a beacon on the globe)
- `curiosities`, `now` → starter text, rewrite in your own voice
- `public/Devansh_Sati_CV.pdf` → replace with your latest CV (note: it includes your phone number)

## Keyboard

- `⌘K` / `Ctrl K` or `/` — command palette (pages, copy email, CV, profiles)
- `T` — toggle theme

The site respects `prefers-reduced-motion` (static field, no scramble) and prints cleanly.

## Deploy — GitHub Pages (now)

1. Create a repo (e.g. `DevanshSati18/portfolio`) and push this folder to `main`.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
   The workflow in `.github/workflows/deploy.yml` builds and publishes `./out` on every push.
3. Custom domain: `public/CNAME` already contains `devanshsati.com`.
   At your DNS provider add:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `devanshsati18.github.io`
   Then set the custom domain in Settings → Pages and tick **Enforce HTTPS**.

## Deploy — self-hosted (later)

`npm run build` produces plain files in `./out`; any static server works. Example nginx:

```nginx
server {
  server_name devanshsati.com www.devanshsati.com;
  root /var/www/devanshsati/out;
  location / { try_files $uri $uri/ $uri.html =404; }
  error_page 404 /404.html;
  location /_next/static/ { add_header Cache-Control "public, max-age=31536000, immutable"; }
}
```

## Stack

Next.js 15 (static export) · React 19 · Three.js · Motion · TypeScript · Geist + Instrument Serif (self-hosted, no Google Fonts call).
