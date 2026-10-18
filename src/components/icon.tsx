import type { SVGProps } from "react";

export type IconName = "overview" | "expenses" | "summary" | "plus" | "arrow" | "leaf";

const paths: Record<IconName, string> = {
  overview: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
  expenses: "M6 3h12v18l-3-2-3 2-3-2-3 2V3 M9 8h6 M9 12h6",
  summary: "M5 20V12 M12 20V4 M19 20V8",
  plus: "M12 5v14 M5 12h14",
  arrow: "M5 12h14 M13 6l6 6-6 6",
  leaf: "M19 4C9 3 3 7 5 14c2 7 13 7 14-10Z M6 19l8-9",
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      <path d={paths[name]} />
    </svg>
  );
}
