/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

function dispatchOutside(type, opts = {}) {
  const outside = document.createElement('div');
  document.body.appendChild(outside);
  const ev = new Event(type, { bubbles: true, cancelable: true, ...opts });
  outside.dispatchEvent(ev);
  outside.remove();
  return ev;
}

describe('content/confirm — more blocked events', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: { onMessage: { addListener: (fn) => (listener = fn) } },
      i18n: { getMessage: vi.fn(() => '') },
    };
    await import('../sources/content/confirm.js');
  });

  it('prevents pointerdown and input outside overlay', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['x'] });
    await new Promise((r) => setTimeout(r, 0));
    const ev1 = dispatchOutside('pointerdown');
    const ev2 = dispatchOutside('input');
    expect(ev1.defaultPrevented).toBe(true);
    expect(ev2.defaultPrevented).toBe(true);
    document
      .querySelector('[data-testid="rwa-confirm-no"]')
      .dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await p;
  });
});
