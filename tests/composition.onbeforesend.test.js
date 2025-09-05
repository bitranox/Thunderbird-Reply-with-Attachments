import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('Composition — onBeforeSend flow', () => {
  it('returns {} and ensures attachments if not yet processed', async () => {
    const browser = createBrowserMock({
      messageAttachments: [{ name: 'z.txt', partName: '1', contentType: 'text/plain' }],
      getFileByPart: async () => new Blob(['x']),
    });
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    const onBefore = browser.compose.onBeforeSend.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockResolvedValueOnce({
      type: 'reply',
      referenceMessageId: 900,
    });
    const res = await onBefore(77);
    expect(res).toEqual({});
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });
});
