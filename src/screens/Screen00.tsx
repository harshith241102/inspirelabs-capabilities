import { motion, useReducedMotion } from 'framer-motion';
import { Screen } from '../primitives/Screen';
import { AdvanceCta } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { ASSETS } from '../lib/assets';
import { copy } from '../content/copy';
import './cover.css';

const modules = [
  { label: 'GrabOn', sub: 'Commerce-intent surface', icon: 'store' as const, hub: true },
  { label: 'Distribution', sub: 'Owned and activation', icon: 'share' as const },
  { label: 'AudienceSeed', sub: 'Shopper intent signals', icon: 'signal' as const },
  { label: 'AI Growth Studio', sub: 'Human-reviewed agents', icon: 'spark' as const },
  { label: 'Growth commitments', sub: 'Measurable, accountable', icon: 'target' as const },
];

export default function Screen00() {
  const c = copy[0];
  const reduce = useReducedMotion();

  return (
    <Screen index={0} tone="dark" id="cover" label="Cover">
      <div className="cover">
        <div className="cover__top">
          <img className="cover__lockup" src={ASSETS.wordmarkDark} alt="Inspirelabs" loading="eager" fetchPriority="high" />
          <span className="cover__kicker mono">Client capabilities</span>
        </div>

        <div className="cover__main">
          <div className="cover__copy">
            <Reveal from="up" distance={14}>
              <span className="eyebrow">The growth system behind GrabOn</span>
            </Reveal>
            <Reveal i={1}>
              <h1 className="cover__title">{c.headline}</h1>
            </Reveal>
            <Reveal i={2}>
              <p className="cover__sub">{c.subheadline}</p>
            </Reveal>
            <Reveal i={3}>
              <p className="cover__support">{c.support}</p>
            </Reveal>
            <Reveal i={4}>
              <div className="cta-row" style={{ marginTop: 8 }}>
                <AdvanceCta label={c.cta} to={1} />
                <span className="cover__hint mono">3 quick questions · 5 minute read</span>
              </div>
            </Reveal>
          </div>

          <div className="cover__orbit" aria-hidden="true">
            <div className="orbit">
              <svg className="orbit__lines" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                {[0, 1, 2, 3].map((i) => {
                  const angle = (-90 + i * 90) * (Math.PI / 180);
                  const x = 200 + Math.cos(angle) * 150;
                  const y = 200 + Math.sin(angle) * 150;
                  return (
                    <motion.line
                      key={i}
                      x1={200}
                      y1={200}
                      x2={x}
                      y2={y}
                      stroke="rgba(255,255,255,0.18)"
                      strokeWidth={1.5}
                      strokeDasharray="3 4"
                      initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.5 + i * 0.12 }}
                    />
                  );
                })}
              </svg>

              <motion.div
                className="orbit__hub"
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Icon name="store" size={26} />
                <span>GrabOn</span>
              </motion.div>

              {modules.slice(1).map((m, i) => {
                const angle = (-90 + i * 90) * (Math.PI / 180);
                const x = 50 + Math.cos(angle) * 50;
                const y = 50 + Math.sin(angle) * 50;
                return (
                  <motion.div
                    key={m.label}
                    className="orbit__node"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.7 + i * 0.12 }}
                  >
                    <span className="orbit__node-ico">
                      <Icon name={m.icon} size={18} />
                    </span>
                    <span className="orbit__node-label">{m.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <Reveal i={5} className="cover__strip">
          {modules.map((m) => (
            <div className={`cover__chip${m.hub ? ' cover__chip--hub' : ''}`} key={m.label}>
              <span className="cover__chip-ico">
                <Icon name={m.icon} size={15} />
              </span>
              <div>
                <span className="cover__chip-label">{m.label}</span>
                <span className="cover__chip-sub">{m.sub}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Screen>
  );
}
