# how to update the webpage

```bash
# change docs in /website/docs
# make translate for the chenged docs and all languages
make docs-build
make docs-link-check
# English only, skip tests, for quick deployment test
make docs-deploy OPTS="--no-test --locales en"
# All locales, with tests
make docs-deploy
```
