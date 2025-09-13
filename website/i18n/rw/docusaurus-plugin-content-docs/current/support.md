---
id: support
title: 'Inkunga'
sidebar_label: 'Inkunga'
---

## FAQ {#faq}

### Amadosiye ntabwo yongerewe — kuki?

- Amafoto y'imbere n'ibice bya S/MIME birabujijwe ku intentionally.
- Amazina y'inyandiko yikubye agerwaho igihe compose ifite nyirubwite.
- Icyihugurwa gishobora gukuramo abahatanira; reba [Configuration](configuration#blacklist-glob-patterns).

### Mbese nshobora kwemeza mbere yo kongeramo amadosiye?

Yego. Shyira “Saba mbere yo kongeramo amadosiye” munsi ya [Configuration → Confirmation](configuration#confirmation). Ikibaho: Y/J = Yego, N/Esc = Oya.

### Ese inyongeramusaruro itanga amakuru cyangwa ikurikirana ikoreshwa?

Oya. Reba [Privacy](privacy) — nta telemetry n'amakuru yo mu mwanya w'inyuma.

### Forward ntabwo yongeramo amadosiye — ese birakwiye?

Yego. Ni Reply na Reply byose bifashwa n'iyi nyongeramusaruro; Forward ntihindurwa. Reba [Limitations](usage#limitations).

### Aho ni hehe haturuka Donate snooze?

Amahitamo → Igice cy'Inkunga. Reba [Donation Visibility](configuration#donation-visibility).

---

## Inkunga

Ukeneye ubufasha cyangwa ushaka gutanga raporo ku kibazo?

---

### Fungura ikibazo kuri GitHub:

- Repository: `bitranox/Thunderbird-Reply-with-Attachments`
- Ibibazo: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Shyiramo izina ry'inyandiko ya Thunderbird (nka, 128 ESR), OS, n'intambwe zo kongera
- Ongeramo amakuru y'ingenzi ava muri Console y'Amakosa ya Thunderbird (Ibikoresho → Ibikoresho by'Iterambere → Console y'Amakosa)

- Urubuga rw'inyongeramusaruro (ATN): Urashobora no gutanga ibitekerezo binyuze ku [paji y'inyongeramusaruro](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Inama

- Menya neza ko uri kuri version ya Thunderbird ikwiranye (128 ESR cyangwa iruta).
- Reba inyandiko za Configuration na Usage ku bibazo bisanzwe by'imiterere.
- Kubijyanye n'iterambere/gusuzuma, reba umwitozo w'Iterambere.
- Niba imiterere yabikwa itagaragaza neza, tangira Thunderbird ugerageze nanone. (Thunderbird ishobora gukuramo ipfundo mu myaka itandukanye; gutangiza biremeza ko ibijyanye n'ibipimo bisohoka.)
- Minimal repro: gerageza na email ntoya irimo amadosiye abiri cyangwa abiri yoroshye.
- Gereranya imyitwarire y'ibibazo ON vs. OFF kugirango umenye niba igikorwa cy'ikiganiro gikunze kumwe.

---

### Ibyo ugomba gushyira mu itangazo

- Version ya Thunderbird n'OS
- Intambwe nyayo zo kongera (icyo wakoresheje, icyo wategereje, icyo byagenze)
- Ese kwemeza byari bimaze kugerwaho na setting yawe y'ibisubizo
- Urugero rw'amasano yawe y'icyihugurwa (niba bikenewe)
- Logs za Console y'Amakosa mu gihe ugerageza (Ibikoresho → Ibikoresho by'Iterambere → Console y'Amakosa)
- Shyira mu bikorwa logging itari ngombwa (ku itegeko):
  - Koresha mu Console y'Amakosa ya Thunderbird: `messenger.storage.local.set({ debug: true })`
  - Kuramo ikibazo kandi uyungurure umurongo w'amakuru `[RWA]` ajyanye

---

### Template y'ikibazo (copa/komeza) {#issue-template}

- Version ya Thunderbird n'OS:
- Intambwe zo kongera:
- Kwemezwa? Igisubizo kisanzwe:
- Urugero rw'ibyihugurwa:
- Logs za Console y'Amakosa (Ibikoresho → Ibikoresho by'Iterambere → Console y'Amakosa):
- Ikindi kintu cyose gifite akamaro:

---

### Donate

Niba ushaka gushyigikira uyu mushinga, nyamuneka fasha igishoro gito ku [Donate](donation) paji. Murakoze!
