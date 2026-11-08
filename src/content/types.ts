/**
 * Content model of the archive.
 *
 * Components never hard-code content: they read typed records from
 * `src/content/*`. Adding a fond, a subject or (from Stage 2) a project or a
 * note means adding a record, not touching a component.
 */

/* ---------------------------------------------------------------------------
 * Placeholders
 * Missing facts are never invented. They are stored as explicit placeholders
 * and rendered as visibly unfinished catalogue slots.
 * ------------------------------------------------------------------------- */

export interface Placeholder {
  readonly kind: "placeholder";
  /** What is missing, e.g. "Full name". */
  readonly label: string;
  /** Optional hint for the archivist about what belongs here. */
  readonly note?: string;
}

/** A value that is either known, or an explicitly marked gap. */
export type Maybe<T> = T | Placeholder;

export function placeholder(label: string, note?: string): Placeholder {
  return { kind: "placeholder", label, note };
}

export function isPlaceholder(value: unknown): value is Placeholder {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { kind?: unknown }).kind === "placeholder"
  );
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
  readonly title: string;
  readonly href: `/${string}`;
  /** Catalogue code, printed in monospace. */
  readonly code: string;
  /** One line under the title. */
  readonly kicker: string;
  /** Two or three sentences describing what the fond holds. */
  readonly description: string;
  /** Planned categories of holdings. Categories, not invented items. */
  readonly holdings: readonly string[];
  /** The fond's own visual character inside the shared system. */
  readonly character: string;
  readonly emblem: EmblemId;
  readonly status: FondStatus;
}

/* ---------------------------------------------------------------------------
 * Subject index — the back-of-book index on the home page
 * ------------------------------------------------------------------------- */

export interface Subject {
  readonly term: string;
  readonly fonds: readonly FondId[];
}
