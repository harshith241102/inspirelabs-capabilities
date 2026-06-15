import { useState, type FormEvent } from 'react';
import { Screen } from '../primitives/Screen';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { useApp } from '../state/store';
import { copy } from '../content/copy';
import { labelFor } from '../content/setup';
import { ASSETS } from '../lib/assets';
import './s37.css';

/* What-happens-next sequence (no invented dates or SLAs). */
const nextSteps: { title: string; body: string }[] = [
  {
    title: 'We read your context',
    body: 'Your category, growth priority, and the parts of the system you explored come through with this request.',
  },
  {
    title: 'We prepare a category-specific view',
    body: 'The Inspirelabs team shapes a partnership discussion around your priority, not a generic pitch.',
  },
  {
    title: 'We map the roadmap together',
    body: 'First activation path, proof gates, and measurable commitments, reviewed with your team.',
  },
];

export default function Screen37() {
  const c = copy[37];
  const { submitContact, lead, setup, setupComplete } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [showOptional, setShowOptional] = useState(false);
  const [form, setForm] = useState({ name: '', work_email: '', company: '', phone: '', website: '', message: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitContact({
      name: form.name,
      work_email: form.work_email,
      company: form.company,
      phone: form.phone || undefined,
      website: form.website || undefined,
      message: form.message || undefined,
    });
    setSubmitted(true);
  };

  /* Roadmap summary chips drawn from setup; never invents values. */
  const summaryChips = setupComplete
    ? [
        { k: 'Category', v: labelFor.category(setup.category) },
        { k: 'Growth priority', v: labelFor.priority(setup.growth_priority) },
        { k: 'Familiarity', v: labelFor.familiarity(setup.familiarity) },
      ]
    : [
        { k: 'Category', v: 'To confirm together' },
        { k: 'Growth priority', v: 'To confirm together' },
        { k: 'Familiarity', v: 'To confirm together' },
      ];

  return (
    <Screen index={37} tone="dark" id="contact" label="Contact and next step">
      <div className="s37">
        <header className="s37-head">
          <Reveal from="up" distance={12}>
            <img className="s37-lockup" src={ASSETS.wordmarkDark} alt="Inspirelabs" />
          </Reveal>
          <Reveal i={1}>
            <span className="eyebrow">{c.eyebrow}</span>
          </Reveal>
          <Reveal i={2}>
            <h1 className="s37-title">{c.headline}</h1>
          </Reveal>
          <Reveal i={3}>
            <p className="s37-sub">{c.subheadline}</p>
          </Reveal>
        </header>

        <div className="s37-body">
          {/* LEFT: roadmap summary + what happens next */}
          <Reveal from="up" distance={16} className="s37-brief">
            <div className="s37-brief__sum">
              <span className="s37-brief__kicker mono">Roadmap request summary</span>
              <div className="s37-sumgrid">
                {summaryChips.map((s) => (
                  <div className="s37-sumcell" key={s.k}>
                    <span className="s37-sumcell__k mono">{s.k}</span>
                    <span className="s37-sumcell__v">{s.v}</span>
                  </div>
                ))}
                <div className="s37-sumcell s37-sumcell--accent">
                  <span className="s37-sumcell__k mono">Explored</span>
                  <span className="s37-sumcell__v">{lead.screens_completed} of 38 screens</span>
                </div>
              </div>
            </div>

            <div className="s37-next">
              <span className="s37-next__head mono">What happens next</span>
              <ol className="s37-steps">
                {nextSteps.map((st, i) => (
                  <li className="s37-step" key={st.title}>
                    <span className="s37-step__n">{i + 1}</span>
                    <div>
                      <span className="s37-step__t">{st.title}</span>
                      <span className="s37-step__b">{st.body}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* RIGHT: disciplined required-fields-only form, or thank-you */}
          {submitted ? (
            <Reveal from="left" className="s37-panel s37-thanks">
              <span className="s37-thanks__mark">
                <Icon name="check" size={26} />
              </span>
              <h2 className="s37-thanks__title">Thank you. Your roadmap request is in.</h2>
              <p className="s37-thanks__body">
                The Inspirelabs team will prepare a category-specific partnership discussion using your setup choices and
                the parts of the system you explored.
              </p>
              <div className="s37-thanks__chips">
                <span className="s37-tag">{lead.screens_completed} screens explored</span>
                {lead.category && <span className="s37-tag">{labelFor.category(lead.category)}</span>}
                {lead.growth_priority && <span className="s37-tag">{labelFor.priority(lead.growth_priority)}</span>}
              </div>
              <div className="s37-pending">
                <Icon name="shield" size={15} />
                <span>
                  Backend delivery is pending integration. Your details are held in this session and are not yet routed
                  to a CRM or inbox.
                </span>
              </div>
            </Reveal>
          ) : (
            <Reveal from="left" className="s37-panel">
              <form className="s37-form" onSubmit={onSubmit}>
                <span className="s37-form__head mono">Send your roadmap request</span>

                <div className="s37-grid">
                  <div className="s37-field">
                    <label htmlFor="cf-name">Name</label>
                    <input id="cf-name" required value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />
                  </div>
                  <div className="s37-field">
                    <label htmlFor="cf-email">Work email</label>
                    <input id="cf-email" type="email" required value={form.work_email} onChange={set('work_email')} placeholder="you@company.com" autoComplete="email" />
                  </div>
                  <div className="s37-field s37-field--full">
                    <label htmlFor="cf-company">Company</label>
                    <input id="cf-company" required value={form.company} onChange={set('company')} placeholder="Company name" autoComplete="organization" />
                  </div>
                </div>

                <button
                  type="button"
                  className="s37-optional"
                  aria-expanded={showOptional}
                  onClick={() => setShowOptional((v) => !v)}
                >
                  <Icon name={showOptional ? 'check' : 'arrow'} size={14} className={showOptional ? '' : 's37-optional__ico'} />
                  {showOptional ? 'Optional details added below' : 'Add optional details'}
                </button>

                {showOptional && (
                  <div className="s37-grid s37-grid--optional">
                    <div className="s37-field">
                      <label htmlFor="cf-phone">Phone (optional)</label>
                      <input id="cf-phone" value={form.phone} onChange={set('phone')} placeholder="Phone number" autoComplete="tel" />
                    </div>
                    <div className="s37-field">
                      <label htmlFor="cf-website">Website (optional)</label>
                      <input id="cf-website" value={form.website} onChange={set('website')} placeholder="https://" autoComplete="url" />
                    </div>
                    <div className="s37-field s37-field--full">
                      <label htmlFor="cf-message">Message (optional)</label>
                      <textarea id="cf-message" rows={2} value={form.message} onChange={set('message')} placeholder="Anything you would like us to prepare" />
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn--primary s37-submit">
                  {c.cta}
                  <Icon name="send" size={17} />
                </button>

                <p className="s37-consent">
                  By sending this, you agree the Inspirelabs team can use these details and your setup choices to prepare
                  the partnership discussion. We do not share them outside that purpose.
                </p>
                <div className="s37-pending">
                  <Icon name="shield" size={15} />
                  <span>
                    Backend is pending integration. Details are held in this session only, with no CRM, inbox, or
                    analytics destination connected yet.
                  </span>
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </Screen>
  );
}
