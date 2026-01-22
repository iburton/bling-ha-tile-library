# Contributing

Thanks for helping build Bling HA Tile Library!

## Commit message format
We use Conventional Commits so release automation can version correctly.

Format:
```
type(optional-scope): short description
```

Common types:
- `feat:` new feature (minor bump)
- `fix:` bug fix (patch bump)
- `feat!:` or `fix!:` breaking change (major bump)
- `docs:`, `chore:`, `refactor:`, `test:` (usually no release)

Examples:
- `feat: add battery tile`
- `fix: handle missing entity`
- `docs: update installation steps`
- `feat(ui): add status badge`

## Development
```
npm install
npm run build
```

