---
id: donation
title: 'Δωρεά'
sidebar_label: 'Δωρίστε'
---

---

## Δωρεά

import useBaseUrl from '@docusaurus/useBaseUrl';

Αν σας αρέσει το "Reply with Attachments" και θέλετε να στηρίξετε την ανάπτυξή του, μπορείτε να κάνετε δωρεά εδώ:

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0' }}>
  <a href="https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/stripe-donate-button.svg')} alt="Κάντε δωρεά μέσω Stripe" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ή</div>
  <a href="https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/paypal-donate-button.svg')} alt="Κάντε δωρεά μέσω PayPal" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
  <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>ή</div>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw', height: '64px' }}>
    <img src={useBaseUrl('/img/buymeacoffee-donate-button.svg')} alt="Κεράστε μου έναν καφέ" width="320" height="64"
         style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
  </a>
</div>
<br />

<div className="donate-buttons" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', margin: '12px 0 28px' }}>
  <a href="https://buymeacoffee.com/bitranox" target="_blank" rel="noopener noreferrer"
     style={{ display: 'inline-block', width: '320px', maxWidth: '90vw' }}>
    <img src={useBaseUrl('/img/buy_me_a_coffee_qrcode.png')} alt="Σαρώστε για να με κεράσετε έναν καφέ"
         width="280" style={{ width: '280px', maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
  </a>
</div>

Ευχαριστούμε! Η υποστήριξή σας βοηθά στη διατήρηση της συμβατότητας με νέες εκδόσεις του Thunderbird, στη βελτίωση της προσβασιμότητας και των δοκιμών και στο να παραμένει η τεκμηρίωση ενημερωμένη.

Σημειώσεις

- Οι σύνδεσμοι δωρεάς ανοίγουν μόνο όταν τους κάνετε κλικ· το πρόσθετο δεν πραγματοποιεί αιτήματα δικτύου στο παρασκήνιο.
- Η επαναλαμβανόμενη υποστήριξη βοηθά στη μακροπρόθεσμη συντήρηση και τις έγκαιρες ενημερώσεις, αλλά είναι απολύτως προαιρετική.

---

Αν τα κουμπιά εικόνας δεν φορτωθούν, χρησιμοποιήστε αντί γι’ αυτό τους παρακάτω συνδέσμους:

#### [Stripe](https://buy.stripe.com/9B66oB3FDdbx2f2awK33W00)

#### [PayPal](https://www.paypal.com/donate/?hosted_button_id=L2NQXHB7FQ5FJ)

#### [Κεράστε μου έναν καφέ](https://buymeacoffee.com/bitranox)

---

Οι δωρεές είναι προαιρετικές· δεν υπάρχει περιορισμός λειτουργιών.

---

## Ορατότητα δωρεών (αναβολή 90 ημερών)

Το πρόσθετο περιλαμβάνει μια λειτουργία ευκολίας για να κρύβει τις υπενθυμίσεις δωρεάς για λίγο αφού κάνετε δωρεά.

- Πού θα το βρείτε
  - Επιλογές → ενότητα Υποστήριξη: θα δείτε ένα κουμπί «Έκανα δωρεά» και μια μικρή περιοχή με ένδειξη.
  - Το παράθυρο διαλόγου επιβεβαίωσης αποστολής εμφανίζει επίσης ένα κουμπί Δωρεά· αυτό κρύβεται αυτόματα όταν η αναβολή είναι ενεργή.

- Πώς λειτουργεί
  - Κάνοντας κλικ στο «Έκανα δωρεά» κρύβονται τα κουμπιά δωρεάς και οι σχετικές προτροπές για 90 ημέρες.
  - Μια ένδειξη κατάστασης εμφανίζει «Κρυφό έως YYYY‑MM‑DD» (στην τοπική σας ημερομηνία). Υπάρχει επίσης ένα κουμπί «Εμφάνιση Δωρεάς ξανά» για άμεση επαναφορά της ορατότητας.
  - Μετά από 90 ημέρες, το κουμπί Δωρεά γίνεται ξανά ορατό αυτόματα.

- Απόρρητο και αποθήκευση
  - Το πρόσθετο αποθηκεύει μία μόνο χρονική σήμανση στο τοπικό storage του Thunderbird για να θυμάται την περίοδο αναβολής. Κλειδί: `donateHideUntil` (χιλιοστά του δευτερολέπτου (epoch)).
  - Αυτή η ρύθμιση είναι τοπική στο προφίλ Thunderbird σας (δεν γίνεται συγχρονισμός στο cloud). Αυτή η λειτουργία δεν κάνει αιτήματα δικτύου.

- Αντιμετώπιση προβλημάτων
  - Αν η Δωρεά εξακολουθεί να εμφανίζεται αμέσως μετά το κλικ στο «Έκανα δωρεά», περιμένετε λίγο ή ανοίξτε ξανά τη σελίδα Επιλογές· το περιβάλλον χρήστη ενημερώνεται μόλις αποθηκευτεί η ρύθμιση.
  - Για χειροκίνητη επαναφορά, κάντε κλικ στο «Εμφάνιση Δωρεάς ξανά». Μπορείτε επίσης να περιμένετε έως ότου περάσει η ημερομηνία που αναφέρεται στην ένδειξη.

Αυτή η λειτουργία υπάρχει αποκλειστικά για λόγους ευκολίας· δεν μπλοκάρει ποτέ τη λειτουργικότητα του προσθέτου και δεν συλλέγει κανένα προσωπικό δεδομένο.

---
