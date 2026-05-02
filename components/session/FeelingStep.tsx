"use client";

import { useEffect, useRef } from "react";
import { FEELINGS } from "@/lib/constants";
import type { Feeling } from "@/lib/db";

interface Props {
  feeling: Feeling | null;
  customFeeling: string;
  onFeeling: (f: Feeling) => void;
  onCustomFeeling: (v: string) => void;
}

export function FeelingStep({
  feeling,
  customFeeling,
  onFeeling,
  onCustomFeeling,
}: Props) {
  const firstRef = useRef<HTMLButtonElement>(null);
  const customRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (feeling === "другое") {
      customRef.current?.focus({ preventScroll: true });
    }
  }, [feeling]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Назови чувство</h2>
        <p className="text-sm text-muted">
          Что точнее всего описывает ощущение прямо сейчас?
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Чувство">
        {FEELINGS.map((f, i) => {
          const active = feeling === f;
          return (
            <button
              key={f}
              ref={i === 0 ? firstRef : undefined}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onFeeling(f)}
              className={`rounded-lg px-4 py-2 text-sm transition active:opacity-80 ${
                active
                  ? "bg-accent text-accent-fg"
                  : "bg-surface text-primary"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {feeling === "другое" && (
        <input
          ref={customRef}
          value={customFeeling}
          onChange={(e) => onCustomFeeling(e.target.value)}
          placeholder="Своё слово"
          maxLength={40}
          className="rounded-lg bg-surface px-4 py-3 text-base placeholder:text-tertiary focus:outline-none focus:ring-1 focus:ring-border"
          aria-label="Своя формулировка чувства"
        />
      )}
    </div>
  );
}
