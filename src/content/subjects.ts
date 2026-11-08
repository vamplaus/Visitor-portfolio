import type { Subject } from "./types";

/**
 * Index of subjects, set like the index at the back of a book.
 * Terms come from the archivist's stated fields of work and interest.
 * Sorted per locale at render time — add terms in any order.
 * `side` places a subject in one half of the motto on the Identity page.
 */
export const subjects: readonly Subject[] = [
  { term: { en: "Artificial intelligence", ru: "Искусственный интеллект" }, fonds: ["laboratory", "journal"], side: "logic" },
  { term: { en: "Automation", ru: "Автоматизация" }, fonds: ["laboratory"], side: "logic" },
  { term: { en: "Blender", ru: "Blender" }, fonds: ["forge"], side: "imagination" },
  { term: { en: "Characters", ru: "Персонажи" }, fonds: ["forge"], side: "imagination" },
  { term: { en: "Concept art", ru: "Концепт-арт" }, fonds: ["forge"], side: "imagination" },
  { term: { en: "Game development", ru: "Разработка игр" }, fonds: ["forge"], side: "imagination" },
  { term: { en: "Godot", ru: "Godot" }, fonds: ["forge"], side: "imagination" },
  { term: { en: "History", ru: "История" }, fonds: ["mind"], side: "imagination" },
  { term: { en: "Informatics", ru: "Информатика" }, fonds: ["classroom", "identity"], side: "logic" },
  { term: { en: "Interactive materials", ru: "Интерактивные материалы" }, fonds: ["classroom"] },
  { term: { en: "Linux", ru: "Linux" }, fonds: ["laboratory"], side: "logic" },
  { term: { en: "Literature", ru: "Литература" }, fonds: ["mind"], side: "imagination" },
  { term: { en: "Notes & research", ru: "Заметки и исследования" }, fonds: ["journal"] },
  { term: { en: "Philosophy", ru: "Философия" }, fonds: ["mind"], side: "imagination" },
  { term: { en: "Programming", ru: "Программирование" }, fonds: ["laboratory", "classroom"], side: "logic" },
  { term: { en: "Python", ru: "Python" }, fonds: ["laboratory", "classroom"], side: "logic" },
  { term: { en: "Teaching methods", ru: "Методики преподавания" }, fonds: ["classroom"], side: "logic" },
  { term: { en: "3D modelling", ru: "3D-моделирование" }, fonds: ["forge"], side: "imagination" },
  { term: { en: "Visual art", ru: "Изобразительное искусство" }, fonds: ["mind", "forge"], side: "imagination" },
];
