---
id: usage
title: 'Użycie'
sidebar_label: 'Użycie'
---

---

## Użycie {#usage}

- Odpowiedz, a dodatek automatycznie doda oryginały — lub najpierw zapyta, jeśli włączono to w Opcjach.
- Duplikaty są usuwane na podstawie nazwy pliku; części S/MIME są zawsze pomijane. Obrazy osadzone w oryginalnej wiadomości pozostają w treści odpowiedzi, tam gdzie umieszcza je Thunderbird, i nie są kopiowane jako pliki.
- Załączniki z czarnej listy są również pomijane (wzorce glob niewrażliwe na wielkość liter dopasowują nazwy plików, nie ścieżki). Zobacz [Konfiguracja](configuration#blacklist-glob-patterns).

---

### Co się dzieje przy odpowiedzi {#what-happens}

- Wykryj odpowiedź → wypisz oryginalne załączniki → pomiń S/MIME i osadzone obrazy → opcjonalne potwierdzenie → dodaj kwalifikujące się pliki (pomijając duplikaty).

| Typ części                                                    | Kopiowane do odpowiedzi |
|---------------------------------------------------------------|------------------------:|
| Plik podpisu S/MIME `smime.p7s`                               | Nie                     |
| Typy MIME S/MIME (`application/pkcs7-*`)                      | Nie                     |
| Obraz osadzony w treści wiadomości przez `cid:`               | Nie (jest w treści)     |
| Obraz oznaczony jako `Content-Disposition: inline`            | Nie (jest w treści)     |
| Obraz z `Content-ID`, do którego treść nigdy się nie odwołuje | Tak                     |
| Załączony e-mail (`message/rfc822`) z nazwą pliku             | Tak                     |
| Zwykły załącznik pliku z nazwą pliku                          | Tak                     |

Obraz jest uznawany za osadzony tylko wtedy, gdy oryginalna wiadomość faktycznie się do niego odwołuje, lub gdy nadawca
wyraźnie oznaczył go jako `Content-Disposition: inline`. Sam nagłówek `Content-ID` nie wystarcza: wiele klientów pocztowych
umieszcza go na każdej części obrazu, w tym na prawdziwych załącznikach, które nadal trzeba skopiować.

---

### Odwołania krzyżowe {#cross-reference}

- Przekazywanie nie jest modyfikowane z założenia (patrz Ograniczenia poniżej).
- Powody, dla których załącznik może nie zostać dodany: zobacz „Dlaczego załączniki mogą nie zostać dodane”.

---

## Szczegóły działania {#behavior-details}

- **Zapobieganie duplikatom:** Dodatek oznacza kartę tworzenia wiadomości jako przetworzoną, używając wartości sesji per‑karta i zabezpieczenia w pamięci. Nie doda oryginałów dwa razy.
- Zamknięcie i ponowne otwarcie okna tworzenia jest traktowane jako nowa karta (tj. dozwolona jest nowa próba).
- **Poszanowanie istniejących załączników:** Jeśli w oknie tworzenia są już jakieś załączniki, oryginały i tak zostaną dodane dokładnie raz, z pominięciem nazw plików, które już istnieją.
- **Wykluczenia:** Artefakty S/MIME i obrazy inline są wykluczane z załączników plikowych. Jeśli w pierwszym przejściu nic się nie kwalifikuje, luźny tryb zapasowy ponownie sprawdza części inne niż S/MIME. Obrazy inline są obsługiwane osobno: są przywracane w treści odpowiedzi jako URI danych (gdy włączone).
  - **Nazwy plików:** `smime.p7s`
  - **Typy MIME:** `application/pkcs7-signature`, `application/x-pkcs7-signature`, `application/pkcs7-mime`
  - **Obrazy inline:** każda część `image/*` referencjonowana przez Content‑ID — wykluczona z załączników plikowych, ale osadzana w treści odpowiedzi, gdy "Include inline pictures" jest włączone
  - **Załączone e‑maile (`message/rfc822`):** traktowane jak zwykłe załączniki, jeśli mają nazwę pliku; mogą zostać dodane (z zastrzeżeniem kontroli duplikatów i czarnej listy).
- **Ostrzeżenie o czarnej liście (jeśli włączone):** Gdy kandydaci są wykluczani przez Twoją czarną listę,
  dodatek pokazuje małe okno modalne z listą dotkniętych plików oraz pasujących
  wzorców. To ostrzeżenie pojawia się także w przypadkach, gdy żadne załączniki nie
  zostaną dodane, ponieważ wszystko zostało wykluczone.

---

## Skróty klawiaturowe {#keyboard-shortcuts}

- Okno potwierdzenia: Y/J = Tak, N/Esc = Nie; Tab/Shift+Tab i klawisze strzałek przełączają fokus.
  - „Default answer” w [Konfiguracji](configuration#confirmation) ustawia początkowo aktywny przycisk.
  - Enter aktywuje aktualnie wybrany przycisk. Tab/Shift+Tab i strzałki przenoszą fokus dla dostępności.

### Ściągawka klawiaturowa {#keyboard-cheat-sheet}

| Klawisze           | Akcja                                  |
|--------------------|----------------------------------------|
| Y / J              | Potwierdź Tak                          |
| N / Esc            | Potwierdź Nie                          |
| Enter              | Aktywuj wybrany przycisk               |
| Tab / Shift+Tab    | Przenieś fokus do przodu/tyłu          |
| Klawisze strzałek  | Przemieszczaj fokus między przyciskami |
| Domyślna odpowiedź | Ustawia początkowy fokus (Tak lub Nie) |

---

## Ograniczenia {#limitations}

- Przekazywanie nie jest modyfikowane przez ten dodatek (obsługiwane są Odpowiedz i Odpowiedz wszystkim).
- Bardzo duże załączniki mogą podlegać ograniczeniom Thunderbirda lub dostawcy.
  - Dodatek nie dzieli na części ani nie kompresuje plików; polega na standardowej obsłudze załączników w Thunderbirdzie.
- Wiadomości szyfrowane: części S/MIME są celowo wykluczane.

---

## Dlaczego załączniki mogą nie zostać dodane {#why-attachments-might-not-be-added}

- Obrazy osadzone przez oryginalną wiadomość nie są kopiowane jako pliki. Znajdują się już w treści odpowiedzi, tam gdzie umieścił je Thunderbird. Zobacz [Configuration](configuration#include-inline-pictures).
- Części podpisu S/MIME są z założenia wykluczane: nazwy plików takie jak `smime.p7s` i typy MIME takie jak `application/pkcs7-signature` lub `application/pkcs7-mime` są pomijane.
- Wzorce czarnej listy mogą odfiltrowywać kandydatów: zobacz [Konfiguracja](configuration#blacklist-glob-patterns); dopasowanie jest niewrażliwe na wielkość liter i dotyczy wyłącznie nazw plików.
- Zduplikowane nazwy plików nie są ponownie dodawane: jeśli w oknie tworzenia jest już plik o tej samej znormalizowanej nazwie, zostaje pominięty.
- Części niebędące plikami lub brakujące nazwy: do dodania brane są pod uwagę tylko części przypominające pliki z użytecznymi nazwami.

---

Zobacz także

- [Konfiguracja](configuration)
