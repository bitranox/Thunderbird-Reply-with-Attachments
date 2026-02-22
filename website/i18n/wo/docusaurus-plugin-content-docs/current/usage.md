---
id: usage
title: 'Jëfandikoo'
sidebar_label: 'Jëfandikoo'
---

---

## Jëfandikoo {#usage}

- Tontu te modil bi dina yokk piis jowànt yi yu asal ci boppam — walla laaj ci kanam, bu ñu suqali ko ci Options.
- Duppikat yi dañu sàq ci turu fichié; pacc S/MIME yi dañu leen bayyi saa su ne. Nataal yi ci biir (inline) dañu leen delloo ci jëmmalin bi saa su ne (mann ngaa suuxal ko ci "Include inline pictures" ci Options).
- Piis jowànt yi ci liñu dogal (blacklist) itam dañu koy bàyyi (glob patterns yi xam-xamu suuf-sukaale, di melal turu fichié rekk, du yoon). Gëna xam: [Tànneef](configuration#blacklist-glob-patterns).

---

### Lan la am bu ñu tontu {#what-happens}

- Xam tontu → limi piis jowànt yi yu asal → séddi S/MIME + inline → dëggalu mandu → yokk fiichié yi mën a yokk (duppi yi sàq) → delloo nataal yi ci biir jëmmalin bi.

Pass bu dëgër vs. pass bu yomb: Modil bi jëkk mooy bàyyi pacc S/MIME ak pacc yu inline ci piiñu tacc fiichié. Bu amul dara bu mën, dina def jàll bu yomb buy bàyyi itam S/MIME/inline waaye di mayy yu bari gëna am (xoolal Code Details). Nataal yi ci biir duñu kenn yokk leen ni fiichié yu tacc; lu ci gën a ëpp, bu “Include inline pictures” suqali (defóo la), dañu leen sëf sedd ci jëmmalin bi ni data URI yu base64.

| Giiru pacc                                         |                      Pass bu dëgër |                       Pass bu yomb |
| -------------------------------------------------- | ---------------------------------: | ---------------------------------: |
| Fichié siiñ S/MIME `smime.p7s`                     |                           Bàyyi na |                           Bàyyi na |
| Xeetu MIME S/MIME (`application/pkcs7-*`)          |                           Bàyyi na |                           Bàyyi na |
| Nataal bu inline bu joxe ko Content‑ID (`image/*`) | Bàyyi na (delloo ci jëmmalin bi\*) | Bàyyi na (delloo ci jëmmalin bi\*) |
| Imeel bu tacc (`message/rfc822`) bu am turu fichié |                             Duggul |                  Mën nañu koy yokk |
| Fichié bu tacc bu njort ci tur                     |                  Mën nañu koy yokk |                  Mën nañu koy yokk |

\* Bu “Include inline pictures” suqali (defóo: ON), nataal yi ci biir dañu leen sëf sedd ci jëmmalin bi ni data URI yu base64, du leen yokk ni fiichié yu tacc. Xoolal [Tànneef](configuration#include-inline-pictures).

Misaal: Ay piis jowànt mën nañu amul ay header yu ñu bari waaye dañu fiichié yu dëgg rekk (du inline/S/MIME). Bu pass bu dëgër amul dara, pass bu yomb mën na ko nangu te koy tattali.

---

### Jokkoo {#cross-reference}

- Forward duñu ko soppi ci taxawaay (xoolal Tëyee yi ci suuf).
- Ngir xam daldi lu tax benn piis jowànt mënul ñu ko yokk, xoolal “Lu tax piis jowànt yi mënul ñu yokk”.

---

## Benn-benn yu doxalin {#behavior-details}

- Duplicate prevention: Modil bi miŋŋat na koñu bind bi ni mu lëkkal na liggéey, jëfandikoo valëëru sesiyoŋ bu koñ-bu-ne ak benn palanteer ci xel. Du yokk originals yi ñaar yoon.
- Bu nga tëj te ubbiwaat palanteeru bind, ñu xool ko ni koñ bu bees la (limumu tekki ne, mën nañu defarwaat ko).
- Respect existing attachments: Su koñu bind bi amoon na ay piis jowànt, originals yi dañu leen koy yokk benn rekk, te di sàq turu fichié yi am naoon ba pare.
- Exclusions: Pacc S/MIME yi ak nataal yi ci biir dañu leen bàyyi ci fiiñu tacc fiichié. Bu jàll bi jëkk amul dara, benn jàll bu yomb di caabi, di xoolaat pacc yu du S/MIME. Nataal yi ci biir kenn yu ko ci toppal ba noppi: dañu leen delloo sedd ci jëmmalin bi ni data URI (bu suqali).
  - Filenames: `smime.p7s`
  - MIME types: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Inline images: pacc bu `image/*` bu ñu joxe ko Content‑ID — dañu ko bàyyi ci fiiñu tacc fiichié waaye dañu ko sëf sedd ci jëmmalin bi bu “Include inline pictures” ON
  - Imeel yi tacc (`message/rfc822`): ñu xool leen ni piis jowànt yu normal su ñu am turu fichié; mën nañu leen yokk (ci kaw seetlu duppi ak blacklist).
- Blacklist warning (bu suqali): Bu sa blacklist dëddalee ay kandidaten, modil bi dina wone benn ndombo-ndombo bu ndaw buy limi fiichié yi laal ak pattern(s) yi dëpp. Warning wii it di feeñ ci xaalis yi mujj, bu kenn kenn du ñu yokk ndax sa dëddal bi dëddal na lépp.

---

## Njaxlaf yu klawi {#keyboard-shortcuts}

- Dialogu dëggal: Y/J = Waaw, N/Esc = Déedéet; Tab/Shift+Tab ak fit yu falaas (Arrow keys) dañuy waññi fokusu bi.
  - “Default answer” ci [Tànneef](configuration#confirmation) mooy tëye butoŋ bi gii fokusu bi jëkk.
  - Enter dina sàj butoŋ bi am fokusu. Tab/Shift+Tab ak fit yi dañuy doxal fokusu ngir yokk wutu.

### Kàrtu-jàmmu klawi {#keyboard-cheat-sheet}

| Keys            | Jëf                                      |
| --------------- | ---------------------------------------- |
| Y / J           | Dëggal Waaw                              |
| N / Esc         | Dëggal Déedéet                           |
| Enter           | Sàjj butoŋ bi am fokusu                  |
| Tab / Shift+Tab | Doxal fokusu ci kanam/ginnaaw            |
| Arrow keys      | Doxal fokusu ci biir butoŋ yi            |
| Default answer  | Tëye fokusu bi jëkk (Waaw walla Déedéet) |

---

## Tëyee yi {#limitations}

- Forward modil bii du ko soppi (Tontu ak Tontu lépp la ñu aar).
- Piis jowànt yu raañu rëy mën nañu toppu teqale yi Thunderbird walla sa sarwiiskaar.
  - Modil bi du peese walla xàmme fiichié yi; dafa sukkandiku ci doxal bii Thunderbird def ci piiñu tacc.
- Bataaxal yi ñu ngiñ ko simb: pacc S/MIME yi dañu leen bàyyi ci mbir moom.

---

## Lu tax piis jowànt yi mënul ñu yokk {#why-attachments-might-not-be-added}

- Nataal yi ci biir duñu leen yokk ni fiichié yu tacc. Bu “Include inline pictures” ON (defóo) la, dañu leen sëf sedd ci jëmmalin bi ni data URI. Bu réglaj bi OFF, nataal yi ci biir dañu leen dindi totally. Xoolal [Tànneef](configuration#include-inline-pictures).
- Pacc siiñ S/MIME yi dañu leen bàyyi ci taxawaay: turu fichié yu mel ni `smime.p7s` ak xeetu MIME yu mel ni `application/pkcs7-signature` walla `application/pkcs7-mime` dañu leen sàq.
- Pattern yi ci blacklist mën nañu sànni kandidaten yi: xoolal [Tànneef](configuration#blacklist-glob-patterns); dëpp bi du xam xajj majuskul/minuskul te di turu fichié rekk.
- Turu fichié yu duppi du ñu re-yokk: bu koñu bind bi amoon na fiichié bu am tur bu dëpp, ñu koy sàq.
- Pacc yu du fiichié walla yu amul turu fichié: pacc yu mel ni fiichié yi yu am turu fichié bu mën a jëfandikoo rekk lañu xool ngir yokk.

---

Seetal itam

- [Tànneef](configuration)
