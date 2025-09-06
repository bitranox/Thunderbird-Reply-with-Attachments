/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

function dispatchOutside(type, cancelable = true) {
  const outside = document.createElement('div');
  document.body.appendChild(outside);
  const ev = new Event(type, { bubbles: true, cancelable });
  outside.dispatchEvent(ev);
  outside.remove();
  return ev;
}

describe('content/confirm — blocks background interactions', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: { onMessage: { addListener: (fn) => (listener = fn) } },
      i18n: { getMessage: vi.fn(() => '') },
    };
    await import('../sources/content/confirm.js');
  });

  it('prevents mousedown/contextmenu/wheel outside overlay', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['a'] });
    await new Promise((r) => setTimeout(r, 0));
    const types = ['mousedown', 'contextmenu', 'wheel'];
    for (const t of types) {
      const ev = dispatchOutside(t, true);
      expect(ev.defaultPrevented).toBe(true);
    }
    // end dialog
    document
      .querySelector('[data-testid="rwa-confirm-no"]')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await p;
  });

  it('Enter on default yes resolves ok:true', async () => {
    const resPromise = listener({ type: 'rwa:confirm-add', files: ['a'], def: 'yes' });
    await new Promise((r) => setTimeout(r, 0));
    const overlay = document.querySelector('[role="dialog"]');
    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    const res = await resPromise;
    expect(res).toEqual({ ok: true });
  });
});
