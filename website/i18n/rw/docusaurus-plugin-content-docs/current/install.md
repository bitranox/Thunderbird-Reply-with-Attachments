---
id: install
title: 'Gushyiraho'
slug: /install
sidebar_label: 'Gushyiraho'
---

---

## Kwinjiza binyuze muri "Thunderbird Add‑ons and Themes" {#installation-in-thunderbird-recommended}

:::important Verisiyo Ntoya ya Thunderbird
Iyi nyongera ishyigikira Thunderbird **128 ESR cyangwa iyisumbuyeho**. Verisiyo za kera ntizishyigikiwe.
:::

Ubu ni bwo buryo busanzwe busabwa bwo kwinjiza. Inyongera zashyizweho zivuye kuri ATN (addons.thunderbird.net) zibona kuvugururwa byikora. Ibyinjizwa bya LOCAL/dev ntibivugururwa byikora.

- Verisiyo ntoya ya Thunderbird: 128 ESR cyangwa iyisumbuyeho.

1. Muri Thunderbird, jya kuri **Tools > Add-ons and Themes**.
2. Shakisha "reply with attachments".
3. Ongeramo iyo nyongera.

Cyangwa ufungure ipaji y’inyongera ako kanya: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kwinjiza ku buryo bw’intoki uhereye kuri XPI {#local-installation-in-thunderbird}

### Kuramo dosiye XPI {#download-the-xpi-file}

1. Jya kuri [ipaji y’inyongera ya Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Kuramo verisiyo nshya ya nyongera nka dosiye XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Shyira muri Thunderbird {#install-in-thunderbird-local}

1. Fungura Thunderbird.
2. Jya kuri **Tools > Add-ons and Themes**.
3. Muri **Add-ons Manager**, kanda agashusho k’imashini (gear) kari mu ruhande rw’iburyo hejuru.
4. Hitamo **Install Add-on From File…** muri menu.
5. Hitamo dosiye `reply_with_attachments-x.y.z-tb.xpi` wakuyemo.
6. Emeza iyinjizwamo ubisabwe.

---

## Kwinjiza ku bikorwa by’iterambere {#installation-for-development}

### Kuramo ububiko (repository) {#download-the-repository}

1. Kuramo verisiyo nshya y’ububiko bwa GitHub.
2. Kora `make help` kugira ngo ubone andi makuru.

### Shyira muri Thunderbird {#install-in-thunderbird-dev}

1. Fungura Thunderbird.
2. Jya kuri **Tools > Add-ons and Themes**.
3. Muri **Add-ons Manager**, kanda agashusho k’imashini (gear) kari mu ruhande rw’iburyo hejuru.
4. Hitamo **Install Add-on From File…** muri menu.
5. Hitamo dosiye yakozwe `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Emeza iyinjizwamo ubisabwe.

Icyitonderwa: Niba Thunderbird itemera `.zip` kuri sisitemu yawe, yihindurire izina rikaba `.xpi` hanyuma wongere ugerageze “Install Add‑on From File…”.

### Aho wabonera LOCAL ZIP {#where-local-zip}

- Banza upakire inyongera: kora `make pack` mu mizi y’ububiko.
- Nyuma yo gupakira, shaka “LOCAL” zip mu mizi y’ububiko (urugero, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Mbere yo kongera gupakira ku rwego rwo gupima, zamura nimero za verisiyo muri byombi `sources/manifest_ATN.json` na `sources/manifest_LOCAL.json`.

---

## Kuzimya, Gukuraho, no Kuvugurura {#disable-uninstall-updates}

- Kuzimya: Thunderbird → Tools → Add‑ons and Themes → shaka inyongera → uyizime (toggle off).
- Gukuraho: aho hahoze → menu y’ududomo dutatu → Remove.
- Kuvugurura: ibivuye kuri ATN bivuguruka byikora igihe verisiyo nshya zemejwe. Ibyinjizwa bya LOCAL/dev ntibivuguruka byikora; ongera wiyishyirireho kubaka gishya cya LOCAL ku buryo bw’intoki.
- Gukuraho igenamiterere burundu: reba [Privacy → Data removal](privacy#data-removal).

Reba kandi

- [Gutangira byihuse](quickstart)
