import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import './styles/shared.css';
import './primitives/deck.css';
// Shared cross-screen footer rule (.s-footer-row) used by ~22 screens; loaded
// here now that the Screen 02 refactor no longer imports hero.css.
import './screens/hero.css';
import App from './App';
import { IS_EXPORT } from './lib/deckMode';

// Export mode: tag the document root so CSS can strip nav chrome + animation
// and the screenshot tool gets clean 1920x1080 frames.
if (IS_EXPORT) document.documentElement.setAttribute('data-export', '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
