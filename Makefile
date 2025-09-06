SHELL := bash
.DEFAULT_GOAL := help

# Tools (override via environment if needed)
NPM ?= npm

.PHONY: help test test-i18n pack lint eslint prettier prettier-write prettier-check commit docs-build docs-link-check

help: ## Show available make commands.
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_.-]+:.*##/ { printf "%-10s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

eslint: ## Run ESLint (flat config)
	$(NPM) run -s lint:eslint

test: ## Run Prettier (write + check), ESLint, then all tests (Vitest)
	@set -e; \
	$(MAKE) prettier-write; \
	$(MAKE) prettier-check; \
	$(NPM) run -s lint:eslint; \
	$(NPM) test

test-i18n: ## Run i18n parity and placeholder checks; verify EN↔DE parity in add-on and website
	$(NPM) run test:i18n && $(NPM) run -s test:website-i18n

lint: ## Lint manifest and source via web-ext
	@set -e; \
	trap 'rm -f sources/manifest.json' EXIT; \
	cp -f sources/manifest_LOCAL.json sources/manifest.json; \
	node ./node_modules/web-ext/bin/web-ext.js lint --self-hosted --ignore-files 'reply-with-attachments-plugin*.zip' --source-dir sources || true

pack: lint ## Build ATN and LOCAL ZIPs via packaging script
	bash ./distribution_zip_packer.sh

prettier: ## Run Prettier to format the repository
	node node_modules/prettier/bin/prettier.cjs --write .

prettier-write: ## Run Prettier in write mode
	$(MAKE) prettier

prettier-check: ## Run Prettier in check (no write) mode
	node node_modules/prettier/bin/prettier.cjs --check .

commit: ## Format, run tests (incl. i18n), update changelog, commit & push
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

docs-build: ## Build Docusaurus website into website/build
	@set -e; \
	cd website; \
	npm ci; \
	node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build

docs-link-check: docs-build ## Check built site links via linkinator
	@set -e; \
	npx --yes linkinator "website/build/Thunderbird-Reply-with-Attachments/index.html" --recurse --silent --skip "mailto:|github\\.com|bitranox\\.github\\.io|addons\\.thunderbird\\.net"
