# How to update the website

```bash
# change docs in /website/docs
# make translate for the chenged docs and all languages
make docs-build
make docs-build-linkcheck
make docs-build-linkcheck OPTS="--locales en"  # English only
# English only, skip tests/link-check (quick local deploy test)
make docs-deploy-local OPTS="--locales en --no-test --no-link-check --dry-run"
# All locales, with tests/link-check, then push to GitHub Pages
make docs-deploy-local OPTS="--locales en"
make docs-push-github
# Or call the script directly (same options as OPTS)
scripts/docs-local-deploy.sh --locales en --no-test --no-link-check --dry-run
```

# Quickcheck

```bash
make docs-build-linkcheck OPTS="--locales en"
make docs-deploy-local OPTS="--locales en"
make docs-push-github
```
