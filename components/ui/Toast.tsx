"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pause:toast";
const SHOW_MS = 3000;

const MESSAGES: Record<string, string> = {
  saved: "Сессия сохранена",
  deleted: "Сессия удалена",
};

/**
 * Простой одноразовый тост. Перед редиректом источник пишет
 * `sessionStorage.setItem('pause:toast', '<id>')`. Toast при mount читает,
 * сразу удаляет ключ и показывает сообщение на 3 секунды.
 */
export function Toast() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = sessionStorage.getItem(STORAGE_KEY);
    if (!flag) return;
    sessionStorage.removeItem(STORAGE_KEY);

    const text = MESSAGES[flag];
    if (!text) return;

    setMessage(text);
    // двойной requestAnimationFrame — гарантированно даём DOM нарисоваться
    // в скрытом состоянии, потом включаем opacity-100 для fade-in
    const r = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    const hide = setTimeout(() => setVisible(false), SHOW_MS);
    const remove = setTimeout(() => setMessage(null), SHOW_MS + 250);
    return () => {
      cancelAnimationFrame(r);
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, []);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      <div
        className={`rounded-lg bg-accent px-4 py-3 text-sm text-accent-fg transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export const TOAST_KEY = STORAGE_KEY;
