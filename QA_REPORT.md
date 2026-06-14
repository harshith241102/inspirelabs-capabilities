# QA Report

Mapped against `05_QA_CHECKLIST.md`. Verification used: full TypeScript type-check, production build, deterministic banned-term/em-dash/metric grep across `src/`, all 38 desktop + key mobile screenshots, and a parallel **10-agent QA workflow** (one specialist per checklist dimension) followed by a synthesis pass. Every "major" finding was re-verified against source and screenshots.

## Overall verdict: PASS

All hard content/accuracy gates pass. The audit surfaced **zero blockers**. The findings were visual-polish and accessibility items, all fixed in this build (see "Fixes applied"). Remaining open items are asset/proof provenance and backend wiring, which are correctly labelled as pending, not invented.

## Method
- 10 specialist audits (copy fidelity, AudienceSeed accuracy, AI overclaim, invented metrics, interaction/CTA model, accessibility, and four visual-first screenshot reviews across screens 0-9 / 10-19 / 20-29 / 30-37), each returning structured findings; verdicts were 4 `pass` + 6 `pass_with_notes`, **0 `fail`**.

## Source and Strategy QA
- [x] Handoff document treated as source of truth; V2 used only as contextual reference; V2 structure not reused.
- [x] Capability architecture unchanged; AudienceSeed and AI Growth Studio names unchanged.
- [x] External references informed interaction/layout only, not strategy.

## CEO Feedback / Visual-First QA
- [x] One dominant visual carries each screen; headline names the takeaway; support is short.
- [x] Detail moved to drawers/hotspots; no screen depends on a paragraph.
- [x] Screen rhythm varies across sections (lanes, split surfaces, galleries, ladder, flow rails, control room, canvas, proof cards, roadmap board). No generic card grid runs three screens in a row.
- [x] Product screenshots read as surfaces; mobile preserves one visual argument per screen.

## Generic / Internal-Technical Language QA
- [x] Deterministic grep: 0 hits for connected acquisition system, route mix, workflow bench, signal layer, activation routes, tracked action layer, measurement layer, optimisation loop, technical architecture, internal operating system, promotional inventory users.
- [x] Allowed plain terms only where needed (pixel, retargeting, Meta, Google, tracking, audience).

## No Invented Metrics QA
- [x] No invented case-study numbers, uplift, client logos, partner claims, screenshots, or product capabilities.
- [x] `145+ strategic partnerships` shown only with an "Approved proof" tag (Screen 16).
- [x] `200M+` shown only as "Potential reach, not guaranteed" (Screen 16).
- [x] V2 scale metrics (76M+, 25M+, 96M+, $4.8B, 3,800+) deliberately not used (validate-before-use; not validated for V3).
- [x] All other metrics are fields/placeholders with evidence-status tags; brand/partner logo wall omitted (provenance not established).

## AI Overclaim QA
- [x] AI Growth Studio shown as human-reviewed execution support; not fully automated; does not replace teams; no guaranteed ROI.
- [x] Outputs shown as review-ready, not launch-approved; custom agents framed as scoped.
- [x] Every AI drawer states a required brand input and a human-review checkpoint; human review visible on every flow (26-31).

## AudienceSeed Accuracy QA
- [x] Positioned as shopper intent signals / retargeting input / offer intelligence / audience quality.
- [x] Explicitly NOT a generic analytics dashboard, SEO, content, ad-management, influencer, or broad-reporting tool (Screen 20 "is not" drawer + reporting note).
- [x] Brand keeps its own ad account, budget, and creative (Screen 24).
- [x] Meta/Google labelled as existing brand workflows subject to platform policy, consent, integration approval.
- [x] No raw PII transfer, unauthorised tracking, or automatic media activation; compliance guardrail visible (Screens 20, 24).
- [x] Reporting focuses on signal quality, offer response, audience readiness; labelled illustrative; no invented numbers.

## AI Growth Studio Clarity QA
- [x] Own section; agent map (27) is not the only explanation.
- [x] Running flows for search/content (28), creative/channel/creator (29), monitoring (30); custom agents scoped (31).
- [x] RankDrive and WriteGenius appear only where relevant; human-reviewed execution visible.

## Long-Term Partnership Framing QA
- [x] Close points to a dedicated growth partnership; roadmap uses selected category + priority and includes capability mix, surfaces, commitments, proof needs, discussion areas.
- [x] Measurable Growth Commitments positioned as an operating standard; first activation path framed as the start; no short-term/trial CTA language.

## First and Last Screen QA
- [x] Screen 0 repositions GrabOn into Inspirelabs, shows the broader system visually, avoids a generic hero, one clear CTA into setup.
- [x] Screen 37 closes on the partnership roadmap, captures only the approved fields, uses setup context, no short-term language.

## Setup Logic QA
- [x] Exactly three questions (familiarity, category, growth priority).
- [x] Setup tailors only Screen 2 opening, Screen 34 category highlight, Screen 36 roadmap, and internal lead context. Middle journey fixed.
- [x] No role selector, no multiple reader-type links, no hidden persona branching.
- Note: Screen 33's optional drawer was made non-personalised (removed its read of setup) so that **no** middle-journey screen reads setup, strictly satisfying this gate.

## CTA QA
- [x] Final CTAs use partnership-roadmap language; none of the banned final CTAs appear (grep: 0 hits).
- [x] Contextual AI support chips open drawers, stay secondary on non-AI screens, never imply separate journeys.
- [x] "Jump to roadmap" appears only after Screen 6 and is visually quiet; no CTA asks the reader to choose a role.

## No Em Dash QA
- [x] Deterministic grep: 0 em dashes and 0 en dashes in user-facing copy (two em dashes that were in code comments were also removed).

## Accessibility (03 + a11y audit)
- [x] Keyboard navigable CTAs with visible focus states; deck keyboard nav suppressed while typing / when a drawer is open.
- [x] Drawer traps focus, closes on Escape, restores focus to the opener, and now makes the background deck `inert` (hidden from assistive tech).
- [x] `<main id="deck-main">` landmark + skip link added; each screen is a labelled `<section>`.
- [x] Setup options now use a proper radio-group pattern (roving `tabindex` + arrow keys).
- [x] `prefers-reduced-motion` disables reveals and transitions; images lazy-loaded with alt text; cover LCP image marked eager/high priority.
- [x] Contrast: `--c4` (#9ca1ae, 2.59:1) removed from all readable text and replaced with `--muted-text` (#6b717e, ~4.7:1); `--orange-text` darkened to #bd521f (~4.7:1). `--c4` now decoration-only.

## Claude Code Build Handoff QA
- [x] All build outputs present: `README.md`, `IMPLEMENTATION_NOTES.md`, `QA_REPORT.md`, `ASSET_GAPS.md`, `CONTENT_DEVIATIONS.md`, `PLACEHOLDER_MAP.md`.
- [x] Screen 37 fields consistent across files (Name, Work email, Company, Phone optional, Website optional, Message optional); no designation requested.
- [x] Contextual AI support chips secondary on non-AI screens; missing assets use labelled placeholders; missing metrics use evidence-status labels; V2 used as reference only.

## Fixes applied from the audit
| # | Severity | Issue | Fix |
|---|---|---|---|
| 1 | major | Screen 30 title/description ran together | `.monitor__main` set to flex-column; title/sub `display:block` |
| 2 | major | Screen 12 GrabShare card was a near-empty crop | Swapped to the content-rich GrabShare storefront capture |
| 3 | major | Mobile cover orbit clipped/overlapped text | Orbit hidden on mobile; bottom 5-module strip carries it |
| 4 | major | `--c4` text failed WCAG AA | Text uses moved to `--muted-text`; `--orange-text` darkened; `--c4` decoration-only |
| 5 | major | No `<main>` landmark / skip link | Added `<main id="deck-main">` + skip link |
| 6 | major | Drawer did not hide background from AT | Background deck set `inert` while a drawer is open |
| 7 | minor | "Brand arrival"/"Brand visit"/"Brand retargeting" showed a "Running" chip | Added a neutral `endpoint` FlowRail state (orange highlight, no chip); applied on Screens 4, 21, 24 |
| 8 | minor | Screen 28 did not render its support line | Added the support line as a net box |
| 9 | minor | Screen 23 offer cards visually identical | Added per-format icons + one accented "Example" card |
| 10 | minor | Screen 33 read setup in a drawer | Made the drawer content fixed/non-personalised |
| 11 | minor | Mobile contact nav overlapped last field | Added bottom padding/safe-area on mobile contact |
| 12 | minor | Screen 14 GrabShare phones under-scaled | Scaled the phone pair up |
| 13 | minor | Setup radiogroup lacked arrow-key roving focus | Implemented roving `tabindex` + arrow-key selection |
| 14 | minor | Screen 9 repeated tiny availability labels | Moved availability into the drawer; neutral "View placement" on card |
| 15 | nit | Cover LCP image lazy | `loading="eager" fetchPriority="high"` on the cover lockup |
| 16 | nit | Screen 25 illustrative bars could read as data | Added "illustrative, not measured volume" caption (bars already `aria-hidden`) |
| 17 | nit | Screen 36 orange overload on a control screen | Softened panel heads + select borders to neutral; kept one accent panel + CTA as the focal |
| 18 | nit | LeadContext missing `timestamp` | Added `timestamp` to the lead payload |
| 19 | nit | Support lines that were design guidance leaked as display copy (Screens 9, 15, 25, 35) | Reframed to user-facing takeaways (logged in `CONTENT_DEVIATIONS.md`) |

## Open / pending (not defects; do not block)
- Asset and proof provenance per `ASSET_GAPS.md` and `PLACEHOLDER_MAP.md` (all labelled pending).
- Analytics + CRM/lead-routing backend wiring; optional QR/calendar on the close; consent copy.
- AudienceSeed parent-brand treatment and Meta/Google usage approval (legal/privacy review).
- Source-doc note (not a build defect): `04_SCREEN_COPY.md` Screen 2 variant wording diverges slightly from `02_INTERACTION_AND_CTA_MODEL.md`; the build follows the interaction model as instructed. Recommend reconciling the two docs to one canonical string.
- Mobile screenshot coverage: 0,1,8,12,16,21,22,26,30,36,37 captured; capture the remaining AudienceSeed/AI screens at ~380px before final sign-off (source layouts reflow but unverified visually).
