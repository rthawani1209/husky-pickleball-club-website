# Husky Pickleball Club Website

A responsive front-end website for the Husky Pickleball Club at the University of Washington. It presents the club, its two ways to play, tryout signup, a photo gallery, the board, and ways to support the team.

Built with React 19, TypeScript and Vite. Front end only: there is no backend, database or admin portal.

## What it does


**Live site: https://husky-pickleball-club-website.vercel.app/**

A responsive single-page website for the Husky Pickleball Club at the University of Washington. I built it as the club's Member of Technical Staff and it is the club's live public site.

React 19, TypeScript and Vite. Front end only, no backend or database. Deployed on Vercel from `main`.

## What it includes

- Sticky navigation with smooth scrolling, an active-section indicator, and a mobile menu.
- Club, play, sponsors, photo gallery, board, support and contact sections.
- Photo gallery with category filters and a full-size viewer: previous/next buttons, arrow keys, Escape to close.
- Scroll-triggered fade-ins that turn off under `prefers-reduced-motion`.
- External links for tryout signup (Google Form), donations, NCPA information, Instagram, email and tap-to-call.
- Responsive from 390px phones to 1440px desktops.

## Engineering notes

- **No UI framework or CSS library.** Plain CSS with custom properties, grid and flexbox, using a UW purple and gold palette.
- **Native browser features where possible.** The photo viewer uses the `<dialog>` element, and scroll reveals use `IntersectionObserver` instead of scroll listeners.
- **Accessibility.** Keyboard control in the viewer, labelled navigation, and reduced-motion support for animations.
- **Cleanup.** Navigation, gallery and animation effects remove their event listeners and observers on unmount.
- **Static output.** The build is plain static files, so it serves from a CDN with no server to maintain.
- **Continuous deploy.** Every push to `main` triggers a Vercel build and release.

## Tech

| Area        | Choice                                         |
| ----------- | ---------------------------------------------- |
| UI          | React 19, TypeScript                           |
| Build       | Vite 6                                         |
| Styling     | Plain CSS                                      |
| Interaction | IntersectionObserver, native `<dialog>`        |
| Hosting     | Vercel                                         |

## Run locally

Requires Node.js 20.19+ or 22+.

```bash
npm install
npm run dev       # dev server
npm run build     # type-check and production build into dist/
npm run preview   # serve the production build
```

## Project structure

- `src/App.tsx`: page content, navigation, gallery filters and photo dialog.
- `src/CourtScene.tsx`: paddle motion and pointer-responsive tilt.
- `src/ui.tsx`: small shared markup components.
- `src/style.css`: layout, responsive rules, reveals and reduced-motion overrides.
- `src/photos/`: club photos and logo.
- `src/main.tsx`: React entry point.

CSS rules are kept in their existing order because later rules refine earlier layouts. When changing styles, check the cascade as well as the desktop and mobile layouts.

### Formatting

```bash
npx prettier@3.9.9 --check src/*.{ts,tsx,css} index.html package.json tsconfig.json README.md
```
