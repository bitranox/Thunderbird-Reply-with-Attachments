# Contributing Guide

Thanks for helping improve Reply with Attachments! This guide keeps changes small, safe, and easy to review.

## Quickstart
- Build ZIPs: `make pack`
- Run tests: `make test`
- Open coverage (optional): install `@vitest/coverage-v8`, then see `coverage/index.html`

## Principles
- Keep functions tiny and intention‑revealing (Clean Code).
- Keep domain/application code framework‑free (Clean Architecture).
- Change only what the request asks for; avoid drive‑by edits.

## Branch & Commits
- Branches: `feature/<short-name>` or `fix/<short-name>`
- Commits: imperative, concise scope (e.g., `fix: skip SMIME attachments`)

## Pull Requests
Include:
- Summary + rationale
- Linked issues
- Before/after behavior and screenshots if UX changes
- Testing notes (what was tested, how to reproduce)

Checklist:
- [ ] Tests added/updated and passing (`make test`)
- [ ] README/Options text updated if UX changed
- [ ] Packaging unaffected (no ZIPs committed)

## Testing & Coverage
- Unit/integration tests live under `tests/` and run with Vitest.
- `make test` prints coverage if `@vitest/coverage-v8` is installed.
- Prefer tiny, “plain‑English” tests. One behavior per test.

## Do/Don’t
- Do: log with `console.*` using actionable messages.
- Do: keep IDs, time, and I/O injectable.
- Don’t: commit `sources/manifest.json` or generated ZIPs.
- Don’t: add heavy dependencies for simple tasks.

Happy hacking!
