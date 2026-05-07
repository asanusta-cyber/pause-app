"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "pause:toast";
const TOAST_EVENT = "pause-toast";
const SHOW_MS = 3000;
const FADE_MS = 200;

/**
 * Установить тост. Можно вызывать из любого места:
 * - Если `<Toast />` уже смонтирован на текущей странице, тост покажется сразу
 *   (через CustomEvent).
 * - Если перед показом будет навигация (router.push) — `<Toast />` на новой
 *   странице прочитает sessionStorage при mount.
 */
export function setToast(message: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, message);
  window.dispatchEvent(new CustomEvent(TOAST_EVENT));
}

export function Toast() {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeRaf = useRef<number | null>(null);

  useEffect(() => {
    function clearTimers() {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (removeTimer.current) clearTimeout(removeTimer.current);
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
    }

    function show(text: string) {
      clearTimers();
      setMessage(text);
      setVisible(false);
      // двойной rAF — гарантированно даём React нарисовать opacity-0,
      // потом включаем opacity-100 для плавного fade-in.
      fadeRaf.current = requestAnimationFrame(() => {
        fadeRaf.current = requestAnimationFrame(() => setVisible(true));
      });
      hideTimer.current = setTimeout(() => setVisible(false), SHOW_MS);
      removeTimer.current = setTimeout(
        () => setMessage(null),
        SHOW_MS + FADE_MS + 50
      );
    }

    function check() {
      const text = sessionStorage.getItem(STORAGE_KEY);
      if (!text) return;
      sessionStorage.removeItem(STORAGE_KEY);
      show(text);
    }

    check();
    window.addEventListener(TOAST_EVENT, check);
    return () => {
      window.removeEventListener(TOAST_EVENT, check);
      clearTimers();
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
        className={`max-w-sm rounded-lg bg-accent px-4 py-3 text-center text-sm leading-relaxed text-accent-fg transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
