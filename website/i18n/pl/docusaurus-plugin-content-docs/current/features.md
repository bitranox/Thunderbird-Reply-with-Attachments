---
id: features
title: Funkcje
sidebar_label: Funkcje
---

## Funkcje

- Podczas odpowiadania automatycznie dołącza pliki z oryginalnej wiadomości e‑mail.
- Konfigurowalne zachowanie: załączniki mogą być
  - dodawane automatycznie, lub
  - dodawane dopiero po potwierdzeniu (niewielkie, dostępne okno dialogowe). W Opcjach możesz włączyć potwierdzenie i wybrać domyślną odpowiedź (Tak/Nie).
- Czarna lista nazw plików (wzorce glob) zapobiega automatycznemu dołączaniu określonych plików. Przykłady: `*intern*`, `*secret*`, `*passwor*`.
  Dopasowanie nie rozróżnia wielkości liter i sprawdza wyłącznie nazwę pliku; w Opcjach podaj jeden wzorzec na linię.
- Ostrzeżenie o czarnej liście (opcjonalne, domyślnie włączone): gdy pliki są wykluczane przez Twoją czarną listę, niewielkie okno modalne pokazuje plik i pasujące wzorce. Przyjazne dla trybu ciemnego i dostępne z klawiatury (Enter/Esc, aby zamknąć).
- Dodaje oryginały nawet wtedy, gdy sam już coś dołączyłeś; unika duplikatów na podstawie nazwy pliku.
- Pomija certyfikaty SMIME i obrazy w treści, aby uniknąć zbędnych załączników.
