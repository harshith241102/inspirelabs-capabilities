# Asset Gaps

Missing or unvalidated inputs. Nothing here blocks the build: every gap is handled with a real approved capture, a clearly labelled mock, or an evidence-status placeholder. Replace with approved assets before final client-facing use. Maps to `06_ASSET_REQUIREMENTS.md` "Final Design Inputs Still Needed".

## Legend
- **Needed** — must be created or sourced.
- **Validate** — exists (in repo / V2) but needs source, date, or permission confirmation before client-facing use.
- **Approved** — already approved for use.

## Identity
| Asset | Screens | Status | Note |
|---|---|---|---|
| Inspirelabs lockup | Cover, close | Validate | Using `logos/il-lockup.png` (white-on-transparent for dark). Confirm it is the official current lockup. |
| AudienceSeed wordmark / parent-brand treatment | 20-25 | Needed | Treatment unconfirmed (by GrabOn / by Inspirelabs / standalone). Screens use "AudienceSeed" only until approved. |
| AI Growth Studio visual identity | 26-31 | Needed | No approved logo. Shown via process visuals + neutral identity. |
| GrabOn / GrabCash / GrabShare / RankDrive / WriteGenius / Alternatives.co marks | various | Validate | Product logos present in `logos/platforms/`; confirm approved for client-facing reuse. |

## Product screenshots
| Asset | Screens | Status | Note |
|---|---|---|---|
| GrabOn home / merchant / category captures | 2, 3, 8, 34 | Validate | Real captures from the V2 set; confirm crop approval and capture date. |
| GrabOn promotional placements (sidekick banner, cross-promotion, coupon ID, video, featured, deal module, category takeover, high-visibility) | 9 | Needed | Shown as labelled inventory cards with availability tags; no per-placement screenshots captured. |
| Alternatives.co screenshots | 10 | Needed | Built comparison-shortlist mock used instead (labelled illustrative). |
| GrabCash / GrabShare captures | 12, 13, 14 | Validate | Real captures used; confirm permission for any visible creator/profile content. |
| Partner ecosystem surfaces | 16 | Validate | Three real partner-surface captures used, tagged "validation pending". Logo/permission provenance required. |
| Affiliate platform examples | 17 | Needed | Built tracked-campaign report mock used (fields pending). |
| RankDrive / WriteGenius product UI | 5, 27, 28 | Validate | Real dashboard captures used; confirm approval. |
| Category visuals for BFSI/Fintech, Commerce/Marketplace, Gaming/Rummy, Kids/Family, Other | 34 | Needed | Only Fashion, Electronics, Travel, Entertainment (+ generic Commerce) have GrabOn category captures; others show a labelled "asset pending" panel. |

## Proof / metrics
| Item | Screens | Status | Note |
|---|---|---|---|
| `145+ strategic partnerships` | 16 | Approved | Source-approved; tagged "Approved proof". Confirm exact figure/date for final. |
| `200M+ potential reachable audience` | 16 | Validate | Used only as potential reach, tagged "Potential reach, not guaranteed". Confirm source + caveat wording. |
| V2 scale metrics (76M+ users, 25M+ sessions, 96M+ transactions, $4.8B GMV, 3,800+ brands) | n/a | Needed (not used) | Intentionally NOT shown. "Validate before final use" per source; not validated for V3. |
| Brand / partner logo wall | 16, 34 | Needed | ~143 brand logos exist in `logos/brands/` but provenance/approval for V3 client-facing use is not established. Not shown; neutral ecosystem labels used instead. |
| Case-study metrics (problem, capabilities, period, metrics moved) | 34, 35 | Needed | Case template shown with evidence-status placeholders; no numbers invented. |
| Per-surface / per-channel / per-offer metrics | 8, 9, 13, 14, 17, 18, 23, 25 | Needed | Shown as metric fields with "pending validation" tags. Supply source + date to populate. |

## Integration / lead capture
| Item | Status | Note |
|---|---|---|
| Analytics platform | Needed | Events emitted as `window` `CustomEvent`s; destination unconfirmed. |
| CRM / lead-routing destination + contact owner | Needed | Contact form captures fields client-side only; wire backend in `Screen37.tsx`. |
| Roadmap-request destination | Needed | Confirm where the roadmap request is sent. |
| Optional QR / calendar on close | Needed | Not included pending approval; contact form is the approved fallback. |
| Consent / privacy copy | Needed | Confirm whether a consent note is required at the contact step. |
| Meta / Google usage approval (AudienceSeed) | Needed | Labelled as existing brand workflows subject to platform policy, consent, integration approval. Legal/privacy review pending. |
