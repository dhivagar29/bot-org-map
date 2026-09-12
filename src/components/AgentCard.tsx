import type { CSSProperties } from "react";
import type { Agent, Section } from "@/data/org";
import { getInitials } from "@/lib/org";

type AgentCardProps = {
  agent: Agent;
  section: Section;
  managerName: string;
  selected?: boolean;
  dimmed?: boolean;
  onSelect: (id: string) => void;
};

export function AgentCard({
  agent,
  section,
  managerName,
  selected = false,
  dimmed = false,
  onSelect,
}: AgentCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(agent.id)}
      aria-pressed={selected}
      className={`group w-full rounded-2xl border bg-[var(--panel)] p-4 text-left backdrop-blur-md transition duration-200 ${
        selected
          ? "border-[color:var(--accent)] shadow-[0_0_0_1px_var(--accent)]"
          : "border-white/8 hover:border-white/18 hover:-translate-y-0.5"
      } ${dimmed ? "opacity-30" : "opacity-100"}`}
      style={{ "--accent": section.accent } as CSSProperties}
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-medium tracking-wide text-[#07080c]"
          style={{ background: section.accent }}
          aria-hidden
        >
          {getInitials(agent.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className="text-[11px] font-medium uppercase tracking-[0.16em]"
            style={{ color: section.accent }}
          >
            {section.name}
          </p>
          <h3 className="mt-1 font-serif text-2xl leading-none text-foreground">
            {agent.name}
          </h3>
          <p className="mt-1 text-sm text-foreground/80">{agent.title}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{agent.job}</p>
      <dl className="mt-4 space-y-1 text-xs text-muted">
        <div className="flex gap-2">
          <dt className="shrink-0 text-foreground/45">Reports to</dt>
          <dd className="text-foreground/80">{managerName}</dd>
        </div>
        {agent.persona ? (
          <div className="flex gap-2">
            <dt className="shrink-0 text-foreground/45">Persona</dt>
            <dd className="italic text-foreground/70">{agent.persona}</dd>
          </div>
        ) : null}
      </dl>
    </button>
  );
}
