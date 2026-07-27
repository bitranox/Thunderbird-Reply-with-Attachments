---
id: usage
title: 'Ruwanapaq'
sidebar_label: 'Apnaqay'
---

---

## Llamk'apuynin {#usage}

- Kutichispa, add-on nisqaqa originalkuna-ta automaticamente churamun — utaq ñawpaqtaq tapunman, chayqa “Options” nisqapi aktivasqa kaptin.
- Fichirop sutinman hina iskayta hurquspa churakun; S/MIME kaqkuna llapallanpi saqinakun. Ñawpaq willakuypi chaskisqa rimayninpi imagenkuna kutichiy simi ukhupi qhipakullanku, maypichus Thunderbird churan, chaymanta mana copyakunchu fichi hina.
- Blacklist nisqaman yapasqakunaqa chaynallataq pasachikun (mayúscula/minúscula mana ch'ullanchasqa glob patrónkunawan sutimanta sutinmanta, mana thakimanta). Qhawariy [Configuration](configuration#blacklist-glob-patterns).

---

### Imayna ruwakun kutichispa {#what-happens}

- Kutichiyta tarina → ñawpaq yapasqakunata qillqana → S/MIME-ta yaqarisqa imagenkunatawan pasachina → akllasqa hunt'achina → allin kaq archivokunata yapana (kaqllakunata pasachispa).

| Parte laya                                              | Kutichiyman copyakunchu |
|---------------------------------------------------------|------------------------:|
| S/MIME firma fichi `smime.p7s`                          | Manam                   |
| S/MIME MIME laykuna (`application/pkcs7-*`)             | Manam                   |
| Willakuy ukhu `cid:` nisqawan churasqa imagen           | Manam (ukhupi kashan)   |
| `Content-Disposition: inline` nisqawan señalasqa imagen | Manam (ukhupi kashan)   |
| `Content-ID` nisqayuq imagen, mana ukhupi rikuchisqa    | Arí                     |
| Sutiyuq willakuy khipusqa (`message/rfc822`)            | Arí                     |
| Sutiyuq fichi khipusqa normal                           | Arí                     |

Huk imagen ukhupi churasqa nispa yupachikun manaqa ñawpaq willakuy chaninta rikuchiptillan, otaq apachiq sut'illa
`Content-Disposition: inline` nispa señalaptillan. Sapallan `Content-ID` uma qillqa manam sufishinchu: askha mail
cliente-kuna kaytaqa sapa imagen partepi churanku, cheqaq khipusqakunapipas, chaykunata copyanapaq kanraq.

---

### T'iksuy‑yuyaychasqa {#cross-reference}

- Qhatiy (Forward)qa mana hukninchayniyuqmi, chay hinalla (qhawariy qhipapi Limitations).
- Imaraykutaq qipaskuna mana yapasqa kanman, qhawariy “Imaraykutaq qipaskuna mana yapasqa kanman”.

---

## Ruraykunap imayñinkuna {#behavior-details}

- Duplicitad‑mana‑kachay: Add‑on nisqa tab de redactar‑ta procesado hina markan, tab‑sapa sesion valorniyuqmi ch'usayninpi guard‑wan. Mana iskay kutita originalkunata yapachkanchu.
- Qillqay ventana wisq'asqa chaymanta musuqta kichaspaqa musuq tab hina qhawan (ichaqa, musuq yapay atikun).
- Yaqa qipaskunata yuyamuy: Qillqaypimaymi qipaskuna kachkaptinpas, originalkunata hukniraqmi sapa kuti sapallan yapakun, kikin sutiyuqkunaqa saqispa.
- Qharquysqa: S/MIME rurasqakuna hinallataq inline imágenkunam archivo qipaskunamanta qharqun. Ñawpaq pasiq mana imapas allin kaptin, qasiyapaq qhipa‑pasita ruwaspa S/MIME mana kasqakunata wakmanta qhawan. Inline imágenkunataqa hukninchalla kamachimusqa: kutichiy ukhunpi data URI‑kuna hina kutichikun (aktivasqa kaptin).
  - Sutinikuna: `smime.p7s`
  - MIME tipos: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Inline imágenkuna: Content‑ID‑wan willakuchisqa `image/*` imaymana part — archivo qipaskunamanta qharqusqam, ichaqa kutichiy ukhunpi incrustasqa “Include inline pictures” ON kaptin
  - Qipaq e‑mail‑kuna (`message/rfc822`): sutiyoq kaptinqa rurasqa qipaskunam hinallataq yuyarikun; yapaypuni kanman (duplicitad qhawayniykunawan hinallataq blacklist nisqawan).

- Blacklist nisqamanta willakuy (aktivasqa kaptin): Blacklist nisqayki ima postuladokunata chinkachiptin,
  add‑on nisqa uchuy modalninpi rikuchin chay qillqakunata imapaqpas hinallataq
  qatiq patrón(niykuna) nisqawan. Kay willakuyqa rikhurinpuni, mana imapas yapasqa kachkan kaptinpas, ichuqnin chinkachisqayku raykupas.

---

## Teclado p'itachakuna {#keyboard-shortcuts}

- Confirmación ventana: Y/J = Arí, N/Esc = Mana; Tab/Shift+Tab hina Flecha teclakunaqa qhawariyta muyurichin.
  - [Configuration](configuration#confirmation)‑pi “Default answer” nisqaqa ñawpaq qhawariywanmi ima botón chaskisqa kachkan.
  - Enter‑ta saqispaqa chaskisqa botón llamk'achin. Tab/Shift+Tab hina flechakunaqa qhawariyta kuyuchin, allin apanakuypaq.

### Tecladopaq qillqa qhilla {#keyboard-cheat-sheet}

| Llavekuna        | Ruway                                    |
|------------------|------------------------------------------|
| Y / J            | Arí‑ta chaskiy                           |
| N / Esc          | Mana‑ta chaskiy                          |
| Enter            | Chaskisqa botón llamk'achiy              |
| Tab / Shift+Tab  | Qhawariyta ñawpaq/qhipa kuyuchiy         |
| Flecha teclakuna | Botónkunaq chawpimpi muyuchiy            |
| Default answer   | Ñawpaq qhawariyta churay (Arí utaq Mana) |

---

## Piqt'aykuna {#limitations}

- Qhatiy (Forward)qa kay add‑on nisqawan mana hukniraq chaninchayniyuq (Reply hina Reply all‑qa apoyasqa).
- Hatun‑hatun qipaskunaqa Thunderbird utaq proveedor nisqap limitnikunawan tinkunman.
  - Add‑on nisqaqa manan qillqakunata t'aqapachichu ni qatunman t'ikrachichu; Thunderbird‑paq normal qipaq manejonwanpasmi llank'an.
- Chimapakusqa willakuykuna: S/MIME partesqa munasqaña qharqusqam.

---

## Imaraykutaq qipaskuna mana yapasqa kanman {#why-attachments-might-not-be-added}

- Ñawpaq willakuy yaqariqnin imagenkunaqa mana archivo hina copiakunchu. Ñawpaqmantaña kutichiy qillqapi kachkanku, maypichus Thunderbird churarqan. Qhaway [Configuration](configuration#include-inline-pictures).
- S/MIME firma partesqa kamachimusqaña qharqusqam: `smime.p7s` hina sutiyuqkuna, hinallataq `application/pkcs7-signature` utaq `application/pkcs7-mime` hina MIME tiposkunapas pasachikun.
- Blacklist patrónkunaqa aqllanakunata llamp'achinman: qhawariy [Configuration](configuration#blacklist-glob-patterns); tupaq masinchayqa mayúscula/minúscula mana ch'ullanchasqa, sutinmanta‑sapallan.
- Kikin sutinikunaqa manan wakmanta yapasqachu: compose‑piqa kikin normalizasqa sutiyuq archivo kaqtinqa, pasachikun.
- Mana archivo hina partes utaq suti‑mana‑tiyak: yapaypaqqa archivo‑hina partes suti allin kasqayuqlla qhawanakun.

---

Hinaspa qhawariy

- [Configuration](configuration)
