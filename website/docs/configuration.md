---
id: configuration
title: Configuration
---

# Configuration

Terminology note: see the [Glossary](glossary) for consistent terms used in UI and docs.

## open options in Thunderbird
- Thunderbird → Tools → Add‑ons and Themes → find “Reply with Attachments” → Preferences/Options

### Settings:

#### Confirmation
  - Toggle “Ask before adding attachments”
  - Default answer: Yes or No (focus & keyboard default)
  - Keyboard: Y/J = Yes; N/Esc = No; Tab/Shift+Tab and Arrow keys cycle focus

#### Blacklist (glob patterns)
  Blacklisted Files will not be added on reply automatically
  - One pattern per line; case‑insensitive; filename‑only matching
  - Examples: `*.png`, `smime.*`, `*.p7s`
  - Supported glob tokens: `*` (any chars except `/`), `?` (one char), character classes like `[abc]`. Use `\[` to match a literal `[`. Paths (`**/`) are ignored since only filenames are matched.
  - Not supported: negation (`!`), brace expansion (`{..}`), and complex ranges. Keep patterns simple.

Tip: Defaults are prefilled on first open and can be reset anytime.

#### save Your settings

---

### Filename normalization (duplicates prevention)

To behave consistently across platforms, filenames are normalized before duplicate checks:
- Unicode is normalized to NFC.
- Names are case‑folded (lowercased).
- Trailing dots/spaces are trimmed (Windows friendliness).

This keeps duplicate detection predictable for names like `café.pdf` vs `café.pdf` (NFD) or `FILE.txt.` vs `file.txt`.
