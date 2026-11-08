import { placeholder, type Maybe } from "./types";

/**
 * Site-wide facts. Only what the archivist has stated is filled in;
 * everything else is an explicit placeholder until they provide it.
 */
export const site = {
  name: "VAMPLAUS",
  title: "VAMPLAUS — The Digital Archive",
  tagline: { before: "Between", logic: "Logic", joint: "and", imagination: "Imagination" },
  taglineText: "Between Logic and Imagination",
  description:
    "A personal digital archive of code, teaching, games and ideas, kept by a teacher of informatics and programming.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  /** Year the archive was opened. */
  opened: 2026,
  version: "0.1.0",
  stage: "Stage 1 — Foundation",

  archivist: {
    handle: "VAMPLAUS",
    role: "Teacher of informatics and programming",
    name: placeholder("Full name", "Leave as a placeholder to stay anonymous.") as Maybe<string>,
    location: placeholder("City / country") as Maybe<string>,
  },

  /** Fields named by the archivist. Used for metadata and the preface. */
  fields: [
    "artificial intelligence",
    "Python",
    "Linux",
    "game development",
    "3D modelling",
    "history",
    "philosophy",
    "literature",
    "visual art",
  ],
} as const;

export type Site = typeof site;
