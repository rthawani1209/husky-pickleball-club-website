# Husky Pickleball Club website

A responsive, front-end-only React + TypeScript website. Includes purple/gold styling, interactive 3D-projected pickleball/paddle, scroll depth, mobile navigation, photo filters and a full-size gallery, club information, board roster, sponsorship, and support/resources links. Respects reduced-motion preferences. No admin portal, server, database, or payment processing.

## Run locally

Requires Node.js 20.19+ or 22+.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Deploy `dist/` on any static host with an HTTPS custom domain if desired. A static CDN can serve this without a per-visitor application server; no load testing has been done and capacity depends on the host.

## Content before launch

- Tryouts: October 11, IMA Gym B, 8-10 PM. Year still to be confirmed.
- Replace the tryout Instagram action with a confirmed public Google Forms respondent link, not the supplied editor link.
- Add the open play schedule when provided by Spencer.
- Check the club Venmo destination before public launch.
- Confirm photo selection and permission for a public club site.

## Editing

Update club text and board entries in `src/App.tsx`; styling is in `src/style.css`. Photos are in `src/photos/`. Uploaded photo quality is preserved without upscaling. The hero uses a cropped photo; gallery view shows full images.

Photo source: supplied by Rohan for this club website. UW palette reference: https://www.washington.edu/docs/best-practices/uw-specific/uw-colors-contrast-table/ . Collegiate competition resource: https://ncpaofficial.com/ . Sponsorship, roster and club copy supplied by the club via Rohan.

## Interactive hero

A procedural 3D projection drawn with Canvas 2D, not WebGL or a downloaded model. Drag or use arrow keys to rotate the view. Pause and reset controls are available. Reduced-motion preference disables ambient motion and scroll depth by default. Rendering is capped near 30fps with a 1.5 pixel-ratio ceiling and suspended offscreen; no third-party scene package is downloaded. Test on real devices before public launch.

The current logo is a crop from the supplied screenshot. Replace it with the clean club logo for sharper output.

Design references: https://merlin.studio/work/interxnike and https://www.webgpu.com/showcase/mclaren-f1-driver-lando-norris-official-website/ . Original artwork and club content retained; no source artwork copied.
