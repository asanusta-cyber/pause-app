import Link from "next/link";
import { ABOUT_TEXT, APP_NAME, APP_VERSION } from "@/lib/constants";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-sm text-muted">
          ‹ назад
        </Link>
        <h1 className="text-md font-medium">Настройки</h1>
        <span className="w-12" />
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted">Резервная копия</h2>
        <button
          type="button"
          className="rounded-lg bg-surface px-4 py-3 text-left text-sm"
          disabled
        >
          Экспортировать все данные (JSON)
        </button>
        <button
          type="button"
          className="rounded-lg bg-surface px-4 py-3 text-left text-sm"
          disabled
        >
          Импортировать данные
        </button>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-muted">О приложении</h2>
        <p className="text-sm">{ABOUT_TEXT}</p>
        <p className="text-xs text-tertiary">
          {APP_NAME} · v{APP_VERSION}
        </p>
      </section>
    </div>
  );
}
