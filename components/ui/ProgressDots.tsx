interface Props {
  current: number;
  total?: number;
}

export function ProgressDots({ current, total = 5 }: Props) {
  return (
    <div
      className="flex gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Шаг ${current} из ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < current;
        return (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              filled ? "bg-primary" : "bg-secondary"
            }`}
          />
        );
      })}
    </div>
  );
}
