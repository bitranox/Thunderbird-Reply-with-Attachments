---
id: usage
title: 'Notkun'
sidebar_label: 'Notkun'
---

---

## Notkun {#usage}

- Svaraðu og viðbótin bætir upprunalegum viðhengjum við sjálfkrafa — eða spyr fyrst, ef það er virkjað í Valkostum.
- Afrit fjarlægð eftir skráarheiti; S/MIME hlutum er alltaf sleppt. Myndir sem eru felldar inn í upprunalega skilaboðið haldast í meginmáli svarsins, þar sem Thunderbird setur þær, og eru ekki afritaðar sem skrár.
- Viðhengjum á svörtum lista er einnig sleppt (há-/lágstafsóháð glob-mynstur sem samsvara skráarheitum, ekki slóðum). Sjá [Stillingar](configuration#blacklist-glob-patterns).

---

### Hvað gerist við svar {#what-happens}

- Greina svar → telja upp upprunaleg viðhengi → sleppa S/MIME og innfelldum myndum → valfrjáls staðfesting → bæta við gjaldgengum skrám (sleppa tvítekningum).

| Tegund hluta                                            | Afritað í svarið           |
|---------------------------------------------------------|---------------------------:|
| S/MIME undirskriftarskrá `smime.p7s`                    | Nei                        |
| S/MIME MIME-tegundir (`application/pkcs7-*`)            | Nei                        |
| Mynd sem meginmál skilaboðsins felur inn með `cid:`     | Nei (hún er í meginmálinu) |
| Mynd merkt `Content-Disposition: inline`                | Nei (hún er í meginmálinu) |
| Mynd með `Content-ID` sem meginmálið vísar aldrei í     | Já                         |
| Viðhengt tölvupóstur (`message/rfc822`) með skráarheiti | Já                         |
| Venjulegt skráarviðhengi með skráarheiti                | Já                         |

Mynd telst innfelld aðeins þegar upprunalega skilaboðið vísar í raun í hana, eða þegar sendandinn merkti hana sérstaklega sem `Content-Disposition: inline`. Einber `Content-ID` haus dugir ekki: sum tölvupóstforrit setja hann á sérhvern myndarhluta, þar með talin raunveruleg viðhengi, og þau verður samt að afrita.

---

### Krossvísanir {#cross-reference}

- Áframsenda er ekki breytt samkvæmt hönnun (sjá Takmarkanir hér að neðan).
- Fyrir ástæður þess að ekki sé bætt við viðhengjum, sjá „Af hverju gæti ekki verið bætt við viðhengjum“.

---

## Nánar um hegðun {#behavior-details}

- Dupplikuvarnir: Viðbótin merkir samsetningarflipann sem unnin með flipasértæku setugildi og vörn í minni. Hún bætir ekki upprunalegum viðhengjum við tvisvar.
- Að loka og opna aftur samsetningarglugga telst nýr flipi (þ.e. ný tilraun er leyfð).
- Virðir fyrirliggjandi viðhengi: Ef samsetningin inniheldur þegar einhver viðhengi, er samt aðeins bætt við upprunalegum einu sinni og skráarheitum sem þegar eru til er sleppt.
- Undanþágur: S/MIME‑afurðum og innfelldum myndum er sleppt úr skráarviðhengjum. Ef ekkert hæfir í fyrstu yfirferð, framkvæmir varayfirferð slakari endurathugun á ekki‑S/MIME hlutum. Innfelldar myndir eru meðhöndlaðar sérstaklega: þær eru endursettar í svartextann sem data‑URI (þegar virkjað).
  - Skráarheiti: `smime.p7s`
  - MIME‑tegundir: `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - Innfelldar myndir: allir `image/*` hlutar sem Content‑ID vísar í — útilokaðir úr skráarviðhengjum en felldir inn í svartextann þegar „Include inline pictures“ er ON
  - Viðhengdir póstboðskapir (`message/rfc822`): meðhöndlaðir sem venjuleg viðhengi ef þeir hafa skráarheiti; gæti verið bætt við (háð tvítökuathugunum og svörtum lista).
- Aðvörun um svartan lista (ef virkjað): Þegar frambjóðendum er sleppt vegna svarta listans,
  sýnir viðbótin lítið glugga sem listir upp viðkomandi skrár og samsvarandi
  mynstur. Þessi aðvörun birtist einnig þegar engum viðhengjum verður bætt við
  þar sem öllu var sleppt.

---

## Flýtilyklar {#keyboard-shortcuts}

- Staðfestingargluggi: Y/J = Já, N/Esc = Nei; Tab/Shift+Tab og Örvalyklar færa fókus í hring.
  - „Default answer“ í [Stillingar](configuration#confirmation) setur hnappinn sem fær upphaflegan fókus.
  - Enter virkjar hnappinn með fókus. Tab/Shift+Tab og örvar færa fókus fyrir aðgengi.

### Yfirlit flýtilykla {#keyboard-cheat-sheet}

| Lyklar          | Aðgerð                                 |
|-----------------|----------------------------------------|
| Y / J           | Staðfesta Já                           |
| N / Esc         | Staðfesta Nei                          |
| Enter           | Virkja valinn hnapp                    |
| Tab / Shift+Tab | Færa fókus áfram/til baka              |
| Örvalyklar      | Færa fókus á milli hnappa              |
| Default answer  | Stillir upphaflegan fókus (Já eða Nei) |

---

## Takmarkanir {#limitations}

- Áframsenda er ekki breytt af þessari viðbót (Svara og Svara öllum eru stutt).
- Mjög stór viðhengi kunna að lúta takmörkunum Thunderbird eða þjónustuveitanda.
  - Viðbótin brýtur ekki skrár í bita né þjappar þeim; hún treystir á venjulega meðhöndlun Thunderbird á viðhengjum.
- Dulrituð skilaboð: S/MIME‑hlutum er vísvitandi sleppt.

---

## Ástæður þess að viðhengjum gæti ekki verið bætt við {#why-attachments-might-not-be-added}

- Myndir sem upprunalega skeytið fellir inn eru ekki afritaðar sem skrár. Þær eru þegar í meginmáli svarsins, þar sem Thunderbird setti þær. Sjá [Uppsetning](configuration#include-inline-pictures).
- S/MIME undirskriftarhlutum er sleppt samkvæmt hönnun: skráarheitum eins og `smime.p7s` og MIME‑tegundum á borð við `application/pkcs7-signature` eða `application/pkcs7-mime` er sleppt.
- Mynstur á svörtum lista geta síað frambjóðendur: sjá [Stillingar](configuration#blacklist-glob-patterns); samsvörun er há-/lágstafsóháð og eingöngu eftir skráarheiti.
- Tvíteknu skráarheitum er ekki bætt við aftur: ef samsetningin inniheldur þegar skrá með sama samræmda heiti, er henni sleppt.
- Ekki‑skráarhlutar eða vantar skráarheiti: einungis skrár‑líkar einingar með nothæfu skráarheiti koma til greina.

---

Sjá einnig

- [Stillingar](configuration)
