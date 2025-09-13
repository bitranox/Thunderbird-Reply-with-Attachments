---
id: install
title: 'Instalare'
slug: /install
sidebar_label: 'Instalare'
---

## Instalare prin "Add-ons și teme Thunderbird" {#installation-in-thunderbird-recommended}

:::important Versiunea minimă Thunderbird
Acest add-on suportă Thunderbird **128 ESR sau mai recent**. Versiunile mai vechi nu sunt acceptate.
:::

Aceasta este metoda recomandată de instalare. Add-on-urile instalate din ATN (addons.thunderbird.net) primesc actualizări automate. Instalațiile LOCAL/dev nu se actualizează automat.

- Versiunea minimă Thunderbird: 128 ESR sau mai recent.

1. În Thunderbird, mergi la **Instrumente > Add-ons și teme**.
2. Caută "reply with attachments".
3. Adaugă add-on-ul.

Sau deschide pagina add-on-ului direct: [Add‑ons Thunderbird (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Instalare manuală din XPI {#local-installation-in-thunderbird}

### Descarcă fișierul XPI {#download-the-xpi-file}

1. Mergi la pagina [Add‑on Thunderbird](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Descarcă cea mai recentă versiune a add-on-ului ca fișier XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalează în Thunderbird {#install-in-thunderbird-local}

1. Deschide Thunderbird.
2. Mergi la **Instrumente > Add-ons și teme**.
3. În **Managerul de add-on-uri**, dă clic pe pictograma roată din colțul din dreapta sus.
4. Alege **Instalează add-on din fișier…** din meniu.
5. Selectează fișierul descărcat `reply_with_attachments-x.y.z-tb.xpi`.
6. Confirma instalarea când ți se solicită.

---

## Instalare pentru dezvoltare {#installation-for-development}

### Descarcă repository-ul {#download-the-repository}

1. Descarcă cea mai recentă versiune a repository-ului de pe GitHub.
2. Rulează `make help` pentru mai multe informații.

### Instalează în Thunderbird {#install-in-thunderbird-dev}

1. Deschide Thunderbird.
2. Mergi la **Instrumente > Add-ons și teme**.
3. În **Managerul de add-on-uri**, dă clic pe pictograma roată din colțul din dreapta sus.
4. Alege **Instalează add-on din fișier…** din meniu.
5. Selectează fișierul generat `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Confirma instalarea când ți se solicită.

Notă: Dacă Thunderbird nu acceptă `.zip` pe sistemul tău, redenumește-l în `.xpi` și încearcă din nou "Instalează add-on din fișier…".

### Unde să găsești ZIP-ul LOCAL {#where-local-zip}

- Mai întâi, empaquetează add-on-ul: rulează `make pack` în rădăcina repository-ului.
- După empaquetare, găsește zip-ul “LOCAL” în rădăcina repository-ului (de exemplu, `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Înainte de a re-empaqueta pentru testare, crește versiunile în ambele `sources/manifest_ATN.json` și `sources/manifest_LOCAL.json`.

---

## Dezactivează, dezinstalează și actualizări {#disable-uninstall-updates}

- Dezactivează: Thunderbird → Instrumente → Add-ons și teme → găsește add-on-ul → dezactivează.
- Dezinstalează: aceeași vedere → meniu cu trei puncte → Elimină.
- Actualizări: instalațiile ATN se actualizează automat când noile versiuni sunt aprobate. Instalările LOCAL/dev nu se actualizează automat; reinstalează o nouă construcție LOCAL manual.
- Îndepărtează complet setările: vezi [Confidențialitate → Eliminarea datelor](privacy#data-removal).

Vezi și

- [Ghid rapid](quickstart)
