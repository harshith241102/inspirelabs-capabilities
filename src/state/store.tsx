import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  defaultSetup,
  type Category,
  type Familiarity,
  type GrowthPriority,
  type SetupAnswers,
} from '../content/setup';

/* ------------------------------------------------------------------
   Lead context payload, captured silently from interaction.
   Shape from 02_INTERACTION_AND_CTA_MODEL.md "Lead Context Capture".
   ------------------------------------------------------------------ */
export interface ContactDetails {
  name: string;
  work_email: string;
  company: string;
  phone?: string;
  website?: string;
  message?: string;
}

export interface LeadContext {
  familiarity: Familiarity | null;
  category: Category | null;
  growth_priority: GrowthPriority | null;
  screens_completed: number;
  drawers_opened: string[];
  ai_ctas_opened: string[];
  roadmap_cta_clicked: boolean;
  setup_completed: boolean;
  contact?: ContactDetails;
  timestamp: string;
  source_url: string;
}

export type AnalyticsEvent =
  | 'setup_started'
  | 'setup_completed'
  | 'screen_viewed'
  | 'drawer_opened'
  | 'ai_cta_opened'
  | 'roadmap_cta_clicked'
  | 'contact_submitted';

interface AppState {
  /* setup */
  setup: SetupAnswers;
  setupComplete: boolean;
  setSetupValue: <K extends keyof SetupAnswers>(key: K, value: SetupAnswers[K]) => void;
  completeSetup: () => void;

  /* lead context (read-only snapshot) */
  lead: LeadContext;
  markDrawerOpened: (id: string) => void;
  markAiCtaOpened: (id: string) => void;
  markRoadmapClicked: () => void;
  submitContact: (details: ContactDetails) => void;

  /* navigation */
  currentIndex: number;
  total: number;
  setTotal: (n: number) => void;
  registerScroller: (el: HTMLElement | null) => void;
  registerScreenView: (index: number) => void;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;

  /* analytics */
  track: (event: AnalyticsEvent, payload?: Record<string, unknown>) => void;
}

const AppCtx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [setup, setSetup] = useState<SetupAnswers>(defaultSetup);
  const [setupComplete, setSetupComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotalState] = useState(38);
  const [maxScreenSeen, setMaxScreenSeen] = useState(0);

  const scrollerRef = useRef<HTMLElement | null>(null);
  const screenEls = useRef<Map<number, HTMLElement>>(new Map());
  const drawersOpened = useRef<Set<string>>(new Set());
  const aiCtasOpened = useRef<Set<string>>(new Set());
  const roadmapClicked = useRef(false);
  const contactRef = useRef<ContactDetails | undefined>(undefined);
  const setupStartedFired = useRef(false);

  const track = useCallback((event: AnalyticsEvent, payload: Record<string, unknown> = {}) => {
    // Analytics platform is pending (see ASSET_GAPS / 06_ASSET_REQUIREMENTS).
    // Until wired, events are logged and dispatched on window for a future tag manager.
    const detail = { event, ...payload, ts: Date.now() };
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('inspirelabs:analytics', { detail }));
      if (import.meta.env.DEV) console.debug('[analytics]', event, payload);
    }
  }, []);

  const setSetupValue: AppState['setSetupValue'] = useCallback(
    (key, value) => {
      if (!setupStartedFired.current) {
        setupStartedFired.current = true;
        track('setup_started');
      }
      setSetup((prev) => ({ ...prev, [key]: value }));
    },
    [track],
  );

  const completeSetup = useCallback(() => {
    setSetupComplete(true);
    track('setup_completed', { ...setup });
  }, [setup, track]);

  const markDrawerOpened = useCallback(
    (id: string) => {
      if (!drawersOpened.current.has(id)) {
        drawersOpened.current.add(id);
        track('drawer_opened', { id });
      }
    },
    [track],
  );

  const markAiCtaOpened = useCallback(
    (id: string) => {
      if (!aiCtasOpened.current.has(id)) {
        aiCtasOpened.current.add(id);
        track('ai_cta_opened', { id });
      }
    },
    [track],
  );

  const markRoadmapClicked = useCallback(() => {
    roadmapClicked.current = true;
    track('roadmap_cta_clicked');
  }, [track]);

  const submitContact = useCallback(
    (details: ContactDetails) => {
      contactRef.current = details;
      track('contact_submitted', { hasPhone: !!details.phone });
    },
    [track],
  );

  const registerScroller = useCallback((el: HTMLElement | null) => {
    scrollerRef.current = el;
  }, []);

  const registerScreenView = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setMaxScreenSeen((m) => (index > m ? index : m));
      track('screen_viewed', { index });
    },
    [track],
  );

  const goTo = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const target = scroller.querySelector<HTMLElement>(`[data-screen-index="${index}"]`);
    if (!target) return;
    // Instant + deterministic. CSS smooth-scroll fights mandatory snap and made
    // keyboard Home/End/Arrow jumps take ~3s; export QA needs exact positioning.
    // Deck advances horizontally (left to right), so align on the inline axis.
    target.scrollIntoView({ behavior: 'auto', inline: 'start', block: 'nearest' });
  }, []);

  const next = useCallback(() => goTo(Math.min(currentIndex + 1, total - 1)), [currentIndex, total, goTo]);
  const prev = useCallback(() => goTo(Math.max(currentIndex - 1, 0)), [currentIndex, goTo]);
  const setTotal = useCallback((n: number) => setTotalState(n), []);

  const lead: LeadContext = useMemo(
    () => ({
      familiarity: setupComplete ? setup.familiarity : null,
      category: setupComplete ? setup.category : null,
      growth_priority: setupComplete ? setup.growth_priority : null,
      screens_completed: maxScreenSeen + 1,
      drawers_opened: Array.from(drawersOpened.current),
      ai_ctas_opened: Array.from(aiCtasOpened.current),
      roadmap_cta_clicked: roadmapClicked.current,
      setup_completed: setupComplete,
      contact: contactRef.current,
      timestamp: new Date().toISOString(),
      source_url: typeof window !== 'undefined' ? window.location.href : '',
    }),
    [setup, setupComplete, maxScreenSeen],
  );

  // keep screenEls referenced for potential future per-screen measurement
  void screenEls;

  const value: AppState = {
    setup,
    setupComplete,
    setSetupValue,
    completeSetup,
    lead,
    markDrawerOpened,
    markAiCtaOpened,
    markRoadmapClicked,
    submitContact,
    currentIndex,
    total,
    setTotal,
    registerScroller,
    registerScreenView,
    goTo,
    next,
    prev,
    track,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
