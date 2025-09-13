---
id: configuration
title: 'Konfiguracja'
---

## Konfiguracja

Terminologia: zobacz [Glosariusz](glossary) dla spójnych terminów używanych w UI i dokumentacji.

---

## Otwórz opcje w Thunderbirdzie {#open-options-in-thunderbird}

- Thunderbird → Narzędzia → Dodatki i motywy → znajdź „Odpowiedz z załącznikami” → Preferencje/Opcje

---

### Ustawienia {#settings}

#### Potwierdzenie {#confirmation}

- Włącz/wyłącz „Pytaj przed dodaniem załączników”
- Odpowiedź domyślna: Tak lub Nie (domyśli fokus i klawiatura)
- Klawiatura: Y/J = Tak; N/Esc = Nie; Tab/Shift+Tab i klawisze strzałek cyklu fokus
  - Szczegóły klawiatury znajdziesz w [Użytkowaniu](usage#keyboard-shortcuts).

---

#### Czarne listy (wzorce glob) {#blacklist-glob-patterns}

Pliki z czarnej listy nie będą automatycznie dodawane w odpowiedzi. Zobacz także [Glosariusz](glossary) dla „Czarnej listy (Lista wykluczeń)”.

- Jeden wzór na linię; nie rozróżnia wielkości liter; dopasowanie tylko do nazwy pliku
- Przykłady: `*intern*`, `*secret*`, `*passwor*`
- Obsługiwane tokeny glob: `*` (wszystkie znaki oprócz `/`), `?` (jeden znak), klasy znaków jak `[abc]`. Użyj `\[` aby dopasować dosłowny `[`. Ścieżki (`**/`) są ignorowane, ponieważ dopasowywane są tylko nazwy plików.
- Nieobsługiwane: negacja (`!`), rozwinięcie klamer (`{..}`), oraz złożone zakresy. Utrzymuj wzorce w prostocie.
- Komentarze nie są obsługiwane w wzorcach. Nie dodawaj `#` ani komentarzy inline; wprowadź tylko tekst wzoru na każdą linię.

---

##### Książka wzorców {#pattern-cookbook}

- Dopasuj dowolny PDF: `*.pdf`
- Dopasuj pliki zaczynające się od „skan”: `scan*`
- Klasa znaków: `report[0-9].txt`
- Ucieczka dosłownego `[`: `\[` (przydatne do dopasowania nawiasu jako znaku)

---

##### Notatki {#blacklist-notes}

- Kolejność nie ma znaczenia; pierwsze/dowolne dopasowanie wyklucza plik.
- Dopasowanie jest tylko do nazwy pliku (ścieżki/foldery są ignorowane).
- „Resetuj do domyślnych” przywraca zalecane wzory i przełącznik ostrzeżeń o czarnej liście.
- Dlaczego przykład `*passwor*`? Dopasowuje obie rodziny „password” i „Passwort”.
- Priorytet: jeśli jakikolwiek wzór dopasowuje nazwę pliku, plik jest wykluczony (pierwsze/dowolne dopasowanie — kolejność nie zmienia wyniku).
- Wskazówka — przetestuj swój wzór: dodaj tymczasowy wzór, odpowiedz na wiadomość zawierającą plik o dopasowanej nazwie i potwierdź, że został wykluczony na liście ostrzeżeń.

##### Szybkie wypróbowanie (bezpieczny test) {#blacklist-try-it}

1. Otwórz Opcje → Czarne listy.
2. Dodaj tymczasowy wzór jak `*.tmp` i kliknij Zapisz.
3. Odpowiedz na testowy email, który ma plik kończący się na `.tmp` — plik powinien pojawić się na liście ostrzeżeń i nie być załączony.
4. Usuń tymczasowy wzór po zakończeniu, lub kliknij „Resetuj do domyślnych”.

---

#### Ostrzeżenie o wykluczonych załącznikach {#warning-on-excluded-attachments}

- Włącz/wyłącz „Ostrzeż, jeśli załączniki są wykluczone przez czarną listę” (domyślnie: WŁĄCZONE).
- Po włączeniu, małe okno modalne wyświetla wykluczone pliki oraz dopasowane wzory. Ostrzeżenie pojawia się również wtedy, gdy nic nie zostanie załączone, ponieważ wszyscy kandydaci zostali wykluczeni.

---

#### Zapisz swoje ustawienia {#save-your-settings}

Ustawienia są zapisywane przez naciśnięcie przycisku Zapisz. Możesz ręcznie przywrócić poszczególne pola lub zresetować domyślne w razie potrzeby.

Jeśli zapisane ustawienia zdają się nie stosować poprawnie, zrestartuj Thunderbirda i spróbuj ponownie. (Thunderbird może pamiętać stan między sesjami; ponowne uruchomienie zapewnia załadowanie nowych ustawień.)

Wskazówka: Aby potwierdzić, że Twoje ustawienia weszły w życie, odpowiedz na dowolną wiadomość z załącznikiem i sprawdź potwierdzenie lub ostrzeżenie czarnej listy.

---

#### Widoczność darowizn (90-dniowe wstrzymanie) {#donation-visibility}

Dodatek zawiera funkcję wygody, aby ukryć prośby o darowizny na pewien czas po dokonaniu darowizny.

Gdzie to znaleźć

- Opcje → Sekcja wsparcia: zobaczysz przycisk „Darowałem” oraz mały obszar wskazówek.
- Okno dialogowe potwierdzenia wysyłki również wyświetla przycisk Darowizna; automatycznie się ukrywa, gdy wstrzymanie jest aktywne.

Jak to działa

- Kliknięcie „Darowałem” ukrywa przyciski darowizny i analogiczne prośby na 90 dni.
- Wskaźnik statusu wyświetla „Ukryte do YYYY-MM-DD” (w Twojej lokalnej dacie). Istnieje również przycisk „Pokaż Darowiznę ponownie” do natychmiastowego przywrócenia widoczności.
- Po 90 dniach przycisk Darowizna ponownie staje się widoczny.

Prywatność i przechowywanie

- Dodatek przechowuje jedno znaczniki czasowe w lokalnej pamięci Thunderbirda, aby zapamiętać okres wstrzymania. Klucz: `donateHideUntil` (epoch w milisekundach).
- To ustawienie jest lokalne dla Twojego profilu Thunderbird (nie synchronizowane w chmurze). Ta funkcjonalność nie powoduje żadnych zapytań sieciowych.

Rozwiązywanie problemów

- Jeśli przycisk Darowizna nadal pokazuje się tuż po kliknięciu „Darowałem”, poczekaj chwilę lub ponownie otwórz stronę Opcji; interfejs użytkownika aktualizuje się, gdy tylko ustawienie zostanie zapisane.
- Aby zresetować ręcznie, kliknij „Pokaż Darowiznę ponownie”. Możesz również poczekać, aż data podana w wskazówce minie.

Ta funkcjonalność jest czysto dla wygody; nigdy nie blokuje funkcjonalności dodatku i nie zbiera żadnych danych osobowych.

---

### Normalizacja nazw plików (zapobieganie duplikatom) {#filename-normalization-duplicates-prevention}

Aby działać spójnie na różnych platformach, nazwy plików są normalizowane przed sprawdzeniem duplikatów:

- Unicode jest normalizowane do NFC.
- Nazwy są przekształcane na małe litery.
- Końcowe kropki/przestrzenie są przycinane (przyjazność dla Windows).

To sprawia, że wykrywanie duplikatów jest przewidywalne dla nazw takich jak `café.pdf` vs `café.pdf` (NFD) lub `FILE.txt.` vs `file.txt`.

---

## Zachowanie potwierdzenia {#confirmation-behavior}

- „Odpowiedź domyślna” ustawia na początku przycisk w oknie potwierdzenia (przydatne dla użytkowników klawiatury).
- Działa zarówno dla „Odpowiedz”, jak i „Odpowiedz wszystkim”. „Prześlij dalej” nie jest modyfikowane przez ten dodatek.

---

## Zaawansowane: wykrywanie duplikatów {#advanced-duplicate-detection}

Zapobieganie duplikatom jest implementowane na każdej karcie kompozycji i według nazwy pliku. Zobacz [Użytkowanie](usage#behavior-details) dla szczegółowego wyjaśnienia.

---

Zobacz także

- [Uprawnienia](permissions)
- [Prywatność](privacy)
