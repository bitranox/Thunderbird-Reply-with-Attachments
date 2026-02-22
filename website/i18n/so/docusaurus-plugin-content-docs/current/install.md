---
id: install
title: 'Rakibid'
slug: /install
sidebar_label: 'Rakibid'
---

---

## Rakibid adigoo adeegsanaya "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Nooca ugu yar ee Thunderbird
Kordhintani waxay taageertaa Thunderbird **128 ESR ama ka cusub**. Noocyadii hore lama taageero.
:::

Tani waa habka rakibidda ee lagu taliyey. Kordhinnada laga rakibo ATN (addons.thunderbird.net) waxay helaan cusboonaysiin otomaatig ah. Rakibaadaha LOCAL/dev si toos ah uma cusboonaysiiyaan.

- Nooca ugu yaraan ee Thunderbird: 128 ESR ama ka cusub.

1. Gudaha Thunderbird, tag **Tools > Add-ons and Themes**.
2. Raadi "reply with attachments".
3. Ku dar kordhinta.

Ama si toos ah u fur bogga kordhinta: [Kordhinnada Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Rakibid gacanta ah oo ka timid XPI {#local-installation-in-thunderbird}

### Soo deji faylka XPI {#download-the-xpi-file}

1. Aad [bogga kordhinta Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Soo deji nooca ugu dambeeya ee kordhinta sidii fayl XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Ku rakib gudaha Thunderbird {#install-in-thunderbird-local}

1. Furo Thunderbird.
2. Tag **Tools > Add-ons and Themes**.
3. Gudaha **Add-ons Manager**-ka, guji astaanta qalabka ee geeska midig kore.
4. Dooro **Install Add-on From File…** liiska.
5. Dooro faylka `reply_with_attachments-x.y.z-tb.xpi` ee la soo dejiyey.
6. Xaqiiji rakibidda marka lagugu wargeliyo.

---

## Rakibid loogu talagalay horumarinta {#installation-for-development}

### Soo deji kaydka {#download-the-repository}

1. Soo deji nooca ugu dambeeya ee kaydka GitHub.
2. Orod `make help` si aad u hesho macluumaad dheeraad ah.

### Ku rakib gudaha Thunderbird {#install-in-thunderbird-dev}

1. Furo Thunderbird.
2. Tag **Tools > Add-ons and Themes**.
3. Gudaha **Add-ons Manager**-ka, guji astaanta qalabka ee geeska midig kore.
4. Dooro **Install Add-on From File…** liiska.
5. Dooro faylka la soo saaray `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Xaqiiji rakibidda marka lagugu wargeliyo.

Fiiro gaar ah: Haddii Thunderbird uusan aqbalin `.zip` nidaamkaaga, u baddel magaciisa `.xpi` oo mar kale isku day “Install Add‑on From File…”.

### Halka laga helo LOCAL ZIP {#where-local-zip}

- Marka hore, samee xirmada kordhinta: orod `make pack` xididka kaydka.
- Ka dib xirxiridda, ka hel zip-ka “LOCAL” xididka kaydka (tusaale, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Ka hor inta aan dib loogu xirxirin tijaabinta, kor u qaad noocyada labadaba `sources/manifest_ATN.json` iyo `sources/manifest_LOCAL.json`.

---

## Demin, Ka saarid, iyo Cusboonaysiin {#disable-uninstall-updates}

- Demi: Thunderbird → Tools → Add‑ons and Themes → hel kordhinta → u rogo dami.
- Ka saar: isla aragtida → liiska saddex‑dhibcood → Remove.
- Cusboonaysiin: Rakibaadaha ATN waxay helaan cusboonaysiin otomaatig ah marka noocyo cusub la ansixiyo. Rakibaadaha LOCAL/dev si otomaatig ah uma cusboonaysiiyaan; si gacanta ah u rakib dhisid LOCAL cusub.
- Ka saar dejimaha gebi ahaan: eeg [Asturnaanta → Tirtirka xogta](privacy#data-removal).

Sidoo kale eeg

- [Bilow degdeg ah](quickstart)
