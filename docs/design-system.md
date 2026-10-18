# Spendly Design System

Status: Phase 2 foundation. Interface copy is English. No expense data or business behavior is included in this milestone.

## Visual direction

A quiet personal finance workspace: warm neutral canvas, clean white cards, a restrained forest-green accent, readable typography, and generous spacing. Code-native line icons support navigation without replacing text labels. No stock imagery, chart package, remote font, or UI kit is required.

## Tokens

Tokens live in `src/app/globals.css` using Tailwind's `@theme` interface.

| Token | Value | Use |
| --- | --- | --- |
| canvas | `#f6f7f4` | Page background |
| surface | `#ffffff` | Navigation and cards |
| ink | `#172b25` | Headings and primary text |
| muted | `#58665f` | Supporting text |
| line | `#dce3dc` | Decorative borders and dividers |
| control | `#7b8980` | Input boundaries |
| brand | `#245c45` | Primary buttons, focus outlines, accents |
| brand-hover | `#194632` | Primary button hover |
| brand-soft | `#e8f0e9` | Selected navigation and icon backgrounds |
| danger | `#b42318` | Field error text and invalid input borders |

System sans-serif stack: Arial, Helvetica, sans-serif. Heading sizes use 30/36px for page titles, 20/24px for card headings, 16px for body text, 14px for supporting text, and 12px for small labels. Input text remains 16px.

Use Tailwind's 4px spacing scale: 8/12px for close relationships, 16/24px within controls/cards, 32/36px between content sections, and up to 56px for desktop page insets. Controls have a 12px radius; cards have a 20px radius; badges use pill shapes. Cards have a light 1px border and subtle shadow. Controls and navigation targets have a minimum height of 44px.

## Responsive shell

At Tailwind's `lg` breakpoint (1024px), use a 250px left navigation column and a flexible content column. Below that, navigation wraps in a top header. The main area has a maximum width of 1152px and horizontal padding of 20/36/48px across narrow, medium, and large layouts. No fixed-width content or horizontally scrolling finance tables exist in Phase 2.

## Component contracts

| Component | Contract |
| --- | --- |
| Button | Native button props, primary/secondary variants, disabled semantics, default `type="button"`; callers choose `submit` explicitly |
| buttonStyles | Reuse button styling for actual Next links; do not nest a button in a link |
| Input | Native input props, visible boundary/focus, disabled and invalid states; use with a real label |
| FormField | Required id and label; optional hint/error; connects label and descriptions to Input, marks invalid fields, preserves native defaults and external described-by references |
| Card | Styled neutral container; supports native div/ARIA attributes; caller supplies semantic headings |
| Navigation | Four Next links; exact-path matching selects only one active item using `aria-current="page"` |
| AppShell | Shared brand, responsive navigation, skip link, one main landmark, and footer |
| PagePlaceholder | Consistent title and a clearly labeled coming-soon card; only functional links, no pretend actions |

Input, FormField, and Button are provided for later forms, not mounted as a nonfunctional expense form in Phase 2. Navigation uses links styled with buttonStyles where appropriate.

## Accessibility foundation and checks

Native links/buttons/inputs preserve browser keyboard semantics. Global focus-visible outlines are 2px with a 4px offset. The skip link points to a focusable main landmark. Decorative icons are hidden from assistive technology. Selected navigation has a background and accessible current-page state. Color transitions respect reduced-motion preferences.

Calculated token contrast ratios: ink/white 14.91:1, muted/white 6.03:1, muted/canvas 5.61:1, white/brand 7.80:1, brand/brand-soft 6.71:1, danger/white 6.57:1. Input boundary/white is 3.66:1. Decorative line borders are not the sole control boundary.

Static semantic checks verified Button types/disabled state, FormField label/error/hint associations and native value passthrough, Input native attributes, and Card ARIA attributes. These checks and calculated contrast are not a substitute for actual keyboard, screen-reader, or visual responsive testing. Browser visual testing was unavailable in this session and remains a later verification obligation.
