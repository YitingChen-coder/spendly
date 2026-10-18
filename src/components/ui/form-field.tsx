import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";

type FormFieldProps = Omit<ComponentProps<typeof Input>, "id" | "aria-invalid"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

export function FormField({ id, label, hint, error, required, "aria-describedby": describedBy, ...props }: FormFieldProps) {
  const description = [describedBy, hint ? `${id}-hint` : undefined, error ? `${id}-error` : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}{required && <span className="ml-1 font-normal text-muted">(required)</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="text-sm text-muted">{hint}</p>}
      <Input id={id} required={required} aria-invalid={error ? true : undefined} aria-describedby={description || undefined} {...props} />
      {error && <p id={`${id}-error`} role="alert" className="text-sm text-danger">{error}</p>}
    </div>
  );
}
