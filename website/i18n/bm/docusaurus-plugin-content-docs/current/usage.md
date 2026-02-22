---
id: usage
title: 'Jɔya'
sidebar_label: 'Kɛcogo'
---

---

## Jɔyɔrɔ {#usage}

- Ni i jabi, add‑on bɛ tɔgɔ sisan na daɲɛ tɛgɛli kɔrɔw (originals) la sisan‑sisan — walima a bɛ na i ma fɔ kɔfɛ, ni a bɛ daminɛ Options la.
- Dɔgɔkun ye (de‑duplicate) bɛ kɛ tɔgɔ fɛ; S/MIME wɛrɛw bɛna bɔ kɔfɛ kelen kelen. Inline jɛgɛw bɛna san bɔ jabi bɔlɔ la ka default ye (ka a na ko "Include inline pictures" la, Options kɔnɔ).
- Attachments minnu bɛ ka sɛbɛn ɲɛfon (blacklist) kɔnɔ la bɛna bɔ kɔfɛ fɔ (glob patternw minnu bɛ ɲɛgɛfɔ tɔgɔw kan, a tɛ sira ɲɔrɔw kan; ka ɲɛgɛ tɛ fila yɛrɛyɛrɛ ye). Ka ɲɛ [Configuration](configuration#blacklist-glob-patterns).

---

### Mun bɛ bɔ ni i jabi {#what-happens}

- Jabi dɔn → originaali attachments ɲɛ → S/MIME + inline sɛgɛsɛgɛ → k’a ɲɛ (confirm) sɔrɔ sisan → tɔgɔ daɲɛw minnu bɛ se (dɔgɔkunw bɔ) → inline jɛgɛw san bɔ bɔlɔ la.

Pass tɛgɛ (strict) ni pass hakɛranna (relaxed): Add‑on bɛ fɔlɔ ka S/MIME ni inline wɛrɛw bɔ daɲɛ tɛgɛli kɔnɔ. Ni fɛɛn tɛ sɔrɔ, a bɛ na pass hakɛranna kɛ min bɛna ka S/MIME/inline bɔ kɔnɔ kɔfɛ, nka a bɛ na ɲɔgɔnna dɔw dɛmɛ (ka ɲɛ Code Details). Inline jɛgɛw tɛna kɛ daɲɛ tɛgɛliw ye; tuma mɛn na, ni "Include inline pictures" bɛ daminɛ (default ye), olu bɛna sare bɔ jabi bɔlɔ la ka base64 data URIw ye.

| Part type                                         |                Strict pass |               Relaxed pass |
| ------------------------------------------------- | -------------------------: | -------------------------: |
| S/MIME signature file `smime.p7s`                 |                    Bɔ kɔfɛ |                    Bɔ kɔfɛ |
| S/MIME MIME types (`application/pkcs7-*`)         |                    Bɔ kɔfɛ |                    Bɔ kɔfɛ |
| Inline image referenced by Content‑ID (`image/*`) | Bɔ kɔfɛ (san bɔ bɔlɔ la\*) | Bɔ kɔfɛ (san bɔ bɔlɔ la\*) |
| Attached email (`message/rfc822`) with a filename |                 Tɛ na tɔgɔ |               Sɔrɔ ka tɔgɔ |
| Regular file attachment with a filename           |               Sɔrɔ ka tɔgɔ |               Sɔrɔ ka tɔgɔ |

\* Ni "Include inline pictures" bɛ daminɛ (default: ON), inline jɛgɛw bɛna sare bɔ jabi bɔlɔ la ka base64 data URIw ye a ma bɛna tɔgɔ ka k’u kɛ daɲɛ tɛgɛliw ye. Ka ɲɛ [Configuration](configuration#include-inline-pictures).

Misali: Attachmentw dɔ bɛna sɔrɔ ka headerw dɔ tɛ bɛ a la, nka olu tun bɛ daɲɛ hakɛ ye (tɛ inline/S/MIME). Ni pass tɛgɛ tɛ ye dɔ dɔ sɔrɔ, pass hakɛranna bɛna a la olu, ka tɔgɔ olu.

---

### Yɛlɛma‑rafɛransi {#cross-reference}

- Forward tɛna yelema ni don do ye (ka ɲɛ Limitations kɔfɛ).
- Ka sababuw min bɛ kɛ ka attachment tɛ tɔgɔ, ka ɲɛ “Mun na fa ka attachments tɛna tɔgɔ”.

---

## Baarakɛlaya ɲɛfɔw {#behavior-details}

- **Dɔgɔkun b’ a la (duplicate prevention):** Add‑on bɛ marke compose tab ye ko a kɛra, ka sẹẹsi kelen‑kelen (per‑tab) jiri ni in‑memory jeleman ye. A tɛna na originals tɔgɔ na fila.
- Ka compose finɛ da ka na a bɔ, a ye tab kura dimi ye (o ye fɔ ko ɲɛsin kura bɛ se).
- **Ka hakɛw di attachments minnu bɛ yen kɔnɔ la:** Ni compose kɔnɔ bɛna sɔrɔ attachmentw dɔ, originals bɛna tɔgɔ dɔ kelen dɔ ye dɔɔnin ye, k’a ka tɔgɔw minnu bɛ sɔrɔ kɔnɔ bɛ ɲɔgɔn ma bɔ.
- **Bɔlenw:** S/MIME fɛnw ni inline jɛgɛw bɛ bɔ daɲɛ tɛgɛli kɔnɔ. Ni fɔlɔ pass la fɛɛn tɛ sɔrɔ, pass hakɛranna bɛna non‑S/MIME wɛrɛw ka sikan kalo minɛ. Inline jɛgɛw bɛna kɛ dɔɔnin ye: olu bɛna san bɔ jabi bɔlɔ la ka data URIw ye (ni a bɛ daminɛ).
  - **Fichɛri tɔgɔw:** `smime.p7s`
  - **MIME suguw:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Inline jɛgɛw:** `image/*` wɛrɛ minnu bɛ Content‑ID ye — bɛ bɔ daɲɛ tɛgɛli kɔnɔ nka bɛ sare bɔ jabi bɔlɔ la tuma mɛn na "Include inline pictures" bɛ ON
  - **Emailw tɛgɛli (`message/rfc822`):** bɛna kɛ attachment hakɛ ye ni olu bɛ tɔgɔ; olu bɛ se ka tɔgɔ (dɔgɔkun kɛra ni blacklist kan).
- **Blacklist ɲɛsininkali (ni a bɛ daminɛ):** Ni kanbinanw bɛ bɔ i ka blacklist la, add‑on bɛna modal dɔ dɔɔnin jɛ, min bɛ fichɛriw jɔyɔrɔ minnu kan ka bɔ ni patternw minnu bɛ ɲɛgɛfɔ. O ɲɛsininkali bɛna na fila tuma mɛn na attachments tɛna tɔgɔ, sabu bɛɛ bɛna bɔ kɔfɛ.

---

## Klaviyɛri dɔgɔkunw {#keyboard-shortcuts}

- K’a ɲɛ (confirmation) dɔgɔkun: Y/J = Awo, N/Esc = Ayi; Tab/Shift+Tab ni Arrow kɛlɛw bɛ ka fokus ye to‑to.
  - “Default answer” [Configuration](configuration#confirmation) kɔnɔ bɛna butɔŋ min bɛ fokus fɔlɔ ye sɔrɔ.
  - Enter bɛna butɔŋ min bɛ fokus kɔnɔ la kɛ. Tab/Shift+Tab ni arroww bɛ ka fokus taa ni ka nana, k’a la se ka ɲɛ.

### Klaviyɛri ɲɛnabɔ {#keyboard-cheat-sheet}

| Keys            | Kɛcogo                         |
| --------------- | ------------------------------ |
| Y / J           | K’a ɲɛ Awo                     |
| N / Esc         | K’a ɲɛ Ayi                     |
| Enter           | Daminɛ butɔŋ min bɛ fokus kɔnɔ |
| Tab / Shift+Tab | Ka fokus taa kɔnɔ/kɔrɔ         |
| Arrow keys      | Ka fokus taa butɔŋw ɲɔgɔw kɔnɔ |
| Default answer  | Bɛ fokus fɔlɔ sariya (Awo/Ayi) |

---

## Sɛgɛsɛgɛw {#limitations}

- Add‑on nin tɛ yelema Forward (Reply ni Reply all bɛ dɛmɛ).
- Attachémentiw jɛman‑jɛman bɛ se ka sɔrɔ Thunderbird walima provider ka sɔrɔyali kan.
  - Add‑on tɛ daɲɛw ɲɛfa ta (chunk) walima a dan (compress); a bɛ nyɛna Thunderbird ka daɲɛ tɛgɛli ka cogo kan.
- Sigicogo minnu bɛ kisali (encrypted): S/MIME wɛrɛw bɛna bɔ kɔfɛ ni se ka fɔ.

---

## Mun na fa ka attachments tɛna tɔgɔ {#why-attachments-might-not-be-added}

- Inline jɛgɛw tɛna kɛ daɲɛ tɛgɛliw ye. Ni "Include inline pictures" bɛ ON (default ye), olu bɛna sare bɔ jabi bɔlɔ la ka data URIw ye. Ni setting bɛ OFF, inline jɛgɛw bɛna bɔ bɛɛ. Ka ɲɛ [Configuration](configuration#include-inline-pictures).
- S/MIME signature wɛrɛw bɛ bɔ kɔfɛ ni don do ye: tɔgɔw wɛrɛw kama `smime.p7s` ni MIME suguw wɛrɛw kama `application/pkcs7-signature` walima `application/pkcs7-mime` bɛna bɔ.
- Blacklist patternw bɛ se ka kanbinanw sɛgɛsɛgɛ: ka ɲɛ [Configuration](configuration#blacklist-glob-patterns); ɲɛgɛfɔ tɛ ɲɛ ka ɲɛ (case‑insensitive) ni tɔgɔ‑di ye dɔɔnin (path tɛ).
- Tɔgɔ dɔgɔkunw tɛna tɔgɔ: ni compose kɔnɔ bɛna sɔrɔ daɲɛ dɔ min tɔgɔ sigilen kelen ye dɔ ɲɔgɔn ma, a bɛna bɔ kɔfɛ.
- Wɛrɛw minnu tɛ daɲɛ ye walima tɔgɔ tɛ sɔrɔ: daɲɛ‑kama wɛrɛw minnu bɛ tɔgɔ min se ka baara dɔn dɔn de bɛ sɔrɔ ka tɔgɔ.

---

Ka ɲɛ k’a fɔ

- [Configuration](configuration)
