---
id: quickstart
title: 'Vinnige begin'
sidebar_label: 'Kitsbegin'
---

---

## Vinnige begin

:::important Minimum Thunderbird-weergawe
Hierdie byvoeging ondersteun Thunderbird **128 ESR of nuwer**. Ouer weergawes word nie ondersteun nie.
:::

:::note Geen telemetrie; geen agtergrondnetwerk
Die byvoeging versamel **nie** ontledings/telemetrie nie en maak **geen** agtergrondnetwerkversoeke nie. Netwerktoegang vind slegs plaas wanneer jy op eksterne skakels klik (Dokumentasie, GitHub, Skenk).
:::

---

### Installeer

1. Installeer die byvoeging vanaf Thunderbird Add‑ons.
2. Opsioneel: Skakel bevestiging aan (Opsies → “Vra voordat aanhegsels bygevoeg word”).
3. Opsioneel: Laat die swartlyswaarskuwing aangeskakel (verstek): “Waarsku as aanhegsels deur swartlys uitgesluit word”.
4. Opsioneel: Voeg swartlyspatrone by (een per reël), bv.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Let wel: Die “# …” hierbo is ’n opmerking in hierdie dokumentasie; moenie opmerkings in patrone insluit wat jy in Opsies plak nie. Voer slegs een patroon per reël in.

Antwoord nou op ’n boodskap met aanhegsels — oorspronklikes sal outomaties bygevoeg word of ná ’n vinnige bevestiging. As enige lêers deur jou swartlys uitgesluit word, sal jy ’n kort waarskuwing sien wat hulle lys.

---

### Verifieer {#verify}

- Antwoord op ’n boodskap met 1–2 aanhegsels en bevestig dat die oorspronklikes by jou opstelvenster gevoeg is.
- Om gedrag aan te pas, sien [Konfigurasie](configuration) (bevestigingskakelaar, verstekantwoord, swartlyspatrone).

---

### Verifieer swartlyswaarskuwing {#verify-blacklist-warning}

- Antwoord op ’n boodskap wat ’n lêer soos “secret.txt” bevat.
- Met “Waarsku as aanhegsels deur swartlys uitgesluit word” geaktiveer, lys ’n klein dialoog die uitgeslote lêers en die ooreenstemmende patroon.

As jy nie ’n waarskuwing sien nie, maak seker die patroon stem presies met die lêernaam ooreen (slegs lêernaam, ongevoelig vir hoof-/kleinletters). Sien Konfigurasie → Swartlys.

---

### Sleutelbordnota {#keyboard-note}

- Die bevestigingsdialoog ondersteun Y/J vir Ja en N/Esc vir Nee. Op sommige nie-Latynse sleutelborde kan die lettertoetse verskil; Enter bevestig die gefokusde knoppie.

---
