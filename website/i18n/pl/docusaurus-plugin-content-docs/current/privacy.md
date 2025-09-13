---
id: privacy
title: 'Prywatność'
sidebar_label: 'Prywatność'
---

## Prywatność

:::note Brak telemetry; brak sieci w tle
Ten dodatek **nie** zbiera danych analitycznych/telemetrii i **nie** wykonuje żadnych zapytań sieciowych w tle. Jakiekolwiek połączenie sieciowe występuje tylko wtedy, gdy klikniesz zewnętrzny link (Dokumenty, GitHub, Wspieraj).
:::

Reply with Attachments nie zbiera analityki ani telemetrii i nie wysyła twoich danych nigdzie.

Co robi dodatek:

- Odczytuje metadane załączników i pliki z oryginalnej wiadomości lokalnie (API Thunderbirda), aby dołączyć je do twojej odpowiedzi.
- Przechowuje twoje opcje (czarna lista, potwierdzenie, domyślna odpowiedź) w lokalnej pamięci Thunderbirda.

Co dodatek nie robi:

- Brak śledzenia, analityki, raportowania błędów lub zdalnego logowania.
- Brak zapytań sieciowych w tle, z wyjątkiem gdy wyraźnie otwierasz zewnętrzne linki (Dokumenty, GitHub, Wspieraj).

Uprawnienia są dokumentowane na stronie [Uprawnienia](permissions).

---

## Polityka bezpieczeństwa treści (CSP) {#content-security-policy-csp}

Opcje i strony popup unikają skryptów inline. Wszystkie skrypty JavaScript są ładowane z plików dostarczanych z dodatkiem, aby spełniać rygorystyczne zasady CSP w Thunderbirdzie. Jeśli osadzasz fragmenty kodu w dokumentach, są one tylko przykładami i nie są wykonywane przez dodatek.

---

## Przechowywanie danych {#data-storage}

- Preferencje użytkownika (czarna lista, przełącznik potwierdzenia, domyślna odpowiedź) są przechowywane w `storage.local` Thunderbirda dla tego dodatku.
- Brak synchronizacji w chmurze wykonywanej przez dodatek.

---

## Sieć {#network}

- Dodatek nie wykonuje żadnych działań sieciowych w tle.
- Jakiekolwiek połączenie sieciowe występuje tylko wtedy, gdy klikniesz linki (Dokumenty, GitHub, Wspieraj) lub gdy sam Thunderbird wykonuje normalne operacje niezwiązane z tym dodatkiem.

---

## Usuwanie danych {#data-removal}

- Odinstalowanie dodatku usuwa jego kod.
- Ustawienia są przechowywane tylko w `storage.local` Thunderbirda i są usuwane przy odinstalowaniu; nie używa się żadnej zewnętrznej pamięci.
- Resetuj ustawienia bez odinstalowywania:
  - Strona opcji: użyj "Resetuj do domyślnych" dla czarnej listy i ostrzeżenia czarnej listy.
  - Zaawansowane: w Thunderbirdzie → Narzędzia → Narzędzia dewelopera → Debugowanie dodatków, otwórz pamięć rozszerzenia i wyczyść klucze w razie potrzeby.

---
