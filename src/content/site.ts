import { placeholder, type L, type Maybe } from "./types";

/**
 * Site-wide facts. Only what the archivist has stated is filled in;
 * everything else is an explicit placeholder until they provide it.
 * Interface strings (titles, descriptions) live in src/i18n/dictionaries.
 */
export const site = {
  name: "VAMPLAUS",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Year the archive was opened. */
  opened: 2026,
  version: "0.2.0",

  archivist: {
    handle: "VAMPLAUS",
    role: {
      en: "Teacher of informatics and programming",
      ru: "Преподаватель информатики и программирования",
    } satisfies L,
    name: placeholder({ en: "Full name", ru: "Полное имя" }) as Maybe<string>,
    location: placeholder({ en: "City / country", ru: "Город / страна" }) as Maybe<L>,
  },

  /** Fields named by the archivist. Used for metadata keywords. */
  keywords: [
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
