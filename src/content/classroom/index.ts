import type { ClassroomEntry, ClassroomSection } from "../types";
import { eightBits } from "./001-eight-bits";

/**
 * The working notebook. To add a material: create a file next to this one
 * (copy 001 as a template), import it and add it to `classroomEntries`.
 */
export const classroomEntries: readonly ClassroomEntry[] = [eightBits];

/** Order of the notebook's sections. */
export const classroomSections: readonly ClassroomSection[] = ["courses", "methods", "materials", "exercises"];

export function getClassroomEntry(slug: string): ClassroomEntry | undefined {
  return classroomEntries.find((e) => e.slug === slug);
}
