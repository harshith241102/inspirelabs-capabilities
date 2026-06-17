/* Reader-understanding sections (from 00 + 01 architecture baseline). */
export interface DeckSection {
  label: string;
  short: string;
  start: number;
  end: number;
}

/* Display-index ranges. A screen was inserted at display position 8 (platform
   audiences, after Screen 07), so every range from position 8 onward shifts +1
   and the "Reach ready buyers" section absorbs the new screen. */
export const sections: DeckSection[] = [
  { label: 'Entry', short: 'Entry', start: 0, end: 1 },
  { label: 'The bigger picture', short: 'Big picture', start: 2, end: 6 },
  { label: 'Reach ready buyers', short: 'Get found', start: 7, end: 11 },
  { label: 'Spread your reach', short: 'Spread reach', start: 12, end: 20 },
  { label: 'AudienceSeed', short: 'AudienceSeed', start: 21, end: 26 },
  { label: 'AI Growth Studio', short: 'AI Studio', start: 27, end: 32 },
  { label: 'What we commit to', short: 'Commitments', start: 33, end: 33 },
  { label: 'Results', short: 'Results', start: 34, end: 35 },
  { label: 'Next step', short: 'Next step', start: 36, end: 37 },
];

export const sectionForIndex = (i: number): DeckSection =>
  sections.find((s) => i >= s.start && i <= s.end) ?? sections[0];

export const TOTAL_SCREENS = 38;
export const ROADMAP_INDEX = 36;
/** "Jump to roadmap" only allowed after system overview (Screen 6). */
export const JUMP_UNLOCK_INDEX = 6;
