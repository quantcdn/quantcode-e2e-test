# quantcode-e2e-test

E2E test repository for QuantCode autonomous agents.

## Structure

- `src/calculator.ts` — Basic arithmetic functions (has a division-by-zero bug)
- `src/string-utils.ts` — String utility functions (has a word count bug, missing truncate function)
- `src/task-manager.ts` — Task management class (missing remove, update, and sortBy methods)
- `test/` — Test files (incomplete coverage)

## Running Tests

```bash
bun test
```
