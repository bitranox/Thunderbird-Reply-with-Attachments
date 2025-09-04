SHELL := bash
.DEFAULT_GOAL := help

# Tools (override via environment if needed)
NPM ?= npm

.PHONY: help test pack

help: ## Show available make commands.
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_.-]+:.*##/ { printf "%-10s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

test: ## Run all tests (Vitest)
	$(NPM) test

pack: ## Build ATN and PRIVATE ZIPs via packaging script
	bash ./distribution_zip_packer.sh

