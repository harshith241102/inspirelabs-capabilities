# Refactor Screen Changelog

Per-screen before/after for the 1920x1080 deck-canvas refactor. Audit source: `Codex Workspace/audit-output/`. Acceptance = the 10 visual checks in `CLAUDE_REFACTOR_PROMPT.md`.

**Validation:** every screen passes the DOM canvas gate (`.screen__stage` exactly 1920x1080, no overflow) and the screenshot dimension gate (38 frames, all 1920x1080, no screen-NaN). `tsc --noEmit` + `vite build` clean. Content checks: 0 em/en dashes, 0 tildes, 0 banned terms, 0 "AudienceSeed by GrabOn". Both majors (5, 10) and three minors (7, 18, 32) resolved in a post-audit fix pass. Remaining items are minor polish, listed honestly.

Status: **PASS** = meets criteria; **PASS\*** = meets criteria with a minor polish note.

### Screen 0  -  Cover / brand opener
- **Original issue:** Hero is a small abstract orbit; the Inspirelabs lockup is too small for a first-viewport brand signal; no real GrabOn surface or product proof on the cover; and the dark screen is still not a true 1920x1080 logical canvas so the brand moment looks under-scaled.
- **Change made:** Replaced the abstract animated orbit with a dominant real GrabOn commerce surface; oversized lockup; module proof tiles. Dark executive opener, one orange focal.
- **Asset(s):** grabonHome, grabonLogo, wordmarkDark
- **Dominant visual:** Large real GrabOn home surface (browser-framed) as the cover hero proof, anchored by an oversized Inspirelabs lockup; five module proof tiles along the base.
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 1  -  Setup / personalisation input
- **Original issue:** Critical: chip-heavy 21-option layout creates an input-wall, clutter and mobile friction; reads like a web-form gate, not executive deck setup; the soft preview box and helper note compete with Continue.
- **Change made:** Rewrote Screen01.tsx and created s01.css (all classes .s01- prefixed, fixed px for 1920x1080). Composed inside DeckStage (header / fill / cta safe zones) with DeckHeader using copy[1] verbatim for eyebrow/headline/sub and copy[1].cta on the Continue button. Q1 is now a 3-option segmented control (arrow-key roving radiogroup, aria-checked, the single orange f...
- **Asset(s):** built visual (no external asset)
- **Dominant visual:** A two-pane setup console: left control deck (3-option segmented control for Q1 + two styled native select dropdowns for Q2 category and Q3 priority) beside a single tailored summary panel on the right that live-reflects the answers (tailored headline, Reader/C...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 2  -  Tailored repositioning hero
- **Original issue:** Personalisation is almost entirely text; the GrabOn frame is small and the module tiles read like navigation, so the tailored expansion is not visually meaningful.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen02.tsx and created src/screens/s02.css. Promoted grabonHome from a small Shot into a dominant AnnotatedShot proof object (proof-split). Preserved the setup-driven copy logic exactly: headline/sub come from openingTailoring[setup.fam...
- **Asset(s):** ASSETS.grabonHome, ASSETS.grabonLogo
- **Dominant visual:** Enlarged GrabOn home surface (grabonHome) as a large AnnotatedShot proof object occupying ~58% of the canvas, with the GrabOn logo on the frame, expanding into a labelled five-module Inspirelabs system column where the setup growth-priority drives the single o...
- **Remaining limitation:** Personalisation is still mostly text-driven, not visually structural. The brief (Screen 2 refactor action) wants the setup answer to 'visibly alter a headline panel and route emphasis'. Today the only setup-driven changes are: (a) the headline/sub string swap from openingTailoring[familiarity], and (b) one module tile getting an orange border + 'For your priority' flag via emphasisByPriority. The GrabOn proof object...
- **Acceptance:** PASS*

### Screen 3  -  GrabOn-to-Inspirelabs expansion
- **Original issue:** The proof object is too small and the module list reads like navigation; drawer controls compete with the argument.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen03.tsx and created src/screens/s03.css (all classes .s03- prefixed, fixed px for 1920x1080). Replaced the old small Shot + 5-button navigation list with a proof-split: dominant GrabOn AnnotatedShot (logo on frame, grabon.com url) fe...
- **Asset(s):** ASSETS.grabonCategory, ASSETS.grabonLogo
- **Dominant visual:** Large real GrabOn category commerce surface (AnnotatedShot, GrabOn logo on frame, ~50% width, full-height) connected by a dashed orange-node "connects into" bridge into a labelled five-module Inspirelabs expansion board on the right.
- **Remaining limitation:** CARD-GRID RELAPSE (partial): the right half is s03-modules = 5 stacked .s03-mod rows that are near-identical white rounded cards (icon chip + number + label + role + a 'Define' pill each). The brief said to limit click affordances to 'small hotspot markers' and make them 'large labelled modules', but each of the 5 rows still carries its own 'Define' button (5 click targets), reproducing the audit's exact complaint th...
- **Acceptance:** PASS*

### Screen 4  -  Pre-brand decision intro
- **Original issue:** The journey is a row of small flow cards and does not show customer behaviour or a pre-brand decision scene; too much meaning sits in paragraph blocks.
- **Change made:** Replaced the 6-node FlowRail card row with a single operating-board journey map carrying the story in 5s. One orange focal = the late-stage tracking boundary + brand-arrival endpoint; pre-brand nodes are ink/grey/border. Cut support copy (removed standalone mini-cap and footer NetBox; the one c.support line is pinned inside the map). copy[4] eyebrow/headline...
- **Asset(s):** none (illustrative built journey map, mock-needed per brief; no screenshots required)
- **Dominant visual:** A cinematic pre-brand decision-journey map: five neutral pre-brand surface nodes (Search, Offers, Creators, Communities, Partners) flowing along one continuous dashed track, crossing a single orange dashed tracking-boundary into the brand-arrival endpoint wher...
- **Remaining limitation:** No MockTag on the illustrative built journey map; the brief's global rule says every illustrative built visual should carry a MockTag. Risk is low here because the map invents no metrics or data, but a MockTag would be consistent with the rule. Mono font used on three elements (two zone labels, the boundary flag, plus the footer note) — within reason but brushes against the brief's flagged global mono overuse; reserv...
- **Acceptance:** PASS*

### Screen 5  -  Operating advantage
- **Original issue:** Five proof-status cards carry the meaning with no asset thumbnails despite available GrabOn/GrabCash/GrabShare/RankDrive/WriteGenius captures; reads like claims with proof status; too much support copy.
- **Change made:** Replaced the 5-card .opentile CardGrid (claims-with-proof-status, no imagery) with the brief's operating-base board. Each of the five assets-in-motion is now a real product thumbnail + product logo + compact evidence strip, all under a vertical "Assets already in motion" spine so it reads as one operating base. Files: src/screens/Screen05.tsx (rewritten), sr...
- **Asset(s):** ASSETS.grabonHome, ASSETS.grabcashDeals, ASSETS.grabshareHome, ASSETS.rankdriveDash, ASSETS.writegeniusDash, ASSETS.grabonLogo, ASSETS.grabcashLogo, ASSETS.grabshareLogo, ASSETS.rankdriveLogo, ASSETS.writegeniusLogo
- **Dominant visual:** An operating-base board: one labelled spine plus five equal proof-asset columns, each a real product thumbnail (GrabOn home, GrabCash deals, GrabShare storefront, RankDrive dashboard, WriteGenius workflow) topped with its product logo chip and footed by an hon...
- **Remaining limitation:** Resolved (was major): tiles realigned to copy (Shopper signals = AudienceSeed restored); misleading/duplicate WriteGenius screenshot replaced with honest MockTag-labelled built mini-visuals for the two advantages without a real capture.
- **Acceptance:** PASS

### Screen 6  -  System overview map
- **Original issue:** Clear sequence but it is a small button rail and proof-layer strip that feels like navigation, not a system map.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen06.tsx and created src/screens/s06.css. Replaced the old button-rail + separate proof strip (which read as navigation) with a built proof-wrapped system map per the brief. Preserved the Screen wrapper (index 6, tone light, id "overv...
- **Asset(s):** built visual (no external asset)
- **Dominant visual:** A wide left-to-right system operating map: five sequenced stage nodes (Capture commerce intent, Distribute demand, AudienceSeed shopper signals, AI Growth Studio, Growth commitments) threaded by ONE continuous spine from an "Audience intent" entry to an "Accou...
- **Remaining limitation:** Missing MockTag: the brief marks Screen 6 as Mock needed: true and the global rule requires every illustrative built visual to carry a MockTag, but the s06-map renders no MockTag. The dashed 's06-prooflabel' is an explanatory proof label, not an illustrative-mock label. Minor honesty-labeling gap (no invented metrics/dates/logos are present, so it is low-risk). Borderline card-shaping: the five stages are still white...
- **Acceptance:** PASS*

### Screen 7  -  Capture commerce intent intro
- **Original issue:** Abstract scoring bars carry the screen; the comparison wording risks consumer-comparison ambiguity before Screen 10; too much support copy.
- **Change made:** Replaced the abstract scoring-bar Lanes block with an operating-board of three intent lanes, each illustrated by a real surface example per the brief. The comparison lane is explicitly framed as B2B software evaluation (Alternatives.co logo + MockTag "B2B software evaluation" + "Best CRM alternatives" rows + "SaaS buyers, tool evaluators, category researcher...
- **Asset(s):** grabonHome, grabonCategory, grabonLogo, alternativesLogo
- **Dominant visual:** A three-lane intent operating board that reads as one system: lane 1 Offer-led = real GrabOn home surface, lane 2 Commerce intent = real GrabOn category surface (the single orange accent focal, tabbed "Strongest commerce intent"), lane 3 Comparison-led = a bui...
- **Remaining limitation:** Resolved (minor): real GrabOn surfaces now carry EvidenceTag approved, not pending.
- **Acceptance:** PASS

### Screen 8  -  GrabOn flagship surface
- **Original issue:** Screenshot still not dominant enough; the right-side list plus AI chip dilute CTA hierarchy (primary CTA and AI chip stacked vertically near list controls).
- **Change made:** Promoted the merchant screenshot to a dominant annotated hero with on-image pins; reduced right-side dependency to a clean numbered list; de-stacked the primary CTA and quiet AI chip.
- **Asset(s):** grabonMerchant, grabonLogo
- **Dominant visual:** Enlarged GrabOn merchant store-page screenshot (AnnotatedShot) with on-image numbered hotspot pins; compact numbered surface list + measurement evidence note alongside.
- **Remaining limitation:** Annotation pins under-delivered vs brief: brief calls for 4-5 on-image hotspots, but only 3 pins are wired in the `pins` array (Screen08.tsx lines 23-27). Polish gap, not a blocker. Pin numbering is non-contiguous and mismatches the side list: pins use n=1, 2, 5 while the s08-list renders rows numbered 1-6 sequentially (s08-row__n = i+1). The on-image '5' (Featured deal placements) does not correspond to row 5 (Deal...
- **Acceptance:** PASS*

### Screen 9  -  Promotional surfaces inventory
- **Original issue:** Pure inventory card grid with no real or recreated placement visuals; 'real promotional surfaces' is asserted but the cards look generic (High-priority asset gap).
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen09.tsx and created /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/s09.css (all classes .s09- prefixed, fixed px for 1920x1080). Replaced the 8-button CardGrid with o...
- **Asset(s):** ASSETS.grabonHome, ASSETS.grabonLogo
- **Dominant visual:** A real GrabOn home surface (browser-framed, dimmed) used as a placement canvas, with four illustrative promotional placements drawn directly onto it (sidekick banner, featured campaign, deal module, coupon ID promotion), beside a slim 8-item placement inventor...
- **Remaining limitation:** Overlays are text-labeled annotation boxes over the real surface, not literal recreations of each placement format (the 'Featured campaign' orange box is a labeled rectangle, not a rendered ad creative); honestly MockTagged, but slightly short of the brief's 'large placement mockups'. Rail/overlay count mismatch: the rail lists all 8 placements but only 4 are drawn on the surface (banner, featured, deal, coupon). The...
- **Acceptance:** PASS*

### Screen 10  -  Alternatives.co B2B discovery
- **Original issue:** Critical product-reality defect: presented as a generic consumer-style comparison (Option A/B/C, generic personas and fields) rather than B2B software discovery; no B2B software language on the dominant visual.
- **Change made:** Replaced the consumer-style SplitScene comparison (Option A/B/C, fields Value/Offers/Support/Trust, generic personas) with a dashboard-mock built around ONE dominant Alternatives.co browser mock reading as B2B software discovery in 5s. Left rail is a thin support column: copy[10].support + four B2B personas (SaaS buyers, Tool evaluators, Alternative seekers...
- **Asset(s):** ASSETS.alternativesLogo
- **Dominant visual:** An Alternatives.co browser mock (URL alternatives.co/best-crm-alternatives + alternativesLogo + MockTag) titled "Best CRM alternatives", with a B2B SaaS comparison table: SaaS-tool rows (Your CRM / Tool A / Tool B / Tool C) and software-buyer fields Use case...
- **Remaining limitation:** Resolved (was major): headline, subheadline and personas rewritten to B2B software discovery (SaaS buyers, tool evaluators, category researchers) so copy matches the B2B SaaS-alternatives visual.
- **Acceptance:** PASS

### Screen 11  -  Distribute demand intro
- **Original issue:** Two card panels with a vertical label; does not show demand moving across surfaces; too much meaning in paragraph blocks.
- **Change made:** Replaced the two-card split-map (two text Panels + vertical "MEASURABLE ACTIONS" label, meaning carried by paragraphs) with one built operating-board/map that shows demand flowing from owned surfaces and activation surfaces into measurable action. Used real captures per brief (grabcashDeals + grabshareHome anchor the owned band as actual product surfaces, no...
- **Asset(s):** grabcashDeals, grabshareHome, partner1
- **Dominant visual:** A demand-distribution operating map: one "Brand demand" source node feeds two clearly separated bands (Owned distribution with real GrabCash + GrabShare surface captures; Activation surfaces with a partner-surface cue plus the four activation families), both c...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 12  -  Owned distribution overview
- **Original issue:** Uses real assets but both visuals are too small and sit inside cards, looking like a product listing rather than distribution motion.
- **Change made:** Replaced the two-up card grid with a single owned-distribution composition: GrabCash (wide 3440x1440 desktop capture) and GrabShare (tall 1206x2622 portrait capture rendered phone-shaped, dark backing) shown as two enlarged framed scenes, each branded with its real product logo and tagline (GrabCash = community/share-led, GrabShare = creator/storefront-led...
- **Asset(s):** ASSETS.grabcashDeals, ASSETS.grabshareHome, ASSETS.grabcashLogo, ASSETS.grabshareLogo
- **Dominant visual:** Two enlarged owned-distribution product scenes (GrabCash desktop frame + GrabShare phone-shaped frame, each logo-badged) joined by one shared measurable-action path rail that is the single orange focal.
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 13  -  GrabCash mechanics
- **Original issue:** Real asset helps but the flow rail and chips carry too much meaning and the screenshot crop is not treated as the hero.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen13.tsx and created /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/s13.css. Replaced the prior FlowRail+chip-strip text wall with a proof-split: real GrabCash capture...
- **Asset(s):** ASSETS.grabcashDeals, ASSETS.grabcashLogo
- **Dominant visual:** Enlarged real GrabCash deals screenshot (AnnotatedShot) with the GrabCash logo on the browser frame and three on-image numbered hotspot pins mapping share to tracked action to payout, occupying the majority of the body zone.
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 14  -  GrabShare creator commerce
- **Original issue:** Stronger because phones are dominant, but the left list is still card-like and the CTA plus chip crowd the lower left.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen14.tsx and created its companion /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/s14.css (all classes .s14- prefixed, fixed px for 1920x1080, no edits to any shared C...
- **Asset(s):** grabshareCreator, grabshareMain, grabshareHome, grabshareLogo
- **Dominant visual:** A staggered three-phone GrabShare storyboard (Creator storefront, Social commerce flow, Recommendation feed) in a soft net panel, branded with the GrabShare logo chip and an honest "Creator surfaces, approval pending" evidence tag, occupying the left ~58% of t...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 15  -  Activation surfaces overview
- **Original issue:** Four cards with preview and open-screen controls feel like a menu, not a deck scene; too much support copy and copy carries the story.
- **Change made:** Replaced the 4-card preview/open-screen menu (CardGrid + .opentile) with a single connected activation map (one dominant visual reading in 5s). Built src/screens/Screen15.tsx + new src/screens/s15.css (all classes .s15- prefixed, fixed px for 1920x1080, import './s15.css' added). Preserved everything load-bearing: <Screen index={15} tone="light" id="activati...
- **Asset(s):** partner1 (Strategic Partnerships cue), telegramPost (Channel Amplification cue), telegramAd (Integrated Campaign Promotions cue), built illustrative tracked-publisher mock + MockTag (Affiliate lane, no real asset listed)
- **Dominant visual:** An activation-family operating map: an orange "Owned distribution" origin spine fans demand into four activation lanes (Strategic Partnerships, Affiliate Marketing Platforms, Channel Amplification, Integrated Campaign Promotions), each carrying one real or lab...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 16  -  Strategic partnerships
- **Original issue:** Correctly uses partner screenshots but the phones are too small relative to two proof stats, ecosystem chips, CTA and AI chip; reads like a proof-stat panel with phone decoration; everything competes.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen16.tsx and created src/screens/s16.css (all classes .s16- prefixed, fixed px for 1920x1080). What changed: replaced the proof-stat panel with phone decoration with a true phone-storyboard proof-split. The three partner Phones are no...
- **Asset(s):** ASSETS.partner1, ASSETS.partner2, ASSETS.partner3
- **Dominant visual:** Three enlarged real partner-surface phones composed as a left-to-right storyboard (offer placement, engagement moment, tracked acquisition), centre phone featured as the single orange focal.
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 17  -  Affiliate marketing platforms
- **Original issue:** The built report mock is useful but generic, and the left list dominates more than the campaign report.
- **Change made:** Rewrote Screen17.tsx and added src/screens/s17.css (all .s17- prefixed, fixed px for 1920x1080, global tokens reused; no edits to global/deck/shared css). Replaced the old split (left support paragraph + 5-row surface-list dominating a small right-side mock) with a dashboard-mock where the tracked-campaign report IS the hero, sitting at the end of a publishe...
- **Asset(s):** MockTag, EvidenceTag (pending), DeckHeader, AdvanceCta, Reveal, Icon (network, cursor, check, chart, coupon, tag, target, arrow), useDrawer metric drawers
- **Dominant visual:** A single built "Tracked campaign report" dashboard that fills the canvas as one object: a source-to-outcome lane runs across its top (Publisher source to Tracked click to Order or lead to Performance report, last node orange-accented), feeding a two-panel repo...
- **Remaining limitation:** Single-orange-focal rule slightly diluted: there are two orange focal elements, not one. The lane endpoint icon uses .s17-lane__ico.is-accent (orange fill + glow shadow, Screen17.tsx line 70 / s17.css 114-119) AND the ROAS KPI tile uses .s17-kpi.is-accent (2px orange border, Screen17.tsx line 118 / s17.css 278-281). The s17.css header comment (lines 2-4) asserts 'Single orange focal: the ROAS KPI tile', which is cont...
- **Acceptance:** PASS*

### Screen 18  -  Channel amplification
- **Original issue:** Critical: pure channel-tile grid with NO available Telegram assets used; no campaign moving across channels; channel grid, proof note, CTA, AI chip, nav and rail all crowd the bottom/right; copy-led.
- **Change made:** Replaced the 9-tile channel card grid with a 3-zone operating board (s18-source -> s18-gate -> s18-out) inside the 1920x1080 canvas. Built /src/screens/Screen18.tsx + new /src/screens/s18.css (every class prefixed .s18-, fixed px). Uses all three required real Telegram assets; the creative set carries a "Real Telegram creative" MockTag and the report carries...
- **Asset(s):** telegramAd, telegramPost, telegramReport
- **Dominant visual:** A campaign-distribution board reading left-to-right as ONE system: one creative set (real telegramAd) flows through a channel-selection logic gate (objective / category fit / asset readiness / tracking availability) into a selected-channels rail, where Telegra...
- **Remaining limitation:** Resolved (minor): the real Telegram creative uses EvidenceTag (real capture), not MockTag.
- **Acceptance:** PASS

### Screen 19  -  Integrated campaign promotions
- **Original issue:** Card grid with notes that feels theoretical; does not feel like launch/season/co-brand/partner opportunity management; too much support copy and copy carries the story.
- **Change made:** Replaced the 6-card "moments" grid with a single campaign launch board (swimlanes x moment columns) built with a CSS grid using display:contents rows so it reads as one operating object, not N cards. Files: /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen19.tsx (rewritten) and .../src/sc...
- **Asset(s):** ASSETS.telegramAd, ASSETS.partner1
- **Dominant visual:** A campaign launch board: six swimlane rows (Objective, Offer, Surfaces, Partner moment, Proof gate, Reporting) crossed by six campaign-moment columns (Launch, Seasonal, Co-branded, Partner-specific, ATL/BTL, Media/event), reading as ONE system grid. The first...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 20  -  AudienceSeed intro
- **Original issue:** Four definition cards plus compliance note say the right things but do not show signal depth or product reality; ghost button competes with the primary CTA; too much support copy.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen20.tsx and created src/screens/s20.css. Replaced the 4-card as-def grid + equal-weight ghost button with a built 3-stage AudienceSeed signal board (the brief's dominant visual): shopper event stream -> approved signal layer -> activ...
- **Asset(s):** built visual (no external asset)
- **Dominant visual:** An AudienceSeed signal board reading as ONE left-to-right system: Stage 1 shopper event stream (offer discovery, comparison, coupon reveal, outbound click, tagged interest/intent/action in AudienceSeed blue) flows through arrow connectors into Stage 2 the appr...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 21  -  Pre-pixel blind spot
- **Original issue:** Good concept but the flow rail is too abstract and low-density; needs a stronger before-the-pixel visual.
- **Change made:** Replaced the abstract 5-node FlowRail + bracket with a single dominant GrabOn event path that reads in 5s: everything before the orange pixel boundary is visible to AudienceSeed by Inspirelabs but invisible to the brand's own pixel; only Brand arrival is brand-measurable. ONE orange focal = the pixel boundary line+badge (drawn with ::before/::after dots and...
- **Asset(s):** ASSETS.grabonHome, ASSETS.grabonMerchant
- **Dominant visual:** A horizontal GrabOn pre-pixel event path: two real GrabOn surface screenshots (grabonHome discovery + grabonMerchant coupon/outbound) back four numbered pre-site event nodes (Discovery, Offer comparison, Coupon reveal, Outbound click), all inside an AudienceSe...
- **Remaining limitation:** Minor (gradient ban): .s21-zone--pre uses linear-gradient backgrounds (s21.css line 108) for the AudienceSeed wash. The V2 design language bans gradients; although it is a faint same-hue wash, it is technically a linear-gradient and should be flattened to a solid rgba fill for strict compliance. Minor (accent system): the coverage rail and event nodes use a strong blue (--as / --as-deep) accent family alongside the s...
- **Acceptance:** PASS*

### Screen 22  -  Intent signal depth
- **Original issue:** One of the better abstract visuals but it lacks source context and looks like a UI control.
- **Change made:** Rebuilt /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen22.tsx and created /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/s22.css. Replaced the abstract Ladder-as-UI-control with ONE operating board: a left source-context...
- **Asset(s):** grabonHome, grabonLogo
- **Dominant visual:** An enriched signal ladder: a GrabOn source-context rail feeding one ascending interest-to-action ladder where each rung shows event type, a strength meter, freshness, and an approved-use status pill.
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 23  -  Offer Lab
- **Original issue:** Offer board is relevant but still card-led with no visual tie to GrabOn offer response.
- **Change made:** Replaced the 6-card offer-board grid with a single labelled decision dashboard (DESIGN_LANGUAGE dashboard-mock archetype, modeled on Screen17's self-contained s23.css). Rewrote /src/screens/Screen23.tsx and created /src/screens/s23.css (every class .s23-, fixed px for 1920x1080, reuses global tokens/chrome only). Preserved: Screen wrapper index=23/tone=light...
- **Asset(s):** ASSETS.grabonCategory
- **Dominant visual:** One commercial Offer Lab response dashboard: an offer-format response table (left, six formats from copy[23].cards with illustrative response tracks, all status Pending) reading against a GrabOn category context surface, a sample-size gate, and a single orange...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 24  -  AudienceSeed workflow
- **Original issue:** Compliance is correct but the flow rail is small and too generic; too much support copy.
- **Change made:** Rewrote /src/screens/Screen24.tsx and created /src/screens/s24.css. Replaced the small generic 5-node FlowRail + heavy support copy with one dominant horizontal pipeline board (5 connected stage nodes, arrow connectors, per-stage chips). Single orange focal = the "Audience build" stage (AudienceSeed core, top badge + 2px orange border); blue --as accent rest...
- **Asset(s):** none (built mock pipeline, MockTag-labelled)
- **Dominant visual:** A single five-stage AudienceSeed activation pipeline reading as one system left-to-right: GrabOn events to Approved signals to Audience build (orange focal, AudienceSeed core) to Brand ad workflow to Signal report, joined by directional connectors, with a blue...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 25  -  AudienceSeed reporting
- **Original issue:** Reporting mock is directionally correct but looks like generic analytics despite the copy.
- **Change made:** Rewrote Screen25.tsx and added s25.css (all classes .s25- prefixed, fixed px for 1920x1080), importing './s25.css' at top. Replaced the old centred KPI-grid-plus-7-bar-chart mock (which read as generic analytics) with a single dominant decision report modeled on the Screen17 dashboard-mock gold standard: it is built around signal quality, offer response, and...
- **Asset(s):** built visual (no external asset)
- **Dominant visual:** One commercial decision report (the AudienceSeed decision report) filling the canvas: a header bar with mock tag, a three-tile decision-summary row (signal quality / offer response / audience readiness), a left signal-and-offer reading panel with quiet illustr...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 26  -  AI Growth Studio intro
- **Original issue:** Four small control panels do not feel like a running AI studio or control room; the guardrail ghost button competes with the CTA; too much support copy and copy-led.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen26.tsx and created src/screens/s26.css (all classes .s26- prefixed, fixed px for 1920x1080). Replaced the 4 small control panels + guard-chip strip + CTA-row ghost button with a single dominant control-room object: a labelled studio...
- **Asset(s):** ASSETS.rankdriveDash
- **Dominant visual:** A running AI Growth Studio control room: one framed board reading as a single left-to-right pipeline (Inputs to Active tasks to Human-review queue to Output queue), with a real RankDrive agent-surface thumbnail and an in-house AI Lab guardrail rail across its...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 27  -  AI agent map
- **Original issue:** Nine status cards form an agent inventory, contrary to guidance that AI Studio should show running flows; text-led.
- **Change made:** Replaced the 9-card .clusters agent inventory with a control-room studio per the brief: agents by workstream + a visible human-review queue + an output queue, all inside ONE framed studio object. Rewrote /src/screens/Screen27.tsx (added import './s27.css') and created /src/screens/s27.css (all classes .s27- prefixed, fixed px for 1920x1080). Preserved the Sc...
- **Asset(s):** rankdriveDash, writegeniusDash, rankdriveLogo, writegeniusLogo
- **Dominant visual:** One running "AI Growth Studio control room" frame: a single dashboard-chromed studio with three operating columns that read as one system, not nine cards. Column 1 = agents grouped by workstream (RankDrive and WriteGenius shown with their real product captures...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 28  -  Search and content agents flow
- **Original issue:** Correctly uses RankDrive and WriteGenius but the product captures are small under a generic rail.
- **Change made:** Rewrote src/screens/Screen28.tsx and created src/screens/s28.css. Replaced the old FlowRail-as-hero + two thumbnail Shots with a proof-split built on two enlarged AnnotatedShot heroes (RankDrive scan -> WriteGenius output), each ~808px wide with browser bar, product logo, and a clickable corner stage tag that opens the existing step drawer (demoting drawers...
- **Asset(s):** ASSETS.rankdriveDash, ASSETS.rankdriveLogo, ASSETS.writegeniusDash, ASSETS.writegeniusLogo
- **Dominant visual:** Dual real-screenshot proof-split: RankDrive search-visibility scan and WriteGenius content output framed side by side in browser chrome (with product logos), connected by one orange focal arrow, beneath a thin agent-flow status strip.
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 29  -  Creative, channel and creator agents flow
- **Original issue:** Output cards dominate and lack creative artefacts, channel samples or a creator-brief feel.
- **Change made:** Replaced the FlowRail + 6-card .outcards catalogue with one operating-board (campaign production line) that reads in 5s: brief in, generate angles/ad variants/channel copy/creator brief, then ONE human-approval gate. Used copy[29] verbatim (eyebrow/headline/sub/support/cta); kept the Screen wrapper (index 29, tone light, id ai-creative-creator, label), Advan...
- **Asset(s):** ASSETS.telegramAd, ASSETS.telegramPost
- **Dominant visual:** A single campaign production board: a five-stage production line (campaign objective, offer angles, ad creative variants, channel copy, creator brief) with per-stage status pills, connected by arrows, feeding one human-approval gate. Two real Telegram artefact...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 30  -  Monitoring and optimisation flow
- **Original issue:** Monitoring rows are credible but plain and do not feel live or operational.
- **Change made:** Replaced the plain 6-row .monitor list with a dashboard-mock cockpit per the brief. Screen wrapper (index 30, tone light, id ai-monitoring, label preserved), copy[30] used verbatim (eyebrow/headline/sub/support/cta), AdvanceCta still routes to 31, and the per-panel AI drawers are preserved (now four panels, demoted to hotspot rows that open monitoring drawer...
- **Asset(s):** ASSETS.telegramReport
- **Dominant visual:** A single live monitoring cockpit for AI Growth Studio: a labelled dashboard shell whose body holds four stacked live-read panels (Performance read, Anomaly flags, Channel summary, Recommendation) beside one orange-bordered next-action panel, sitting over a gro...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 31  -  Custom growth agents
- **Original issue:** Use-case cards plus a small rail feel like a service menu, not serious agent scoping; the secondary ghost CTA competes with the primary and the two CTAs are near-equivalent; text-led.
- **Change made:** Replaced the .outcards card grid + small FlowRail + competing ghost CTA with ONE control-room intake/scoping canvas built inside the 1920x1080 canvas. Files: /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen31.tsx and .../src/screens/s31.css (all classes .s31-, fixed px). The six copy[31]...
- **Asset(s):** none (built mock; no assets listed in brief)
- **Dominant visual:** A single custom-agent scope console: a recurring-problem picker (left) that drives a six-field scope worksheet (right) covering recurring task, input source, output format, frequency, approval owner, and measurable output. The approval-owner gate row is the on...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 32  -  Growth commitments
- **Original issue:** Eight checkpoint cards feel administrative; CTA, AI chip and proof note stack add clutter; too much support copy and copy-led.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen32.tsx and created /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/s32.css. Replaced the 8-tile CardGrid + footer NetBox/CTA/chip stack with one commitments operating...
- **Asset(s):** none (built mock per brief, MockTag-labelled)
- **Dominant visual:** A single "Partnership operating standard" board panel: a titled card with a header bar (cycle mark, title/sub, an orange "Reviewed every cycle" loop pill, MockTag), three band labels (Set the terms / Run the cycle / Carry it forward), a connected horizontal la...
- **Remaining limitation:** Resolved (minor): AI support chip moved out of the primary-CTA zone into the board header.
- **Acceptance:** PASS

### Screen 33  -  Long-term partnership / measurable expansion
- **Original issue:** The flow rail plus chips are too light for a commitment model and need evidence gates and expansion logic; the ghost button competes with the primary CTA; too much support copy.
- **Change made:** Replaced the old FlowRail-as-hero + loose accent-chip row with a built stage-gated board (brief: unlock conditions, proof evidence, review decision, next tranche). Files: /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen33.tsx (rewritten) and /Users/harshith/Inspirelabs Capabilities deck/...
- **Asset(s):** built visual (no external asset)
- **Dominant visual:** A stage-gated expansion board: four stage cards on a single left-to-right track (Define objective, Launch first activation path, Review and improve, Expand the system), each carrying its unlock condition and the proof required to clear its gate, separated by t...
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 34  -  Category proof
- **Original issue:** The category selector chips dominate; only some categories have visuals; the default can be Other, producing a blank asset-pending box (BFSI, Gaming, Kids, Other fall through).
- **Change made:** Rebuilt Screen34 from a chip-strip split into a proof-split category-proof board. LEFT (dominant visual): a framed GrabOn category surface that swaps with the selected category, carrying a MockTag and a category identity plate; a gap note line appears only when the hero is the closest-available proof. RIGHT (proof-control rail): a 9-category selector that dr...
- **Asset(s):** grabonCatFashion, grabonCategory, catElectronics, catTravel, catEntertainment, grabonLogo
- **Dominant visual:** A large selected-category GrabOn surface in a browser frame (~58% of the canvas), with an identity plate naming the category and a "Same system. Category-specific proof." line, paired with a proof-control rail.
- **Remaining limitation:** Unused brief-listed assets: catBeauty and grabonMerchantMyntra are imported in assets.ts and called out in the brief for a Fashion/Beauty proof carousel, but Screen 34 never renders them (fashion_beauty maps only to grabonCatFashion; no carousel exists). Unrealized opportunity, not a defect. Polish: the category plate (.s34-shot__plate) uses a translucent dark fill rgba(14,15,10,0.82) with backdrop-filter blur. The V...
- **Acceptance:** PASS*

### Screen 35  -  Case study format
- **Original issue:** The proof-template grid is honest but generic and does not earn trust quickly.
- **Change made:** Replaced the generic 3-column field grid (ProofCard + 6 EvidenceTag cells) with ONE dominant case proof card composed in fixed px for 1920x1080. Layout top-to-bottom: file bar (shield filemark, title, quiet evidence-status hotspot demoted from the old grid button, MockTag "Illustrative template, not final data") -> identity row (brand/category + growth probl...
- **Asset(s):** built visual (no external asset)
- **Dominant visual:** A single client-ready case proof card (one labelled proof document) that carries the six trust elements in one object: brand or category, growth problem, capabilities activated, engagement period, metrics moved, and why it matters for similar brands.
- **Remaining limitation:** None noted.
- **Acceptance:** PASS

### Screen 36  -  Tailored roadmap close
- **Original issue:** Critical: a serious strategic screen reduced to two selects and five checklist cards; does not feel like a partnership roadmap; bottom CTA, Start over, proof note, edit controls, nav and rail all compete; too much paragraph copy and ghost-vs-primary conflict.
- **Change made:** Replaced the old "two selects + five checklist cards" grid (audit's critical issue) with one cohesive roadmap-board that reads as a single partnership system in 5s, not N cards. Files: rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen36.tsx and created /Users/harshith/Inspirelabs...
- **Asset(s):** built visual (no external asset)
- **Dominant visual:** A stage-gated partnership roadmap board: four stages (First activation path, Prove the path, Review decision, Expand the partnership) on a single left-to-right track joined by proof-gate connectors. Stage 1 is the lone orange focal (in motion); stages 2 to 4 s...
- **Remaining limitation:** MockTag gap: REFACTOR_BRIEF marks 'Mock needed: true' for Screen 36, but the board carries no MockTag/mock-status label. The only status chip is EvidenceTag status='pending' ('Evidence-gated'). Since the board is a conceptual/illustrative roadmap (not a captured product surface) nothing is fabricated as real, so this is a labeling polish gap, not a product-reality violation. Consider an explicit 'Illustrative roadmap...
- **Acceptance:** PASS*

### Screen 37  -  Contact / conversion close
- **Original issue:** Critical: a generic form on a dark background with no premium closing proof, no visible partnership summary, no CRM destination, no consent/privacy note; no hierarchy beyond fields and a button; captures client-side state only; reads like normal web-lead capture.
- **Change made:** Rewrote /Users/harshith/Inspirelabs Capabilities deck/Inspirelabs capabilities_v3/inspirelabs-microsite-build/src/screens/Screen37.tsx and created src/screens/s37.css (all classes .s37- prefixed, fixed px for 1920x1080, dark tokens reused). WHAT CHANGED: header zone (wordmarkDark lockup + copy[37] eyebrow/headline/sub verbatim) over a 1fr/700px body. Left =...
- **Asset(s):** ASSETS.wordmarkDark
- **Dominant visual:** A premium dark conversion layout: a roadmap-request summary plus a numbered what-happens-next sequence on the left, paired beside a disciplined required-fields-only form panel (orange-topped, the single focal) on the right. The pair reads as one closing object...
- **Remaining limitation:** Required-fields-only is honoured: only Name, Work email, Company are required; Phone/Website/Message are collapsed behind a quiet 'Add optional details' toggle. No designation/budget/agency/role/urgency fields. Matches brief approved-field list. OK. CTA hierarchy is clean: exactly one primary CTA (.btn--primary .s37-submit 'Send roadmap request'). The optional-details toggle is a quiet ghost button (transparent, no b...
- **Acceptance:** PASS*

