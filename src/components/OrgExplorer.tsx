"use client";

import { useEffect, useState } from "react";
import { AgentPanel } from "@/components/AgentPanel";
import { DirectoryView } from "@/components/DirectoryView";
import { OrgMap } from "@/components/OrgMap";
import { type SectionId } from "@/data/org";
import { agentsInSection, deskSections, filterRoster, getAgent, getManager, getSection, rosterCounts } from "@/lib/org";

export function OrgExplorer() {
  const [query, setQuery] = useState("");
  const [sectionId, setSectionId] = useState<SectionId | "all">("all");
  const [view, setView] = useState<"map" | "directory">("map");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const visible = filterRoster(query, sectionId);
  const selected = selectedId ? getAgent(selectedId) : undefined;
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {if(event.key === "Escape") setSelectedId(null);};
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  function reset() {setQuery(""); setSectionId("all");}
  return <section id="explorer" className="explorer" aria-label="Interactive org explorer">
    <div className="explorer-top"><div className="view-switch" role="group" aria-label="Org view">
      <button aria-pressed={view === "map"} onClick={() => setView("map")}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 7v4M4 14v-3h12v3M7 3h6v4H7zM2 14h4v4H2zM8 14h4v4H8zM14 14h4v4h-4z" /></svg>Org map</button>
      <button aria-pressed={view === "directory"} onClick={() => setView("directory")}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 4h3v3H3zM9 5h8M3 12h3v3H3zM9 13h8" /></svg>Directory</button>
    </div><label className="search"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8" cy="8" r="5"/><path d="m12 12 5 5"/></svg><span className="sr-only">Search the org</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Find a name, role, or persona…" /></label></div>
    <div className="filter-row"><span className="filter-label">DESKS</span><div className="chips" role="group" aria-label="Filter by desk"><button aria-pressed={sectionId === "all"} onClick={() => setSectionId("all")}>All desks <span>{rosterCounts.agents}</span></button>{deskSections.map(section => <button key={section.id} aria-pressed={sectionId === section.id} onClick={() => setSectionId(section.id)}><i style={{background:section.accent}} />{section.name}<span>{agentsInSection(section.id).length}</span></button>)}</div></div>
    <div className="view-meta"><p aria-live="polite">{visible.length} of {rosterCounts.agents} agents <span>/</span> {sectionId === "all" ? "The full picture" : getSection(sectionId)?.name}</p><span>{view === "map" ? "FOLLOW THE LINES. MEET THE TEAM." : "THE CAST, DESK BY DESK."}</span></div>
    {visible.length === 0 ? <div className="empty-state"><span aria-hidden="true">◎</span><h2>No one by that name.</h2><p>Try a different name, role, or desk.</p><button onClick={reset}>Reset filters ↗</button></div> : view === "map" ? <OrgMap visibleIds={new Set(visible.map(agent => agent.id))} selectedId={selectedId} onSelect={setSelectedId} /> : <DirectoryView visible={visible} selectedId={selectedId} onSelect={setSelectedId} />}
    <div className="explorer-bottom"><span><i /> Select any agent to open their personnel file</span><span>{view === "map" ? "SCROLL TO EXPLORE ↔" : "SIX DESKS. SHARED PURPOSE."}</span></div>
    {selected && <AgentPanel agent={selected} section={getSection(selected.section)!} managerName={getManager(selected)?.name ?? "Root · Chief of Staff"} onClose={() => setSelectedId(null)} />}
  </section>;
}
