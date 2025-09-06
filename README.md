# Reply with Attachments

![Tests](https://img.shields.io/badge/tests-vitest-blue)
[![codecov](https://codecov.io/gh/bitranox/Thunderbird-Reply-with-Attachments/branch/master/graph/badge.svg)](https://codecov.io/gh/bitranox/Thunderbird-Reply-with-Attachments)
![Thunderbird](https://img.shields.io/badge/thunderbird-MV3-green)
![License](https://img.shields.io/badge/license-MIT-green)

**Reply with Attachments** is a Thunderbird add‑on that automatically includes the original attachments when you reply.

What it does: When you reply to an email, it finds the original message’s attachments and adds them to your reply automatically. Optionally, a small confirmation dialog can ask before adding. If files are excluded by your blacklist, a short warning lists them (enabled by default).

Is it safe? Yes — it runs locally and uses a minimal set of permissions only to read original attachments and add them to your reply. See Permissions: https://bitranox.github.io/Thunderbird-Reply-with-Attachments/docs/permissions

---

## Configuration Highlights

- Ask before adding attachments (optional). Choose the default answer (Yes/No) for quick keyboard entry.
- Blacklist (glob patterns) to skip files automatically, case‑insensitive filename matching.
- Warn if attachments are excluded by blacklist (default: ON). Shows a small, accessible modal listing the excluded files and the matching pattern(s). Works even if all candidates are excluded.

See Configuration for details and examples.

## DOCS

- [Full Docs here](https://bitranox.github.io/Thunderbird-Reply-with-Attachments/)

Quickstart

- Install from Thunderbird Add‑ons, then reply to a message with attachments — originals will be added automatically or after a quick confirmation (toggle in Options).
- Read the Quickstart guide: https://bitranox.github.io/Thunderbird-Reply-with-Attachments/docs/quickstart

CI & Coverage

- Tests run in GitHub Actions on push/PR with coverage thresholds (85% lines/functions/branches/statements).
- Coverage HTML is uploaded as a build artifact in the CI run (Actions → latest run → Artifacts → coverage-html).

Release process

- Bump versions in `sources/manifest_ATN.json` and `sources/manifest_LOCAL.json`.
- Tag the commit as `vX.Y.Z`. Pushing the tag triggers packaging and a GitHub Release with zips.

## Support This Project

If you like this add‑on, please consider supporting it:

[![Donate via PayPal](https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)
