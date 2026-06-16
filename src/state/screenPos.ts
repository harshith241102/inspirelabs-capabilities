import { createContext, useContext } from 'react';

/* Display position of a screen = its index in the ordered deck registry.
   Provided by App around each rendered screen so display order is the single
   source of truth for navigation, while each screen keeps its own stable copy
   key. This lets a screen be inserted into the registry without renumbering
   every existing screen file. */
export const ScreenPosContext = createContext<number | null>(null);

export const useScreenPos = (): number | null => useContext(ScreenPosContext);
