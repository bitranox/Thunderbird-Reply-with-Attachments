/*
 * Module: options.js
 * Purpose: Drive the options page. Loads and saves settings, keeps
 *          the UI responsive, and shows a non‑shifting status message.
 * Notes:
 * - Defaults for the blacklist are set only on fresh install (see background.js).
 *   If a user clears the list later, we no longer auto‑fill it here.
 * - All texts are localized via browser.i18n / messenger.i18n.
 */
(function () {
  const KEY = 'blacklistPatterns';
  const KEY_CONFIRM = 'confirmBeforeAdd';
  const KEY_CONFIRM_DEFAULT = 'confirmDefaultChoice';
  const KEY_WARN_BLACKLIST = 'warnOnBlacklistExcluded';
  const KEY_DEBUG = 'debug';
  const DEFAULT_PATTERNS = ['*intern*', '*secret*', '*passwor*'];

  /**
   * Get an element by id with a typed cast for readability.
   * @param {string} id
   * @returns {HTMLElement}
   */
  function getEl(id) {
    return /** @type {HTMLElement} */ (document.getElementById(id));
  }

  /**
   * Read and normalize newline‑separated patterns from a textarea.
   * Parameters: `id` of the textarea element to read from.
   * Output: array of lowercased, trimmed, non-empty patterns.
   * @param {string} id
   * @returns {string[]}
   */
  function readTextareaLines(id) {
    const ta = /** @type {HTMLTextAreaElement} */ (getEl(id));
    // Normalize patterns to lowercase on save to ensure case-insensitive behavior
    return ta.value
      .split('\n')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }

  /**
   * Write patterns to a textarea as a newline‑separated list.
   * @param {string} id
   * @param {string[]} arr
   */
  function setTextareaLines(id, arr) {
    const ta = /** @type {HTMLTextAreaElement} */ (getEl(id));
    ta.value = (arr || []).join('\n');
  }

  /**
   * Load settings into the form; auto‑fill empty blacklist with defaults.
   * Intent: keep UX simple by providing sensible defaults.
   * @returns {Promise<void>}
   */
  async function load() {
    try {
      const res = await browser.storage?.local?.get?.({
        // do not inject defaults here; install flow handles first‑run defaults
        [KEY]: undefined,
        [KEY_CONFIRM]: false,
        [KEY_CONFIRM_DEFAULT]: 'yes',
        [KEY_WARN_BLACKLIST]: true,
        [KEY_DEBUG]: false,
      });
      const stored = Array.isArray(res?.[KEY]) ? res[KEY] : undefined;
      setTextareaLines('blacklist-patterns', Array.isArray(stored) ? stored : []);
      const cb = /** @type {HTMLInputElement} */ (getEl('confirm-before'));
      cb.checked = !!res?.[KEY_CONFIRM];
      const warnCb = /** @type {HTMLInputElement} */ (getEl('warn-blacklist'));
      warnCb.checked = res?.[KEY_WARN_BLACKLIST] !== false;
      const debugCb = /** @type {HTMLInputElement | null} */ (
        document.getElementById('debug-logging')
      );
      if (debugCb) debugCb.checked = !!res?.[KEY_DEBUG];
      const def = String(res?.[KEY_CONFIRM_DEFAULT] || 'yes');
      const yes = /** @type {HTMLInputElement} */ (
        document.querySelector('input[name="confirm-default"][value="yes"]')
      );
      const no = /** @type {HTMLInputElement} */ (
        document.querySelector('input[name="confirm-default"][value="no"]')
      );
      if (def === 'no') {
        no.checked = true;
      } else {
        yes.checked = true;
      }
    } catch (_) {
      setTextareaLines('blacklist-patterns', []);
      const cb = /** @type {HTMLInputElement} */ (getEl('confirm-before'));
      cb.checked = false;
      const warnCb = /** @type {HTMLInputElement} */ (getEl('warn-blacklist'));
      warnCb.checked = true;
      const debugCb = /** @type {HTMLInputElement | null} */ (
        document.getElementById('debug-logging')
      );
      if (debugCb) debugCb.checked = false;
      const yes = /** @type {HTMLInputElement} */ (
        document.querySelector('input[name="confirm-default"][value="yes"]')
      );
      const no = /** @type {HTMLInputElement} */ (
        document.querySelector('input[name="confirm-default"][value="no"]')
      );
      yes.checked = true;
      no.checked = false;
    }
  }

  /**
   * Persist the form values and show a transient status.
   * Also notifies the background to re-apply settings to open compose windows.
   * @returns {Promise<void>}
   */
  async function save() {
    const patterns = readTextareaLines('blacklist-patterns');
    const cb = /** @type {HTMLInputElement} */ (getEl('confirm-before'));
    const def = /** @type {HTMLInputElement} */ (
      document.querySelector('input[name="confirm-default"]:checked')
    );
    setStatus(getMessage('uiSaving') || 'Saving…');
    await browser.storage?.local?.set?.({
      [KEY]: patterns,
      [KEY_CONFIRM]: !!cb.checked,
      [KEY_CONFIRM_DEFAULT]: def?.value === 'no' ? 'no' : 'yes',
      [KEY_WARN_BLACKLIST]:
        /** @type {HTMLInputElement} */ (getEl('warn-blacklist')).checked !== false,
      [KEY_DEBUG]:
        /** @type {HTMLInputElement | null} */ (document.getElementById('debug-logging'))
          ?.checked === true,
    });
    setStatus(getMessage('uiSaved') || 'Saved.');
    // Ask background to re-apply settings to open reply composers once.
    try {
      await browser.runtime?.sendMessage?.({ type: 'rwa:apply-settings-open-compose' });
    } catch (_) {}
    setTimeout(() => setStatus(''), 1500);
  }

  /**
   * Restore default settings and reload the form.
   * @returns {Promise<void>}
   */
  async function resetDefaults() {
    setStatus(getMessage('uiSaving') || 'Saving…');
    await browser.storage?.local?.set?.({
      [KEY]: DEFAULT_PATTERNS,
      [KEY_CONFIRM]: false,
      [KEY_CONFIRM_DEFAULT]: 'yes',
      [KEY_WARN_BLACKLIST]: true,
      [KEY_DEBUG]: false,
    });
    await load();
    setStatus(getMessage('uiResetDone') || 'Reset.');
    setTimeout(() => setStatus(''), 1500);
  }

  /**
   * Update the fixed status area without shifting the layout.
   * @param {string} text
   */
  function setStatus(text) {
    const el = /** @type {HTMLElement} */ (document.getElementById('status-label'));
    if (!el) return;
    el.textContent = text || '';
  }

  /**
   * Convenience i18n lookup compatible with both namespaces.
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

  /** Initialize event handlers and load settings on DOM ready. */
  function init() {
    getEl('save-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      save();
    });
    getEl('reset-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      resetDefaults();
    });
    load();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
