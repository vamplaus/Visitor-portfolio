# VAMPLAUS — The Digital Archive

*Between Logic and Imagination · Между логикой и воображением.*

Персональный цифровой архив: код, преподавание, игры и идеи, каталогизированные рядом —
как библиотека ставит трактат по логике рядом со сборником стихов.

**Статус:** Этап 2 — контент (в работе). Готовы локализация RU / EN и фонды
I Identity, II Laboratory, III Classroom. Фонды IV–VII пока открыты как явно помеченные заглушки.

## Стек

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Motion ·
Lucide Icons. Без платных сервисов и API.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000 → перенаправит на /ru или /en
npm run build      # production-сборка
npm run lint
npm run typecheck
```

Переменная `NEXT_PUBLIC_SITE_URL` задаёт канонический адрес сайта для метаданных и hreflang
(по умолчанию `http://localhost:3000`).

## Как добавлять контент

Весь контент — в `src/content/`. Компоненты не содержат текстов. Тексты задаются сразу на двух
языках: `{ en: "…", ru: "…" }` — пропущенный перевод не скомпилируется.

| Что | Где |
|---|---|
| Запись лаборатории | новый файл в `src/content/laboratory/` (шаблон — `001-digital-archive.ts`), добавить в `labEntries` в `index.ts`; заполненное направление убрать из `labSlots` |
| Материал класса | новый файл в `src/content/classroom/` (шаблон — `001-eight-bits.ts`), добавить в `classroomEntries` |
| Портрет / аватар | положить файл в `public/`, заменить placeholder в `src/content/identity.ts` |
| Биография, принципы, хронология | `src/content/identity.ts` |
| Имя, место | `src/content/site.ts` |
| Предмет указателя | `src/content/subjects.ts` |
| Строки интерфейса | `src/i18n/dictionaries/en.ts` и `ru.ts` |

Неизвестное хранится как `placeholder(...)` и отображается как пустая ячейка — ничего не
выдумывается.

## Документация

[`docs/DESIGN.md`](docs/DESIGN.md) — художественное направление, дизайн-система, структура,
локализация и план этапов.
