"use client";

import { useEffect, useMemo, useState } from "react";
import { AgentPanel } from "@/components/AgentPanel";
import { DirectoryView } from "@/components/DirectoryView";
import { OrgMap } from "@/components/OrgMap";
import { sections, type Agent, type SectionId } from "@/data/org";
import {
  filterRoster,
  getAgent,
  getManager,
  getSection,
  rosterCounts,
} from "@/lib/org";

type ViewMode = "map" | "directory";

const filterChips: Array<{ id: SectionId | "all"; label: string }> = [
  { id: "all", label: "All desks" },
  ...sections.map((section) => ({ id: section.id, label: section.name })),
];

export function OrgExplorer() {
  const [query, setQuery] = useState("");
  const [sectionId, setSectionId] = useState<SectionId | "all">("all");
  const [view, setView] = useState<ViewMode>("map");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(
    () => filterRoster(query, sectionId),
    [query, sectionId],
  );
  const visibleIds = useMemo(
    () => new Set(visible.map((agent) => agent.id)),
    [visible],
  );

  const selected =
    selectedId && visibleIds.has(selectedId) ? getAgent(selectedId) : undefined;
  const selectedSection = selected ? getSection(selected.section) : undefined;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function getManagerName(agent: Agent) {
    return getManager(agent)?.name ?? "—";
  }

  function handleSelect(id: string) {
    setSelectedId((current) => (current === id ? null : id));
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="block">
          <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/45">
            Search the org
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, title, job, or persona"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-foreground placeholder:text-foreground/30"
          />
        </label>

        <div
          className="flex rounded-2xl border border-white/10 bg-black/30 p-1"
          role="tablist"
          aria-label="Org view"
        >
          {(
            [
              ["map", "Map"],
              ["directory", "Directory"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={view === id}
              onClick={() => setView(id)}
              className={`min-w-28 rounded-xl px-4 py-2.5 text-sm transition ${
                view === id
                  ? "bg-white/10 text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by section">
        {filterChips.map((chip) => {
          const active = sectionId === chip.id;
          const accent =
            chip.id === "all"
              ? "#f4f1ea"
              : getSection(chip.id)?.accent ?? "#f4f1ea";
          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSectionId(chip.id)}
              className={`rounded-full border px-3 py-1.5 text-xs tracking-wide transition ${
                active
                  ? "border-transparent text-[#07080c]"
                  : "border-white/10 text-muted hover:border-white/25 hover:text-foreground"
              }`}
              style={active ? { background: accent } : undefined}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-muted" aria-live="polite">
        Showing {visible.length} of {rosterCounts.agents}
        {query.trim() ? ` for “${query.trim()}”` : ""}
        {sectionId !== "all" ? ` in ${getSection(sectionId)?.name}` : ""}.
      </p>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {view === "map" ? (
            <OrgMap
              visibleIds={visibleIds}
              selectedId={selectedId}
              onSelect={handleSelect}
              getSection={(id) => getSection(id)!}
            />
          ) : (
            <DirectoryView
              sections={sections}
              visible={visible}
              selectedId={selectedId}
              onSelect={handleSelect}
              getSection={(id) => getSection(id)!}
              getManagerName={getManagerName}
            />
          )}
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          {selected && selectedSection ? (
            <AgentPanel
              agent={selected}
              section={selectedSection}
              managerName={getManagerName(selected)}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-sm text-muted">
              Select an agent to see title, one-line job, reports-to, and
              persona.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
