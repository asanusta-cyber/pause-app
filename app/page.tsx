import Link from "next/link";
import { formatTodayHeading, greeting } from "@/lib/format";

export default function HomePage() {
  const now = new Date();
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <p className="text-sm text-muted">{formatTodayHeading(now)}</p>
        <h1 className="text-lg font-medium">{greeting(now)}</h1>
      </header>

      <section aria-label="Статистика" className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-surface p-4">
          <div className="text-lg font-medium">—</div>
          <div className="text-xs text-muted">серия</div>
        </div>
        <div className="rounded-lg bg-surface p-4">
          <div className="text-lg font-medium">—</div>
          <div className="text-xs text-muted">всего</div>
        </div>
      </section>

      <section aria-label="Последняя сессия">
        <div className="rounded-lg bg-secondary p-4 text-sm text-muted">
          Метод Седоны — простая практика отпускания тяжёлых эмоций. Каждая
          сессия занимает 5–10 минут. Начни первую — увидишь, как это работает.
        </div>
      </section>

      <Link
        href="/session"
        className="block rounded-lg bg-accent px-6 py-4 text-center text-base font-medium text-accent-fg"
      >
        Начать сессию
      </Link>
      <p className="-mt-3 text-center text-xs text-tertiary">10 минут · 5 шагов</p>

      <nav className="mt-2 flex justify-center gap-6 text-sm text-muted">
        <Link href="/history">История</Link>
        <Link href="/settings">Настройки</Link>
      </nav>
    </div>
  );
}
