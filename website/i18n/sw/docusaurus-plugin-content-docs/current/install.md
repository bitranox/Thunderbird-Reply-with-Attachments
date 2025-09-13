---
id: install
title: 'Usanidi'
slug: /install
sidebar_label: 'Usanidi'
---

## Usanidi kupitia "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Toa Minimum ya Thunderbird
Add‑on hii inasaidia Thunderbird **128 ESR au toleo jipya zaidi**. Matoleo ya zamani hayasaidiwi.
:::

Huu ndio mtindo uliopendekezwa wa usanidi. Add‑ons zilizosakinishwa kutoka ATN (addons.thunderbird.net) hupokea sasisho za moja kwa moja. Usanidi wa LOCAL/dev haujisasishi kiotomatiki.

- Toleo la chini la Thunderbird: 128 ESR au toleo jipya zaidi.

1. Katika Thunderbird, nenda kwenye **Zana > Add-ons na Mada**.
2. Tafuta "jibu na viambatisho".
3. Ongeza add-on.

Au fungua ukurasa wa add‑on moja kwa moja: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Usanidi wa mikono kutoka XPI {#local-installation-in-thunderbird}

### Pakua faili la XPI {#download-the-xpi-file}

1. Nenda kwenye [Ukurasa wa Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Pakua toleo jipya zaidi la add-on kama faili la XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Sakinisha katika Thunderbird {#install-in-thunderbird-local}

1. Fungua Thunderbird.
2. Nenda kwenye **Zana > Add-ons na Mada**.
3. Katika **Meneja wa Add-ons**, bonyeza ikoni ya gear katika kona ya juu kulia.
4. Chagua **Sakinisha Add-on Kutoka Faili…** kutoka kwenye menyu.
5. Chagua faili iliyo pakuliwa `reply_with_attachments-x.y.z-tb.xpi`.
6. Thibitisha usanidi unapoulizwa.

---

## Usanidi kwa ajili ya maendeleo {#installation-for-development}

### Pakua hifadhi {#download-the-repository}

1. Pakua toleo jipya zaidi la hifadhi ya GitHub.
2. Endesha `make help` kwa maelezo zaidi.

### Sakinisha katika Thunderbird {#install-in-thunderbird-dev}

1. Fungua Thunderbird.
2. Nenda kwenye **Zana > Add-ons na Mada**.
3. Katika **Meneja wa Add-ons**, bonyeza ikoni ya gear katika kona ya juu kulia.
4. Chagua **Sakinisha Add-on Kutoka Faili…** kutoka kwenye menyu.
5. Chagua faili iliyotengenezwa `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Thibitisha usanidi unapoulizwa.

Kumbuka: Ikiwa Thunderbird haitakubali `.zip` kwenye mfumo wako, badilisha jina kuwa `.xpi` na jaribu "Sakinisha Add‑on Kutoka Faili…" tena.

### Mahali pa kupatikana kwa LOCAL ZIP {#where-local-zip}

- Kwanza, pakiti add‑on: endesha `make pack` katika mizizi ya hifadhi.
- Baada ya kupakia, pata "LOCAL" zip katika mizizi ya hifadhi (k.m., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Kabla ya kupakia tena kwa ajili ya kupima, pandisha toleo katika `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json`.

---

## Zima, Ondoa, na Sasisho {#disable-uninstall-updates}

- Zima: Thunderbird → Zana → Add‑ons na Mada → pata add‑on → geuza off.
- Ondoa: mtazamo sawa → menyu ya alama tatu → Ondoa.
- Sasisho: Usanidi wa ATN unajisasaisha kiotomatiki unapopatikana matoleo mapya. Usanidi wa LOCAL/dev haujisasishi kiotomatiki; weka tena usanidi mpya wa LOCAL kwa mikono.
- Ondoa mipangilio kabisa: angalia [Faragha → Kuondoa data](privacy#data-removal).

Tazama pia

- [Mwongozo wa Haraka](quickstart)
