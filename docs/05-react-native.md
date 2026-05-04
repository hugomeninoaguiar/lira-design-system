# React Native components

Import everything from `@lira/design-system/react-native`.

```tsx
import {
  LiraThemeProvider,
  useLiraTheme,
  AppScreen, AppAuthLayout, AppHeader, AppText, AppButton, AppCard,
  AppListRow, AppCallout, AppTextField, AppToggle, AppStepper, AppBadge,
} from '@lira/design-system/react-native';
```

## Setup

Wrap the root in `LiraThemeProvider` (defaults to `women`):

```tsx
export default function App() {
  return (
    <LiraThemeProvider>
      <RootNavigator />
    </LiraThemeProvider>
  );
}
```

## AppScreen

Top-level container — applies the theme's app background and consistent padding.

```tsx
<AppScreen>
  <AppHeader title="Today" />
  {/* content */}
</AppScreen>

<AppScreen scrollable={false}>
  <FlatList … />
</AppScreen>
```

| Prop | Default |
|---|---|
| `scrollable` | `true` |
| `paddingX` | `space[6]` (24) |
| `paddingY` | `space[6]` (24) |

## AppAuthLayout

Standardized auth screen wrapper that enforces the card-first structure used across the app.

```tsx
<AppAuthLayout
  title="Welcome back"
  subtitle="Good to see you again."
  logo={<BrandMark />}
  footer={<SocialAuthRow />}
>
  <AppTextField label="Email" />
  <AppTextField label="Password" secureTextEntry />
  <AppButton label="Log in" />
</AppAuthLayout>
```

| Prop | Default |
|---|---|
| `scrollable` | `true` |
| `centerCard` | `true` |
| `maxCardWidth` | `420` |
| `paddingX` | `space[4]` (16) |
| `paddingY` | `space[6]` (24) |
| `cardPadding` | `lg` |

## AppText

```tsx
<AppText variant="display">Inner World</AppText>
<AppText variant="h2">Morning check-in</AppText>
<AppText variant="body" tone="secondary">Two minutes — that's it.</AppText>
<AppText variant="caption" tone="info">12:34 PM</AppText>
```

| Variant | `display` `h1` `h2` `h3` `title` `bodyLarge` `body` `bodySmall` `caption` `label` |
| Tone | `primary` `secondary` `onPrimary` `success` `info` `error` |
| Weight | `regular` `medium` `semibold` `bold` `heavy` (overrides default) |

## AppButton

```tsx
<AppButton label="Continue" />
<AppButton label="Save" variant="primary" size="lg" />
<AppButton label="Cancel" variant="ghost" fullWidth={false} />
<AppButton label="Skip" variant="outline" />
<AppButton label="Delete" variant="destructive" />
<AppButton label="Loading…" loading />
```

| Prop | Values | Default |
|---|---|---|
| `variant` | `primary` `secondary` `outline` `ghost` `destructive` | `primary` |
| `size` | `sm` `md` `lg` | `md` |
| `fullWidth` | `boolean` | `true` |
| `loading` | `boolean` | `false` |
| `disabled` | `boolean` | `false` |
| `iconLeft`, `iconRight` | `ReactNode` | — |

## AppCard

```tsx
<AppCard>
  <AppText variant="title">Reward</AppText>
  <AppText variant="body">+10 sparks earned today.</AppText>
</AppCard>

<AppCard tone="accent" elevation="lifted">…</AppCard>
```

| Prop | Values | Default |
|---|---|---|
| `tone` | `default` `subtle` `accent` | `default` |
| `elevation` | `flat` `soft` `lifted` | `soft` |
| `padding` | `none` `sm` `md` `lg` | `md` |

## AppListRow

Tappable list rows for settings and choice lists.

```tsx
<AppListRow
  title="Notifications"
  description="Gentle nudges, never spammy"
  rightSlot={<ChevronRight />}
  onPress={openNotifications}
/>

<AppListRow
  title="Energy"
  selected={selected === 'energy'}
  onPress={() => setSelected('energy')}
/>
```

## AppTextField

```tsx
<AppTextField
  label="Email"
  placeholder="email@…"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>

<AppTextField label="Notes" hint="Optional" multiline />
<AppTextField label="Code" error="Doesn't match — try again." />
```

## AppToggle

```tsx
<AppToggle value={notif} onValueChange={setNotif} accessibilityLabel="Notifications" />
```

## AppStepper

```tsx
<AppStepper total={5} current={2} />
```

Compact progress dots for onboarding / multi-step flows.

## AppCallout

```tsx
<AppCallout tone="accent" title="New">Lira's inner world just got bigger.</AppCallout>
<AppCallout tone="info">You're offline — we'll sync later.</AppCallout>
```

## AppBadge

```tsx
<AppBadge label="Beta" />
<AppBadge label="New" tone="accent" />
<AppBadge label="Active" tone="success" />
```

## AppHeader

```tsx
<AppHeader
  title="Today"
  subtitle="Wednesday, May 6"
  leftIcon={<MenuIcon />}
  onLeftPress={openMenu}
/>
```

## Reading tokens directly

For custom views (SVG, animation, anything not yet componentized):

```tsx
import { useLiraTheme } from '@lira/design-system/react-native';

function Sparkline({ values }: { values: number[] }) {
  const theme = useLiraTheme();
  return (
    <Path
      stroke={theme.semantic.action.primary}
      fill={theme.semantic.accent.subtle}
      d={…}
    />
  );
}
```

## Migration tips for `lira`

1. Replace `<View style={{ backgroundColor: '#FFFFFF' }}>` with `<AppCard>`.
2. Replace `<Text style={{ fontSize: 16 }}>` with `<AppText variant="body">`.
3. Replace bespoke buttons with `<AppButton variant="primary" />`.
4. Anything still using a hex code: `useLiraTheme()` → pull the matching semantic value.
