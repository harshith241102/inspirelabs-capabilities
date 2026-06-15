/* Setup options + personalisation logic.
   Transcribed from 02_INTERACTION_AND_CTA_MODEL.md.
   Setup answers personalise ONLY the intro (Screen 2 opening) and the
   proof-by-category / case-study area (Screens 34 and 35). The lead-context
   payload is captured internally but never surfaced after those screens.
   Everything else (capability sequence, module emphasis, the roadmap, the
   contact close) is a FIXED narrative, identical for every reader. */

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

/* The roadmap (Screen 36) is a FIXED stage-gated partnership roadmap, identical
   for every reader. The per-priority roadmap-emphasis and capability-mix tables
   were removed in the personalisation correction pass: setup no longer changes
   the roadmap, capability sequence, module emphasis, CTA logic, or the contact
   close. Only the intro (Screen 2) and the proof-by-category area (34, 35) adapt. */

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
