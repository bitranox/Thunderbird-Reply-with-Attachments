---
id: configuration
title: 'Imiterere'
---

## Imiterere

Icyitonderwa ku magambo: reba [Ikinyuranyo](glossary) ku magambo akwiranye akoreshwa mu UI na docs.

---

## Fungura amahitamo muri Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Ibikoresho → Ibyongerwamo n'ibishushanyo → shaka "Subiza hamwe n'inyongera" → Ibyihutirwa/Amahitamo

---

### Ibyihutirwa {#settings}

#### Kwemeza {#confirmation}

- Hindura "Saba mbere yo kongeramo inyongera"
- Igisubizo gisanzwe: Yego cyangwa Oya (focus & keyboard default)
- Urufunguzo: Y/J = Yego; N/Esc = Oya; Tab/Shift+Tab na kashe z'imizigo zinjira mu focus
  - Reba ibisobanuro by'urufunguzo muri [Gukoresha](usage#keyboard-shortcuts).

---

#### Urutonde rw'ibikurwaho (glob patterns) {#blacklist-glob-patterns}

Fayili ziri ku rutonde rw'ibikurwaho ntizizashyirwa mu gusubiza byikora. Reba kandi [Ikinyuranyo](glossary) ku "Urutonde rw'ibikurwaho".

- Uburyo bumwe kuri buri murongo; bidakurikiza imiterere; gukurikiza gusa izina rya fayili
- Urugero: `*intern*`, `*secret*`, `*passwor*`
- Ibiranga glob byemewe: `*` (ibintu byose uretse `/`), `?` (ikimenyetso kimwe), ibyiciro by'ibimenyetso nk'uko `[abc]`. Koresha `\[` kugira ngo uhure n'ikimenyetso `[` kidasanzwe. Imihanda (`**/`) irarebwa kuko ari izina rya fayili gusa riri mu mirongo.
- Ntabwo byemewe: guhonyora (`!`), kwagura umwenda (`{..}`), na ranges z complex. Tegereza imiterere mu buryo bworoshye.
- Ibitekerezo ntabwo byemewe muri imirongo. Ntukashyireho `#` cyangwa ibitekerezo muri inline; shyiramo gusa icyanditswe cy'imirongo kuri buri murongo.

---

##### Igitabo cy'imirongo {#pattern-cookbook}

- Kora kuri PDF yose: `*.pdf`
- Kora ku mafayili atangirana na “scan”: `scan*`
- Icyiciro cy'ikimenyetso: `report[0-9].txt`
- Garura ikimenyetso `[`: `\[` (bifasha mugihe uhura n'ikimenyetso nk'ikimenyetso)

---

##### Amakuru {#blacklist-notes}

- Icyo ushaka kureka ntikigira akamaro; ubwa mbere/ubwo ari bwo buhita buhagarika iyo fayili.
- Guhera ni ibishushanyo bya fayili gusa (imihanda/uduce turanirwa).
- "Subiza ku bisanzwe" hashingira imiterere yakuze n'ikimenyetso cyo kugenzura urutonde rw'ibikurwaho.
- Kuki urugero `*passwor*`? Ruhura n'ubuhungiro bwose "password" na "Passwort".
- Imirongo y'ibanze: niba imirongo yose iguye ku izina rya fayili, iyo fayili ihagarikwa (ubwa mbere/ubwo rwose — imiterere ntabwo ihindura igisubizo).
- Inama — gerageza imiterere yawe: shyiramo imirongo y'ibimenyetso, subiza ku butumwa bufite fayili ifite izina ihuye, kandi wemere ko ihagarariwe mu rutonde rw'ikimenyetso.

##### Gerageza vuba (ikizamini cyizewe) {#blacklist-try-it}

1. Fungura amahitamo → Urutonde rw'ibikurwaho.
2. Ongeraho imirongo y'ibikurwaho urimo `*.tmp` hanyuma ukande ku Save.
3. Subiza ku butumwa bw'ikizamini bufite fayili irangirana na `.tmp` — iyo fayili igaragara mu rutonde rw'ikimenyetso kandi ntiyuzuza.
4. Kuramo imirongo y'ibikurwaho igihe wamara, cyangwa ukande "Subiza ku bisanzwe".

---

#### Ikibazo ku nyongera zifutwa {#warning-on-excluded-attachments}

- Hindura “Saba niba inyongera zifutwa n'urupapuro rw'ibikurwaho” (bisanzwe: ON).
- Iyo bifunguye, ikigeragezo gito gishyira ahagaragara fayili zifutwa hamwe n'imitwe ihuye. Icyo kigeragezo kandi kigaragara igihe ntakintu kizashyirwa kuko abakandida bose bahagaritswe.

---

#### Bika ibihinduka byawe {#save-your-settings}

Ibyihutirwa biba byabitswe binyuze ku ikimenyetso cyo kubika. Urashobora kugarura ubudasa mu sahani imwe mu buryo bw'intoki cyangwa ukagarura byihutirwa igihe bikenewe.

Niba ibikubiye mu bice bihaguye bitarashoboka, tangira Thunderbird hanyuma ugerageze nanone. (Thunderbird irashobora kubika ahagaragara mu byiciro; gutangiza bisubiza ibikubiye mu rukurikirane.)

Inama: Kugira ngo wemeze ko ibihinduka byawe byakozwe, subiza ku butumwa bwose buhujwe na inyongera hanyuma ukore ku kemezo cyangwa ikimenyetso gishya.

---

#### Icyerekanwa cy'ihabwa (gukomeza iminsi 90) {#donation-visibility}

Ibyo byongerwamo bigizwe n' igikorwa cy'ububasha bwo guhisha ibiganiro by'ihabwa igihe kinini nyuma yo gutanga.

Aho ushobora kubibona

- Amahitamo → Igice cyo gushyigikira: uzabona buto "Natanze" n'ahantu h'ibitekerezo.
- Dialog ya Kuvugurura-n'ihabwa kandi yerekana buto ya Donate; ihita ihindurwa igihe igihe cyo kugumisha kiriho.

Uko bikora

- Kanda "Natanze" kandi uhisha buto z'ihabwa n'ibikoresho bijyanye by'igihe cy'iminsi 90.
- Igitekerezo cyo ku rwego kigaragaza "Hishijwe kugeza YYYY-MM-DD" (mu itariki yawe y'aho). Hari kandi buto "Garura Donate" kugirango uhindure icyerekanwa akanya.
- Nyuma y'iminsi 90, buto ya Donate izahita yiyerekana byikora.

Guhisha no kubika

- Ibyo byongerwamo bikomeza igihe kimwe mu bubiko bwa Thunderbird kugira ngo bimenye igihe kinini. Urufunguzo: `donateHideUntil` (amasaha ya epoch).
- Iyi shusho ni iy'ahantu hafitwe gusa (ntishobora kwiganwa). Nta bisaba neti bigaragara ku gikorwa.

Gukemura ibibazo

- Niba Donate ikiriho nyuma yo gukanda "Natanze", tegereza akanya cyangwa usubire ku rupapuro rw'Amhitamo; UI yihindura nk'uko imiterere bikoreshwa.
- Kugira ngo usubize ku buryo bw'intoki, kanda "Garura Donate." Ushobora kandi gutegereza kugeza igihe kiriho mu gitekerezo cy'ibitekerezo.

Iyi ngingo ni iyihariye; ntikibuza imikorere y'inyongera kandi ntikubika amakuru yabandi.

---

### Guhindura izina (kugabanya duplicata) {#filename-normalization-duplicates-prevention}

Kugira ngo igaragare mu buryo bumwe ku mbuga, amazina aba ahinduwe mbere yo kugenzura duplicata:

- Unicode ihabwa imiterere ya NFC.
- Amazina ajya mu buryo budahemuka (akajyanye).
- Inguni za nyuma/z'ahantu ziyataguriye (uburyo bwizewe bwa Windows).

Ibi bituma gusuzuma duplicata bikwiranye n'amazina nka `café.pdf` ukurikije `café.pdf` (NFD) cyangwa `FILE.txt.` ukurikije `file.txt`.

---

## Imyitwarire yo kwemeza {#confirmation-behavior}

- "Igisubizo gisanzwe" gishyiraho buto yibanze ijya mu mucyo mu kigeragezo cyo kwemeza (ibifasha abakoresha urufunguzo).
- Ibi bikorwa kuri "Subiza" na "Subiza byose". "Ohereza" ntabwo ihindurwa n'iki gikorwa.

---

## Byinshi: gupima duplicata {#advanced-duplicate-detection}

Icyemezo cyo guhagarika duplicata gikorwa kuri buri tab ya compose kandi hakurikijwe izina rya fayili. Reba [Gukoresha](usage#behavior-details) ku bisobanuro birambuye.

---

Reba kandi

- [Uburenganzira](permissions)
- [Ibanga](privacy)
