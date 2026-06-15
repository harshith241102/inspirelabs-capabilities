# V3 Refactor Brief (synthesised from audits + code map)

## Global findings

### canvas
No true 1920x1080 logical deck canvas exists today. In src/styles/global.css, .deck is height:100vh, .screen is min-height:100vh with scroll-snap-type:y mandatory, and .screen__stage is max-width:var(--stage-max) where --stage-max:1280px. So at a 1920x1080 viewport the content renders as a 1280px centred website-style column (x=320 to x=1600), not a deck. This is the single most important defect and must be fixed first. Refactor: introduce a fixed-dimension logical frame 1920x1080, proportionally scaled with scale = min(viewportWidth/1920, viewportHeight/1080) and centred in the viewport on desktop; replace the website-section scroll model with deck screens that each occupy exactly the 1920x1080 frame. Define fixed safe zones inside the canvas: header band (top), dominant-visual zone (centre, proof object occupies 45-60 percent of canvas), support-note strip (lower), single primary-CTA zone (bottom-left or bottom-centre), and navigation zone outside the content canvas. Raise headline scale from the current s-title 44px cap to roughly 54-68px (compact only when the proof object is dominant). Add a screenshot dimension gate and a DOM-bounding-box no-overflow gate after the refactor, since locking to 16:9 and scaling content up will expose new overflow on dense screens (re-measure 18, 19, 36, 37 specifically).

### nav
- Resolve global chrome collision: DeckNav.tsx (fixed bottom-right up/down + jump-to-roadmap), ProgressRail.tsx (fixed right-side labels) and per-screen bottom-band CTAs all compete for the same lower-right attention zone after Screen 7. Give nav arrows their own safe zone outside the content canvas; fold jump-to-roadmap into the progress-rail menu rather than letting it overlap lower-right CTAs.
- Add an export mode (body.export-mode class or ?export=1 URL flag). It must capture exactly 1920x1080, hide DeckNav arrows, ProgressRail, jump-to-roadmap and non-essential drawer triggers, disable Framer Motion animations and smooth scroll, and use instant scroll for keyboard Home/End/Arrow jumps (currently smooth scroll makes Home/End take about 3 seconds and breaks deterministic capture).
- CTA hierarchy rules to enforce on every screen: exactly one primary CTA (AdvanceCta) in the reserved CTA safe zone; one secondary drawer/link action max, attached to the dominant visual not stacked under the primary; the AI SupportChip (.ai-chip) never sits directly beside or below the primary CTA when the screen also has a proof note; jump-to-roadmap never shares the primary-CTA zone. Demote ghost buttons (present on 20, 26, 31, 33, 36) to drawer links or merge near-duplicate CTAs (e.g. Screen 31 has two near-equivalent custom-agent CTAs).
- Preserve the working navigation baseline confirmed in audit: route loads HTTP 200, up/down + ArrowDown/ArrowUp work, Home/End work, jump-to-roadmap visibility rule (hidden on 1/6/36, visible 7-35, becomes Back-to-roadmap after 36) is correct in interactive mode but export mode must still hide it.
- Fix the screenshot pipeline before any QA: scripts/shoot.cjs currently defaults to viewport 1440x900 at deviceScaleFactor 1.5, producing 2160x1350 (16:10, ratio 1.6) artefacts that cannot validate 16:9 deck output. Change to 1920x1080 viewport at deviceScaleFactor 1, write to a desktop-1920 folder, validate every requested index is a finite number, and fail on a missing screen selector. A screens-out/desktop/screen-NaN.png artefact proves the pipeline once accepted a NaN index.

### a11y
- All 38 screens stay mounted and active in the DOM, so off-screen controls (many off-screen Continue/advance CTAs) are discoverable to global role queries and assistive tech. Add active-screen aria-hidden/inert management so only the current screen is exposed, or scope landmarks to the active screen.
- Status tags and flow-state colours (AI active/queued/complete, AudienceSeed signal accent, EvidenceTag approved/pending) convey meaning by colour alone. Pair every status colour with a text label and an icon.
- Preserve existing a11y wins: semantic buttons, labelled section landmarks, alt text on images, focus-visible outlines, reduced-motion handling in some components, and Screen 37 form labels. Add active-screen state management and visible form-validation messaging on Screen 37.
- Preserve the Drawer.tsx model through the visual refactor: focus trap, focus restore, Escape close, inert background, mobile bottom-sheet behaviour; retest all of these (especially the mobile bottom sheet: body height, close affordance, focus trap, Escape, touch targets) after the layout changes.
- Convert card grids into non-button visuals with sparse numbered/icon hotspots so screens communicate without forcing a drawer open; today several screens depend on tapping cards to be understood.

### setup
Run as a phased refactor in the authoritative priority order, not screen-by-screen top to bottom. Phase 1: global canvas + export mode + fix scripts/shoot.cjs and add the dimension and no-overflow gates (blocks all visual validation). Phase 2: CTA and navigation safe-zone system (DeckNav, ProgressRail, SupportChip, ghost-button demotion). Phase 3: rebuild the critical screens (1 setup, 10 Alternatives.co, 18/19 activation, 26-31 AI Growth Studio, 36/37 conversion). Phase 4: asset-led upgrades across proof screens (0, 2, 3, 5, 8, 9, 12, 13, 14, 16, 17, 28, 34). Phase 5: mobile companion mode. Phase 6: copy density cuts. Preserve the architecture (Screen registry in src/screens/registry.tsx, Drawer provider, app state store): refactor in place, do not restart. Reuse the V2 HTML deck as the visual-quality and asset benchmark. Confirm blockers before client review: approved Alternatives.co screenshot or approval for a clearly labelled illustrative B2B-software mock; a CRM/backend destination for Screen 37; confirmed dark-vs-light Inspirelabs lockup files (verify lockup-ink.png actual colour since it is used on dark screens 0 and 37); permission clearance for partner, Telegram and creator/product screenshots; and a decision on whether export screenshots show or hide interaction chrome.

### mobile
- Mobile is not yet a reliable companion experience. Because .screen sections are taller than the viewport (min-height:100vh), step/arrow navigation can skip content that sits below the first viewport; representative captures show only headers, blank space, proof notes or floating nav. Keep desktop as the 1920x1080 scaled deck; make mobile a separate stacked narrative below 860px (the .rail right-side is already CSS-hidden below 860px, but fixed bottom DeckNav arrows remain visible and compete with content).
- Mobile companion model: stacked sections read top-to-bottom with no deck-step mental model; accordions for detail; bottom-sheet drawers; replace the chip-heavy Screen 01 setup with compact selectors (segmented control + dropdowns); swipeable galleries for partner, GrabShare and channel/Telegram visuals; mobile-specific crops for product screenshots (no tiny dashboard text); remove or collapse floating up/down nav by default; local sticky CTA only after content is visible; treat 768x1024 tablet as companion mode unless width supports a scaled deck.
- Do a manual long-scroll review of every mobile screen after the desktop canvas and mobile mode are rebuilt. The existing mobile QA sample is incomplete: only screens 00, 01, 08, 16, 22, 26, 36, 37 exist in screens-out/mobile, each 585x1266. Test all drawer bottom sheets for Escape, close button and touch-target size.
- Generate responsive image derivatives / srcset / screen-specific crops. Several source images are very large and are loaded into many screens with no responsive strategy; eager-load only the cover, lazy-load below-current screens, and preload critical logos.

### uiSystem
- Card primitive is overused (CardGrid, .opentile, .surface-list, .channel-grid, .outcards, .clusters, .moments, .offer-board recur across many screens), turning a premium deck into a repeated component catalogue with a wireframe feel. Restrict cards to secondary detail; replace card-led screens with screen-specific compositions (operating boards, maps, dashboards, galleries, proof objects). FlowRail is fine for orientation but overused as the main visual; downgrade it to a thin status strip where a real proof object should lead. NetBox creates a repeated bottom-strip rhythm; use it selectively for true takeaways only.
- Real product captures are the strongest visuals and are underused. Shot and Phone primitives should be used aggressively as hero objects occupying 45-60 percent of the canvas, not as thumbnails inside cards. Add the matching product logo (grabonLogo, grabcashLogo, grabshareLogo, rankdriveLogo, writegeniusLogo, alternativesLogo) to each product surface frame to make product reality unambiguous.
- Mono labels (.mini-cap and mono captions) are overused globally and make the deck feel like an internal dashboard. Reserve mono for proof labels, status and technical metadata. Vary verbs and screen-level argument labels so the deck does not feel templated.
- Copy rule for the whole refactor: one screen equals one sentence-level argument. The headline states the decision implication, not the component name; support copy explains only what the visual cannot; details move into drawers. Cut explanatory support copy 30-50 percent on the dense screens (04, 05, 07, 11, 15, 18, 19, 20, 24, 26, 32, 33, 36) and convert paragraph-heavy screens (09, 15, 18, 19, 26, 27, 31, 32, 33) into proof objects and action boards. Final screens must sound like partnership design, not lead generation.
- EvidenceTag / MockTag / status pills are good atoms: attach evidence tags to proof objects rather than letting them float across card inventories, and keep every illustrative built visual honestly labelled with MockTag.
- Move repeated layout logic into a few explicit screen archetypes (the components are currently heavily inline-styled and manually duplicated). Establish: dark-cover, setup, proof-split (visual + annotated callouts), operating-board/map, dashboard-mock, control-room, roadmap-board, and conversion archetypes.

### productReality
- Alternatives.co must be framed as B2B software discovery / SaaS-alternatives evaluation, never generic consumer comparison. It must NOT imply fashion, food, travel, consumer shopping, broad D2C or a generic directory. The current Screen 10 mock (Option A/B/C, personas product researchers/category explorers, fields Value/Offers/Support/Trust) is a product-reality defect to fix before client review. Use SaaS-tool rows with B2B fields (fit, use case, deployment, pricing model, integration, buyer stage), B2B personas (SaaS buyers, tool evaluators, alternative seekers, category researchers), the alternativesLogo, and a MockTag illustrative label until a real screenshot is approved.
- AudienceSeed guardrails must be preserved as visible UI: approved policy-compliant signals only, no raw PII transfer, no unauthorised tracking, no automatic media activation; Meta and Google are existing brand workflows where the brand keeps its own ad account, budget and creative. Visuals must read as commercial decision support, not a generic analytics dashboard. AudienceSeed is AudienceSeed by Inspirelabs, never by GrabOn.
- AI Growth Studio guardrails are a visual fix, not a strategic one: show running work with a visible human-review queue. Do not imply replacing teams, guaranteed ROI, or autonomous launch without review.
- Strategic Partnerships must keep the 145+ partnerships proof and frame 200M+ as potential reach only (EvidenceTag potential), with no unverified partner-logo wall. Channel Amplification must not imply guaranteed omnichannel availability, platform permissions or automatic posting. Integrated Campaign Promotions must not imply invented media packages, fixed budgets or fixed dates; use scoping gates. GrabOn must never be implied as replaced or minimised; frame it as an active commerce surface and proof point and enlarge its visuals. GrabCash must not imply a creator storefront, broad affiliate marketplace or unverified payout economics. Affiliate Marketing Platforms stay separated from strategic partnerships and creators (no equivalence).
- Do not invent metrics, packages, dates or assets. All real captures are tagged validation/approval pending and may need client confirmation before client-facing use; confirm permission for partner, Telegram and creator/product screenshots. The contact form is client-side only with no CRM/lead destination and no analytics sink: add a clear pending-integration state and confirm the backend before client review. Avoid em dashes, en dashes, tildes and exclamation marks in all deck copy; the banned-language scan is currently clean (no role selector, budget, agency-status, urgency, designation field, no book-a-demo/run-a-pilot/guaranteed-ROI/fully-automated/replacing-teams language) and must stay clean.

## Per-screen briefs

### Screen 0 — Cover / brand opener
- Current: Dark cover (Screen00.tsx): top wordmarkDark lockup + mono kicker, two-column band (left text + AdvanceCta, right animated SVG orbit with a GrabOn hub and 3 satellite nodes on dashed lines), and a bottom strip of 5 module chips.
- Audit issue: Hero is a small abstract orbit; the Inspirelabs lockup is too small for a first-viewport brand signal; no real GrabOn surface or product proof on the cover; and the dark screen is still not a true 1920x1080 logical canvas so the brand moment looks under-scaled.
- Refactor action: Rebuild as a premium 1920x1080 dark executive opener: large Inspirelabs lockup, one dominant real GrabOn commerce surface as the proof object, the connected system modules as labelled proof tiles rather than an abstract orbit, single orange focal.
- Dominant visual: Large GrabOn commerce-surface screenshot as the cover hero, anchored by an oversized Inspirelabs lockup.
- Assets: grabonHome, wordmarkDark (confirm correct dark lockup vs lockupInkDark), symbolLight (optional motif accent)
- Mock needed: false
- Product reality: Frame GrabOn as active commerce surface and proof point, never minimised. Confirm the correct dark-background Inspirelabs lockup file (lockup-ink.png colour treatment is ambiguous). One orange focal.

### Screen 1 — Setup / personalisation input
- Current: Light setup form (Screen01.tsx): one card with three numbered radio groups via a local SetupGroup (Q1 familiarity 3 chips, Q2 category 9 chips, Q3 priority 9 chips, ~21 visible chips), a live text preview line, a Continue button, and a secondary note button opening an info drawer.
- Audit issue: Critical: chip-heavy 21-option layout creates an input-wall, clutter and mobile friction; reads like a web-form gate, not executive deck setup; the soft preview box and helper note compete with Continue.
- Refactor action: Replace Q1 with a segmented control, Q2 with a searchable dropdown, Q3 with a compact priority dropdown; put the preview in a disciplined side/summary panel; keep Continue in a clear fixed CTA safe zone; demote the helper note to a small de-emphasised link or drawer trigger.
- Dominant visual: Disciplined setup panel: compact segmented/dropdown controls beside a single tailored summary-preview card.
- Assets: 
- Mock needed: false
- Product reality: Setup must keep driving tailored hero (2), category proof (34) and roadmap (36) without branching the fixed middle journey. Nav is correctly hidden on Screen 1. On mobile use progressive disclosure and compact selectors.

### Screen 2 — Tailored repositioning hero
- Current: Light hero (Screen02.tsx, hero.css): setup-tailored header, then a row with grabonHome screenshot (small, captioned flagship commerce-intent surface), an 'expands into' arrow, and a right column of 5 module tiles; footer NetBox + fixed-journey note + AdvanceCta.
- Audit issue: Personalisation is almost entirely text; the GrabOn frame is small and the module tiles read like navigation, so the tailored expansion is not visually meaningful.
- Refactor action: Make the setup answer visibly alter a headline panel and route emphasis, and scale the GrabOn surface up into a real proof object instead of a small frame.
- Dominant visual: Enlarged GrabOn home surface expanding into a labelled module set, with a headline panel that visibly reflects the setup answer.
- Assets: grabonHome, grabonLogo (on the frame)
- Mock needed: false
- Product reality: grabonHome is currently used only small here; promote it. Keep the fixed-journey note. One orange focal.

### Screen 3 — GrabOn-to-Inspirelabs expansion
- Current: Light split (Screen03.tsx): grabonCategory proof panel on the left with a Chip, a 'connects into' arrow, and a right list of 5 clickable module rows opening definition drawers; footer net statement + AdvanceCta.
- Audit issue: The proof object is too small and the module list reads like navigation; drawer controls compete with the argument.
- Refactor action: Refactor into a stronger proof-led board: GrabOn surface as the dominant left proof object plus an expansion board of 5 large labelled modules; limit click affordances to small hotspot markers.
- Dominant visual: Large GrabOn category/home surface as the dominant proof object feeding a labelled five-module expansion board.
- Assets: grabonCategory, grabonHome (alt), grabonLogo
- Mock needed: false
- Product reality: Make product reality unambiguous by adding the GrabOn logo. GrabOn is proof point plus active surface; Inspirelabs is the system around it. One orange focal.

### Screen 4 — Pre-brand decision intro
- Current: Light diagram (Screen04.tsx): DeckHeader over a 6-node horizontal FlowRail (Search, Offers, Creators, Communities, Partners, Brand visit endpoint) each opening a drawer, plus a right-aligned 'brand-owned tracking begins here' note; footer NetBox + AdvanceCta. No imagery.
- Audit issue: The journey is a row of small flow cards and does not show customer behaviour or a pre-brand decision scene; too much meaning sits in paragraph blocks.
- Refactor action: Replace the small flow cards with a cinematic pre-brand customer decision-journey scene (search, offer, creator, community, partner, brand arrival) with brand-owned tracking shown as a late-stage boundary; cut support copy 30-50 percent.
- Dominant visual: A cinematic pre-brand decision-journey map with a visible late-stage brand-tracking boundary.
- Assets: 
- Mock needed: true
- Product reality: Illustrative journey scene; do not invent metrics. The tracking boundary sets up the AudienceSeed blind-spot argument (21). One orange focal.

### Screen 5 — Operating advantage
- Current: Light card grid (Screen05.tsx): DeckHeader over a CardGrid of 5 .opentile cards (Owned surfaces, Distribution depth, Shopper signals, In-house AI Lab, Measurement discipline) each with a View-proof-status drawer; footer NetBox + AdvanceCta. No imagery.
- Audit issue: Five proof-status cards carry the meaning with no asset thumbnails despite available GrabOn/GrabCash/GrabShare/RankDrive/WriteGenius captures; reads like claims with proof status; too much support copy.
- Refactor action: Convert to an operating-base board of 5 proof tiles, each using a real thumbnail or product logo plus a compact evidence-status strip; fewer words.
- Dominant visual: An operating-base board where each of the five assets-in-motion is a real product thumbnail with an evidence strip.
- Assets: grabonHome, grabcashDeals, grabshareHome, rankdriveDash, writegeniusDash, grabonLogo, grabcashLogo, grabshareLogo, rankdriveLogo, writegeniusLogo
- Mock needed: false
- Product reality: rankdriveDash fits here as the in-house-AI proof; keep evidence statuses honest (validation pending). One orange focal across the board, not five.

### Screen 6 — System overview map
- Current: Light horizontal rail (Screen06.tsx): DeckHeader over a rail of 5 clickable step cards (Capture intent, Distribute demand, AudienceSeed, AI Growth Studio, Growth commitments) joined by arrows and jumping to sections, plus a full-width Category Proof jump button; footer NetBox + AdvanceCta.
- Audit issue: Clear sequence but it is a small button rail and proof-layer strip that feels like navigation, not a system map.
- Refactor action: Redesign as a wide operating map (intent, distribution, signals, AI Studio, commitments, proof layer) with the proof layer as surrounding evidence; buttons demoted to secondary hotspots.
- Dominant visual: A wide system operating map with the proof layer wrapped around the five stages as evidence.
- Assets: 
- Mock needed: true
- Product reality: Built system map (no invented metrics). Section-jump behaviour can remain via hotspots, but the map must read as the proof, not the nav. One orange focal.

### Screen 7 — Capture commerce intent intro
- Current: Light diagram (Screen07.tsx): DeckHeader over a Lanes block of 3 horizontal intent lanes with strength bars (Offer-led 64, Commerce 82 accent, Comparison-led 72); footer NetBox + AdvanceCta. No imagery.
- Audit issue: Abstract scoring bars carry the screen; the comparison wording risks consumer-comparison ambiguity before Screen 10; too much support copy.
- Refactor action: Replace the abstract bars with three intent lanes tied to real surface examples (offers, the commerce surface, B2B software alternatives) and explicitly label the comparison lane as B2B software evaluation.
- Dominant visual: Three intent lanes each illustrated by a real surface example (offer, commerce surface, B2B software-alternatives).
- Assets: grabonHome, grabonCategory, alternativesLogo
- Mock needed: false
- Product reality: Label the comparison lane as B2B software evaluation, not generic consumer comparison, to pre-empt Screen 10. Bar numbers are illustrative; do not present as measured. One orange focal.

### Screen 8 — GrabOn flagship surface
- Current: Visual-first SplitScene (Screen08.tsx): grabonMerchant screenshot on one side; the other side has a support paragraph, a vertical surface-list of 6 surfaces each opening a drawer, an AdvanceCta and a SupportChip. Best asset-led screen in the section.
- Audit issue: Screenshot still not dominant enough; the right-side list plus AI chip dilute CTA hierarchy (primary CTA and AI chip stacked vertically near list controls).
- Refactor action: Enlarge the GrabOn screenshot and annotate 4-5 hotspots directly on it; reduce right-side dependency; move the AI chip to a quiet secondary zone.
- Dominant visual: An enlarged GrabOn merchant store-page screenshot with 4-5 on-image annotated hotspots.
- Assets: grabonMerchant, grabonMerchantMyntra (alt), grabonLogo (on the frame)
- Mock needed: false
- Product reality: Strongest hero candidate is grabonMerchant. AI chip correctly opens the AI Search and Content Agents drawer and the CTA routes to Screen 9; keep both but de-stack them. One orange focal.

### Screen 9 — Promotional surfaces inventory
- Current: Card grid (Screen09.tsx): a mini-cap over a CardGrid of 8 .opentile promotional-placement buttons (Sidekick banners, Cross-promotions, Coupon ID, Video, Featured campaigns, Deal modules, Category takeovers, High-visibility) each opening a drawer with an availability chip; footer NetBox + AdvanceCta. No hero image.
- Audit issue: Pure inventory card grid with no real or recreated placement visuals; 'real promotional surfaces' is asserted but the cards look generic (High-priority asset gap).
- Refactor action: Rebuild as a promotional-surface visual inventory board with large placement mockups (sidekick, coupon ID, category takeover, featured campaign, deal module); availability tags only as supporting labels.
- Dominant visual: A visual inventory board of large promotional-placement mockups, not a card grid.
- Assets: grabonHome (placement context), grabonCategory (takeover context), grabonMerchant, grabonLogo
- Mock needed: true
- Product reality: No dedicated placement screenshots exist (sidekick/coupon-ID/featured/deal/takeover); recreate them as clearly labelled illustrative placement mockups over real GrabOn surfaces. Do not assert availability without evidence chips.

### Screen 10 — Alternatives.co B2B discovery
- Current: Visual-first SplitScene (Screen10.tsx, mock.css): left support text + a surface-list of 4 personas (Alternative seekers, Product researchers, Category explorers, Comparison-led users); right is a BUILT mock with alternativesLogo and a comparison table (columns Option/Value/Offers/Support/Trust, rows including a highlighted Your-brand row). AdvanceCta + SupportChip.
- Audit issue: Critical product-reality defect: presented as a generic consumer-style comparison (Option A/B/C, generic personas and fields) rather than B2B software discovery; no B2B software language on the dominant visual.
- Refactor action: Rebuild around B2B software discovery (SaaS alternatives, AI tools, CRM alternatives, SEO/HRMS/productivity) using an Alternatives.co browser mock titled e.g. Best CRM alternatives, rows of SaaS tools with B2B fields (fit/use case/deployment/pricing model/integration/buyer stage), B2B personas (SaaS buyers, tool evaluators, alternative seekers, category researchers), and B2B metrics; label illustrative until a real screenshot is supplied.
- Dominant visual: An Alternatives.co browser mock of a B2B SaaS-alternatives comparison (e.g. Best CRM alternatives) with software-buyer fields.
- Assets: alternativesLogo
- Mock needed: true
- Product reality: Must NOT imply fashion/food/travel/consumer shopping/D2C or a generic directory. Keep a MockTag illustrative label. Blocked on an approved Alternatives.co screenshot or approval to use the labelled B2B mock. Move the AI chip into a drawer trigger near the mock. Fix before client review.

### Screen 11 — Distribute demand intro
- Current: Three-column split-map (Screen11.tsx): left Panel 'Owned distribution' (GrabCash, GrabShare), a centre vertical 'MEASURABLE ACTIONS' connector with a target icon, right Panel 'Activation surfaces' (Strategic Partnerships, Affiliate, Channel Amplification, Integrated Campaigns); icon glyphs only. Footer NetBox + AdvanceCta.
- Audit issue: Two card panels with a vertical label; does not show demand moving across surfaces; too much meaning in paragraph blocks.
- Refactor action: Replace the two cards with a demand-distribution operating map: brand demand enters owned surfaces on one side, activation surfaces on the other, measurable-action outputs across the bottom; cut copy 30-50 percent.
- Dominant visual: A demand-distribution operating map showing demand flowing from owned surfaces through activation surfaces to measurable actions.
- Assets: grabcashDeals (owned), grabshareHome (owned), partner1 (activation context)
- Mock needed: true
- Product reality: Map is built; keep owned vs activation separation clear (do not equate affiliate, partnerships and creators). One orange focal.

### Screen 12 — Owned distribution overview
- Current: Two-up card grid (Screen12.tsx): two product cards, GrabCash (grabcashDeals) and GrabShare (grabshareHome), each with title, tagline, a Shot and a roles/actions/metrics drawer button; footer NetBox + AdvanceCta.
- Audit issue: Uses real assets but both visuals are too small and sit inside cards, looking like a product listing rather than distribution motion.
- Refactor action: Enlarge both product scenes and show a shared action path so GrabCash and GrabShare read as two owned distribution engines, not cards.
- Dominant visual: Two enlarged owned-distribution product scenes joined by one shared measurable-action path.
- Assets: grabcashDeals, grabshareHome, grabshareWeb (desktop proof option), grabcashLogo, grabshareLogo
- Mock needed: false
- Product reality: Add GrabCash and GrabShare logos to the frames. GrabCash must not imply a creator storefront or broad affiliate marketplace; that is GrabShare. One orange focal.

### Screen 13 — GrabCash mechanics
- Current: Visual-first split (Screen13.tsx): left text column with support paragraph, mini-cap, a 3-node FlowRail (Share deal link, Tracked action, Payout-led), a metric-strip of Chips, AdvanceCta + SupportChip; right figure is one large grabcashDeals Shot.
- Audit issue: Real asset helps but the flow rail and chips carry too much meaning and the screenshot crop is not treated as the hero.
- Refactor action: Make the GrabCash screenshot and the tracked-action flow dominant: a three-step share-link to tracked-action to payout motivation diagram anchored by the enlarged GrabCash visual.
- Dominant visual: An enlarged GrabCash deals screenshot anchoring a three-step share-to-tracked-action-to-payout flow.
- Assets: grabcashDeals, grabcashLogo
- Mock needed: false
- Product reality: Add the GrabCash logo. Do not imply unverified payout economics. One orange focal.

### Screen 14 — GrabShare creator commerce
- Current: Visual-first split (Screen14.tsx): left text column + a surface-list of 5 items (Creator storefronts, Product curation, Social sharing, Trusted recommendations, Creator-wise tracking) opening drawers, AdvanceCta + SupportChip; right shows two overlapping Phone mockups (grabshareCreator + grabshareMain) with a MockTag.
- Audit issue: Stronger because phones are dominant, but the left list is still card-like and the CTA plus chip crowd the lower left.
- Refactor action: Keep the phone gallery; convert the left list into annotated callouts or a compact creator-commerce rail and resolve CTA/chip crowding.
- Dominant visual: The dual GrabShare creator/social Phone gallery, kept dominant.
- Assets: grabshareCreator, grabshareMain, grabshareWeb (desktop proof option), grabshareLogo
- Mock needed: false
- Product reality: Add the GrabShare logo. Lowest refactor weight in this run (keep + polish). One orange focal.

### Screen 15 — Activation surfaces overview
- Current: Card grid (Screen15.tsx): a mini-cap over a CardGrid of 4 .opentile activation-family cards (Strategic Partnerships, Affiliate, Channel Amplification, Integrated Campaigns), each with Preview (drawer) and Open-screen (goTo) actions; footer NetBox + AdvanceCta. No imagery.
- Audit issue: Four cards with preview and open-screen controls feel like a menu, not a deck scene; too much support copy and copy carries the story.
- Refactor action: Replace the card menu with an activation-family map: four lanes, one visual cue per lane; keep the drawer affordance as small hotspots, not inline card controls.
- Dominant visual: An activation-family map of four lanes, each with a single real visual cue.
- Assets: partner1 (partnerships cue), telegramPost (channel cue), telegramAd (campaign cue)
- Mock needed: true
- Product reality: Keep the four activation families distinct and separated. One orange focal.

### Screen 16 — Strategic partnerships
- Current: Visual-first split (Screen16.tsx): left has two proofstat blocks (145+ partnerships, 200M+ reach with EvidenceTag), a mini-cap, an 8-button ecosystem metric-strip opening drawers, and a CTA stack (AdvanceCta + SupportChip); right shows three offset partner Phone mockups (partner1/2/3) with a MockTag.
- Audit issue: Correctly uses partner screenshots but the phones are too small relative to two proof stats, ecosystem chips, CTA and AI chip; reads like a proof-stat panel with phone decoration; everything competes.
- Refactor action: Enlarge the three partner phones into a dominant storyboard; put the proof strip at top, phones centre, CTA bottom-left, AI chip quiet bottom-centre; reduce ecosystem chips to 4-6 grouped labels; keep the 145+ proof and the 200M+ caveat.
- Dominant visual: A three-phone partner-surface storyboard as the dominant object.
- Assets: partner1, partner2, partner3
- Mock needed: false
- Product reality: Keep 200M+ as potential reach only (EvidenceTag potential) and the 145+/200M+ caveat; no unverified partner-logo wall. Fintech surface trigger correctly opens the Fintech drawer. Confirm partner-screenshot clearance. One orange focal.

### Screen 17 — Affiliate marketing platforms
- Current: Split (Screen17.tsx): left support paragraph + a surface-list of 5 rows (Affiliate publishers, Coupon partners, Deal publishers, Performance traffic, Tracked campaigns) opening metric drawers + AdvanceCta; right is a BUILT Tracked-campaign-report mock with MockTag, a 3-column KPI grid (CPA/CPS/ROAS via MetricField) and 3 pending report rows.
- Audit issue: The built report mock is useful but generic, and the left list dominates more than the campaign report.
- Refactor action: Make the tracked-campaign report the hero with a source-to-outcome lane (publisher source, tracked click, order/lead, CPA/CPS/ROAS report); keep the report mock as the hero.
- Dominant visual: A tracked-campaign report mock as hero, sitting at the end of a publisher-source-to-CPA/CPS/ROAS lane.
- Assets: 
- Mock needed: true
- Product reality: Built mock with MockTag; make it specific with publisher sources and CPA/CPS/ROAS fields but do not invent actual numbers (keep pending). Keep affiliate separated from partnerships and creators. One orange focal.

### Screen 18 — Channel amplification
- Current: Card grid (Screen18.tsx): a mini-cap over a channel-grid of 9 channel tiles (Social, Email, Newsletter, App push, Web push, YouTube, Instagram, Media house, Telegram) each opening a surface drawer; footer NetBox + CTA stack (AdvanceCta + SupportChip). No imagery.
- Audit issue: Critical: pure channel-tile grid with NO available Telegram assets used; no campaign moving across channels; channel grid, proof note, CTA, AI chip, nav and rail all crowd the bottom/right; copy-led.
- Refactor action: Rebuild as a campaign-distribution board where one creative set flows into Telegram, email, push, social, video and media house, using the real Telegram assets; one CTA safe zone.
- Dominant visual: A campaign-distribution board: one creative set flowing across selected channels, anchored by real Telegram post/ad/report visuals.
- Assets: telegramPost, telegramAd, telegramReport
- Mock needed: true
- Product reality: Real Telegram assets exist and must be used. Do not imply guaranteed omnichannel availability, platform permissions or automatic posting; include channel-selection logic. Confirm Telegram-screenshot clearance. Re-measure overlap after the 1920 refactor. One orange focal.

### Screen 19 — Integrated campaign promotions
- Current: Card grid (Screen19.tsx): a mini-cap over a 'moments' grid of 6 promotion cards (Launch, Seasonal, Co-branded, Partner-specific, ATL/BTL, Media/event) each with a What-to-confirm drawer; footer NetBox + AdvanceCta. No imagery.
- Audit issue: Card grid with notes that feels theoretical; does not feel like launch/season/co-brand/partner opportunity management; too much support copy and copy carries the story.
- Refactor action: Rebuild as a campaign board or launch calendar with swimlanes (objective, offer, surfaces, partner moment, proof gate, reporting) and scoping gates.
- Dominant visual: A campaign board / launch calendar with swimlanes and scoping gates.
- Assets: telegramAd, partner1
- Mock needed: true
- Product reality: Do not imply invented media packages, fixed budgets or fixed dates; use scoping gates and campaign-artefact placeholders. Re-measure overlap after the 1920 refactor. One orange focal.

### Screen 20 — AudienceSeed intro
- Current: Card grid + guardrail (Screen20.tsx): an as-def grid of 4 non-clickable as-cards (Shopper intent signals, Retargeting input, Offer intelligence, Audience quality), an as-guard shield strip (approved/policy-compliant, no raw PII), and a CTA stack with AdvanceCta, a ghost 'What AudienceSeed is not' button (drawer) and a fixed mono support line.
- Audit issue: Four definition cards plus compliance note say the right things but do not show signal depth or product reality; ghost button competes with the primary CTA; too much support copy.
- Refactor action: Replace the definition cards with an AudienceSeed signal board (shopper event stream, approved signal layer, retargeting input, offer intelligence); keep the compliance guardrail as a locked footer note; move 'what AudienceSeed is not' into a small guardrail link, not an equal-weight button.
- Dominant visual: An AudienceSeed signal board: shopper event stream into an approved signal layer feeding retargeting input and offer intelligence.
- Assets: 
- Mock needed: true
- Product reality: AudienceSeed by Inspirelabs. Preserve guardrails as visible UI: approved policy-compliant signals only, no raw PII, no unauthorised tracking, no automatic media activation; Meta/Google are existing brand workflows. Read as commercial decision support, not analytics. One orange focal.

### Screen 21 — Pre-pixel blind spot
- Current: Visual-first flow (Screen21.tsx): a mini-cap over a 5-node FlowRail (Discovery, Comparison, Coupon reveal, Outbound click, Brand arrival endpoint) each opening a drawer, with a bracket below holding two labelled segments (AudienceSeed sees the decision forming / Your pixel starts here); footer NetBox + AdvanceCta.
- Audit issue: Good concept but the flow rail is too abstract and low-density; needs a stronger before-the-pixel visual.
- Refactor action: Strengthen the blind-spot visual with a real GrabOn event path: GrabOn discovery, coupon reveal, outbound click, then brand arrival with a visible pixel boundary.
- Dominant visual: A GrabOn event path (discovery to coupon reveal to outbound click to brand arrival) with a visible pixel boundary.
- Assets: grabonHome, grabonMerchant
- Mock needed: true
- Product reality: Make the pixel boundary explicit to motivate AudienceSeed; keep compliance framing. One orange focal.

### Screen 22 — Intent signal depth
- Current: Visual-first Ladder (Screen22.tsx): a single Ladder of 7 rungs (Page view, Offer view, Coupon reveal, Outbound click, Engagement depth, Repeat behaviour, Signal freshness) each captioned and opening a metric drawer; footer NetBox + AdvanceCta.
- Audit issue: One of the better abstract visuals but it lacks source context and looks like a UI control.
- Refactor action: Keep the signal ladder but add source context and distinguish event type, strength, freshness and approved-use status.
- Dominant visual: The signal ladder, enriched with source context and per-rung event type / strength / freshness / approved-use status.
- Assets: 
- Mock needed: true
- Product reality: Mark approved-use status per rung to reinforce AudienceSeed compliance. Pair status colour with text/icon. Low refactor weight. One orange focal.

### Screen 23 — Offer Lab
- Current: Card grid (Screen23.tsx): a mini-cap over an offer-board grid of 6 offer-cards (Percentage discount accent with Example chip, Flat, Free delivery, Minimum basket, Combo, Payment/bank offer) each with a response track and a pending line, opening metric drawers; footer NetBox + AdvanceCta.
- Audit issue: Offer board is relevant but still card-led with no visual tie to GrabOn offer response.
- Refactor action: Turn offer response into a commercial decision dashboard/report mock with offer formats, observed response status, sample-size gate and recommended action.
- Dominant visual: A commercial offer-response decision dashboard (offer formats, response status, sample-size gate, recommended action).
- Assets: grabonCategory (offer-response context)
- Mock needed: true
- Product reality: Keep response data as pending/illustrative with a sample-size gate; do not invent observed numbers. Read as decision support, not analytics. One orange focal.

### Screen 24 — AudienceSeed workflow
- Current: Visual-first horizontal flow (Screen24.tsx): a mini-cap over a 5-node FlowRail (Surface visit, Approved signal, Audience build, Brand retargeting endpoint captioned Meta or Google, Signal report) each opening a drawer, then an as-guard shield row with a platform-policy disclaimer; footer NetBox + CTA stack.
- Audit issue: Compliance is correct but the flow rail is small and too generic; too much support copy.
- Refactor action: Rebuild as an approved-signal to existing-brand-retargeting pipeline board (GrabOn events, approved signals, audience build, existing brand ad workflow, signal report); cut copy 30-50 percent; keep compliance pinned and move the AI chip inside the report or a drawer.
- Dominant visual: An AudienceSeed pipeline board from GrabOn events through approved signals and audience build into the existing brand ad workflow and a signal report.
- Assets: 
- Mock needed: true
- Product reality: Brand keeps its own Meta/Google ad account, budget and creative; no automatic media activation; no raw PII. Keep the compliance guardrail as a pinned strip. One orange focal.

### Screen 25 — AudienceSeed reporting
- Current: Visual-first single mock dashboard (Screen25.tsx): one centred .mock panel with MockTag 'Illustrative mockup, not final data', a title bar, 4 KPI tiles all 'Pending validation', a 7-bar SIGNAL PATTERN chart (bar 3 accented), and 4 report rows (Recommended action shows a Human-reviewed chip, others Pending), each opening a metric drawer; footer NetBox + AdvanceCta.
- Audit issue: Reporting mock is directionally correct but looks like generic analytics despite the copy.
- Refactor action: Make it a commercial decision dashboard (signal quality, offer response, audience readiness, recommended action) and reduce chart decoration.
- Dominant visual: A commercial decision dashboard centred on signal quality, offer response, audience readiness and a recommended action.
- Assets: 
- Mock needed: true
- Product reality: Keep KPIs pending/illustrative with MockTag; keep the Human-reviewed chip on the recommended action. Must read as decision support, not analytics. One orange focal.

### Screen 26 — AI Growth Studio intro
- Current: Visual-first control flow (Screen26.tsx): a .control row of 4 stage cards (Inputs, Agents running, Human review with a Review-checkpoint status, Launch-ready outputs) joined by arrow links, a metric-strip of 5 guard chips; footer NetBox + CTA row with AdvanceCta and a ghost 'See the guardrails' button (ai drawer).
- Audit issue: Four small control panels do not feel like a running AI studio or control room; the guardrail ghost button competes with the CTA; too much support copy and copy-led.
- Refactor action: Rebuild as an AI control-room scene (active tasks, human-review queue, input panel, output queue) with guardrails in a side strip, not a CTA-row button.
- Dominant visual: An AI control-room scene: active tasks, human-review queue, input panel and output queue.
- Assets: rankdriveDash (control-room context)
- Mock needed: true
- Product reality: Visual fix only: show running work with visible human review; do not imply replacing teams, guaranteed ROI or autonomous launch. One orange focal.

### Screen 27 — AI agent map
- Current: Card grid (Screen27.tsx): a .clusters grid of 9 agent-cluster cards (Search and Discovery, RankDrive, WriteGenius, Content, Creative, Channel, Creator, Monitoring, Custom Growth) each with a status pill and a use-case line, opening ai drawers; footer NetBox + AdvanceCta.
- Audit issue: Nine status cards form an agent inventory, contrary to guidance that AI Studio should show running flows; text-led.
- Refactor action: Replace the card grid with a running studio map (active agents grouped by workstream, live queue, review owner, output status) and a task queue.
- Dominant visual: A running AI studio map: agents grouped by workstream with a live queue, review owner and output status.
- Assets: rankdriveDash, writegeniusDash, rankdriveLogo, writegeniusLogo
- Mock needed: true
- Product reality: Pair RankDrive and WriteGenius captures/logos beside their workstreams; build a control-room mock for the other agents. Keep human review visible. One orange focal.

### Screen 28 — Search and content agents flow
- Current: Visual-first flow + dual real screenshots (Screen28.tsx): a 6-node FlowRail (Input, Scan, Opportunities, Briefs, WriteGenius output, Human review) opening ai drawers, then a 2-up split of two Shot blocks with MockTags: rankdriveDash tagged 'Scan RankDrive' and writegeniusDash tagged 'Output WriteGenius'. The only AI screens using real assets.
- Audit issue: Correctly uses RankDrive and WriteGenius but the product captures are small under a generic rail.
- Refactor action: Make RankDrive scan and WriteGenius output the primary split-screen visual; put the flow rail as a thin top status strip.
- Dominant visual: An enlarged RankDrive-scan and WriteGenius-output split-screen as the primary visual, with the flow rail reduced to a status strip.
- Assets: rankdriveDash, writegeniusDash, rankdriveLogo, writegeniusLogo
- Mock needed: false
- Product reality: Label RankDrive clearly as scan/visibility support (no guaranteed SEO ranking); pair WriteGenius with a human-review state (no fully automated/unreviewed publishing); add both product logos beside their captures. One orange focal.

### Screen 29 — Creative, channel and creator agents flow
- Current: Flow + card grid (Screen29.tsx): a 6-node non-interactive FlowRail (Objective, Offer angles, Ad variants, Channel copy, Creator brief, Review), a mini-cap, then an .outcards grid of 6 output cards (Google/Meta/Bing/Creator briefs/Telegram/Social) each with a Review-ready pill, opening ai drawers; footer s-net + AdvanceCta.
- Audit issue: Output cards dominate and lack creative artefacts, channel samples or a creator-brief feel.
- Refactor action: Rebuild as a campaign production board (objective brief, offer angles, ad variants, channel copy, creator brief, human approval) with real artefact placeholders.
- Dominant visual: A campaign production board moving from objective brief through offer angles, ad variants and channel copy to a creator brief and human approval.
- Assets: telegramAd (channel-copy artefact), telegramPost
- Mock needed: true
- Product reality: Show human approval in the flow; do not imply autonomous launch. Artefacts are illustrative. One orange focal.

### Screen 30 — Monitoring and optimisation flow
- Current: Vertical list (Screen30.tsx): a .monitor stack of 6 rows (Campaign live, Performance read, Anomaly flags, Channel summary, Recommendation, Next action) each with an icon, a sub line and a status pill, opening ai drawers; footer NetBox + AdvanceCta.
- Audit issue: Monitoring rows are credible but plain and do not feel live or operational.
- Refactor action: Refactor into a live monitoring cockpit (anomaly, performance read, channel summary, recommendation, review status).
- Dominant visual: A live monitoring cockpit with anomaly, performance, channel-summary and recommendation panels plus a review status.
- Assets: telegramReport (channel reporting/monitoring ground)
- Mock needed: true
- Product reality: telegramReport can ground channel monitoring. Keep review status visible; pair status colour with labels. One orange focal.

### Screen 31 — Custom growth agents
- Current: Card grid + closing flow (Screen31.tsx): a mini-cap, an .outcards grid of 6 use-case cards (Report automation, Offer variants, Category briefs, Creator briefs, Competitive visibility, Performance summaries) opening ai drawers, then a 4-node FlowRail (Recurring task, Required inputs, Review owner, Measurable output); footer cta-row with AdvanceCta and a ghost intake button (ai intake drawer).
- Audit issue: Use-case cards plus a small rail feel like a service menu, not serious agent scoping; the secondary ghost CTA competes with the primary and the two CTAs are near-equivalent; text-led.
- Refactor action: Rebuild as a custom-agent intake and scoping canvas (recurring task, input source, output format, frequency, approval owner, measurable output); merge the near-duplicate CTAs into one primary action or move exploration into a drawer.
- Dominant visual: A custom-agent intake/scoping canvas (recurring task, input source, output format, frequency, approval owner, measurable output).
- Assets: 
- Mock needed: true
- Product reality: Keep an approval owner in the scope; do not imply autonomous launch or guaranteed ROI. One orange focal.

### Screen 32 — Growth commitments
- Current: Card grid (Screen32.tsx): a CardGrid of 8 .opentile checkpoint cards (numbered badge, title, icon, one-liner) each opening an info drawer; footer NetBox + AdvanceCta + conditional SupportChip.
- Audit issue: Eight checkpoint cards feel administrative; CTA, AI chip and proof note stack add clutter; too much support copy and copy-led.
- Refactor action: Replace the checkpoint cards with a commitments operating board (objective, KPI, tracking, reporting cadence, review, improvement, roadmap as gates); move the AI chip to the board header or hide until hover/tap.
- Dominant visual: A commitments operating board with objective, KPI, tracking, reporting cadence, review, improvement and roadmap gates.
- Assets: 
- Mock needed: true
- Product reality: Keep commitments factual; do not invent KPI targets. One orange focal.

### Screen 33 — Long-term partnership / measurable expansion
- Current: Visual-first flow (Screen33.tsx): a 4-node FlowRail (first active, rest queued) opening roadmap drawers, plus a Reveal row of 4 accent gate chips separated by arrows; footer NetBox + AdvanceCta + a ghost example-paths drawer button.
- Audit issue: The flow rail plus chips are too light for a commitment model and need evidence gates and expansion logic; the ghost button competes with the primary CTA; too much support copy.
- Refactor action: Build a stage-gated expansion board with unlock conditions, proof evidence, review decision and next tranche; move examples to a drawer hotspot; keep one CTA.
- Dominant visual: A stage-gated expansion board: unlock conditions, proof evidence, review decision and next tranche.
- Assets: 
- Mock needed: true
- Product reality: Expansion is evidence-gated; do not imply guaranteed outcomes. One orange focal.

### Screen 34 — Category proof
- Current: Visual-first split (Screen34.tsx): left has a category ecotag metric-strip of toggle buttons (selected highlighted orange) and a ghost category-proof drawer button; right shows the selected category label, an EvidenceTag, and either a Shot of the category asset with a MockTag or a dashed placeholder; footer AdvanceCta. Asset map covers commerce/electronics/travel/entertainment/fashion.
- Audit issue: The category selector chips dominate; only some categories have visuals; the default can be Other, producing a blank asset-pending box (BFSI, Gaming, Kids, Other fall through).
- Refactor action: Rebuild as a category-proof board with a large selected-category visual, available/missing proof status and metric groups; default to the setup category only if a visual exists, otherwise show the closest available proof category plus an explicit gap note. Avoid the blank panel.
- Dominant visual: A category-proof board with a large selected-category surface visual and explicit available/missing proof status.
- Assets: grabonCategory, catElectronics, catTravel, catEntertainment, grabonCatFashion, catBeauty, grabonMerchantMyntra
- Mock needed: false
- Product reality: Never show an empty asset-pending panel: for BFSI/Gaming/Kids/Other use the closest available visual with an explicit gap note. catBeauty and grabonMerchantMyntra are available for a Fashion/Beauty proof carousel. Category proof correctly reflects the setup category. One orange focal.

### Screen 35 — Case study format
- Current: Card grid in a ProofCard (Screen35.tsx): a header row (shield icon, title, evidence-status drawer button), a 3-column grid of 6 case-study fields (icon, mono label, placeholder, EvidenceTag status); footer NetBox + AdvanceCta.
- Audit issue: The proof-template grid is honest but generic and does not earn trust quickly.
- Refactor action: Make the case module a client-ready proof card (problem, activated capabilities, period, metric groups, evidence status, similar-brand implication).
- Dominant visual: A single client-ready case proof card (problem, activated capabilities, period, metric groups, evidence status, similar-brand implication).
- Assets: 
- Mock needed: true
- Product reality: Keep placeholders honest with evidence-status tags; do not invent case metrics. One orange focal.

### Screen 36 — Tailored roadmap close
- Current: Interactive card-grid roadmap (Screen36.tsx): a custom s-header with two select dropdowns (category, growth priority) and a refresh hint, a roadmap__grid of 5 panels (Capability mix accent, Relevant surfaces, Measurable commitments, Proof needed, Discussion areas) each a checklist; footer NetBox + AdvanceCta (markRoadmapClicked) + a Start-over ghost button.
- Audit issue: Critical: a serious strategic screen reduced to two selects and five checklist cards; does not feel like a partnership roadmap; bottom CTA, Start over, proof note, edit controls, nav and rail all compete; too much paragraph copy and ghost-vs-primary conflict.
- Refactor action: Rebuild as a premium stage-gated partnership roadmap board (first activation path, proof gates, capability-owner profiles, resource-vehicle placeholders, expansion-decision logic); keep editing controls compact and move Start over to a small tertiary text link; give the primary CTA a full safe zone.
- Dominant visual: A stage-gated partnership roadmap board (first activation path, proof gates, capability owners, resource vehicles, expansion logic).
- Assets: 
- Mock needed: true
- Product reality: Roadmap correctly reflects the selected category/priority; jump-to-roadmap is correctly hidden here. Sound like partnership design, not lead generation. Re-measure overlap after the 1920 refactor. One orange focal.

### Screen 37 — Contact / conversion close
- Current: Dark two-column (Screen37.tsx): left has wordmarkDark, eyebrow, white headline, sub, conditional setup chips and a mono support line; right shows either a submitted thank-you state with summary chips or a contact form (name, work email, company, phone, website, message) with a primary submit button.
- Audit issue: Critical: a generic form on a dark background with no premium closing proof, no visible partnership summary, no CRM destination, no consent/privacy note; no hierarchy beyond fields and a button; captures client-side state only; reads like normal web-lead capture.
- Refactor action: Redesign as a premium conversion screen with a roadmap summary, a clear what-happens-next hierarchy, required fields only with optional details collapsed, validation feedback, a single submit CTA, explicit dark-screen safe zones, and a clear backend/CRM pending state. Remove progress rail and deck nav in export/final capture.
- Dominant visual: A premium dark conversion layout: roadmap summary plus what-happens-next beside a disciplined required-fields-only form.
- Assets: wordmarkDark (confirm correct dark lockup), lockupLightTagline (premium closing option if approved)
- Mock needed: false
- Product reality: Approved fields only: name, work email, company, optional phone, optional website, optional message; no designation/budget/agency/urgency/role. Add a consent/privacy note. Blocked on a confirmed CRM/backend/mail/calendar/analytics destination; show a pending-integration state. Shows Back to roadmap. Re-measure overlap after the 1920 refactor. One orange focal.

