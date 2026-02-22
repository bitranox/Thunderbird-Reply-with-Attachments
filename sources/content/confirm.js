/*
 * Module: content/confirm.js
 * Purpose: In‑compose tab modal confirmation. Presents Yes/No without losing
 *          focus to the editor, traps interactions, and supports keyboard
 *          shortcuts (J/Y = Yes; N/Esc = No).
 */
(function () {
  /*
   * Module: content/confirm.js
   * Purpose: Listen for confirmation requests in compose documents and render
   *          a small, accessible dialog (no window focus issues). The dialog
   *          traps focus, supports keyboard shortcuts, and cleans up fully.
   */
  // — Top-level intent: listen for confirmation requests and show a tiny, accessible dialog.
  try {
    browser.runtime.onMessage.addListener(handleConfirmMessage);
  } catch (_) {}

  try {
    notifyBackgroundReady();
  } catch (_) {}

  // — Message handling —
  /** Handle a runtime message asking to confirm adding attachments. */
  function handleConfirmMessage(payload) {
    if (!payload) return;
    if (isConfirmPayload(payload)) {
      const files = toFileList(payload);
      const def = defaultAnswer(payload);
      const text = buildConfirmationText(files);
      return showDialogAndReturnResult(text, def);
    }
    if (payload.type === 'rwa:warn-blacklist') {
      const rows = Array.isArray(payload.rows) ? payload.rows : [];
      return showWarningDialog(rows);
    }
  }
  // Also support blacklist warning with a simple ack dialog via the same handler.

  function notifyBackgroundReady() {
    const api = globalThis.browser || globalThis.messenger;
    const rt = api?.runtime;
    if (!rt?.sendMessage) return;
    let dispatched = false;
    const send = () => {
      if (dispatched) return;
      dispatched = true;
      try {
        rt.sendMessage({ type: 'rwa:compose-content-ready' }).catch(() => {});
      } catch (_) {}
    };
    try {
      if (typeof document !== 'undefined' && document.readyState !== 'loading') {
        globalThis.setTimeout ? setTimeout(send, 0) : send();
        return;
      }
    } catch (_) {
      send();
      return;
    }
    try {
      if (typeof globalThis.addEventListener === 'function') {
        globalThis.addEventListener('DOMContentLoaded', send, { once: true });
      } else {
        send();
      }
    } catch (_) {
      send();
    }
  }

  function isConfirmPayload(p) {
    return p && p.type === 'rwa:confirm-add';
  }
  /**
   * Normalize payload.files into a string array.
   * @param {any} p
   * @returns {string[]}
   */
  function toFileList(p) {
    return Array.isArray(p.files) ? p.files : [];
  }
  /**
   * Coerce default answer to 'yes' | 'no'.
   * @param {any} p
   * @returns {'yes'|'no'}
   */
  function defaultAnswer(p) {
    return p?.def === 'no' ? 'no' : 'yes';
  }

  // — Text building —
  /** Build a localized confirmation string from the first few filenames. */
  function buildConfirmationText(files) {
    const count = files.length;
    const list = files.slice(0, 5).join(', ');
    const more = count > 5 ? String(count - 5) : '';
    const localized =
      count <= 1
        ? i18n('confirmAddOne', [list])
        : i18n('confirmAddMany', [String(count), list, more]);
    if (localized) return localized;
    return fallbackEnglish(count, list, more);
  }

  /** Read a localized message; empty string on failure. */
  function i18n(key, args = []) {
    try {
      if (globalThis.browser?.i18n?.getMessage) return browser.i18n.getMessage(key, args) || '';
      if (globalThis.messenger?.i18n?.getMessage) return messenger.i18n.getMessage(key, args) || '';
    } catch (_) {}
    return '';
  }
  /** English fallback when i18n is missing. */
  function fallbackEnglish(count, list, more) {
    return count <= 1
      ? `Add attachment: ${list}?`
      : `Add attachments (${count}): ${list}${more ? ', +' + more + ' more' : ''}?`;
  }

  // — Dialog orchestration —
  /** Try to render an in-document dialog; fall back to native confirm(). */
  function showDialogAndReturnResult(text, def) {
    try {
      if (document?.body) return renderDialogInDocument(text, def);
    } catch (_) {}
    return Promise.resolve({ ok: confirm(text) });
  }

  /** Show a warning dialog listing blacklist-excluded files; returns {ok:true}. */
  function showWarningDialog(rows) {
    try {
      if (!document?.body) return Promise.resolve({ ok: true });
    } catch (_) {
      return Promise.resolve({ ok: true });
    }
    return new Promise((resolve) => {
      const prev = snapshotDocumentState();
      const dark = prefersDark();
      const overlay = createOverlay();
      const box = createDialogBox();
      const header = createHeader(i18n('warnBlacklistTitle') || 'Excluded by blacklist');
      try {
        header.querySelector('p').style.fontWeight = '700'; // bold title for blacklist warning
      } catch (_) {}
      const intro = document.createElement('div');
      intro.textContent = i18n('warnBlacklistIntro') || 'The following files will not be attached:';
      intro.style.margin = '0 0 8px 0';
      intro.style.fontSize = '12px';

      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';
      table.style.fontSize = '12px';
      const thead = document.createElement('thead');
      const trh = document.createElement('tr');
      for (const h of [i18n('warnColFile') || 'File', i18n('warnColPattern') || 'Pattern']) {
        const th = document.createElement('th');
        th.textContent = h;
        th.style.textAlign = 'left';
        th.style.borderBottom = '1px solid ' + (dark ? '#444' : '#ccc');
        th.style.padding = '4px 0';
        th.style.fontSize = '12px';
        th.style.fontWeight = '600';
        th.style.color = dark ? '#eaeaea' : '#000';
        trh.appendChild(th);
      }
      thead.appendChild(trh);
      table.appendChild(thead);
      const tbody = document.createElement('tbody');
      (rows || []).slice(0, 200).forEach((r) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = String(r?.name || '');
        td1.style.padding = '4px 0';
        td1.style.fontSize = '12px';
        td1.style.color = dark ? '#eaeaea' : '#000';
        const td2 = document.createElement('td');
        td2.textContent = String(r?.pattern || '');
        td2.style.padding = '4px 0';
        td2.style.fontSize = '12px';
        td2.style.color = dark ? '#eaeaea' : '#666';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);

      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      row.style.justifyContent = 'space-between';
      row.style.gap = '8px';
      row.style.marginTop = '12px';
      // Left: Donate button (primary style)
      const btnDonate = document.createElement('a');
      btnDonate.textContent = i18n('uiDonate') || 'Donate now';
      stylePrimaryButton(btnDonate);
      const donateHref = i18n('donateUrl') || '';
      if (donateHref) {
        btnDonate.addEventListener('click', (e) => {
          e.preventDefault();
          openUrlInBackground(donateHref);
        });
      } else {
        btnDonate.style.display = 'none';
      }
      // Hide donate when user has snoozed it
      (async () => {
        try {
          const hidden = await isDonateSnoozed();
          if (hidden) btnDonate.style.display = 'none';
        } catch (_) {}
      })();
      // Right: OK
      const btnOk = document.createElement('button');
      btnOk.textContent = i18n('warnOk') || 'OK';
      const left = document.createElement('div');
      left.appendChild(btnDonate);
      const right = document.createElement('div');
      right.style.textAlign = 'right';
      right.appendChild(btnOk);
      row.appendChild(left);
      row.appendChild(right);

      const cleanup = () => {
        restoreDocumentState(prev);
        releaseBlock();
        releaseTrap();
        releaseRefocus();
        overlay.remove();
        resolve({ ok: true });
      };
      btnOk.addEventListener('click', cleanup);
      assembleDialog(overlay, box, header, intro);
      box.appendChild(table);
      box.appendChild(row);
      const releaseBlock = blockBackgroundInteractions(overlay);
      const releaseTrap = trapFocus([btnOk], overlay);
      const releaseRefocus = refocusIfEditorStealsFocus('yes', btnOk, btnOk);
      preventScrollAndFocusDialog(overlay, 'yes', btnOk, btnOk);
      overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          cleanup();
        }
      });
    });
  }

  /** Render the dialog and return a promise resolving to { ok:boolean }. */
  function renderDialogInDocument(text, def) {
    return new Promise((resolve) => {
      const prev = snapshotDocumentState();
      const overlay = createOverlay();
      const box = createDialogBox();
      const header = createHeader(text);
      const { row, btnYes, btnNo } = createButtons(
        i18n('confirmYes') || 'Yes',
        i18n('confirmNo') || 'No'
      );
      assembleDialog(overlay, box, header, row);
      const releaseBlock = blockBackgroundInteractions(overlay);
      const releaseTrap = trapFocus([btnNo, btnYes], overlay);
      const releaseRefocus = refocusIfEditorStealsFocus(def, btnNo, btnYes);
      const cleanup = (ok) => {
        restoreDocumentState(prev);
        releaseBlock();
        releaseTrap();
        releaseRefocus();
        overlay.remove();
        resolve({ ok });
      };
      btnYes.addEventListener('click', () => cleanup(true));
      btnNo.addEventListener('click', () => cleanup(false));
      preventScrollAndFocusDialog(overlay, def, btnNo, btnYes);
    });
  }

  // — Small helpers (DOM building) —
  /** Create and append the overlay element. */
  function createOverlay() {
    const el = document.createElement('div');
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'rwa-confirm-text');
    el.setAttribute('aria-describedby', 'rwa-confirm-text');
    el.setAttribute('data-testid', 'rwa-confirm-overlay');
    const dark = prefersDark();
    el.style.cssText =
      'position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;pointer-events:auto;' +
      (dark ? 'background:rgba(0,0,0,0.6);' : 'background:rgba(0,0,0,0.4);');
    el.tabIndex = -1;
    el.contentEditable = 'false';
    document.body.appendChild(el);
    return el;
  }
  /** Create the dialog container. */
  function createDialogBox() {
    const box = document.createElement('div');
    const dark = prefersDark();
    const bg = dark ? '#1e1e1e' : '#fff';
    const fg = dark ? '#eaeaea' : '#000';
    const br = dark ? '#444' : '#888';
    box.style.cssText = `background:${bg};color:${fg};min-width:320px;max-width:600px;padding:14px;border:1px solid ${br};border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.3);font:12px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,Helvetica,Arial,sans-serif;`;
    box.contentEditable = 'false';
    return box;
  }
  /** Create the header node that holds the message. */
  function createHeader(text) {
    const header = document.createElement('div');
    header.style.cssText = 'display:flex;align-items:center;gap:10px;margin:0 0 12px 0;';
    header.contentEditable = 'false';
    const p = document.createElement('p');
    p.id = 'rwa-confirm-text';
    p.textContent = text;
    p.style.margin = '0';
    p.contentEditable = 'false';
    header.appendChild(p);
    return header;
  }
  /** Create Yes/No buttons with a right-aligned row. */
  function createButtons(yesLabel, noLabel) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.justifyContent = 'space-between';
    row.style.gap = '8px';
    row.contentEditable = 'false';
    // Left: Donate button (hidden when snoozed for 90 days)
    const btnDonate = document.createElement('a');
    btnDonate.textContent = i18n('uiDonate') || 'Donate now';
    stylePrimaryButton(btnDonate);
    const donateHref = i18n('donateUrl') || '';
    if (donateHref) {
      btnDonate.addEventListener('click', (e) => {
        e.preventDefault();
        openUrlInBackground(donateHref);
      });
    } else {
      btnDonate.style.display = 'none';
    }
    // Async check: hide donate if user snoozed it.
    (async () => {
      try {
        const hidden = await isDonateSnoozed();
        if (hidden) btnDonate.style.display = 'none';
      } catch (_) {}
    })();
    const left = document.createElement('div');
    left.appendChild(btnDonate);
    // Right: No / Yes buttons
    const right = document.createElement('div');
    right.style.textAlign = 'right';
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.gap = '8px';
    const btnNo = document.createElement('button');
    btnNo.textContent = noLabel;
    btnNo.contentEditable = 'false';
    btnNo.setAttribute('data-testid', 'rwa-confirm-no');
    const btnYes = document.createElement('button');
    btnYes.textContent = yesLabel;
    btnYes.contentEditable = 'false';
    btnYes.setAttribute('data-testid', 'rwa-confirm-yes');
    right.appendChild(btnNo);
    right.appendChild(btnYes);
    row.appendChild(left);
    row.appendChild(right);
    // expose donate for focus trap ordering
    row._btnDonate = btnDonate;
    return { row, btnYes, btnNo };
  }
  /** Append parts into the overlay. */
  function assembleDialog(overlay, box, header, buttonRow) {
    box.appendChild(header);
    box.appendChild(buttonRow);
    overlay.appendChild(box);
  }

  // — Interaction management —
  /** Block interactions outside the dialog and return a disposer. */
  const BLOCKED_EVENTS = [
    'mousedown',
    'mouseup',
    'click',
    'dblclick',
    'contextmenu',
    'keydown',
    'keypress',
    'keyup',
    'wheel',
    'touchstart',
    'touchmove',
    'pointerdown',
    'pointerup',
    'input',
  ];
  function blockBackgroundInteractions(overlay) {
    disableEditing();
    const types = BLOCKED_EVENTS;
    const blocker = (e) => {
      const t = /** @type {Node} */ (e.target);
      if (!overlay.contains(t)) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };
    const opts = { capture: true, passive: false };
    for (const type of types) document.addEventListener(type, blocker, opts);
    return () => {
      for (const type of types)
        try {
          document.removeEventListener(type, blocker, opts);
        } catch (_) {}
    };
  }
  /** Trap focus and key handling; return a disposer. */
  function trapFocus(focusables, overlay) {
    const onKey = (e) => {
      const k = (e.key || '').toLowerCase();
      if (k === 'y' || k === 'j') {
        e.preventDefault();
        clickLast(focusables);
        return;
      }
      if (k === 'n' || e.key === 'Escape') {
        e.preventDefault();
        clickFirst(focusables);
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        focusNext(focusables, e.shiftKey);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        focusNext(focusables, true);
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        focusNext(focusables, false);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        document.activeElement === focusables[0] ? clickFirst(focusables) : clickLast(focusables);
      }
    };
    overlay.addEventListener('keydown', onKey);
    return () => {
      try {
        overlay.removeEventListener('keydown', onKey);
      } catch (_) {}
    };
  }
  /** Ensure the dialog retains focus if the editor steals it; return a disposer. */
  function refocusIfEditorStealsFocus(def, btnNo, btnYes) {
    const refocus = () => {
      const a = document.activeElement;
      if (a !== btnNo && a !== btnYes) focusDefault(def, btnNo, btnYes);
    };
    document.addEventListener('focusin', refocus);
    return () => {
      try {
        document.removeEventListener('focusin', refocus);
      } catch (_) {}
    };
  }
  /** Prevent background scroll and focus the default button. */
  function preventScrollAndFocusDialog(overlay, def, btnNo, btnYes) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      try {
        overlay.focus({ preventScroll: true });
      } catch (_) {}
      focusDefault(def, btnNo, btnYes);
    }, 0);
  }
  /**
   * Focus the default answer button.
   * @param {'yes'|'no'} def Which button should be focused by default
   * @param {HTMLButtonElement} btnNo
   * @param {HTMLButtonElement} btnYes
   */
  function focusDefault(def, btnNo, btnYes) {
    try {
      (def === 'no' ? btnNo : btnYes).focus({ preventScroll: true });
    } catch (_) {}
  }
  /** Click the first focusable control (usually No). */
  function clickFirst(list) {
    try {
      list[0].click();
    } catch (_) {}
  }
  /** Click the last focusable control (usually Yes). */
  function clickLast(list) {
    try {
      list[list.length - 1].click();
    } catch (_) {}
  }
  /**
   * Move focus between dialog buttons.
   * @param {HTMLElement[]} list Focusable controls (order matters)
   * @param {boolean} backwards When true, move focus backwards
   */
  function focusNext(list, backwards) {
    const idx = list.indexOf(document.activeElement);
    const next = backwards
      ? idx <= 0
        ? list.length - 1
        : idx - 1
      : idx >= list.length - 1
        ? 0
        : idx + 1;
    try {
      list[next].focus();
    } catch (_) {}
  }

  // — Document state —
  /** Capture minimal document editing/scroll state to restore later. */
  function snapshotDocumentState() {
    return {
      overflow: document.body.style.overflow,
      contentEditable: document.body.contentEditable,
      designMode: document.designMode,
    };
  }
  /** Restore document state captured by snapshotDocumentState. */
  function restoreDocumentState(prev) {
    document.body.style.overflow = prev.overflow;
    try {
      document.body.contentEditable = prev.contentEditable;
    } catch (_) {}
    try {
      document.designMode = prev.designMode;
    } catch (_) {}
  }
  /** Temporarily disable editing in the compose document while modal is open. */
  function disableEditing() {
    try {
      document.body.contentEditable = 'false';
    } catch (_) {}
    try {
      document.designMode = 'off';
    } catch (_) {}
  }
  // Expose internals for focused tests
  globalThis.App = globalThis.App || {};
  App.ContentConfirm = App.ContentConfirm || {};
  App.ContentConfirm.Internal = {
    isConfirmPayload,
    toFileList,
    defaultAnswer,
    buildConfirmationText,
    i18n,
    fallbackEnglish,
    trapFocus,
    focusNext,
    BLOCKED_EVENTS,
    showDialogAndReturnResult,
  };

  /** Detect dark color-scheme preference for basic theming of the modal. */
  function prefersDark() {
    try {
      return globalThis.matchMedia && globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (_) {
      return false;
    }
  }
  /** Style a primary (blue) button consistent with options UI. */
  function stylePrimaryButton(btn) {
    const brand = '#0a6cff';
    const brand600 = '#0a5edb';
    btn.style.background = brand;
    btn.style.border = '1px solid ' + brand;
    btn.style.color = '#fff';
    btn.style.padding = '4px 10px';
    btn.style.borderRadius = '6px';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '12px';
    btn.addEventListener('mouseover', () => (btn.style.background = brand600));
    btn.addEventListener('mouseout', () => (btn.style.background = brand));
  }
  /** Ask background to open a URL in a new tab (safe from content context). */
  function openUrlInBackground(url) {
    try {
      if (browser?.runtime?.sendMessage) browser.runtime.sendMessage({ type: 'rwa:open-url', url });
    } catch (_) {
      try {
        if (/^https?:\/\//i.test(url)) window.open(url, '_blank', 'noopener');
      } catch (_) {}
    }
  }

  // — Donation visibility helpers —
  const KEY_HIDE_UNTIL = 'donateHideUntil';
  async function isDonateSnoozed() {
    try {
      const res = await browser.storage?.local?.get?.({ [KEY_HIDE_UNTIL]: 0 });
      const until = Number(res?.[KEY_HIDE_UNTIL] || 0);
      return Number.isFinite(until) && until > Date.now();
    } catch (_) {
      return false;
    }
  }
})();
