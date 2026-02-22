---
id: donation
title: 'Przekaż darowiznę'
sidebar_label: 'Wesprzyj'
---

---

## Wesprzyj

import useBaseUrl from '@docusaurus/useBaseUrl';

If you like "Reply with Attachments" and want to support its development, you can donate here:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Wesprzyj przez Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>lub</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Wesprzyj przez PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>lub</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Postaw mi kawę" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Zeskanuj, aby postawić mi kawę"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Dziękujemy! Twoje wsparcie pomaga utrzymywać zgodność z nowymi wydaniami Thunderbirda, poprawiać dostępność i testy oraz utrzymywać dokumentację na bieżąco.

Uwagi

- Łącza do darowizn otwierają się tylko po ich kliknięciu; dodatek nie wykonuje żadnych żądań sieciowych w tle.
- Cykliczne wsparcie pomaga w długoterminowym utrzymaniu i terminowych aktualizacjach, ale jest całkowicie opcjonalne.

---

If the image buttons do not load, please use these links instead:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Postaw mi kawę](https://buymeacoffee.com/bitranox)

---

Darowizny są dobrowolne; funkcje nie są ograniczane.

---

## Widoczność próśb o darowiznę (drzemka na 90 dni)

Dodatek zawiera funkcję ułatwiającą ukrycie próśb o wsparcie na pewien czas po dokonaniu darowizny.

- Gdzie to znaleźć
  - Opcje → sekcja Wsparcie: zobaczysz przycisk „Przekazałem(am) darowiznę” i mały obszar podpowiedzi.
  - Okno potwierdzenia wysyłki również pokazuje przycisk „Wesprzyj”; automatycznie się ukrywa, gdy drzemka jest aktywna.

- Jak to działa
  - Kliknięcie „Przekazałem(am) darowiznę” ukrywa przyciski wsparcia i powiązane komunikaty na 90 dni.
  - Wskazówka stanu pokazuje „Ukryte do YYYY‑MM‑DD” (w Twoim lokalnym formacie daty). Dostępny jest też przycisk „Pokaż ‚Wesprzyj’ ponownie”, aby natychmiast przywrócić widoczność.
  - Po 90 dniach przycisk „Wesprzyj” znów staje się widoczny automatycznie.

- Prywatność i przechowywanie
  - Dodatek zapisuje pojedynczy znacznik czasu w lokalnej pamięci Thunderbirda, aby zapamiętać okres drzemki. Klucz: `donateHideUntil` (milisekundy epoki).
  - To ustawienie jest lokalne dla Twojego profilu Thunderbirda (nie jest synchronizowane w chmurze). Funkcja nie wykonuje żadnych żądań sieciowych.

- Rozwiązywanie problemów
  - Jeśli „Wesprzyj” nadal się wyświetla zaraz po kliknięciu „Przekazałem(am) darowiznę”, odczekaj chwilę lub ponownie otwórz stronę Opcje; interfejs zaktualizuje się, gdy ustawienie zostanie zapisane.
  - Aby zresetować ręcznie, kliknij „Pokaż ‚Wesprzyj’ ponownie”. Możesz też poczekać, aż minie data podana we wskazówce.

Ta funkcja służy wyłącznie wygodzie; nigdy nie blokuje działania dodatku i nie gromadzi żadnych danych osobowych.

---
