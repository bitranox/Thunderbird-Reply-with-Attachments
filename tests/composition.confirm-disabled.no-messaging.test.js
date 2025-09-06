import { describe, it, expect } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

describe('Composition — confirm disabled: no confirm messaging', () => {
  it('does not send confirm messages and still adds attachments', async () => {
    const browser = createBrowserMock({
      confirmBeforeAdd: false,
      messageAttachments: [
        { name: 'foo.txt', partName: '1', contentType: 'text/plain' },
        { name: 'bar.txt', partName: '2', contentType: 'text/plain' },
      ],
      getFileByPart: async () => new Blob(['x']),
    });
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/composition.js');

    const { App } = globalThis;
    App.Composition.createAppWiring(browser);

    await triggerComposeState(browser, 7);
    // Should add both attachments without sending confirm messages
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(2);
    expect(browser.tabs.sendMessage).not.toHaveBeenCalled();
    expect(browser.runtime.sendMessage).not.toHaveBeenCalled();
  });
});

