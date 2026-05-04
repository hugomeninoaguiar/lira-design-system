# Themes & Surfaces

## Two themes, four surfaces

The system has **two themes** — Women and Professionals — and **four product surfaces**. Each surface is a `(theme, channel)` pair:

| Surface | Theme | Channel | Lives in |
|---|---|---|---|
| Lira for Women — app | `women` | mobile | `lira` |
| Lira for Women — marketing | `women` | web | `lira-website` (root) |
| Lira for Professionals — marketing | `professionals` | web | `lira-website` (`/lira-for-professionals`) |
| Lira for Professionals — clinical product | `professionals` | web | `lira-clinical-protocol` |

The theme decides the **color and feel**. The channel decides the **layout density and component vocabulary** (mobile screens vs. marketing pages vs. data tables). Both differences are encoded already:

- **Theme** → CSS variables under `[data-theme]` / RN theme object.
- **Channel** → which component family you import (`@lira/design-system/web` vs `/react-native`) and which layout patterns you use.

## Setting the theme

### Web — set `data-theme` on `<html>`

```tsx
// Professionals product (always Professionals)
<html data-theme="professionals">

// Women marketing (default — also fine to omit)
<html data-theme="women">
```

### Web — different theme per route segment

```tsx
// app/(women)/layout.tsx
<div data-theme="women">{children}</div>

// app/lira-for-professionals/layout.tsx
<div data-theme="professionals">{children}</div>
```

### Web — with React context

```tsx
import { LiraThemeProvider } from '@lira/design-system/web';

<LiraThemeProvider surface="professionals">
  {/* Reads `useLiraSurface()` anywhere */}
</LiraThemeProvider>
```

### React Native

```tsx
import { LiraThemeProvider } from '@lira/design-system/react-native';

<LiraThemeProvider themeName="women">
  <App />
</LiraThemeProvider>
```

## Surface guidelines

| Aspect | Women app | Women marketing | Pros marketing | Pros product |
|---|---|---|---|---|
| Page bg | `--semantic-background-app` (`#F7F3ED`) | white sections + `accent-mint` heroes | white sections + sage neutrals | `--semantic-background-app` (`#F8FAF8`) |
| Default radius | `lg` (16) | `lg` / `2xl` for hero cards | `md` / `lg` | `md` (12) |
| Density | airy (24px+ between groups) | airy (32px+ in hero stacks) | medium | dense (12–16px between rows) |
| Illustration | yes — Lira character welcome | yes — hero illustrations | sparingly — calm icon set | no — pure data UI |
| Charts | `chart.consumer` (green sparklines) | n/a | n/a | `chart.clinical` (multi-series) |
| Voice | first-person Lira | first-person + occasional third-person | calm, evidence-led, third-person | clinical, third-person |

## Component vocabulary

| Surface | Use these |
|---|---|
| Women app | `App*` from `@lira/design-system/react-native` |
| Women marketing | Web primitives + marketing-specific compositions in `lira-website` |
| Pros marketing | Same web primitives — `data-theme="professionals"` only |
| Pros product | Same web primitives — `data-theme="professionals"` |

> Marketing-specific compositions (Hero, FeatureGrid, FAQ, Footer) live in `lira-website/src/components/`. They're built from design-system primitives — but they're *content layout*, not a design-system concern. Don't pull them into the design system.

## Adding a new surface

If a fifth surface ever appears (admin tool? mobile pro app?):

1. Decide which theme fits — Women or Professionals.
2. Pick the channel — web (Next + Tailwind) or RN.
3. Reuse the existing primitives. **Don't** add a new theme unless the brand really diverges.
4. If the surface needs unique semantic roles (e.g. an "admin warning" color), add the role to `tokens/semantic/core.json` and `professionals.json` — never as a one-off.
