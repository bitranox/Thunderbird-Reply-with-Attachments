/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

function qs(sel) {
  return /** @type {HTMLElement} */ (document.querySelector(sel));
}
function key(el, k, opts = {}) {
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...opts }));
}

describe('confirm dialog — focus dances in a circle', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: {
        onMessage: {
          addListener: (fn) => {
            listener = fn;
          },
        },
      },
      i18n: { getMessage: vi.fn() },
    };
    await import('../sources/content/confirm.js');
  });

  it('Shift+Tab cycles backwards', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['x'], def: 'yes' });
    await tick();
    const dlg = qs('[role="dialog"]');
    const [noBtn, yesBtn] = /** @type {HTMLButtonElement[]} */ (
      Array.from(document.querySelectorAll('button'))
    );
    // Default def=yes → focus yes; Shift+Tab should move to no
    key(dlg, 'Tab', { shiftKey: true });
    expect(document.activeElement).toBe(noBtn);
    // Cleanly end
    noBtn.click();
    await p;
  });

  it('ArrowLeft/Up move focus back; ArrowRight/Down move forward', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['x'], def: 'no' });
    await tick();
    const dlg = qs('[role="dialog"]');
    const [noBtn, yesBtn] = /** @type {HTMLButtonElement[]} */ (
      Array.from(document.querySelectorAll('button'))
    );
    // def=no → focus no; Right moves to yes
    key(dlg, 'ArrowRight');
    expect(document.activeElement).toBe(yesBtn);
    // Left moves back to no
    key(dlg, 'ArrowLeft');
    expect(document.activeElement).toBe(noBtn);
    // Up also moves back (wrap behavior)
    key(dlg, 'ArrowUp');
    expect(document.activeElement).toBe(yesBtn); // from no -> up -> yes (since 2 items)
    // Finish
    noBtn.click();
    await p;
  });
});

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}
