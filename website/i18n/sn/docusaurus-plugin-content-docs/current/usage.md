---
id: usage
title: 'Mashandisirwo'
sidebar_label: 'Mashandisiro'
---

---

## Mashandisiro {#usage}

- Pindura uye wedzero inowedzera zvekutanga otomatiki — kana kubvunza kutanga, kana zvagoneswa mu Options.
- Kubvisa zvadzokororwa maererano nezita refaira; zvikamu zve S/MIME zvinogara zvichisvetukwa. Mifananidzo yeinline inodzorerwa mumuviri wemhinduro nekutadza (default) (unogona kudzima kuburikidza ne "Include inline pictures" mu Options).
- Maattachment ari pa blacklist anosvetukwawo (mapatani eglob asingatarisi macase anowirirana nemazita efaira, kwete mapaths). Ona [Kumisikidzwa](configuration#blacklist-glob-patterns).

---

### Zvinoitika paunopindura {#what-happens}

- Kuona kupindura → kuratidza rondedzero yemaattachment ekutanga → kusefa S/MIME + inline → kusimbisa kana zvichidiwa → kuwedzera mafaera akakodzera (svetuka zvinodzokororwa) → kudzoreredza mifananidzo yeinline mumuviri.

Kupfuura kwakasimba vs. kwakapfava: Wedzero inotanga yabvisa zvikamu zve S/MIME uye zveinline kubva kumaattachment efaira. Kana pasina chinokodzera, inomhanya kupfuura kwakapfava kunoramba kuchibvisa S/MIME/inline asi kunobvumira mamiriro mazhinji (ona Tsananguro dzeKodhi). Mifananidzo yeinline haimbo wedzerwi seattachments efaira; panzvimbo pezvo, kana "Include inline pictures" yakagoneswa (default), inonyudzwa zvakananga mumuviri wemhinduro sebase64 data URIs.

| Rudzi rwechikamu                                           |                  Kupfuura kwakasimba |                  Kupfuura kwakapfava |
| ---------------------------------------------------------- | -----------------------------------: | -----------------------------------: |
| Faira resiginecha re S/MIME `smime.p7s`                    |                           Rakabviswa |                           Rakabviswa |
| Mhando dze S/MIME MIME (`application/pkcs7-*`)             |                           Rakabviswa |                           Rakabviswa |
| Mufananidzo weinline unoreva Content‑ID (`image/*`)        | Rakabviswa (rinodzorerwa mumuviri\*) | Rakabviswa (rinodzorerwa mumuviri\*) |
| Imeyili yakabatanidzwa (`message/rfc822`) ine zita refaira |                    Harina kuwedzerwa |                  Rinogona kuwedzerwa |
| Attachment yefaira yakajairika ine zita refaira            |                  Rinogona kuwedzerwa |                  Rinogona kuwedzerwa |

\* Kana "Include inline pictures" yakagoneswa (default: ON), mifananidzo yeinline inonyudzwa mumuviri wemhinduro se base64 data URIs panzvimbo pekuwedzerwa seattachments efaira. Ona [Kumisikidzwa](configuration#include-inline-pictures).

Muenzaniso: Mamwe maattachment anogona kusashandisa mimwe misoro (headers) asi achiri mafaera akajairika (kwete inline/S/MIME). Kana kupfuura kwakasimba kusina kuwana, kupfuura kwakapfava kunogona kugamuchira iwayo nekuavaisa.

---

### Kureva kune zvimwe {#cross-reference}

- Forward hachichinjwi nedhizaini (ona Zvinogumira pazasi).
- Kune zvikonzero nei attachment inogona kusawedzerwa, ona “Nei maattachment angasawedzerwa”.

---

## Zvakadzama zveMaitiro {#behavior-details}

- **Kudzivirira kudzokororwa:** Wedzero inoratidza tabhu recompose sekuti raprocesswa ichishandisa kukosha kwesession per‑tab uye mudziviriri uri mu-memory. Haisi kuwedzera zvekutanga kaviri.
- Kuvhara nekuvhura zvakare hwindo recompose kunoonekwa serimwe tabhu idzva (ndiko kuti, kuyedza kutsva kunobvumidzwa).
- **Kuremekedza maattachment aripo:** Kana compose yatove nemaattachment, zvekutanga zvichiri kuwedzerwa kamwe chete, zvichisvetuka mazita efaira atovepo.
- **Zvinobviswa:** Zvinhu zve S/MIME nemifananidzo yeinline zvinobviswa pamaattachment efaira. Kana pasina chinokodzera pakupfuura kwekutanga, kupfuura kwakapfava kunoongororazve zvikamu zvisiri S/MIME. Mifananidzo yeinline inobatwa zvakasiyana: inodzorerwa mumuviri wemhinduro se data URIs (kana zvagoneswa).
  - **Mazita efaira:** `smime.p7s`
  - **Mhando dzeMIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Mifananidzo yeinline:** chero chikamu che `image/*` chinoreva Content‑ID — chinobviswa pamaattachment efaira asi chinonyudzwa mumuviri wemhinduro kana "Include inline pictures" iri ON
  - **Maemail akabatanidzwa (`message/rfc822`):** anoitirwa seattachments akajairika kana aine zita refaira; anogona kuwedzerwa (zvichienderana nekuongorora zvekudzokororwa neblacklist).
- **Yambiro yeblacklist (kana yagoneswa):** Kana vanenge vakasarudzwa vabviswa neblacklist yako,
  wedzero inoratidza modal diki inonyora mafaera akakanganiswa nemapatani
  anowirirana. Yambiro iyi inongoonekawo kana pasina maattachment acha wedzerwa
  nekuti zvese zvakabviswa.

---

## Mapfupi eKhibhodi {#keyboard-shortcuts}

- Hwindo rekusimbisa: Y/J = Yes, N/Esc = No; Tab/Shift+Tab uye makiyi eMuseve anofambisa focus.
  - “Default answer” mu [Kumisikidzwa](configuration#confirmation) inogadza bhatani rinotariswa pakutanga.
  - Enter inobatidza bhatani riri pafocus. Tab/Shift+Tab nemaseve zvinofambisa focus kuti zvive nyore kuwanika.

### Chidimbu cheKhibhodi {#keyboard-cheat-sheet}

| Makiyi          | Chiito                                |
| --------------- | ------------------------------------- |
| Y / J           | Simbisa Yes                           |
| N / Esc         | Simbisa No                            |
| Enter           | Shandisa bhatani riri pafocus         |
| Tab / Shift+Tab | Fambisa focus mberi/kumashure         |
| Arrow keys      | Fambisa focus pakati pemabhatan       |
| Default answer  | Inoseta focus yekutanga (Yes kana No) |

---

## Zvinogumira {#limitations}

- Forward hachichinjwi newedzero iyi (Reply ne Reply all zvinotsigirwawo).
- Maattachment makuru zvikuru anogona kusangana nemiganho yeThunderbird kana yemupi webasa.
  - Wedzero haipatsanuri kana kudzvanya mafaera; inovimba nekubata kwaThunderbird kwakajairika nemaattachment.
- Meseji dzakanyorwa (encrypted): zvikamu zve S/MIME zvinobviswa nemaune.

---

## Nei maattachment angasawedzerwa {#why-attachments-might-not-be-added}

- Mifananidzo yeinline haina kuwedzerwa seattachments efaira. Kana "Include inline pictures" iri ON (default), inonyudzwa mumuviri wemhinduro se data URIs panzvimbo pezvo. Kana marongero ari OFF, mifananidzo yeinline inobviswa zvachose. Ona [Kumisikidzwa](configuration#include-inline-pictures).
- Zvikamu zvesiginecha ye S/MIME zvinobviswa nemaune: mazita efaira akaita se `smime.p7s` uye mhando dzeMIME dzakaita se `application/pkcs7-signature` kana `application/pkcs7-mime` zvinotsvetukwa.
- Mapatani eblacklist anogona kusefa vanenge vakasarudzwa: ona [Kumisikidzwa](configuration#blacklist-glob-patterns); kuenzanisa hakutarisi misiyano yemacase uye kunobata chete zita refaira.
- Mazita efaira anodzokororwa haadzokerwi kuwedzerwa: kana compose yatova nefaira rine zita rakajairikiswa rakafanana, rinotsvetukwa.
- Zvikamu zvisiri zvenyama yefaira kana kushaikwa kwemazita efaira: zvinongofungwa chete zvikamu zvakaita sefaira zvine mazita efaira anobatika kuti zviwedzerwe.

---

Ona zvakare

- [Kumisikidzwa](configuration)
