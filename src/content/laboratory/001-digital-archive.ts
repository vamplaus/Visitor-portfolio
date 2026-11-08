import { placeholder, type LabEntry } from "../types";

/** VMP-LAB-001 — this site. A real project, documented as it is built. */
export const digitalArchive: LabEntry = {
  slug: "digital-archive",
  code: "VMP-LAB-001",
  title: { en: "The Digital Archive", ru: "Цифровой архив" },
  summary: {
    en: "This site: a personal archive built as a typed content system — seven fonds, two languages, one design system.",
    ru: "Этот сайт: личный архив, построенный как типизированная система контента — семь фондов, два языка, одна дизайн-система.",
  },
  domains: ["web"],
  status: "active",
  since: 2026,
  stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Motion"],
  objective: {
    en: "Build a personal portfolio that reads as an archive rather than a template: content kept as typed data, every gap marked instead of invented, the interface in Russian and English, fast and accessible on a phone.",
    ru: "Сделать личное портфолио, которое читается как архив, а не как шаблон: контент хранится как типизированные данные, пробелы помечены, а не выдуманы, интерфейс на русском и английском, сайт быстрый и доступный с телефона.",
  },
  protocol: {
    en: [
      "Model the content first. Fonds, subjects, entries and placeholders are TypeScript records; the compiler rejects a missing translation.",
      "Derive every page from the registry. The catalogue, the index, the footer and the pager all read the same list.",
      "Render on the server and prerender every route. Client JavaScript only where there is interaction: the index, the clock, the exercises.",
      "Draw the Gothic geometry in code with compass-and-straightedge rules, not as images.",
      "Check each stage in a real browser: keyboard, reduced motion, no JavaScript, phone width.",
    ],
    ru: [
      "Сначала смоделировать контент. Фонды, предметы, записи и заглушки — записи TypeScript; компилятор не пропустит недостающий перевод.",
      "Строить каждую страницу из реестра. Каталог, указатель, подвал и навигация читают один и тот же список.",
      "Рендерить на сервере и пререндерить все маршруты. Клиентский JavaScript — только там, где есть взаимодействие: указатель, часы, упражнения.",
      "Строить готическую геометрию в коде по правилам циркуля и линейки, а не картинками.",
      "Проверять каждый этап в настоящем браузере: клавиатура, reduced motion, без JavaScript, ширина телефона.",
    ],
  },
  schema: "archive-pipeline",
  specimen: {
    file: "src/lib/gothic.ts",
    language: "ts",
    caption: {
      en: "Equilateral Gothic arch: the radius equals the span, each arc is centred on the opposite springer. The entrance portal is drawn with these functions.",
      ru: "Равносторонняя готическая арка: радиус равен пролёту, центр каждой дуги — на противоположной пяте. Этими функциями нарисован портал на входе.",
    },
    code: `/** Equilateral arch: radius = span, each arc centred on the opposite springer. */
export function equilateralArch(x1: number, x2: number, springline: number): Arch {
  const span = x2 - x1;
  const rise = Math.sqrt(span ** 2 - (span / 2) ** 2); // = span · √3 / 2
  return { span, apexX: (x1 + x2) / 2, apexY: round(springline - rise) };
}

/** The two arcs of a pointed arch, from the left springer over the apex. */
function arcs(x1: number, x2: number, springline: number): string {
  const { span: r, apexX, apexY } = equilateralArch(x1, x2, springline);
  return \`A\${r} \${r} 0 0 1 \${apexX} \${apexY}A\${r} \${r} 0 0 1 \${x2} \${springline}\`;
}

/** The outline of a lancet: two arcs meeting at the apex. */
export function lancetPath(x1: number, x2: number, springline: number): string {
  return \`M\${x1} \${springline}\${arcs(x1, x2, springline)}\`;
}`,
  },
  observations: {
    en: [
      "Explicit placeholders keep the archive honest: an empty slot looks empty.",
      "The entrance sequence is pure CSS over server HTML, so the first screen is readable before any JavaScript runs.",
      "Cyrillic glyphs load on demand through unicode-range: English pages do not pay for them.",
    ],
    ru: [
      "Явные заглушки сохраняют архив честным: пустая ячейка выглядит пустой.",
      "Вступление — чистый CSS поверх серверного HTML, поэтому первый экран читается ещё до запуска JavaScript.",
      "Кириллические глифы загружаются по требованию через unicode-range: английские страницы за них не платят.",
    ],
  },
  links: [
    {
      label: { en: "Source code", ru: "Исходный код" },
      href: placeholder({ en: "Public repository link — to be confirmed by the author", ru: "Ссылка на открытый репозиторий — подтвердит автор" }),
    },
  ],
};
