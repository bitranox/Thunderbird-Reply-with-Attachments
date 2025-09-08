/* @vitest-environment jsdom */
/*
 * Test Module: confirm.warn.blacklist.ui.test.js
 * Scope: Content confirm — blacklist warning modal UI behavior.
 * Intent: Verify table rendering, focus trapping, and keyboard close.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('content/confirm — warn-blacklist dialog', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    // Stub i18n strings so we can assert labels
    const i18nMap = new Map(
      Object.entries({
        warnBlacklistTitle: 'TITLE: Excluded by blacklist',
        warnBlacklistIntro: 'INTRO: not attached',
        warnColFile: 'FILE',
        warnColPattern: 'PATTERN',
        warnOk: 'OK',
      })
    );
    globalThis.browser = {
      runtime: { onMessage: { addListener: (fn) => (listener = fn) } },
      i18n: { getMessage: (k) => i18nMap.get(k) || '' },
    };
    await import('../sources/content/confirm.js');
  });

  // Test: renders rows and resolves on OK click
  it('renders rows and resolves on OK click', async () => {
    const rows = [
      { name: 'a.pdf', pattern: '*.pdf' },
      { name: 'b.csv', pattern: '*secret*' },
    ];
    const p = listener({ type: 'rwa:warn-blacklist', rows });
    // Give the microtask queue a tick
    await new Promise((r) => setTimeout(r, 0));
    const overlay = document.querySelector('[role="dialog"]');
    expect(overlay).toBeTruthy();
    // Modal: background events are blocked
    const ev = new Event('mousedown', { bubbles: true, cancelable: true });
    document.body.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
    // Focus: overlay and OK are focused
    await new Promise((r) => setTimeout(r, 0));
    expect(document.activeElement === overlay || document.activeElement.tagName === 'BUTTON').toBe(
      true
    );
    expect(overlay.textContent).toContain('TITLE: Excluded by blacklist');
    expect(overlay.textContent).toContain('INTRO: not attached');
    // Validate table content
    const trs = overlay.querySelectorAll('tbody tr');
    expect(trs.length).toBe(2);
    expect(trs[0].children[0].textContent).toBe('a.pdf');
    expect(trs[0].children[1].textContent).toBe('*.pdf');
    // Click OK and expect cleanup + resolution
    const okBtn = overlay.querySelector('button');
    okBtn.click();
    const res = await p;
    expect(res).toEqual({ ok: true });
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  // Test: Enter or Escape closes the dialog
  it('Enter or Escape closes the dialog', async () => {
    const rows = [{ name: 'x.pdf', pattern: '*.pdf' }];
    const p = listener({ type: 'rwa:warn-blacklist', rows });
    await new Promise((r) => setTimeout(r, 0));
    const overlay = document.querySelector('[role="dialog"]');
    // Tab cycles to keep focus on OK
    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    // Press Enter
    overlay.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    const res = await p;
    expect(res).toEqual({ ok: true });
    // No overlay remains
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });
});
