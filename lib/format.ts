/**
 * Русские форматтеры дат и чисел. Все вычисления — клиентские, в локальной таймзоне.
 */

const WEEKDAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

const MONTHS_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const MONTHS_NOMINATIVE = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

/** «четверг, 30 апреля» */
export function formatTodayHeading(date: Date = new Date()): string {
  const wd = WEEKDAYS[date.getDay()];
  const day = date.getDate();
  const month = MONTHS_GENITIVE[date.getMonth()];
  return `${wd}, ${day} ${month}`;
}

/** «Доброе утро» / «Добрый день» / «Добрый вечер» / «Доброй ночи» */
export function greeting(date: Date = new Date()): string {
  const h = date.getHours();
  if (h >= 5 && h < 12) return "Доброе утро";
  if (h >= 12 && h < 18) return "Добрый день";
  if (h >= 18 && h < 23) return "Добрый вечер";
  return "Доброй ночи";
}

/** Склонение существительного по числу: pluralRu(2, ['сессия', 'сессии', 'сессий']) → 'сессии' */
export function pluralRu(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const n1 = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

export function sessionsWord(n: number): string {
  return pluralRu(n, ["сессия", "сессии", "сессий"]);
}

export function daysWord(n: number): string {
  return pluralRu(n, ["день", "дня", "дней"]);
}

function startOfDay(d: Date): Date {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}

function diffDays(a: Date, b: Date): number {
  const ms = startOfDay(a).getTime() - startOfDay(b).getTime();
  return Math.round(ms / 86_400_000);
}

/**
 * Относительная дата для группировки:
 * - 0 → «сегодня»
 * - 1 → «вчера»
 * - 2..7 → «N дн. назад» с правильным склонением
 * - дальше — «30 апреля 2026»
 */
export function relativeDay(ts: number, now: Date = new Date()): string {
  const d = new Date(ts);
  const days = diffDays(now, d);
  if (days <= 0) return "сегодня";
  if (days === 1) return "вчера";
  if (days < 7) return `${days} ${pluralRu(days, ["день", "дня", "дней"])} назад`;
  const day = d.getDate();
  const month = MONTHS_GENITIVE[d.getMonth()];
  const year = d.getFullYear();
  const thisYear = now.getFullYear();
  return year === thisYear ? `${day} ${month}` : `${day} ${month} ${year}`;
}

/** «14:32» */
export function formatTime(ts: number): string {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** «30 апреля 2026, 14:32» */
export function formatFullDateTime(ts: number): string {
  const d = new Date(ts);
  const day = d.getDate();
  const month = MONTHS_GENITIVE[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}, ${formatTime(ts)}`;
}

/** «4 мин 23 с» / «48 с» / «1 ч 5 мин» */
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} с`;
  const totalMin = Math.floor(seconds / 60);
  const sec = Math.round(seconds % 60);
  if (totalMin < 60) {
    if (sec === 0) return `${totalMin} мин`;
    return `${totalMin} мин ${sec} с`;
  }
  const h = Math.floor(totalMin / 60);
  const min = totalMin % 60;
  return min === 0 ? `${h} ч` : `${h} ч ${min} мин`;
}

/** «Май 2026» — для шапки истории. */
export function currentMonthLabel(date: Date = new Date()): string {
  return `${MONTHS_NOMINATIVE[date.getMonth()]} ${date.getFullYear()}`;
}

/** Имя файла бэкапа: levia-backup-2026-05-01.json */
export function backupFilename(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `levia-backup-${y}-${m}-${d}.json`;
}
