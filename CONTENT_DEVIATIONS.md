# Content Deviations

Scope: changes to the approved copy in `04_SCREEN_COPY.md`. Every approved **headline, subheadline, support copy, card label, and CTA label** is transcribed verbatim into `src/content/copy.ts` and rendered unchanged, with one category of exception below (four "support" lines that read as design guidance were reframed for on-screen display). British English and smart-quote apostrophes preserved; no em dashes.

## Approved headline / subheadline / card / CTA copy
**No approved-copy deviations.** All 38 screens render the approved headline, subheadline, card labels, and CTA labels verbatim. Screen 2 uses the setup-driven opening variants from `02_INTERACTION_AND_CTA_MODEL.md`; Screen 36 uses the approved personalised headline pattern and the approved fallback.

## Support-copy display reframes (4)
These four `Support copy` lines in `04_SCREEN_COPY.md` are written as guidance to the builder about *how to present the screen*, not as copy to print. The build **follows** the guidance and shows a short user-facing takeaway in the on-screen net box instead of printing the instruction. The original strings are retained verbatim in `copy.ts` (`support`); only the displayed net box differs.

| Screen | Original (04_SCREEN_COPY.md "Support copy") | Changed (displayed) | Reason | Risk |
|---|---|---|---|---|
| 9 | "Promotional surfaces should be shown as real inventory, not hidden inside a generic GrabOn screen." | "These are real promotional surfaces, shown as inventory a brand can actually use." | Original is builder guidance, not display copy; the screen already shows real placement inventory. Reframed to a user-facing takeaway with identical meaning. | Low |
| 15 | "These surfaces are shown separately so the reader sees the breadth without losing clarity." | "Each surface family is shown on its own, so the breadth stays clear." | Builder guidance about layout; reframed to a user-facing line, meaning preserved. | Low |
| 25 | "Reporting should focus on commercial decision support, not generic dashboards." | "AudienceSeed reporting is built for commercial decisions, not generic dashboards." | Builder guidance; reframed to a user-facing line that also reinforces the approved AudienceSeed positioning. | Low |
| 35 | "Missing evidence should stay visible until approved." | "Missing evidence stays visible until it is approved." | Builder guidance; converted from imperative instruction to a user-facing principle, meaning identical. | Negligible |

No strategic wording, positioning, AudienceSeed framing, AI Growth Studio framing, or CTA logic was changed.

## Additive scaffolding microcopy (not changes to approved copy)
The build adds short interface microcopy that is not present in `04_SCREEN_COPY.md` because the document specifies headlines/subs/support/cards/CTAs, not every interface label. None of it alters approved copy or strategy. Categories:

- **Section eyebrows** (e.g. "Capability 1 · Capture commerce intent", "Activation surfaces") drawn from the section/capability names in `01_SCREEN_ARCHITECTURE.md`.
- **Scene captions / mini-labels** that label visuals (e.g. "The customer decision journey, before the brand sees a clean visit"; "Promotional surface inventory · real placements, shown separately"; "Better inputs into the retargeting stack you already use").
- **Drawer body text** following the `02` drawer structure (what this is / enables / proof required / not to assume), including the AI drawers' required-input and human-review lines.
- **Cover/setup affordances** (e.g. "3 quick questions · 5 minute read"; the setup preview line; "The journey ahead is the same for every reader. Only the opening and roadmap adapt to your setup.").
- **Flow/gate labels** (e.g. running-state pills, gate chips "Objective agreed / Tracking live / First signal observed / Expansion path approved", "Your pixel starts here").
- **Closing affordances** ("Start over", contact "Thank you. Your roadmap request is in.", chip summaries of setup choices).
- **Evidence/availability labels** ("Approved proof", "Potential reach, not guaranteed", "Pending validation", "Proof pending", "Illustrative mockup, not final data", "Availability to confirm").

Risk: low. This microcopy stays within the approved terminology, uses British English, contains no banned terms or em dashes, and surfaces no internal/technical language.

## Note (source-document, not a build change)
`04_SCREEN_COPY.md`'s Screen 2 "Variants" block gives slightly different wording for the three opening variants than `02_INTERACTION_AND_CTA_MODEL.md` (the "Opening Tailoring Logic" JSON). Per the `08_BUILD_EXECUTION_LOCK.md` source hierarchy, the build follows `02` verbatim. This is a source-doc inconsistency to reconcile, not a deviation introduced by the build.
