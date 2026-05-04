# Principles

Lira is building infrastructure for earlier recognition and better support of neurodivergence in women. The design system encodes that mission visually and structurally.

## What Lira feels like

> **Lira's voice is warm, witty, slightly chaotic, encouraging, honest, gentle, quirky, neuroinclusive.** *(from the Tone of Voice doc)*

The system needs to *afford* that voice — never fight it. Concretely:

- **Soft over sharp.** Most surfaces use rounded-lg or pill shapes. We don't use 4px square corners or hard edges.
- **Structured neutrals over muddy warmth.** Backgrounds are neutral and clean (`#F7F9FA`, `#FFFFFF`) with subtle borders (`#E8EEF0`).
- **Calm over loud.** Saturation is low. The primary sage (`#52766A`) is grounded, and purple accents are used sparingly.
- **Generous spacing.** Breathing room reduces overwhelm — a non-negotiable for our audience.

## Product mode

The system is scoped to a single product mode:

### Women mode (`women`)

> Calm > magical > premium. **Not clinical.**

- Neutral backgrounds and white surfaces
- Sage as primary action color
- Purple as accent (used intentionally and sparingly)
- Soft shadows, generous padding
- Illustrative moments are welcome (Lira character, soft icons)
- Voice: first-person Lira ("I'll nudge you later — gently.")

There is no theme switching in this repository. Components target the Women mobile app directly.

## Hard rules

1. **No hex codes outside `tokens/`.** If you need a color, it has a token. If it doesn't, add it to `tokens/primitives/color.json` and bind a semantic role to it.
2. **Components consume semantic tokens.** A component references semantic roles (for example, action/background/text), never raw primitive values.
3. **`data.blue` is data only.** Never UI. The Lira brand has no blue actions.
4. **Light mode only for now.** Don't introduce dark-mode-conditional logic; the next product cycle will revisit.
5. **Accessibility ≥ AA.** Every text-on-surface combination ships meeting WCAG AA contrast. New tokens must be checked before merge.
6. **Soft, not childish.** The aesthetic is calm and premium — but Lira is for adults dealing with serious challenges. Avoid cute-overkill: no rainbow gradients, no excessive emoji, no playful decorative shadows.

## What "good" looks like

- A mobile card in Lira for Women: white surface (`#FFFFFF`), 24px radius, subtle border, soft shadow, 16–24px padding.
- A supporting insight card: subtle purple accent tint, clear text hierarchy, and one primary sage action.

If a screen feels louder than that, slow it down. If it feels too decorative, simplify it. The tokens already encode the right answer — trust them.

## What we're not

- **Not a corporate productivity tool.** Avoid hyper-rectangular shadcn defaults like `rounded-md` everywhere with white-on-blue palettes.
- **Not a meditation app.** Don't lean into pastels, gradients, or whimsical illustration. Lira is grounded.
- **Not a Material/Apple clone.** We don't follow either system's metaphors — we follow our own brand voice.
