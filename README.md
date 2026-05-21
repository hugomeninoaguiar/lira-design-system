# Lira Design System

One system, three surfaces. Shared primitives + per-surface semantic themes.

## Scope

- **Primitives** (`tokens/primitives/*.json`) — single source of truth for color, type, space, radius, shadow. Reused across every surface.
- **Semantic themes** (`tokens/semantic/*.json`):
  - `core.json` — Mobile · Women (React Native app — current production)
  - `women-web.json` — Web · Women (homepage + `/for-women` marketing)
  - `pro-web.json` — Web · Professionals (`/lira-for-professionals` + clinical surfaces)
- **Component primitives** (`src/react-native/`) — RN components for the mobile app. Web component primitives currently live in the website repo and consume the same tokens via CSS variables.
- **Preview** (`docs/preview.html`) — self-contained HTML page rendering tokens + components for all three themes with a theme switcher. Open it in any browser; no build step needed.

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
  semantic/                Semantic mappings — one file per surface
    core.json              Mobile · Women (current production app)
    women-web.json         Web · Women (homepage + /for-women)
    pro-web.json           Web · Professionals (/lira-for-professionals)
    typography.json        Text style roles (shared)
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

- No hex values outside `tokens/`. Always reference a semantic token (preferred) or a primitive token.
- Components consume **semantic** tokens, not primitives.
- Primitives are shared across all surfaces. Surface-specific decisions live in `tokens/semantic/<surface>.json`.
- When adding a new design decision, ask first: does it belong in a primitive (shared), a semantic mapping (surface-specific), or as a component token? Avoid duplicating across surfaces.

## Surfaces — when to use which theme

| Surface | Theme file | Feel |
| --- | --- | --- |
| Mobile · Women (RN app) | `tokens/semantic/core.json` | Warm, illustrated, rounded. Daily-use, low-overwhelm. |
| Web · Women (homepage + `/for-women`) | `tokens/semantic/women-web.json` | Same warmth, scaled up for marketing — bigger type, more whitespace. |
| Web · Professionals (`/lira-for-professionals`, clinical) | `tokens/semantic/pro-web.json` | Cooler, restrained, sage-led, tighter radii. Clinical credibility. |

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
