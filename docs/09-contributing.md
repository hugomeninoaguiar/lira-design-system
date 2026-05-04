# Contributing

The design system is small and opinionated by design. Contributions are welcome but go through one of three paths.

## Path A — A new token (color, space, radius, type)

1. Open an issue first if it's debatable. If it's clearly missing (e.g. a new feedback color), skip to PR.
2. Add the primitive in `tokens/primitives/*.json`.
3. Add a semantic binding in `tokens/semantic/core.json` AND in `professionals.json` if behavior should differ.
4. Run `npm run build:tokens`.
5. Commit `tokens/` + `dist/` together.
6. Update `docs/02-tokens.md` if the new token deserves a mention.
7. Open a PR.

**No primitives without a semantic binding.** A primitive that's not bound is dead weight.

## Path B — A new component / variant

1. Open an issue first to discuss API and use cases. Components are easier to add than to remove.
2. Match the patterns in existing primitives (`Button.tsx` for web, `AppButton.tsx` for RN).
3. Use semantic tokens — never hex literals, never primitives directly.
4. Export from the relevant `index.ts`.
5. Add usage examples to `examples/components.html` (or the RN doc if it's RN).
6. Update `docs/04-web-primitives.md` or `docs/05-react-native.md`.
7. Open a PR with screenshots / video.

## Path C — A bug fix or doc tweak

Just open the PR. Keep changes scoped. Don't reformat unrelated files.

## PR checklist

- [ ] Tokens: did you change a primitive without a semantic binding?
- [ ] Components: do you reference any hex literal? (You shouldn't.)
- [ ] Docs: did you update the relevant doc page?
- [ ] Examples: does `examples/` still render correctly?
- [ ] Build: did you commit regenerated `dist/`?
- [ ] Voice: does any user-facing copy match the brand voice?
- [ ] Accessibility: contrast meets AA for new color pairs; focus ring visible; labels present?
- [ ] Two themes: does the change behave correctly under both `data-theme="women"` and `data-theme="professionals"`?

## Code style

- TypeScript strict mode, no implicit any.
- Components forward refs and accept `className` (web) / `style` (RN).
- Prefer composition (`<Stack>`) over ad-hoc layout classes.
- Keep components small. If a primitive's TSX exceeds ~150 lines, split it.

## Issue triage labels

| Label | Meaning |
|---|---|
| `tokens` | Primitive / semantic / component-token change |
| `web-primitives` | Web component change |
| `react-native` | RN component change |
| `docs` | Documentation only |
| `breaking` | Affects consumer code paths — requires major version bump |
| `surface:women` / `surface:professionals` | Theme-specific issue |
| `a11y` | Accessibility |

## Code of conduct

Be kind. The audience reading this design system code is also the audience using the products — neurodivergent women navigating high-stakes self-discovery. Reflect that warmth in PR comments and issue threads.
