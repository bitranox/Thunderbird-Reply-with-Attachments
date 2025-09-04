// Options page logic for blacklist patterns
(function () {
  const KEY = 'blacklistPatterns';
  const KEY_CONFIRM = 'confirmBeforeAdd';
  const KEY_CONFIRM_DEFAULT = 'confirmDefaultChoice';

  function getEl(id) { return /** @type {HTMLElement} */(document.getElementById(id)); }

  function readTextareaLines(id) {
    const ta = /** @type {HTMLTextAreaElement} */(getEl(id));
    // Normalize patterns to lowercase on save to ensure case-insensitive behavior
    return ta.value.split('\n').map((s) => s.trim().toLowerCase()).filter(Boolean);
  }

  function setTextareaLines(id, arr) {
    const ta = /** @type {HTMLTextAreaElement} */(getEl(id));
    ta.value = (arr || []).join('\n');
  }

  async function load() {
    try {
    const res = await browser.storage?.local?.get?.({ [KEY]: [], [KEY_CONFIRM]: false, [KEY_CONFIRM_DEFAULT]: 'yes' });
      const patterns = Array.isArray(res?.[KEY]) ? res[KEY] : [];
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

  async function save() {
    const patterns = readTextareaLines('blacklist-patterns');
    const cb = /** @type {HTMLInputElement} */(getEl('confirm-before'));
    const def = /** @type {HTMLInputElement} */(document.querySelector('input[name="confirm-default"]:checked'));
    await browser.storage?.local?.set?.({ [KEY]: patterns, [KEY_CONFIRM]: !!cb.checked, [KEY_CONFIRM_DEFAULT]: def?.value === 'no' ? 'no' : 'yes' });
    showStatus('status-saved');
  }

  async function resetDefaults() {
    await browser.storage?.local?.set?.({ [KEY]: [], [KEY_CONFIRM]: false, [KEY_CONFIRM_DEFAULT]: 'yes' });
    await load();
    showStatus('status-reset');
  }

  function showStatus(id) {
    const el = getEl(id);
    el.style.display = 'inline';
    setTimeout(() => { el.style.display = 'none'; }, 1500);
  }

  function init() {
    getEl('save-btn')?.addEventListener('click', (e) => { e.preventDefault(); save(); });
    getEl('reset-btn')?.addEventListener('click', (e) => { e.preventDefault(); resetDefaults(); });
    load();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
