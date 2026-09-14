import { describe, expect, it } from "vitest";
import { agents } from "@/data/org";
import {
  agentsInSection,
  deskSections,
  filterRoster,
  getAgent,
  getManager,
  rootAgent,
  rosterCounts,
} from "@/lib/org";

describe("org roster", () => {
  it("pins Doug as root", () => {
    expect(rootAgent.id).toBe("doug");
    expect(rootAgent.reportsTo).toBeNull();
  });

  it("includes Whiterose and Mike on Tech", () => {
    expect(getAgent("whiterose")?.section).toBe("tech");
    expect(getAgent("mike")?.title).toBe("Investigator");
    expect(agentsInSection("tech").some((a) => a.id === "whiterose")).toBe(true);
  });

  it("keeps six desks under Doug", () => {
    expect(deskSections).toHaveLength(6);
    expect(rosterCounts.desks).toBe(6);
    for (const agent of agents) {
      if (agent.id === "doug") continue;
      expect(agent.reportsTo).toBe("doug");
      expect(getManager(agent)?.id).toBe("doug");
    }
  });

  it("filters by query and desk", () => {
    expect(filterRoster("whiterose", "all").map((a) => a.id)).toEqual(["whiterose"]);
    expect(filterRoster("", "family").every((a) => a.section === "family")).toBe(true);
  });
});
