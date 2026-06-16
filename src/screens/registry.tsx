import type { ComponentType } from 'react';
import './sections.css';
import './mock.css';
import './activation.css';
import './audienceseed.css';
import './ai.css';
import './closing.css';

import Screen00 from './Screen00';
import Screen01 from './Screen01';
import Screen02 from './Screen02';
import Screen03 from './Screen03';
import Screen04 from './Screen04';
import Screen05 from './Screen05';
import Screen06 from './Screen06';
import Screen07 from './Screen07';
import Screen08DecisionMoments from './Screen08DecisionMoments';
import Screen08 from './Screen08';
import Screen09 from './Screen09';
import Screen10 from './Screen10';
import Screen11 from './Screen11';
import Screen12 from './Screen12';
import Screen13 from './Screen13';
import Screen14 from './Screen14';
import Screen15 from './Screen15';
import Screen16 from './Screen16';
import Screen17 from './Screen17';
import Screen18 from './Screen18';
import Screen19 from './Screen19';
import Screen20 from './Screen20';
import Screen21 from './Screen21';
import Screen22 from './Screen22';
import Screen23 from './Screen23';
import Screen24 from './Screen24';
import Screen25 from './Screen25';
import Screen26 from './Screen26';
import Screen27 from './Screen27';
import Screen28 from './Screen28';
import Screen29 from './Screen29';
import Screen30 from './Screen30';
import Screen31 from './Screen31';
import Screen32 from './Screen32';
import Screen33 from './Screen33';
import Screen34 from './Screen34';
import Screen35 from './Screen35';
import Screen36 from './Screen36';
import Screen37 from './Screen37';

/* Ordered registry of the deck. `pos` (array index) is the display order and the
   single source of truth for navigation; `copy` is each screen's stable copy key
   (which never has to be renumbered when a screen is inserted). Screen08DecisionMoments
   is inserted at display position 8 (after Screen 07); existing screens keep their
   files and copy keys unchanged, so their display position simply shifts by one. */
export interface DeckEntry {
  Component: ComponentType;
  copy: number;
}

export const deckScreens: DeckEntry[] = [
  { Component: Screen00, copy: 0 },
  { Component: Screen01, copy: 1 },
  { Component: Screen02, copy: 2 },
  { Component: Screen03, copy: 3 },
  { Component: Screen04, copy: 4 },
  { Component: Screen05, copy: 5 },
  { Component: Screen06, copy: 6 },
  { Component: Screen07, copy: 7 },
  { Component: Screen08DecisionMoments, copy: 38 },
  { Component: Screen08, copy: 8 },
  { Component: Screen09, copy: 9 },
  { Component: Screen10, copy: 10 },
  { Component: Screen11, copy: 11 },
  { Component: Screen12, copy: 12 },
  { Component: Screen13, copy: 13 },
  { Component: Screen14, copy: 14 },
  { Component: Screen15, copy: 15 },
  { Component: Screen16, copy: 16 },
  { Component: Screen17, copy: 17 },
  { Component: Screen18, copy: 18 },
  { Component: Screen19, copy: 19 },
  { Component: Screen20, copy: 20 },
  { Component: Screen21, copy: 21 },
  { Component: Screen22, copy: 22 },
  { Component: Screen23, copy: 23 },
  { Component: Screen24, copy: 24 },
  { Component: Screen25, copy: 25 },
  { Component: Screen26, copy: 26 },
  { Component: Screen27, copy: 27 },
  { Component: Screen28, copy: 28 },
  { Component: Screen29, copy: 29 },
  { Component: Screen30, copy: 30 },
  { Component: Screen31, copy: 31 },
  { Component: Screen32, copy: 32 },
  { Component: Screen33, copy: 33 },
  { Component: Screen34, copy: 34 },
  { Component: Screen35, copy: 35 },
  { Component: Screen36, copy: 36 },
  { Component: Screen37, copy: 37 },
];

/** Stable copy key for a given display position. */
export const copyKeyForPos = (pos: number): number => deckScreens[pos]?.copy ?? pos;
