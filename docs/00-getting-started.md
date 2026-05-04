# Getting Started

Pick the surface you're integrating and follow the matching section. Each section ends in a sanity check so you can verify the design system is wired up before writing app code.

## Common — install in any consumer repo

```jsonc
// package.json (any consumer repo)
{
  "dependencies": {
    "@lira/design-system": "github:hugomeninoaguiar/lira-design-system#main"
  }
}
```

Then install:

```bash
pnpm install     # or npm / yarn
```

The published files live in `dist/` (CSS variables, JS tokens, RN theme). They're committed to the design-system repo on purpose — git-URL installs need them ready.

To pin a version: replace `#main` with `#v1.0.0` (or any git tag).

---

## 1. Lira for Women — mobile app (`lira`)

**Stack:** Expo / React Native 0.81 / React 19 / TypeScript.

### Step 1 — install the design system

See "Common" above.

### Step 2 — wrap the app in `LiraThemeProvider`

```tsx
// App.tsx
import { LiraThemeProvider } from '@lira/design-system/react-native';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <LiraThemeProvider>
      <RootNavigator />
    </LiraThemeProvider>
  );
}
```

`LiraThemeProvider` defaults to `themeName="women"`. That is correct for the mobile app.

### Step 3 — use App* components

```tsx
import { AppScreen, AppText, AppButton, AppCard } from '@lira/design-system/react-native';

export function HomeScreen() {
  return (
    <AppScreen>
      <AppText variant="h2">Hey, you</AppText>
      <AppText variant="body" tone="secondary">
        Let's see what your energy is up to today.
      </AppText>
      <AppCard tone="accent">
        <AppText variant="title">Morning check-in</AppText>
        <AppText variant="body">Two minutes — that's it.</AppText>
        <AppButton label="Start" variant="primary" />
      </AppCard>
    </AppScreen>
  );
}
```

### Step 4 — read tokens directly when you need to

Most styling should come from App* components. When you need a raw value (custom svg, animation), use the theme:

```tsx
import { useLiraTheme } from '@lira/design-system/react-native';

function Sparkline() {
  const theme = useLiraTheme();
  return <Svg stroke={theme.semantic.action.primary} />;
}
```

### Step 5 — sanity check

- ✅ The default page background is warm beige (`#F7F3ED`).
- ✅ A primary `<AppButton>` is mint-green pill-shaped.
- ✅ Body text is near-black (`#1C1C1C`); secondary text is muted brown (`#8A7A6A`).

If any of those don't match, the provider isn't wrapping the tree — go back to Step 2.

### Migration plan from the current app

The current `lira` repo has hard-coded hex everywhere (`#A8D5BA`, `#F0F9F4`, …). Replace gradually:

1. Wrap App in `LiraThemeProvider` (Step 2).
2. Pick one screen at a time — Home → Check-in → Reward — and replace its inline styles with `App*` components.
3. For anything not yet componentized, swap raw hex for `useLiraTheme()` lookups.
4. When a screen has zero hex literals, mark it as migrated.

---

## 2. feelwithlira.com — Women + Professionals marketing (`lira-website`)

**Stack:** Next.js 16 / Tailwind v4 / React 19 / Radix / framer-motion / MDX.

### Step 1 — install

See "Common" above.

### Step 2 — import tokens + Tailwind preset in `globals.css`

Replace the existing `@import "tailwindcss"` line with:

```css
/* src/app/globals.css */
@import "@lira/design-system/tokens.css";   /* CSS variables for both themes */
@import "@lira/design-system/tailwind";     /* Tailwind v4 @theme preset */
@import "tailwindcss";

/* Keep your prose styles below — they're surface-specific. */
```

You can now use utilities like `bg-action-primary`, `text-text-secondary`, `border-border-subtle`, `rounded-pill`, etc. (See `docs/02-tokens.md` for the full Tailwind class map.)

### Step 3 — set the theme per route segment

The Women marketing pages should render under `data-theme="women"` (the default). The `/lira-for-professionals` segment switches to Professionals.

```tsx
// src/app/(women)/layout.tsx — Women marketing pages
export default function WomenLayout({ children }) {
  return <div data-theme="women">{children}</div>;
}
```

```tsx
// src/app/lira-for-professionals/layout.tsx — Professionals marketing
export default function ProfessionalsLayout({ children }) {
  return <div data-theme="professionals">{children}</div>;
}
```

Or use the provider if you want React context too:

```tsx
import { LiraThemeProvider } from '@lira/design-system/web';

export default function ProfessionalsLayout({ children }) {
  return <LiraThemeProvider surface="professionals">{children}</LiraThemeProvider>;
}
```

### Step 4 — adopt the primitives

Replace ad-hoc `bg-brand-mint` and inline `bg-[#ACDBC5]` classes with primitives:

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, Container, Heading, Text } from '@lira/design-system/web';

export function HeroSection() {
  return (
    <section className="bg-accent-mint py-24">
      <Container width="xl">
        <Heading level="display">Your brain works differently.</Heading>
        <Text variant="bodyLarge" tone="secondary" className="mt-4">
          A gentle digital space built for neurodivergent women.
        </Text>
        <Button size="lg" className="mt-8">Join the waitlist</Button>
      </Container>
    </section>
  );
}
```

### Step 5 — sanity check

- ✅ At `/`, the page background is warm and the hero accent is mint green.
- ✅ At `/lira-for-professionals`, the page background is cool off-white and the accent shifts to sage.
- ✅ DevTools shows `--semantic-action-primary` resolving to `#5A9E78` on Women, `#52766A` on Professionals.

### Migration plan

1. Wire imports + theme attribute (Steps 2 & 3).
2. Replace each top-level component (Header, Hero, Footer, Testimonials) one at a time with primitives.
3. Audit MDX content — replace inline color hex with semantic Tailwind utilities.
4. Delete the local `bg-brand-mint` config; it now comes from the preset.

---

## 3. Lira for Professionals — clinical product (`lira-clinical-protocol`)

**Stack:** Next.js 16 / Tailwind v4 / React 19 / Radix / shadcn-style components.

### Step 1 — install

See "Common" above.

### Step 2 — replace the bespoke palette in `globals.css`

The current `globals.css` declares custom slate `--color-primary: #334155;` etc. **Delete those.** They don't match Lira's brand. Replace with:

```css
/* src/app/globals.css */
@import "@lira/design-system/tokens.css";
@import "@lira/design-system/tailwind";
@import "tailwindcss";

body {
  background: var(--semantic-background-app);
  color: var(--semantic-text-primary);
  font-family: var(--font-sans);
}

button, a { cursor: pointer; }
```

### Step 3 — set Professionals theme on `<html>`

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="professionals">
      <body>{children}</body>
    </html>
  );
}
```

### Step 4 — replace local `src/components/ui/*` with the design system

The clinical protocol's `Button`, `Input`, `Label`, `Checkbox` in `src/components/ui/` should be deleted and re-exported:

```tsx
// src/components/ui/index.ts (transitional)
export { Button } from '@lira/design-system/web';
export { Input } from '@lira/design-system/web';
export { Label } from '@lira/design-system/web';
export { Checkbox } from '@lira/design-system/web';
```

Existing imports keep working; future imports go directly to `@lira/design-system/web`.

### Step 5 — sanity check

- ✅ Page background is cool `#F8FAF8`.
- ✅ Primary buttons use sage `#52766A` (not slate `#334155`).
- ✅ Charts use the **clinical** palette (greens, plum, slate) and avoid `data.blue` for action UI.

### Migration plan

1. Wire imports + `data-theme` (Steps 2 & 3).
2. Re-export design-system primitives behind your existing UI module path (Step 4).
3. One screen at a time, replace local CSS with semantic Tailwind utilities (`bg-action-primary` instead of `bg-primary`).
4. Once every screen passes the sanity check, delete the local `ui/` files entirely.

---

## You're set up. Next

- Browse `examples/index.html` in a browser for a live look.
- Read `docs/02-tokens.md` to learn the token model.
- Read `docs/04-web-primitives.md` or `docs/05-react-native.md` for component APIs.
- Hit a problem? `docs/09-contributing.md` covers how to file issues and propose changes.
