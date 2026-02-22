---
id: features
title: 'Funcționalități'
sidebar_label: 'Funcționalități'
---

---

## Caracteristici {#features}

- Atașează automat fișierele din e-mailul original când răspundeți.
- Comportament configurabil: atașamentele pot fi
  - adăugate automat, sau
  - adăugate doar după confirmare (un mic dialog accesibil). În Opțiuni
    puteți activa confirmarea și alege răspunsul implicit (Da/Nu).
- O listă neagră de nume de fișiere (modele glob) împiedică anumite fișiere să fie
  atașate automat. Exemple: `*intern*`, `*secret*`, `*passwor*`.
  Potrivirea nu ține cont de majuscule/minuscule și verifică doar numele fișierului; furnizați un model
  pe linie în Opțiuni.
- Avertizare pentru lista neagră (opțională, activată implicit): când fișierele sunt excluse de
  lista neagră, un mic modal listează fișierul și modelul(ele) care se potrivesc. Compatibil cu
  modul întunecat și accesibil de la tastatură (Enter/Esc pentru închidere).
- Funcționează cu Răspunde și Răspunde tuturor. Redirecționarea nu este modificată de acest supliment.
- Adaugă originale chiar dacă ați atașat deja ceva; evită duplicatele după numele fișierului.
- Protecția împotriva duplicatelor per filă previne adăugarea dublă în aceeași filă de compunere.
- Omite certificatele S/MIME în mod implicit pentru a evita atașamentele inutile.
- Include imagini inline (implicit: ACTIV). Imaginile încorporate sunt restaurate direct în
  corpul răspunsului ca URI-uri de date base64, păstrând aranjamentul inline original. Dezactivați în
  Opțiuni pentru a omite complet imaginile inline.

---

## Cum funcționează {#how-it-works}

- La răspuns, suplimentul listează atașamentele originale.
- Filtrează semnăturile S/MIME din atașamentele de fișiere; imaginile inline sunt restaurate în corp (dacă nu sunt dezactivate).
- Poate solicita confirmare (prietenoasă cu tastatura).
- Adaugă fișierele eligibile în fereastra de compunere, evitând duplicatele după numele fișierului.
- Consultați „De ce este posibil ca atașamentele să nu fie adăugate” în Utilizare pentru cazuri speciale.

Notă privind confidențialitatea: Toată procesarea are loc local în Thunderbird. Suplimentul nu face nicio cerere de rețea în fundal.

---
