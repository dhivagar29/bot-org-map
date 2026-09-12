import { OrgExplorer } from "@/components/OrgExplorer";
import { deskSections } from "@/lib/org";
import { agents } from "@/data/org";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden />
      <header className="relative z-10 border-b border-white/8">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/55">
            Grok Bot Team
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/35">
            Living org
          </p>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <section className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#e8c37a]">
            Chief of Staff at the root
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] sm:text-7xl">
            The org map
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Interactive directory of Dhivagar&apos;s Grok Bot team. Doug
            coordinates. Every other agent reports to Doug.
          </p>
          <p className="mt-6 text-sm text-foreground/50">
            {agents.length} agents · {deskSections.length} desks · public
            roster only
          </p>
        </section>

        <section className="mt-12" aria-label="Interactive org">
          <OrgExplorer />
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-foreground/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>Roster lives in one file: src/data/org.ts</p>
          <p>No emails, phones, private IDs, or tokens.</p>
        </div>
      </footer>
    </>
  );
}
