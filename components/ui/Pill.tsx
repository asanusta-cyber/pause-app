import type { ReactNode } from "react";

type Tone = "default" | "success";

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const cls =
    tone === "success"
      ? "bg-success-bg text-success-text"
      : "bg-secondary text-primary";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs ${cls}`}
    >
      {children}
    </span>
  );
}
