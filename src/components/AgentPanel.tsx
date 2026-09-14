import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { Agent, Section } from "@/data/org";
import { getInitials } from "@/lib/org";

export function AgentPanel({agent, section, managerName, onClose}: {
  agent: Agent; section: Section; managerName: string; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const node = dialog.current; node?.showModal(); return () => node?.close(); }, []);
  return <dialog ref={dialog} className="agent-panel" style={{"--accent": section.accent} as CSSProperties} aria-labelledby="agent-panel-title" onCancel={onClose} onClick={event => {if(event.target === event.currentTarget) onClose();}}>
    <div className="panel-content"><header><span className="eyebrow">PERSONNEL FILE / {section.name}</span><button className="close-button" onClick={onClose} aria-label="Close agent details" autoFocus>×</button></header>
      <div className="panel-portrait" aria-hidden="true"><span>{getInitials(agent.name)}</span><i>GROK BOT TEAM</i></div>
      <p className="eyebrow panel-desk">{section.name}</p><h2 id="agent-panel-title">{agent.name}</h2><p className="panel-title">{agent.title}</p>
      <div className="panel-job"><span className="eyebrow">THE ASSIGNMENT</span><p>{agent.job}</p></div>
      <dl><div><dt>Reports to</dt><dd>{managerName}</dd></div><div><dt>Desk</dt><dd>{section.name}</dd></div><div><dt>Persona</dt><dd>{agent.persona ?? "An original member of the cast."}</dd></div></dl>
      <p className="panel-foot">FAMILIAR CHARACTER. DEDICATED SPECIALIST.<span>ESC TO CLOSE</span></p>
    </div>
  </dialog>;
}
