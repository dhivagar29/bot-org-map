import type { CSSProperties } from "react";
import { AgentCard } from "@/components/AgentCard";
import { agentsInSection, deskSections, getSection, rootAgent } from "@/lib/org";

export function OrgMap({visibleIds, selectedId, onSelect}: {
  visibleIds: Set<string>; selectedId: string | null; onSelect: (id: string) => void;
}) {
  return <div className="map-scroll" tabIndex={0} role="region" aria-label="Organization map. Scroll horizontally to explore all six desks.">
    <div className="map-canvas">
      <div className="map-annotation"><span className="tiny-cross">+</span> THE CHAIN OF COMMAND<br /><span>Every desk. One direction.</span></div>
      <div className="map-key"><span /> REPORTING LINE</div>
      <div className="root-node"><p className="root-label">AT THE HELM</p><AgentCard agent={rootAgent} section={getSection(rootAgent.section)!} selected={selectedId === rootAgent.id} onSelect={onSelect} /><span className="root-caption">CHIEF OF STAFF · ALL DESKS</span></div>
      <div className="root-stem" aria-hidden="true" />
      <div className="desk-grid">
        {deskSections.map((section, index) => {
          const members = agentsInSection(section.id);
          return <section className="desk-lane" key={section.id} style={{"--accent": section.accent} as CSSProperties} aria-labelledby={`map-${section.id}`}>
            <div className="desk-stem" aria-hidden="true" /><header className="desk-heading"><span className="desk-number">0{index+1}</span><h2 id={`map-${section.id}`}>{section.name}</h2><span className="desk-count">{members.length.toString().padStart(2,"0")}</span></header>
            <p className="desk-description">{section.blurb}</p>
            <ul>{members.map(agent => <li key={agent.id}><AgentCard agent={agent} section={section} selected={agent.id === selectedId} dimmed={!visibleIds.has(agent.id)} onSelect={onSelect} /></li>)}</ul>
          </section>;
        })}
      </div>
      <div className="canvas-end"><span>END OF ROSTER</span><span aria-hidden="true">+</span></div>
    </div>
  </div>;
}
