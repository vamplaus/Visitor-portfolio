import type { Subject } from "./types";

/**
 * Index of subjects, set like the index at the back of a book.
 * Terms come from the archivist's stated fields of work and interest.
 * Sorted alphabetically at render time — add terms in any order.
 */
export const subjects: readonly Subject[] = [
  { term: "Artificial intelligence", fonds: ["laboratory", "journal"] },
  { term: "Automation", fonds: ["laboratory"] },
  { term: "Blender", fonds: ["forge"] },
  { term: "Characters", fonds: ["forge"] },
  { term: "Concept art", fonds: ["forge"] },
  { term: "Game development", fonds: ["forge"] },
  { term: "Godot", fonds: ["forge"] },
  { term: "History", fonds: ["mind"] },
  { term: "Informatics", fonds: ["classroom", "identity"] },
  { term: "Interactive materials", fonds: ["classroom"] },
  { term: "Linux", fonds: ["laboratory"] },
  { term: "Literature", fonds: ["mind"] },
  { term: "Notes & research", fonds: ["journal"] },
  { term: "Philosophy", fonds: ["mind"] },
  { term: "Programming", fonds: ["laboratory", "classroom"] },
  { term: "Python", fonds: ["laboratory", "classroom"] },
  { term: "Teaching methods", fonds: ["classroom"] },
  { term: "3D modelling", fonds: ["forge"] },
  { term: "Visual art", fonds: ["mind", "forge"] },
];
