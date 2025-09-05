import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('Inline attachments are never added', () => {
  it('does not add inline image even when other attachments are blacklisted (fallback path)', async () => {
    const browser = createBrowserMock({
      messageAttachments: [
        { name: 'pic1.gif', partName: 'p1', contentType: 'image/gif', contentId: '<cid:x>' }, // inline image
        { name: 'foo.pdf', partName: 'p2', contentType: 'application/pdf' }, // will be blacklisted
      ],
      getFileByPart: async () => new Blob(['x']),
      blacklistPatterns: ['*.pdf'],
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
      referenceMessageId: 7,
    });
    await onStateCb(1);
    // Should add nothing: PDF excluded by blacklist; inline image must remain excluded even on fallback.
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });

  it('does not add attachments with contentDisposition inline', async () => {
    const browser = createBrowserMock({
      messageAttachments: [
        {
          name: 'embed.txt',
          partName: 'e1',
          contentType: 'text/plain',
          contentDisposition: 'inline; filename=embed.txt',
        },
      ],
      getFileByPart: async () => new Blob(['x']),
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
      referenceMessageId: 8,
    });
    await onStateCb(2);
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });
});
