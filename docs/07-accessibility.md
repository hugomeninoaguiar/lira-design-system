# Accessibility

Lira's audience is neurodivergent women. Accessibility is not a checkbox here — it is the product. These are the system-level guarantees and the rules every contributor must follow.

## Color contrast

**Targets:** WCAG AA for body text (4.5:1), AA Large for headings (3:1), 3:1 for non-text UI.

The default semantic tokens already pass:

| Pair | Theme | Contrast | Pass |
|---|---|---|---|
| `text.primary` on `background.app` | Women | ~14:1 | AA + AAA |
| `text.secondary` on `background.app` | Women | ~5.4:1 | AA |
| `action.primaryFg` on `action.primary` | Women | ~5.0:1 | AA |
| `text.primary` on `background.app` | Pros | ~14:1 | AA + AAA |
| `action.primaryFg` on `action.primary` | Pros | ~5.4:1 | AA |

If you add a new semantic token, run a contrast check before merging. WebAIM's contrast checker is a quick way: <https://webaim.org/resources/contrastchecker/>.

## Focus

Every interactive primitive renders a visible focus ring tied to `--semantic-border-focus`. **Never** remove `outline-none` without supplying an alternative ring.

In the web primitives we use:

```css
focus-visible:ring-2
focus-visible:ring-[var(--semantic-border-focus)]
focus-visible:ring-offset-2
```

In React Native, `<AppButton>` uses pressed state visuals as the focus indicator (RN platforms don't have keyboard focus by default in apps). For RN web targets, surface the focus ring through `focusable` + custom styles.

## Motion

Use motion for *meaning*, not decoration. Specifically:

- Easing: prefer `cubic-bezier(0.2, 0.8, 0.2, 1)` for entrance, `cubic-bezier(0.4, 0, 0.2, 1)` for exit.
- Duration: 150–250ms for state changes; up to 400ms for layout shifts.
- Honor `prefers-reduced-motion: reduce` — disable parallax, autoplay, and looping animations. The shared rule:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
  }
}
```

Add this rule to each consumer's `globals.css` (or wrap in a generated default).

## Hit targets

- Web: minimum interactive height 44px (`size="md"` Button is 44; `sm` is 36 — only use for dense data UIs).
- RN: minimum 44×44 hit area. Use `hitSlop` to expand small icon targets.

## Forms

- Always pair a control with a `<Label>` (web) or `label` prop (RN's `AppTextField`).
- Use `<Field>` for the label + control + hint/error pattern; it wires `aria-describedby` automatically.
- Error messages are `role="alert"` and use `text.feedback.errorFg` — never red-only signals.
- Required fields display a `*` indicator via `<Field required>`.

## Screen readers

- Every interactive primitive has a sensible `accessibilityRole` (RN) / native role (web).
- Buttons need clear labels. If a button is icon-only, pass `aria-label` (web) or `accessibilityLabel` (RN).
- Decorative icons inside buttons use `aria-hidden="true"`.
- Live regions for confirmations: use `<Callout role="status">` (already wired).

## Language and copy

- Never use neurodivergence-as-failure framing. The voice doc is the source of truth.
- Translations: pass through i18n; don't hardcode English strings inside primitives.

## Testing checklist before shipping

- [ ] Every new semantic token meets WCAG AA against intended pair.
- [ ] All interactive elements show a visible focus state.
- [ ] All inputs have associated labels.
- [ ] Reduced-motion media query is respected.
- [ ] Light mode rendered cleanly (we don't ship dark mode yet — don't break light-only assumptions).
- [ ] At 200% browser zoom, layouts don't break.
