/*
 * Test Module: composition.tryconfirm.syncthrow.test.js
 * Scope: Composition — synchronous throw handling in targeted/broadcast confirm.
 * Intent: Ensure sync throws return null and popup fallback is used.
 */
import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

describe('composition — tryTargetedConfirm/tryBroadcastConfirm synchronous throws return null', () => {
  // Test: falls back to popup when both throw synchronously
  it('falls back to popup when both throw synchronously', async () => {
    const browser = createBrowserMock({
      confirmBeforeAdd: true,
      messageAttachments: [{ name: 'b.txt', partName: '1', contentType: 'text/plain' }],
      getFileByPart: async () => new Blob(['b']),
    });
    // Force synchronous throws in targeted/broadcast
    browser.tabs.sendMessage.mockImplementation(() => {
      throw new Error('sync targeted');
    });
    browser.runtime.sendMessage.mockImplementation(() => {
      throw new Error('sync broadcast');
    });

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/composition.js');
    const { App } = globalThis;
    App.Composition.createAppWiring(browser);

    const p = triggerComposeState(browser, 12);
    // wait until popup created
    for (let i = 0; i < 10 && browser.windows.create.mock.calls.length === 0; i++) {
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 0));
    }
    // Send a confirm result to complete
    const listener = browser.runtime.onMessage.addListener.mock.calls.at(-1)[0];
    const url = browser.windows.create.mock.calls[0][0]?.url || '';
    const token = url.split('t=')[1].split('&')[0];
    listener({ type: 'rwa:confirm-result', t: token, ok: true });
    await p;
    expect(browser.compose.addAttachment).toHaveBeenCalled();
  });
});
