import type { Session } from "./db";

export interface DayGroup {
  key: string;
  ts: number;
  sessions: Session[];
}

function dayKey(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function startOfDayTs(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Группирует сессии по дню (локальная таймзона). На входе ожидается уже отсортированный desc список. */
export function groupByDay(sessions: Session[]): DayGroup[] {
  const groups = new Map<string, DayGroup>();
  for (const s of sessions) {
    const key = dayKey(s.createdAt);
    let g = groups.get(key);
    if (!g) {
      g = { key, ts: startOfDayTs(s.createdAt), sessions: [] };
      groups.set(key, g);
    }
    g.sessions.push(s);
  }
  return Array.from(groups.values()).sort((a, b) => b.ts - a.ts);
}
