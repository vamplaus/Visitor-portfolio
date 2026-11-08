import type { LabEntry, LabSlot } from "../types";
import { digitalArchive } from "./001-digital-archive";

/**
 * The laboratory register. To file a new entry: create a file next to this one
 * (copy 001 as a template), import it and add it to `labEntries`.
 * When an entry fills a reserved direction, remove that slot.
 */
export const labEntries: readonly LabEntry[] = [digitalArchive];

/** Directions the laboratory is set up for, awaiting their first entry. */
export const labSlots: readonly LabSlot[] = [
  { code: "VMP-LAB-002", title: { en: "AI experiments", ru: "Эксперименты с ИИ" }, domains: ["ai", "python"] },
  { code: "VMP-LAB-003", title: { en: "Linux & tooling", ru: "Linux и инструменты" }, domains: ["linux"] },
  { code: "VMP-LAB-004", title: { en: "Automation", ru: "Автоматизация" }, domains: ["automation", "python"] },
];

export function getLabEntry(slug: string): LabEntry | undefined {
  return labEntries.find((e) => e.slug === slug);
}
