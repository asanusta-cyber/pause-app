"use client";

import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      try {
        d.showModal();
      } catch {
        // Уже открыт — игнорируем.
      }
    }
    if (!open && d.open) d.close();
  }, [open]);

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
