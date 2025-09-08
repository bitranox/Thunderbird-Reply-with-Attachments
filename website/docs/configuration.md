---
id: configuration
title: Configuration
---

# Configuration

Terminology note: see the [Glossary](glossary) for consistent terms used in UI and docs.

## Open options in Thunderbird

- Thunderbird → Tools → Add‑ons and Themes → find “Reply with Attachments” → Preferences/Options

### Settings:

#### Confirmation

- Toggle “Ask before adding attachments”
- Default answer: Yes or No (focus & keyboard default)
- Keyboard: Y/J = Yes; N/Esc = No; Tab/Shift+Tab and Arrow keys cycle focus
  - See keyboard details in [Usage](usage#keyboard-shortcuts).

#### Blacklist (glob patterns)

Blacklisted files will not be added on reply automatically. See also the [Glossary](glossary) for “Blacklist (Exclude list)”.

- One pattern per line; case‑insensitive; filename‑only matching
- Examples: `*.png`, `smime.*`, `*.p7s`
- Supported glob tokens: `*` (any chars except `/`), `?` (one char), character classes like `[abc]`. Use `\[` to match a literal `[`. Paths (`**/`) are ignored since only filenames are matched.
- Not supported: negation (`!`), brace expansion (`{..}`), and complex ranges. Keep patterns simple.
- Why the example `*passwor*`? It matches both “password” and “Passwort” families.
- Precedence: if any pattern matches a filename, the file is excluded (first/any match — order does not change the result).
- Tip — test your pattern: add a temporary pattern, reply to a message containing a file with a matching name, and confirm it is excluded in the warning list.

Tip: Defaults are prefilled on first open and can be reset anytime.

#### Warning on excluded attachments

- Toggle “Warn if attachments are excluded by blacklist” (default: ON).
- When enabled, a small modal lists excluded files and the matching pattern(s). The
  warning also appears when nothing will be attached because all candidates were
  blacklisted.

#### Save your settings

Settings are saved automatically when toggles/inputs change in the Options page. There is no separate Save button. You can revert individual fields manually or reset defaults as needed.

---

### Filename normalization (duplicates prevention)

To behave consistently across platforms, filenames are normalized before duplicate checks:

- Unicode is normalized to NFC.
- Names are case‑folded (lowercased).
- Trailing dots/spaces are trimmed (Windows friendliness).

This keeps duplicate detection predictable for names like `café.pdf` vs `café.pdf` (NFD) or `FILE.txt.` vs `file.txt`.

---

## Confirmation behavior

- “Default answer” sets the initially focused button in the confirmation dialog (helpful for keyboard users).
- Works for both “Reply” and “Reply all”. “Forward” is not modified by this addon.

---

## Advanced: duplicate detection

Duplicate prevention is implemented per compose tab and by filename. See [Usage](usage#behavior-details) for a detailed explanation.
