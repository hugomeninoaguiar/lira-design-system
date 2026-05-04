# Web Primitives

All primitives import from `@lira/design-system/web`. They're built on CVA + Radix and consume semantic tokens via Tailwind utility classes — drop them into any of the three Tailwind-v4 + Next.js consumer repos.

```tsx
import {
  Button, Input, Textarea, Card, Badge, Label, Field, Checkbox,
  Heading, Text, Stack, Callout, Container,
  LiraThemeProvider, cn,
} from '@lira/design-system/web';
```

## Button

```tsx
<Button>Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="outline" size="lg">Continue</Button>
<Button variant="ghost" size="icon"><PlusIcon /></Button>
<Button variant="destructive">Delete account</Button>
<Button asChild>
  <Link href="/start">Get started</Link>
</Button>
<Button loading>Saving…</Button>
```

| Prop | Values | Default |
|---|---|---|
| `variant` | `primary` `secondary` `outline` `ghost` `destructive` `link` | `primary` |
| `size` | `sm` `md` `lg` `icon` | `md` |
| `fullWidth` | `boolean` | `false` |
| `loading` | `boolean` (shows spinner, disables) | `false` |
| `asChild` | `boolean` (Radix Slot — useful with `<Link>`) | `false` |

## Input / Textarea

```tsx
<Input placeholder="email@…" />
<Input size="lg" type="email" aria-invalid />
<Textarea placeholder="Tell us more…" rows={4} />
```

Sizes for `Input`: `sm` `md` `lg`. Both adopt error styling automatically when `aria-invalid="true"`.

## Field — composed Label + control + hint/error

```tsx
<Field label="Email" required hint="We'll never share this.">
  <Input type="email" />
</Field>

<Field label="Notes" error="This field is required.">
  <Textarea />
</Field>
```

`Field` clones its child to wire `id` and `aria-describedby`. Use it whenever a control needs a label.

## Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Today's check-in</CardTitle>
    <CardDescription>Two minutes — that's it.</CardDescription>
  </CardHeader>
  <CardContent>
    <Text>How's your energy this morning?</Text>
  </CardContent>
  <CardFooter>
    <Button>Start</Button>
    <Button variant="ghost">Skip</Button>
  </CardFooter>
</Card>

<Card tone="accent" elevation="lifted" padding="lg">…</Card>
```

| Prop | Values | Default |
|---|---|---|
| `tone` | `default` `subtle` `accent` | `default` |
| `elevation` | `flat` `soft` `lifted` | `soft` |
| `padding` | `none` `sm` `md` `lg` | `md` |

## Badge

```tsx
<Badge>Beta</Badge>
<Badge tone="success">Active</Badge>
<Badge tone="warning">Pending</Badge>
<Badge tone="error">Failed</Badge>
<Badge tone="brand">New</Badge>
```

## Checkbox + Label

```tsx
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">I agree to the terms</Label>
</div>
```

## Heading + Text

```tsx
<Heading level="display">Lira</Heading>
<Heading level="h2" as="h1">SEO trick — h2 style, semantic h1</Heading>
<Text variant="bodyLarge">Big body copy.</Text>
<Text variant="caption" tone="muted">Small caption.</Text>
```

| `<Heading>` levels | `display` `h1` `h2` `h3` `h4` `h5` |
| `<Text>` variants | `bodyLarge` `body` `bodySmall` `caption` `label` |
| `<Text>` tones | `primary` `secondary` `muted` `onBrand` `onAccent` `link` `success` `warning` `error` |

## Stack — layout primitive

```tsx
<Stack gap="4">
  <Heading level="h3">Title</Heading>
  <Text>Description</Text>
  <Button>Action</Button>
</Stack>

<Stack direction="row" gap="3" align="center" justify="between">
  <Logo />
  <NavLinks />
</Stack>
```

## Callout

```tsx
<Callout tone="info" title="Heads up">
  We've updated how check-ins work.
</Callout>
<Callout tone="success" icon={<CheckIcon />}>
  Saved.
</Callout>
```

## Container

```tsx
<Container width="lg">
  <Heading level="h1">Page title</Heading>
</Container>

<Container width="prose">
  <article>…</article>
</Container>
```

| `width` | `sm` (672) `md` (896) `lg` (1024, default) `xl` (1280) `prose` (reading width) `full` |

## `cn` helper

The `cn` helper merges Tailwind class strings safely (later classes override earlier).

```tsx
<div className={cn('p-4 rounded-md', isActive && 'bg-action-primary text-white', className)} />
```

## Conventions

- Every primitive forwards refs and accepts `className`.
- Every primitive uses semantic tokens — themes swap automatically when the surface's `data-theme` changes.
- For form controls, prefer `<Field>` over manually pairing `<Label>` + `<Input>`.
- For stack-like layouts, use `<Stack>` instead of ad-hoc `flex flex-col gap-…`.

## Adding a new primitive

1. Create `src/web/primitives/<Name>.tsx`. Match the pattern of an existing one (`Button.tsx` is the reference).
2. Use `cva` for variants. Reference semantic tokens via `var(--semantic-…)` or Tailwind aliases (`bg-action-primary`).
3. Export from `src/web/primitives/index.ts`.
4. Document it here.
5. Add a usage example to `examples/components.html`.
