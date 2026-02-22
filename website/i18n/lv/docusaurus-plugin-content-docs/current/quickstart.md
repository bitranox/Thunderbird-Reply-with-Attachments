---
id: quickstart
title: 'Ātrā sākšana'
sidebar_label: 'Ātrā sākšana'
---

---

## Ātrā sākšana

:::important Minimālā Thunderbird versija
Šis papildinājums atbalsta Thunderbird **128 ESR vai jaunāku**. Vecākas versijas netiek atbalstītas.
:::

:::note Nav telemetrijas; nav fona tīkla darbību
Papildinājums **ne**apkopo analītiku/telemetriju un neveic **nekādus** fona tīkla pieprasījumus. Tīkla piekļuve notiek tikai tad, kad noklikšķināt uz ārējām saitēm (Dokumentācija, GitHub, Ziedot).
:::

---

### Instalēšana

1. Instalējiet papildinājumu no Thunderbird Add‑ons.
2. Pēc izvēles: Ieslēdziet apstiprinājumu (Opcijas → “Jautāt pirms pielikumu pievienošanas”).
3. Pēc izvēles: Atstājiet ieslēgtu melnā saraksta brīdinājumu (noklusējums): “Brīdināt, ja pielikumi ir izslēgti ar melno sarakstu”.
4. Pēc izvēles: Pievienojiet melnā saraksta paraugus (pa vienam katrā rindā), piem.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Piezīme: “# …” iepriekš ir komentārs šajā dokumentācijā; neiekļaujiet komentārus paraugos, kurus ielīmējat Opcijās. Ievadiet tikai vienu paraugu katrā rindā.

Tagad atbildiet uz ziņojumu ar pielikumiem — sākotnējie tiks pievienoti automātiski vai pēc ātra apstiprinājuma. Ja kādus failus izslēdz jūsu melnais saraksts, redzēsiet īsu brīdinājumu ar to sarakstu.

---

### Pārbaude {#verify}

- Atbildiet uz ziņojumu ar 1–2 pielikumiem un pārliecinieties, ka sākotnējie ir pievienoti jūsu sastādīšanas logā.
- Lai pielāgotu uzvedību, skatiet [Konfigurācija](configuration) (apstiprinājuma pārslēgšana, noklusētā atbilde, melnā saraksta paraugi).

---

### Pārbaudiet melnā saraksta brīdinājumu {#verify-blacklist-warning}

- Atbildiet uz ziņojumu, kurā ir tāds fails kā “secret.txt”.
- Kad ieslēgts “Brīdināt, ja pielikumi ir izslēgti ar melno sarakstu”, mazs dialogs uzskaita izslēgtos failus un atbilstošo paraugu.

Ja neredzat brīdinājumu, pārliecinieties, ka paraugs precīzi atbilst faila nosaukumam (tikai faila nosaukums, reģistrnejutīgs). Skatiet Konfigurācija → Melnais saraksts.

---

### Piezīme par tastatūru {#keyboard-note}

- Apstiprinājuma dialoglogs atbalsta Y/J kā “Jā” un N/Esc kā “Nē”. Dažās nelatīņu tastatūrās burtu taustiņi var atšķirties; Enter apstiprina fokusēto pogu.

---
