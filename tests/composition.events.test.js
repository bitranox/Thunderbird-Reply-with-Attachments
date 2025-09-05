import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('Composition wiring — events', () => {
  it('onComposeStateChanged triggers ensureReplyAttachments only for replies', async () => {
    const browser = createBrowserMock({});
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'new' });
    await onStateCb(10);
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();

    browser.compose.getComposeDetails.mockResolvedValueOnce({
      type: 'reply',
      referenceMessageId: 99,
    });
    browser.messages.listAttachments.mockResolvedValueOnce([
      { name: 'x.pdf', partName: '1', contentType: 'application/pdf' },
    ]);
    browser.messages.getAttachmentFile = vi.fn().mockResolvedValue(new Blob(['x']));
    await onStateCb(11);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });
});
