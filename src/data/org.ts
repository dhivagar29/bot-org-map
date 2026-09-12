/**
 * Living roster for Dhivagar's Grok Bot team.
 *
 * Edit this file to add, remove, or retitle agents.
 * Public slugs only — no emails, phones, private IDs, or tokens.
 *
 * `reportsTo` is an agent `id`. Doug is the root (`reportsTo: null`).
 */

export type SectionId =
  | "leadership"
  | "office-of-don"
  | "tech"
  | "x"
  | "digital"
  | "finance"
  | "family";

export type Section = {
  id: SectionId;
  name: string;
  blurb: string;
  /** CSS color used for accents. Keep contrast on the dark page. */
  accent: string;
};

export type Agent = {
  id: string;
  name: string;
  title: string;
  job: string;
  reportsTo: string | null;
  section: SectionId;
  persona?: string;
  pinned?: boolean;
};

export const sections: Section[] = [
  {
    id: "leadership",
    name: "Leadership",
    blurb: "Chief of Staff. Coordinates the bot org.",
    accent: "#e8c37a",
  },
  {
    id: "office-of-don",
    name: "Office of Don",
    blurb: "Advisors and operators around the desk.",
    accent: "#f0b27a",
  },
  {
    id: "tech",
    name: "Tech",
    blurb: "Build, review, security, and the stack.",
    accent: "#7dd3e8",
  },
  {
    id: "x",
    name: "X",
    blurb: "Publishing, ranking, and relationship maps.",
    accent: "#93b4ff",
  },
  {
    id: "digital",
    name: "Digital",
    blurb: "LinkedIn, media, career, and the current job.",
    accent: "#d4a0ff",
  },
  {
    id: "finance",
    name: "Finance",
    blurb: "Banking questions, closing, and visa counsel.",
    accent: "#7ee0b0",
  },
  {
    id: "family",
    name: "Family",
    blurb: "Planning, Rocky, and health.",
    accent: "#f3a6b8",
  },
];

export const agents: Agent[] = [
  {
    id: "doug",
    name: "Doug",
    title: "Chief of Staff",
    job: "Coordinates the bot org.",
    reportsTo: null,
    section: "leadership",
    pinned: true,
  },
  {
    id: "logan",
    name: "Logan",
    title: "Chief Bot Advisor",
    job: "Advises on bot org only; does not run the team.",
    reportsTo: "doug",
    section: "office-of-don",
    persona: "Logan Roy (Succession)",
  },
  {
    id: "joan",
    name: "Joan",
    title: "Executive Assistant",
    job: "Owns Dhivagar's personal to-do list.",
    reportsTo: "doug",
    section: "office-of-don",
    persona: "Joan Harris (Mad Men)",
  },
  {
    id: "donna",
    name: "Donna",
    title: "Secretary",
    job: "Owns work to-do (IBM/Nationwide) and AgentMail.",
    reportsTo: "doug",
    section: "office-of-don",
    persona: "Donna Paulsen",
  },
  {
    id: "dwight",
    name: "Dwight",
    title: "Inbox",
    job: "Owns Gmail and the 3-21-0 inbox system.",
    reportsTo: "doug",
    section: "office-of-don",
  },
  {
    id: "richard",
    name: "Richard",
    title: "Builder",
    job: "Owns Claude CLI coding.",
    reportsTo: "doug",
    section: "tech",
    persona: "Richard Hendricks (Silicon Valley)",
  },
  {
    id: "gilfoyle",
    name: "Gilfoyle",
    title: "Reviewer",
    job: "Reviews diffs/PRs; separates nits from blockers.",
    reportsTo: "doug",
    section: "tech",
  },
  {
    id: "barney",
    name: "Barney",
    title: "Programmer",
    job: "Owns Cursor agents + pstack (Cursor plugin).",
    reportsTo: "doug",
    section: "tech",
    persona: "Barney Stinson (HIMYM)",
  },
  {
    id: "elliot",
    name: "Elliot",
    title: "CISO",
    job: "Security.",
    reportsTo: "doug",
    section: "tech",
    persona: "Elliot Alderson (Mr. Robot)",
  },
  {
    id: "mafee",
    name: "Mafee",
    title: "Stack",
    job: "Principal DevSecOps / stack advice.",
    reportsTo: "doug",
    section: "tech",
    persona: "Dudley Mafee (Billions)",
  },
  {
    id: "coop",
    name: "Coop",
    title: "Clock",
    job: "Runs scheduled routines.",
    reportsTo: "doug",
    section: "tech",
    persona: "Andrew Cooper",
  },
  {
    id: "tom",
    name: "Tom",
    title: "Connector",
    job: "Connections/network work.",
    reportsTo: "doug",
    section: "tech",
    persona: "Tom Wambsgans (Succession)",
  },
  {
    id: "x-algo",
    name: "X Algo",
    title: "Ranking",
    job: "Helps decide when to quote, post, or wait using ranking signals.",
    reportsTo: "doug",
    section: "x",
  },
  {
    id: "connections",
    name: "Connections",
    title: "Maps",
    job: "Maps X following/mutuals by location into Notion.",
    reportsTo: "doug",
    section: "x",
  },
  {
    id: "gina",
    name: "Gina",
    title: "X",
    job: "Owns X (Twitter) account; drafts posts/replies.",
    reportsTo: "doug",
    section: "x",
  },
  {
    id: "karolina",
    name: "Karolina",
    title: "PR",
    job: "Public relations strategy.",
    reportsTo: "doug",
    section: "x",
    persona: "Karolina Novotney (Succession)",
  },
  {
    id: "amy",
    name: "Amy",
    title: "LinkedIn",
    job: "Owns LinkedIn; drafts in Dhivagar's voice.",
    reportsTo: "doug",
    section: "digital",
  },
  {
    id: "harry",
    name: "Harry",
    title: "Clips",
    job: "Cuts social-ready podcast highlights.",
    reportsTo: "doug",
    section: "digital",
    persona: "Harry Crane (Mad Men)",
  },
  {
    id: "roger",
    name: "Roger",
    title: "Art",
    job: "Owns AI image generation (was Stan).",
    reportsTo: "doug",
    section: "digital",
    persona: "Roger Sterling (Mad Men)",
  },
  {
    id: "pete",
    name: "Pete",
    title: "Franchise",
    job: "Franchise/business growth goal.",
    reportsTo: "doug",
    section: "digital",
    persona: "Pete Campbell (Mad Men)",
  },
  {
    id: "peggy",
    name: "Peggy",
    title: "Career",
    job: "Resumes and job applications.",
    reportsTo: "doug",
    section: "digital",
    persona: "Peggy Olson (Mad Men)",
  },
  {
    id: "jessica",
    name: "Jessica",
    title: "Firm",
    job: "Owns doing well in the current IBM/Nationwide job.",
    reportsTo: "doug",
    section: "digital",
    persona: "Jessica Pearson (Suits)",
  },
  {
    id: "taylor",
    name: "Taylor",
    title: "Finance",
    job: "Indian banking and financial-services questions.",
    reportsTo: "doug",
    section: "finance",
  },
  {
    id: "saul",
    name: "Saul",
    title: "Closer",
    job: "Gets yeses from companies/vendors/support.",
    reportsTo: "doug",
    section: "finance",
    persona: "Saul Goodman",
  },
  {
    id: "harvey",
    name: "Harvey",
    title: "Counsel",
    job: "H-1B and US visa questions.",
    reportsTo: "doug",
    section: "finance",
    persona: "Harvey Specter (Suits)",
  },
  {
    id: "leslie",
    name: "Leslie",
    title: "Planner",
    job: "Family-event planning.",
    reportsTo: "doug",
    section: "family",
  },
  {
    id: "hank",
    name: "Hank",
    title: "Rocky's trainer",
    job: "Owns care system for Rocky (beagle).",
    reportsTo: "doug",
    section: "family",
    persona: "Hank Schrader (Breaking Bad)",
  },
  {
    id: "wendy",
    name: "Wendy",
    title: "Health",
    job: "Org therapist for humans / health.",
    reportsTo: "doug",
    section: "family",
    persona: "Wendy Rhoades (Billions)",
  },
];
