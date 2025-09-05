import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('Composition — cleanup on tab remove', () => {
  it('removes session flag and in-memory state on tab close', async () => {
    const browser = createBrowserMock({
      messageAttachments: [{ name: 'a.txt', partName: '1', contentType: 'text/plain' }],
      getFileByPart: async () => new Blob(['x']),
    });
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    const wiring = App.Composition.createAppWiring(browser);

    const tabId = 606;
    // process once to set state
    await wiring.ensureReplyAttachments(tabId, { type: 'reply', referenceMessageId: 1 });
    // invoke onRemoved listener
    const onRemoved = browser.tabs.onRemoved.addListener.mock.calls[0][0];
    await onRemoved(tabId);
    // sessions.removeTabValue got called
    expect(browser.sessions.removeTabValue).toHaveBeenCalledWith(tabId, wiring.SESSION_KEY);
  });
});
