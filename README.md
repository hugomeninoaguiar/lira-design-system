# Lira Design System

One design system. Four digital surfaces.

| Surface | Repo | Theme | Stack |
|---|---|---|---|
| Lira for Women — mobile app | `lira` | `women` | Expo / React Native |
| Lira for Women — marketing | `lira-website` (root, `/`, blog) | `women` | Next.js + Tailwind v4 |
| Lira for Professionals — marketing | `lira-website` (`/lira-for-professionals`) | `professionals` | Next.js + Tailwind v4 |
| Lira for Professionals — clinical product | `lira-clinical-protocol` | `professionals` | Next.js + Tailwind v4 |

Underneath all four: a **Universal Core** of tokens, type, spacing, radius, shadow, accessibility, and shared rules.

---

## How it works in 60 seconds

1. **One source of truth.** Every hex, every spacing value lives in `tokens/*.json`. Nothing else.
2. **Two themes, one set of components.** Components reference *semantic* tokens (e.g. `--semantic-action-primary`). The active theme — Women or Professionals — is picked by setting `data-theme` on `<html>` (web) or wrapping in `<LiraThemeProvider>` (RN).
3. **Generated artifacts.** `npm run build:tokens` emits CSS variables, a Tailwind v4 preset, ES + CJS JS, TS types, and an RN theme. Consumers import these — they never see the source JSON.
4. **Distributed via git URL.** Each consumer adds `"@lira/design-system": "github:hugomeninoaguiar/lira-design-system#main"` to its `package.json`. No npm registry, no monorepo migration.

---

## Repo layout

```
tokens/                           Source of truth (JSON only — never hex anywhere else)
  primitives/                       Raw scales: color, space, radius, type, shadow
  semantic/                         Purpose-bound: text, surface, action, border…
    core.json                         Universal Core = Women defaults, applied at :root
    professionals.json                Overrides applied under [data-theme="professionals"]
    typography.json                   Text styles (display, h1…h5, body, caption…)
  components/                       Optional component-scoped tokens (button, chart…)

scripts/build-tokens.mjs           Zero-dep build pipeline (Node 18+, no install needed)

dist/                             ⚙ Generated. Committed. Do not edit.
  css/tokens.css                    CSS variables, theme-scoped
  tailwind/theme.css                Tailwind v4 @theme preset
  js/tokens.esm.js .cjs.js .d.ts    JS / TS token objects
  react-native/theme.ts             RN themes: { women, professionals }

src/
  web/                              React primitives (CVA + Radix shadcn-style)
    primitives/                       Button, Input, Textarea, Card, Badge, Label, Field,
                                       Checkbox, Heading, Text, Stack, Callout, Container
    theme/ThemeProvider.tsx           Sets data-theme + provides surface context
    lib/cn.ts                         clsx + tailwind-merge helper
  react-native/                     RN entry: theme + App* components
    theme/ThemeProvider.tsx           Provides theme via Context
    components/                       AppButton, AppText, AppCard, AppScreen, AppHeader,
                                       AppListRow, AppCallout, AppTextField, AppToggle,
                                       AppStepper, AppBadge
  chart-utils/                      Shared utilities for sparklines / radar / etc.

docs/                              Developer documentation (start at docs/00-getting-started.md)
examples/                          Static HTML showcase — open examples/index.html in a browser
assets/                            Brand: icons, illustrations
```

---

## Quick start (per repo)

Each surface has a one-page integration spec under `docs/00-getting-started.md`. Short version:

### Web — Next.js + Tailwind v4 (`lira-website`, `lira-clinical-protocol`)

```jsonc
// package.json
"dependencies": {
  "@lira/design-system": "github:hugomeninoaguiar/lira-design-system#main"
}
```

```css
/* src/app/globals.css */
@import "@lira/design-system/tokens.css";   /* CSS variables, both themes */
@import "@lira/design-system/tailwind";     /* Tailwind v4 @theme preset */
@import "tailwindcss";
```

```tsx
// src/app/layout.tsx (Professionals product example)
export default function RootLayout({ children }) {
  return (
    <html data-theme="professionals">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// Use primitives anywhere
import { Button, Card, CardTitle, CardContent, Field, Input } from "@lira/design-system/web";
```

### Mobile — Expo / React Native (`lira`)

```jsonc
"dependencies": {
  "@lira/design-system": "github:hugomeninoaguiar/lira-design-system#main"
}
```

```tsx
// App.tsx
import { LiraThemeProvider } from "@lira/design-system/react-native";

export default function App() {
  return (
    <LiraThemeProvider>
      <YourApp />
    </LiraThemeProvider>
  );
}
```

```tsx
import { AppScreen, AppButton, AppText } from "@lira/design-system/react-native";
```

---

## When to change something — the contract

| Want to change | Edit | Run | Then |
|---|---|---|---|
| A color, spacing, radius, type size | `tokens/primitives/*.json` | `npm run build:tokens` | Commit `tokens/` and `dist/` together |
| A semantic role (e.g. what "primary action" maps to) | `tokens/semantic/core.json` or `professionals.json` | `npm run build:tokens` | Commit |
| A component's API or layout | `src/web/primitives/*.tsx` or `src/react-native/components/*.tsx` | — | Bump version, write CHANGELOG entry |
| Brand voice, principles | `docs/01-principles.md` and `docs/08-content-and-voice.md` | — | Commit |

**Hard rules:**
- No hex codes outside `tokens/`. Anywhere. Ever.
- No `bg-[#ACDBC5]`, no inline `style={{ backgroundColor: '#5A9E78' }}`, no per-app token files.
- Components consume **semantic** tokens, not primitives. `bg-action-primary`, not `bg-green-500`.
- The Women theme is `:root`. The Professionals theme is `[data-theme="professionals"]`. Nothing else.

---

## Versioning

We follow semver. The package is private — bump versions via git tags:

```bash
git tag v1.0.0 && git push --tags
```

Consumer repos can pin to a tag: `"github:hugomeninoaguiar/lira-design-system#v1.0.0"`.

See `CHANGELOG.md` for change history and `docs/10-versioning.md` for the policy.

---

## Documentation

- `docs/00-getting-started.md` — full integration walkthrough for each surface
- `docs/01-principles.md` — the design philosophy (Women: warm/calm; Professionals: clinical with Lira DNA)
- `docs/02-tokens.md` — token model in detail
- `docs/03-themes-and-surfaces.md` — how the four surfaces share one system
- `docs/04-web-primitives.md` — React component reference
- `docs/05-react-native.md` — RN component reference
- `docs/06-charts.md` — chart palettes (consumer vs clinical)
- `docs/07-accessibility.md` — color contrast, focus, motion, screen-reader rules
- `docs/08-content-and-voice.md` — Lira's voice baked into the system
- `docs/09-contributing.md` — how to propose changes
- `docs/10-versioning.md` — release policy

For a visual walkthrough, open `examples/index.html` in a browser.
