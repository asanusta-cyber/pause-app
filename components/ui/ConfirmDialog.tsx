"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

function dialogSupported(): boolean {
  if (typeof window === "undefined") return true; // SSR — оптимистично
  const proto = window.HTMLDialogElement?.prototype;
  return typeof proto?.showModal === "function";
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  destructive,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [supported, setSupported] = useState(true);

  // Колбэки в ref — чтобы effect ниже не пересоздавался от каждого render
  // и при этом всегда видел свежие версии onConfirm/onCancel.
  const onConfirmRef = useRef(onConfirm);
  const onCancelRef = useRef(onCancel);
  useEffect(() => {
    onConfirmRef.current = onConfirm;
    onCancelRef.current = onCancel;
  });

  useEffect(() => {
    setSupported(dialogSupported());
  }, []);

  useEffect(() => {
    if (!open) {
      const d = ref.current;
      if (d?.open) d.close();
      return;
    }

    if (supported) {
      const d = ref.current;
      if (d && !d.open) {
        try {
          d.showModal();
        } catch {
          // На случай экзотических ошибок — деградируем до confirm().
          fallback();
        }
      }
      return;
    }

    fallback();

    function fallback() {
      const text = description ? `${title}\n\n${description}` : title;
      // window.confirm — синхронный, блокирующий. Не модно, но работает на любом браузере.
      const ok = window.confirm(text);
      if (ok) onConfirmRef.current();
      else onCancelRef.current();
    }
  }, [open, supported, title, description]);

  // На неподдерживающих <dialog> — вообще ничего не рендерим, fallback идёт через confirm().
  if (!supported) return null;

  return (
    <dialog
      ref={ref}
      onClose={onCancel}
      onCancel={(e) => {
        // Esc на десктопе — фактически отмена.
        e.preventDefault();
        onCancel();
      }}
      className="w-[90vw] max-w-xs rounded-xl bg-surface p-5 text-primary backdrop:bg-black/30"
    >
      <h2 className="text-md font-medium">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm text-muted"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            destructive
              ? "bg-secondary text-[#a33a1a] dark:text-[#e08e6a]"
              : "bg-accent text-accent-fg"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
