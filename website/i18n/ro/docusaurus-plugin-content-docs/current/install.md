---
id: install
title: 'Instalare'
slug: /install
sidebar_label: 'Instalare'
---

---

## Instalare prin „Suplimente și teme Thunderbird” {#installation-in-thunderbird-recommended}

:::important Versiunea minimă de Thunderbird
Acest supliment este compatibil cu Thunderbird **128 ESR sau mai nou**. Versiunile mai vechi nu sunt acceptate.
:::

Aceasta este metoda recomandată de instalare. Suplimentele instalate din ATN (addons.thunderbird.net) primesc actualizări automate. Instalările LOCAL/dev nu se actualizează automat.

- Versiune minimă de Thunderbird: 128 ESR sau mai nouă.

1. În Thunderbird, mergi la **Instrumente > Suplimente și teme**.
2. Caută „reply with attachments”.
3. Adaugă suplimentul.

Sau deschide direct pagina suplimentului: [Thunderbird Add‑ons (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalare manuală din XPI {#local-installation-in-thunderbird}

### Descarcă fișierul XPI {#download-the-xpi-file}

1. Mergi la [pagina suplimentului Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Descarcă cea mai recentă versiune a suplimentului ca fișier XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalare în Thunderbird {#install-in-thunderbird-local}

1. Deschide Thunderbird.
2. Mergi la **Instrumente > Suplimente și teme**.
3. În **Managerul de suplimente**, fă clic pe pictograma rotiță din colțul din dreapta sus.
4. Alege din meniu **Instalează supliment din fișier…**.
5. Selectează fișierul `reply_with_attachments-x.y.z-tb.xpi` descărcat.
6. Confirmă instalarea când ți se solicită.

---

## Instalare pentru dezvoltare {#installation-for-development}

### Descarcă depozitul {#download-the-repository}

1. Descarcă cea mai recentă versiune a depozitului GitHub.
2. Rulează `make help` pentru mai multe informații.

### Instalare în Thunderbird {#install-in-thunderbird-dev}

1. Deschide Thunderbird.
2. Mergi la **Instrumente > Suplimente și teme**.
3. În **Managerul de suplimente**, fă clic pe pictograma rotiță din colțul din dreapta sus.
4. Alege din meniu **Instalează supliment din fișier…**.
5. Selectează fișierul generat `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirmă instalarea când ți se solicită.

Notă: Dacă Thunderbird nu acceptă `.zip` pe sistemul tău, redenumește-l în `.xpi` și încearcă din nou „Instalează supliment din fișier…”.

### Unde găsești arhiva ZIP LOCAL {#where-local-zip}

- Mai întâi, împachetează suplimentul: rulează `make pack` în rădăcina depozitului.
- După împachetare, găsește arhiva „LOCAL” în rădăcina depozitului (de ex., `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Înainte de reîmpachetare pentru testare, mărește versiunile atât în `sources/manifest_ATN.json`, cât și în `sources/manifest_LOCAL.json`.

---

## Dezactivare, dezinstalare și actualizări {#disable-uninstall-updates}

- Dezactivare: Thunderbird → Instrumente → Suplimente și teme → găsește suplimentul → comută pe dezactivat.
- Dezinstalare: aceeași vizualizare → meniul cu trei puncte → Elimină.
- Actualizări: instalările din ATN se actualizează automat când sunt aprobate versiuni noi. Instalările LOCAL/dev nu se actualizează automat; reinstalează manual o nouă versiune LOCAL.
- Elimină complet setările: vezi [Confidențialitate → Eliminarea datelor](privacy#data-removal).

Vezi și

- [Ghid de pornire rapidă](quickstart)
