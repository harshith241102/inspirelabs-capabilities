# Inspirelabs V3 Deck Composition Language

Authoritative recipe for recomposing each screen into a premium 1920x1080
executive-deck slide. Read this in full before editing any screen.

## The canvas

- Every desktop screen composes inside a fixed **1920 x 1080** logical canvas
  (`.screen__stage`). It is uniformly transform-scaled to the viewport by the
  foundation. **Author everything in fixed px for 1920x1080.** Never use `vw`,
  `vh`, or `clamp()` inside a screen. Never set a max-width of 1280.
- The canvas already has `--canvas-pad-x: 104px` / `--canvas-pad-y: 80px`
  padding (the safe zone). Compose inside that. Full-bleed visuals may extend to
  the canvas edge deliberately, but keep text/CTAs inside the safe zone.
- `.screen__stage` is `display:flex; flex-direction:column`. The screen's root
  content should fill the height (use `flex:1` on the dominant zone).

## Safe zones (every screen)

```
+----------------------------------------------------------+  <- canvas-pad
|  HEADER ZONE   eyebrow + headline + (one-line sub)        |
|                                                          |
|  DOMINANT VISUAL ZONE   the one proof object / board /    |
|     dashboard / storyboard. 50-62% of the canvas area.   |
|     This carries the story in 5 seconds.                 |
|                                                          |
|  PROOF / SUPPORT STRIP  (optional, one NetBox or         |
|     one evidence line - not both, not every screen)      |
|  CTA ZONE   one primary CTA bottom-left. AI chip, if any, |
|     quiet and separated from the CTA.                    |
+----------------------------------------------------------+
   (nav arrows live bottom-right OUTSIDE content; rail right-center.
    Keep the bottom-right ~360x120 and right-edge ~60px clear of
    critical content so chrome never collides in interactive mode.)
```

## Hard acceptance criteria (each screen must pass all)

1. Designed inside the 1920x1080 canvas (no 1280 column, no centered web section).
2. Exactly ONE dominant visual object that carries the story in 5 seconds.
3. Text supports the visual; the screen is not carried by paragraph blocks.
4. NOT a generic card grid. NOT a component catalogue. NOT a wireframe.
5. Real assets used wherever the brief lists them; built mocks are polished and
   carry a `<MockTag>`.
6. Exactly one primary CTA (`<AdvanceCta>`). One secondary action max, attached
   to the visual, not stacked under the primary. The `.ai-chip` SupportChip (when
   present) is quiet and never beside/under the primary CTA next to a proof note.
7. One dominant orange focal per screen. Orange is the single accent - do not
   paint many elements orange. Use ink/grey/borders for structure, blue `--as`
   ONLY inside AudienceSeed screens (20-25), AI state colors only in AI screens.
8. Premium executive-deck feel, not a website section or internal dashboard.

## Type scale (fixed px, authored for 1920)

- Eyebrow (`.eyebrow`): provided, ~14px mono. Use `<DeckHeader>` or `.eyebrow`.
- Headline (`.s-title`): 56px. For a big statement screen you may inline
  `style={{fontSize: 64}}`; when the visual dominates, keep 44-52px.
- Subhead (`.s-sub`): 22px, ONE line ideally, max two. Cut hard.
- Body / labels inside visuals: 15-18px. Captions/metadata mono 12-13px.
- Never ship text smaller than 12px on the canvas.

## Color tokens (use these, do not invent)

`--ink #0e0f0a` · `--orange #ff7a45` (single focal) · `--orange-text #bd521f`
(orange text on white) · `--grey #6f7583` · `--muted-text #6b717e` · `--border
#e0e0e0` · `--card-bd #ecedf1` · `--net #f7f8fa` · `--body #3c4049` · `--sub
#555b66` · `--as #3b82f6` / `--as-deep #2563eb` (AudienceSeed only) · AI state:
`--ai-active`(orange) `--ai-queued` `--ai-complete #2fa37a` `--ai-review`.
Backgrounds: white (light screens) or `--ink` (dark screens) only. No gradients
on brand surfaces, no warm beige, no translucent orange fills (opaque accents:
white card + solid 2px orange border, or solid orange).

## Archetypes (pick the one named in the brief's dominant visual)

- **dark-cover** (0): oversized lockup + ONE real GrabOn surface as hero proof +
  labelled module proof tiles. Dark.
- **setup** (1): segmented control (Q1) + dropdowns (Q2/Q3) + a single tailored
  summary panel. Continue CTA in its safe zone. No 21-chip wall.
- **proof-split** (2,3,8,12,13,14,16,21,28): dominant real screenshot/Phone
  occupying 50-60% on one side; 3-5 annotated callouts or hotspot pins on the
  other. Use `<AnnotatedShot>` / `<Storyboard>` / `<Shot>` / `<Phone>`.
- **operating-board / map** (4,5,6,7,9,11,15,18,19,20,24,29,32,33,36): a built
  board of lanes/columns/nodes that reads as ONE system, not N cards. Use
  `<DeckBoard>` + `<BoardLane>` / `<FlowStrip>` for thin status rails.
- **dashboard-mock** (10,17,23,25,30,35): a labelled commercial decision
  dashboard / report / browser mock. Use `<DashboardMock>` + `<MockTag>`.
  Honest pending/illustrative data, never invented numbers.
- **control-room** (26,27,31): running AI studio - active tasks, human-review
  queue, output queue. Show review visibly.
- **roadmap-board** (33,36): stage-gated partnership roadmap with gates.
- **conversion** (37): premium dark close - roadmap summary + what-happens-next
  beside a disciplined required-fields-only form + consent + pending-CRM note.

## Available primitives (import from `../primitives/ui`, `../primitives/deck`)

From `ui`: `DeckHeader`, `AdvanceCta`, `GhostBtn`, `NetBox`, `EvidenceTag`,
`Chip`, `IcoTile`, `Callout`, `MetricField`, `MockTag`, `Shot`, `Phone`,
`AssetImg`.
From `deck` (premium archetype helpers, see deck.tsx):
- `<DeckStage header={...} cta={...}>` - safe-zone scaffold (header / fill / cta).
- `<AnnotatedShot src alt url logo pins={[{x,y,n,label}]} />` - big screenshot
  with positioned numbered hotspot pins. THE proof-split hero.
- `<DeckBoard cols={n}>` + `<BoardLane title icon accent>...children</BoardLane>` -
  operating board / map lanes.
- `<FlowStrip steps={[{label,state}]} />` - thin horizontal status strip (NOT a hero).
- `<DashboardMock title tag>...</DashboardMock>` + `<KpiTile label status />` +
  `<BarChart values accentIndex />` + `<ReportRow label status />` - labelled
  decision dashboard.
- `<Storyboard items={[{src,alt,caption,phone}]} />` - phone/shot storyboard row.
- `<HotspotPin n label x y />`, `<ProductLogo src alt />`, `<GuardrailStrip items />`.

## Content + interaction rules

- **Copy is fixed.** Use `copy[N]` from `../content/copy` for eyebrow/headline/
  sub/support/cta verbatim. Do not invent or rewrite approved copy. You MAY cut a
  support paragraph (move detail into the visual) but never add new claims.
- Preserve existing **drawers** (SupportChip / drawer triggers) where the screen
  had them, but demote them to small hotspots, not a grid of buttons.
- Preserve **AdvanceCta routing** (`to`/`onClick`) and special handlers
  (`markRoadmapClicked` on 36, `submitContact` on 37).
- Keep `<Screen index tone label>` wrapper, its `index`, `tone`, `id`, `label`.
- No invented metrics/dates/packages/logos. Real captures may carry
  `<EvidenceTag status="pending">`. Potential reach (200M+) = `status="potential"`.
- No em dashes, en dashes, tildes, exclamation marks. Smart quotes via copy.ts.
- AudienceSeed = "AudienceSeed by Inspirelabs", shopper-intent signals for
  retargeting + offer intelligence, never "by GrabOn", never generic analytics.
- AI Growth Studio = human-reviewed agents, never fully automated / replacing teams.
- GrabOn = active commerce surface + proof, enlarge it, never minimized.
- Alternatives.co = B2B software discovery (SaaS/CRM/SEO/HRMS alternatives),
  never consumer/fashion/food/travel comparison.

## CSS rules

- Put screen-specific CSS in `src/screens/sNN.css` (NN zero-padded) and
  `import './sNN.css'` at the top of `ScreenNN.tsx`. Prefix every new class with
  `.sNN-` (e.g. `.s08-hero`) so screens never collide. Do NOT edit `global.css`,
  `deck.css`, or shared thematic CSS.
- Reuse global tokens + chrome (`.btn`, `.eyebrow`, `.chip`, `.ev`, `.s-net`,
  `.shot`, `.phone`, etc.). Fixed px only.
