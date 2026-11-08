import { Fragment } from "react";
import type { L } from "@/content/types";
import { tr, type Locale } from "@/i18n/config";

/**
 * Schema II.1.1 — how this site is built and served. Two lanes, read left to
 * right (top to bottom on phones). Drawn on a drafting grid: it is a technical
 * drawing of a real system, not an illustration.
 */

interface Node {
  code: string;
  title: L;
  note: L;
}

const lanes: { label: L; nodes: Node[] }[] = [
  {
    label: { en: "Build", ru: "Сборка" },
    nodes: [
      {
        code: "src/content · src/i18n",
        title: { en: "Typed records + dictionaries", ru: "Типизированные записи + словари" },
        note: { en: "Fonds, entries, placeholders; ru / en checked by the compiler", ru: "Фонды, записи, заглушки; ru / en проверяет компилятор" },
      },
      {
        code: "app/[lang]",
        title: { en: "Server components", ru: "Серверные компоненты" },
        note: { en: "Read the records and the dictionary of the locale", ru: "Читают записи и словарь своей локали" },
      },
      {
        code: "next build",
        title: { en: "Prerender", ru: "Пререндер" },
        note: { en: "Static HTML for every locale × route", ru: "Статический HTML для каждой локали и маршрута" },
      },
    ],
  },
  {
    label: { en: "Request", ru: "Запрос" },
    nodes: [
      {
        code: "GET /",
        title: { en: "Reader", ru: "Читатель" },
        note: { en: "Arrives without a language in the path", ru: "Приходит без языка в адресе" },
      },
      {
        code: "src/proxy.ts",
        title: { en: "Language gate", ru: "Выбор языка" },
        note: { en: "Cookie → Accept-Language → default; redirects to /ru or /en", ru: "Cookie → Accept-Language → по умолчанию; ведёт на /ru или /en" },
      },
      {
        code: "/ru · /en",
        title: { en: "Static page + islands", ru: "Статичная страница + острова" },
        note: {
          en: "JavaScript only where there is interaction: index, clock, exercises",
          ru: "JavaScript только там, где есть взаимодействие: указатель, часы, упражнения",
        },
      },
    ],
  },
];

const title: L = { en: "build and request paths", ru: "пути сборки и запроса" };

export function ArchivePipeline({ lang, figure }: { lang: Locale; figure: string }) {
  return (
    <figure>
      <div
        className="border border-line p-4 md:p-8"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in srgb, var(--color-line) 45%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-line) 45%, transparent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      >
        <div className="space-y-8 md:space-y-10">
          {lanes.map((lane, laneIndex) => (
            <div key={tr(lane.label, lang)}>
              <p className="meta mb-3 inline-block bg-void px-1.5 text-ember">{tr(lane.label, lang)}</p>
              <ol
                data-reveal="stagger"
                aria-label={tr(lane.label, lang)}
                className="flex flex-col items-stretch md:flex-row md:items-stretch"
              >
                {lane.nodes.map((node, i) => (
                  <Fragment key={node.code}>
                    {i > 0 && (
                      <li aria-hidden className="flow" style={{ ["--i" as string]: i * 2 - 1 } as React.CSSProperties}>
                        <span
                          className="flow-pulse"
                          style={{ ["--d" as string]: `${laneIndex * 1200 + i * 600}ms` } as React.CSSProperties}
                        />
                      </li>
                    )}
                    <li
                      style={{ ["--i" as string]: i * 2 } as React.CSSProperties}
                      className="flex-1 border border-line-strong bg-void p-3 md:min-h-36 md:p-4"
                    >
                      <p className="meta text-ash">{node.code}</p>
                      <p className="mt-2 font-display text-xl leading-tight text-paper">{tr(node.title, lang)}</p>
                      <p className="mt-1.5 text-sm text-ash">{tr(node.note, lang)}</p>
                    </li>
                  </Fragment>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="meta mt-3 text-ash">
        {figure} — {tr(title, lang)}
      </figcaption>
    </figure>
  );
}
