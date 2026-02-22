---
id: usage
title: 'Bosaleli'
sidebar_label: 'Bosaleli'
---

---

## Bosaleli {#usage}

- Soki ozongisi (Reply), add‑on ebakisi ba pièces d’origine na ndenge ya automatique — to etuna liboso, soki esalemi na Options.
- Kokanga ba doublons esalemaka kolanda kombo ya fisyé; biteni ya S/MIME babwakamaka ntango nyonso. Bifóto ya kati (inline) ezongisamaka na nzoto ya eyano (reply body) na ndenge ya liboso (okoki kokanga yango na "Include inline pictures" na Options).
- Ba pièces oyo ezali na blacklist mpe babwakamaka (ba modèle glob ya kolanda ba kombo ya fisyé kaka, ezangaka kososola minúscule/majúscule; banzela te). Talá [Configuration](configuration#blacklist-glob-patterns).

---

### Eloko esalemaka soki ozongisi {#what-happens}

- Koyeba eyano → kosangisa liste ya ba pièces d’origine → kofiltrɛ S/MIME + ya kati (inline) → kondimisa soki esengeli → kobakisa ba fisyé oyo ekoki (kobwaka ba doublons) → kozongisa bifóto ya kati na nzoto ya mokanda.

Koleka makasi (strict) vs. koleka pɛtɛɛ (relaxed): Add‑on ebosaka liboso biteni ya S/MIME mpe ya kati (inline) na ba pièces jointes ya fisyé. Soki eloko moko te ekokani, esalaka koleka pɛtɛɛ oyo kaka ebosaka S/MIME/inline kasi endimi ba kesɛ ebele koleka (talá makambo ya kódi). Bifóto ya kati te bazali kobakisa yango lokola ba pièces jointes; na esika wana, soki "Include inline pictures" esalemi (ndakisa ya liboso), bazingamaka mbala moko na nzoto ya eyano lokola base64 data URIs.

| Lolenge ya eteni                                               |                               Koleka makasi |                                Koleka pɛtɛɛ |
| -------------------------------------------------------------- | ------------------------------------------: | ------------------------------------------: |
| Fisiye ya emekeli (signature) ya S/MIME `smime.p7s`            |                                    Ebwakami |                                    Ebwakami |
| Ba lolenge ya MIME ya S/MIME (`application/pkcs7-*`)           |                                    Ebwakami |                                    Ebwakami |
| Elilingi ya kati oyo Content‑ID etindisi (`image/*`)           | Ebwakami (ezongisami na nzoto ya mokanda\*) | Ebwakami (ezongisami na nzoto ya mokanda\*) |
| E‑mail ekangami (`message/rfc822`) oyo ezali na kombo ya fisyé |                                Ebakisami te |                            Ekoki kobakisama |
| Pièce jointe ya fisyé ya normal oyo ezali na kombo             |                            Ekoki kobakisama |                            Ekoki kobakisama |

\* Soki "Include inline pictures" esalemi (liboso: ON), bifóto ya kati bazingamaka na nzoto ya eyano lokola base64 data URIs na esika ya kobakisa yango lokola ba pièces jointes. Talá [Configuration](configuration#include-inline-pictures).

Ndakisa: Ba pièces mosusu ekoki kozanga ba header mosusu kasi ezalaka naino ba fisyé ya normal (ezali te ya kati/S/MIME). Soki koleka makasi emoni ata moko te, koleka pɛtɛɛ ekoki kondima yango mpe ekangisa yango.

---

### Kokangisa na biteni mosusu {#cross-reference}

- Forward ebongolamaka te na mokano (talá Limitations awa na nse).
- Mpo na bantina oyo pièce moko ekoki kobakisama te, talá “Mpo na nini ba pièces ekoki kobakisama te”.

---

## Makambo ya ndenge esalaka {#behavior-details}

- **Koboya ba doublons:** Add‑on etyá elembo na onglet ya kobongisa (compose) lokola esalemi, na kosalela motuya ya session ya onglet moko‑na‑moko mpe garde na mémoire. Ekobakisa ba ya ebandeli mbala mibale te.
- Kokanga mpe kofungola lisusu fenetre ya kobongisa etalelamaka lokola onglet ya sika (elingi koloba, komeka lisusu endimami).
- **Kokumisa ba pièces ezali déjà:** Soki compose ezali déjà na ba pièces, ba ya ebandeli ekobakisama kaka mbala moko, mpe ba kombo ya fisyé oyo ezali déjà ekobwakama.
- **Ebwakiseli:** Biteni ya S/MIME mpe bifóto ya kati babwakami na ba pièces jointes. Soki eloko moko te ekokani na koleka ya liboso, koleka pɛtɛɛ ya sika ekomisala lisusu biteni oyo ezali te ya S/MIME. Bifóto ya kati esalelamaka na ndenge mosusu: bazongisamaka na nzoto ya eyano lokola data URIs (soki esalemi).
  - **Ba kombo ya fisyé:** `smime.p7s`
  - **Ba lolenge ya MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Bifóto ya kati (inline):** eteni nyonso `image/*` oyo Content‑ID etindisi — ebwakami na ba pièces jointes kasi ezingamaka na nzoto ya eyano tango "Include inline pictures" ezali ON
  - **Ba e‑mail ekangami (`message/rfc822`):** emonamaka lokola ba pièces ya normal soki ezali na kombo ya fisyé; ekoki kobakisama (kolandana na kontrola ya doublon mpe blacklist).
- **Litoló ya blacklist (soki esalemi):** Tango bakandida babwakami na blacklist na yo,
  add‑on emonisaka mwa modal moke oyo ezali na liste ya ba fisyé oyo ebɛtami mpe ba modèle oyo ekokani.
  Litoló oyo emonanaka mpe soki ata pièce moko te ekobakisama mpo nyonso ebwakami.

---

## Bokuse ya klavye {#keyboard-shortcuts}

- Liyangani ya kondimisa: Y/J = Ee, N/Esc = Te; Tab/Shift+Tab mpe ba Arrow keys ebongolaka focus.
  - “Eyano ya liboso” na [Configuration](configuration#confirmation) etia bouton ya liboso na focus.
  - Enter esalisa bouton oyo ezali na focus. Tab/Shift+Tab mpe ba fleches ebongola focus mpo na kobɔngisa kokota.

### Lisalisi ya bokuse ya klavye {#keyboard-cheat-sheet}

| Bakle           | Misala                             |
| --------------- | ---------------------------------- |
| Y / J           | Kondimisa Ee                       |
| N / Esc         | Kondimisa Te                       |
| Enter           | Kobatisa bouton oyo ezali na focus |
| Tab / Shift+Tab | Kokatisa focus liboso/na sima      |
| Ba Arrow keys   | Kokatisa focus kati na ba bouton   |
| Eyano ya liboso | Etia focus ya ebandeli (Ee to Te)  |

---

## Bindelo {#limitations}

- Forward ebongolamaka te na add‑on oyo (Reply mpe Reply all esungami).
- Ba pièces monene mingi ekoki kozwa mindelo ya Thunderbird to ya mutu azali kopesa service.
  - Add‑on ekabolaka to ekomisaka moke (compress) ba fisyé te; etekelemi na ndenge ya Thunderbird ya kosala na ba pièces jointes.
- Mikanda ebombami (encrypted): biteni ya S/MIME babwakami na mokano.

---

## Mpo na nini ba pièces jointes ekoki kobakisama te {#why-attachments-might-not-be-added}

- Bifóto ya kati (inline) babakisamaka te lokola ba pièces jointes. Tango "Include inline pictures" ezali ON (ndakisa ya liboso), bazingamaka na nzoto ya eyano lokola data URIs. Soki etindami OFF, bifóto ya kati elongolamaka mobimba. Talá [Configuration](configuration#include-inline-pictures).
- Biteni ya emekeli (signature) ya S/MIME babwakami na mokano: ba kombo ya fisyé lokola `smime.p7s` mpe ba lolenge ya MIME lokola `application/pkcs7-signature` to `application/pkcs7-mime` babwakamaka.
- Ba modèle ya blacklist ekoki kofiltrɛ bakandida: talá [Configuration](configuration#blacklist-glob-patterns); kokokana ezali case‑insensitive mpe esalemi kaka na kombo ya fisyé.
- Ba kombo ya fisyé oyo ezali kopɔnaná (doublon) babakisamaka lisusu te: soki compose ezali déjà na fisyé na kombo yango (osilaki kosimbisa), ebwakami.
- Biteni oyo ezali te fisyé to ezangi kombo ya fisyé: kaka biteni lokola fisyé oyo ezali na kombo oyo ekoki kosalelama nde bakanisaka kobakisa.

---

Talá mpe

- [Configuration](configuration)
