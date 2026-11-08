import type { Fond, FondId } from "./types";

/**
 * The registry of fonds. Order here is shelf order everywhere:
 * the home catalogue, the index dialog, the footer and the prev/next pager.
 *
 * To open a fond: build its page in `src/app/[lang]/<id>/page.tsx`
 * and switch `status` to "open". Nothing else needs to change.
 */
export const fonds: readonly Fond[] = [
  {
    id: "identity",
    numeral: "I",
    title: { en: "Identity", ru: "Личность" },
    href: "/identity",
    code: "VMP·ID",
    kicker: { en: "Who keeps this archive", ru: "Кто хранит этот архив" },
    description: {
      en: "The archivist: a teacher of informatics and programming. Dossier, fields of work and the questions that connect them.",
      ru: "Хранитель архива — преподаватель информатики и программирования. Досье, направления работы и вопросы, которые их связывают.",
    },
    holdings: {
      en: ["Dossier", "Fields of work", "Principles", "Timeline"],
      ru: ["Досье", "Направления", "Принципы", "Хронология"],
    },
    character: {
      en: "Dossier — an editorial portrait in serif, with marginal notes.",
      ru: "Досье — редакционный портрет в антикве, с заметками на полях.",
    },
    emblem: "portal",
    status: "open",
  },
  {
    id: "laboratory",
    numeral: "II",
    title: { en: "Laboratory", ru: "Лаборатория" },
    href: "/laboratory",
    code: "VMP·LAB",
    kicker: { en: "Code, machines and experiments", ru: "Код, машины и эксперименты" },
    description: {
      en: "Programming projects, experiments with artificial intelligence, Linux and automation. Each entry is filed as a specification sheet.",
      ru: "Проекты по программированию, эксперименты с искусственным интеллектом, Linux и автоматизация. Каждая запись оформлена как лист спецификации.",
    },
    holdings: {
      en: ["Programming projects", "AI experiments", "Linux & tooling", "Automation"],
      ru: ["Проекты", "Эксперименты с ИИ", "Linux и инструменты", "Автоматизация"],
    },
    character: {
      en: "Research laboratory — register, spec sheets, schemas, code specimens.",
      ru: "Исследовательская лаборатория — реестр, листы спецификаций, схемы, образцы кода.",
    },
    emblem: "construction",
    status: "open",
  },
  {
    id: "classroom",
    numeral: "III",
    title: { en: "Classroom", ru: "Класс" },
    href: "/classroom",
    code: "VMP·CLS",
    kicker: { en: "Teaching as a craft", ru: "Преподавание как ремесло" },
    description: {
      en: "Educational projects, teaching methods and interactive materials for informatics and programming.",
      ru: "Образовательные проекты, методики и интерактивные материалы по информатике и программированию.",
    },
    holdings: {
      en: ["Courses", "Methods", "Interactive materials", "Exercises"],
      ru: ["Курсы", "Методики", "Интерактивные материалы", "Упражнения"],
    },
    character: {
      en: "The teacher's working notebook — ruled pages, a red margin, numbered steps.",
      ru: "Рабочая тетрадь преподавателя — линованные страницы, красное поле, пронумерованные шаги.",
    },
    emblem: "ruled",
    status: "open",
  },
  {
    id: "forge",
    numeral: "IV",
    title: { en: "Forge", ru: "Кузница" },
    href: "/forge",
    code: "VMP·FRG",
    kicker: { en: "Games, worlds and forms", ru: "Игры, миры и формы" },
    description: {
      en: "Game projects in Godot, 3D modelling in Blender, characters and concept art — the workshop where things take shape.",
      ru: "Игровые проекты на Godot, 3D-моделирование в Blender, персонажи и концепт-арт — мастерская, где вещи обретают форму.",
    },
    holdings: {
      en: ["Game projects", "Blender models", "Characters", "Concept art"],
      ru: ["Игровые проекты", "Модели Blender", "Персонажи", "Концепт-арт"],
    },
    character: {
      en: "Workshop — wireframes, viewport frames, crop marks around every image.",
      ru: "Мастерская — каркасы, рамки вьюпорта, метки обреза вокруг каждого изображения.",
    },
    emblem: "cube",
    status: "in-preparation",
  },
  {
    id: "mind",
    numeral: "V",
    title: { en: "Mind", ru: "Разум" },
    href: "/mind",
    code: "VMP·MND",
    kicker: { en: "History, philosophy, literature", ru: "История, философия, литература" },
    description: {
      en: "The intellectual hinterland: history, philosophy, literature and visual art — what is read, studied and returned to.",
      ru: "Интеллектуальный тыл: история, философия, литература и изобразительное искусство — то, что читается, изучается и перечитывается.",
    },
    holdings: {
      en: ["Reading list", "History", "Philosophy", "Literature & art"],
      ru: ["Список чтения", "История", "Философия", "Литература и искусство"],
    },
    character: {
      en: "Library — Gothic serif, a card catalogue, long quotations.",
      ru: "Библиотека — готическая антиква, карточный каталог, длинные цитаты.",
    },
    emblem: "rose",
    status: "in-preparation",
  },
  {
    id: "journal",
    numeral: "VI",
    title: { en: "Journal", ru: "Журнал" },
    href: "/journal",
    code: "VMP·JRN",
    kicker: { en: "A garden of notes", ru: "Сад заметок" },
    description: {
      en: "A digital garden of notes, reflections and research. Entries grow over time and link to each other.",
      ru: "Цифровой сад заметок, размышлений и исследований. Записи растут со временем и ссылаются друг на друга.",
    },
    holdings: {
      en: ["Notes", "Essays", "Research logs", "Links between ideas"],
      ru: ["Заметки", "Эссе", "Журналы исследований", "Связи между идеями"],
    },
    character: {
      en: "Garden — notes marked by maturity, connected by backlinks.",
      ru: "Сад — заметки по степени зрелости, связанные обратными ссылками.",
    },
    emblem: "branch",
    status: "in-preparation",
  },
  {
    id: "contact",
    numeral: "VII",
    title: { en: "Contact", ru: "Контакты" },
    href: "/contact",
    code: "VMP·COR",
    kicker: { en: "Correspondence", ru: "Переписка" },
    description: {
      en: "How to reach the archivist: e-mail and social networks.",
      ru: "Как связаться с автором архива: электронная почта и социальные сети.",
    },
    holdings: {
      en: ["E-mail", "Social networks", "Code repositories"],
      ru: ["Почта", "Социальные сети", "Репозитории"],
    },
    character: {
      en: "Letter — a quiet page, set like correspondence.",
      ru: "Письмо — тихая страница, свёрстанная как корреспонденция.",
    },
    emblem: "letter",
    status: "in-preparation",
  },
];

export function getFond(id: FondId): Fond {
  const fond = fonds.find((f) => f.id === id);
  if (!fond) throw new Error(`Unknown fond: ${id}`);
  return fond;
}

/** Neighbours on the shelf, for the prev/next pager. */
export function getNeighbours(id: FondId): { prev: Fond | null; next: Fond | null } {
  const i = fonds.findIndex((f) => f.id === id);
  return {
    prev: i > 0 ? fonds[i - 1] : null,
    next: i < fonds.length - 1 ? fonds[i + 1] : null,
  };
}

/** Find the fond that owns a locale-free path segment, e.g. "forge". */
export function fondForSegment(segment: string | undefined): Fond | null {
  return fonds.find((f) => f.id === segment) ?? null;
}
