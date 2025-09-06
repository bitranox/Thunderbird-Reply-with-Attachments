SHELL := bash
.DEFAULT_GOAL := help

# Tools (override via environment if needed)
NPM ?= npm

.PHONY: help test test-i18n pack lint prettier prettier-write prettier-check commit

help: ## Show available make commands.
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_.-]+:.*##/ { printf "%-10s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

test: ## Run all tests (Vitest)
	$(NPM) test

test-i18n: ## Run i18n parity and placeholder checks; verify EN↔DE parity in add-on and website
	$(NPM) run test:i18n && $(NPM) run -s test:website-i18n

lint: ## Lint manifest and source via web-ext
	@set -e; \
	trap 'rm -f sources/manifest.json' EXIT; \
	cp -f sources/manifest_LOCAL.json sources/manifest.json; \
	$(NPM) run lint:webext

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

