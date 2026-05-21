# Icons

**Phosphor Icons** is the primary icon library for Lira. It provides a comprehensive, consistent set of icons that work across all platforms.

## Install

```bash
npm install @phosphor-icons/react-native
```

## Icon Philosophy

We use two weights intentionally:

| Weight | Use For | Examples |
|--------|---------|----------|
| **Regular** (default) | UI elements, navigation, actions, lists | Chevron, Plus, Settings, Home |
| **Duotone** | Emotional moments, branded content, rewards | Inner World badges, mood states, achievement unlocks |

**Don't reach for emojis or random Material icons.** Use Phosphor consistently. If an icon doesn't exist, ask the design team — we'll either find an alternative or design a custom one.

## Quick Start

```tsx
import { AppIcon, AppButton } from '@lira/design-system/react-native';
import { Heart, Star, ArrowRight, Gear } from '@phosphor-icons/react-native';

// Basic usage — Regular weight (default)
<AppIcon icon={Gear} />

// Specific size
<AppIcon icon={ArrowRight} size={32} />

// Duotone for emotional/branded moments
<AppIcon icon={Heart} weight="duotone" size={48} />

// With a button
<AppButton
  label="Continue"
  iconRight={<AppIcon icon={ArrowRight} size={20} />}
/>
```

## Standard Sizes

Use the `IconSizes` constant for consistency:

```tsx
import { AppIcon, IconSizes } from '@lira/design-system/react-native';
import { Bell } from '@phosphor-icons/react-native';

<AppIcon icon={Bell} size={IconSizes.xs} />  // 16px
<AppIcon icon={Bell} size={IconSizes.sm} />  // 20px
<AppIcon icon={Bell} size={IconSizes.md} />  // 24px — default
<AppIcon icon={Bell} size={IconSizes.lg} />  // 32px
<AppIcon icon={Bell} size={IconSizes.xl} />  // 48px
```

## Weight Guidelines

### Regular (Default)

Clean, functional, unobtrusive. Use for:
- Navigation icons (tabs, drawers)
- Action icons (edit, delete, share)
- List decorators (chevrons, arrows)
- Form elements (clear, search)

```tsx
<AppIcon icon={PencilSimple} />           // Edit action
<AppIcon icon={CaretRight} size={20} />   // List row chevron
<AppIcon icon={MagnifyingGlass} />       // Search input
```

### Duotone

More presence, more personality. Use for:
- **Inner World** rewards and badges
- **Sensory load** indicators
- **Energy mood** states
- **Self identification** dimensions
- Achievement unlocks
- Empty states that need warmth

```tsx
// Inner World — emotional, branded
<AppIcon icon={Sparkle} weight="duotone" size={48} />
<AppIcon icon={Star} weight="duotone" size={40} color={theme.semantic.accent.warm} />

// Energy states
<AppIcon icon={BatteryFull} weight="duotone" size={32} />
<AppIcon icon={CloudMoon} weight="duotone" size={32} />
```

## Common Icons by Use Case

### Navigation
- `House` — Home
- `ChartLineUp` — Trends/Analytics
- `User` — Profile
- `Gear` — Settings
- `MagnifyingGlass` — Search

### Actions
- `Plus` — Add
- `PencilSimple` — Edit
- `Trash` — Delete
- `ShareNetwork` — Share
- `Export` — Export
- `ArrowLeft`, `ArrowRight` — Navigation

### Feedback
- `CheckCircle` — Success
- `WarningCircle` — Warning
- `Info` — Info
- `XCircle` — Error

### Content
- `Calendar` — Date
- `Clock` — Time
- `MapPin` — Location
- `Envelope` — Email
- `LockKey` — Security

### Lira-Specific (Duotone moments)
- `Heart` — Favorites, self-compassion
- `Sparkle` — Rewards, achievements
- `Star` — Ratings, milestones
- `Moon`, `Sun` — Time-of-day contexts
- `Brain` — Cognitive/mental health
- `Flower` — Growth, wellness

## Custom Colors

Pass a color to override the default (which uses theme's text.secondary):

```tsx
import { useLiraTheme } from '@lira/design-system/react-native';

function EnergyIcon({ level }: { level: 'high' | 'low' }) {
  const theme = useLiraTheme();
  const color = level === 'high'
    ? theme.semantic.accent.warm
    : theme.semantic.text.muted;

  return <AppIcon icon={BatteryFull} color={color} />;
}
```

## Accessibility

Icons used alone (without text) should always have an `accessibilityLabel`:

```tsx
// Bad — screen reader won't know what this is
<AppIcon icon={Trash} />

// Good — wrapped with accessible element
<Pressable accessibilityLabel="Delete item" accessibilityRole="button">
  <AppIcon icon={Trash} />
</Pressable>
```

When used inside buttons with labels, the button's accessibility handles it:

```tsx
// The button provides the label; icon is decorative
<AppButton
  label="Delete"
  iconLeft={<AppIcon icon={Trash} />}
/>
```

## Custom Illustrative Icons

For moments where Lira's personality really needs to come through (Inner World rewards, sensory load indicators, energy mood states, self identification dimensions), we commission or design **custom illustrative icons**. 

These are:
- **10 to 20 max** — not a full set
- **Alongside Phosphor** — not replacing it
- **Reserved for emotional moments** — personality where it matters

When you need a custom icon, reach out to the design team with:
- The use case (where will this appear?)
- The emotion it should convey
- Reference icons you like

## Migration from other icon sets

If your screen currently uses emojis or Material icons:

1. **Replace emojis** with the closest Phosphor equivalent
   - ❤️ → `Heart` (Duotone for emotion)
   - ⭐ → `Star` (Duotone for branded moments)
   - ⚙️ → `Gear` (Regular for UI)

2. **Replace Material icons** — Phosphor has most equivalents
   - `material:settings` → `Gear`
   - `material:favorite` → `Heart`

3. **Don't mix libraries** — one icon set is cleaner than two

## Next docs

- `docs/02-tokens.md` for color tokens to use with icons
- `docs/05-react-native.md` for component APIs
