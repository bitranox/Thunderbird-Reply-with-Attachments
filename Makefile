SHELL := bash
.DEFAULT_GOAL := help

# Tools (override via environment if needed)
NPM ?= npm

.PHONY: help test pack lint

help: ## Show available make commands.
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_.-]+:.*##/ { printf "%-10s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

test: ## Run all tests (Vitest)
	$(NPM) test

lint: ## Lint manifest and source via web-ext
	@set -e; \
	trap 'rm -f sources/manifest.json' EXIT; \
	cp -f sources/manifest_PRIVATE.json sources/manifest.json; \
	$(NPM) run lint:webext

pack: lint ## Build ATN and PRIVATE ZIPs via packaging script
	bash ./distribution_zip_packer.sh
