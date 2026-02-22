---
id: install
title: 'Instalacja'
slug: /install
sidebar_label: 'Instalacja'
---

---

## Instalacja przez "Dodatki i motywy" Thunderbirda {#installation-in-thunderbird-recommended}

:::important Minimalna wersja Thunderbirda
Ten dodatek obsługuje Thunderbirda **128 ESR lub nowszego**. Starsze wersje nie są obsługiwane.
:::

To zalecana metoda instalacji. Dodatki zainstalowane z ATN (addons.thunderbird.net) otrzymują automatyczne aktualizacje. Instalacje LOCAL/dev nie aktualizują się automatycznie.

- Minimalna wersja Thunderbirda: 128 ESR lub nowsza.

1. W Thunderbirdzie przejdź do **Narzędzia > Dodatki i motywy**.
2. Wyszukaj "reply with attachments".
3. Dodaj dodatek.

Lub otwórz stronę dodatku bezpośrednio: [Dodatki Thunderbirda (ATN)](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments)

---

## Ręczna instalacja z XPI {#local-installation-in-thunderbird}

### Pobierz plik XPI {#download-the-xpi-file}

1. Przejdź do [strony dodatku Thunderbirda](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).
2. Pobierz najnowszą wersję dodatku jako plik XPI (`reply_with_attachments-x.y.z-tb.xpi`).

### Instalacja w Thunderbirdzie {#install-in-thunderbird-local}

1. Otwórz Thunderbirda.
2. Przejdź do **Narzędzia > Dodatki i motywy**.
3. W **Menedżerze dodatków** kliknij ikonę koła zębatego w prawym górnym rogu.
4. Z menu wybierz **Zainstaluj dodatek z pliku…**.
5. Wybierz pobrany plik `reply_with_attachments-x.y.z-tb.xpi`.
6. Potwierdź instalację, gdy pojawi się monit.

---

## Instalacja dla deweloperów {#installation-for-development}

### Pobierz repozytorium {#download-the-repository}

1. Pobierz najnowszą wersję repozytorium GitHub.
2. Uruchom `make help` po więcej informacji.

### Instalacja w Thunderbirdzie {#install-in-thunderbird-dev}

1. Otwórz Thunderbirda.
2. Przejdź do **Narzędzia > Dodatki i motywy**.
3. W **Menedżerze dodatków** kliknij ikonę koła zębatego w prawym górnym rogu.
4. Z menu wybierz **Zainstaluj dodatek z pliku…**.
5. Wybierz wygenerowany plik `yyyy-mm-dd...reply-with-attachments-plugin-LOCAL.zip`.
6. Potwierdź instalację, gdy pojawi się monit.

Uwaga: Jeśli Thunderbird nie akceptuje `.zip` w Twoim systemie, zmień jego nazwę na `.xpi` i spróbuj ponownie „Zainstaluj dodatek z pliku…”.

### Gdzie znaleźć plik ZIP LOCAL {#where-local-zip}

- Najpierw spakuj dodatek: uruchom `make pack` w katalogu głównym repozytorium.
- Po spakowaniu znajdź plik ZIP „LOCAL” w katalogu głównym repozytorium (np. `2025-..-reply-with-attachments-plugin-LOCAL.zip`).
- Przed ponownym pakowaniem do testów zwiększ numery wersji zarówno w `sources/manifest_ATN.json`, jak i `sources/manifest_LOCAL.json`.

---

## Wyłączanie, odinstalowanie i aktualizacje {#disable-uninstall-updates}

- Wyłącz: Thunderbird → Narzędzia → Dodatki i motywy → znajdź dodatek → przełącz na wyłączony.
- Odinstaluj: ten sam widok → menu z trzema kropkami → Usuń.
- Aktualizacje: instalacje z ATN aktualizują się automatycznie po zatwierdzeniu nowych wersji. Instalacje LOCAL/dev nie aktualizują się automatycznie; zainstaluj ręcznie nową kompilację LOCAL.
- Całkowite usunięcie ustawień: zobacz [Prywatność → Usuwanie danych](privacy#data-removal).

Zobacz także

- [Szybki start](quickstart)
