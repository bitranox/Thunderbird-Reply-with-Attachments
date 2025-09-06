/*
 * Module: confirm_page.js
 * Purpose: Popup window UI for confirmation when the content script path
 *          is not available. Focuses the default action and sends the
 *          user's choice back to the background via runtime messaging.
 */
(function () {
  /*
   * Module: confirm_page.js
   * Purpose: Drive the standalone fallback confirmation window. Reads query
   *          params, renders labels, handles keyboard, and replies via
   *          runtime messaging with { ok: boolean }.
   */
  // — Boot —
  const params = readParams();
  try {
    document.title = i18n('confirmTitle') || 'Confirm Attachments';
  } catch (_) {}
  const els = grabElements();
  const text = buildText(params);
  render(text, els);
  wireEvents(els, params);

  // — Params —
  /** Read and normalize URL query parameters. */
  function readParams() {
    const p = new URLSearchParams(location.search);
    return {
      count: Number(p.get('c') || '0'),
      list: p.get('list') || '',
      more: p.get('more') || '',
      def: (p.get('def') || 'yes').toLowerCase() === 'no' ? 'no' : 'yes',
      token: p.get('t') || '',
    };
  }

  // — Elements —
  /** Grab DOM elements used by the page. */
  function grabElements() {
    return {
      text: document.getElementById('text'),
      yes: document.getElementById('yes'),
      no: document.getElementById('no'),
    };
  }

  // — Text —
  /** Build the localized confirmation string. */
  function buildText({ count, list, more }) {
    return count <= 1
      ? i18n('confirmAddOne', [list]) || `Add attachment: ${list}?`
      : i18n('confirmAddMany', [String(count), list, more]) ||
          `Add attachments (${count}): ${list}${more ? `, +${more} more` : ''}?`;
  }
  /** Get a localized string or empty on failure. */
  function i18n(k, a = []) {
    try {
      return browser?.i18n?.getMessage?.(k, a) || messenger?.i18n?.getMessage?.(k, a) || '';
    } catch (_) {
      return '';
    }
  }

  // — Render —
  /** Render labels into the DOM. */
  function render(text, els) {
    els.text.textContent = text;
    els.yes.textContent = i18n('confirmYes') || 'Yes';
    els.no.textContent = i18n('confirmNo') || 'No';
  }

  // — Events —
  /** Wire click and keyboard handlers and focus defaults. */
  function wireEvents(els, { def, token }) {
    const send = async (ok) => {
      try {
        await browser.runtime.sendMessage({ type: 'rwa:confirm-result', t: token, ok });
      } catch (_) {}
      window.close();
    };
    els.yes.addEventListener('click', () => send(true));
    els.no.addEventListener('click', () => send(false));
    focusDefault(def, els);
    window.addEventListener('focus', () => defer(() => focusDefault(def, els)));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') defer(() => focusDefault(def, els));
    });
    window.addEventListener('keydown', (e) => handleKeydown(e, els));
  }
  /** Handle Enter/Escape to confirm/cancel. */
  function handleKeydown(e, els) {
    if (e.key === 'Escape') {
      e.preventDefault();
      els.no.click();
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      (document.activeElement === els.no ? els.no : els.yes).click();
    }
  }
  /** Focus the default answer button. */
  function focusDefault(def, els) {
    try {
      window.focus();
    } catch (_) {}
    const d = def === 'no' ? els.no : els.yes;
    try {
      d.setAttribute('autofocus', 'true');
      d.focus({ preventScroll: true });
    } catch (_) {}
  }
  function defer(fn) {
    (globalThis.setTimeout ? globalThis.setTimeout(fn, 0) : setTimeout(fn, 0));
  }
})();
