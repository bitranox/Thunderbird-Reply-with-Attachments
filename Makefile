SHELL := bash
.DEFAULT_GOAL := help

# Tools (override via environment if needed)
NPM ?= npm

.PHONY: commit eslint help lint pack prettier prettier-check prettier-write test test-i18n translate-web translation-web translate-web-index translation-web-index translate-app translation-app web-build web-build-linkcheck web-build-local-preview web-push-github -- --%

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

web-build: ## Build docs to website/build. Usage: make web-build OPTS="--locales <list|all>" (or BUILD_LOCALES="en de"). Defaults to all.
	@set -e; \
	locale_args=""; \
	# Prefer explicit BUILD_LOCALES if provided
	if [ -n "$$BUILD_LOCALES" ]; then \
	  for l in $$BUILD_LOCALES; do locale_args="$$locale_args -l $$l"; done; \
	else \
	if echo " $(OPTS) " | grep -qE ' --locales(=| )'; then \
	  val=""; pick_next=0; \
	  for arg in $(OPTS); do \
	    if [ "$$pick_next" = 1 ]; then val="$$arg"; break; fi; \
	    case "$$arg" in \
	      --locales=*) val="$${arg#--locales=}"; break;; \
	      --locales) pick_next=1;; \
	    esac; \
	  done; \
	  val=$$(echo "$$val" | tr ',' ' ' | tr '[:upper:]' '[:lower:]'); \
	  list=""; \
	  for l in $$val; do [ "$$l" != "all" ] && case " $$list " in *" $$l "*) ;; *) list="$$list $$l";; esac; done; \
  if [ -n "$$list" ]; then \
    locale_args=""; \
    for l in $$list; do locale_args="$$locale_args -l $$l"; done; \
    BUILD_LOCALES=$$(echo "$$list" | sed -e 's/^ *//' -e 's/  */ /g'); export BUILD_LOCALES; \
  fi; \
	fi; fi; \
	cd website; \
	if [ ! -d node_modules/@docusaurus ]; then npm ci; fi; \
	node ./node_modules/@docusaurus/core/bin/docusaurus.mjs build $$locale_args

web-build-linkcheck: ## Offline-safe link check (builds to tmp_linkcheck_web_pages). Usage: make web-build-linkcheck OPTS="--locales <list|all>" (or BUILD_LOCALES). Skips external HTTP(S) links.
	@bash scripts/make-web-build-linkcheck.sh $(OPTS)

web-build-local-preview: ## Preview to web-local-preview/, auto-serve 8080–8090, print URL; PID at web-local-preview/.server.pid. Usage: make web-build-local-preview OPTS="--locales <list|all> [--no-test] [--no-link-check] [--dry-run] [--no-serve]". No push.
	@set -e; \
	if [ -x scripts/web-build-local-preview.sh ]; then \
	  bash scripts/web-build-local-preview.sh $(OPTS); \
	else \
	  echo "scripts/web-build-local-preview.sh not found; aborting"; \
	  exit 1; \
	fi

web-push-github: ## Push website/build to GitHub Pages (stages in tmp_github_web_pages; uses scripts/web-push-github.sh). OPTS not used.
	@set -e; \
	if [ ! -f website/build/index.html ]; then \
	  echo "Docs not built yet. Running 'make web-build'…"; \
	  $(MAKE) web-build; \
	fi; \
	if [ -x scripts/web-push-github.sh ]; then \
	  bash scripts/web-push-github.sh; \
	else \
	  echo "scripts/web-push-github.sh not found; aborting"; \
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

translate-web: ## Alias for 'make translation-web' (no OPTS forwarded)
	@$(MAKE) translation-web

translation-web: ## Translate website docs. Usage: make translation-web OPTS="<doc|all> <lang|all>" (interactive when OPTS omitted). Logs to translation_web.log
	@set -e; \
	if [ -z "$(OPTS)" ]; then \
	  node scripts/translate_web_docs.js; \
	else \
	  node scripts/translate_web_docs.js $(OPTS); \
	fi

translate-web-index: ## Alias for 'make translation-web-index' (no args; translates website index UI strings)
	@$(MAKE) translation-web-index

translation-web-index: ## Translate website UI strings (homepage/navbar/footer) from website/i18n/en/code.json to all locales under website/i18n (except en). Usage: make translation-web-index [OPTS="--locales de,fr --force"]
	@set -e; \
	args="$(OPTS)"; \
	node scripts/translate_web_index.js $$args

translate-app: ## Alias for 'make translation-app' (no args; translates EN app strings to all locales)
	@$(MAKE) translation-app

translation-app: ## Translate app UI strings from sources/_locales/en/messages.json. Usage: make translation-app OPTS="--locales all|de,fr". Logs to translation_app.log
	@set -e; \
	args="$(OPTS)"; \
	if [ -z "$$args" ]; then args="--locales all"; fi; \
	node scripts/translate_app.js $$args
