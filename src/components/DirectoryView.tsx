import type { Agent, Section, SectionId } from "@/data/org";
import { AgentCard } from "@/components/AgentCard";

type DirectoryViewProps = {
  sections: Section[];
  visible: Agent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  getSection: (id: SectionId) => Section;
  getManagerName: (agent: Agent) => string;
};

export function DirectoryView({
  sections,
  visible,
  selectedId,
  onSelect,
  getSection,
  getManagerName,
}: DirectoryViewProps) {
  const visibleIds = new Set(visible.map((agent) => agent.id));

  if (visible.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/12 px-6 py-16 text-center">
        <p className="font-serif text-2xl">No agents match</p>
        <p className="mt-2 text-sm text-muted">
          Try another name, title, or section.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {sections.map((section) => {
        const members = visible.filter((agent) => agent.section === section.id);
        if (members.length === 0) return null;

        return (
          <section key={section.id} aria-labelledby={`desk-${section.id}`}>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2
                  id={`desk-${section.id}`}
                  className="font-serif text-3xl"
                  style={{ color: section.accent }}
                >
                  {section.name}
                </h2>
                <p className="mt-1 text-sm text-muted">{section.blurb}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-foreground/40">
                {members.length} {members.length === 1 ? "agent" : "agents"}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {members.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  section={getSection(agent.section)}
                  managerName={getManagerName(agent)}
                  selected={selectedId === agent.id}
                  dimmed={Boolean(selectedId) && !visibleIds.has(agent.id)}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
