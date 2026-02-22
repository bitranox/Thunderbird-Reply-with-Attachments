---
id: usage
title: 'Ruwanapaq'
sidebar_label: 'Apnaqay'
---

---

## Llamk'apuynin {#usage}

- Kutichispa, add-on nisqaqa originalkuna-ta automaticamente churamun — utaq ñawpaqtaq tapunman, chayqa “Options” nisqapi aktivasqa kaptin.
- Suti (filename) ñawpaqman qochuspa wakichisqamanta qhipasqakunaqa mana kutiy churakun; S/MIME partesqa sapanka pasachikun. Inline imágenkunaqa by default kutichiypa ukhunpi (body) qhipa-manta kutichikun (hurquy kayta “Include inline pictures” nisqawan Options‑piqa).
- Blacklist nisqaman yapasqakunaqa chaynallataq pasachikun (mayúscula/minúscula mana ch'ullanchasqa glob patrónkunawan sutimanta sutinmanta, mana thakimanta). Qhawariy [Configuration](configuration#blacklist-glob-patterns).

---

### Imayna ruwakun kutichispa {#what-happens}

- Kutichiyta muskuy → original qipaskunata ruwariy → S/MIME + inline nisqakunata filtray → mañasqaman chaskiy (optional) → atin qillqakunata yapay (kikin sutinikunata saqey) → inline imágenkunata ukhunpi (body) kutichiy.

Chiqaq ch'aqwa pasi vs. qasiyapaq pasi: Add‑on nisqaqa ñawpaqta S/MIME hinallataq inline parteskunata archivo qipaskunamanta qharqun. Mana imapas allin kaptin, huk qasiyapaq pasitam rurapun, chaypas S/MIME/inline nisqakunata qharquspa, ichaqa aswan aswan kaykunata allinchaspa (qhawariy Code Details). Inline imágenkunata manan chaytam archivo qipaskunamanta yapasqachu; hinapuniqa, “Include inline pictures” nisqa aktivasqa kaptin (default), chaykunata chaylla kutichiy ukhunpi base64 data URI‑kuna hinallataq incrustachkan.

| Part tipo                                              |                       Chiqaq pasi |                    Qasiyapaq pasi |
| ------------------------------------------------------ | --------------------------------: | --------------------------------: |
| S/MIME firma archivo `smime.p7s`                       |                        Qharqusqam |                        Qharqusqam |
| S/MIME MIME tipos (`application/pkcs7-*`)              |                        Qharqusqam |                        Qharqusqam |
| Content‑ID‑wan willakuchisqa inline imágen (`image/*`) | Qharqusqam (ukhunpi kutichisqa\*) | Qharqusqam (ukhunpi kutichisqa\*) |
| Qipaq e‑mail (`message/rfc822`) sutiyuq                |                      Mana yapasqa |                  Yapaypuni kanman |
| Rurasqa archivo qipaq sutiyuq                          |                  Yapaypuni kanman |                  Yapaypuni kanman |

\* “Include inline pictures” aktivasqa kaptin (default: ON), inline imágenkunataqa kutichiy ukhunpi base64 data URI‑kuna hina chaylla churakun, manan archivo qipaskunata yapasqachu. Qhawariy [Configuration](configuration#include-inline-pictures).

Rikuchikuq: Ima qipaskunapas sutinchay ñawpaq willakuykuna mana tiyanmanchu, ichaqa kastilla archivos hina kashan (mana inline/S/MIME). Chiqaq pasiq mana imatapas tarikaptin, qasiyapaq pasiq chaykunataqa chaskipunman, chaymanta yapapunman.

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
| ---------------- | ---------------------------------------- |
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

- Inline imágenkunaqa manan archivo qipaq hina yapasqachu. “Include inline pictures” ON (default) kaptin, chaykunata kutichiy ukhunpi data URI‑kuna hina qhipa‑manta churakun. OFF kaptin, inline imágenkunaqa tukuylla qharqun. Qhawariy [Configuration](configuration#include-inline-pictures).
- S/MIME firma partesqa kamachimusqaña qharqusqam: `smime.p7s` hina sutiyuqkuna, hinallataq `application/pkcs7-signature` utaq `application/pkcs7-mime` hina MIME tiposkunapas pasachikun.
- Blacklist patrónkunaqa aqllanakunata llamp'achinman: qhawariy [Configuration](configuration#blacklist-glob-patterns); tupaq masinchayqa mayúscula/minúscula mana ch'ullanchasqa, sutinmanta‑sapallan.
- Kikin sutinikunaqa manan wakmanta yapasqachu: compose‑piqa kikin normalizasqa sutiyuq archivo kaqtinqa, pasachikun.
- Mana archivo hina partes utaq suti‑mana‑tiyak: yapaypaqqa archivo‑hina partes suti allin kasqayuqlla qhawanakun.

---

Hinaspa qhawariy

- [Configuration](configuration)
