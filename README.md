# Levia

Тихий дневник практики метода Седоны (метода Лестера Левенсона) — отпускание тяжёлых эмоций через пять последовательных шагов.

PWA, локально-first. Все данные хранятся в IndexedDB на устройстве пользователя — никакой авторизации, аккаунтов и облачной синхронизации.

## Стек

- Next.js 14 (App Router) · TypeScript strict · Tailwind CSS
- Dexie + dexie-react-hooks (IndexedDB)
- Native `<dialog>` + custom service worker, без `next-pwa`

## Скрипты

```bash
npm run dev      # дев-сервер с hot reload
npm run build    # production-сборка
npm run start    # запустить production-сборку
npm run icons    # перегенерировать PWA-иконки (sharp)
```

## Деплой

Любой статический хостинг с HTTPS. Vercel — нулевой конфиг: `npm run build` запустится автоматически. Без HTTPS service worker не зарегистрируется и установка PWA на Android не сработает.

## Структура

```
app/         — App Router страницы
components/  — UI-примитивы и шаги сессии
lib/         — Dexie-схема, форматтеры, константы
public/      — manifest, sw.js, иконки, offline.html
scripts/     — одноразовые скрипты (генератор иконок)
```

## Внутренние имена

`PauseDB` (имя Dexie-базы), `pause-v1` (имя SW-кэша) и `pause:toast` (sessionStorage-ключ) — наследие первоначального названия проекта. Сохранены намеренно: переименование Dexie-базы привело бы к потере данных у существующих пользователей, а остальные внутренние ключи стабильно держим заодно.
