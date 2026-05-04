# Principles

Lira is building infrastructure for earlier recognition and better support of neurodivergence in women. The design system encodes that mission visually and structurally.

## What Lira feels like

> **Lira's voice is warm, witty, slightly chaotic, encouraging, honest, gentle, quirky, neuroinclusive.** *(from the Tone of Voice doc)*

The system needs to *afford* that voice — never fight it. Concretely:

- **Soft over sharp.** Most surfaces use rounded-lg or pill shapes. We don't use 4px square corners or hard edges.
- **Warm over neutral.** Whites are warm beige (`#FBF8F3`, `#F7F3ED`) on Women surfaces, cool off-white (`#F8FAF8`) on Professionals.
- **Calm over loud.** Saturation is low. The "primary" green (`#5A9E78`) is grounded, not neon. Accents like amber underline are used sparingly.
- **Generous spacing.** Breathing room reduces overwhelm — a non-negotiable for our audience.

## Two product modes

The system serves **two product modes** that share the same structure but differ in *temperature*:

### Women mode (default — `data-theme="women"`)

> Calm > magical > premium. **Not clinical.**

- Warm beige backgrounds
- Brand mint as accent / hero
- Soft shadows, generous padding
- Illustrative moments are welcome (Lira character, soft icons)
- Voice: first-person Lira ("I'll nudge you later — gently.")

### Professionals mode (`data-theme="professionals"`)

> Mostly neutral clinical tool with subtle Lira DNA.

- Cool, near-white backgrounds
- Sage green as accent (less saturated than Women mint)
- Tighter spacing, more dense data layouts
- Charts use the clinical palette (green / plum / slate)
- Voice: third-person, calm, evidence-led ("The protocol organizes responses into DSM-5-TR criteria.")

The same `<Button variant="primary">` works in both modes — the semantic tokens swap underneath. **You never write theme-specific code in components.**

## Hard rules

1. **No hex codes outside `tokens/`.** If you need a color, it has a token. If it doesn't, add it to `tokens/primitives/color.json` and bind a semantic role to it.
2. **Components consume semantic tokens.** A `<Button>` references `--semantic-action-primary`, never `--color-green-500`. This is what makes the theme swap free.
3. **`data.blue` is data only.** Never UI. Reserved for clinical chart series. The Lira brand has no blue.
4. **Light mode only for now.** Don't introduce dark-mode-conditional logic; the next product cycle will revisit.
5. **Accessibility ≥ AA.** Every text-on-surface combination ships meeting WCAG AA contrast. New tokens must be checked before merge.
6. **Soft, not childish.** The aesthetic is calm and warm — but Lira is for adults dealing with serious challenges. Avoid cute-overkill: no rainbow gradients, no excessive emoji, no playful drop shadows on clinical UI.

## What "good" looks like

- A consumer-facing card on Women: warm surface (`#FFFFFF`), 16px radius, subtle border, soft shadow, 24px padding, mint accent on the title bar.
- A clinical evaluations table on Professionals: cool surface, 12px radius, 1px strong border, no shadow, denser padding (16px), sage primary action.

If a screen feels louder than that, slow it down. If it feels colder than that, warm it up. The tokens already encode the right answer — trust them.

## What we're not

- **Not a corporate productivity tool.** Avoid hyper-rectangular shadcn defaults like `rounded-md` everywhere with white-on-blue palettes.
- **Not a meditation app.** Don't lean into pastels, gradients, or whimsical illustration. Lira is grounded.
- **Not a Material/Apple clone.** We don't follow either system's metaphors — we follow our own brand voice.
