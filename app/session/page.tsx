"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { ProgressDots } from "@/components/ui/ProgressDots";
import { SituationStep } from "@/components/session/SituationStep";
import { FeelingStep } from "@/components/session/FeelingStep";
import { WantStep } from "@/components/session/WantStep";
import type { Feeling, RootWant } from "@/lib/db";

type Step = 1 | 2 | 3 | 4 | 5;
const TOTAL: 5 = 5;

export default function SessionPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);

  // Шаг 1
  const [situation, setSituation] = useState("");
  const [intensityBefore, setIntensityBefore] = useState(5);
  const [intensityBeforeInteracted, setIntensityBeforeInteracted] =
    useState(false);

  // Шаг 2
  const [feeling, setFeeling] = useState<Feeling | null>(null);
  const [customFeeling, setCustomFeeling] = useState("");

  // Шаг 3
  const [rootWant, setRootWant] = useState<RootWant | null>(null);

  // Время старта — фиксируется при mount, используется в шаге 5 для durationSeconds.
  const startedAtRef = useRef<number>(0);
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  // Скролл вверх при смене шага.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [step]);

  const [confirmExitOpen, setConfirmExitOpen] = useState(false);

  function goBack() {
    if (step === 1) {
      setConfirmExitOpen(true);
      return;
    }
    setStep((s) => Math.max(1, s - 1) as Step);
  }

  function goNext() {
    // Временная заглушка: после подхода 1 шаг 3 ведёт на главный.
    // В подходе 2 здесь появятся шаги 4–5.
    if (step === 3) {
      router.push("/");
      return;
    }
    setStep((s) => Math.min(TOTAL, s + 1) as Step);
  }

  const canStep1 =
    situation.trim().length >= 3 && intensityBeforeInteracted;
  const canStep2 =
    feeling !== null &&
    (feeling !== "другое" || customFeeling.trim().length > 0);
  const canStep3 = rootWant !== null;

  const canNext =
    step === 1 ? canStep1 : step === 2 ? canStep2 : step === 3 ? canStep3 : false;

  const nextLabel = step === 5 ? "Завершить сессию" : "Дальше";

  // Подсказка под disabled-кнопкой «Дальше». null когда валидно — место зарезервировано
  // через min-h ниже, чтобы кнопка не прыгала при появлении/исчезновении подсказки.
  function getNextHint(): string | null {
    if (canNext) return null;
    if (step === 1) {
      if (situation.trim().length < 3) return "Опиши ситуацию, чтобы продолжить";
      if (!intensityBeforeInteracted)
        return "Дотронься до ползунка, чтобы зафиксировать интенсивность";
    }
    if (step === 2) {
      if (feeling === null) return "Выбери чувство";
      if (feeling === "другое" && customFeeling.trim().length === 0)
        return "Назови своё чувство";
    }
    if (step === 3) {
      if (rootWant === null) return "Выбери одно из трёх";
    }
    return null;
  }
  const nextHint = getNextHint();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between text-sm">
        <button type="button" onClick={goBack} className="text-muted">
          ‹ назад
        </button>
        <span className="text-muted tabular-nums">
          {step} / {TOTAL}
        </span>
      </header>

      <ProgressDots current={step} total={TOTAL} />

      <div key={step} className="animate-fade-in">
        {step === 1 && (
          <SituationStep
            situation={situation}
            intensity={intensityBefore}
            hasInteractedIntensity={intensityBeforeInteracted}
            onSituation={setSituation}
            onIntensity={(v) => {
              setIntensityBefore(v);
              setIntensityBeforeInteracted(true);
            }}
          />
        )}
        {step === 2 && (
          <FeelingStep
            feeling={feeling}
            customFeeling={customFeeling}
            onFeeling={(f) => {
              setFeeling(f);
              if (f !== "другое") setCustomFeeling("");
            }}
            onCustomFeeling={setCustomFeeling}
          />
        )}
        {step === 3 && (
          <WantStep rootWant={rootWant} onSelect={setRootWant} />
        )}
        {step >= 4 && (
          <div className="rounded-lg bg-secondary p-4 text-sm text-muted">
            Шаги 4–5 появятся в следующем подходе.
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          className="rounded-lg bg-accent px-6 py-4 text-center text-base font-medium text-accent-fg transition active:opacity-80 disabled:opacity-40"
        >
          {nextLabel}
        </button>
        <p
          className="min-h-4 text-center text-2xs text-tertiary"
          aria-live="polite"
        >
          {nextHint ?? ""}
        </p>
      </div>

      <ConfirmDialog
        open={confirmExitOpen}
        title="Прервать сессию?"
        description="Введённое не сохранится."
        confirmLabel="Прервать"
        cancelLabel="Продолжить"
        destructive
        onCancel={() => setConfirmExitOpen(false)}
        onConfirm={() => {
          setConfirmExitOpen(false);
          router.push("/");
        }}
      />
    </div>
  );
}
