# quantcode-e2e-test

E2E test repository for QuantCode autonomous agents.

## Structure

- `src/calculator.ts` — Basic arithmetic functions (has a division-by-zero bug)
- `src/string-utils.ts` — String utility functions (has a word count bug, missing truncate function)
- `src/task-manager.ts` — Task management class (missing remove, update, and sortBy methods)
- `test/` — Test files (incomplete coverage)

## Testing

Tests use the [Bun](https://bun.sh) test runner (`bun:test`) and live in `test/`.

```bash
bun install                        # install dev dependencies (typescript, bun-types)
bun test                           # run the full suite (also: npm test)
bun test test/calculator.test.ts   # run a single file
```

Typecheck (no script defined; uses `tsconfig.json`):

```bash
bunx tsc --noEmit
```

Note: some tests currently fail because they cover known bugs and missing features in `src/`.
