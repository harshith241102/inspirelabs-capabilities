import { useState, type FormEvent } from 'react';
import { Screen } from '../primitives/Screen';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { useApp } from '../state/store';
import { copy } from '../content/copy';
import { labelFor } from '../content/setup';
import { ASSETS } from '../lib/assets';

export default function Screen37() {
  const c = copy[37];
  const { submitContact, lead, setup, setupComplete } = useApp();
  const [submitted, setSubmitted] = useState(false);
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

  return (
    <Screen index={37} tone="dark" id="contact" label="Contact and next step">
      <div className="contact">
        <div className="contact__left">
          <Reveal from="up" distance={12}>
            <img src={ASSETS.wordmarkDark} alt="Inspirelabs" style={{ height: 52, display: 'block' }} />
          </Reveal>
          <Reveal i={1}>
            <span className="eyebrow">{c.eyebrow}</span>
          </Reveal>
          <Reveal i={2}>
            <h1 className="s-title s-title--wide" style={{ color: '#fff' }}>{c.headline}</h1>
          </Reveal>
          <Reveal i={3}>
            <p className="s-sub" style={{ color: '#c9ccd4' }}>{c.subheadline}</p>
          </Reveal>
          {setupComplete && (
            <Reveal i={4}>
              <div className="contact__chips">
                <span className="chip">{labelFor.category(setup.category)}</span>
                <span className="chip">{labelFor.priority(setup.growth_priority)}</span>
                <span className="chip">{labelFor.familiarity(setup.familiarity)}</span>
              </div>
            </Reveal>
          )}
          <Reveal i={5}>
            <p className="mono" style={{ fontSize: 11, color: '#8a8e99' }}>
              {c.support}
            </p>
          </Reveal>
        </div>

        {submitted ? (
          <Reveal className="contact__thanks">
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 12, background: 'var(--orange)' }}>
              <Icon name="check" size={24} style={{ color: '#fff' }} />
            </span>
            <h2 style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 24, color: '#fff', letterSpacing: '-0.02em' }}>
              Thank you. Your roadmap request is in.
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14.5, color: '#d6d9e0', lineHeight: 1.5 }}>
              The Inspirelabs team will prepare a category-specific partnership discussion using your setup choices and
              the parts of the system you explored.
            </p>
            <div className="contact__chips">
              <span className="chip">{lead.screens_completed} screens explored</span>
              {lead.category && <span className="chip">{labelFor.category(lead.category)}</span>}
              {lead.growth_priority && <span className="chip">{labelFor.priority(lead.growth_priority)}</span>}
            </div>
          </Reveal>
        ) : (
          <Reveal from="left">
            <form className="contact__form" onSubmit={onSubmit}>
              <div className="contact__grid">
                <div className="field">
                  <label htmlFor="cf-name">Name</label>
                  <input id="cf-name" required value={form.name} onChange={set('name')} placeholder="Your name" autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="cf-email">Work email</label>
                  <input id="cf-email" type="email" required value={form.work_email} onChange={set('work_email')} placeholder="you@company.com" autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="cf-company">Company</label>
                  <input id="cf-company" required value={form.company} onChange={set('company')} placeholder="Company name" autoComplete="organization" />
                </div>
                <div className="field">
                  <label htmlFor="cf-phone">Phone (optional)</label>
                  <input id="cf-phone" value={form.phone} onChange={set('phone')} placeholder="Phone number" autoComplete="tel" />
                </div>
                <div className="field field--full">
                  <label htmlFor="cf-website">Website (optional)</label>
                  <input id="cf-website" value={form.website} onChange={set('website')} placeholder="https://" autoComplete="url" />
                </div>
                <div className="field field--full">
                  <label htmlFor="cf-message">Message (optional)</label>
                  <textarea id="cf-message" rows={2} value={form.message} onChange={set('message')} placeholder="Anything you would like us to prepare" />
                </div>
              </div>
              <button type="submit" className="btn btn--primary" style={{ alignSelf: 'flex-start' }}>
                {c.cta}
                <Icon name="send" size={17} />
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </Screen>
  );
}
