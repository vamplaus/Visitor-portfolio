import type { FondId, L } from "./types";

/**
 * The cabinet of curiosities: one specimen for each of the archivist's
 * interests, drawn in the archive's engraved line. Each specimen is a working
 * object, and each belongs to the fond that keeps its subject.
 * Visual art is not a drawer of its own: it is the engraving everything is
 * drawn in.
 */

export type SpecimenId = "polyhedron" | "neural" | "terminal" | "sprite" | "magic-square" | "astrolabe" | "codex";

export interface Specimen {
  readonly id: SpecimenId;
  readonly fond: FondId;
  readonly interest: L;
  readonly title: L;
  readonly caption: L;
  readonly hint: L;
}

export const specimens: readonly Specimen[] = [
  {
    id: "polyhedron",
    fond: "forge",
    interest: { en: "3D modelling · Blender", ru: "3D-моделирование · Blender" },
    title: { en: "Dürer's solid", ru: "Тело Дюрера" },
    caption: {
      en: "The polyhedron from Melencolia I (1514), rebuilt as a mesh: 12 vertices, 18 edges, 8 faces.",
      ru: "Многогранник из «Меланхолии I» (1514), собранный как меш: 12 вершин, 18 рёбер, 8 граней.",
    },
    hint: { en: "Drag to orbit", ru: "Тяните, чтобы вращать" },
  },
  {
    id: "neural",
    fond: "laboratory",
    interest: { en: "Artificial intelligence", ru: "Искусственный интеллект" },
    title: { en: "Perceptron as tracery", ru: "Перцептрон как ажур" },
    caption: {
      en: "A small network drawn as a Gothic window: signals rise from the inputs to the rose at the apex.",
      ru: "Маленькая нейросеть, нарисованная как готическое окно: сигнал поднимается от входов к розе в вершине.",
    },
    hint: { en: "Point at a node to fire it", ru: "Наведите на узел — он сработает" },
  },
  {
    id: "terminal",
    fond: "laboratory",
    interest: { en: "Python · Linux", ru: "Python · Linux" },
    title: { en: "Shell", ru: "Оболочка" },
    caption: {
      en: "A session in the archive's shell. Every command is real, and so is every answer.",
      ru: "Сеанс в оболочке архива. Команды настоящие, ответы тоже.",
    },
    hint: { en: "Types by itself", ru: "Печатает сама" },
  },
  {
    id: "sprite",
    fond: "forge",
    interest: { en: "Game development · Godot", ru: "Разработка игр · Godot" },
    title: { en: "The lantern bearer", ru: "Фонарщик" },
    caption: {
      en: "A pixel character with a walk cycle, and the Godot scene tree that would hold it.",
      ru: "Пиксельный персонаж с циклом ходьбы и дерево сцены Godot, в котором он бы жил.",
    },
    hint: { en: "Click, then ← → and Space", ru: "Нажмите, затем ← → и пробел" },
  },
  {
    id: "magic-square",
    fond: "classroom",
    interest: { en: "Logic · teaching", ru: "Логика · преподавание" },
    title: { en: "Magic square", ru: "Магический квадрат" },
    caption: {
      en: "Dürer's square: every row, column, diagonal and quarter adds up to 34, and the bottom row dates it — 1514.",
      ru: "Квадрат Дюрера: каждая строка, столбец, диагональ и четверть дают 34, а нижний ряд хранит дату — 1514.",
    },
    hint: { en: "Choose a line", ru: "Выберите линию" },
  },
  {
    id: "astrolabe",
    fond: "mind",
    interest: { en: "History", ru: "История" },
    title: { en: "Astrolabe", ru: "Астролябия" },
    caption: {
      en: "The instrument that measured the sky and the hour: a fixed plate, a turning star map, a rule.",
      ru: "Инструмент, измерявший небо и час: неподвижная пластина, вращающаяся карта звёзд, линейка.",
    },
    hint: { en: "Turns with the hour", ru: "Вращается вместе с часом" },
  },
  {
    id: "codex",
    fond: "mind",
    interest: { en: "Philosophy · literature", ru: "Философия · литература" },
    title: { en: "Codex", ru: "Кодекс" },
    caption: {
      en: "An open book with an illuminated initial and notes in the margin: the archive's preface, set as a manuscript.",
      ru: "Раскрытая книга с буквицей и заметками на полях: предисловие архива, свёрстанное как рукопись.",
    },
    hint: { en: "Leaves turn", ru: "Листы переворачиваются" },
  },
];

export function getSpecimen(id: SpecimenId): Specimen {
  const s = specimens.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown specimen: ${id}`);
  return s;
}
