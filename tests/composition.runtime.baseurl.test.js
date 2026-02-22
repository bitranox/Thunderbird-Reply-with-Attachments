/*
 * Test Module: composition.runtime.baseurl.test.js
 * Scope: Composition — confirm popup URL base.
 * Intent: Ensure buildConfirmUrl uses runtime.getURL for base path.
 */
import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

describe('composition — buildConfirmUrl uses runtime.getURL base', () => {
  // Test: prefers browser.runtime.getURL("confirm.html") for popup URL base
  it('prefers browser.runtime.getURL("confirm.html") for popup URL base', async () => {
    const browser = createBrowserMock({
      confirmBeforeAdd: true,
      messageAttachments: [{ name: 'a.txt', partName: '1', contentType: 'text/plain' }],
      getFileByPart: async () => new Blob(['a']),
    });
    // Force popup path and custom base url
    browser.tabs.sendMessage.mockRejectedValue(new Error('no targeted'));
    browser.runtime.sendMessage.mockRejectedValue(new Error('no broadcast'));
    browser.runtime.getURL = vi.fn().mockReturnValue('tb://ext/confirm.html');

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/composition.js');
    const { App } = globalThis;
    App.Composition.createAppWiring(browser);

    // trigger and let popup path run
    const p = triggerComposeState(browser, 10);
    // wait until popup created
    for (let i = 0; i < 10 && browser.windows.create.mock.calls.length === 0; i++) {
      await new Promise((r) => setTimeout(r, 0));
    }
    const url = browser.windows.create.mock.calls[0][0]?.url || '';
    expect(url.startsWith('tb://ext/confirm.html')).toBe(true);
    // resolve
    const tokenListener = browser.runtime.onMessage.addListener.mock.calls.at(-1)[0];
    tokenListener({ type: 'rwa:confirm-result', t: url.split('t=')[1].split('&')[0], ok: true });
    await p;
    expect(browser.compose.addAttachment).toHaveBeenCalled();
  });
});
