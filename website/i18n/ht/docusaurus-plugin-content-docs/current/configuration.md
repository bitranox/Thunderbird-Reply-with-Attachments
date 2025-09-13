---
id: configuration
title: 'Konfigirasyon'
---

## Konfigirasyon

Terminoloji nòt: gade [Glosè](glossary) pou tèm ki konsistan itilize nan UI ak dokiman yo.

---

## Louvri opsyon nan Thunderbird {#open-options-in-thunderbird}

- Thunderbird → Zouti → Add-ons ak Tèm → jwenn “Reponn ak Atachman” → Preferans/Opsyon

---

### Anviwònman {#settings}

#### Konfimasyon {#confirmation}

- Chanje “Mande anvan ou ajoute atachman”
- Repons default: Wi oswa Non (default fokis & klavye)
- Klavye: Y/J = Wi; N/Echape = Non; Tab/Shift+Tab ak Kle Flèch sikl fokis
  - Gade detay sou klavye nan [Itilizasyon](usage#keyboard-shortcuts).

---

#### Lis nwa (modèl glob) {#blacklist-glob-patterns}

Fichye ki nan lis nwa yo pap ajoute otomatikman lè ou reponn. Gade tou [Glosè](glossary) pou “Lis Nwa (Lè li eksklizyon)”.

- Yon modèl pa liy; ensansib a ka; sèlman non fichye matche
- Egzanp: `*intern*`, `*secret*`, `*passwor*`
- Token glob sipòte: `*` (tout karaktè eksepte `/`), `?` (yon karaktè), klas karaktè tankou `[abc]`. Itilize `\[` pou matche ak yon `[` literal. Chemen (`**/`) yo inyore depi se sèlman non fichye yo ki matche.
- Pa sipòte: negasyon (`!`), elajisman anbras (`{..}`), ak ranje konplèks. Kenbe modèl yo senp.
- Komantè pa sipòte nan modèl yo. Pa enkli `#` oswa komantè anliy; antre sèlman tèks modèl la pa liy.

---

##### Livrezon modèl {#pattern-cookbook}

- Matche nenpòt PDF: `*.pdf`
- Matche fichye ki kòmanse ak “scan”: `scan*`
- Klas karaktè: `report[0-9].txt`
- Echap yon `[` literal: `\[` (itil pou matche yon parantèz kòm yon karaktè)

---

##### Nòt {#blacklist-notes}

- Lòd pa gen enpòtans; premye/ nenpòt ki matche eksklizyon fichye a.
- Matche se sèlman non fichye (chemen/katab yo inyore).
- “Reset to defaults” retabli modèl yo rekòmande ak toggling avètisman lis nwa a.
- Poukisa egzanp `*passwor*`? Li matche ak tou de fanmi “modpas” ak “Passwort”.
- Precedence: si nenpòt modèl matche ak yon non fichye, fichye a eskli (premye/ nenpòt ki matche — lòd pa chanje rezilta a).
- Konsèy — teste modèl ou: ajoute yon modèl tanporè, reponn a yon mesaj ki genyen yon fichye avèk yon non ki matche, epi konfime li eskli nan lis avètisman an.

##### Eseye rapid (tès an sekirite) {#blacklist-try-it}

1. Louvri Opsyon → Lis Nwa.
2. Ajoute yon modèl tanporè tankou `*.tmp` epi klike Sou Sove.
3. Reponn a yon imèl tès ki gen yon fichye ki fini ak `.tmp` — fichye a ta dwe parèt nan lis avètisman an e ki pa atache.
4. Retire modèl tanporè a lè ou fini, oswa klike “Reset to defaults”.

---

#### Avètisman sou atachman ki eskli {#warning-on-excluded-attachments}

- Chanje “Avèti si atachman yo eskli pa lis nwa” (default: ON).
- Lè aktive, yon ti modal liste fichye ki eskli ak modèl ki matche yo. Avètisman an parèt tou lè anyen pap atache paske tout kandida yo te nan lis nwa a.

---

#### Sove anviwònman ou {#save-your-settings}

Anviwònman yo sove pa peze bouton Sove a. Ou ka retounen chan endividyèl manyèlman oswa retabli defaults jan sa nesesè.

Si anviwònman ki estoke yo pa sanble aplike byen, rekòmanse Thunderbird epi eseye ankò. (Thunderbird ka cache eta a atravè sesyon; yon rekòmanse asire ke anviwònman fre yo chaje.)

Konsèy: Pou konfime anviwònman ou te pran, reponn a nenpòt mesaj ki gen yon atachman epi tcheke konfimasyon an oswa avètisman lis nwa a.

---

#### Vizibilite Don (90‑jou snooze) {#donation-visibility}

Add-on an gen yon karakteristik pratik pou kache pwen don pou yon ti tan apre ou te fè don.

Kote pou jwenn li

- Opsyon → Seksyon Sipò: ou ap wè yon bouton “Mwen te fè don” ak yon ti zòn konsèy.
- Dialog Send-confirmation la montre tou yon bouton Don; li otomatikman kache lè snooze a aktif.

Ki jan li mache

- Klike “Mwen te fè don” kache bouton don ak pwen ki gen rapò yo pou 90 jou.
- Yon konsèy estati montre “Kache jiskaske YYYY‑MM‑DD” (nan dat lokal ou). Genyen tou yon bouton “Montre Don ankò” pou retabli vizibilite imedyatman.
- Apre 90 jou, bouton Don la vin vizib otomatikman ankò.

Privasi & depo

- Add-on an estoke yon sèl timestamp nan depo lokal Thunderbird la pou sonje peryòd snooze a. Kle: `donateHideUntil` (milde milisgond).
- Anviwònman sa a lokal nan pwofil Thunderbird ou (pa senkronize nan nwaj). Pa gen demann rezo ki fèt pa karakteristik sa a.

Solisyon

- Si Don toujou montre sou bò dwat apre ou klike sou “Mwen te fè don”, tann yon moman oswa reouvri paj Opsyon yo; UI a ajou dèske anviwònman an sove.
- Pou reyajiste manyèlman, klike sou “Montre Don ankò”. Ou ka tou tann jiskaske dat ki endike nan konsèy la pase.

Karakteristik sa a se sèlman pou pratik; li pa janm bloke fonksyonalite add-on an epi li pa kolekte okenn done pèsonèl.

---

### Normalizasyon non fichye (prevansyon pou doublon) {#filename-normalization-duplicates-prevention}

Pou aji avèk konsistans atravè platfòm yo, non fichye yo normalize anvan tcheke doublon:

- Unicode normalize pou NFC.
- Non yo se tonbe ka (ki pi ba).
- Pwen / espas ki dèyè yo koupe (zanmitay Windows).

Sa kenbe deteksyon doublon predi pou non tankou `café.pdf` vs `café.pdf` (NFD) oswa `FILE.txt.` vs `file.txt`.

---

## Konpòtman konfimasyon {#confirmation-behavior}

- “Repons default” mete bouton ki initialman fokis nan dyalòg konfimasyon an (itil pou itilizatè klavye).
- Li fonksyone pou tou de “Reponn” ak “Reponn tout”. “Avanse” pa modifye pa add-on sa a.

---

## Avanse: deteksyon doublon {#advanced-duplicate-detection}

Prevansyon doublon aplike pa tab konpoze ak pa non fichye. Gade [Itilizasyon](usage#behavior-details) pou yon eksplike detay.

---

Gade tou

- [Permisyon](permissions)
- [Privasi](privacy)
