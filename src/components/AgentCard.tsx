import type { CSSProperties } from "react";
import type { Agent, Section } from "@/data/org";
import { getInitials } from "@/lib/org";

export function AgentCard({agent, section, selected = false, dimmed = false, onSelect, detailed = false}: {
  agent: Agent; section: Section; selected?: boolean; dimmed?: boolean;
  onSelect: (id: string) => void; detailed?: boolean;
}) {
  return <button type="button" className={`agent-card ${selected ? "selected" : ""} ${dimmed ? "dimmed" : ""} ${detailed ? "detailed" : ""}`}
    style={{"--accent": section.accent} as CSSProperties} onClick={() => onSelect(agent.id)}
    aria-pressed={selected} aria-label={`${agent.name}, ${agent.title}, ${section.name}`}>
    <span className="avatar" aria-hidden="true">{getInitials(agent.name)}</span>
    <span className="agent-summary"><strong>{agent.name}</strong><span>{agent.title}</span></span>
    <span className="card-arrow" aria-hidden="true">↗</span>
    {detailed && <span className="card-job">{agent.job}</span>}
  </button>;
}
