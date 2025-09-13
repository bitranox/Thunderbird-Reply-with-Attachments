---
id: permissions
title: 'Uprawnienia'
---

## Uprawnienia

:::note Minimalne uprawnienia
Ten dodatek nie żąda żadnych uprawnień hosta (web). Dodatek nie zbiera danych telemetrycznych ani nie wykonuje zadań w tle. Zobacz [Prywatność](privacy).
:::

---

Dodatek wymaga tylko małego, ukierunkowanego zestawu uprawnień. Dlaczego każde z nich jest potrzebne:

- `compose`: obserwuj zdarzenia komponowania, dodawaj/pokazuj załączniki w swojej odpowiedzi.
- `messagesRead`: odczytuj metadane i pobieraj pliki załączników z oryginalnej wiadomości.
- `scripting`: wstrzykuj mały dialog potwierdzenia w polu kompozycji, gdy jest włączony.
- `windows`: otwieraj małe okno potwierdzenia jako ostateczność, gdy wiadomość się nie powiedzie.
- `sessions`: przechowuj flagę per-zakładka, aby uniknąć duplikacji przetwarzania.
- `storage`: zachowuj opcje (czarna lista, przełącznik potwierdzenia, domyślna odpowiedź).
- `tabs`: kierowane wiadomości do zakładki kompozycji w celu próśb o potwierdzenie.

Dodatkowe uwagi:

- Ten dodatek nie żąda uprawnień hosta (pochodzenie web).
- Uprawnienie `tabs` jest używane tylko do kierowania do zakładki kompozycji podczas koordynowania opcjonalnego dialogu potwierdzenia; nie jest używane do odczytywania historii ani nawigowania po stronach.

Są one udokumentowane w źródle i testowane w CI. Dodatek nie zbiera danych telemetrycznych.

---

### Podsumowanie (uprawnienia → cel) {#permissions-summary}

| Uprawnienie         | Dlaczego jest potrzebne                                                              |
| ------------------- | ------------------------------------------------------------------------------------ |
| `compose`           | Obserwuj zdarzenia komponowania; wymieniaj i dodawaj załączniki w swojej odpowiedzi. |
| `messagesRead`      | Wymieniaj załączniki oryginalnej wiadomości i pobieraj dane pliku.                   |
| `scripting`         | Wstrzykuj/koordynuj lekkie UI dla potwierdzenia, gdy jest włączone.                  |
| `windows`           | Okno zapasowe, jeśli wiadomość się nie powiedzie (rzadko).                           |
| `sessions`          | Przechowuj flagę per-zakładka, aby uniknąć duplikacji przetwarzania.                 |
| `storage`           | Zachowuj opcje (czarna lista, przełącznik potwierdzenia, domyślna odpowiedź).        |
| `tabs`              | Kierowane wiadomości do zakładki kompozycji w celu próśb o potwierdzenie.            |
| (uprawnienia hosta) | Żadne — dodatek nie żąda pochodzenia web.                                            |

---

## Nie żądane {#not-requested}

- `compose.save`, `compose.send` — dodatek nie zapisuje ani nie wysyła poczty w Twoim imieniu.

Zobacz także: [Prywatność](privacy) — brak telemetry, brak sieci w tle, tylko linki zainicjowane przez użytkownika.

---
