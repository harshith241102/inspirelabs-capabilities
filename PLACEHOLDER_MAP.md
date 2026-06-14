# Placeholder Map

Every built mock visual and labelled placeholder in the build, with its screen, type, the replacement asset needed, any V2 source reference, and status. All mocks render a visible label (`MockTag` / evidence tag) and contain no invented numbers.

| Screen | Placeholder / mock | Type | On-screen label | Replacement asset needed | V2 source ref | Status |
|---|---|---|---|---|---|---|
| 5 | Operating advantage proof thumbnails | Evidence-status tiles | "View proof status" + pending tags | Source-backed proof per advantage | V2 p.1 collage | Pending validation |
| 9 | Promotional surface inventory (8 placements) | Labelled cards + availability tags | "Available" / "Availability to confirm" | Per-placement screenshots + availability confirmation | V2 p.17 | Needed |
| 10 | Alternatives.co comparison shortlist | Built mock (cmp table) | "Illustrative mockup, not final data" | Approved Alternatives.co comparison screenshot | new | Needed |
| 16 | Partner ecosystem surfaces | Real captures, flagged | "Partner surfaces · validation pending" | Logo/permission provenance + reach source | V2 p.21 | Validate |
| 16 | `200M+` reachable audience | Approved-with-caveat stat | "Potential reach, not guaranteed" | Source + caveat confirmation | V2 p.21 | Validate |
| 17 | Tracked campaign report | Built mock (rpt) | "Tracked campaign report · fields pending validation" | Approved affiliate report + CPA/CPS/ROAS values | new | Needed |
| 25 | AudienceSeed signal & offer report | Built mock (rpt) | "Illustrative mockup, not final data" + per-field "Pending validation" | Approved AudienceSeed report visual + validated fields | V2 p.18 (re-worded) | Needed |
| 28 | Search/content flow + RankDrive/WriteGenius panels | Real captures, flagged | "Scan · RankDrive" / "Output · WriteGenius" | Approved AI Growth Studio interface | V2 p.22 (renamed) | Validate |
| 26-31 | AI agent running states (active/queued/complete/review) | Built status UI | status pills | Approved AI Growth Studio interface | V2 p.22 (renamed) | Needed |
| 32 | Measurable commitment canvas (8 checkpoints) | Built canvas | drawer "no invented dates or budgets" | Confirmed cadence examples (no dates) | new | Pending validation |
| 34 | Category proof surfaces | Real captures (subset) + "asset pending" panel | "Category surface · case proof pending" / "asset pending" | Category visuals for remaining categories + approved case proof | V2 p.24/27 | Needed |
| 35 | Case-study template (6 fields) | Built template | evidence tags: pending / proof pending | Approved case studies (brand, problem, capabilities, period, metrics, relevance) | V2 p.27 | Needed |
| 36 | Tailored roadmap board | Built, setup-driven | "Proof needed: pending" entries | Confirmed proof inputs per category | new | Pending validation |
| 37 | Contact form / lead payload | Built form | n/a | CRM/analytics destination + optional QR/calendar | new | Needed (backend) |

## Notes
- Real approved product captures (GrabOn, GrabCash, GrabShare, RankDrive, WriteGenius, partner surfaces, Telegram) are used as-is where the architecture calls for a real surface; they are listed in `ASSET_GAPS.md` for capture-date/permission confirmation rather than here.
- No placeholder uses an invented number. Where a mock needs values for visual balance, neutral fields ("Pending validation", "Proof pending") are used.
- The brand/partner logo wall is intentionally omitted (provenance not established); see `ASSET_GAPS.md`.
