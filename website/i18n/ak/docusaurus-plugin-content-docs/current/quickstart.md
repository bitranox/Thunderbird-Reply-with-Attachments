---
id: quickstart
title: 'Hyɛ ase ntɛm'
sidebar_label: 'Fi ase ntɛm'
---

---

## Mfiase ntɛmntɛm

:::important Thunderbird vɛɛhyɛn a ɛsɛ koraa
Add‑on yi yɛ adwuma wɔ Thunderbird **128 ESR anaa nea ɛto so akyire** mu. Vɛɛhyɛn tete no nni mmoa.
:::

:::note Nni telemetry; nni nɛtwɛɛk wɔ ekyir
Add‑on no nnnye analytics/telemetry, na ɛnnyɛ nɛtwɛɛk mfrɛ biara wɔ ekyir. Nɛtwɛɛk no ba so pɛ bere a wopɛnkiti lɔnkɛ a ɛwɔ abɔnten (Docs, GitHub, Donate).
:::

---

### Instɔl

1. Instɔl add‑on no firi Thunderbird Add‑ons.
2. Apɛdeɛ: Hyɛ confirmation no so (Options → “Ask before adding attachments”).
3. Apɛdeɛ: Gya blacklist kɔkɔbɔ no ahyɛ so (default): “Warn if attachments are excluded by blacklist”.
4. Apɛdeɛ: Fa blacklist patterns ka ho (baako wɔ lain biara so), sɛ:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Kae: “# …” a ɛwɔ soro no yɛ asɛm‑nkyerɛ (comment) wɔ krataa yi mu; mfa asɛm‑nkyerɛ nnnka patterns a wode bɛtɔ Options mu. Kyerɛw pattern baako pɛ wɔ lain biara so.

Afei, bu mmuae ma asɛm a ɛwɔ attachments — originals no bɛka ho otomatikɔ anaa akyiri ntɛm‑adanseɛ kakraa akyi. Sɛ w’blacklist yi yi fayl biara gu ho a, wobɛhu kɔkɔbɔ ketewa a ɛkyerɛ wɔn.

---

### Sɔhwɛ {#verify}

- Bu mmuae ma asɛm bi a ɛwɔ attachments 1–2 na kyerɛ adanseɛ sɛ originals no aka wo compose window no mu.
- Sɛ wopɛ sɛ wosesa ɔkwan a ɛyɛ adwuma no a, hwɛ [Nhyehyɛe](configuration) (confirmation toggle, default answer, blacklist patterns).

---

### Sɔhwɛ blacklist kɔkɔbɔ {#verify-blacklist-warning}

- Bu mmuae ma asɛm bi a ɛwɔ fayl te sɛ “secret.txt”.
- Sɛ “Warn if attachments are excluded by blacklist” ahyɛ so a, dialog ketewa bi bɛkyerɛ fayl a woyi wɔn gu ho ne pattern a ɛtɔ no mu.

Sɛ wonhu kɔkɔbɔ a, si nkɔmɔ so sɛ pattern no pɛ filename no pɛpɛɛpɛ (filename nko ara, ɛmfa kɛse/ketewa ho hwee). Hwɛ Nhyehyɛe → Blacklist.

---

### Kibɔɔd nkyerɛmu {#keyboard-note}

- Confirmation dialog no gye Y/J di ma Yes na N/Esc ma No. Wɔ kibɔɔd bi a ɛnyɛ Latin no, akyerɛwdeɛ nsaferɛ no betumi asesa; Enter di bɔtɔnn a ɛda so no adanseɛ.

---
