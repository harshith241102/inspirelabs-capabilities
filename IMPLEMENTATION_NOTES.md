# Implementation Notes

Build of the Inspirelabs V3 interactive capabilities microsite from the locked Codex blueprint. This records build decisions, the stack, assumptions, and trade-offs. It is execution detail only; no strategy, architecture, or approved copy was changed.

## 1. Source hierarchy followed

Read and treated as governing, in order: `08_BUILD_EXECUTION_LOCK.md`, `00_SOURCE_OF_TRUTH.md`, `01_SCREEN_ARCHITECTURE.md`, `04_SCREEN_COPY.md`, `02_INTERACTION_AND_CTA_MODEL.md`, `03_WIREFRAME_DIRECTIONS.md`, `06_ASSET_REQUIREMENTS.md`, `05_QA_CHECKLIST.md`, `07_REVISION_CHANGELOG.md`. The V2 deck (`Inspirelabs Capabilities Deck V2.pdf`) was used only as contextual reference for visual density and to source approved product captures; its structure was not reused.

## 2. Stack

- **React 18 + TypeScript + Vite 5.** Chosen per the build brief's preferred stack and because the interaction model (setup state, drawers, personalised roadmap, silent lead payload, analytics events) is state-driven and benefits from components.
- **Framer Motion** for sequence-clarifying motion only (reveals, expansion cues, drawer slide-ins, agent status pulses). Gated by `useReducedMotion` and a global reduced-motion CSS block.
- **Plain CSS** with a token layer (`styles/global.css`) aligned to the V2 brand system, plus per-section component CSS. No UI framework, no CSS-in-JS runtime.
- No external/paid assets, no invented image assets.

## 3. Deck / navigation model

- A single vertical **scroll-snap** container (`components/ScrollDeck.tsx`): one screen per scroll stop on desktop (`scroll-snap-type: y mandatory`), relaxed to proximity + stacked narrative on mobile.
- Each screen is a `100vh`/`100svh` snap section (`primitives/Screen.tsx`) that registers itself via `IntersectionObserver` for progress + the silent `screens_completed` lead field.
- Navigation: primary narrative CTA on every screen, keyboard (Arrow/Page/Home/End, suppressed while typing or when a drawer is open), bottom-right prev/next arrows, and a clickable section progress rail. No slide numbers.
- `goTo(index)` scrolls the target section into view; CTAs pass explicit target indices so the narrative order is deterministic.

## 4. Setup + personalisation (only opening, proof highlight, roadmap, lead context)

- `state/store.tsx` holds the three setup answers, `setupComplete`, and a silent `LeadContext` (screens viewed, drawers opened, AI chips opened, roadmap click, contact, source URL) matching the payload shape in `02`.
- Setup tailors **only**: Screen 2 headline/support (`openingTailoring`), Screen 34 category highlight, Screen 36 roadmap (`roadmapPersonalisation` + `capabilityMixByPriority`), and internal lead context. The middle journey is fixed and identical for every reader. No role selector, no branching.
- Screen 36 lets the reader edit category and priority inline; edits update the store so the lead payload reflects final choices.

## 5. Drawers, support chips, evidence

- One drawer system (`components/Drawer.tsx`): right-side panel on desktop, bottom sheet on mobile, focus-trapped, Escape-to-close, focus restored to the opener. Drawer content follows the `02` structure (what this is / enables / proof required / not to assume). Opening a drawer records it in the lead payload.
- **Contextual AI Growth Studio support chips** (`components/SupportChip.tsx`) are deliberately quiet (dashed pill, mono label, placed below the primary CTA). They open AI drawers (`content/aiDrawers.ts`) and never act as primary CTAs on non-AI screens. Every AI drawer states a required brand input and a human-review checkpoint.
- Inside the AI Growth Studio section (26-31) flow CTAs are primary, as the section is about AI.
- `EvidenceTag` (approved / pending / potential / unavailable) and `MetricField` keep proof honest; `MockTag` labels every built mock visual.

## 6. Assets: real captures vs built mocks

- **Real product captures** (in `public/`) are used where the architecture calls for a surface: GrabOn home/merchant/category pages, GrabCash, GrabShare creator surfaces, partner ecosystem surfaces, RankDrive, WriteGenius. These are the same approved captures the V2 deck used.
- **Built, labelled mocks** (no invented numbers) are used where no approved screenshot exists: the Alternatives.co comparison shortlist (Screen 10), the affiliate tracked-campaign report (17), the AudienceSeed signal/offer report (25), and the AI flow states. All carry a visible "Illustrative mockup" / "pending validation" label.
- **No partner/client logo wall** is shown. ~143 brand logos exist in the repo but provenance/approval for V3 client-facing use is not established, so neutral ecosystem category labels + the approved `145+` proof + real partner-surface screenshots are used instead. Logged in `ASSET_GAPS.md`.

## 7. Numbers discipline

The only numeric claims rendered are `145+ strategic partnerships` (tagged "Approved proof") and `200M+ potential reachable audience` (tagged "Potential reach, not guaranteed"), both on Screen 16, exactly as the source approves. Every other metric is a field/placeholder with an evidence-status tag. V2 scale numbers (76M+, 25M+, 96M+, $4.8B, 3,800+) were deliberately not reused because they are "validate before final use" and were not validated for V3.

## 8. Accessibility + performance

- Keyboard-navigable CTAs with visible `:focus-visible` rings; drawer focus trap + Escape + focus restoration; semantic `section` landmarks with aria labels.
- `prefers-reduced-motion` disables reveals (Framer `useReducedMotion`) and CSS transitions/animations.
- Images use `loading="lazy"` and meaningful `alt` text; decorative SVG icons are `aria-hidden`.
- Production bundle: ~397 kB JS (~118 kB gzip), ~52 kB CSS (~9 kB gzip). Fonts are local static `.ttf`.

## 9. Assumptions made

- No backend/CRM/analytics platform is provisioned, so the contact form and lead payload are captured in app state and emitted as `window` `CustomEvent`s for a future tag manager. Confirm destination and wire in `store.tsx` / `Screen37.tsx`.
- AudienceSeed parent-brand treatment is unconfirmed, so user-facing screens use "AudienceSeed" only (per `06` / changelog item 3).
- Category visuals exist only for a subset of setup categories; the proof screen shows a labelled "asset pending" panel for the rest.
- The optional QR / calendar integration on the close is not included (unconfirmed); the form is the approved fallback.

## 10. Trade-offs

- **Authored in one hand vs. fanned out.** The 38 screens were authored directly (composing a shared primitive library) rather than generated by parallel agents, to guarantee visual cohesion and exact compliance on a CEO-reviewable deck. The parallelisable QA pass was fanned out to a multi-agent workflow instead (see `QA_REPORT.md`).
- **Paged scroll-snap vs. free scroll.** Scroll-snap gives the "one screen per stop" deck feel reliably across desktop/mobile and makes motion reveals deterministic, at the cost of some custom keyboard handling.
- **Built mocks vs. empty wireframes.** Where assets are missing, polished labelled mocks were built so the experience feels complete on first run, rather than leaving empty boxes, while never implying real data.

## 11. Missing source files

None. All nine Codex documents and the V2 reference PDF were present and read.
