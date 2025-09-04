// Compose content script: shows a simple confirmation dialog upon request
(function () {
  function msg(key, args = []) {
    try {
      if (globalThis.browser?.i18n?.getMessage) return browser.i18n.getMessage(key, args) || '';
      if (globalThis.messenger?.i18n?.getMessage) return messenger.i18n.getMessage(key, args) || '';
    } catch (_) {}
    return '';
  }
  try {
    browser.runtime.onMessage.addListener((msgIn) => {
      if (!msgIn || msgIn.type !== 'rwa:confirm-add') return;
      const files = Array.isArray(msgIn.files) ? msgIn.files : [];
      const count = files.length;
      const list = files.slice(0, 5).join(', ');
      const moreCount = count > 5 ? String(count - 5) : '';
      const def = (msgIn.def === 'no') ? 'no' : 'yes';
      let text = '';
      if (count <= 1) {
        text = msg('confirmAddOne', [list]);
      } else {
        // confirmAddMany expects count, list, moreCount
        text = msg('confirmAddMany', [String(count), list, moreCount]);
      }
      if (!text) {
        // English fallback if i18n is missing
        text = count <= 1
          ? `Add attachment: ${list}?`
          : `Add attachments (${count}): ${list}${moreCount ? ', +' + moreCount + ' more' : ''}?`;
      }
      try {
        // Try custom modal to control default focus
        if (typeof document !== 'undefined' && document?.body) {
          return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;';
            const box = document.createElement('div');
            box.style.cssText = 'background:#fff;color:#000;min-width:320px;max-width:600px;padding:16px;border:1px solid #888;border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,.3);font:menu;';
            const p = document.createElement('p'); p.textContent = text; p.style.margin = '0 0 12px 0';
            const btnRow = document.createElement('div'); btnRow.style.textAlign = 'right'; btnRow.style.gap = '8px';
            const btnNo = document.createElement('button'); btnNo.textContent = msg('confirmNo') || 'No'; btnNo.style.marginRight = '8px';
            const btnYes = document.createElement('button'); btnYes.textContent = msg('confirmYes') || 'Yes';
            btnRow.appendChild(btnNo); btnRow.appendChild(btnYes);
            box.appendChild(p); box.appendChild(btnRow); overlay.appendChild(box); document.body.appendChild(overlay);
            const cleanup = (ok) => { overlay.remove(); resolve({ ok }); };
            btnYes.addEventListener('click', () => cleanup(true));
            btnNo.addEventListener('click', () => cleanup(false));
            // Default focus
            setTimeout(() => { (def === 'no' ? btnNo : btnYes).focus(); }, 0);
            // Keyboard Enter/Escape
            overlay.addEventListener('keydown', (e) => {
              if (e.key === 'Enter') { e.preventDefault(); (document.activeElement === btnNo) ? cleanup(false) : cleanup(true); }
              if (e.key === 'Escape') { e.preventDefault(); cleanup(false); }
            });
          });
        }
      } catch (_) {}
      const ok = confirm(text);
      return Promise.resolve({ ok });
    });
  } catch (_) {}
})();
