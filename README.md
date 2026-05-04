# Lira Design System

Mobile design tokens and React Native components for **Lira for Women**.

## Scope

- Mobile only (`lira` app).
- Women theme only (`women`).
- No website primitives, no web build outputs, and no secondary theme support.

## Quick start

Install in the mobile app:

```jsonc
"dependencies": {
  "@lira/design-system": "github:hugomeninoaguiar/lira-design-system#main"
}
```

Wrap app root:

```tsx
import { LiraThemeProvider } from '@lira/design-system/react-native';

export default function App() {
  return (
    <LiraThemeProvider>
      <YourApp />
    </LiraThemeProvider>
  );
}
```

Use components and theme:

```tsx
import { AppScreen, AppCard, AppText, AppButton, useLiraTheme } from '@lira/design-system/react-native';
```

## Repo layout

```
tokens/                    Source of truth (JSON)
  primitives/              Raw scales: color, space, radius, typography, shadow
  semantic/                Semantic mappings used by components/apps
    core.json              Women semantic defaults
    typography.json        Text style roles
  components/              Component-scoped tokens (e.g. button, chart)

scripts/build-tokens.mjs   Token build pipeline

dist/                      Generated artifacts (committed)
  js/                      ESM/CJS tokens + types
  react-native/theme.ts    React Native theme output

src/
  react-native/            RN components + theme provider
  chart-utils/             Chart path/math utilities

docs/                      Documentation (start at docs/00-getting-started.md)
assets/                    Brand assets
```

## Build

```bash
npm run build:tokens
```

Commit `tokens/` and `dist/` together after token edits.

## Rules

- No hex values outside `tokens/`.
- Components consume semantic tokens, not primitives.
- Keep changes focused on Lira for Women mobile use cases.

## Documentation

- `docs/00-getting-started.md`
- `docs/01-principles.md`
- `docs/02-tokens.md`
- `docs/05-react-native.md`
- `docs/06-charts.md`
- `docs/07-accessibility.md`
- `docs/08-content-and-voice.md`
- `docs/09-contributing.md`
- `docs/10-versioning.md`
