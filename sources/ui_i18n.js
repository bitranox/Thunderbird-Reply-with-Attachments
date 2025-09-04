// Simple i18n applier for options/popup pages
// - data-i18n="key"           -> sets textContent from i18n message
// - data-i18n-attr="attr:key[,attr2:key2]" -> sets attributes from i18n messages
(function () {
  function getMessage(key) {
    try {
      // Thunderbird/Firefox MailExtensions
      if (globalThis.browser?.i18n?.getMessage) return browser.i18n.getMessage(key) || '';
      if (globalThis.messenger?.i18n?.getMessage) return messenger.i18n.getMessage(key) || '';
    } catch (_) {}
    return '';
  }

  function applyText() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const msg = getMessage(key);
      if (msg) el.textContent = msg;
    });
  }

  function applyAttrs() {
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
    applyText();
    applyAttrs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

