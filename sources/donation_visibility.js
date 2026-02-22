/*
 * Module: donation_visibility.js
 * Purpose: Provide a simple one‑click "I donated" action that hides the Donate
 *          button for 90 days. Applies to options.html and popup.html.
 * Behavior:
 *  - Stores a timestamp `donateHideUntil` in storage.local.
 *  - On page load, hides the Donate link when now < donateHideUntil.
 *  - Exposes a button `#donate-snooze` that sets the 90‑day snooze.
 */
(function () {
  const KEY_HIDE_UNTIL = 'donateHideUntil';
  const DAYS_90_MS = 90 * 24 * 60 * 60 * 1000;

  /**
   * Read a localized message; empty string on failure.
   * @param {string} key
   * @returns {string}
   */
  function i18n(key) {
    try {
      if (globalThis.browser?.i18n?.getMessage) return browser.i18n.getMessage(key) || '';
      if (globalThis.messenger?.i18n?.getMessage) return messenger.i18n.getMessage(key) || '';
    } catch (_) {}
    return '';
  }

  /**
   * i18n with substitution support.
   * @param {string} key
   * @param {string|string[]} subs
   * @returns {string}
   */
  function i18nFmt(key, subs) {
    try {
      if (globalThis.browser?.i18n?.getMessage) return browser.i18n.getMessage(key, subs) || '';
      if (globalThis.messenger?.i18n?.getMessage) return messenger.i18n.getMessage(key, subs) || '';
    } catch (_) {}
    return '';
  }

  /** Get the current hide-until timestamp (epoch ms) or 0 if not set. */
  async function getSnoozeUntil() {
    try {
      const res = await browser.storage?.local?.get?.({ [KEY_HIDE_UNTIL]: 0 });
      return Number(res?.[KEY_HIDE_UNTIL] || 0);
    } catch (_) {
      return 0;
    }
  }
  /** Return true if the donation prompt should be hidden now. */
  async function _isSnoozed() {
    const until = await getSnoozeUntil();
    return Number.isFinite(until) && until > Date.now();
  }

  /** Set hide‑until to now + 90 days. */
  async function snooze90Days() {
    const until = Date.now() + DAYS_90_MS;
    try {
      await browser.storage?.local?.set?.({ [KEY_HIDE_UNTIL]: until });
    } catch (_) {}
    return until;
  }

  /** Clear snooze and show donate again. */
  async function clearSnooze() {
    try {
      await browser.storage?.local?.set?.({ [KEY_HIDE_UNTIL]: 0 });
    } catch (_) {}
  }

  /** Apply current visibility rules to Donate UI in this document. */
  async function applyVisibility() {
    const until = await getSnoozeUntil();
    const hidden = Number.isFinite(until) && until > Date.now();
    const donateAnchor = /** @type {HTMLElement|null} */ (document.getElementById('donate-link'));
    const snoozeBtn = /** @type {HTMLElement|null} */ (document.getElementById('donate-snooze'));
    const hintEl = /** @type {HTMLElement|null} */ (document.getElementById('donate-snooze-hint'));
    const showBtn = /** @type {HTMLElement|null} */ (document.getElementById('donate-show'));
    if (donateAnchor) donateAnchor.style.display = hidden ? 'none' : '';
    if (snoozeBtn) snoozeBtn.style.display = hidden ? 'none' : '';
    if (showBtn) showBtn.style.display = hidden ? '' : 'none';
    if (hintEl) {
      if (hidden && until) {
        const ymd = formatYMD(new Date(until));
        const txt =
          i18nFmt('uiDonateHiddenUntil', ymd) ||
          (i18n('uiDonateHiddenUntil') || '').replace('$1', ymd) ||
          `Hidden until ${ymd}`;
        hintEl.textContent = txt;
        hintEl.style.display = '';
      } else {
        hintEl.textContent = '';
        hintEl.style.display = 'none';
      }
    }
  }

  /** Click handler for the "I donated" snooze button. */
  async function onSnoozeClick(e) {
    e?.preventDefault?.();
    const until = await snooze90Days();
    await applyVisibility();
    // Show a brief confirmation if the options status label exists.
    try {
      const el = /** @type {HTMLElement|null} */ (document.getElementById('status-label'));
      if (el) {
        const msg = i18n('uiDonateSnoozed') || 'Donation prompt hidden for 90 days.';
        el.textContent = msg;
        setTimeout(() => {
          try {
            el.textContent = '';
          } catch (_) {}
        }, 1500);
      }
    } catch (_) {}
    return until;
  }

  /** Click handler for the "Show Donate again" button. */
  async function onShowAgainClick(e) {
    e?.preventDefault?.();
    await clearSnooze();
    await applyVisibility();
    try {
      const el = /** @type {HTMLElement|null} */ (document.getElementById('status-label'));
      if (el) {
        const msg = i18n('uiDonateRestored') || 'Donation prompt is visible again.';
        el.textContent = msg;
        setTimeout(() => {
          try {
            el.textContent = '';
          } catch (_) {}
        }, 1500);
      }
    } catch (_) {}
  }

  /** Format a Date as YYYY-MM-DD in local time. */
  function formatYMD(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function init() {
    const btn = document.getElementById('donate-snooze');
    if (btn) btn.addEventListener('click', onSnoozeClick);
    const btnShow = document.getElementById('donate-show');
    if (btnShow) btnShow.addEventListener('click', onShowAgainClick);
    applyVisibility();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
