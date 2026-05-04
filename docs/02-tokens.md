# Tokens

The token model has three layers. You should know which layer to touch.

```
┌──────────────────────────────────────────────────────────────────┐
│  Primitives                                                      │
│  Raw scales. Never used directly by product code.                │
│  e.g. color.green.500 = "#5A9E78", space.4 = 16, radius.md = 12  │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  Semantic                                                        │
│  Purpose-bound. This is what components and apps reference.      │
│  e.g. semantic.action.primary, semantic.text.secondary           │
│       semantic.background.app, semantic.border.subtle            │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│  Component (optional)                                            │
│  Component-scoped tweaks layered on top of semantic.             │
│  e.g. button.size.md.height = 44, button.radius = pill           │
└──────────────────────────────────────────────────────────────────┘
```

## File map

| File | Layer | What it owns |
|---|---|---|
| `tokens/primitives/color.json` | primitive | Color scales (green, sage, amber, dustyRed, warm, cool, data, feedback) |
| `tokens/primitives/space.json` | primitive | 4px-base spacing scale (`0`, `1`–`32`) |
| `tokens/primitives/radius.json` | primitive | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `pill` |
| `tokens/primitives/typography.json` | primitive | font family, size, line-height, weight, letter-spacing scales |
| `tokens/primitives/shadow.json` | primitive | `none`, `soft`, `lifted`, `raised`, `focus` |
| `tokens/semantic/core.json` | semantic | Universal Core (= Women defaults). Background, text, border, action, feedback, accent |
| `tokens/semantic/professionals.json` | semantic | Overrides applied under `[data-theme="professionals"]` |
| `tokens/semantic/typography.json` | semantic | Type styles: display, h1–h5, body, caption, label, etc. |
| `tokens/components/button.json` | component | Button sizes, radius |
| `tokens/components/chart.json` | component | Consumer + clinical chart palettes |

## Naming convention

Token paths in JSON map deterministically to:

- **CSS variables** — `tokens/primitives/color.json:color.green.500` → `--color-green-500`
- **JS / TS object** — `tokens.color.green[500]`
- **Tailwind utility** — `bg-green-500` (primitive) or `bg-action-primary` (semantic)
- **RN theme** — `theme.color.green[500]` or `theme.semantic.action.primary`

Semantic tokens get a friendlier Tailwind alias:

| Semantic path | Tailwind utility |
|---|---|
| `semantic.background.app` | `bg-bg-app` |
| `semantic.background.surface` | `bg-bg-surface` |
| `semantic.text.primary` | `text-text-primary` |
| `semantic.text.secondary` | `text-text-secondary` |
| `semantic.border.subtle` | `border-border-subtle` |
| `semantic.action.primary` | `bg-action-primary` |
| `semantic.action.primaryFg` | `text-action-primaryFg` |
| `semantic.feedback.successFg` | `text-successFg` |
| `semantic.accent.mint` | `bg-accent-mint` |

## Adding a new token

Follow this order:

1. **Add the primitive** if no existing primitive can express the new value.
   ```json
   // tokens/primitives/color.json
   "blush": { "300": { "value": "#F4C9CD" } }
   ```
2. **Bind a semantic role** so consumers can use it.
   ```json
   // tokens/semantic/core.json
   "background": {
     "highlight": { "value": "{color.blush.300}" }
   }
   ```
3. **Add a Professionals override** if the role should differ.
   ```json
   // tokens/semantic/professionals.json
   "background": {
     "highlight": { "value": "{color.cool.100}" }
   }
   ```
4. **Run the build** — `npm run build:tokens` regenerates `dist/`.
5. **Commit `tokens/` and `dist/` together.** Consumers depend on `dist/`.

## Don't do this

- ❌ Add a hex literal to a component file.
- ❌ Add a primitive but skip the semantic binding ("temporarily").
- ❌ Reference a primitive directly from a component (`bg-green-500` in a Button). Use the semantic role.
- ❌ Hand-edit `dist/`. It's regenerated.
- ❌ Introduce a token that exists only in one theme (e.g. only Women) without a fallback in the other.
