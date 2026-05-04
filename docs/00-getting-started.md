# Getting Started

This design system is for the **Lira for Women mobile app** only.

## 1) Install

```jsonc
// package.json
{
  "dependencies": {
    "@lira/design-system": "github:hugomeninoaguiar/lira-design-system#main"
  }
}
```

Then install dependencies with your package manager.

To pin a specific release, replace `#main` with a tag like `#v1.0.0`.

## 2) Wrap your app root

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

`LiraThemeProvider` defaults to `women`, which is the only supported theme.

## 3) Use App components

```tsx
import { AppScreen, AppText, AppButton, AppCard } from '@lira/design-system/react-native';

export function HomeScreen() {
  return (
    <AppScreen>
      <AppText variant="h3">Hey, you</AppText>
      <AppText variant="body" tone="secondary">
        Let's see what your energy is up to today.
      </AppText>

      <AppCard tone="accent">
        <AppText variant="title">Morning check-in</AppText>
        <AppText variant="body">Two minutes — that's it.</AppText>
        <AppButton label="Start" />
      </AppCard>
    </AppScreen>
  );
}
```

## 4) Read tokens directly when needed

For custom views (SVG, charts, animation), use `useLiraTheme()`:

```tsx
import { useLiraTheme } from '@lira/design-system/react-native';

function Sparkline() {
  const theme = useLiraTheme();
  return <Svg stroke={theme.semantic.action.primary} />;
}
```

## 5) Sanity check

- The app background is neutral and calm (`semantic.background.app`).
- Primary actions are sage (`semantic.action.primary`).
- Text uses semantic roles (`semantic.text.primary`, `semantic.text.secondary`).

If these do not match, verify the app is wrapped in `LiraThemeProvider`.

## 6) Migration checklist for `lira`

1. Replace screen-level wrappers with `AppScreen`.
2. Replace custom text styles with `AppText` variants.
3. Replace bespoke cards/buttons with `AppCard` and `AppButton`.
4. Remove remaining hex literals and use semantic token values via `useLiraTheme()`.

## Next docs

- `docs/02-tokens.md` for token architecture.
- `docs/05-react-native.md` for component APIs.
- `docs/09-contributing.md` for contribution workflow.
