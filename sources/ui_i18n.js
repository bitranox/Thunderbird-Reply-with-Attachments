/*
 * Module: ui_i18n.js
 * Purpose: Lightweight i18n applier for options/popup pages.
 * Usage:
 * - data-i18n="key"                        → sets textContent from i18n message
 * - data-i18n-attr="attr:key[,attr2:key2]" → sets attributes from i18n messages
 * Notes: Compatible with both browser.i18n and messenger.i18n.
 */
(function () {
  // Mark that JS is active early to avoid layout shift (no inline script needed)
  try { document.documentElement.classList.add('js'); } catch (_) {}
  // Set document direction for RTL languages for better layout in options/popup.
  try {
    const lang = (globalThis.browser?.i18n?.getUILanguage?.() || globalThis.messenger?.i18n?.getUILanguage?.() || '').toLowerCase();
    const primary = lang.split('-')[0];
    const RTL = new Set(['ar', 'he', 'fa', 'ur', 'ps']);
    if (RTL.has(primary)) {
      document.documentElement.setAttribute('dir', 'rtl');
    }
  } catch (_) {}
  /**
   * Lookup a localized string by key using the MailExtension i18n API.
   * @param {string} key
   * @returns {string}
   */
  /** Read a localized string by key (empty string on failure). */
  function getMessage(key) {
    try {
      if (globalThis.browser?.i18n?.getMessage) return browser.i18n.getMessage(key) || '';
      if (globalThis.messenger?.i18n?.getMessage) return messenger.i18n.getMessage(key) || '';
    } catch (_) {}
    return '';
  }

  /** Apply i18n to nodes marked with data-i18n: sets textContent. */
  function applyTextI18n() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const msg = getMessage(key);
      if (msg) el.textContent = msg;
    });
  }

  /** Apply i18n to attributes declared via data-i18n-attr: sets attributes. */
  function applyAttributeI18n() {
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const spec = el.getAttribute('data-i18n-attr');
      if (!spec) return;
      spec.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s && s.trim());
        if (!attr || !key) return;
        const msg = getMessage(key);
        if (msg) el.setAttribute(attr, msg);
      });
    });
  }

  /** Initialize i18n application once DOM is ready. */
  function init() {
    applyTextI18n();
    applyAttributeI18n();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
