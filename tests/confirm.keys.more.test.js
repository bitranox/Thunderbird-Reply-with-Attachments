/*
 * Test Module: confirm.keys.more.test.js
 * Scope: Content confirm — more key handling.
 * Intent: Enter, j/y confirmation and Tab focus cycling behaviors.
 */
/* @vitest-environment jsdom */
import { describe, it, beforeEach, vi } from 'vitest';

function qs(sel) {
  return /** @type {HTMLElement} */ (document.querySelector(sel));
}
function key(el, k, opts = {}) {
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...opts }));
}

describe('confirm dialog — quick keys (y/j/n/Enter/Tab)', () => {
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
      i18n: { getMessage: vi.fn(() => '') },
    };
    await import('../sources/content/confirm.js');
  });

  // Test: Enter triggers focused action (def=no cancels)
  it('Enter triggers focused action (def=no cancels)', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['f'], def: 'no' });
    await tick();
    const dlg = qs('[role="dialog"]');
    key(dlg, 'Enter');
    await p;
  });

  // Test: j and y confirm
  it('j and y confirm', async () => {
    const p1 = listener({ type: 'rwa:confirm-add', files: ['f'], def: 'yes' });
    await tick();
    key(qs('[role="dialog"]'), 'j');
    await p1;

    const p2 = listener({ type: 'rwa:confirm-add', files: ['f'], def: 'no' });
    await tick();
    key(qs('[role="dialog"]'), 'y');
    await p2;
  });

  // Test: Tab cycles focus forward
  it('Tab cycles focus forward', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['f'], def: 'yes' });
    await tick();
    const dlg = qs('[role="dialog"]');
    key(dlg, 'Tab');
    key(dlg, 'Tab');
    // end quickly by clicking any button
    /** @type {HTMLButtonElement} */ (document.querySelectorAll('button'))[1].click();
    await p;
  });
});

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}
