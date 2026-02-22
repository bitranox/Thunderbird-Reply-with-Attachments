---
id: features
title: 'Funkcje'
sidebar_label: 'Funkcje'
---

---

## Funkcje {#features}

- Automatycznie dołącza pliki z oryginalnej wiadomości podczas odpowiadania.
- Konfigurowalne działanie: załączniki mogą być
  - dodawane automatycznie lub
  - dodawane dopiero po potwierdzeniu (małe, dostępne okno dialogowe). W Opcjach
    możesz włączyć potwierdzenie i wybrać domyślną odpowiedź (Tak/Nie).
- Czarna lista nazw plików (wzorce glob) zapobiega automatycznemu dołączaniu
  określonych plików. Przykłady: `*intern*`, `*secret*`, `*passwor*`.
  Dopasowanie jest niewrażliwe na wielkość liter i sprawdza wyłącznie nazwę pliku; w Opcjach podaj jeden wzorzec na linię.
- Ostrzeżenie o czarnej liście (opcjonalne, domyślnie włączone): gdy pliki są wykluczane przez Twoją
  czarną listę, małe okno modalne wyświetla plik oraz pasujące wzorce. Przyjazne
  trybowi ciemnemu i dostępne z klawiatury (Enter/Esc, aby zamknąć).
- Działa z Odpowiedz i Odpowiedz wszystkim. Przekazywanie (Forward) nie jest modyfikowane przez ten dodatek.
- Dodaje oryginały, nawet jeśli już dołączyłeś własne załączniki; unika duplikatów według nazwy pliku.
- Ochrona przed duplikatami per karta zapobiega podwójnemu dodaniu w tej samej karcie tworzenia.
- Domyślnie pomija certyfikaty S/MIME, aby uniknąć zbędnych załączników.
- Dołączaj obrazy w treści (domyślnie: WŁ.). Osadzone obrazy są odtwarzane bezpośrednio w
  treści odpowiedzi jako identyfikatory URI danych base64, zachowując oryginalny układ w treści. Wyłącz w
  Opcjach, aby całkowicie pominąć obrazy w treści.

---

## Jak to działa {#how-it-works}

- Przy odpowiedzi dodatek wyświetla listę oryginalnych załączników.
- Odfiltrowuje podpisy S/MIME z załączników plikowych; obrazy w treści są przywracane w korpusie (o ile nie wyłączono).
- Opcjonalnie prosi o potwierdzenie (przyjazne dla klawiatury).
- Dodaje kwalifikujące się pliki do okna tworzenia, unikając duplikatów według nazwy pliku.
- Zobacz „Dlaczego załączniki mogą nie zostać dodane” w sekcji Użycie — dla przypadków brzegowych.

Informacja o prywatności: Całe przetwarzanie odbywa się lokalnie w Thunderbirdzie. Dodatek nie wykonuje żadnych sieciowych żądań w tle.

---
