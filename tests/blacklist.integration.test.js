import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('Blacklist integration', () => {
  it('skips attachments whose names match blacklist patterns', async () => {
    const browser = createBrowserMock({
      messageAttachments: [
        { name: 'image.png', partName: 'p1', contentType: 'image/png' },
        { name: 'report.pdf', partName: 'p2', contentType: 'application/pdf' },
        { name: 'smime.p7s', partName: 'p3', contentType: 'application/pkcs7-signature' },
      ],
      blacklistPatterns: ['*.png', 'smime.*'],
      getFileByPart: async (id, part) => new Blob(['x']),
    });
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);
    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockResolvedValueOnce({
      type: 'reply',
      referenceMessageId: 123,
    });
    await onStateCb(1);
    const getFileCalls = browser.messages.getAttachmentFile.mock.calls.map((c) => c[1]);
    expect(getFileCalls).toEqual(['p2']);
  });
});
