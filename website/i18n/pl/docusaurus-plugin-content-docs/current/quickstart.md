---
id: quickstart
title: 'Szybki start'
sidebar_label: 'Szybki start'
---

---

## Szybki start

:::important Minimalna wersja Thunderbirda
Ten dodatek obsługuje Thunderbirda w wersji **128 ESR lub nowszej**. Starsze wersje nie są obsługiwane.
:::

:::note Brak telemetrii; brak ruchu sieciowego w tle
Dodatek **nie** zbiera analityki/telemetrii i **nie** wykonuje żadnych żądań sieciowych w tle. Dostęp do sieci następuje tylko po kliknięciu łączy zewnętrznych (Dokumentacja, GitHub, Darowizna).
:::

---

### Instalacja

1. Zainstaluj dodatek z Thunderbird Add‑ons.
2. Opcjonalnie: Włącz potwierdzenie (Opcje → „Pytaj przed dodaniem załączników”).
3. Opcjonalnie: Pozostaw włączone ostrzeżenie czarnej listy (domyślnie): „Ostrzegaj, jeśli załączniki są wykluczone przez czarną listę”.
4. Opcjonalnie: Dodaj wzorce czarnej listy (po jednym w wierszu), np.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Uwaga: „# …” powyżej to komentarz w tej dokumentacji; nie umieszczaj komentarzy we wzorcach wklejanych w Opcjach. Wpisuj tylko po jednym wzorcu na wiersz.

Teraz odpowiedz na wiadomość z załącznikami — oryginały zostaną dodane automatycznie lub po szybkim potwierdzeniu. Jeśli jakieś pliki zostaną wykluczone przez Twoją czarną listę, zobaczysz krótkie ostrzeżenie z ich listą.

---

### Weryfikacja {#verify}

- Odpowiedz na wiadomość z 1–2 załącznikami i potwierdź, że oryginały zostały dodane do okna tworzenia wiadomości.
- Aby dostosować działanie, zobacz [Konfiguracja](configuration) (przełącznik potwierdzenia, domyślna odpowiedź, wzorce czarnej listy).

---

### Sprawdź ostrzeżenie czarnej listy {#verify-blacklist-warning}

- Odpowiedz na wiadomość zawierającą plik taki jak „secret.txt”.
- Gdy opcja „Ostrzegaj, jeśli załączniki są wykluczone przez czarną listę” jest włączona, małe okno dialogowe wyświetli listę wykluczonych plików oraz pasujący wzorzec.

Jeśli nie widzisz ostrzeżenia, upewnij się, że wzorzec dokładnie pasuje do nazwy pliku (tylko nazwa pliku, bez rozróżniania wielkości liter). Zobacz Konfiguracja → Czarna lista.

---

### Uwaga dotycząca klawiatury {#keyboard-note}

- Okno potwierdzenia obsługuje Y/J dla Tak oraz N/Esc dla Nie. Na niektórych klawiaturach nielatynicznych klawisze liter mogą się różnić; Enter potwierdza aktualnie zaznaczony przycisk.

---
