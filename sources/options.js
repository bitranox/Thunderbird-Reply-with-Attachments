/*
 * Module: options.js
 * Purpose: Drive the options page. Loads and saves settings, keeps
 *          the UI responsive, and shows a non‑shifting status message.
 * Notes:
 * - Defaults for the blacklist are auto‑filled when a user has an empty list.
 * - All texts are localized via browser.i18n / messenger.i18n.
 */
(function () {
  const KEY = 'blacklistPatterns';
  const KEY_CONFIRM = 'confirmBeforeAdd';
  const KEY_CONFIRM_DEFAULT = 'confirmDefaultChoice';
  const DEFAULT_PATTERNS = ['*intern*', '*secret*', '*passwor*'];

  /** Get an element by id with a typed cast for readability. */
  function getEl(id) { return /** @type {HTMLElement} */(document.getElementById(id)); }

  /** Read and normalize newline‑separated patterns from a textarea. */
  function readTextareaLines(id) {
    const ta = /** @type {HTMLTextAreaElement} */(getEl(id));
    // Normalize patterns to lowercase on save to ensure case-insensitive behavior
    return ta.value.split('\n').map((s) => s.trim().toLowerCase()).filter(Boolean);
  }

  /** Write patterns to a textarea as a newline‑separated list. */
  function setTextareaLines(id, arr) {
    const ta = /** @type {HTMLTextAreaElement} */(getEl(id));
    ta.value = (arr || []).join('\n');
  }

  /** Load settings into the form; auto‑fill empty blacklist with defaults. */
  async function load() {
    try {
    const res = await browser.storage?.local?.get?.({ [KEY]: DEFAULT_PATTERNS, [KEY_CONFIRM]: false, [KEY_CONFIRM_DEFAULT]: 'yes' });
      const stored = Array.isArray(res?.[KEY]) ? res[KEY] : undefined;
      let patterns = DEFAULT_PATTERNS;
      if (Array.isArray(stored)) {
        if (stored.length > 0) {
          patterns = stored;
        } else {
          // Auto-fill empty user blacklist with defaults and persist
          patterns = DEFAULT_PATTERNS;
          try {
            await browser.storage?.local?.set?.({ [KEY]: patterns.map((s) => String(s).trim().toLowerCase()).filter(Boolean) });
          } catch (_) {}
        }
      }
      setTextareaLines('blacklist-patterns', patterns);
      const cb = /** @type {HTMLInputElement} */(getEl('confirm-before'));
      cb.checked = !!res?.[KEY_CONFIRM];
      const def = String(res?.[KEY_CONFIRM_DEFAULT] || 'yes');
      const yes = /** @type {HTMLInputElement} */(document.querySelector('input[name="confirm-default"][value="yes"]'));
      const no = /** @type {HTMLInputElement} */(document.querySelector('input[name="confirm-default"][value="no"]'));
      if (def === 'no') { no.checked = true; } else { yes.checked = true; }
    } catch (_) {
      setTextareaLines('blacklist-patterns', []);
      const cb = /** @type {HTMLInputElement} */(getEl('confirm-before'));
      cb.checked = false;
      const yes = /** @type {HTMLInputElement} */(document.querySelector('input[name="confirm-default"][value="yes"]'));
      const no = /** @type {HTMLInputElement} */(document.querySelector('input[name="confirm-default"][value="no"]'));
      yes.checked = true; no.checked = false;
    }
  }

  /** Persist the form values and show a transient status. */
  async function save() {
    const patterns = readTextareaLines('blacklist-patterns');
    const cb = /** @type {HTMLInputElement} */(getEl('confirm-before'));
    const def = /** @type {HTMLInputElement} */(document.querySelector('input[name="confirm-default"]:checked'));
    setStatus(getMessage('uiSaving') || 'Saving…');
    await browser.storage?.local?.set?.({ [KEY]: patterns, [KEY_CONFIRM]: !!cb.checked, [KEY_CONFIRM_DEFAULT]: def?.value === 'no' ? 'no' : 'yes' });
    setStatus(getMessage('uiSaved') || 'Saved.');
    // Ask background to re-apply settings to open reply composers once.
    try { await browser.runtime?.sendMessage?.({ type: 'rwa:apply-settings-open-compose' }); } catch (_) {}
    setTimeout(() => setStatus(''), 1500);
  }

  /** Restore default settings and reload the form. */
  async function resetDefaults() {
    setStatus(getMessage('uiSaving') || 'Saving…');
    await browser.storage?.local?.set?.({ [KEY]: DEFAULT_PATTERNS, [KEY_CONFIRM]: false, [KEY_CONFIRM_DEFAULT]: 'yes' });
    await load();
    setStatus(getMessage('uiResetDone') || 'Reset.');
    setTimeout(() => setStatus(''), 1500);
  }

  /** Update the fixed status area without shifting the layout. */
  function setStatus(text) {
    const el = /** @type {HTMLElement} */ (document.getElementById('status-label'));
    if (!el) return;
    el.textContent = text || '';
  }

  /** Convenience i18n lookup compatible with both namespaces. */
  function getMessage(key) {
    try {
      if (globalThis.browser?.i18n?.getMessage) return browser.i18n.getMessage(key) || '';
      if (globalThis.messenger?.i18n?.getMessage) return messenger.i18n.getMessage(key) || '';
    } catch (_) {}
    return '';
  }

  function init() {
    getEl('save-btn')?.addEventListener('click', (e) => { e.preventDefault(); save(); });
    getEl('reset-btn')?.addEventListener('click', (e) => { e.preventDefault(); resetDefaults(); });
    load();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
