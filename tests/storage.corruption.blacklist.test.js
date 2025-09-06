import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('storage corruption: non-array blacklistPatterns', () => {
  it('treats non-array blacklistPatterns as empty and proceeds safely', async () => {
    const browser = createBrowserMock({
      messageAttachments: [{ name: 'a.txt', partName: '1' }],
      getFileByPart: async () => new Blob(['ok'], { type: 'text/plain' }),
    });
    // Corrupt first read, then default afterwards
    browser.storage.local.get
      .mockResolvedValueOnce({
        blacklistPatterns: 'oops',
        confirmBeforeAdd: false,
        confirmDefaultChoice: 'yes',
      })
      .mockResolvedValue({
        blacklistPatterns: [],
        confirmBeforeAdd: false,
        confirmDefaultChoice: 'yes',
      });
    // Ensure the adapter reads the corrupted value at wiring time

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    const _wiring = App.Composition.createAppWiring(browser);
    // Directly invoke inner use case by simulating no blacklist via domain excluder
    // Trigger state change twice to ensure settings are applied and flow runs
    const cb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    await cb(102);
    await cb(102);
    // should have added the attachment; blacklist treated as empty
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });
});
