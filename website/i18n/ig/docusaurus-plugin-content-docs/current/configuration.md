---
id: configuration
title: 'Nchekwa'
---

## Nchekwa

Terminology note: see the [Glossary](glossary) for consistent terms used in UI and docs.

---

## Meghee nhọrọ na Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Ngwaọrụ → Ngwa‑na Isiokwu → chọta “Zaghachi na Dọtụ” → Nhọrọ/Ntọala

---

### Ntọala {#settings}

#### Confirmation {#confirmation}

- Toggle “Jụọ tupu itinye dọtụ”
- Default answer: Ee ma ọ bụ Mba (focus & keyboard default)
- Keyboard: Y/J = Ee; N/Esc = Mba; Tab/Shift+Tab na igodo arrow na-agbasa uche
  - See keyboard details in [Usage](usage#keyboard-shortcuts).

---

#### Blacklist (glob patterns) {#blacklist-glob-patterns}

A na-emekarị na faịlụ ndị a ga-abanye na nzaghachi n'ozuzu. See also the [Glossary](glossary) for “Blacklist (Exclude list)”.

- Otu pattern kwa ahịrị; na-enweghịiched; matching faịlụ aha naanị
- Example: `*intern*`, `*secret*`, `*passwor*`
- A na-akwado glob tokens: `*` (onye na-adịghị enye `/`), `?` (otu char), klass ndị dị ka `[abc]`. Jiri `\[` iji match literal `[`. Paths (`**/`) na-emeso anyị n'echiche na naanị faịlụ aha ka a na-emepụta ya.
- Adịghị akwado: negation (`!`), brace expansion (`{..}`), na mgbakwunye ibe. Kee patterns dị mfe.
- A naghị akwado okwu na patterns. Ekwela itinye `#` ma ọ bụ inline comments; tinye naanị ederede pattern kwa ahịrị.

---

##### Pattern cookbook {#pattern-cookbook}

- Match any PDF: `*.pdf`
- Match files starting with “scan”: `scan*`
- Character class: `report[0-9].txt`
- Escape a literal `[`: `\[` (nke a bụ ezigbo mgbe ị na-etinye brackets dịka karakter)

---

##### Notes {#blacklist-notes}

- Order does not matter; the first/any match excludes the file.
- Matching is filename‑only (paths/folders are ignored).
- “Reset to defaults” restores the recommended patterns and the blacklist warning toggle.
- Why the example `*passwor*`? It matches both “password” and “Passwort” families.
- Precedence: if any pattern matches a filename, the file is excluded (first/any match — order does not change the result).
- Tip — test your pattern: add a temporary pattern, reply to a message containing a file with a matching name, and confirm it is excluded in the warning list.

##### Quick try‑it (safe test) {#blacklist-try-it}

1. Open Options → Blacklist.
2. Add a temporary pattern like `*.tmp` and click Save.
3. Reply to a test mail that has a file ending with `.tmp` — the file should appear in the warning list and not be attached.
4. Remove the temporary pattern when done, or click “Reset to defaults”.

---

#### Warning on excluded attachments {#warning-on-excluded-attachments}

- Toggle “Warn if attachments are excluded by blacklist” (default: ON).
- When enabled, a small modal lists excluded files and the matching pattern(s). The
  warning also appears when nothing will be attached because all candidates were
  blacklisted.

---

#### Save your settings {#save-your-settings}

Ntọala ka a na-echekwa site na ịpị bọtịnụ Save. Ị nwere ike ịlaghachi na mpaghara ndị a n'ọnọdụ ma ọ bụ weghachite ọkọlọtọ dịka mkpa si dị.

Ọ bụrụ na ntọala echekwara adịghị egosi nke ọma, malite Thunderbird ọzọ ma gbalịa ọzọ. (Thunderbird nwere ike ịchekwa ọnọdụ n'oge ngwa; ịmalite ọzọ na-eme ka ntọala ọhụrụ nke a ga-achọ.)

Tip: To confirm your settings took effect, reply to any message with an attachment and check the confirmation or blacklist warning.

---

#### Donation Visibility (90‑day snooze) {#donation-visibility}

The add‑on includes a convenience feature to hide donation prompts for a while after you’ve donated.

Where to find it

- Options → Support section: you’ll see an “I donated” button and a small hint area.
- The Send‑confirmation dialog also shows a Donate button; it automatically hides when the snooze is active.

How it works

- Clicking “I donated” hides donation buttons and related prompts for 90 days.
- A status hint shows “Hidden until YYYY‑MM‑DD” (in your local date). There is also a “Show Donate again” button to restore visibility immediately.
- After 90 days, the Donate button becomes visible automatically again.

Privacy & storage

- The add‑on stores a single timestamp in Thunderbird’s local storage to remember the snooze period. Key: `donateHideUntil` (epoch milliseconds).
- This setting is local to your Thunderbird profile (not cloud‑synced). No network requests are made by this feature.

Troubleshooting

- If Donate still shows right after clicking “I donated”, wait a moment or reopen the Options page; the UI updates as soon as the setting is saved.
- To reset manually, click “Show Donate again”. You can also wait until the date listed in the hint passes.

This feature is purely for convenience; it never blocks add‑on functionality and does not collect any personal data.

---

### Filename normalization (duplicates prevention) {#filename-normalization-duplicates-prevention}

To behave consistently across platforms, filenames are normalized before duplicate checks:

- Unicode is normalized to NFC.
- Names are case‑folded (lowercased).
- Trailing dots/spaces are trimmed (Windows friendliness).

This keeps duplicate detection predictable for names like `café.pdf` vs `café.pdf` (NFD) or `FILE.txt.` vs `file.txt`.

---

## Confirmation behavior {#confirmation-behavior}

- “Default answer” sets the initially focused button in the confirmation dialog (helpful for keyboard users).
- Works for both “Reply” and “Reply all”. “Forward” is not modified by this add-on.

---

## Advanced: duplicate detection {#advanced-duplicate-detection}

Duplicate prevention is implemented per compose tab and by filename. See [Usage](usage#behavior-details) for a detailed explanation.

---

See also

- [Permissions](permissions)
- [Privacy](privacy)
