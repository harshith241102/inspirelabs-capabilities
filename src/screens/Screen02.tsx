import { Screen } from '../primitives/Screen';
import { NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { AnnotatedShot } from '../primitives/deck';
import { useApp } from '../state/store';
import { copy } from '../content/copy';
import { openingTailoring } from '../content/setup';
import { ASSETS } from '../lib/assets';
import './s02.css';

/* Screen 2 - Repositioning hero. This is the "bigger picture" reframe: the
   reader knows GrabOn (a commerce surface); Inspirelabs is the connected
   growth system behind it. Kept deliberately minimal - the five modules are
   detailed on the next screen, so this one only does the reframe. The intro
   headline + support adapt to the setup answer (familiarity). */

export default function Screen02() {
  const c = copy[2];
  const { setup, setupComplete } = useApp();
  const tailored = openingTailoring[setup.familiarity];
  const headline = setupComplete ? tailored.headline : c.fallback!;
  const sub = setupComplete ? tailored.support : c.support!;

  return (
    <Screen index={2} tone="light" id="bigger-picture" label="The bigger picture">
      <header className="s-header s02-head">
        <Reveal from="up" distance={12}>
          <span className="eyebrow">{c.eyebrow}</span>
        </Reveal>
        <Reveal i={1} key={headline}>
          <h1 className="s02-title">{headline}</h1>
        </Reveal>
        <Reveal i={2} key={sub}>
          <p className="s02-sub">{sub}</p>
        </Reveal>
      </header>

      <div className="s02-body">
        {/* Dominant proof object: the flagship GrabOn surface */}
        <Reveal className="s02-hero" from="up" distance={18}>
          <AnnotatedShot
            src={ASSETS.grabonHome}
            alt="GrabOn home, the flagship commerce-intent surface where shopper decisions form"
            url="grabon.com"
            logo={{ src: ASSETS.grabonLogo, alt: 'GrabOn' }}
            objectPosition="top center"
            style={{ height: '100%' }}
          />
          <span className="s02-hero__cap mono">
            <Icon name="store" size={14} />
            Flagship commerce-intent surface and signal source
          </span>
        </Reveal>

        {/* The reframe: what you may know -> what actually powers it */}
        <Reveal from="right" distance={20} className="s02-reframe">
          <div className="s02-reframe__card s02-reframe__from mk-hover">
            <span className="s02-reframe__tag mono">What you may know</span>
            <span className="s02-reframe__name">GrabOn</span>
            <span className="s02-reframe__cap">A commerce surface where shoppers are ready to buy.</span>
          </div>

          <span className="s02-reframe__shift" aria-hidden="true">
            <span className="s02-reframe__rail" />
            <span className="s02-reframe__spark" />
            <span className="s02-reframe__chev">
              <Icon name="arrowDown" size={18} />
            </span>
          </span>

          <div className="s02-reframe__card s02-reframe__to mk-hover">
            <span className="s02-reframe__mark mk-breathe" aria-hidden="true">
              <img src={ASSETS.symbolInkCrop} alt="" />
            </span>
            <span className="s02-reframe__tag mono">What powers it</span>
            <span className="s02-reframe__name">Inspirelabs</span>
            <span className="s02-reframe__cap">The connected growth system behind it.</span>
          </div>
        </Reveal>
      </div>

      <footer className="s02-foot">
        <NetBox>{c.support}</NetBox>
      </footer>
    </Screen>
  );
}
