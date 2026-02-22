---
id: quickstart
title: 'Kutanga nekukurumidza'
sidebar_label: 'Kutanga nekukurumidza'
---

---

## Kukurumidza Kutanga

:::important Shanduro shoma inodiwa yeThunderbird
Wedzero iyi inotsigira Thunderbird **128 ESR kana nyowani**. Shanduro dzekare hadzitsigirwe.
:::

:::note Hapana telemetry; hapana netiweki yekumashure
Wedzero iyi haunganidzi analytics/telemetry uye haiti zvikumbiro zvenetiweki zviri kumashure. Kuwana netiweki kunongoitika chete kana wadzvanya zvinongedzo zvekunze (Magwaro, GitHub, Kupa).
:::

---

### Kuisa

1. Isa wedzero kubva kuThunderbird Add‑ons.
2. Zvekuzvisarudzira: Batidza kusimbisa (Options → “Ask before adding attachments”).
3. Zvekuzvisarudzira: Siya yambiro ye blacklist yakabatidzwa (default): “Warn if attachments are excluded by blacklist”.
4. Zvekuzvisarudzira: Wedzera mapatani eblacklist (imwe pamutsara), semuenzaniso:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Cherechedza: “# …” iri pamusoro apa ikomendi mugwaro rino; usaise makomendi mumapatani auno namatidza muOptions. Isa patani imwe chete pamutsara.

Iye zvino pindura kumeseji ine zvinosungirirwa — zvekutanga zvichawedzerwa otomatiki kana mushure mekukurumidza kusimbisa. Kana paine mafaera abviswa neblacklist yako, uchaona yambiro pfupi ichiinyaora.

---

### Simbisa {#verify}

- Pindura kumeseji ine zvinosungirirwa 1–2 uye simbisa kuti zvekutanga zvawedzerwa muhwindo rekunyora.
- Kuti ugadzirise maitiro, ona [Kumisikidza](configuration) (chinja chekusimbisa, mhinduro yakasarudzika, mapatani eblacklist).

---

### Simbisa yambiro ye blacklist {#verify-blacklist-warning}

- Pindura kumeseji ine faira rakaita se “secret.txt”.
- Kana “Warn if attachments are excluded by blacklist” yakabatidzwa, dialog diki inonyora mafaera abviswa uye patani inoenderana nawo.

Kana usingaoni yambiro, iva nechokwadi kuti patani inoenderana nezita refaira chaizvo (zita refaira chete, isingatarisire kukura kwemavara). Ona Configuration → Blacklist.

---

### Cherechedzo yekhibhodi {#keyboard-note}

- Hwindo rekusimbisa rinotsigira Y/J yeHongu uye N/Esc yeKwete. Pamakibhodhi asiri eLatin, makiyi emavara anogona kusiyana; Enter inosimbisa bhatani riri pafocus.

---
