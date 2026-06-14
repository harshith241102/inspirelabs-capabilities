/* Setup options + personalisation logic.
   Transcribed from 02_INTERACTION_AND_CTA_MODEL.md.
   Setup tailors ONLY: Screen 2 opening, Screen 34 highlight, Screen 36 roadmap, lead context. */

export type Familiarity = 'new_to_inspirelabs' | 'know_grabon' | 'worked_with_grabon';

export type Category =
  | 'fashion_beauty'
  | 'bfsi_fintech'
  | 'commerce_marketplace'
  | 'entertainment_ott'
  | 'travel_mobility'
  | 'gaming_rummy'
  | 'electronics_devices'
  | 'kids_family'
  | 'other';

export type GrowthPriority =
  | 'sales_orders'
  | 'leads_signups'
  | 'app_installs_registrations'
  | 'offer_led_acquisition'
  | 'organic_visibility'
  | 'creator_influencer_growth'
  | 'partner_ecosystem_expansion'
  | 'reduce_execution_overhead'
  | 'not_sure';

export interface SetupAnswers {
  familiarity: Familiarity;
  category: Category;
  growth_priority: GrowthPriority;
}

export interface Option<T extends string> {
  value: T;
  label: string;
}

/* ---- Question 1: How do you know us today? ---- */
export const familiarityOptions: Option<Familiarity>[] = [
  { value: 'new_to_inspirelabs', label: 'New to Inspirelabs' },
  { value: 'know_grabon', label: 'We know GrabOn' },
  { value: 'worked_with_grabon', label: 'We have worked with GrabOn before' },
];

/* ---- Question 2: Which category best fits your brand? ---- */
export const categoryOptions: Option<Category>[] = [
  { value: 'fashion_beauty', label: 'Fashion and Beauty' },
  { value: 'bfsi_fintech', label: 'BFSI and Fintech' },
  { value: 'commerce_marketplace', label: 'Commerce and Marketplace' },
  { value: 'entertainment_ott', label: 'Entertainment and OTT' },
  { value: 'travel_mobility', label: 'Travel and Mobility' },
  { value: 'gaming_rummy', label: 'Gaming and Rummy' },
  { value: 'electronics_devices', label: 'Electronics and Devices' },
  { value: 'kids_family', label: 'Kids and Family' },
  { value: 'other', label: 'Other' },
];

/* ---- Question 3: What growth priority are you focused on? ---- */
export const priorityOptions: Option<GrowthPriority>[] = [
  { value: 'sales_orders', label: 'Drive sales or orders' },
  { value: 'leads_signups', label: 'Generate leads or signups' },
  { value: 'app_installs_registrations', label: 'Improve app installs or registrations' },
  { value: 'offer_led_acquisition', label: 'Increase offer-led acquisition' },
  { value: 'organic_visibility', label: 'Build organic visibility' },
  { value: 'creator_influencer_growth', label: 'Scale creator or influencer-led growth' },
  { value: 'partner_ecosystem_expansion', label: 'Expand through partner ecosystems' },
  { value: 'reduce_execution_overhead', label: 'Reduce growth execution overhead' },
  { value: 'not_sure', label: 'Not sure yet' },
];

/* ---- Screen 2 opening tailoring (verbatim from interaction model) ---- */
export const openingTailoring: Record<Familiarity, { headline: string; support: string }> = {
  new_to_inspirelabs: {
    headline: 'Inspirelabs is the growth system behind GrabOn.',
    support:
      'The system helps brands capture commerce intent, distribute demand, activate shopper signals, and run measurable growth partnerships.',
  },
  know_grabon: {
    headline: 'You may know us through GrabOn. Inspirelabs is the broader growth system behind it.',
    support:
      'GrabOn remains the flagship commerce-intent surface. Inspirelabs expands it into distribution, AudienceSeed, AI Growth Studio, and measurable commitments.',
  },
  worked_with_grabon: {
    headline:
      'You have seen GrabOn as a commerce-intent surface. Inspirelabs now expands that into a broader growth partnership.',
    support:
      'The next layer combines distribution assets, shopper intent signals, AI Growth Studio, and measurable growth commitments.',
  },
};

/* ---- Screen 36 roadmap personalisation (verbatim emphasis + commitment examples) ---- */
export const roadmapPersonalisation: Record<
  GrowthPriority,
  { emphasis: string; commitments: string[] }
> = {
  sales_orders: {
    emphasis: 'commerce-intent surfaces, promotional surfaces, owned distribution, tracked orders',
    commitments: ['orders', 'sales', 'conversion rate', 'coupon reveals', 'outbound clicks'],
  },
  leads_signups: {
    emphasis: 'partner ecosystems, affiliate platforms, channel amplification, lead capture',
    commitments: ['leads', 'signups', 'CPA', 'CTR', 'partner-wise contribution'],
  },
  app_installs_registrations: {
    emphasis:
      'offer-led acquisition, channel amplification, partner surfaces, tracked registrations',
    commitments: ['installs', 'registrations', 'CPI where available', 'CTR', 'conversion rate'],
  },
  offer_led_acquisition: {
    emphasis:
      'GrabOn, promotional surfaces, AudienceSeed offer intelligence, retargeting input quality',
    commitments: ['coupon reveals', 'outbound clicks', 'offer format response', 'sales'],
  },
  organic_visibility: {
    emphasis: 'Alternatives.co, RankDrive, WriteGenius, search and discovery agents',
    commitments: ['organic traffic', 'keyword growth', 'branded search', 'comparison-led traffic'],
  },
  creator_influencer_growth: {
    emphasis: 'GrabShare, creator briefs, social sharing, creator-wise performance',
    commitments: ['reach', 'engagement', 'clicks', 'creator-wise conversions', 'ROAS'],
  },
  partner_ecosystem_expansion: {
    emphasis:
      'strategic partnerships, partner-owned surfaces, co-branded offers, partner-wise contribution',
    commitments: [
      'potential reachable audience',
      'actual reach if available',
      'leads',
      'orders',
      'partner-wise contribution',
    ],
  },
  reduce_execution_overhead: {
    emphasis: 'AI Growth Studio, reporting cadence, monitoring agents, asset output support',
    commitments: [
      'reporting turnaround time',
      'asset output volume',
      'manual effort reduction',
      'next-cycle actions',
    ],
  },
  not_sure: {
    emphasis: 'objective definition, category signal review, first activation path selection',
    commitments: ['objective', 'activation scope', 'KPI definition', 'tracking setup'],
  },
};

/* Recommended capability mix per priority, composed from the locked capability architecture.
   Capabilities are never suppressed; this only sets emphasis order for the roadmap board. */
export const capabilityMixByPriority: Record<GrowthPriority, string[]> = {
  sales_orders: ['Capture Commerce Intent', 'Owned Distribution', 'AudienceSeed', 'Growth Commitments'],
  leads_signups: ['Strategic Partnerships', 'Affiliate Platforms', 'Channel Amplification', 'Growth Commitments'],
  app_installs_registrations: ['Promotional Surfaces', 'Channel Amplification', 'Strategic Partnerships', 'Growth Commitments'],
  offer_led_acquisition: ['GrabOn Surfaces', 'AudienceSeed Offer Intelligence', 'Owned Distribution', 'Growth Commitments'],
  organic_visibility: ['Alternatives.co', 'AI Growth Studio', 'Capture Commerce Intent', 'Growth Commitments'],
  creator_influencer_growth: ['GrabShare', 'AI Creator Agents', 'Channel Amplification', 'Growth Commitments'],
  partner_ecosystem_expansion: ['Strategic Partnerships', 'Affiliate Platforms', 'AudienceSeed', 'Growth Commitments'],
  reduce_execution_overhead: ['AI Growth Studio', 'Monitoring Agents', 'AudienceSeed Reporting', 'Growth Commitments'],
  not_sure: ['Capture Commerce Intent', 'Distribute Demand', 'AudienceSeed', 'Growth Commitments'],
};

export const labelFor = {
  familiarity: (v: Familiarity) => familiarityOptions.find((o) => o.value === v)?.label ?? '',
  category: (v: Category) => categoryOptions.find((o) => o.value === v)?.label ?? '',
  priority: (v: GrowthPriority) => priorityOptions.find((o) => o.value === v)?.label ?? '',
};

/* Defaults used when setup is skipped (per Screen 1 fallback copy). */
export const defaultSetup: SetupAnswers = {
  familiarity: 'new_to_inspirelabs',
  category: 'other',
  growth_priority: 'not_sure',
};
