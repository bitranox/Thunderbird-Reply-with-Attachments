---
id: usage
title: 'Togbɛn'
sidebar_label: 'Togbɛn'
---

## Usage {#usage}

- Reply ye dɔkita la kɔrɔ ni add-on ye originals fila kɛlɛ — an bɛ mɔgɔ, sisan an dɔgɔ, sira ka fɔlɔ wɔ a Options.
- De‑duplicated ta filename; S/MIME ni inline images la ɲɛ na dɔgɔ tì.
- Blacklisted attachments dɔn ɲɛ na dɔgɔ (kɛnɛ‑mɛw mɔgɔ ni filenames, a ka kɛlɛn). Mè ka [Configuration](configuration#blacklist-glob-patterns).

---

### What happens on reply {#what-happens}

- Detect reply → list original attachments → filter S/MIME + inline → optional confirm → add eligible files (skip duplicates).

Strict vs. relaxed pass: I dɔkita baara S/MIME ni inline parts dɔn. Sisan bɛn kɛnɛ fɔ mɛn, i kɔ relaxed pass fɔlɔ ka S/MIME/inline bɔ ɲɛ, na i ka toleré mɛn sisan (ka fɔ kodɔ).

| Part type                                         |  Strict pass | Relaxed pass |
| ------------------------------------------------- | -----------: | -----------: |
| S/MIME signature file `smime.p7s`                 |     Excluded |     Excluded |
| S/MIME MIME types (`application/pkcs7-*`)         |     Excluded |     Excluded |
| Inline image referenced by Content‑ID (`image/*`) |     Excluded |     Excluded |
| Attached email (`message/rfc822`) with a filename |    Not added | May be added |
| Regular file attachment with a filename           | May be added | May be added |

Example: Kɔnɔ attachments bɛ kɛnɛ kɛn kɔrɔ furu sigi la a fɛ ka sisan baara, da a yɛn n’tɔgɔ bɔ. Sisan kɛnɛ n be ti kɔ, relaxed pass bɔ bɛ ɲɔgɔn fɛn n ye ti ka dɔgɔ.

---

### Cross‑reference {#cross-reference}

- Forward mɔgɔ la dɔ ka bɛndɔ ka n’kɛbɛ sisan (mɛ fɔlɔ Limitations sisan).
- I bɛgɔ ye tɛsɛ kan mɔgɔ kɔn bɛ rɔ; a ye “Bala mɔgɔ kɔn bɛ rɔ”.

---

## Behavior Details {#behavior-details}

- **Duplicatɛn bɔ:** Dɔkita mɔgɔ kɔrɔ ni tab fila ye processed ka a tab kɔrɔ sisan ni in‑memory guard. I dɔn ɲɛ na originals dɔgɔ.
- Sisan kɔ ni reopening a compose window fi na dɔn kɛnɛ mɛn mɔgɔ ka dɔgɔ (i.e., a kɔ sisan kɔrɔ bɛ).
- **Respect existing attachments:** Sisan compose fɛ lɔsara attachments, originals bɛ fɔlɔ na sisan tì, dɔgɔ na filenames dɔn ye kɛn.
- **Exclusions:** S/MIME artefacts ni inline images bɛ bɔ. Sisan kɛnɛ mɛn na dɔ, relax pass ka yɛn non‑S/MIME parts.
  - **Filenames:** `smime.p7s`
  - **MIME types:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline images:** kɔrɔ `image/*` la a ka Content‑ID de message body fɔlɔ
  - **Attached emails (`message/rfc822`):** dɔgɔ ka kɛlɛn attachments fɛ bɛ filenames kɛn; i bɛ fɔlɔ (kɔ to duplicates ni blacklist).
- **Blacklist warning (sisan bɛ bɔ):** Kɔ ni kɔn candidate bɛ dɔ yɛn blacklist,
  dɔkita ka fɔdɔ ɲɛ sɔrɛn a ka tɛbɛ lɔgɔn ni matching
  pattern(s). A warning sisan bō bē sɔ dɔtɔ kɛn kɛn ke a ye to attachments.

---

## Keyboard shortcuts {#keyboard-shortcuts}

- Confirmation dialog: Y/J = Aye, N/Esc = Ayi; Tab/Shift+Tab ni Arrow kɔrɔ ti.
  - “Default answer” la [Configuration](configuration#confirmation) ka bɛ sɔbɔ kɛn dɔ.
  - Enter fɔbɔ kɛlɛn. Tab/Shift+Tab ni arrows dɔgɔ fɔbɔ sɔgɔ.

### Keyboard Cheat Sheet {#keyboard-cheat-sheet}

| Keys            | Action                            |
| --------------- | --------------------------------- |
| Y / J           | Aye confirm                       |
| N / Esc         | Ayi confirm                       |
| Enter           | Activate focused button           |
| Tab / Shift+Tab | Move focus forward/back           |
| Arrow keys      | Move focus between buttons        |
| Default answer  | Sɛ set initial focus (Aye an Ayi) |

---

## Limitations {#limitations}

- Forward bɛ mɔgɔ ye dɔ ka bɛn dɔkita (Reply ni Reply all bɛ support).
- Kɛ site attachments mɛn bɛ kɛnɛ Thunderbird an provider limits.
  - Dɔkita mɔgɔ bɛ dɔ ka chunk an compress files; i kɔrɔ fɔ Thunderbird’s normal attachment handling.
- Encrypted messages: S/MIME parts dɔn mɔgɔ bɛ ka bɔ.

---

## Why attachments might not be added {#why-attachments-might-not-be-added}

- Inline images bɛ ɲɛ: parts ye referenced ka Content‑ID la message body dɔkɔ la i bɛ ɲɛ na files.
- S/MIME signature parts mɔgɔ bɛ ɲɛ la: filenames ka `smime.p7s` ni MIME types such as `application/pkcs7-signature` an `application/pkcs7-mime` ɲɛ dɔgɔ.
- Blacklist patterns la bɛ filter candidates: sɔ [Configuration](configuration#blacklist-glob-patterns); a bɛn matching na kɛnɛ‑mɛw ni filename‑only.
- Duplicate filenames dɔgɔ ɲɛ: sisan compose mɛn na file kɔ sisan, i kɔrɔ na.
- Non‑file parts an kɛnɛ filenames: to file‑like parts fɛ bɔ usable filenames dɔ fɔ add.

---

See also

- [Configuration](configuration)
