---
id: usage
title: 'Mashandisirwo'
sidebar_label: 'Mashandisiro'
---

---

## Mashandisiro {#usage}

- Pindura uye wedzero inowedzera zvekutanga otomatiki — kana kubvunza kutanga, kana zvagoneswa mu Options.
- Zvakadzokororwa zvinobviswa zvichienderana nezita refaira; zvikamu zveS/MIME zvinogara zvichidarikwa. Mifananidzo yakaiswa mumeseji rekutanga inoramba iri mumuviri wemhinduro, apo Thunderbird inoiisa, uye haikopwi sefaira.
- Maattachment ari pa blacklist anosvetukwawo (mapatani eglob asingatarisi macase anowirirana nemazita efaira, kwete mapaths). Ona [Kumisikidzwa](configuration#blacklist-glob-patterns).

---

### Zvinoitika paunopindura {#what-happens}

- Ziva mhinduro → nyorai zvakanamatirwa zvepakutanga → darika S/MIME nemifananidzo yakabatanidzwa → kusimbiswa kusingamanikidzi → wedzera mafaira akakodzera (uchidarika zvakafanana).

| Rudzi rwechikamu                                             | Rinokopwa muMhinduro |
|--------------------------------------------------------------|---------------------:|
| Faira resaino yeS/MIME `smime.p7s`                           | Kwete                |
| Mhando dzeMIME dzeS/MIME (`application/pkcs7-*`)             | Kwete                |
| Mufananidzo unoiswa nemuviri wemeseji kuburikidza ne`cid:`   | Kwete (uri mumuviri) |
| Mufananidzo wakanyorwa kuti `Content-Disposition: inline`    | Kwete (uri mumuviri) |
| Mufananidzo une `Content-ID` isingatongonongedzerwi nemuviri | Ehe                  |
| Email yakabatanidzwa (`message/rfc822`) ine zita refaira     | Ehe                  |
| Chinobatanidzwa chefaira chinowanzoitika chine zita refaira  | Ehe                  |

Mufananidzo unoverengwa seiswa mukati chete kana meseji rekutanga richinyatsoita kuti unongedzerwe, kana kuti kana
anotumira anyatso nyora kuti `Content-Disposition: inline`. Musoro we`Content-ID` woga hauna kukwana: maclients emakemikari
akawanda anoisa izvi pane chikamu chega chega chemufananidzo, kusanganisira zvinobatanidzwa chaizvo, uye izvo zvinofanira kuramba zvichikopwa.

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
|-----------------|---------------------------------------|
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

- Mifananidzo yakabatanidzwa nemeseji yepakutanga haitorwi sezvakanamatirwa. Iyo yatove mumuviri wemhinduro, kwaakaiswa naThunderbird. Ona [Configuration](configuration#include-inline-pictures).
- Zvikamu zvesiginecha ye S/MIME zvinobviswa nemaune: mazita efaira akaita se `smime.p7s` uye mhando dzeMIME dzakaita se `application/pkcs7-signature` kana `application/pkcs7-mime` zvinotsvetukwa.
- Mapatani eblacklist anogona kusefa vanenge vakasarudzwa: ona [Kumisikidzwa](configuration#blacklist-glob-patterns); kuenzanisa hakutarisi misiyano yemacase uye kunobata chete zita refaira.
- Mazita efaira anodzokororwa haadzokerwi kuwedzerwa: kana compose yatova nefaira rine zita rakajairikiswa rakafanana, rinotsvetukwa.
- Zvikamu zvisiri zvenyama yefaira kana kushaikwa kwemazita efaira: zvinongofungwa chete zvikamu zvakaita sefaira zvine mazita efaira anobatika kuti zviwedzerwe.

---

Ona zvakare

- [Kumisikidzwa](configuration)
