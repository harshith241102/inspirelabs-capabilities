import { useEffect } from 'react';
import { AppProvider, useApp } from './state/store';
import { DrawerProvider } from './components/Drawer';
import { ScrollDeck } from './components/ScrollDeck';
import { ProgressRail } from './components/ProgressRail';
import { DeckNav } from './components/DeckNav';
import { deckScreens } from './screens/registry';
import { TOTAL_SCREENS } from './content/sections';
import { useDeckScale } from './lib/useDeckScale';

function Deck() {
  const { setTotal } = useApp();
  useDeckScale();
  useEffect(() => {
    setTotal(TOTAL_SCREENS);
  }, [setTotal]);

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
