# Changelog

All notable changes to the Lira Design System are recorded here.
The format follows [Keep a Changelog](https://keepachangelog.com), and we follow [Semantic Versioning](https://semver.org).

## [Unreleased] — 2026-10-15

### Changed

- **Pro · Web (`pro-web.json`) reduced to what the page uses.** Direction B of the professionals marketing page: white page, `green.500` as the hero field and the action on light, `green.300` as the action on the field, sage only for eyebrows, Geist and Geist Mono, no serif, radius 8 for buttons. The surface went from 46 tokens to 16; feedback, data and evidence tokens are gone from it (the page uses primitives directly or not at all). The website mirrors these by hand in `globals.css`, which is why the file is short: fewer places to drift.
- **Pro · App (`pro-app.json`) follows the app.** Chrome, links and identity chips are the brand green (`action.brand`), actions are ink (`#0f172a`), the violet entries are gone. The preview's App · Professionals tab shows the same.
- **Women · Web (`women-web.json`)**: the `feedback` block came out; those are primitives in `color.json` and were duplicated.
- **Preview (`docs/index.html`)**: Pro Web without Fraunces, Pro App without violet.

## [1.0.0] — 2026-05-04

### Added

- **Token architecture**: three-layer model (primitives → semantic → component) with two themes (Women + Professionals).
- **Source-of-truth tokens** in `tokens/` covering color, space, radius, typography, shadow, plus semantic roles (background, text, border, action, feedback, accent) and component tokens (button, chart).
- **Zero-dependency build pipeline** at `scripts/build-tokens.mjs`. Emits CSS variables, Tailwind v4 `@theme` preset, ESM/CJS JS, TS declarations, and a typed React Native theme.
- **Web primitives** (`@lira/design-system/web`): `Button`, `Input`, `Textarea`, `Card`, `Badge`, `Label`, `Field`, `Checkbox`, `Heading`, `Text`, `Stack`, `Callout`, `Container`, plus `LiraThemeProvider` and `cn` helper. Built on CVA + Radix.
- **React Native components** (`@lira/design-system/react-native`): `AppButton`, `AppText`, `AppCard`, `AppScreen`, `AppHeader`, `AppListRow`, `AppCallout`, `AppTextField`, `AppToggle`, `AppStepper`, `AppBadge`, plus `LiraThemeProvider`, `useLiraTheme`, `useLiraThemeName`.
- **Chart utilities** (`@lira/design-system/chart-utils`): `normalizeValues`, `pointsFromValues`, `buildPolylinePath`, `buildSmoothPath`.
- **Documentation suite** in `docs/` covering getting-started, principles, tokens, themes & surfaces, primitives, charts, accessibility, voice, contributing, and versioning.
- **HTML showcase** under `examples/` with token, theme, component, and chart galleries.

### Changed (relative to 1.1.0-alpha)

- Replaced split `tokens/design-tokens.json` + `style-dictionary/tokens.json` with a single canonical `tokens/` tree.
- Replaced Style Dictionary build with a zero-dependency Node build script — same output shape, no install hell, easier to extend.
- `AppButton` now references valid token paths (the alpha referenced `colors.action.*` which didn't exist).
- All hex literals in component code removed; everything goes through semantic tokens.
- Documentation collapsed from 21 sprawling files to 10 focused topic docs.

### Removed

- Old broken `dist/tokens.css` + `dist/tokens.ts` artifacts.
- Audit-style markdown files that mixed audit notes with specs.
