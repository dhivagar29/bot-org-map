import type { CSSProperties } from "react";
import type { Agent, Section } from "@/data/org";
import { agentsInSection, deskSections, getInitials, rootAgent } from "@/lib/org";

type OrgMapProps = {
  visibleIds: Set<string>;
  selectedId: string | null;
  onSelect: (id: string) => void;
  getSection: (id: Agent["section"]) => Section;
};

function MapNode({
  agent,
  section,
  selected,
  dimmed,
  featured = false,
  onSelect,
}: {
  agent: Agent;
  section: Section;
  selected: boolean;
  dimmed: boolean;
  featured?: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(agent.id)}
      aria-pressed={selected}
      aria-label={`${agent.name}, ${agent.title}, ${section.name}`}
      className={`w-full rounded-xl border px-2.5 py-2 text-left transition duration-200 ${
        featured ? "min-w-[220px] px-4 py-3" : ""
      } ${
        selected
          ? "border-[color:var(--accent)] bg-white/8 shadow-[0_0_0_1px_var(--accent)]"
          : "border-white/10 bg-[#0c0f16]/90 hover:border-white/22 hover:bg-white/6"
      } ${dimmed ? "opacity-25" : "opacity-100"}`}
      style={{ "--accent": section.accent } as CSSProperties}
    >
      <div className="flex items-center gap-2">
        <span
          className={`grid shrink-0 place-items-center rounded-full font-medium text-[#07080c] ${
            featured ? "size-9 text-xs" : "size-7 text-[10px]"
          }`}
          style={{ background: section.accent }}
          aria-hidden
        >
          {getInitials(agent.name)}
        </span>
        <span className="min-w-0">
          <span
            className={`block truncate font-medium ${featured ? "text-base" : "text-[13px]"}`}
          >
            {agent.name}
          </span>
          <span className="block truncate text-[11px] text-muted">
            {agent.title}
          </span>
        </span>
      </div>
    </button>
  );
}

export function OrgMap({
  visibleIds,
  selectedId,
  onSelect,
  getSection,
}: OrgMapProps) {
  if (visibleIds.size === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/12 px-6 py-16 text-center">
        <p className="font-serif text-2xl">No agents match</p>
        <p className="mt-2 text-sm text-muted">
          Clear search or pick another section to redraw the map.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/8 bg-black/20 p-4 sm:p-6">
      <div className="flex justify-center">
        <MapNode
          agent={rootAgent}
          section={getSection(rootAgent.section)}
          selected={selectedId === rootAgent.id}
          dimmed={!visibleIds.has(rootAgent.id)}
          featured
          onSelect={onSelect}
        />
      </div>

      <div className="relative mx-auto mt-1 h-8 w-px bg-gradient-to-b from-[#e8c37a] to-white/20" />

      <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-color:rgba(255,255,255,0.2)_transparent]">
        <div className="min-w-[980px]">
          <div className="relative mx-[8.333%] h-px bg-white/18">
            <div className="absolute inset-x-0 top-0 flex justify-between">
              {deskSections.map((section) => (
                <span
                  key={section.id}
                  className="block h-3 w-px bg-white/18"
                  aria-hidden
                />
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-6 gap-3">
            {deskSections.map((section) => {
              const members = agentsInSection(section.id);
              const sectionHasMatch = members.some((agent) =>
                visibleIds.has(agent.id),
              );

              return (
                <div key={section.id} className="min-w-0">
                  <div
                    className={`rounded-lg px-2 py-1.5 text-center ${
                      sectionHasMatch ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    <p
                      className="text-[10px] font-medium uppercase tracking-[0.16em]"
                      style={{ color: section.accent }}
                    >
                      {section.name}
                    </p>
                  </div>
                  <ul className="mt-2 space-y-2">
                    {members.map((agent) => (
                      <li key={agent.id}>
                        <MapNode
                          agent={agent}
                          section={section}
                          selected={selectedId === agent.id}
                          dimmed={!visibleIds.has(agent.id)}
                          onSelect={onSelect}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
