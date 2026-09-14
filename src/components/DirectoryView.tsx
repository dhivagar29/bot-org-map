import type { Agent } from "@/data/org";
import { sections } from "@/data/org";
import { AgentCard } from "@/components/AgentCard";
export function DirectoryView({visible, selectedId, onSelect}: {visible: Agent[]; selectedId: string | null; onSelect: (id: string) => void}) {
  return <div className="directory">{sections.map(section => {
    const members = visible.filter(agent => agent.section === section.id);
    if (!members.length) return null;
    return <section key={section.id} aria-labelledby={`directory-${section.id}`}><header><h2 id={`directory-${section.id}`} style={{color:section.accent}}>{section.name}</h2><span>{members.length} {members.length === 1 ? "agent" : "agents"}</span><p>{section.blurb}</p></header><div className="directory-grid">{members.map(agent => <AgentCard key={agent.id} agent={agent} section={section} selected={selectedId === agent.id} onSelect={onSelect} detailed />)}</div></section>;
  })}</div>;
}
