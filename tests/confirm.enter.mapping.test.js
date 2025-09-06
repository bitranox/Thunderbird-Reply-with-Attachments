/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

function qs(sel) {
  return /** @type {HTMLElement} */ (document.querySelector(sel));
}

describe('content/confirm — Enter maps to focused button', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: { onMessage: { addListener: (fn) => (listener = fn) } },
      i18n: { getMessage: vi.fn(() => '') },
    };
    await import('../sources/content/confirm.js');
  });

  it('Enter on No returns ok:false; Enter on Yes returns ok:true', async () => {
    // def=no → focus No
    const p1 = listener({ type: 'rwa:confirm-add', files: ['a'], def: 'no' });
    await new Promise((r) => setTimeout(r, 0));
    const ov1 = qs('[role="dialog"]');
    ov1.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    const r1 = await p1;
    expect(r1).toEqual({ ok: false });

    // def=yes → focus Yes
    const p2 = listener({ type: 'rwa:confirm-add', files: ['a'], def: 'yes' });
    await new Promise((r) => setTimeout(r, 0));
    const ov2 = qs('[role="dialog"]');
    ov2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    const r2 = await p2;
    expect(r2).toEqual({ ok: true });
  });
});
