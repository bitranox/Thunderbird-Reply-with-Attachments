---
id: install
title: 'Nsɛm a ɛda ho adi'
slug: /install
sidebar_label: 'Nsɛm a ɛda ho adi'
---

## Nsɛm a ɛda ho adi via "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Nsɛm a ɛda ho adi a ɛyɛ abatoɔ
Ɛyɛ a ɛbɔ ho ban no, add‑on yi yɛ adwuma ne Thunderbird **128 ESR anaa foforɔ**. Nkyɛn adwuma a ɛda ho adi no nyɛ.
:::

Ɛyɛ nsɛm a ɛda ho adi a ɛyɛ a ɛbɔ ho ban. Add‑ons a wɔde fi ATN (addons.thunderbird.net) mu bɛyɛ nkyerɛkyerɛ. LOCAL/dev installations nsɛe a wɔyɛ nsɛm a ɛda ho adi.

- Nsɛm a ɛda ho adi a ɛyɛ abatoɔ: 128 ESR anaa foforɔ.

1. Kɔ Thunderbird mu, kɔ **Nkyɛn > Add-ons ne Themes**.
2. Hwehwɛ "ka nsɛm a ɛda ho adi" no.
3. Fa add-on no ka ho.

Anaa kɔ add-on no krataa no mu: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Nsɛm a ɛda ho adi fi XPI {#local-installation-in-thunderbird}

### Kan XPI file no {#download-the-xpi-file}

1. Kɔ [Thunderbird Add‑on krataa](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Kan add-on no a ɛyɛ foforɔ sɛ XPI file (`reply_with_attachments-x.y.z-tb.xpi`).

### Si mu wɔ Thunderbird {#install-in-thunderbird-local}

1. Bue Thunderbird.
2. Kɔ **Nkyɛn > Add-ons ne Themes**.
3. Wɔ **Add-ons Manager** mu, to gear icon no a ɛda atifi nifa so.
4. Pɛ **Install Add-on Fi File…** fi menu no mu.
5. Pɛ `reply_with_attachments-x.y.z-tb.xpi` file a wofrɛ no.
6. Pɛ srɛ a ɛba no mu.

---

## Nsɛm a ɛda ho adi ma nkɔso {#installation-for-development}

### Kan nkitahodie no {#download-the-repository}

1. Kan GitHub nkitahodie no a ɛyɛ foforɔ.
2. Dɔ `make help` na hu nsɛm a ɛda ho adi.

### Si mu wɔ Thunderbird {#install-in-thunderbird-dev}

1. Bue Thunderbird.
2. Kɔ **Nkyɛn > Add-ons ne Themes**.
3. Wɔ **Add-ons Manager** mu, to gear icon no a ɛda atifi nifa so.
4. Pɛ **Install Add-on Fi File…** fi menu no mu.
5. Pɛ nsɛm a wɔyɛ de hyɛ mu `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Pɛ srɛ a ɛba no mu.

Nsɛm: Sɛ Thunderbird mfa `.zip` a ɛda wo sistem no so a, yɛ nkyɛn kɔ `.xpi` na srɛ “Install Add‑on Fi File…” bio.

### Ɛhe na wubetumi anya LOCAL ZIP {#where-local-zip}

- Ɛyɛ a, fa add‑on no to mu: dɔ `make pack` wɔ nkitahodie no mũ.
- Afei, hu “LOCAL” zip no wɔ nkitahodie no mũ (sɛ `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Ansa na woakɔ so ayɛ packaging foforɔ de bɛhyɛ nwoma a ɛda ho adi mu, ratwe version no mppɛn `sources/manifest_ATN.json` ne `sources/manifest_LOCAL.json`.

---

## Pɛn, Yi, ne Nkyerɛkyerɛ {#disable-uninstall-updates}

- Pɛn: Thunderbird → Nkyɛn → Add‑ons ne Themes → hu add‑on no → pɛn no.
- Yi: saa nhyehyɛ no mu → nsateaa mmerɛ ne abɔdin → Paw.
- Nkyerɛkyerɛ: ATN installations bɛyɛ nkyerɛkyerɛ a ɛda ho adi no mu sɛ wɔn mu yɛ foforɔ na wɔapaw. LOCAL/dev installations nsɛe a wɔyɛ nkyerɛkyerɛ; san di LOCAL foforɔ no yɛ.

- Yi nsɛm a ɛda ho adi nyinaa: hwɛ [Privacy → Data removal](privacy#data-removal).

Hu mpo

- [Ntɛm papa](quickstart)
