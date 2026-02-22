---
id: install
title: 'Usakinishaji'
slug: /install
sidebar_label: 'Usakinishaji'
---

---

## Usakinishaji kupitia "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Toleo la Chini la Thunderbird
Kiongezi hiki kinaauni Thunderbird **128 ESR au mpya zaidi**. Matoleo ya zamani hayaungiwi mkono.
:::

Hii ndiyo njia iliyopendekezwa ya usakinishaji. Viongezi vilivyosakinishwa kutoka ATN (addons.thunderbird.net) hupokea masasisho ya kiotomatiki. Usakinishaji wa LOCAL/dev hausasishi kiotomatiki.

- Toleo la chini la Thunderbird: 128 ESR au mpya zaidi.

1. Ndani ya Thunderbird, nenda kwenye **Tools > Add-ons and Themes**.
2. Tafuta "reply with attachments".
3. Ongeza kiongezi.

Au fungua ukurasa wa kiongezi moja kwa moja: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Usakinishaji kwa mkono kutoka XPI {#local-installation-in-thunderbird}

### Pakua faili ya XPI {#download-the-xpi-file}

1. Nenda kwenye [ukurasa wa Kiongezi cha Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Pakua toleo jipya zaidi la kiongezi kama faili ya XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Sakinisha ndani ya Thunderbird {#install-in-thunderbird-local}

1. Fungua Thunderbird.
2. Nenda kwenye **Tools > Add-ons and Themes**.
3. Ndani ya **Add-ons Manager**, bofya ikoni ya gia kwenye kona ya juu kulia.
4. Chagua **Install Add-on From File…** kutoka kwenye menyu.
5. Chagua faili ya `reply_with_attachments-x.y.z-tb.xpi` uliyopakua.
6. Thibitisha usakinishaji unapoulizwa.

---

## Usakinishaji kwa ukuzaji {#installation-for-development}

### Pakua hazina {#download-the-repository}

1. Pakua toleo jipya zaidi la hazina ya GitHub.
2. Endesha `make help` kwa maelezo zaidi.

### Sakinisha ndani ya Thunderbird {#install-in-thunderbird-dev}

1. Fungua Thunderbird.
2. Nenda kwenye **Tools > Add-ons and Themes**.
3. Ndani ya **Add-ons Manager**, bofya ikoni ya gia kwenye kona ya juu kulia.
4. Chagua **Install Add-on From File…** kutoka kwenye menyu.
5. Chagua faili `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` iliyozalishwa.
6. Thibitisha usakinishaji unapoulizwa.

Kumbuka: Ikiwa Thunderbird haitakubali `.zip` kwenye mfumo wako, libadilishe jina kuwa `.xpi` na ujaribu “Install Add‑on From File…” tena.

### Mahali pa kupata ZIP ya LOCAL {#where-local-zip}

- Kwanza, funga (package) kiongezi: endesha `make pack` katika mzizi wa hazina.
- Baada ya kufunga, pata zip ya “LOCAL” katika mzizi wa hazina (km., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Kabla ya kufunga upya kwa ajili ya majaribio, ongeza nambari za matoleo katika `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json`.

---

## Lemaza, Ondoa, na Masasisho {#disable-uninstall-updates}

- Lemaza: Thunderbird → Tools → Add‑ons and Themes → pata kiongezi → zima.
- Ondoa: mwonekano huo huo → menyu ya nukta tatu → Remove.
- Masasisho: Usakinishaji kutoka ATN husasisha kiotomatiki wakati matoleo mapya yanaidhinishwa. Usakinishaji wa LOCAL/dev hausasishi kiotomatiki; sakinisha tena kwa mkono toleo jipya la LOCAL.
- Ondoa mipangilio kabisa: tazama [Faragha → Uondoaji wa data](privacy#data-removal).

Tazama pia

- [Kuanza haraka](quickstart)
