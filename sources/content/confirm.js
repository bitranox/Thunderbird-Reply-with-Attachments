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
  try { browser.runtime.onMessage.addListener(handleConfirmMessage); } catch (_) {}

  // — Message handling —
  /** Handle a runtime message asking to confirm adding attachments. */
  function handleConfirmMessage(payload) {
    if (!isConfirmPayload(payload)) return;
    const files = toFileList(payload);
    const def = defaultAnswer(payload);
    const text = buildConfirmationText(files);
    return showDialogAndReturnResult(text, def);
  }

  function isConfirmPayload(p) { return p && p.type === 'rwa:confirm-add'; }
  function toFileList(p) { return Array.isArray(p.files) ? p.files : []; }
  function defaultAnswer(p) { return p?.def === 'no' ? 'no' : 'yes'; }

  // — Text building —
  /** Build a localized confirmation string from the first few filenames. */
  function buildConfirmationText(files) {
    const count = files.length;
    const list = files.slice(0, 5).join(', ');
    const more = count > 5 ? String(count - 5) : '';
    const localized = count <= 1
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
    try { if (document?.body) return renderDialogInDocument(text, def); } catch (_) {}
    return Promise.resolve({ ok: confirm(text) });
  }

  /** Render the dialog and return a promise resolving to { ok:boolean }. */
  function renderDialogInDocument(text, def) {
    return new Promise((resolve) => {
      const prev = snapshotDocumentState();
      const overlay = createOverlay();
      const box = createDialogBox();
      const header = createHeader(text);
      const { row, btnYes, btnNo } = createButtons(i18n('confirmYes') || 'Yes', i18n('confirmNo') || 'No');
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
    el.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;pointer-events:auto;';
    el.tabIndex = -1;
    el.contentEditable = 'false';
    document.body.appendChild(el);
    return el;
  }
  /** Create the dialog container. */
  function createDialogBox() {
    const box = document.createElement('div');
    box.style.cssText = 'background:#fff;color:#000;min-width:320px;max-width:600px;padding:16px;border:1px solid #888;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.3);font:menu;';
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
    p.textContent = text; p.style.margin = '0'; p.contentEditable = 'false';
    header.appendChild(p);
    return header;
  }
  /** Create Yes/No buttons with a right-aligned row. */
  function createButtons(yesLabel, noLabel) {
    const row = document.createElement('div');
    row.style.textAlign = 'right'; row.style.gap = '8px'; row.contentEditable = 'false';
    const btnNo = document.createElement('button');
    btnNo.textContent = noLabel; btnNo.style.marginRight = '8px'; btnNo.contentEditable = 'false';
    const btnYes = document.createElement('button');
    btnYes.textContent = yesLabel; btnYes.contentEditable = 'false';
    row.appendChild(btnNo); row.appendChild(btnYes);
    return { row, btnYes, btnNo };
  }
  /** Append parts into the overlay. */
  function assembleDialog(overlay, box, header, buttonRow) {
    box.appendChild(header); box.appendChild(buttonRow); overlay.appendChild(box);
  }

  // — Interaction management —
  /** Block interactions outside the dialog and return a disposer. */
  function blockBackgroundInteractions(overlay) {
    disableEditing();
    const types = ['mousedown','mouseup','click','dblclick','contextmenu','keydown','keypress','keyup','wheel','touchstart','touchmove','pointerdown','pointerup','input'];
    const blocker = (e) => { const t = /** @type {Node} */(e.target); if (!overlay.contains(t)) { e.stopImmediatePropagation(); e.preventDefault(); } };
    for (const type of types) document.addEventListener(type, blocker, { capture: true });
    return () => { for (const type of types) try { document.removeEventListener(type, blocker, { capture: true }); } catch (_) {} };
  }
  /** Trap focus and key handling; return a disposer. */
  function trapFocus(focusables, overlay) {
    const onKey = (e) => {
      const k = (e.key || '').toLowerCase();
      if (k === 'y' || k === 'j') { e.preventDefault(); clickLast(focusables); return; }
      if (k === 'n' || e.key === 'Escape') { e.preventDefault(); clickFirst(focusables); return; }
      if (e.key === 'Tab') { e.preventDefault(); focusNext(focusables, e.shiftKey); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); focusNext(focusables, true); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); focusNext(focusables, false); }
      if (e.key === 'Enter') { e.preventDefault(); (document.activeElement === focusables[0]) ? clickFirst(focusables) : clickLast(focusables); }
    };
    overlay.addEventListener('keydown', onKey);
    return () => { try { overlay.removeEventListener('keydown', onKey); } catch (_) {} };
  }
  /** Ensure the dialog retains focus if the editor steals it; return a disposer. */
  function refocusIfEditorStealsFocus(def, btnNo, btnYes) {
    const refocus = () => { const a = document.activeElement; if (a !== btnNo && a !== btnYes) focusDefault(def, btnNo, btnYes); };
    document.addEventListener('focusin', refocus);
    return () => { try { document.removeEventListener('focusin', refocus); } catch (_) {} };
  }
  /** Prevent background scroll and focus the default button. */
  function preventScrollAndFocusDialog(overlay, def, btnNo, btnYes) {
    document.body.style.overflow = 'hidden';
    setTimeout(() => { try { overlay.focus({ preventScroll: true }); } catch (_) {} focusDefault(def, btnNo, btnYes); }, 0);
  }
  /** Focus the default answer button. */
  function focusDefault(def, btnNo, btnYes) { try { (def === 'no' ? btnNo : btnYes).focus({ preventScroll: true }); } catch (_) {} }
  function clickFirst(list) { try { list[0].click(); } catch (_) {} }
  function clickLast(list) { try { list[list.length - 1].click(); } catch (_) {} }
  function focusNext(list, backwards) {
    const idx = list.indexOf(document.activeElement);
    const next = backwards ? (idx <= 0 ? list.length - 1 : idx - 1) : (idx >= list.length - 1 ? 0 : idx + 1);
    try { list[next].focus(); } catch (_) {}
  }

  // — Document state —
  function snapshotDocumentState() {
    return { overflow: document.body.style.overflow, contentEditable: document.body.contentEditable, designMode: document.designMode };
  }
  function restoreDocumentState(prev) {
    document.body.style.overflow = prev.overflow;
    try { document.body.contentEditable = prev.contentEditable; } catch (_) {}
    try { document.designMode = prev.designMode; } catch (_) {}
  }
  function disableEditing() { try { document.body.contentEditable = 'false'; } catch (_) {} try { document.designMode = 'off'; } catch (_) {} }
})();
