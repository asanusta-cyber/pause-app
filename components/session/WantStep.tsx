"use client";

import { ROOT_WANT_HINTS, ROOT_WANT_LABEL, ROOT_WANTS } from "@/lib/constants";
import type { RootWant } from "@/lib/db";

interface Props {
  rootWant: RootWant | null;
  onSelect: (w: RootWant) => void;
}

export function WantStep({ rootWant, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Найди корневое «хочу»</h2>
        <p className="text-sm text-muted">
          Под почти любой тяжёлой эмоцией лежит одно из трёх желаний. Какое
          резонирует?
        </p>
      </div>

      <div
        className="grid gap-3 sm:grid-cols-3"
        role="radiogroup"
        aria-label="Корневое желание"
      >
        {ROOT_WANTS.map((opt) => {
          const active = rootWant === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(opt.id)}
              className={`flex flex-col gap-1 rounded-lg bg-surface p-4 text-left transition active:opacity-80 ${
                active ? "ring-1 ring-primary" : "ring-1 ring-transparent"
              }`}
            >
              <div className="text-md font-medium">{opt.title}</div>
              <div className="text-sm text-muted">{opt.description}</div>
            </button>
          );
        })}
      </div>

      <details className="rounded-lg bg-secondary p-4">
        <summary className="cursor-pointer list-none text-sm text-muted">
          Не уверен? Посмотри подсказки
        </summary>
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {ROOT_WANT_HINTS.map((h, i) => (
            <li key={i} className="flex items-start justify-between gap-3">
              <span>{h.situation}</span>
              <span className="shrink-0 text-muted">
                → {ROOT_WANT_LABEL[h.want]}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
