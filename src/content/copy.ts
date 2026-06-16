import type { AiContext } from './aiDrawers';

/* All user-facing copy, transcribed verbatim from 04_SCREEN_COPY.md.
   This is the single source of copy truth. Any layout-driven deviation is
   logged in CONTENT_DEVIATIONS.md. British English, no em dashes, no invented numbers. */

export interface ScreenCopy {
  eyebrow: string;
  headline?: string;
  subheadline?: string;
  support?: string;
  cards?: string[];
  cta: string;
  aiChip?: AiContext;
  drawer?: string;
  fallback?: string;
}

export const copy: Record<number, ScreenCopy> = {
  0: {
    eyebrow: 'Inspirelabs',
    headline: 'The Growth System Behind GrabOn, Built for Brands',
    subheadline:
      'Inspirelabs brings together surfaces where shoppers are ready to buy, distribution, AudienceSeed shopper behaviour, AI Growth Studio, and measurable growth commitments to help brands build long-term growth partnerships.',
    support:
      'A visual guide to how brands can reach shoppers before, during, and after the decision moment.',
    cards: ['GrabOn', 'Distribution', 'AudienceSeed', 'AI Growth Studio', 'Growth commitments'],
    cta: 'Start with your brand context',
  },
  1: {
    eyebrow: 'Setup',
    headline: 'Help us tailor this to your brand.',
    subheadline:
      'Answer a few quick questions so we can make the intro and the proof-by-category slides more relevant to your context.',
    support: 'The core experience stays fixed.',
    cta: 'Continue',
    drawer: 'Your answers tailor only the intro and the proof-by-category slides. They do not create a separate journey, and the rest of the walkthrough is the same for every reader.',
  },
  2: {
    eyebrow: 'The bigger picture',
    // headline + subheadline come from openingTailoring (setup-driven)
    support:
      'GrabOn remains the flagship surface where shoppers are ready to buy. Inspirelabs expands that foundation into a broader growth partnership.',
    cards: ['Active-shopping', 'Distribution', 'Shopper behaviour', 'AI Growth Studio', 'Measurable commitments'],
    cta: 'See the system',
    fallback: 'Inspirelabs is the growth system behind GrabOn.',
  },
  3: {
    eyebrow: 'From GrabOn to Inspirelabs',
    headline: 'GrabOn is the proof point. Inspirelabs is the system brands can activate around it.',
    subheadline:
      'The flagship surface where shoppers are ready to buy now connects into distribution, shopper behaviour, AI Growth Studio, and measurable growth commitments.',
    support: 'The role of GrabOn gets stronger inside the broader Inspirelabs system.',
    cards: ['Active-shopping', 'Distribution', 'AudienceSeed', 'AI Growth Studio', 'Growth commitments'],
    cta: 'Continue',
    drawer: 'This module explains one part of the growth system and the proof required to use it credibly.',
  },
  4: {
    eyebrow: 'Why one connected system',
    headline: 'Your customer starts deciding before they reach you.',
    subheadline:
      'Search, offers, creators, communities, partners, and AI-led discovery shape the decision before the brand sees a clean visit.',
    support: 'The growth problem starts before the website, app, checkout, or CRM.',
    cards: ['Search', 'Offers', 'Creators', 'Communities', 'Partners', 'Brand visit'],
    cta: 'Continue',
    drawer: 'Each moment can carry intent, preference, or action signal before brand-owned tracking begins.',
  },
  5: {
    eyebrow: 'Why it works',
    headline: 'Inspirelabs starts with assets already in motion.',
    subheadline:
      'Owned commerce surfaces, distribution depth, shopper behaviour, an in-house AI Lab, and measurement discipline help brands move from audience intent to measurable action faster.',
    support:
      'The advantage is not one channel. It is the operating base across surfaces, signals, execution, and accountability.',
    cards: ['Owned surfaces', 'Distribution depth', 'Shopper behaviour', 'In-house AI Lab', 'Measurement discipline'],
    cta: 'Continue',
    drawer: 'Use this drawer to show proof inputs, available assets, and validation status for each advantage.',
  },
  6: {
    eyebrow: 'How it all fits',
    headline: 'The system moves from intent to accountable growth.',
    subheadline:
      'Reach shoppers who are ready to buy, spread your reach, activate shopper behaviour, scale execution with AI Growth Studio, and run with measurable commitments.',
    support: 'Results sit alongside the system as evidence, not as a separate delivery capability.',
    cards: ['Reach ready buyers', 'Spread your reach', 'AudienceSeed shopper behaviour', 'AI Growth Studio', 'Growth commitments', 'Results by category'],
    cta: 'Start with reaching ready buyers',
    drawer: 'Each block opens a short definition and the screens that explain it.',
  },
  7: {
    eyebrow: 'Capability 1 · Reach ready buyers',
    headline: 'Reach shoppers who are ready to buy where decisions are already forming.',
    subheadline:
      'Place your brand where users are already discovering offers, comparing options, and moving toward purchase decisions.',
    support: 'Intent shows up through offer-led, commerce-led, and comparison-led behaviours.',
    cards: ['Offer-led intent', 'Active-shopping', 'Comparison-led intent'],
    cta: 'See who each surface reaches',
  },
  8: {
    eyebrow: 'Reach ready buyers',
    headline: 'GrabOn reaches shoppers already moving toward purchase.',
    subheadline:
      'Deal seekers, coupon-led shoppers, savings-first buyers, category explorers, and offer-ready shoppers use GrabOn while decisions are forming.',
    support:
      'Brands can show up across store pages, coupon pages, brand pages, category pages, deal modules, and featured placements.',
    cards: ['Store pages', 'Coupon pages', 'Brand pages', 'Category pages', 'Deal modules', 'Featured placements'],
    cta: 'View promotional surfaces',
    aiChip: 'grabon',
    drawer: 'Measurement can include visits, clicks, coupon reveals, outbound clicks, orders, and sales where tracking is available.',
  },
  9: {
    eyebrow: 'Reach ready buyers',
    headline: 'GrabOn can also act as a promotional environment.',
    subheadline:
      'Brands can use high-visibility placements and offer-led modules to create visibility and action where shoppers are ready to buy.',
    support: 'Promotional surfaces should be shown as real inventory, not hidden inside a generic GrabOn screen.',
    cards: ['Sidekick banners', 'Cross-promotions', 'Coupon ID promotions', 'Video placements', 'Featured campaigns', 'Deal modules', 'Category takeovers', 'High-visibility placements'],
    cta: 'Continue to comparison-led discovery',
    drawer: 'Each placement drawer should show purpose, asset needs, measurable actions, and availability status.',
  },
  10: {
    eyebrow: 'Reach ready buyers',
    headline: 'Reach buyers while they are comparing software options.',
    subheadline:
      'Alternatives.co helps brands reach SaaS buyers, tool evaluators, alternative seekers, and category researchers comparing software before the final choice.',
    support: 'Comparison-led software discovery gives the brand another moment before the final choice.',
    cards: ['SaaS buyers', 'Tool evaluators', 'Alternative seekers', 'Category researchers'],
    cta: 'Move demand beyond one platform',
    aiChip: 'alternatives',
    drawer: 'Measurement can include visits, clicks, category engagement, comparison-led traffic, and leads where applicable.',
  },
  11: {
    eyebrow: 'Capability 2 · Spread your reach',
    headline: 'Spread your reach across owned channels and placements.',
    subheadline:
      'Move demand beyond one platform through owned communities, creators, affiliates, partner ecosystems, and channel amplification.',
    support: 'Owned surfaces and placements stay separate so the reader understands what each part does.',
    cards: ['Your own channels', 'Where your brand appears'],
    cta: 'See your own channels',
  },
  12: {
    eyebrow: 'Your own channels',
    headline: 'Your own channels turn offers into community and creator movement.',
    subheadline:
      'GrabCash and GrabShare move brand offers through sharing-led, community-led, and creator-led surfaces operated within the Inspirelabs ecosystem.',
    support: 'These surfaces add people-led reach while keeping actions measurable.',
    cards: ['GrabCash', 'GrabShare'],
    cta: 'See GrabCash',
    drawer: 'GrabCash is community and share-led. GrabShare is creator and storefront-led.',
  },
  13: {
    eyebrow: 'Your own channels',
    headline: 'GrabCash turns deal sharing into measurable performance distribution.',
    subheadline:
      'Everyday sharers, reward-seeking users, deal communities, micro-affiliate users, and cashback-led converters can move offers through tracked links and orders.',
    support: 'The brand sees action through clicks, leads, orders, sales, and user-wise performance where tracking is available.',
    cards: ['Deal sharing', 'Community promotion', 'Telegram-led sharing', 'Tracked links', 'Payout-led sharing'],
    cta: 'Continue to GrabShare',
    aiChip: 'grabcash',
    drawer: 'AI Channel Agents can support channel copy, post variants, tracked link readiness, and reporting preparation with human review.',
  },
  14: {
    eyebrow: 'Your own channels',
    headline: 'GrabShare turns creator recommendations into trackable commerce.',
    subheadline:
      'Creator storefronts, influencer marketing, product curation, and social sharing help brands reach recommendation-led buyers.',
    support: 'Creator-wise performance can be tracked through reach, engagement, clicks, orders, conversions, CPA, and ROAS where available.',
    cards: ['Creator storefronts', 'Product curation', 'Social sharing', 'Trusted recommendations', 'Creator-wise tracking'],
    cta: 'Continue to placements',
    aiChip: 'grabshare',
    drawer: 'AI Creator Agents can support creator briefs, influencer angles, product framing, and approval-ready variants.',
  },
  15: {
    eyebrow: 'Where your brand shows up',
    headline: 'Placements extend demand into external ecosystems.',
    subheadline:
      'Inspirelabs can extend brand demand into partner ecosystems, affiliate publishers, content channels, social surfaces, push channels, and campaign-specific promotions.',
    support: 'These surfaces are shown separately so the reader sees the breadth without losing clarity.',
    cards: ['Strategic Partnerships', 'Affiliate Marketing Platforms', 'Channel Amplification', 'Integrated Campaign Promotions'],
    cta: 'Start with strategic partnerships',
    drawer: 'Each family drawer previews where it runs, what it needs, and what can be measured.',
  },
  16: {
    eyebrow: 'Where your brand shows up',
    headline: 'Partner ecosystems can become growth surfaces.',
    subheadline:
      'Inspirelabs helps brands activate offers, engagement moments, and acquisition paths across partner-owned surfaces.',
    support:
      'Use 145+ strategic partnerships as approved proof. Use 200M+ only as potential reachable audience through partner ecosystems, not guaranteed reach.',
    cards: ['Fintech', 'BFSI', 'Payments', 'Telecom', 'Commerce', 'Entertainment', 'Loyalty', 'Engagement'],
    cta: 'Continue to affiliate platforms',
    aiChip: 'partnerships',
    drawer: 'Partner drawers should show surface example, offer moment, tracked action, and reporting input.',
  },
  17: {
    eyebrow: 'Where your brand shows up',
    headline: 'Affiliate platforms extend performance-led traffic.',
    subheadline:
      'Publisher, coupon, deal, and performance-led sources can support tracked campaigns across clicks, leads, orders, sales, CPA, CPS, and ROAS.',
    support: 'This is separate from strategic partnerships and creator-led distribution.',
    cards: ['Affiliate publishers', 'Coupon partners', 'Deal publishers', 'Performance traffic', 'Tracked campaigns'],
    cta: 'Continue',
    drawer: 'Show campaign setup, tracking method, commercial metric, and reporting owner.',
  },
  18: {
    eyebrow: 'Where your brand shows up',
    headline: 'Channel amplification gives campaigns more places to travel.',
    subheadline:
      'Inspirelabs can support social, email, newsletter, app push, web push, YouTube, Instagram, media house amplification, and Telegram where relevant.',
    support: 'Channels should be selected by objective, category fit, asset readiness, and tracking availability.',
    cards: ['Social', 'Email', 'Newsletter', 'App push', 'Web push', 'YouTube', 'Instagram', 'Media house', 'Telegram'],
    cta: 'Continue to integrated campaign promotions',
    aiChip: 'channels',
    drawer: 'AI Channel Agents can help prepare copy variants, channel notes, and reporting fields for human review.',
  },
  19: {
    eyebrow: 'Where your brand shows up',
    headline: 'Integrated campaign promotions can connect launch moments, seasons, and partner opportunities.',
    subheadline:
      'Inspirelabs can support launch campaigns, seasonal promotions, co-branded offers, partner-specific promotions, ATL or BTL support, and media or event-led extensions where available.',
    support: 'The surface mix depends on category, objective, assets, partner availability, and tracking setup.',
    cards: ['Launch moment', 'Seasonal push', 'Co-branded offer', 'Partner-specific promotion', 'ATL or BTL support', 'Media or event extension'],
    cta: 'Continue to AudienceSeed',
    drawer: 'Show what must be confirmed before the promotion can be scoped.',
  },
  20: {
    eyebrow: 'Capability 3 · AudienceSeed',
    headline: 'Activate shopper buying signals with AudienceSeed.',
    subheadline:
      "AudienceSeed helps brands understand and activate high-intent shoppers before they enter the brand's website, app, or owned retargeting pool.",
    support: 'It improves audience quality before media spend scales.',
    cards: ['Shopper buying signals', 'Retargeting input', 'Offer intelligence', 'Audience quality'],
    cta: 'See the blind spot',
    drawer:
      'AudienceSeed is not a generic analytics dashboard, SEO product, content product, ad management product, influencer product, or broad reporting tool. Activation must use approved, policy-compliant signals.',
  },
  21: {
    eyebrow: 'AudienceSeed',
    headline: 'Your pixel sees the visit. AudienceSeed sees the decision before it.',
    subheadline: "The highest-intent behaviour often happens before the brand's own tracking begins.",
    support: 'GrabOn discovery, offer comparison, coupon reveal, and outbound click can all happen before website or app arrival.',
    cards: ['Discovery', 'Comparison', 'Coupon reveal', 'Outbound click', 'Brand arrival'],
    cta: 'See signal depth',
    drawer: 'The drawer can define each event and the data source required to use it.',
  },
  22: {
    eyebrow: 'AudienceSeed',
    headline: 'A page view is interest. A coupon reveal is intent. An outbound click is action.',
    subheadline: 'AudienceSeed helps brands distinguish passive interest from active purchase intent.',
    support: 'Signal strength also depends on engagement depth, repeat behaviour, and freshness.',
    cards: ['Page view', 'Offer view', 'Coupon reveal', 'Outbound click', 'Engagement depth', 'Repeat behaviour', 'Signal freshness'],
    cta: 'Continue to offer intelligence',
    drawer: 'Each rung should define the event and how it can inform audience quality.',
  },
  23: {
    eyebrow: 'AudienceSeed',
    headline: 'Compare offer response before scaling media spend.',
    subheadline:
      'AudienceSeed helps brands see which offer formats are drawing stronger shopper intent before committing larger budgets.',
    support: 'Offer response should guide the next action, not pretend to guarantee the outcome.',
    cards: ['Percentage discount', 'Flat discount', 'Free delivery', 'Minimum basket', 'Combo offer', 'Payment or bank offer'],
    cta: 'Continue',
    drawer: 'Offer drawers show required sample size, observed response, and recommended next action if data is available.',
  },
  24: {
    eyebrow: 'AudienceSeed',
    headline: 'AudienceSeed improves inputs into the retargeting stack you already use.',
    subheadline:
      'GrabOn surface visits and approved signals can help build better audiences inside existing Meta or Google workflows.',
    support:
      'No platform migration or new ad account is required where the integration is scoped and approved. Better inputs into the existing retargeting stack.',
    cards: ['Surface visit', 'Approved signal', 'Audience build', 'Brand retargeting', 'Signal report'],
    cta: 'See AudienceSeed reporting',
    aiChip: 'audienceseed',
    drawer:
      'AI Action Agents can summarise signal quality and draft recommended next actions for human review. Existing brand workflows are subject to platform policy, consent, and integration approval.',
  },
  25: {
    eyebrow: 'AudienceSeed',
    headline: 'See signal quality, offer response, and audience readiness.',
    subheadline: 'AudienceSeed reporting helps brands understand which signals and offers deserve the next action.',
    support: 'Reporting should focus on commercial decision support, not generic dashboards.',
    cards: ['Audience observed', 'Top offer format', 'Coupon reveals', 'Outbound clicks', 'Engagement quality', 'Signal freshness', 'Peak days', 'Recommended action'],
    cta: 'Continue to AI Growth Studio',
    drawer: 'Each reporting field should show definition, source, and whether the value is live, approved, or pending.',
  },
  26: {
    eyebrow: 'Capability 4 · AI Growth Studio',
    headline: 'Scale growth execution with AI Growth Studio.',
    subheadline: "AI Growth Studio brings Inspirelabs' in-house AI Lab agents into client growth execution with human-reviewed control.",
    support: 'It helps reduce manual workload and improve execution speed across recurring growth tasks.',
    cards: ['Built in-house', 'Productised systems', 'Human review', 'Custom agents', 'Faster execution'],
    cta: 'See the agent map',
    drawer: 'AI Growth Studio does not replace teams, guarantee ROI, or launch work without review.',
  },
  27: {
    eyebrow: 'AI Growth Studio',
    headline: 'AI Growth Studio supports recurring growth work across the system.',
    subheadline: 'Agents can support search, content, creative, channels, creators, monitoring, and custom growth workflows.',
    support: 'Breadth matters, but the value becomes clear when agents are shown running through real tasks.',
    cards: ['Search and Discovery', 'RankDrive', 'WriteGenius', 'Content', 'Creative', 'Channel', 'Creator', 'Monitoring', 'Custom Growth'],
    cta: 'See search and content flow',
    drawer: 'Cluster drawers show use cases, required inputs, sample outputs, and review checkpoints.',
  },
  28: {
    eyebrow: 'AI Growth Studio',
    headline: 'Turn category inputs into search and content opportunities.',
    subheadline:
      'The flow can move from brand or category input to keyword and competitor scan, content opportunities, briefs, WriteGenius output, and human review.',
    support: 'Useful outputs can include SEO content, comparison content, category content, and product explainers.',
    cards: ['Input', 'Scan', 'Opportunities', 'Briefs', 'WriteGenius output', 'Human review'],
    cta: 'Continue to creative and creator flow',
    drawer: 'Show sample input fields, output type, owner, and approval step.',
  },
  29: {
    eyebrow: 'AI Growth Studio',
    headline: 'Move from campaign objective to review-ready assets.',
    subheadline:
      'AI Growth Studio can help generate offer angles, ad creative variants, channel copy, influencer briefs, and performance-ready assets.',
    support: 'Human review protects brand fit, claims, approvals, and tracking readiness.',
    cards: ['Objective', 'Offer angles', 'Ad variants', 'Channel copy', 'Creator brief', 'Review'],
    cta: 'Continue to monitoring flow',
    drawer: 'Output drawers show brand inputs, platform constraints, review owner, and asset status.',
  },
  30: {
    eyebrow: 'AI Growth Studio',
    headline: 'Keep live growth work moving with faster reads and next actions.',
    subheadline:
      'AI Growth Studio can support performance summaries, anomaly flags, channel-wise notes, optimisation recommendations, and next-cycle actions.',
    support: 'Recommendations stay human-reviewed before they become action.',
    cards: ['Campaign live', 'Performance read', 'Anomaly flags', 'Channel summary', 'Recommendation', 'Next action'],
    cta: 'See custom agents',
    drawer: 'Monitoring drawers show data source, threshold, recommended action, and review status.',
  },
  31: {
    eyebrow: 'AI Growth Studio',
    headline: 'Custom agents can be shaped around recurring growth problems.',
    subheadline: "Inspirelabs can design custom AI agents around a brand's operating gaps, repeated workflows, or channel needs.",
    support: 'Start with the recurring task, required inputs, review owner, and measurable output.',
    cards: ['Report automation', 'Offer variants', 'Category briefs', 'Creator briefs', 'Competitive visibility', 'Performance summaries'],
    cta: 'Discuss a custom growth agent',
    drawer: 'Tell us the recurring task, input source, output format, frequency, and approval owner.',
  },
  32: {
    eyebrow: 'How we stay accountable',
    headline: 'Long-term partnerships need defined goals and review cycles.',
    subheadline:
      'Every partnership should run with clear objectives, activation scope, KPI definition, tracking setup, reporting cadence, performance review, and a partnership roadmap.',
    support: 'This is how we stay accountable across the partnership.',
    cards: ['Objective', 'Scope', 'KPI', 'Tracking', 'Reporting', 'Review', 'Improvement', 'Roadmap'],
    cta: 'See how the partnership runs',
    aiChip: 'commitments',
    drawer: 'Each commitment drawer shows required inputs, owner, evidence source, and review cadence.',
  },
  33: {
    eyebrow: 'How we stay accountable',
    headline: 'Start focused, then expand based on measurable traction.',
    subheadline:
      'The relationship begins with a first activation path and expands into additional surfaces, agents, and commitments as proof builds.',
    support: 'Expansion should be gated by evidence, not by enthusiasm.',
    cards: ['Define objective', 'Launch first activation path', 'Review and improve', 'Expand the system'],
    cta: 'Continue to proof',
    drawer: 'Show example gates: objective agreed, tracking live, first signal observed, expansion path approved.',
  },
  34: {
    eyebrow: 'Results by category',
    headline: 'The system stays consistent. Proof changes by category.',
    subheadline: 'Each case should show the relevant problem, activated capabilities, metric groups, and evidence status.',
    support: 'Use placeholders when final proof is not yet available.',
    cards: ['Fashion and Beauty', 'BFSI and Fintech', 'Commerce and Marketplace', 'Entertainment and OTT', 'Travel and Mobility', 'Gaming and Rummy', 'Electronics and Devices', 'Kids and Family', 'Other'],
    cta: 'View case format',
    drawer: 'Category drawers show relevant surfaces, acceptable metric groups, available proof, and missing proof.',
  },
  35: {
    eyebrow: 'Results by category',
    headline: 'Every proof module should earn trust quickly.',
    subheadline:
      'Each case should show the brand or category, growth problem, capabilities activated, engagement period, metrics moved, and why it matters for similar brands.',
    support: 'Missing evidence should stay visible until approved.',
    cards: ['Brand or category', 'Growth problem', 'Capabilities activated', 'Engagement period', 'Metrics moved', 'Why it matters'],
    cta: 'Build your roadmap',
    drawer: 'Evidence status can be known, pending validation, or unavailable.',
  },
  36: {
    eyebrow: 'Partnership roadmap',
    headline: 'Build a dedicated growth partnership.',
    subheadline:
      'A stage-gated partnership roadmap. Each stage unlocks only when its proof gate is met, the same way for every brand.',
    support: 'This is a partnership roadmap, not a short-term activation menu.',
    cards: ['First activation path', 'Prove the path', 'Review decision', 'Expand the partnership'],
    cta: 'Map the partnership roadmap',
    drawer: 'A fixed stage-gated roadmap. Each stage unlocks when its proof gate is met.',
  },
  37: {
    eyebrow: 'Next step',
    headline: 'Let us map the growth partnership roadmap.',
    subheadline: 'Share your details and the Inspirelabs team can turn this into a proof-led partnership discussion.',
    support: 'The same proof-led partnership conversation applies to every brand we work with.',
    cards: ['Name', 'Work email', 'Company', 'Phone optional', 'Website optional', 'Message optional'],
    cta: 'Send roadmap request',
  },
  /* Inserted screen (display position 8), rendered after Screen 07. Key 38 keeps
     existing 0..37 copy keys stable while the registry controls display order. */
  38: {
    eyebrow: 'Capability 1 · Platform audiences',
    headline: 'Different surfaces reach different decision moments.',
    subheadline:
      'Each Inspirelabs surface reaches a different user mindset, from discovery to comparison, purchase, repeat engagement, and re-entry.',
    support: 'One system spans the decision, from first search to repeat re-entry, surface by surface.',
    cards: ['GrabOn', 'GrabCash', 'GrabShare', 'Alternatives.co', 'Strategic partner surfaces'],
    cta: 'See GrabOn',
  },
};
