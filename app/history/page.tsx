import Link from "next/link";
import { currentMonthLabel } from "@/lib/format";

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-sm text-muted">
          ‹ назад
        </Link>
        <h1 className="text-md font-medium">История</h1>
        <span className="text-sm text-muted">{currentMonthLabel()}</span>
      </header>
      <div className="rounded-lg bg-secondary p-4 text-sm text-muted">
        Здесь будут появляться твои сессии. Начни первую с главного экрана.
      </div>
    </div>
  );
}
