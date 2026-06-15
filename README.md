# Inspirelabs Capabilities Microsite (V3)

An interactive, deck-format microsite that positions **Inspirelabs as the growth system behind GrabOn, built for brands**. It walks a brand-side decision-maker, one screen at a time, through commerce-intent surfaces, owned and activation distribution, AudienceSeed shopper intent signals, AI Growth Studio, measurable growth commitments, and category proof, then closes on a tailored partnership roadmap.

Built from the locked Codex architecture in `../Codex Workspace/`. This is build execution, not strategy: the 38-screen architecture, approved copy, AudienceSeed positioning, AI Growth Studio positioning, and final CTA logic are preserved exactly.

## Stack

- React 18 + TypeScript
- Vite 5
- Framer Motion (sequence-clarifying motion, respects reduced-motion)
- Plain CSS (design tokens + component CSS, no UI framework)

No external/paid assets. Real product captures live in `public/`; AudienceSeed, AI Growth Studio, and reporting visuals are built in-app and clearly labelled.

## Install

```bash
cd inspirelabs-microsite-build
npm install
```

(Node 18+ recommended; built and verified on Node 26.)

## Run locally

```bash
npm run dev
```

Open the printed URL (default `http://localhost:5173`). Navigate with the primary CTA on each screen, the arrow keys (Up/Down/PageUp/PageDown/Home/End), the bottom-right prev/next arrows, or the section progress rail.

## Type-check

```bash
npm run typecheck
```

## Production build

```bash
npm run build      # tsc --noEmit && vite build  ->  dist/
npm run preview    # serve the dist/ build at http://localhost:4173
```

The build is fully static. `vite.config.ts` sets `base: './'` so `dist/` can be hosted from any static host or sub-path (Netlify, Vercel, S3, GitHub Pages, an internal CDN, or opened over a static file server).

## Deck canvas and screenshots

Desktop is a **fixed 1920x1080 logical deck canvas** (each screen composes inside the frame and is uniformly transform-scaled to fit, letterboxed). Mobile is a width-scaled stacked companion. Add `?export=1` to strip nav chrome and animation for clean captures.

Regenerate the 1920x1080 visual QA on any machine (serve the build first):

```bash
npm run build && npm run preview      # serves http://localhost:4173
# in another shell:
npm run shoot          # -> screens-out/desktop-1920/screen-00..37.png (exactly 1920x1080)
npm run gate           # DOM no-overflow gate + screenshot dimension gate
npm run contact-sheet  # -> screens-out/contact-sheet.png
```

See `REFRACTOR_SCREEN_CHANGELOG.md` for the per-screen before/after and `refactor/DESIGN_LANGUAGE.md` for the composition system.

## Live site

Hosted on GitHub Pages: **https://harshith241102.github.io/inspirelabs-capabilities/**

Every push to `main` rebuilds and redeploys automatically via the
`.github/workflows/deploy.yml` GitHub Actions workflow (build with `npm ci && npm run build`,
then publish `dist/` to Pages). Because `base: './'` is relative, the same build runs
unchanged at the local root and at the Pages sub-path.

## Deploy / export

`dist/` is self-contained (HTML + JS + CSS + fonts + images). Deploy options:

- **GitHub Pages (current):** push to `main`; the Actions workflow handles build + deploy.
- Drag-and-drop `dist/` to Netlify, or `vercel deploy dist`.
- Upload `dist/` to any static bucket/CDN.
- Serve locally: `npx serve dist` or `npm run preview`.

## Lead capture (pending integration)

The contact form (Screen 37) and the silent lead-context payload (setup answers, screens viewed, drawers/AI chips opened, roadmap click) are captured in app state and emitted as `inspirelabs:analytics` `CustomEvent`s on `window`. No backend is wired yet: confirm the analytics platform and CRM/lead destination, then connect them in `src/state/store.tsx` (`track`) and `src/screens/Screen37.tsx` (`onSubmit`). See `ASSET_GAPS.md`.

## Project structure

```
src/
  main.tsx, App.tsx          app entry + deck shell
  state/store.tsx            setup answers, lead context, navigation, analytics events
  content/
    copy.ts                  all 38 screens' copy (verbatim from 04_SCREEN_COPY.md)
    setup.ts                 setup options + opening/roadmap personalisation (from 02)
    sections.ts              reader-understanding sections + progress
    aiDrawers.ts             Contextual AI Growth Studio support-chip drawers (from 02)
  primitives/                Screen frame, header chrome, CTAs, cards, blocks, icons, motion
  components/                ScrollDeck, Drawer, SupportChip, ProgressRail, DeckNav
  screens/Screen00..37.tsx   the 38 approved screens
  styles/                    design tokens + shared utilities
public/
  fonts/  assets/  logos/    local fonts + real product captures + brand identity
scripts/shoot.cjs            screenshot helper for QA
```

## Documentation

- `IMPLEMENTATION_NOTES.md` — build decisions, stack, assumptions, trade-offs
- `QA_REPORT.md` — mapped against `05_QA_CHECKLIST.md`
- `ASSET_GAPS.md` — missing visuals, proof, logos, validation needs
- `CONTENT_DEVIATIONS.md` — any copy changes from `04_SCREEN_COPY.md`
- `PLACEHOLDER_MAP.md` — every placeholder/mock, type, and replacement asset needed
