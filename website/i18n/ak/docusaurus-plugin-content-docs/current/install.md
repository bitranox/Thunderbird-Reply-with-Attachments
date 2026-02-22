---
id: install
title: 'Instɔlehyɛn'
slug: /install
sidebar_label: 'Instɔlehyɛ'
---

---

## Instɔlehyɛn fa "Thunderbird Add-ons and Themes" so {#installation-in-thunderbird-recommended}

:::important Thunderbird vɛɛhyɛn ketewa koraa a ɛsɛ
Nkaho yi sɔ Thunderbird **128 ESR anaa nea ɛto so foforo**. Vɛɛhyɛn dada no nni mmoa.
:::

Kwan yi ne instɔlehyɛn a wɔhyɛ so pa. Nkaho a wɔinstɔl firi ATN (addons.thunderbird.net) no nya ntosoɔ otomatik. LOCAL/dev instɔlehyɛn no nnya ntosoɔ otomatik.

- Thunderbird vɛɛhyɛn ketewa koraa a ɛsɛ: 128 ESR anaa nea ɛto so foforo.

1. Wɔ Thunderbird mu, kɔ **Tools > Add-ons and Themes**.
2. Hwehwɛ "reply with attachments".
3. Instɔl nkaho no.

Anaa bue nkaho krataafa no pɛ: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instɔlehyɛn nsam firi XPI {#local-installation-in-thunderbird}

### Twe XPI fael no {#download-the-xpi-file}

1. Kɔ [Thunderbird Add‑on krataafa](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Twe vɛɛhyɛn foforɔ koraa a ɛwɔ hɔ no sɛ XPI fael (`reply_with_attachments-x.y.z-tb.xpi`).

### Instɔl wɔ Thunderbird mu {#install-in-thunderbird-local}

1. Bue Thunderbird.
2. Kɔ **Tools > Add-ons and Themes**.
3. Wɔ **Add-ons Manager** no mu, klik ɛkɔn gear no wɔ atifi nifa.
4. Paw **Install Add-on From File…** firi menyu no mu.
5. Paw fael `reply_with_attachments-x.y.z-tb.xpi` a woatwe no.
6. Gye instɔlehyɛn no tom sɛ wɔbisa wo.

---

## Instɔlehyɛn ama develepmɛnt {#installation-for-development}

### Twe repɔzitiri no {#download-the-repository}

1. Twe GitHub repɔzitiri no vɛɛhyɛn foforɔ koraa.
2. Hyɛ `make help` na nya nsɛm bio.

### Instɔl wɔ Thunderbird mu {#install-in-thunderbird-dev}

1. Bue Thunderbird.
2. Kɔ **Tools > Add-ons and Themes**.
3. Wɔ **Add-ons Manager** no mu, klik ɛkɔn gear no wɔ atifi nifa.
4. Paw **Install Add-on From File…** firi menyu no mu.
5. Paw fael a wɔayɛ `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip` no.
6. Gye instɔlehyɛn no tom sɛ wɔbisa wo.

Kae: Sɛ Thunderbird nnye `.zip` no tom wɔ wo sistem no so a, sesa ne din kɔ `.xpi` na san sɔ “Install Add‑on From File…” bio.

### Ɛhe na wobɛhunu LOCAL ZIP no {#where-local-zip}

- Kan no, pakete nkaho no: hyɛ `make pack` wɔ repɔzitiri root no mu.
- Ekyiri a wopaketee no, hu “LOCAL” zip no wɔ repɔzitiri root no mu (sɛso, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Ansana wobɛsan apakete ama asɔdwuma, ma vɛɛhyɛn no kɔ soro wɔ `sources/manifest_ATN.json` ne `sources/manifest_LOCAL.json` mu nyinaa.

---

## Dum, Yi, ne Ntosoɔ {#disable-uninstall-updates}

- Dum: Thunderbird → Tools → Add‑ons and Themes → hwehwɛ nkaho no → tɔgl no kɔ off.
- Yi instɔlehyɛn: nhwɛbea koro no ara → menyu dɔt‑mmiɛnsa → Remove.
- Ntosoɔ: Bere a vɛɛhyɛn foforo agye atom no, ATN instɔlehyɛn no yɛ ntosoɔ otomatik. LOCAL/dev instɔlehyɛn no nnya ntosoɔ otomatik; instɔl LOCAL build foforo nsam.
- Yi nhyehyɛe koraa nyinaa: hwɛ [Privacy → Data removal](privacy#data-removal).

Hwɛ nso

- [Mfiase ntɛm-ntɛm](quickstart)
