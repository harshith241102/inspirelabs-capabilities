import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta } from '../primitives/ui';
import { DeckStage } from '../primitives/deck';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { useApp } from '../state/store';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';
import {
  categoryOptions,
  familiarityOptions,
  priorityOptions,
  labelFor,
  openingTailoring,
} from '../content/setup';
import './s01.css';

export default function Screen01() {
  const c = copy[1];
  const { setup, setSetupValue, completeSetup, goTo } = useApp();
  const drawer = useDrawer();

  const opening = openingTailoring[setup.familiarity];

  const openUsage = () =>
    drawer.open({
      id: 'setup-usage',
      kind: 'info',
      eyebrow: 'How this is used',
      title: 'Your answers tailor only the intro and the proof-by-category slides.',
      sections: [
        { heading: 'What this is', body: c.drawer ?? '' },
        {
          heading: 'What it changes',
          items: [
            'The intro repositioning headline and short support copy',
            'The category lens on the proof-by-category slides',
          ],
        },
        {
          heading: 'What it does not change',
          body: 'The capability walkthrough, the partnership roadmap, and the contact close are the same for every reader. There is no role selector and no separate journey.',
        },
      ],
    });

  return (
    <Screen index={1} tone="light" id="setup" label="Setup">
      <DeckStage
        header={<DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />}
        cta={
          <div className="s01-ctazone">
            <AdvanceCta
              label={c.cta}
              onClick={() => {
                completeSetup();
                goTo(2);
              }}
            />
            <button type="button" className="s01-note" onClick={openUsage}>
              <Icon name="shield" size={14} />
              The core experience stays fixed. See how answers are used.
            </button>
          </div>
        }
      >
        <div className="s01-console">
          {/* LEFT: control deck */}
          <Reveal from="up" distance={14} className="s01-controls">
            {/* Q1 segmented control */}
            <div className="s01-field">
              <span className="s01-field__legend">
                <span className="s01-field__num">1</span>
                How do you know us today
              </span>
              <div
                className="s01-seg"
                role="radiogroup"
                aria-label="How do you know us today"
                onKeyDown={(e) => {
                  const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
                  if (!keys.includes(e.key)) return;
                  e.preventDefault();
                  const opts = familiarityOptions;
                  const idx = opts.findIndex((o) => o.value === setup.familiarity);
                  let next = idx;
                  if (e.key === 'ArrowRight') next = (idx + 1) % opts.length;
                  else if (e.key === 'ArrowLeft') next = (idx - 1 + opts.length) % opts.length;
                  else if (e.key === 'Home') next = 0;
                  else if (e.key === 'End') next = opts.length - 1;
                  setSetupValue('familiarity', opts[next].value);
                  const group = e.currentTarget;
                  requestAnimationFrame(() =>
                    group.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus(),
                  );
                }}
              >
                {familiarityOptions.map((o) => {
                  const active = o.value === setup.familiarity;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      tabIndex={active ? 0 : -1}
                      className={`s01-seg__opt${active ? ' is-active' : ''}`}
                      onClick={() => setSetupValue('familiarity', o.value)}
                    >
                      {active && <Icon name="check" size={14} />}
                      <span>{o.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q2 + Q3 dropdowns */}
            <div className="s01-selects">
              <div className="s01-field">
                <label className="s01-field__legend" htmlFor="s01-category">
                  <span className="s01-field__num">2</span>
                  Which category best fits your brand
                </label>
                <div className="s01-select">
                  <Icon name="grid" size={17} className="s01-select__ico" />
                  <select
                    id="s01-category"
                    value={setup.category}
                    onChange={(e) => setSetupValue('category', e.target.value as typeof setup.category)}
                  >
                    {categoryOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <Icon name="arrowDown" size={16} className="s01-select__caret" />
                </div>
              </div>

              <div className="s01-field">
                <label className="s01-field__legend" htmlFor="s01-priority">
                  <span className="s01-field__num">3</span>
                  What growth priority are you focused on
                </label>
                <div className="s01-select">
                  <Icon name="target" size={17} className="s01-select__ico" />
                  <select
                    id="s01-priority"
                    value={setup.growth_priority}
                    onChange={(e) =>
                      setSetupValue('growth_priority', e.target.value as typeof setup.growth_priority)
                    }
                  >
                    {priorityOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <Icon name="arrowDown" size={16} className="s01-select__caret" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: single tailored summary panel */}
          <Reveal i={1} from="up" distance={14} className="s01-summary" aria-live="polite">
            <div className="s01-summary__top">
              <span className="s01-summary__kicker">
                <Icon name="compass" size={14} />
                Your intro preview
              </span>
              <h2 className="s01-summary__head">{opening.headline}</h2>
            </div>

            <div className="s01-summary__rows">
              <div className="s01-srow">
                <span className="s01-srow__k">Reader</span>
                <span className="s01-srow__v">{labelFor.familiarity(setup.familiarity)}</span>
              </div>
              <div className="s01-srow">
                <span className="s01-srow__k">Category</span>
                <span className="s01-srow__v">{labelFor.category(setup.category)}</span>
              </div>
              <div className="s01-srow">
                <span className="s01-srow__k">Priority</span>
                <span className="s01-srow__v">{labelFor.priority(setup.growth_priority)}</span>
              </div>
            </div>

            <div className="s01-summary__scope">
              <Icon name="layers" size={14} />
              <span>
                These shape only the intro opening and the proof-by-category slides. The capability
                walkthrough, roadmap, and contact close are the same for every reader.
              </span>
            </div>

            <p className="s01-summary__foot">{opening.support}</p>
          </Reveal>
        </div>
      </DeckStage>
    </Screen>
  );
}
