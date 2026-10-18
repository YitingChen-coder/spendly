import type { ComponentProps } from "react";

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return (
    <input
      className={`min-h-11 w-full rounded-control border border-control bg-surface px-3 py-2.5 text-base text-ink placeholder:text-muted disabled:cursor-not-allowed disabled:bg-canvas aria-invalid:border-danger ${className}`}
      {...props}
    />
  );
}
