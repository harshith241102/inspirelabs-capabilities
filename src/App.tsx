import { useEffect } from 'react';
import { AppProvider, useApp } from './state/store';
import { DrawerProvider } from './components/Drawer';
import { ScrollDeck } from './components/ScrollDeck';
import { ProgressRail } from './components/ProgressRail';
import { DeckNav } from './components/DeckNav';
import { MobileGate } from './components/MobileGate';
import { deckScreens } from './screens/registry';
import { TOTAL_SCREENS } from './content/sections';
import { useDeckScale } from './lib/useDeckScale';
import { ASSETS } from './lib/assets';

function Deck() {
  const { setTotal } = useApp();
  useDeckScale();
  useEffect(() => {
    setTotal(TOTAL_SCREENS);
  }, [setTotal]);

  // Warm every screen's images during idle time after first paint, so they are
  // cached before the reader navigates to them (no late pop-in on a deck where
  // each screen is a full slide).
  useEffect(() => {
    const preload = () => {
      for (const url of Object.values(ASSETS)) {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      }
    };
    const ric = window.requestIdleCallback || ((fn: () => void) => window.setTimeout(fn, 300));
    const id = ric(preload);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else window.clearTimeout(id as number);
    };
  }, []);

  return (
    <DrawerProvider>
      <a href="#deck-main" className="skip-link">
        Skip to content
      </a>
      <ScrollDeck>
        {deckScreens.map((Screen, i) => (
          <Screen key={i} />
        ))}
      </ScrollDeck>
      <ProgressRail />
      <DeckNav />
      <MobileGate />
    </DrawerProvider>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Deck />
    </AppProvider>
  );
}
