"use client";

import { useEffect, useRef } from "react";
import { IntensitySlider } from "@/components/ui/IntensitySlider";

interface Props {
  situation: string;
  intensity: number;
  hasInteractedIntensity: boolean;
  onSituation: (v: string) => void;
  onIntensity: (v: number) => void;
}

export function SituationStep({
  situation,
  intensity,
  hasInteractedIntensity,
  onSituation,
  onIntensity,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Назови ситуацию</h2>
        <p className="text-sm text-muted">
          Что сейчас тревожит, раздражает или тяготит — одной-двумя фразами.
        </p>
      </div>

      <textarea
        ref={ref}
        value={situation}
        onChange={(e) => onSituation(e.target.value)}
        placeholder="Например: коллега перебивает на встрече, чувствую раздражение"
        rows={4}
        className="min-h-32 w-full resize-none rounded-lg bg-surface p-4 text-base placeholder:text-tertiary focus:outline-none focus:ring-1 focus:ring-border"
      />

      <div className="flex flex-col gap-3 rounded-lg bg-surface p-4">
        <div className="text-sm text-muted">Насколько сильно сейчас?</div>
        <IntensitySlider
          value={intensity}
          dimmed={!hasInteractedIntensity}
          onChange={onIntensity}
          ariaLabel="Интенсивность сейчас"
        />
      </div>
    </div>
  );
}
