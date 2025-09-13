# How to update the website

```bash
# change docs in /website/docs
# translate homepage/navbar/footer UI strings (requires OPENAI_API_KEY)
make translation_web_index_page            # all locales (skip en)
# or limit locales
make translation_web_index_page OPTS="--locales de,fr"

# translate docs (interactive or via OPTS)
make web-build
make web-build-linkcheck
make web-build-linkcheck OPTS="--locales en"  # English only
# English only, skip tests/link-check (quick local deploy test)
make web-build-local-preview OPTS="--locales en --no-test --no-link-check --dry-run"
# All locales, with tests/link-check, then push to GitHub Pages
make web-build
make web-push-github   # pushes website/build to gh-pages
# Or call the script directly (same options as OPTS)
scripts/web-build-local-preview.sh --locales en --no-test --no-link-check --dry-run
```

# Quickcheck

```bash
make web-build-linkcheck OPTS="--locales en"
make translation_web_index_page OPTS="--locales en,de"  # update index UI translations before build
make web-build OPTS="--locales en"
make web-push-github   # pushes website/build to gh-pages
```
