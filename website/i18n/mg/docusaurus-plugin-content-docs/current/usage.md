---
id: usage
title: 'Fampiasana'
sidebar_label: 'Fampiasana'
---

---

## Fampiasana {#usage}

- Mamaly ianao dia manampy ho azy ny fanitarana ny tany am-boalohany — na mangataka fanamafisana aloha, raha alefa ao amin'ny Safidy.
- Esorina dika mitovy araka ny anaran-drakitra; ny ampahany S/MIME dia hadinoina hatrany. Ny sary inline dia averina ao amin'ny vatana valiny amin'ny toe-javatra mahazatra (azo vonoina amin'ny "Include inline pictures" ao amin'ny Safidy).
- Ny fampiarahana voasokajy ao anaty lisitra mainty dia tsy asiana koa (glob pattern tsy miankina amin'ny litera lehibe/kely mifanaraka amin'ny anaran-drakitra, fa tsy amin'ny làlana). Jereo ny [Configuration](configuration#blacklist-glob-patterns).

---

### Inona no mitranga rehefa mamaly {#what-happens}

- Hamarino fa valiny → farito ny fampiarahana tany am-boalohany → sivano S/MIME + inline → fanamafisana an-tsafidy → ampio ireo rakitra mahafeno fepetra (adiaho ny dika mitovy) → avereno ny sary inline ao amin'ny vatana.

Fandaloana henjana vs. malalaka: Voalohany, esorin'ny fanitarana amin'ny fampiarahana rakitra ny ampahany S/MIME sy inline. Raha tsy misy mahafeno fepetra, mampandeha fandaloana malalaka izy izay mbola manilika ny S/MIME/inline ihany fa mandefitra tranga maro kokoa (jereo ny Code Details). Tsy asiana ho fampiarahana rakitra mihitsy ny sary inline; fa raha alefa ny "Include inline pictures" (masontsivana tsy miova), dia ampidirina mivantana ao amin'ny vatan'ny valiny ho base64 data URI izy ireo.

| Karazana ampahany                                          |                    Fandaloana henjana |                   Fandaloana malalaka |
| ---------------------------------------------------------- | ------------------------------------: | ------------------------------------: |
| Rakitra sonia S/MIME `smime.p7s`                           |                               Esorina |                               Esorina |
| Karazana MIME an'ny S/MIME (`application/pkcs7-*`)         |                               Esorina |                               Esorina |
| Sary inline voatonona amin'ny Content‑ID (`image/*`)       | Esorina (averina ao amin'ny vatana\*) | Esorina (averina ao amin'ny vatana\*) |
| Mailaka miraikitra (`message/rfc822`) misy anaran-drakitra |                           Tsy ampiana |                           Azo ampiana |
| Fampiarahana rakitra mahazatra misy anaran-drakitra        |                           Azo ampiana |                           Azo ampiana |

\* Rehefa alefa ny "Include inline pictures" (default: ON), ny sary inline dia ampidirina mivantana ao amin'ny vatan'ny valiny ho base64 data URI fa tsy asiana ho fampiarahana rakitra. Jereo ny [Configuration](configuration#include-inline-pictures).

Ohatra: Misy fampiarahana mety tsy hanana lohateny sasany nefa rakitra mahazatra ihany (tsy inline/S/MIME). Raha tsy mahita na inona na inona ny fandaloana henjana, mety heken'ny fandaloana malalaka ireo ka miraikitra.

---

### Fifanondroana {#cross-reference}

- Ny Forward dia tsy ovain'ny famolavolana (jereo ny Famerana etsy ambany).
- Raha mila antony mahatonga ny fampiarahana mety tsy ho ampiana, jereo ny “Nahoana no mety tsy ho ampiana ny fampiarahana”.

---

## Antsipirin'ny fitondran-tena {#behavior-details}

- **Fisorohana dika mitovy:** Manamarika ny tabilao fanoratana ho efa voahodina ny fanitarana amin'ny alalan'ny sanda fivoriana isaky ny tabilao sy fiarovana ao anaty fitadidiana. Tsy hanampy indroa ny tany am-boalohany izy.
- Ny fanidiana sy fanokafana indray varavarankely fanoratana dia heverina ho tabilao vaovao (midika hoe avela ny ezaka vaovao).
- **Fanajàna ireo fampiarahana efa misy:** Raha efa misy fampiarahana ao amin'ny fanoratana, dia mbola ampiana indray mandeha ihany ireo tany am-boalohany, sady tsy asiana ireo anaran-drakitra izay efa misy.
- **Fanalana:** Esorina amin'ny fampiarahana rakitra ny sisan-javatra S/MIME sy ny sary inline. Raha tsy misy mahafeno fepetra amin'ny fandaloana voalohany, dia misy dila malalaka mamerina manamarina ireo tsy S/MIME. Tokana ny fitantanana ny sary inline: averina ao amin'ny vatan'ny valiny ho data URI izy ireo (rehefa alefa).
  - **Anaran-drakitra:** `smime.p7s`
  - **Karazana MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Sary inline:** ny ampahany `image/*` rehetra voatonona amin'ny Content‑ID — esorina amin'ny fampiarahana rakitra fa ampidirina ao amin'ny vatan'ny valiny rehefa "Include inline pictures" no ON
  - **Mailaka miraikitra (`message/rfc822`):** heverina ho fampiarahana mahazatra raha manana anaran-drakitra; mety ho ampiana (miankina amin'ny fanamarinana dika mitovy sy ny lisitra mainty).
- **Fampitandremana lisitra mainty (raha alefa):** Rehefa esorin'ny lisitra maintinao ny kandidà,
  mampiseho maodely kely milahatra ireo rakitra voakasika sy ny
  pattern(s) mifanaraka. Miseho ihany koa ity fampitandremana ity amin'ny tranga izay tsy hisy fampiarahana ho
  ampiana satria nesorina daholo ny zava-drehetra.

---

## Lalana fohy amin'ny fitendry {#keyboard-shortcuts}

- Varavarankely fanamafisana: Y/J = Eny, N/Esc = Tsia; Tab/Shift+Tab sy zana-tsipìka dia mamindra ny fifantohana.
  - Ny “Valiny tsy misy fanovana” ao amin'ny [Configuration](configuration#confirmation) no mametraka ny bokotra ifantohana voalohany.
  - Enter dia mampihetsika ny bokotra ifantohana. Tab/Shift+Tab sy zana-tsipìka dia mamindra ny fifantohana ho an'ny fidirana mora.

### Taratasy fohy amin'ny fitendry {#keyboard-cheat-sheet}

| Kitendry                 | Asa                                                  |
| ------------------------ | ---------------------------------------------------- |
| Y / J                    | Manamafy Eny                                         |
| N / Esc                  | Manamafy Tsia                                        |
| Enter                    | Manahetsika ny bokotra ifantohana                    |
| Tab / Shift+Tab          | Mampandroso/Mamerina ny fifantohana                  |
| Zana-tsipìka             | Mampihetsika ny fifantohana eo anelanelan'ny bokotra |
| Valiny tsy misy fanovana | Mametraka ny fifantohana voalohany (Eny na Tsia)     |

---

## Famerana {#limitations}

- Tsy ovain'ity fanitarana ity ny Forward (tohana ny Reply sy Reply all).
- Ny fampiarahana lehibe be dia mety ho voafetran'ny Thunderbird na ny mpanome.
  - Tsy mizara na manindry rakitra ny fanitarana; miankina amin'ny fitantanana fampiarahana mahazatra an'ny Thunderbird izy.
- Hafatra voaaro: Esorina tamin'ny fikasana ny ampahany S/MIME.

---

## Nahoana no mety tsy ho ampiana ny fampiarahana {#why-attachments-might-not-be-added}

- Tsy asiana ho fampiarahana rakitra ny sary inline. Rehefa "Include inline pictures" no ON (fepetra default), dia ampidirina ao amin'ny vatan'ny valiny ho data URI izy ireo. Raha OFF ilay masontsivana, dia esorina tanteraka ny sary inline. Jereo ny [Configuration](configuration#include-inline-pictures).
- Esorina amin'ny endrika noforonina ny ampahany sonia S/MIME: anaran-drakitra toa ny `smime.p7s` sy karazana MIME toy ny `application/pkcs7-signature` na `application/pkcs7-mime` dia hadinoina.
- Afaka manivana kandidà ny modely lisitra mainty: jereo ny [Configuration](configuration#blacklist-glob-patterns); tsy miankina amin'ny haben-tsoratra ny fifanarahana ary amin'ny anaran-drakitra ihany.
- Tsy averina ampiana ny anaran-drakitra mitovy: raha efa misy rakitra mitovy anarana ao amin'ny fanoratana, dia tsipahina izy.
- Ampahany tsy rakitra na tsy manana anaran-drakitra: ireo ampahany mitovitovy amin'ny rakitra manana anarana azo ampiasaina ihany no heverina ho ampiana.

---

Jereo koa

- [Configuration](configuration)
