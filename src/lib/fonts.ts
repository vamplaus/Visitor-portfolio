import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

/*
 * Three voices:
 *  - display  Cormorant Garamond — inscriptional capitals, the Gothic library
 *  - sans     IBM Plex Sans      — reading text, engineered and neutral
 *  - mono     IBM Plex Mono      — the machine: metadata, codes, the terminal
 *
 * Only Latin is preloaded; Cyrillic and other subsets are still served on
 * demand through unicode-range, so Russian text renders in the same faces.
 */

export const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-plex-sans",
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});
