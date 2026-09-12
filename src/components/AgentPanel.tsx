import type { CSSProperties } from "react";
import type { Agent, Section } from "@/data/org";
import { getInitials } from "@/lib/org";

type AgentPanelProps = {
  agent: Agent;
  section: Section;
  managerName: string;
  onClose: () => void;
};

export function AgentPanel({
  agent,
  section,
  managerName,
  onClose,
}: AgentPanelProps) {
  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="agent-panel-title"
      className="rounded-2xl border border-white/10 bg-[var(--panel)] p-5 shadow-2xl shadow-black/40 backdrop-blur-xl"
      style={{ "--accent": section.accent } as CSSProperties}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className="grid size-12 place-items-center rounded-full text-sm font-medium text-[#07080c]"
            style={{ background: section.accent }}
            aria-hidden
          >
            {getInitials(agent.name)}
          </span>
          <div>
            <p
              className="text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{ color: section.accent }}
            >
              {section.name}
            </p>
            <h2
              id="agent-panel-title"
              className="mt-1 font-serif text-3xl leading-none"
            >
              {agent.name}
            </h2>
            <p className="mt-2 text-sm text-foreground/80">{agent.title}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted transition hover:border-white/25 hover:text-foreground"
        >
          Close
        </button>
      </div>

      <p className="mt-5 text-sm leading-6 text-muted">{agent.job}</p>

      <dl className="mt-5 grid gap-3 border-t border-white/8 pt-4 text-sm">
        <div className="flex justify-between gap-6">
          <dt className="text-foreground/45">Reports to</dt>
          <dd className="text-right">{managerName}</dd>
        </div>
        <div className="flex justify-between gap-6">
          <dt className="text-foreground/45">Section</dt>
          <dd className="text-right">{section.name}</dd>
        </div>
        {agent.persona ? (
          <div className="flex justify-between gap-6">
            <dt className="text-foreground/45">Persona</dt>
            <dd className="text-right italic text-foreground/75">
              {agent.persona}
            </dd>
          </div>
        ) : null}
        {agent.pinned ? (
          <div className="flex justify-between gap-6">
            <dt className="text-foreground/45">Role in map</dt>
            <dd className="text-right">Root / Chief of Staff</dd>
          </div>
        ) : null}
      </dl>
    </aside>
  );
}
