# Husky Pickleball Club Website

A responsive front-end website for the Husky Pickleball Club at the University of Washington. It presents the club, its two ways to play, tryout signup, a photo gallery, the board, and ways to support the team.

Built with React 19, TypeScript and Vite. Front end only: there is no backend, database or admin portal.

## What it does

- **Single-page layout** with sticky navigation (Club, Play, Sponsors, Photos, Board, Support, Contact) that scrolls to each section, shows a gold active-section line, plus a mobile menu.
- **Play section** describing the competitive travel team and the social team, with a tryout signup button that opens the club's public Google Form.
- **Photo gallery** with category filters (All, On court, Off court) and a full-size viewer with previous/next buttons, keyboard arrow keys, Escape to close.
- **Scroll reveals**: text and images fade in and out as you scroll up and down; disabled under `prefers-reduced-motion`.
- **Board section**, **sponsor section** (JOOLA and The Picklr Fremont) and **support section** (Venmo and NCPA links).
- **Hero artwork** with always-on pointer-responsive tilt. Respects `prefers-reduced-motion`.
- **Contact section** with Instagram, email, and tap-to-call links.
- Responsive from phone to desktop, tested at 390px and 1440px wide.

## Tech

| Area        | Choice                                                                   |
| ----------- | ------------------------------------------------------------------------ |
| UI          | React 19 + TypeScript                                                    |
| Build       | Vite 6                                                                   |
| Styling     | Plain CSS (custom properties, grid, flexbox), UW purple and gold palette |
| Interaction | IntersectionObserver reveal, native `<dialog>` for the photo viewer      |

## Run locally

Requires Node.js 20.19+ or 22+.

```bash
npm install
npm run dev       # dev server
npm run build     # type-check and production build into dist/
npm run preview   # serve the production build
```

## Deploy

The site is a static build, so any static host works. Build settings for Netlify, Vercel or Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20.19+ or 22+

To redeploy after an edit: commit and push to `main`. A host connected to this repo rebuilds automatically. For a manual deploy, run `npm run build` and upload the `dist/` folder.

## Quality checks

The site was checked in headless Chrome at desktop (1440px) and mobile (390px) widths:

- Every nav link and the mobile menu scroll to the correct section.
- All 14 images load, and there is no horizontal overflow.
- Photo viewer opens, steps through all photos, filters work, and it closes.
- External links (tryout form, Venmo, NCPA, Instagram) have the correct targets.
- No console errors or failed requests.

## Status and open items

- Open play schedule is not published yet (coming from the club's open play coordinator).
- The tryout date shown is October 11, IMA Gym B, 8-10 PM. The year is not shown on the site.
- The logo is cropped from a screenshot; a clean original would look sharper.

The hero artwork is an illustration, not a real product photo or a live 3D model. Club photos and copy come from the club.

## Source layout

- `src/App.tsx`: page content, navigation, gallery filters, and photo dialog.
- `src/CourtScene.tsx`: hero illustration and pointer-responsive tilt.
- `src/ui.tsx`: small shared markup components.
- `src/style.css`: layouts, responsive rules, reveals, and reduced-motion overrides.
- `src/photos/`: club photos, logo, and hero illustration.
- `src/main.tsx`: React entry point.

CSS rules are intentionally kept in their existing order because later rules refine
previous layouts. When changing styles, check the cascade as well as desktop and
mobile layouts. Navigation and gallery effects clean up their event listeners,
observers, and animation frames on unmount.

### Formatting

Use Prettier 3.9.9 for consistent formatting without changing runtime dependencies:

```bash
npx prettier@3.9.9 --write src/*.{ts,tsx,css} index.html package.json tsconfig.json README.md
npx prettier@3.9.9 --check src/*.{ts,tsx,css} index.html package.json tsconfig.json README.md
```

Before a deployment, run `npm run build` and check navigation (including the mobile
menu), all gallery filters, dialog buttons and keyboard controls, contact links,
hero tilt, and the OS reduced-motion setting. Formatting-only edits should leave
the production JavaScript and CSS unchanged.

