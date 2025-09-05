import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('Blacklist lowercase normalization', () => {
  it('upper/mixed-case patterns and filenames are normalized to lowercase', async () => {
    const browser = createBrowserMock({
      messageAttachments: [
        { name: 'IMAGE.PNG', partName: 'a1', contentType: 'image/png' },
        { name: 'Doc.PDF', partName: 'a2', contentType: 'application/pdf' },
      ],
      blacklistPatterns: ['*.PNG'],
      getFileByPart: async (id, part) => new Blob(['x'])
    });
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);
    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 55 });
    await onStateCb(1);
    const calls = browser.messages.getAttachmentFile.mock.calls.map((c) => c[1]);
    expect(calls).toEqual(['a2']);
  });
});
