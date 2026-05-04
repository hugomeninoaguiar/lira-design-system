# Versioning

The Lira Design System follows [Semantic Versioning](https://semver.org).

## What counts as a breaking change

- Removing or renaming a token (any layer).
- Removing or renaming a component or component prop.
- Changing the visual default of a semantic token in a way that materially shifts existing screens (e.g. flipping `action.primary` from green to blue).
- Changing the package's `exports` map or supported peer-dependency ranges.

Anything else is non-breaking.

## What counts as a minor change

- New tokens, new components, new variants.
- New optional props.
- New utility utilities (e.g. a new chart helper).
- Documentation expansion.

## What counts as a patch

- Bug fixes that don't change shape.
- Internal refactors.
- Doc typos.

## Release process

1. Make changes, commit `tokens/` + `dist/` together.
2. Update `CHANGELOG.md` under `[Unreleased]`.
3. Bump `version` in `package.json` (`pnpm version major|minor|patch`).
4. Move `[Unreleased]` heading to the new version + date in `CHANGELOG.md`.
5. Tag and push: `git tag v<version> && git push --tags`.

## Pinning from consumer repos

Default to floating on `main` while the system is iterating fast:

```jsonc
"@lira/design-system": "github:feelwithlira/lira-design-system#main"
```

Pin to a tag once a consumer ships to production:

```jsonc
"@lira/design-system": "github:feelwithlira/lira-design-system#v1.0.0"
```

Re-pin during a planned upgrade window — never silently drift.

## Pre-releases

For experimental work, push a branch and pin consumers to it:

```jsonc
"@lira/design-system": "github:feelwithlira/lira-design-system#feature/dark-mode"
```

Once the work is merged, swap back to a tag.
