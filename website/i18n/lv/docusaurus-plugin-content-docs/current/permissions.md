---
id: permissions
title: 'Atļaujas'
---

## Atļaujas

:::note Minimālās atļaujas
Šis papildinājums nepieprasa nekādas hosta (web) atļaujas. Papildinājums nesavāc telemetriju un neveic fona tīkla pieprasījumus. Apskatiet [Privātums](privacy).
:::

---

Papildinājums pieprasa tikai nelielu, mērķtiecīgu atļauju kopumu. Kāpēc katra ir nepieciešama:

- `compose`: novērot sastādīšanas notikumus, uzskaitīt/pievienot pielikumus jūsu atbildē.
- `messagesRead`: lasīt metadatus un iegūt pielikumu failus no oriģinālās ziņas.
- `scripting`: injicēt mazu apstiprinājuma dialogu, kad tas ir iespējots.
- `windows`: atvērt mazu apstiprinājuma uznirstošo logu kā pēdējo iespēju, kad ziņojums neizdodas.
- `sessions`: glabāt katras cilnes flagu, lai novērstu dubultu apstrādi.
- `storage`: saglabāt opcijas (melnais saraksts, apstiprinājuma slēdzis, noklusējuma atbilde).
- `tabs`: mērķtiecīga ziņošana uz sastādīšanas cilni apstiprinājuma pieprasījumiem.

Papildu piezīmes:

- Šis papildinājums nepieprasa nekādas hosta atļaujas (web izcelsmes).
- `tabs` atļauja tiek izmantota tikai, lai mērķētu uz sastādīšanas cilni, koordinējot opciju apstiprinājuma dialogu; tā netiek izmantota, lai lasītu vēsturi vai pārvietotos pa lapām.

Šie ir dokumentēti avotā un testēti CI. Papildinājums nesavāc telemetriju.

---

### Kopsavilkums (atļaujas → mērķis) {#permissions-summary}

| Atļauja        | Kāpēc tā ir nepieciešama                                                             |
| -------------- | ------------------------------------------------------------------------------------ |
| `compose`      | Novērot sastādīšanas notikumus; uzskaitīt un pievienot pielikumus jūsu atbildē.      |
| `messagesRead` | Uzskaitīt oriģinālās ziņas pielikumus un iegūt faila datus.                          |
| `scripting`    | Injicēt/koordinēt vieglo lietotāja interfeisu apstiprinājumam, kad tas ir iespējots. |
| `windows`      | Rezerves uznirstošais logs, ja ziņojums neizdodas (reti).                            |
| `sessions`     | Glabāt katras cilnes flagu, lai novērstu dubultu apstrādi.                           |
| `storage`      | Saglabāt opcijas (melnais saraksts, apstiprinājuma slēdzis, noklusējuma atbilde).    |
| `tabs`         | Mērķtiecīga ziņošana uz sastādīšanas cilni apstiprinājuma pieprasījumiem.            |
| (host perms)   | Nav — papildinājums nepieprasa web izcelsmes.                                        |

---

## Netiek pieprasīts {#not-requested}

- `compose.save`, `compose.send` — papildinājums nesaglabā vai nesūta e-pastu jūsu vārdā.

Skatiet arī: [Privātums](privacy) — neviena telemetrija, nav fona tīkla, tikai lietotāja uzsākti saites.
