# Project: Thunderbird Reply with Attachments

## Running tests

- Full suite: `npm test`
- Single file: `node node_modules/vitest/vitest.mjs run tests/<file>.test.js`
- Do NOT use `npx vitest` or `vitest` directly — they are not on the PATH.

## Formatting & linting

- Check formatting: `npm run format:check`
- Fix formatting: `npm run format:write` or `node ./node_modules/prettier/bin/prettier.cjs --write <file>`
- Lint: `npm run lint:eslint`
