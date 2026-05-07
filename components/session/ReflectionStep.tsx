"use client";

import { useEffect, useRef } from "react";
import { IntensitySlider } from "@/components/ui/IntensitySlider";

interface Props {
  intensityAfter: number;
  hasInteracted: boolean;
  reflection: string;
  onIntensity: (v: number) => void;
  onReflection: (v: string) => void;
}

export function ReflectionStep({
  intensityAfter,
  hasInteracted,
  reflection,
  onIntensity,
  onReflection,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Что изменилось?</h2>
        <p className="text-sm text-muted">
          Что в теле, голове, дыхании теперь? Если ничего — это тоже валидный
          ответ.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-lg bg-surface p-4">
        <div className="text-sm text-muted">Насколько сильно теперь?</div>
        <IntensitySlider
          value={intensityAfter}
          dimmed={!hasInteracted}
          onChange={onIntensity}
          ariaLabel="Интенсивность теперь"
        />
      </div>

      <textarea
        ref={ref}
        value={reflection}
        onChange={(e) => onReflection(e.target.value)}
        placeholder="Например: дыхание стало глубже, плечи отпустило"
        rows={4}
        className="min-h-32 w-full resize-none rounded-lg bg-surface p-4 text-base placeholder:text-tertiary focus:outline-none focus:ring-1 focus:ring-border"
        aria-label="Что изменилось"
      />
    </div>
  );
}
