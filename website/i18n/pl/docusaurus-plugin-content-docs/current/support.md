---
id: support
title: 'Wsparcie'
sidebar_label: 'Wsparcie'
---

## FAQ {#faq}

### Załączniki nie zostały dodane — dlaczego?

- Obrazy w treści i części S/MIME są celowo wykluczone.
- Zduplikowane nazwy plików są pomijane, jeśli wiadomość już zawiera ten sam plik.
- Wzorce z czarnej listy mogą filtrować kandydatów; zobacz [Konfiguracja](configuration#blacklist-glob-patterns).

### Czy mogę potwierdzić przed dodaniem załączników?

Tak. Włącz „Zapytaj przed dodaniem załączników” w [Konfiguracji → Potwierdzenie](configuration#confirmation). Klawiatura: Y/J = Tak, N/Esc = Nie.

### Czy dodatek wysyła jakieś dane lub śledzi użycie?

Nie. Zobacz [Prywatność](privacy) — brak telemetrii i żadnych żądań sieciowych w tle.

### Przekazywanie nie dodaje załączników — czy to normalne?

Tak. Tylko Odpowiedź i Odpowiedz wszystkim są modyfikowane przez ten dodatek; Przekazywanie pozostaje bez zmian. Zobacz [Ograniczenia](usage#limitations).

### Gdzie znajduje się przycisk 'Darowizna'?

Opcje → sekcja Wsparcie. Zobacz [Widoczność darowizn](configuration#donation-visibility).

---

## Wsparcie

Potrzebujesz pomocy lub chcesz zgłosić błąd?

---

### Zgłoś problem na GitHubie:

- Repozytorium: `bitranox/Thunderbird-Reply-with-Attachments`
- Problemy: https://github.com/bitranox/Thunderbird-Reply-with-Attachments/issues
- Dołącz wersję Thunderbirda (np. 128 ESR), system operacyjny oraz kroki do reprodukcji
- Dołącz odpowiednie logi z Konsoli błędów Thunderbirda (Narzędzia → Narzędzia dewelopera → Konsola błędów)

- Strona dodatków (ATN): Możesz również zostawić uwagi za pośrednictwem [strony dodatku](https://addons.thunderbird.net/thunderbird/addon/reply-with-attachments).

---

### Wskazówki

- Upewnij się, że korzystasz z obsługiwanej wersji Thunderbirda (128 ESR lub nowszej).
- Sprawdź dokumentację Konfiguracji i Użytkowania w przypadku typowych pytań dotyczących konfiguracji.
- W przypadku rozwoju/testowania zobacz przewodnik po rozwoju.
- Jeśli przechowywane ustawienia wydają się nie działać prawidłowo, uruchom ponownie Thunderbirda i spróbuj ponownie. (Thunderbird może pamiętać stan między sesjami; ponowne uruchomienie zapewnia załadowanie świeżych ustawień.)
- Minimalne repro: spróbuj z małą wiadomością testową zawierającą jeden lub dwa proste załączniki.
- Porównaj zachowanie z potwierdzeniem WŁĄCZONYM w porównaniu do WYŁĄCZONEGO, aby zawęzić, czy kontekst dialogowy jest zaangażowany.

---

### Co uwzględnić w raporcie

- Wersja Thunderbirda i system operacyjny
- Dokładne kroki do reprodukcji (co zrobiłeś, czego się spodziewałeś, co się stało)
- Czy potwierdzenie było włączone oraz twoje domyślne ustawienie odpowiedzi
- Przykład wzorców z czarnej listy (jeśli dotyczy)
- Logi Konsoli błędów podczas reprodukcji (Narzędzia → Narzędzia dewelopera → Konsola błędów)
- Włącz logowanie debugowania (opcjonalnie):
  - Uruchom w Konsoli błędów Thunderbirda: `messenger.storage.local.set({ debug: true })`
  - Reprodukuj problem i skopiuj odpowiednie linie logów `[RWA]`

---

### Szablon zgłoszenia (kopiuj/wklej) {#issue-template}

- Wersja Thunderbirda i system operacyjny:
- Kroki do reprodukcji:
- Potwierdzenie włączone? Domyślna odpowiedź:
- Przykładowe wzorce czarnej listy:
- Logi Konsoli błędów (Narzędzia → Narzędzia dewelopera → Konsola błędów):
- Cokolwiek innego istotnego:

---

### Darowizna

Jeśli chcesz wspierać ten projekt, rozważ proszę mały wkład na stronie [Darowizna](donation). Dziękujemy!

---
