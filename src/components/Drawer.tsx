import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useApp } from '../state/store';
import { Icon } from '../primitives/icons';
import { EvidenceTag, type EvidenceStatus } from '../primitives/ui';
import './drawer.css';

export interface DrawerSection {
  heading: string;
  body?: ReactNode;
  items?: string[];
}

export type DrawerKind = 'surface' | 'metric' | 'ai' | 'proof' | 'roadmap' | 'info';

export interface DrawerPayload {
  id: string;
  kind?: DrawerKind;
  eyebrow?: string;
  title: string;
  /** Small sub-label under the title. AI drawers use "Contextual reference". */
  subLabel?: string;
  /** Generic detail drawers (surface / metric / proof / roadmap) render these. */
  sections?: DrawerSection[];
  /** AI Growth Studio drawer (kind === 'ai') structured, fixed-order content. */
  whatAiAdds?: string;
  exampleWorkflow?: string[];
  output?: string[];
  /** AI drawers must show a human review checkpoint */
  humanReview?: string;
  /** AI / metric drawers must state required brand input or data source */
  requiredInput?: string;
  evidence?: { label: string; status: EvidenceStatus }[];
}

interface DrawerCtx {
  open: (payload: DrawerPayload) => void;
  close: () => void;
}

const Ctx = createContext<DrawerCtx | null>(null);

const kindEyebrow: Record<DrawerKind, string> = {
  surface: 'Surface detail',
  metric: 'Metric detail',
  ai: 'AI Growth Studio',
  proof: 'Evidence status',
  roadmap: 'Roadmap detail',
  info: 'Detail',
};

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<DrawerPayload | null>(null);
  const { markDrawerOpened, markAiCtaOpened } = useApp();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const slideFrom = isMobile ? { y: '100%' } : { x: '100%' };
  const slideTo = isMobile ? { y: 0 } : { x: 0 };

  const open = useCallback(
    (p: DrawerPayload) => {
      lastFocused.current = document.activeElement as HTMLElement;
      setPayload(p);
      markDrawerOpened(p.id);
      if (p.kind === 'ai') markAiCtaOpened(p.id);
    },
    [markDrawerOpened, markAiCtaOpened],
  );

  const close = useCallback(() => {
    setPayload(null);
    const el = lastFocused.current;
    if (el && typeof el.focus === 'function') requestAnimationFrame(() => el.focus());
  }, []);

  // Make the background deck inert (hidden from AT, not focusable) while open,
  // and flag the root so the next-nav + AI launcher can fade out (overlay
  // systems stay separate: the drawer never moves or compresses the slide).
  useEffect(() => {
    const deck = document.getElementById('deck-main');
    const root = document.documentElement;
    if (payload) {
      deck?.setAttribute('inert', '');
      root.setAttribute('data-drawer-open', '');
      return () => {
        deck?.removeAttribute('inert');
        root.removeAttribute('data-drawer-open');
      };
    }
  }, [payload]);

  // Focus management + Escape + Tab trap
  useEffect(() => {
    if (!payload) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
        ),
      );
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'Tab') {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [payload, close]);

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {payload && (
          <motion.div
            className="drawer-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={close}
          >
            <motion.aside
              ref={panelRef}
              className={`drawer${payload.kind === 'ai' ? ' drawer--ai' : ''}`}
              role="dialog"
              aria-modal="true"
              aria-label={payload.title}
              initial={reduce ? false : slideFrom}
              animate={slideTo}
              exit={reduce ? undefined : slideFrom}
              transition={{ type: 'tween', duration: reduce ? 0 : 0.32, ease: [0.22, 0.61, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer__head">
                <span className="eyebrow">{payload.eyebrow ?? kindEyebrow[payload.kind ?? 'info']}</span>
                <button type="button" className="drawer__close" onClick={close} aria-label="Close detail">
                  <Icon name="arrow" size={18} style={{ transform: 'rotate(180deg)' }} />
                  <span>Close</span>
                </button>
              </div>
              <h2 className="drawer__title">{payload.title}</h2>
              {payload.subLabel && <p className="drawer__sublabel">{payload.subLabel}</p>}

              <div className="drawer__body">
                {payload.kind === 'ai' ? (
                  <>
                    {payload.whatAiAdds && (
                      <section className="drawer__section">
                        <h3 className="drawer__heading">What AI adds here</h3>
                        <p className="drawer__text">{payload.whatAiAdds}</p>
                      </section>
                    )}

                    {payload.exampleWorkflow && payload.exampleWorkflow.length > 0 && (
                      <section className="drawer__section">
                        <h3 className="drawer__heading">Example workflow</h3>
                        <ol className="drawer__steps">
                          {payload.exampleWorkflow.map((step, j) => (
                            <li key={j}>
                              <span className="drawer__stepn">{j + 1}</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </section>
                    )}

                    {payload.requiredInput && (
                      <div className="drawer__note drawer__note--input">
                        <Icon name="doc" size={16} />
                        <div>
                          <strong>Required brand inputs</strong>
                          <p>{payload.requiredInput}</p>
                        </div>
                      </div>
                    )}

                    {payload.humanReview && (
                      <div className="drawer__note drawer__note--review">
                        <Icon name="shield" size={16} />
                        <div>
                          <strong>Human review checkpoint</strong>
                          <p>{payload.humanReview}</p>
                        </div>
                      </div>
                    )}

                    {payload.output && payload.output.length > 0 && (
                      <section className="drawer__section">
                        <h3 className="drawer__heading">Output</h3>
                        <ul className="drawer__list">
                          {payload.output.map((it, j) => (
                            <li key={j}>
                              <Icon name="check" size={14} />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </>
                ) : (
                  <>
                    {(payload.sections ?? []).map((s, idx) => (
                      <section className="drawer__section" key={idx}>
                        <h3 className="drawer__heading">{s.heading}</h3>
                        {s.body && <p className="drawer__text">{s.body}</p>}
                        {s.items && (
                          <ul className="drawer__list">
                            {s.items.map((it, j) => (
                              <li key={j}>
                                <Icon name="check" size={14} />
                                <span>{it}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    ))}

                    {payload.evidence && payload.evidence.length > 0 && (
                      <section className="drawer__section">
                        <h3 className="drawer__heading">Evidence status</h3>
                        <div className="drawer__evidence">
                          {payload.evidence.map((e, i) => (
                            <div className="drawer__evrow" key={i}>
                              <span>{e.label}</span>
                              <EvidenceTag status={e.status} />
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {payload.requiredInput && (
                      <div className="drawer__note drawer__note--input">
                        <Icon name="doc" size={16} />
                        <div>
                          <strong>Required brand input or data source</strong>
                          <p>{payload.requiredInput}</p>
                        </div>
                      </div>
                    )}

                    {payload.humanReview && (
                      <div className="drawer__note drawer__note--review">
                        <Icon name="shield" size={16} />
                        <div>
                          <strong>Human review checkpoint</strong>
                          <p>{payload.humanReview}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export function useDrawer(): DrawerCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useDrawer must be used within DrawerProvider');
  return ctx;
}
