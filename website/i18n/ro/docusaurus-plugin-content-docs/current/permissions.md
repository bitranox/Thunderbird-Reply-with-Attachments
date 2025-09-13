---
id: permissions
title: 'Permisiuni'
---

## Permisiuni

:::note Permisiuni minime
Nici o permisiune de gazdă (web) nu este solicitată de acest add-on. Add-on-ul nu colectează telemetrie și nu efectuează cereri de rețea în fundal. Vezi [Confidențialitate](privacy).
:::

---

Add-on-ul solicită un set restrâns și concentrat de permisiuni doar. De ce fiecare este necesară:

- `compose`: observă evenimentele de compunere, listează/adaugă atașamente în răspunsul tău.
- `messagesRead`: citește metadatele și obține fișierele atașate din mesajul original.
- `scripting`: injectează dialogul mic de confirmare în compunere când este activat.
- `windows`: deschide o fereastră mică de confirmare ca o ultimă soluție atunci când trimiterea de mesaje eșuează.
- `sessions`: stochează un flag pe tab-ul respectiv pentru a evita procesarea duplicată.
- `storage`: menține opțiunile (liste negre, comutator de confirmare, răspuns implicit).
- `tabs`: mesaje țintite către tab-ul de compunere pentru cereri de confirmare.

Note suplimentare:

- Nici o permisiune de gazdă (origini web) nu este solicitată de acest add-on.
- Permisiunea `tabs` este folosită doar pentru a viza tab-ul de compunere atunci când se coordonează dialogul opțional de confirmare; nu este folosită pentru a citi istoricul or naviga între pagini.

Acestea sunt documentate în sursă și testate în CI. Add-on-ul nu colectează telemetrie.

---

### Rezumat (permisiuni → scop) {#permissions-summary}

| Permisiune     | De ce este necesară                                                                |
| -------------- | ---------------------------------------------------------------------------------- |
| `compose`      | Observă evenimentele de compunere; listează și adaugă atașamente în răspunsul tău. |
| `messagesRead` | Listează atașamentele mesajului original și obține datele fișierului.              |
| `scripting`    | Injectează/coordonatează o interfață ușoară pentru confirmare când este activată.  |
| `windows`      | Fereastră de rezervă dacă trimiterea de mesaje eșuează (rar).                      |
| `sessions`     | Stochează un flag pe tab-ul respectiv pentru a preveni procesarea duplicată.       |
| `storage`      | Menține opțiunile (liste negre, comutator de confirmare, răspuns implicit).        |
| `tabs`         | Mesaje țintite către tab-ul de compunere pentru cereri de confirmare.              |
| (perms gazdă)  | Niciuna — add-on-ul nu solicită origini web.                                       |

---

## Niciodată solicitate {#not-requested}

- `compose.save`, `compose.send` — add-on-ul nu salvează sau trimite mesaje în numele tău.

Vezi de asemenea: [Confidențialitate](privacy) — fără telemetrie, fără rețea în fundal, doar linkuri inițiate de utilizator.

---
