import { Screen } from '../primitives/Screen';
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
  type Category,
  type Familiarity,
  type GrowthPriority,
} from '../content/setup';
import './setup.css';

export default function Screen01() {
  const c = copy[1];
  const { setup, setSetupValue, completeSetup, goTo } = useApp();
  const drawer = useDrawer();

  return (
    <Screen index={1} tone="light" id="setup" label="Setup">
      <div className="setup">
        <header className="setup__head">
          <Reveal from="up" distance={12}>
            <span className="eyebrow">{c.eyebrow}</span>
          </Reveal>
          <Reveal i={1}>
            <h1 className="s-title">{c.headline}</h1>
          </Reveal>
          <Reveal i={2}>
            <p className="s-sub">{c.subheadline}</p>
          </Reveal>
        </header>

        <Reveal i={3} className="setup__card">
          <SetupGroup<Familiarity>
            n={1}
            label="How do you know us today?"
            options={familiarityOptions}
            value={setup.familiarity}
            onSelect={(v) => setSetupValue('familiarity', v)}
          />
          <SetupGroup<Category>
            n={2}
            label="Which category best fits your brand?"
            options={categoryOptions}
            value={setup.category}
            onSelect={(v) => setSetupValue('category', v)}
            compact
          />
          <SetupGroup<GrowthPriority>
            n={3}
            label="What growth priority are you focused on?"
            options={priorityOptions}
            value={setup.growth_priority}
            onSelect={(v) => setSetupValue('growth_priority', v)}
            compact
          />

          <div className="setup__preview" aria-live="polite">
            <Icon name="compass" size={16} />
            <span>
              We will open for a <strong>{labelFor.familiarity(setup.familiarity)}</strong> reader in{' '}
              <strong>{labelFor.category(setup.category)}</strong>, focused on{' '}
              <strong>{labelFor.priority(setup.growth_priority).toLowerCase()}</strong>.
            </span>
          </div>

          <div className="setup__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                completeSetup();
                goTo(2);
              }}
            >
              {c.cta}
              <Icon name="arrow" size={18} className="btn__arrow" />
            </button>
            <button
              type="button"
              className="setup__note-btn"
              onClick={() =>
                drawer.open({
                  id: 'setup-usage',
                  kind: 'info',
                  eyebrow: 'How this is used',
                  title: 'Your answers tailor the opening and final roadmap.',
                  sections: [
                    { heading: 'What this is', body: c.drawer },
                    {
                      heading: 'What it changes',
                      items: [
                        'The opening repositioning headline',
                        'The category highlight on the proof screen',
                        'The final partnership roadmap emphasis',
                      ],
                    },
                    {
                      heading: 'What it does not change',
                      body: 'The core capability journey stays fixed for every reader. There is no role selector and no separate journey.',
                    },
                  ],
                })
              }
            >
              <Icon name="shield" size={14} />
              The core experience stays fixed. See how answers are used.
            </button>
          </div>
        </Reveal>
      </div>
    </Screen>
  );
}

function SetupGroup<T extends string>({
  n,
  label,
  options,
  value,
  onSelect,
  compact,
}: {
  n: number;
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onSelect: (v: T) => void;
  compact?: boolean;
}) {
  return (
    <fieldset className="setup__group">
      <legend className="setup__legend">
        <span className="setup__num">{n}</span>
        {label}
      </legend>
      <div
        className={`setup__opts${compact ? ' setup__opts--compact' : ''}`}
        role="radiogroup"
        aria-label={label}
        onKeyDown={(e) => {
          const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'];
          if (!keys.includes(e.key)) return;
          e.preventDefault();
          const idx = options.findIndex((o) => o.value === value);
          let next = idx;
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % options.length;
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + options.length) % options.length;
          else if (e.key === 'Home') next = 0;
          else if (e.key === 'End') next = options.length - 1;
          onSelect(options[next].value);
          const group = e.currentTarget;
          requestAnimationFrame(() => group.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus());
        }}
      >
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              className={`setup__opt${active ? ' is-active' : ''}`}
              onClick={() => onSelect(o.value)}
            >
              {active && <Icon name="check" size={14} />}
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
