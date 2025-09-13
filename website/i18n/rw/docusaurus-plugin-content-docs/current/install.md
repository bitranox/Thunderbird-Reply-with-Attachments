---
id: install
title: 'Kwinjiza'
slug: /install
sidebar_label: 'Kwinjiza'
---

## Kwinjiza binyuze muri "Thunderbird Add-ons na Themes" {#installation-in-thunderbird-recommended}

:::important Icyitonderwa: Uburyo bwa Thunderbird Bwinshi
Uyu mwunguko ushyigikiye Thunderbird **128 ESR cyangwa ubundi**. Uburyo bwashize ntibushyigikiwe.
:::

Ubu ni bwo buryo bwiza bwo kwinjiza. Abakoresha bashyizweho kuri ATN (addons.thunderbird.net) babona amakuru y’ibihinduka ataziguye. LOCAL/dev installs ntibikora ibihinduka byikora.

- Uburyo bwa Thunderbird bukeneye: 128 ESR cyangwa ubundi.

1. Mu Thunderbird, jya kuri **Ibikoresho > Imiyoboro na Themes**.
2. Shaka "subiza hamwe n'inyandiko zifitanye isano".
3. Shyiramo uwiyongera.

Cyangwa fungura urupapuro rw'uwiyongera byihuse: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kwinjiza intoki hifashishijwe XPI {#local-installation-in-thunderbird}

### Downloads file ya XPI {#download-the-xpi-file}

1. Jya ku [Urupapuro rw'uwiyongera rwa Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Download version nshya y'uwiyongera nka file ya XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Kwinjiza muri Thunderbird {#install-in-thunderbird-local}

1. Fungura Thunderbird.
2. Jya kuri **Ibikoresho > Imiyoboro na Themes**.
3. Mu **Umuyobozi w'Imiyoboro**, kanda ku ishusho y'udufaru mu gice cyo hejuru iburyo.
4. Hitamo **Kwinjiza Uwiyongera Ukoresheje File…** mu menu.
5. Hitamo file ya `reply_with_attachments-x.y.z-tb.xpi` washyizeho.
6. Emeza kwinjiza igihe ubisabwe.

---

## Kwinjiza ku mpamvu y'iterambere {#installation-for-development}

### Downloads repository {#download-the-repository}

1. Download version nshya ya repository ya GitHub.
2. Run `make help` kugira ngo ubone amakuru arambuye.

### Kwinjiza muri Thunderbird {#install-in-thunderbird-dev}

1. Fungura Thunderbird.
2. Jya kuri **Ibikoresho > Imiyoboro na Themes**.
3. Mu **Umuyobozi w'Imiyoboro**, kanda ku ishusho y'udufaru mu gice cyo hejuru iburyo.
4. Hitamo **Kwinjiza Uwiyongera Ukoresheje File…** mu menu.
5. Hitamo file yakuweho `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Emeza kwinjiza igihe ubisabwe.

Icyitonderwa: Niba Thunderbird itakiriye `.zip` mu bushobozi bwawe, hindura izina ribe `.xpi` hanyuma wongere ugerageze "Kwinjiza Uwiyongera Ukoresheje File…" ukundi.

### Aho wakura LOCAL ZIP {#where-local-zip}

- Kuva, pacote uwiyongera: run `make pack` mu mutwe wa repository.
- Nyuma yo gushyiranya, shaka "LOCAL" zip mu mutwe wa repository (nk'uko, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Mbere yo gusubiramo kugirango utangire kugerageza, koresha version zose mu `sources/manifest_ATN.json` no mu `sources/manifest_LOCAL.json`.

---

## Guhagarika, Guhanagura, na Updates {#disable-uninstall-updates}

- Guhagarika: Thunderbird → Ibikoresho → Imiyoboro na Themes → shaka uwiyongera → guhinduranya.
- Guhanagura: mu ishusho imwe → menu ya ongeramo → Gukuraho.
- Updates: ATN installs ikora ibihinduka byikora igihe versions nshya zemewe. LOCAL/dev installs ntibikora ibihinduka byikora; subiramo kubaka LOCAL nshya ku buryo bwawe.
- Kuramo settings byuzuye: reba [Ibanga → Gukuraho amakuru](privacy#data-removal).

Reba kandi

- [Gahunda yihuse](quickstart)
