/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Tiny helpers to keep tests poetic and clear
function key(el, k, opts = {}) { el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, ...opts })); }
function qs(sel) { return /** @type {HTMLElement} */(document.querySelector(sel)); }

describe('confirm dialog — keys sing decisions', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: { onMessage: { addListener: (fn) => { listener = fn; } }, sendMessage: vi.fn() },
      scripting: {}, i18n: { getMessage: vi.fn() }
    };
    await import('../sources/content/confirm.js');
  });

  it('when I press y, it says yes', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['doc.pdf'], def: 'yes' });
    const dlg = await tickThen(() => qs('[role="dialog"]'));
    key(dlg, 'y');
    const res = await p; expect(res).toEqual({ ok: true });
  });

  it('when I press n, it says no', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['doc.pdf'], def: 'yes' });
    const dlg = await tickThen(() => qs('[role="dialog"]'));
    key(dlg, 'n');
    const res = await p; expect(res).toEqual({ ok: false });
  });

  it('when I press Escape, it says no', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['doc.pdf'], def: 'yes' });
    const dlg = await tickThen(() => qs('[role="dialog"]'));
    key(dlg, 'Escape');
    const res = await p; expect(res).toEqual({ ok: false });
  });

  it('Tab moves the focus between the two buttons', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['doc.pdf'], def: 'no' });
    await tick();
    const [btnNo, btnYes] = /** @type {HTMLButtonElement[]} */(Array.from(document.querySelectorAll('button')));
    // default is "no" → Tab should focus "yes"
    key(qs('[role="dialog"]'), 'Tab');
    expect(document.activeElement).toBe(btnYes);
    // Tab again should wrap back to "no"
    key(qs('[role="dialog"]'), 'Tab');
    expect(document.activeElement).toBe(btnNo);
    // Finish to resolve promise
    btnNo.click(); const res = await p; expect(res.ok).toBe(false);
  });
});

function tick() { return new Promise(r => setTimeout(r, 0)); }
async function tickThen(sel) { await tick(); return sel(); }

