---
id: usage
title: 'Utilizare'
sidebar_label: 'Utilizare'
---

---

## Utilizare {#usage}

- Răspunde, iar suplimentul adaugă originalele automat — sau cere confirmare mai întâi, dacă este activat în Opțiuni.
- De‑duplicare după numele fișierului; părțile S/MIME sunt întotdeauna omise. Imaginile inline sunt restabilite în corpul răspunsului în mod implicit (dezactivezi prin „Include inline pictures” în Opțiuni).
- Atașamentele de pe lista neagră sunt, de asemenea, omise (modele glob insensibile la majuscule/minuscule care se potrivesc numelor de fișiere, nu căilor). Vezi [Configurare](configuration#blacklist-glob-patterns).

---

### Ce se întâmplă la răspuns {#what-happens}

- Detectează răspunsul → listează atașamentele originale → filtrează S/MIME + inline → confirmare opțională → adaugă fișierele eligibile (omite duplicatele) → restabilește imaginile inline în corp.

Trecere strictă vs. relaxată: Suplimentul exclude mai întâi părțile S/MIME și inline din atașamentele de fișiere. Dacă nimic nu se califică, rulează o trecere relaxată care în continuare exclude S/MIME/inline, dar tolerează mai multe cazuri (vezi Detalii cod). Imaginile inline nu sunt niciodată adăugate ca atașamente de fișiere; în schimb, când „Include inline pictures” este activată (implicit: ON), acestea sunt încorporate direct în corpul răspunsului ca URI‑uri de date base64.

| Tip de parte                                                        |                 Trecere strictă |                Trecere relaxată |
| ------------------------------------------------------------------- | ------------------------------: | ------------------------------: |
| Fișier semnătură S/MIME `smime.p7s`                                 |                         Exclusă |                         Exclusă |
| Tipuri MIME S/MIME (`application/pkcs7-*`)                          |                         Excluse |                         Excluse |
| Imagine inline la care se face referire prin Content‑ID (`image/*`) | Exclusă (restabilită în corp\*) | Exclusă (restabilită în corp\*) |
| E‑mail atașat (`message/rfc822`) cu un nume de fișier               |                 Nu este adăugat |                Poate fi adăugat |
| Atașament de fișier obișnuit cu un nume de fișier                   |                Poate fi adăugat |                Poate fi adăugat |

\* Când „Include inline pictures” este activată (implicit: ON), imaginile inline sunt încorporate în corpul răspunsului ca URI‑uri de date base64 în loc să fie adăugate ca atașamente de fișiere. Vezi [Configurare](configuration#include-inline-pictures).

Exemplu: Unele atașamente pot să nu aibă anumite antete, dar sunt totuși fișiere obișnuite (nu inline/S/MIME). Dacă trecerea strictă nu găsește niciunul, trecerea relaxată le poate accepta și le poate atașa.

---

### Trimiteri încrucișate {#cross-reference}

- Redirecționarea nu este modificată prin concepție (vezi Limitări mai jos).
- Pentru motivele pentru care un atașament ar putea să nu fie adăugat, vezi „De ce este posibil ca atașamentele să nu fie adăugate”.

---

## Detalii despre comportament {#behavior-details}

- **Prevenirea duplicatelor:** Suplimentul marchează fila de compunere ca procesată folosind o valoare de sesiune per filă și un mecanism de protecție în memorie. Nu va adăuga originalele de două ori.
- Închiderea și redeschiderea unei ferestre de compunere este tratată ca o filă nouă (adică este permisă o nouă încercare).
- **Respectarea atașamentelor existente:** Dacă în compunere există deja unele atașamente, originalele sunt totuși adăugate exact o dată, sărind peste numele de fișiere care există deja.
- **Excluderi:** Artefactele S/MIME și imaginile inline sunt excluse din atașamentele de fișiere. Dacă la prima trecere nu se califică nimic, o trecere de rezervă, mai relaxată, reverifică părțile non‑S/MIME. Imaginile inline sunt tratate separat: sunt restabilite în corpul răspunsului ca URI‑uri de date (când este activată).
  - **Nume de fișiere:** `smime.p7s`
  - **Tipuri MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Imagini inline:** orice parte `image/*` la care se face referire prin Content‑ID — exclusă din atașamentele de fișiere, dar încorporată în corpul răspunsului când „Include inline pictures” este ON
  - **E‑mailuri atașate (`message/rfc822`):** tratate ca atașamente obișnuite dacă au un nume de fișier; pot fi adăugate (sub rezerva verificărilor de duplicate și a listei negre).
- **Avertisment pentru lista neagră (dacă este activat):** Când candidații sunt excluși de lista ta neagră,
  suplimentul afișează un mic dialog modal care enumeră fișierele afectate și
  modelul(ele) care se potrivesc. Acest avertisment apare și în cazurile în care nu vor fi
  adăugate atașamente deoarece totul a fost exclus.

---

## Comenzi rapide de la tastatură {#keyboard-shortcuts}

- Dialog de confirmare: Y/J = Da, N/Esc = Nu; Tab/Shift+Tab și tastele săgeată comută focalizarea.
  - „Răspunsul implicit” din [Configurare](configuration#confirmation) setează butonul focalizat inițial.
  - Enter declanșează butonul focalizat. Tab/Shift+Tab și săgețile mută focalizarea pentru accesibilitate.

### Fișă de comenzi pentru tastatură {#keyboard-cheat-sheet}

| Taste            | Acțiune                                  |
| ---------------- | ---------------------------------------- |
| Y / J            | Confirmă Da                              |
| N / Esc          | Confirmă Nu                              |
| Enter            | Activează butonul focalizat              |
| Tab / Shift+Tab  | Mută focalizarea înainte/înapoi          |
| Tastele săgeată  | Mută focalizarea între butoane           |
| Răspuns implicit | Setează focalizarea inițială (Da sau Nu) |

---

## Limitări {#limitations}

- Redirecționarea nu este modificată de acest supliment (Răspunde și Răspunde tuturor sunt acceptate).
- Atașamentele foarte mari pot fi supuse limitărilor Thunderbird sau ale furnizorului.
  - Suplimentul nu fragmentează și nu comprimă fișierele; se bazează pe gestionarea normală a atașamentelor din Thunderbird.
- Mesaje criptate: părțile S/MIME sunt excluse intenționat.

---

## De ce este posibil ca atașamentele să nu fie adăugate {#why-attachments-might-not-be-added}

- Imaginile inline nu sunt adăugate ca atașamente de fișiere. Când „Include inline pictures” este ON (implicit), ele sunt încorporate în corpul răspunsului ca URI‑uri de date. Dacă setarea este OFF, imaginile inline sunt eliminate complet. Vezi [Configurare](configuration#include-inline-pictures).
- Părțile de semnătură S/MIME sunt excluse prin concepție: nume de fișiere precum `smime.p7s` și tipuri MIME precum `application/pkcs7-signature` sau `application/pkcs7-mime` sunt omise.
- Modelele de listă neagră pot filtra candidații: vezi [Configurare](configuration#blacklist-glob-patterns); potrivirea nu ține cont de majuscule/minuscule și se face doar după numele fișierului.
- Numele de fișier duplicate nu sunt readăugate: dacă în compunere există deja un fișier cu același nume normalizat, acesta este omis.
- Părți non‑fișier sau lipsa numelor de fișier: sunt luate în considerare pentru adăugare doar părțile de tip fișier, cu nume utilizabile.

---

Vezi și

- [Configurare](configuration)
