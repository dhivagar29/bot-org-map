import Link from "next/link";
import { OrgExplorer } from "@/components/OrgExplorer";
import { rosterCounts } from "@/lib/org";

export default function Home() {
  return <>
    <a className="skip-link" href="#explorer">Skip to org explorer</a>
    <header className="masthead">
      <Link href="/" className="wordmark"><span className="brand-mark" aria-hidden="true">d.</span> DON’S <span>ORG MAP</span></Link>
      <div className="masthead-right"><span className="status-dot" /> THE GROK BOT TEAM <span className="edition">PUBLIC EDITION / 01</span></div>
    </header>
    <main>
      <section className="hero">
        <div><p className="eyebrow"><span /> DHIVAGAR’S EXTENDED UNIVERSE</p>
          <h1>A cast of characters.<br /><em>A team with purpose.</em></h1>
          <p className="hero-copy">Familiar names. Very real jobs. Meet the specialists behind the scenes,<br className="desktop-break" /> with Doug keeping the whole operation in motion.</p>
        </div>
        <div className="hero-stats" aria-label="Roster summary">
          <div><strong>{rosterCounts.agents.toString().padStart(2,"0")}</strong><span>AGENTS</span></div>
          <div><strong>{rosterCounts.desks.toString().padStart(2,"0")}</strong><span>DESKS</span></div>
          <p>ONE CONNECTED OPERATION <span aria-hidden="true">↙</span></p>
        </div>
      </section>
      <OrgExplorer />
    </main>
    <footer><span className="footer-brand">Don’s Org Map <span>/</span> Dhivagar’s Grok Bot team</span><span>A little television. A lot of teamwork.</span></footer>
  </>;
}
