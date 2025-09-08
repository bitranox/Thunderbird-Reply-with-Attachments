SHELL := bash
.DEFAULT_GOAL := help

# Tools (override via environment if needed)
NPM ?= npm

.PHONY: commit docs-build docs-build-linkcheck docs-deploy-local docs-push-github eslint help lint pack prettier prettier-check prettier-write test test-i18n translate translation

commit: ## Format, run tests (incl. i18n), append changelog, commit & push to current branch
	@set -euo pipefail; \
	echo "✔ Formatting (write)…"; \
	$(MAKE) prettier-write; \

	echo "✔ Formatting (check)…"; \
	$(MAKE) prettier-check; \

	echo "✔ Running tests…"; \
	$(MAKE) test; \
	echo "✔ Running i18n tests…"; \
	$(MAKE) test-i18n; \
	echo "✔ Staging changes…"; \
	git add -A; \
	if git diff --cached --quiet; then \
	  echo "No changes to commit. Skipping changelog/commit."; \
	  exit 0; \
	fi; \
	echo "✔ Updating CHANGELOG.md…"; \
	bash scripts/append-changelog-entry.sh; \
	git add CHANGELOG.md; \
	branch=$$(git rev-parse --abbrev-ref HEAD); \
	shortstat=$$(git diff --cached --shortstat || true); \
	msg="chore: format, tests pass, update changelog ($$shortstat)"; \
	echo "✔ Committing…"; \
	git commit -m "$$msg"; \
	echo "✔ Pushing to origin/$$branch…"; \
	git push -u origin $$branch

docs-build: ## Build Docusaurus site into website/build (OPTS: --locales en|all)
	@set -e; \
	# Determine locale arguments for Docusaurus build
	locale_args=""; \
	case " $(OPTS) " in \
	  *" --locales en "*) locale_args="--locale en" ;; \
	  *) locale_args="" ;; \
	esac; \
	cd website; \
	npm ci; \
	node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build $$locale_args

docs-build-linkcheck: ## Offline-safe link check (builds site first). OPTS: --locales en|all
	@set -e; \
	# Determine locale arguments for Docusaurus build
	locale_args=""; \
	case " $(OPTS) " in \
	  *" --locales en "*) locale_args="--locale en" ;; \
	  *) locale_args="" ;; \
	esac; \
	# Install website deps if missing and build with selected locale(s)
	cd website; \
	if [ ! -d node_modules/@docusaurus ]; then npm ci; fi; \
	node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build $$locale_args; \
	cd ..; \
	# Run the locally installed linkinator and rewrite GH Pages baseUrl to local paths
	node node_modules/linkinator/build/src/cli.js \
	  "website/build/index.html" \
	  --recurse \
	  --silent \
	  --skip 'mailto:|^https?:\/\/(?!(localhost|127\.0\.0\.1)([:/]|$$))|^\/\/|github\.com|bitranox\.github\.io|addons\.thunderbird\.net' \
	  --url-rewrite-search "/Thunderbird-Reply-with-Attachments/" \
	  --url-rewrite-replace "/"

docs-deploy-local: ## Build+sync docs into local gh-pages worktree (OPTS: --locales en|all --no-test --no-link-check --dry-run). No push.
	@set -e; \
	if [ -x scripts/docs-local-deploy.sh ]; then \
	  bash scripts/docs-local-deploy.sh $(OPTS); \
	else \
	  echo "scripts/docs-local-deploy.sh not found; aborting"; \
	  exit 1; \
	fi

docs-push-github: ## Push built site (website/build) to GitHub Pages (uses scripts/docs-gh-push.sh)
	@set -e; \
	if [ ! -f website/build/index.html ]; then \
	  echo "Docs not built yet. Running 'make docs-build'…"; \
	  $(MAKE) docs-build; \
	fi; \
	if [ -x scripts/docs-gh-push.sh ]; then \
	  SRC_DIR="website/build" bash scripts/docs-gh-push.sh; \
	else \
	  echo "scripts/docs-gh-push.sh not found; aborting"; \
	  exit 1; \
	fi

eslint: ## Run ESLint via flat config (npm run -s lint:eslint).
	$(NPM) run -s lint:eslint

help: ## List all targets with one-line docs (sorted)
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_.-]+:.*##/ { printf "%-24s %s\n", $$1, $$2 }' $(MAKEFILE_LIST) | sort -f

lint: ## web-ext lint on sources/ (temp manifest.json from manifest_LOCAL.json; ignores ZIP artifacts; non-fatal)
	@set -e; \
	trap 'rm -f sources/manifest.json' EXIT; \
	cp -f sources/manifest_LOCAL.json sources/manifest.json; \
	node ./node_modules/web-ext/bin/web-ext.js lint --self-hosted --ignore-files 'reply-with-attachments-plugin*.zip' --source-dir sources || true

pack: lint ## Build ATN & LOCAL ZIPs (runs linter; calls distribution_zip_packer.sh; outputs reply-with-attachments-plugin*.zip)
	bash ./distribution_zip_packer.sh

prettier: ## Format repository in-place via Prettier (writes changes)
	node node_modules/prettier/bin/prettier.cjs --write .

prettier-check: ## Prettier in check mode (no writes); fails if reformat needed
	node node_modules/prettier/bin/prettier.cjs --check .

prettier-write: ## Alias for 'make prettier' (write mode)
	$(MAKE) prettier

test: ## Prettier (write+check), ESLint, then Vitest (coverage if plugin installed; thresholds in vitest.config.mjs)
	@set -e; \
	$(MAKE) prettier-write; \
	$(MAKE) prettier-check; \
	$(NPM) run -s lint:eslint; \
	$(NPM) test

test-i18n: ## i18n-only tests: add-on placeholders/parity + website i18n parity (Vitest)
	$(NPM) run test:i18n && $(NPM) run -s test:website-i18n

translate: ## Alias for 'make translation' (DOC=..., TO=...)
	@$(MAKE) translation DOC="$(DOC)" TO="$(TO)"

translation: ## Translate docs -> i18n (interactive or DOC=... TO=...); reads .env OPENAI_*; preserves front-matter id
	@set -e; \
	args=""; \
	if [ -n "$(DOC)" ]; then args="$$args $(DOC)"; fi; \
	if [ -n "$(TO)" ]; then args="$$args $(TO)"; fi; \
	node scripts/translate_docs.js $$args
