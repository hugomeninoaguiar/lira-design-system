# Content & Voice

The design system is half visual, half verbal. Visual tokens are useless if a button says "Submit" instead of "Let's go." This doc bakes the Lira voice into the system so primitives carry it by default.

## The voice in one paragraph

Lira is a warm, witty, slightly chaotic, neuroinclusive companion. She speaks like a supportive friend — never a coach, never a clinician, never a mascot. The voice scales with channel: most playful in social, calmer on the website, calmest in clinical UI. The voice never disappears.

For the full guide see the brand Tone of Voice doc. This page is the system-side translation.

## When to use which voice

| Surface | Voice | Person | Example |
|---|---|---|---|
| Women app | warmest, most personal | first-person Lira ("I…", "we…") | "I'll nudge you later — gently." |
| Women marketing | warm, characterful | mix of "I, Lira" and third-person | "Lira's inner world just got bigger." |
| Pros marketing | calm, evidence-led | third-person | "The protocol organizes responses into DSM-5-TR criteria." |
| Pros product | clinical, precise | third-person, neutral | "Indicators of support for criterion B." |

## Default copy on primitives

Where primitives have any default text, they use the Women voice:

| Component | Default | Why |
|---|---|---|
| `<AppButton loading>` | Spinner-only (no text) | Avoid a hardcoded "Loading…" that fights translation. Pass `label="Saving…"` if you want copy. |
| `<Field error>` | Caller supplies | Errors are highly contextual — never auto-fill. |
| `<Callout role="status">` | Caller supplies | Same. |

The system intentionally has *no* default error strings, success strings, or "Submit" labels. Every consumer writes its own — in its own voice.

## Words to use / avoid

**Use** (across all surfaces):
- "you", "we", "let's"
- "gently", "softly", "no judgment"
- short sentences

**Avoid** (across all surfaces):
- "users" (clinical) → say "you" / "the person" / "the patient" depending on context
- "leverage", "unlock", "supercharge", "best-in-class"
- shame framing: "stop being scattered", "fix your focus"
- "disorder" framing in product copy unless clinically required (DSM-5-TR criteria are the exception)

## Avoid in clinical surfaces specifically

- First-person Lira voice. Lira-the-character does not speak in clinical UI.
- Emojis in primary copy. Reserve for status badges if at all.
- "Failure"/"problem"/"deficit" words in patient-facing summaries — use "support need", "challenge", "characteristic".

## Component copy guidelines

### Buttons

- One verb + (optional) noun. "Save", "Continue", "Start check-in".
- Use sentence case.
- For destructive actions, name what's being destroyed: "Delete account" not "Delete".

### Empty states

- Lead with what the user *can do*, not what's missing.
- Women: "Pick a vibe to get started — no wrong answer." 
- Pros: "No assessments yet. Click *New protocol* to begin."

### Confirmations

- Match the gravity of the action. Don't celebrate routine actions.
- Women: "Saved. ✨" — fine for delight moments only.
- Pros: "Saved." — full stop.

### Errors

- Tell the user what happened, why, and what they can do.
- "Couldn't save — looks like you're offline. Try again when you're back."
- Avoid "Something went wrong." It tells the user nothing.

## Localization

Wrap every user-facing string in i18n. Don't hardcode strings inside primitives — primitives are content-agnostic.

The Lira voice translates by *intent*, not by literal phrase. When localizing:
- Keep the warmth, even if exact idioms don't carry.
- Length flex: Portuguese / Spanish are ~30% longer than English; design components to absorb.
