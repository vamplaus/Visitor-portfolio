# VAMPLAUS — The Digital Archive

*Between Logic and Imagination.*

Персональный цифровой архив: код, преподавание, игры и идеи, каталогизированные рядом —
как библиотека ставит трактат по логике рядом со сборником стихов.

**Статус:** Этап 1 — фундамент (дизайн-система, навигация, экран входа, главная).
Фонды I–VII пока открыты как явно помеченные заглушки.

## Стек

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · Motion ·
Lucide Icons. Без платных сервисов и API.

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm run lint
npm run typecheck
```

Переменная `NEXT_PUBLIC_SITE_URL` задаёт канонический адрес сайта для метаданных
(по умолчанию `http://localhost:3000`).

## Как добавлять контент

Весь контент — в `src/content/`. Компоненты не содержат текстов.

- **Фонд** — запись в `src/content/fonds.ts` (+ папка маршрута в `src/app/<id>/`).
- **Предмет указателя** — строка в `src/content/subjects.ts`.
- **Факт об авторе** — `src/content/site.ts`. Неизвестное хранится как `placeholder(...)` и
  отображается как пустая ячейка — ничего не выдумывается.

## Документация

[`docs/DESIGN.md`](docs/DESIGN.md) — художественное направление, дизайн-система, структура
и план этапов.
