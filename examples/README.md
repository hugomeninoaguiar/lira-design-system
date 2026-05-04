# Examples — visual showcase

Static HTML pages that render the design system using the generated CSS variables in `dist/css/tokens.css`. Open `index.html` in a browser — no build needed.

The theme toggle in the topbar swaps between Women and Professionals. The choice persists in `localStorage`, so navigating between pages keeps the same theme.

## Pages

- `index.html` — overview + integration snippets
- `colors.html` — all token swatches (semantic + primitives)
- `typography.html` — type roles + size scale
- `components.html` — buttons, inputs, cards, badges, callouts, mobile preview
- `charts.html` — consumer sparklines + clinical radar

## Note

These pages mirror the **CSS** layer of the system. They don't run React. They prove the tokens work end-to-end from JSON → `dist/css/tokens.css` → real visuals.
