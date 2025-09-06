/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('content/confirm — refocus when editor steals focus', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = { runtime: { onMessage: { addListener: (fn) => (listener = fn) } }, i18n: { getMessage: vi.fn(() => '') } };
    await import('../sources/content/confirm.js');
  });

  it('focusin on a non-dialog element snaps focus back to default (def=no)', async () => {
    const p = listener({ type: 'rwa:confirm-add', files: ['f'], def: 'no' });
    await new Promise((r) => setTimeout(r, 0));
    const noBtn = /** @type {HTMLButtonElement} */ (document.querySelector('[data-testid="rwa-confirm-no"]'));
    const outside = document.createElement('input');
    document.body.appendChild(outside);
    outside.focus();
    document.dispatchEvent(new Event('focusin', { bubbles: true }));
    expect(document.activeElement === noBtn).toBe(true);
    noBtn.click();
    await p;
  });
});

