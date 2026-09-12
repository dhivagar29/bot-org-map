import { agents, sections, type Agent, type Section, type SectionId } from "@/data/org";

export const deskSections: Section[] = sections.filter(
  (section) => section.id !== "leadership",
);

export const rootAgent: Agent =
  agents.find((agent) => agent.pinned || agent.reportsTo === null) ?? agents[0];

const agentById = new Map(agents.map((agent) => [agent.id, agent]));
const sectionById = new Map(sections.map((section) => [section.id, section]));

export function getAgent(id: string): Agent | undefined {
  return agentById.get(id);
}

export function getSection(id: SectionId): Section | undefined {
  return sectionById.get(id);
}

export function getManager(agent: Agent): Agent | undefined {
  return agent.reportsTo ? agentById.get(agent.reportsTo) : undefined;
}

export function getInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function agentSearchText(agent: Agent): string {
  const section = sectionById.get(agent.section);
  return [
    agent.name,
    agent.title,
    agent.job,
    agent.persona ?? "",
    section?.name ?? "",
    getManager(agent)?.name ?? "root",
  ]
    .join(" ")
    .toLowerCase();
}

export function matchesQuery(agent: Agent, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return agentSearchText(agent).includes(needle);
}

export function filterRoster(query: string, sectionId: SectionId | "all"): Agent[] {
  return agents.filter((agent) => {
    const sectionOk = sectionId === "all" || agent.section === sectionId;
    return sectionOk && matchesQuery(agent, query);
  });
}

export function agentsInSection(sectionId: SectionId): Agent[] {
  return agents.filter((agent) => agent.section === sectionId);
}

export const rosterCounts = {
  agents: agents.length,
  desks: deskSections.length,
} as const;
