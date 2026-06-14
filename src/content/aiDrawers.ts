import type { DrawerPayload } from '../components/Drawer';

/* Contextual AI Growth Studio support drawers.
   Source: 02_INTERACTION_AND_CTA_MODEL.md "Contextual AI Growth Studio Support Chip" table.
   Every AI drawer shows: required brand input + a human review checkpoint.
   Chips are SECONDARY on non-AI screens and only open these drawers. */

export type AiContext =
  | 'grabon'
  | 'alternatives'
  | 'grabcash'
  | 'grabshare'
  | 'partnerships'
  | 'channels'
  | 'audienceseed'
  | 'commitments';

export const aiChipLabel: Record<AiContext, string> = {
  grabon: 'AI Growth Studio support: Explore AI Search and Content Agents',
  alternatives: 'AI Growth Studio support: Explore AI Search and Content Agents',
  grabcash: 'AI Growth Studio support: Explore AI Channel Agents',
  grabshare: 'AI Growth Studio support: Explore AI Creator Agents',
  partnerships: 'AI Growth Studio support: Explore AI Partner and Campaign Agents',
  channels: 'AI Growth Studio support: Explore AI Channel Agents',
  audienceseed: 'AI Growth Studio support: Explore AI Action Agents',
  commitments: 'AI Growth Studio support: Explore AI Monitoring Agents',
};

export const aiDrawers: Record<AiContext, DrawerPayload> = {
  grabon: {
    id: 'ai-grabon',
    kind: 'ai',
    title: 'AI Search and Content Agents',
    sections: [
      {
        heading: 'What this supports',
        body: 'Search and content work around offer-led demand on the commerce-intent surface.',
      },
      {
        heading: 'What it can prepare',
        items: ['Search cues', 'Offer content', 'Comparison content', 'RankDrive scans', 'WriteGenius drafts'],
      },
    ],
    requiredInput: 'Brand or category brief, target offers, and any keyword focus.',
    humanReview: 'Every draft is reviewed before it is used. Nothing publishes automatically.',
  },
  alternatives: {
    id: 'ai-alternatives',
    kind: 'ai',
    title: 'AI Search and Content Agents',
    sections: [
      {
        heading: 'What this supports',
        body: 'Comparison-led discovery content for users evaluating options.',
      },
      {
        heading: 'What it can prepare',
        items: ['Comparison-led content opportunities', 'Category explainers', 'Competitor cues'],
      },
    ],
    requiredInput: 'Category, competitor set, and the comparison angle the brand wants to own.',
    humanReview: 'Content opportunities are reviewed before any are written or published.',
  },
  grabcash: {
    id: 'ai-grabcash',
    kind: 'ai',
    title: 'AI Channel Agents',
    sections: [
      {
        heading: 'What this supports',
        body: 'Community and share-led distribution copy and readiness.',
      },
      {
        heading: 'What it can prepare',
        items: ['Channel copy', 'Community post variants', 'Tracked link readiness'],
      },
    ],
    requiredInput: 'Offer details, community context, and the tracked links to be used.',
    humanReview: 'Copy variants and links are reviewed before they go live.',
  },
  grabshare: {
    id: 'ai-grabshare',
    kind: 'ai',
    title: 'AI Creator Agents',
    sections: [
      {
        heading: 'What this supports',
        body: 'Creator and influencer-led commerce briefs and angles.',
      },
      {
        heading: 'What it can prepare',
        items: ['Creator brief variants', 'Product angle generation', 'Approval checklist'],
      },
    ],
    requiredInput: 'Product set, creator profile context, and brand claims that are allowed.',
    humanReview: 'Briefs and angles are approved before creators are activated.',
  },
  partnerships: {
    id: 'ai-partnerships',
    kind: 'ai',
    title: 'AI Partner and Campaign Agents',
    sections: [
      {
        heading: 'What this supports',
        body: 'Partner placement preparation and campaign asset readiness.',
      },
      {
        heading: 'What it can prepare',
        items: ['Partner placement brief', 'Offer angle', 'Asset variants', 'Tracking checklist'],
      },
    ],
    requiredInput: 'Partner surface, offer, creative inputs, and the tracking method.',
    humanReview: 'Placement briefs and assets are reviewed before partner activation.',
  },
  channels: {
    id: 'ai-channels',
    kind: 'ai',
    title: 'AI Channel Agents',
    sections: [
      {
        heading: 'What this supports',
        body: 'Channel-wise copy and reporting preparation for amplification.',
      },
      {
        heading: 'What it can prepare',
        items: ['Copy variants', 'Channel notes', 'Reporting fields for review'],
      },
    ],
    requiredInput: 'Campaign objective, selected channels, and available creative assets.',
    humanReview: 'Channel copy and notes are reviewed before scheduling or sending.',
  },
  audienceseed: {
    id: 'ai-audienceseed',
    kind: 'ai',
    title: 'AI Action Agents',
    sections: [
      {
        heading: 'What this supports',
        body: 'Signal summaries and recommended next actions from AudienceSeed.',
      },
      {
        heading: 'What it can prepare',
        items: ['Signal summary', 'Offer response readout', 'Recommended action draft'],
      },
    ],
    requiredInput:
      'Approved signal access and reporting fields. Existing brand media workflows stay subject to platform policy, consent, and integration approval.',
    humanReview: 'Recommended actions are drafts for human review, not automatic media changes.',
  },
  commitments: {
    id: 'ai-commitments',
    kind: 'ai',
    title: 'AI Monitoring Agents',
    sections: [
      {
        heading: 'What this supports',
        body: 'Faster reporting reads and next-cycle suggestions for live partnerships.',
      },
      {
        heading: 'What it can prepare',
        items: ['Reporting summaries', 'Anomaly flags', 'Next-cycle recommendation'],
      },
      { heading: 'Review cadence', body: 'Summaries and recommendations follow the agreed review cadence.' },
    ],
    requiredInput: 'Connected reporting sources and the agreed KPIs and thresholds.',
    humanReview: 'Recommendations are reviewed each cycle before they become action.',
  },
};
