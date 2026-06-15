import type { DrawerPayload } from '../components/Drawer';

/* Contextual AI Growth Studio drawers.
   Opened by the ONE global AI Growth Studio launcher (not scattered in-slide
   chips) for whichever capability slide the reader is on. Read-only: no input
   field, no chat. Every AI drawer follows the same fixed structure:
     Header     AI Growth Studio
     Sub-label  Contextual reference
     Section    What AI adds here
     Section    Example workflow
     Note       Required brand inputs
     Note       Human review checkpoint
     Section    Output
   No invented numbers; the single orange accent is the human review checkpoint. */

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
  grabon: 'AI Growth Studio: AI Search and Content Agents',
  alternatives: 'AI Growth Studio: AI Search and Content Agents',
  grabcash: 'AI Growth Studio: AI Channel Agents',
  grabshare: 'AI Growth Studio: AI Creator Agents',
  partnerships: 'AI Growth Studio: AI Partner and Campaign Agents',
  channels: 'AI Growth Studio: AI Channel Agents',
  audienceseed: 'AI Growth Studio: AI Action Agents',
  commitments: 'AI Growth Studio: AI Monitoring Agents',
};

export const aiDrawers: Record<AiContext, DrawerPayload> = {
  grabon: {
    id: 'ai-grabon',
    kind: 'ai',
    title: 'AI Search and Content Agents',
    subLabel: 'Contextual reference',
    whatAiAdds: 'Search and content work around offer-led demand on the commerce-intent surface.',
    exampleWorkflow: [
      'Share the brand or category brief, target offers, and any keyword focus.',
      'Agents draft search cues, offer and comparison content, and run RankDrive scans.',
      'A marketer reviews and approves every draft before it is used.',
    ],
    requiredInput: 'Brand or category brief, target offers, and any keyword focus.',
    humanReview: 'Every draft is reviewed before it is used. Nothing publishes automatically.',
    output: ['Search cues', 'Offer content', 'Comparison content', 'RankDrive scans', 'WriteGenius drafts'],
  },
  alternatives: {
    id: 'ai-alternatives',
    kind: 'ai',
    title: 'AI Search and Content Agents',
    subLabel: 'Contextual reference',
    whatAiAdds: 'Comparison-led discovery content for users evaluating options.',
    exampleWorkflow: [
      'Set the category, competitor set, and the comparison angle the brand wants to own.',
      'Agents surface comparison-led content opportunities and category explainers.',
      'Each opportunity is reviewed before anything is written or published.',
    ],
    requiredInput: 'Category, competitor set, and the comparison angle the brand wants to own.',
    humanReview: 'Content opportunities are reviewed before any are written or published.',
    output: ['Comparison-led content opportunities', 'Category explainers', 'Competitor cues'],
  },
  grabcash: {
    id: 'ai-grabcash',
    kind: 'ai',
    title: 'AI Channel Agents',
    subLabel: 'Contextual reference',
    whatAiAdds: 'Community and share-led distribution copy and readiness.',
    exampleWorkflow: [
      'Provide offer details, community context, and the tracked links to be used.',
      'Agents prepare channel copy and community post variants with tracked links.',
      'Copy and links are reviewed before they go live.',
    ],
    requiredInput: 'Offer details, community context, and the tracked links to be used.',
    humanReview: 'Copy variants and links are reviewed before they go live.',
    output: ['Channel copy', 'Community post variants', 'Tracked link readiness'],
  },
  grabshare: {
    id: 'ai-grabshare',
    kind: 'ai',
    title: 'AI Creator Agents',
    subLabel: 'Contextual reference',
    whatAiAdds: 'Creator and influencer-led commerce briefs and angles.',
    exampleWorkflow: [
      'Share the product set, creator profile context, and the brand claims that are allowed.',
      'Agents generate creator brief variants and product angles with an approval checklist.',
      'Briefs and angles are approved before any creator is activated.',
    ],
    requiredInput: 'Product set, creator profile context, and brand claims that are allowed.',
    humanReview: 'Briefs and angles are approved before creators are activated.',
    output: ['Creator brief variants', 'Product angle generation', 'Approval checklist'],
  },
  partnerships: {
    id: 'ai-partnerships',
    kind: 'ai',
    title: 'AI Partner and Campaign Agents',
    subLabel: 'Contextual reference',
    whatAiAdds: 'Partner placement preparation and campaign asset readiness.',
    exampleWorkflow: [
      'Provide the partner surface, offer, creative inputs, and the tracking method.',
      'Agents prepare the placement brief, offer angle, and asset variants.',
      'Briefs and assets are reviewed before partner activation.',
    ],
    requiredInput: 'Partner surface, offer, creative inputs, and the tracking method.',
    humanReview: 'Placement briefs and assets are reviewed before partner activation.',
    output: ['Partner placement brief', 'Offer angle', 'Asset variants', 'Tracking checklist'],
  },
  channels: {
    id: 'ai-channels',
    kind: 'ai',
    title: 'AI Channel Agents',
    subLabel: 'Contextual reference',
    whatAiAdds: 'Channel-wise copy and reporting preparation for amplification.',
    exampleWorkflow: [
      'Set the campaign objective, selected channels, and available creative assets.',
      'Agents prepare channel-wise copy variants and reporting fields.',
      'Channel copy and notes are reviewed before scheduling or sending.',
    ],
    requiredInput: 'Campaign objective, selected channels, and available creative assets.',
    humanReview: 'Channel copy and notes are reviewed before scheduling or sending.',
    output: ['Copy variants', 'Channel notes', 'Reporting fields for review'],
  },
  audienceseed: {
    id: 'ai-audienceseed',
    kind: 'ai',
    title: 'AI Action Agents',
    subLabel: 'Contextual reference',
    whatAiAdds: 'Signal summaries and recommended next actions from AudienceSeed.',
    exampleWorkflow: [
      'Connect approved signal access and the reporting fields to read.',
      'Agents summarise signals and draft recommended next actions.',
      'Recommendations stay drafts for human review, never automatic media changes.',
    ],
    requiredInput:
      'Approved signal access and reporting fields. Existing brand media workflows stay subject to platform policy, consent, and integration approval.',
    humanReview: 'Recommended actions are drafts for human review, not automatic media changes.',
    output: ['Signal summary', 'Offer response readout', 'Recommended action draft'],
  },
  commitments: {
    id: 'ai-commitments',
    kind: 'ai',
    title: 'AI Monitoring Agents',
    subLabel: 'Contextual reference',
    whatAiAdds: 'Faster reporting reads and next-cycle suggestions for live partnerships.',
    exampleWorkflow: [
      'Connect reporting sources and agree the KPIs and thresholds.',
      'Agents prepare reporting summaries, anomaly flags, and a next-cycle recommendation.',
      'Each summary and recommendation is reviewed before it becomes action.',
    ],
    requiredInput: 'Connected reporting sources and the agreed KPIs and thresholds.',
    humanReview: 'Recommendations are reviewed each cycle before they become action.',
    output: ['Reporting summaries', 'Anomaly flags', 'Next-cycle recommendation'],
  },
};
