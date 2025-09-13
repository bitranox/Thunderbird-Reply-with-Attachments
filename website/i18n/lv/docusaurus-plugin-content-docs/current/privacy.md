---
id: privacy
title: 'Privātums'
sidebar_label: 'Privātums'
---

## Privātums

:::note Nav telemetrijas; nav fona tīkla
Šis papildinājums **ne** vāc analītiku/telemetriju un **ne** veic fona tīkla pieprasījumus. Jebkāda tīkla piekļuve notiek tikai tad, kad noklikšķināt uz ārējās saites (Dokumenti, GitHub, Ziedot).
:::

Atbilde ar Pielikumiem neapkopo analītiku vai telemetriju un neizsūta jūsu datus nekur.

Ko dara papildinājums:

- Nolasīt pielikumus metadatus un failus no oriģinālās ziņas vietēji (Thunderbird API), lai pievienotu tos jūsu atbildei.
- Saglabā jūsu opcijas (melno sarakstu, apstiprināšanu, noklusējuma atbildi) Thunderbird vietējā krātuvē.

Ko papildinājums nedara:

- Nav izsekošanas, analītikas, avāriju ziņošanas vai attālinātās žurnālfunkcijas.
- Nav fona tīkla pieprasījumu, izņemot kad jūs tieši atverat ārējās saites (Dokumenti, GitHub, Ziedot).

Atļaujas ir dokumentētas [Atļauju](permissions) lapā.

---

## Satura drošības politika (CSP) {#content-security-policy-csp}

Opcijas un izlēgšanas lapas izvairās no iekšējām skriptēm. Visi JavaScript faili ir ielādēti no faili, kas piegādāti ar papildinājumu, lai atbilstu stingrai CSP Thunderbird. Ja jūs iekļaujat koda fragmentus dokumentos, tie ir tikai piemēri un netiek izpildīti papildinājumā.

---

## Datu glabāšana {#data-storage}

- Lietotāju preferences (melnais saraksts, apstiprināšanas pārslēgs, noklusējuma atbilde) tiek glabāti Thunderbird’s `storage.local` šim papildinājumam.
- Papildinājums neveic mākoņu sinhronizāciju.

---

## Tīkls {#network}

- Papildinājums neveic fona tīkla aktivitāti.
- Jebkura tīkla piekļuve notiek tikai tad, kad noklikšķināt uz saites (Dokumenti, GitHub, Ziedot) vai kad pats Thunderbird veic normālas darbības, kas nav saistītas ar šo papildinājumu.

---

## Datu dzēšana {#data-removal}

- Papildinājuma atinstalēšana noņem tā kodu.
- Iestatījumi tiek glabāti tikai Thunderbird’s `storage.local` un tiek noņemti atinstalēšanas laikā; netiek izmantota ārējā krātuve.
- Atjaunot iestatījumus bez atinstalēšanas:
  - Opciju lapa: izmantojiet "Atjaunot uz noklusējuma" melnajam sarakstam un melnā saraksta brīdinājumam.
  - Paplašinātie iestatījumi: Thunderbird → Rīki → Izstrādātāja rīki → Atlaist papildinājumus, atveriet paplašinājuma krātuvi un noskaidrojiet atslēgas, ja nepieciešams.

---
