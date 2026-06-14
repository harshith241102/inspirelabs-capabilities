import { Screen } from '../primitives/Screen';
import { DeckHeader, AdvanceCta, NetBox } from '../primitives/ui';
import { Reveal } from '../primitives/Reveal';
import { Icon } from '../primitives/icons';
import { FlowRail } from '../primitives/blocks';
import { useDrawer } from '../components/Drawer';
import { copy } from '../content/copy';

const stages = [
  { label: 'Define objective', detail: 'Agree the objective, scope, and KPIs.' },
  { label: 'Launch first activation path', detail: 'Start focused with one clear activation path.' },
  { label: 'Review and improve', detail: 'Review measurable traction and improve.' },
  { label: 'Expand the system', detail: 'Add surfaces, agents, and commitments as proof builds.' },
];

const gates = ['Objective agreed', 'Tracking live', 'First signal observed', 'Expansion path approved'];

export default function Screen33() {
  const c = copy[33];
  const drawer = useDrawer();

  return (
    <Screen index={33} tone="light" id="partnership-runs" label="How a long-term partnership runs">
      <DeckHeader eyebrow={c.eyebrow} title={c.headline} sub={c.subheadline} titleWide />
      <div className="s-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <FlowRail
            nodes={stages.map((s, i) => ({
              icon: (['target', 'rocket', 'refresh', 'network'] as const)[i],
              label: s.label,
              state: i === 0 ? 'active' : 'queued',
            }))}
            onNode={(i) =>
              drawer.open({
                id: `stage-${i}`,
                kind: 'roadmap',
                eyebrow: `Stage ${i + 1} of 4`,
                title: stages[i].label,
                sections: [
                  { heading: 'What happens', body: stages[i].detail },
                  { heading: 'Gate to move forward', body: gates[i] },
                  { heading: 'What not to assume', body: 'No invented calendar commitments and no fixed budget figures.' },
                ],
              })
            }
          />
          <Reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <span className="mini-cap" style={{ margin: 0 }}>Gated by evidence, not enthusiasm:</span>
            {gates.map((g, i) => (
              <span key={g} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span className="chip chip--accent">{g}</span>
                {i < gates.length - 1 && <Icon name="arrow" size={13} style={{ color: 'var(--c4)' }} />}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
      <footer className="s-footer-row">
        <NetBox>{c.support}</NetBox>
        <div className="cta-row">
          <AdvanceCta label={c.cta} to={34} />
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() =>
              drawer.open({
                id: 'first-activation-examples',
                kind: 'roadmap',
                eyebrow: 'Example only',
                title: 'Example first activation paths',
                sections: [
                  {
                    heading: 'A focused start could begin with',
                    items: [
                      'One commerce-intent surface and one promotional surface',
                      'One owned distribution asset with tracked actions',
                      'One partner or channel activation, scoped to the objective',
                    ],
                  },
                  {
                    heading: 'Example measurable commitments',
                    items: ['Objective', 'Activation scope', 'KPI definition', 'Tracking setup'],
                  },
                  { heading: 'Note', body: 'These are fixed examples. The tailored mix is built on the roadmap screen from your setup.' },
                ],
              })
            }
          >
            <Icon name="rocket" size={16} />
            Example first activation paths
          </button>
        </div>
      </footer>
    </Screen>
  );
}
