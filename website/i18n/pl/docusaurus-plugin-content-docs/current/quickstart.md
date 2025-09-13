---
id: quickstart
title: 'Szybki start'
sidebar_label: 'Szybki start'
---

## Szybki start

:::important Minimalna wersja Thunderbirda
Ten dodatek wspiera Thunderbirda **128 ESR lub nowszy**. Starsze wersje nie są wspierane.
:::

:::note Brak telemetry; brak sieci w tle
Dodatek **nie** zbiera analityki/telemetrii i **nie** wykonuje żadnych zadań w tle. Dostęp do sieci zachodzi tylko w momencie, gdy klikniesz linki zewnętrzne (Dokumenty, GitHub, Darowizna).
:::

---

### Instalacja

1. Zainstaluj dodatek z dodatków Thunderbirda.
2. Opcjonalnie: Włącz potwierdzenie (Opcje → “Pytaj przed dodaniem załączników”).
3. Opcjonalnie: Pozostaw ostrzeżenie o czarnej liście włączone (domyślnie): “Ostrzeż, jeśli załączniki są wykluczone przez czarną listę”.
4. Opcjonalnie: Dodaj wzorce czarnej listy (po jednym w linii), np.:

```
*intern*
*secret*
*passwor*  # matches both “password” and “Passwort” families
```

Uwaga: “# …” powyżej to komentarz w tej dokumentacji; nie dołączaj komentarzy w wzorcach, które wklejasz w Opcje. Wprowadź tylko jeden wzorzec na linię.

Teraz odpowiedz na wiadomość z załącznikami — oryginały zostaną dodane automatycznie lub po szybkim potwierdzeniu. Jeśli jakiekolwiek pliki są wykluczone przez twoją czarną listę, zobaczysz krótkie ostrzeżenie wyliczające je.

---

### Weryfikacja {#verify}

- Odpowiedz na wiadomość z 1–2 załącznikami i potwierdź, że oryginały zostały dodane do okna komponowania.
- Aby dostosować zachowanie, zobacz [Konfiguracja](configuration) (przełącznik potwierdzenia, domyślna odpowiedź, wzorce czarnej listy).

---

### Weryfikacja ostrzeżenia o czarnej liście {#verify-blacklist-warning}

- Odpowiedz na wiadomość zawierającą plik taki jak “secret.txt”.
- Przy włączonym “Ostrzeż, jeśli załączniki są wykluczone przez czarną listę”, mały dialog wymienia wykluczone pliki i odpowiadający wzorzec.

Jeśli nie widzisz ostrzeżenia, upewnij się, że wzorzec dokładnie pasuje do nazwy pliku (tylko nazwa pliku, bez uwzględniania wielkości liter). Zobacz Konfiguracja → Czarna lista.

---

### Notka o klawiaturze {#keyboard-note}

- Dialog potwierdzenia wspiera Y/J dla Tak i N/Esc dla Nie. Na niektórych klawiaturach niena Latin, klawisze liter mogą się różnić; Enter potwierdza zaznaczony przycisk.
