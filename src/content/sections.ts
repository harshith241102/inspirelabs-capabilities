/* Reader-understanding sections (from 00 + 01 architecture baseline). */
export interface DeckSection {
  label: string;
  short: string;
  start: number;
  end: number;
}

export const sections: DeckSection[] = [
  { label: 'Entry', short: 'Entry', start: 0, end: 1 },
  { label: 'Repositioning', short: 'Reposition', start: 2, end: 6 },
  { label: 'Capture Commerce Intent', short: 'Capture', start: 7, end: 10 },
  { label: 'Distribute Demand', short: 'Distribute', start: 11, end: 19 },
  { label: 'AudienceSeed', short: 'AudienceSeed', start: 20, end: 25 },
  { label: 'AI Growth Studio', short: 'AI Studio', start: 26, end: 31 },
  { label: 'Growth Commitments', short: 'Commitments', start: 32, end: 33 },
  { label: 'Proof', short: 'Proof', start: 34, end: 35 },
  { label: 'Closing', short: 'Close', start: 36, end: 37 },
];

export const sectionForIndex = (i: number): DeckSection =>
  sections.find((s) => i >= s.start && i <= s.end) ?? sections[0];

export const TOTAL_SCREENS = 38;
export const ROADMAP_INDEX = 36;
/** "Jump to roadmap" only allowed after system overview (Screen 6). */
export const JUMP_UNLOCK_INDEX = 6;
