import Link from "next/link";

export default function SessionPage() {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between text-sm text-muted">
        <Link href="/">‹ назад</Link>
        <span>1 / 5</span>
      </header>
      <div className="text-sm text-muted">
        Здесь будет пятишаговый флоу сессии (заглушка).
      </div>
    </div>
  );
}
