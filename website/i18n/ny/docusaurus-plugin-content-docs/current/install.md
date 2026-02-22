---
id: install
title: 'Kuyika'
slug: /install
sidebar_label: 'Kuyika'
---

---

## Kuyika pogwiritsa ntchito "Thunderbird Add-ons and Themes" {#installation-in-thunderbird-recommended}

:::important Mtundu wa Thunderbird wochepera
Chowonjezera ichi chimathandiza Thunderbird **128 ESR kapena yaposachedwapo**. Mitundu yakale sikuthandizidwa.
:::

Iyi ndi njira yolimbikitsidwa yoyikira. Zowonjezera zomwe zayikidwa kuchokera ku ATN (addons.thunderbird.net) zimapeza zosintha zokha. Zoyika za LOCAL/dev sizimasinthika zokha.

- Mtundu wochepera wa Thunderbird: 128 ESR kapena wapamwamba kuposa apo.

1. Mu Thunderbird, pitani ku **Tools > Add-ons and Themes**.
2. Fufuzani za "reply with attachments".
3. Onjezani chowonjezera.

Kapena tsegulani tsamba la chowonjezera mwachindunji: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Kuyika pamanja kuchokera ku XPI {#local-installation-in-thunderbird}

### Tsitsani fayilo ya XPI {#download-the-xpi-file}

1. Pitani ku [tsamba la Thunderbird Add‑on](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Tsitsani mtundu waposachedwa wa chowonjezera ngati fayilo ya XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Yikani mu Thunderbird {#install-in-thunderbird-local}

1. Tsegulani Thunderbird.
2. Pitani ku **Tools > Add-ons and Themes**.
3. Mu **Add-ons Manager**, dinani chizindikiro cha giya pakona yakumanja pamwamba.
4. Sankhani **Install Add-on From File…** kuchokera mu menyu.
5. Sankhani fayilo ya `reply_with_attachments-x.y.z-tb.xpi` yomwe mudatsitsa.
6. Tsimikizani kuyika mukafunsidwa.

---

## Kuyika pa chitukuko {#installation-for-development}

### Tsitsani repositori {#download-the-repository}

1. Tsitsani mtundu waposachedwa wa repositori ya GitHub.
2. Yendetsani `make help` kuti mupeze zambiri.

### Yikani mu Thunderbird {#install-in-thunderbird-dev}

1. Tsegulani Thunderbird.
2. Pitani ku **Tools > Add-ons and Themes**.
3. Mu **Add-ons Manager**, dinani chizindikiro cha giya pakona yakumanja pamwamba.
4. Sankhani **Install Add-on From File…** kuchokera mu menyu.
5. Sankhani fayilo yopangidwa `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Tsimikizani kuyika mukafunsidwa.

Zindikirani: Ngati Thunderbird sivilandira `.zip` pa dongosolo lanu, musinthe dzina lake kukhala `.xpi` ndiyeno yesaninso “Install Add‑on From File…”.

### Komwe mungapeze LOCAL ZIP {#where-local-zip}

- Choyamba, phakirani chowonjezera: yendetsani `make pack` pa mizu ya repositori.
- Mukamaliza kupakira, pezani zip ya “LOCAL” pa mizu ya repositori (mwachitsanzo, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Musanapakirenso poyesera, wonjezerani manambala a mitundu mu `sources/manifest_ATN.json` komanso `sources/manifest_LOCAL.json`.

---

## Kuzimitsa, Kuchotsa, ndi Zosintha {#disable-uninstall-updates}

- Zimitsani: Thunderbird → **Tools** → **Add‑ons and Themes** → pezani chowonjezera → zimitsani.
- Chotsani (uninstall): kuonera komweko → menyu ya madontho atatu → Remove.
- Zosintha: Zoyika kuchokera ku ATN zimakhala ndi kusintha zokha zikavomerezedwa mitundu yatsopano. Zoyika za LOCAL/dev sizimasinthika zokha; ikani kachiwiri kumanga kwa LOCAL pamanja.
- Chotsani zoikamo kwathunthu: onani [Zinsinsi → Kuchotsa deta](privacy#data-removal).

Onaninso

- [Kuyamba mwachangu](quickstart)
