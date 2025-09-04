// Simple i18n applier for options/popup pages
// - data-i18n="key"                        -> sets textContent from i18n message
// - data-i18n-attr="attr:key[,attr2:key2]" -> sets attributes from i18n messages
(function () {
  /**
   * Lookup a localized string by key using the MailExtension i18n API.
   * @param {string} key
   * @returns {string}
   */
  function getMessage(key) {
    try {
      if (globalThis.browser?.i18n?.getMessage) return browser.i18n.getMessage(key) || '';
      if (globalThis.messenger?.i18n?.getMessage) return messenger.i18n.getMessage(key) || '';
    } catch (_) {}
    return '';
  }

  function applyTextI18n() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const msg = getMessage(key);
      if (msg) el.textContent = msg;
    });
  }

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
