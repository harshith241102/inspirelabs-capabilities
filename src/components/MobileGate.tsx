import { Icon } from '../primitives/icons';
import { ASSETS } from '../lib/assets';
import './mobilegate.css';

/* Desktop/tablet gate for narrow phone viewports.
   This is a full-screen interactive 1920x1080 deck; on a phone it would shrink
   below readable size, so on phones we show this polished holding screen instead
   of an unreadable miniature deck. The deck itself is hidden via CSS at the same
   breakpoint (the 38 screens stay in the DOM). Tablets (>= 700px) keep the deck. */
export function MobileGate() {
  return (
    <div className="mgate" role="region" aria-label="Best viewed on desktop or tablet">
      <div className="mgate__inner">
        <img className="mgate__lockup" src={ASSETS.wordmarkDark} alt="Inspirelabs" />
        <span className="mgate__eyebrow mono">Client capabilities</span>

        <h1 className="mgate__title">Best viewed on desktop or tablet.</h1>
        <p className="mgate__body">
          This is a full-screen interactive capabilities deck, built for a wide stage. On a phone it
          would shrink below a readable size, so it opens on a larger screen instead.
        </p>

        <ul className="mgate__how">
          <li>
            <span className="mgate__how-ico"><Icon name="grid" size={16} /></span>
            Open this link on a desktop or tablet
          </li>
          <li>
            <span className="mgate__how-ico"><Icon name="arrow" size={16} /></span>
            Step through the deck with the on-screen controls
          </li>
        </ul>

        <a className="mgate__action" href="https://inspirelabs.in" target="_blank" rel="noopener noreferrer">
          Visit inspirelabs.in
          <Icon name="arrow" size={16} />
        </a>
        <span className="mgate__note mono">A mobile-friendly overview of Inspirelabs.</span>
      </div>
    </div>
  );
}
