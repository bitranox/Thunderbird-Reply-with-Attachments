---
id: quickstart
title: 'Ātrā uzsākšana'
sidebar_label: 'Ātrā uzsākšana'
---

## Ātrā uzsākšana

:::important Minimālā Thunderbird versija
Šis paplašinājums atbalsta Thunderbird **128 ESR vai jaunāku**. Vecākas versijas netiek atbalstītas.
:::

:::note Nav telemetrijas; nav fona tīkla
Pielikums **nenovāc** analītiku/telemetriju un neveic **nav** fona tīkla pieprasījumus. Tīkla piekļuve notiek tikai tad, kad noklikšķināt uz ārējiem saitēm (Dokumenti, GitHub, Ziedot).
:::

---

### Instalēt

1. Instalējiet paplašinājumu no Thunderbird paplašinājumiem.
2. Pēc izvēles: Iespējot apstiprinājumu (Opcijas → “Jautāt pirms pievienot pielikumus”).
3. Pēc izvēles: Atstājiet melnajā sarakstā brīdinājumu ieslēgtu (pēc noklusējuma): “Brīdināt, ja pielikumi tiek izslēgti ar melno sarakstu”.
4. Pēc izvēles: Pievienojiet melnā saraksta paraugus (viens katrā rindā), piemēram:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Piezīme: “# …” iepriekš ir komentārs šajā dokumentācijā; neiekļaujiet komentārus paraugos, kurus ielīmējat Opcijās. Ierakstiet tikai vienu paraugu katrā rindā.

Tagad atbildiet uz ziņu ar pielikumiem — oriģināli tiks pievienoti automātiski vai pēc ātra apstiprinājuma. Ja kādi faili tiek izslēgti no jūsu melnā saraksta, jūs redzēsiet īsu brīdinājumu, kurā tie būs uzskaitīti.

---

### Pārbaudīt {#verify}

- Atbildiet uz ziņu ar 1–2 pielikumiem un apstipriniet, ka oriģināli ir pievienoti jūsu rakstīšanas logam.
- Lai pielāgotu uzvedību, skatiet [Konfigurācija](configuration) (apstiprinājuma pārslēgs, noklusējuma atbilde, melnā saraksta paraugi).

---

### Pārbaudīt melnā saraksta brīdinājumu {#verify-blacklist-warning}

- Atbildiet uz ziņu, kas satur failu, piemēram, “secret.txt”.
- Ja ir iespējots “Brīdināt, ja pielikumi tiek izslēgti ar melno sarakstu”, mazā dialoglodziņā tiks uzskaitīti izslēgtie faili un atbilstošais paraugs.

Ja jūs neredzat brīdinājumu, pārliecinieties, vai paraugs precīzi atbilst faila nosaukumam (tikai faila nosaukums, neievērojot lielos un mazos burtus). Skatiet Konfigurācija → Melnais saraksts.

---

### Tastatūras piezīme {#keyboard-note}

- Apstiprināšanas dialogā tiek atbalstīta Y/J par Jā un N/Esc par Nē. Dažās ne-latīņu klaviatūrās burtu taustiņi var atšķirties; Enter apstiprina fokusēto pogu.

---
