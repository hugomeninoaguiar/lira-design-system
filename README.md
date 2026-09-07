# Lira Design System

One system, two products, four surfaces. Shared primitives plus one semantic theme per surface.

A surface only ever uses its own theme. Nothing here is meant to be consumed
as a whole: importing another surface's tokens is how a product ends up
looking like something it is not.

## Scope

- **Primitives** (`tokens/primitives/*.json`) — single source of truth for color, type, space, radius, shadow. Reused across every surface.
- **Semantic themes** (`tokens/semantic/*.json`), one per surface, never mixed:
  - `core.json` for the Women mobile app (React Native, current production)
  - `women-web.json` for the Women website (homepage and `/for-women`)
  - `pro-web.json` for the Professionals marketing page (`/lira-for-professionals`)
  - `pro-app.json` for the Professionals clinical app
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
    pro-web.json           Web · Professionals, marketing page only
    pro-app.json           App · Professionals (the clinical app)
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

## Surfaces: which theme, in which repo

Two products, four surfaces. The product a surface belongs to matters more
than whether it is web or native, so the table names the repo: that is the
question people and models actually need answered.

**Lira for Women** (consumer)

| Surface | Repo | Theme file | Feel |
| --- | --- | --- | --- |
| Mobile app | `lira` | `tokens/semantic/core.json` | Warm, illustrated, rounded. Daily-use, low-overwhelm. |
| Website | `lira-website` | `tokens/semantic/women-web.json` | Same warmth, scaled up for marketing: bigger type, more whitespace. |

**Lira for Professionals** (B2B)

| Surface | Repo | Theme file | Feel |
| --- | --- | --- | --- |
| Marketing page (`/lira-for-professionals`) | `lira-website` | `tokens/semantic/pro-web.json` | Cooler, restrained, sage-led, tighter radii. Clinical credibility. |
| Clinical app | `lira-clinical-protocol` | `tokens/semantic/pro-app.json` | Slate and violet, dense, functional. Built on Tailwind's scales. |

The two Professionals surfaces do not look the same and are not meant to.
The marketing page persuades a clinician to sign up; the app is where she
spends her working day. `pro-web.json` used to claim both, which is why the
clinical app was never described anywhere.

### What consumes what

| Consumer | How |
| --- | --- |
| `lira` (mobile app) | npm dependency on this repo; imports `dist/` and `src/react-native/` |
| `lira-website` | CSS variables **copied by hand** into `src/app/globals.css`. Nothing regenerates it, so it drifts. It already has: see below |
| `lira-clinical-protocol` | **Nothing.** `pro-app.json` is a written record of its palette, not a dependency. Its `CLAUDE.md` carries the same table; change both together |

Only `tokens/primitives/*`, `tokens/semantic/core.json` and
`tokens/semantic/typography.json` reach the build, so the mobile app is the
one consumer that can be broken by a token change. The other semantic files
are documentation of a surface and are safe to edit.

### Known drift: the brand green

`lira-website` rebranded the dark green to `#1E3A2E` in 2026 and records it in
`globals.css` as "logo dark green (rebrand 2026), was #52766A". This repo still
carries `#52766A` as `color.green.500`, and `core.json` uses it for the mobile
app's primary action, focus ring, active tab and high-confidence state.

So the mobile app is on the pre-rebrand green. Whether the rebrand was meant
for marketing only or the app is behind has not been decided, and changing the
primitive settles it for the app either way. Decide first, then change it.

### One surface never imports another

The build currently emits a single theme (`themes = { women }`), which is the
mobile app's. That is the right shape and worth keeping as more surfaces are
added: a consumer should be handed its own theme and nothing else.

The temptation, when a second consumer arrives, is to export everything and
let each one pick. Do not. A product that can reach another product's tokens
will eventually use them, usually by accident, and the two drift into looking
like each other. If the website ever imports from here rather than generating
CSS variables, give it `women-web` and `pro-web` as separate entry points.

The clinical app is the clearest case: it imports nothing, and its section in
`docs/index.html` is pinned to `pro-app` so that even reading the page cannot
suggest it looks like the marketing site.

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
