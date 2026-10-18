import type { ComponentProps } from "react";

type SelectFieldProps = Omit<ComponentProps<"select">, "id" | "aria-invalid"> & {
  id: string;
  label: string;
  error?: string;
};

export function SelectField({ id, label, error, required, children, className = "", "aria-describedby": describedBy, ...props }: SelectFieldProps) {
  const description = [describedBy, error ? `${id}-error` : undefined].filter(Boolean).join(" ");
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}{required && <span className="ml-1 font-normal text-muted">(required)</span>}
      </label>
      <select id={id} required={required} aria-invalid={error ? true : undefined} aria-describedby={description || undefined}
        className={`min-h-11 w-full rounded-control border border-control bg-surface px-3 py-2.5 text-base text-ink disabled:cursor-not-allowed disabled:bg-canvas aria-invalid:border-danger ${className}`} {...props}>
        {children}
      </select>
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-danger">{error}</p>}
    </div>
  );
}
