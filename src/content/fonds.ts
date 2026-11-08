import type { Fond, FondId } from "./types";

/**
 * The registry of fonds. Order here is shelf order everywhere:
 * the home catalogue, the index dialog, the footer and the prev/next pager.
 *
 * To open a fond in Stage 2: build its page in `src/app/<id>/page.tsx`
 * and switch `status` to "open". Nothing else needs to change.
 */
export const fonds = [
  {
    id: "identity",
    numeral: "I",
    title: "Identity",
    href: "/identity",
    code: "VMP·ID",
    kicker: "Who keeps this archive",
    description:
      "The archivist: a teacher of informatics and programming. Biography, fields of work and the questions that connect them.",
    holdings: ["Biography", "Fields of work", "Principles", "Timeline"],
    character: "Dossier — an editorial portrait in serif, with marginal notes.",
    emblem: "portal",
    status: "in-preparation",
  },
  {
    id: "laboratory",
    numeral: "II",
    title: "Laboratory",
    href: "/laboratory",
    code: "VMP·LAB",
    kicker: "Code, machines and experiments",
    description:
      "Programming projects, experiments with artificial intelligence, Linux and automation. Each entry is filed as a specification sheet.",
    holdings: ["Programming projects", "AI experiments", "Linux & tooling", "Automation"],
    character: "Technical brutalism — spec sheets, monospace listings, a visible grid.",
    emblem: "construction",
    status: "in-preparation",
  },
  {
    id: "classroom",
    numeral: "III",
    title: "Classroom",
    href: "/classroom",
    code: "VMP·CLS",
    kicker: "Teaching as a craft",
    description:
      "Educational projects, teaching methods and interactive materials for informatics and programming.",
    holdings: ["Courses", "Methods", "Interactive materials", "Exercises"],
    character: "Exercise book — ruled lines, numbered steps, diagrams in the margin.",
    emblem: "ruled",
    status: "in-preparation",
  },
  {
    id: "forge",
    numeral: "IV",
    title: "Forge",
    href: "/forge",
    code: "VMP·FRG",
    kicker: "Games, worlds and forms",
    description:
      "Game projects in Godot, 3D modelling in Blender, characters and concept art — the workshop where things take shape.",
    holdings: ["Game projects", "Blender models", "Characters", "Concept art"],
    character: "Workshop — wireframes, viewport frames, crop marks around every image.",
    emblem: "cube",
    status: "in-preparation",
  },
  {
    id: "mind",
    numeral: "V",
    title: "Mind",
    href: "/mind",
    code: "VMP·MND",
    kicker: "History, philosophy, literature",
    description:
      "The intellectual hinterland: history, philosophy, literature and visual art — what is read, studied and returned to.",
    holdings: ["Reading list", "History", "Philosophy", "Literature & art"],
    character: "Library — Gothic serif, a card catalogue, long quotations.",
    emblem: "rose",
    status: "in-preparation",
  },
  {
    id: "journal",
    numeral: "VI",
    title: "Journal",
    href: "/journal",
    code: "VMP·JRN",
    kicker: "A garden of notes",
    description:
      "A digital garden of notes, reflections and research. Entries grow over time and link to each other.",
    holdings: ["Notes", "Essays", "Research logs", "Links between ideas"],
    character: "Garden — notes marked by maturity, connected by backlinks.",
    emblem: "branch",
    status: "in-preparation",
  },
  {
    id: "contact",
    numeral: "VII",
    title: "Contact",
    href: "/contact",
    code: "VMP·COR",
    kicker: "Correspondence",
    description: "How to reach the archivist: e-mail and social networks.",
    holdings: ["E-mail", "Social networks", "Code repositories"],
    character: "Letter — a quiet page, set like correspondence.",
    emblem: "letter",
    status: "in-preparation",
  },
] as const satisfies readonly Fond[];

export function getFond(id: FondId): Fond {
  const fond = fonds.find((f) => f.id === id);
  if (!fond) throw new Error(`Unknown fond: ${id}`);
  return fond;
}

/** Neighbours on the shelf, for the prev/next pager. */
export function getNeighbours(id: FondId): { prev: Fond | null; next: Fond | null } {
  const i = fonds.findIndex((f) => f.id === id);
  return {
    prev: i > 0 ? fonds[i - 1] : null,
    next: i < fonds.length - 1 ? fonds[i + 1] : null,
  };
}

/** Find the fond that owns a pathname, e.g. "/forge/some-entry" → forge. */
export function fondForPath(pathname: string): Fond | null {
  const segment = pathname.split("/")[1] ?? "";
  return fonds.find((f) => f.id === segment) ?? null;
}
