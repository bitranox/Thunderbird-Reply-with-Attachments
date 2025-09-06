/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('content/confirm — N cancels', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: { onMessage: { addListener: (fn) => (listener = fn) } },
      i18n: { getMessage: vi.fn(() => '') },
    };
    await import('../sources/content/confirm.js');
  });

  it('pressing n cancels dialog', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['a'], def: 'yes' });
    await new Promise((r) => setTimeout(r, 0));
    const overlay = document.querySelector('[role="dialog"]');
    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'n', bubbles: true }));
    const res = await p;
    expect(res).toEqual({ ok: false });
  });
});
