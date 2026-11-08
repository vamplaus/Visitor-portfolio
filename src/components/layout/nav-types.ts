import type { EmblemId } from "@/content/types";

/** A localized, ready-to-render navigation entry (built on the server). */
export interface NavEntry {
  id: string;
  numeral: string;
  title: string;
  kicker: string;
  href: string;
  emblem: EmblemId | null;
}

export interface IndexLabels {
  title: string;
  nav: string;
  fondsCount: string;
  close: string;
  keys: string;
  keyTab: string;
  keyEnter: string;
  keyEsc: string;
  archive: string;
  tagline: string;
  version: string;
}

export interface BarLabels {
  home: string;
  subtitle: string;
  location: string;
  index: string;
  localTime: string;
  language: string;
}
