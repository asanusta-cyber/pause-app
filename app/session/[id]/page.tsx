import Link from "next/link";

export default function SessionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between text-sm text-muted">
        <Link href="/history">‹ история</Link>
        <span>сессия #{params.id}</span>
      </header>
      <div className="text-sm text-muted">
        Здесь будет детальный просмотр сессии (заглушка).
      </div>
    </div>
  );
}
