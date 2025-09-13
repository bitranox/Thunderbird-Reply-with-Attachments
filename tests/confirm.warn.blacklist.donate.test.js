/* @vitest-environment jsdom */
/*
 * Test Module: confirm.warn.blacklist.donate.test.js
 * Scope: Blacklist warning dialog — donate hidden when snoozed
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('warn-blacklist dialog — donate hidden when snoozed', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    const i18nMap = new Map(
      Object.entries({
        warnBlacklistTitle: 'Excluded by blacklist',
        warnBlacklistIntro: 'Intro text',
        warnColFile: 'File',
        warnColPattern: 'Pattern',
        warnOk: 'OK',
        uiDonate: 'Donate now',
        donateUrl: 'https://example.com/donate',
      })
    );
    globalThis.browser = {
      runtime: { onMessage: { addListener: (fn) => (listener = fn) } },
      i18n: { getMessage: (k) => i18nMap.get(k) || '' },
      storage: { local: { get: vi.fn().mockResolvedValue({ donateHideUntil: Date.now() + 1e9 }) } },
    };
    await import('../sources/content/confirm.js');
  });

  it('hides donate button if snoozed', async () => {
    const rows = [{ name: 'x.pdf', pattern: '*.pdf' }];
    const p = listener({ type: 'rwa:warn-blacklist', rows });
    await new Promise((r) => setTimeout(r, 0));
    const overlay = document.querySelector('[role="dialog"]');
    const donate = overlay.querySelector('a');
    expect(donate.style.display).toBe('none');
    // Close
    overlay.querySelector('button').click();
    await p;
  });
});
