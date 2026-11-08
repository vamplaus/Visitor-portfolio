/**
 * Content model of the archive.
 *
 * Components never hard-code content: they read typed records from
 * `src/content/*`. Adding a fond, a subject, a laboratory entry or a classroom
 * material means adding a record, not touching a component.
 *
 * Localizable fields are `L<…>` — one value per locale, checked by the compiler.
 */
import type { L } from "@/i18n/config";

export type { L };

/* ---------------------------------------------------------------------------
 * Placeholders
 * Missing facts are never invented. They are stored as explicit placeholders
 * and rendered as visibly unfinished catalogue slots.
 * ------------------------------------------------------------------------- */

export interface Placeholder {
  readonly kind: "placeholder";
  /** What is missing, e.g. "Full name". */
  readonly label: L;
}

/** A value that is either known, or an explicitly marked gap. */
export type Maybe<T> = T | Placeholder;

export function placeholder(label: L): Placeholder {
  return { kind: "placeholder", label };
}

export function isPlaceholder(value: unknown): value is Placeholder {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { kind?: unknown }).kind === "placeholder"
  );
}

/** An image the author supplies (portrait, avatar, screenshot). Files live in /public. */
export interface ImageRef {
  readonly src: string;
  readonly alt: L;
  readonly width: number;
  readonly height: number;
}

/* ---------------------------------------------------------------------------
 * Fonds — the seven sections of the archive
 * ------------------------------------------------------------------------- */

export type FondId =
  | "identity"
  | "laboratory"
  | "classroom"
  | "forge"
  | "mind"
  | "journal"
  | "contact";

/** Line emblems, one per fond. Drawn in components/ui/emblem.tsx. */
export type EmblemId =
  | "portal"
  | "construction"
  | "ruled"
  | "cube"
  | "rose"
  | "branch"
  | "letter";

export type FondStatus = "open" | "in-preparation";

export interface Fond {
  readonly id: FondId;
  /** Roman numeral used as the fond's shelf mark. */
  readonly numeral: string;
  readonly title: L;
  /** Locale-free path; components add the /[lang] prefix. */
  readonly href: `/${string}`;
  /** Catalogue code, printed in monospace. */
  readonly code: string;
  readonly kicker: L;
  readonly description: L;
  /** Categories of holdings. Categories, not invented items. */
  readonly holdings: L<readonly string[]>;
  /** The fond's own visual character inside the shared system. */
  readonly character: L;
  readonly emblem: EmblemId;
  readonly status: FondStatus;
}

/* ---------------------------------------------------------------------------
 * Subject index — the back-of-book index on the home page
 * ------------------------------------------------------------------------- */

export interface Subject {
  readonly term: L;
  readonly fonds: readonly FondId[];
  /** Which half of the motto the subject belongs to (used by Identity). */
  readonly side?: "logic" | "imagination";
}

/* ---------------------------------------------------------------------------
 * Laboratory — entries filed as specification sheets
 * ------------------------------------------------------------------------- */

export type LabDomain = "ai" | "python" | "linux" | "automation" | "web";
export type EntryStatus = "active" | "complete" | "paused" | "archived";

export interface CodeSpecimen {
  /** Path of the file in the repository the excerpt was taken from. */
  readonly file: string;
  readonly language: "ts" | "tsx" | "py" | "sh" | "css";
  readonly caption: L;
  /** Verbatim excerpt. Keep it in sync with the file it quotes. */
  readonly code: string;
}

export interface LabEntry {
  readonly slug: string;
  /** Register code: VMP-LAB-001 … */
  readonly code: string;
  readonly title: L;
  readonly summary: L;
  readonly domains: readonly LabDomain[];
  readonly status: EntryStatus;
  readonly since: Maybe<number>;
  readonly stack: readonly string[];
  readonly objective: L;
  /** Protocol: the method, step by step. */
  readonly protocol: L<readonly string[]>;
  /** Key of a technical diagram, drawn in components/laboratory/schemas. */
  readonly schema?: "archive-pipeline";
  readonly specimen?: CodeSpecimen;
  readonly observations?: L<readonly string[]>;
  readonly links: readonly { readonly label: L; readonly href: Maybe<string> }[];
}

/** A direction the laboratory is set up for, with no entry yet. */
export interface LabSlot {
  readonly code: string;
  readonly title: L;
  readonly domains: readonly LabDomain[];
}

/* ---------------------------------------------------------------------------
 * Classroom — the teacher's working notebook
 * ------------------------------------------------------------------------- */

export type ClassroomSection = "courses" | "methods" | "materials" | "exercises";

export interface ClassroomEntry {
  readonly slug: string;
  readonly code: string;
  readonly section: ClassroomSection;
  readonly title: L;
  readonly summary: L;
  readonly topic: L;
  readonly level: L;
  readonly format: L;
  readonly goal: L;
  readonly steps: L<readonly string[]>;
  readonly questions?: L<readonly string[]>;
  /** Key of an interactive component in components/classroom/interactive. */
  readonly interactive?: "bit-board";
  /** True for materials prepared with the archive as an example of the format. */
  readonly specimen?: boolean;
}
