/*
 * Test Module: composition.state.test.js
 * Scope: Composition — processed state map and session marker logic.
 * Intent: Ensure idempotency per tab across events.
 */
import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('Composition — state & sessions', () => {
  // Test: processes once per tab and marks as done in sessions
  it('processes once per tab and marks as done in sessions', async () => {
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

    const tabId = 201;
    const details = { type: 'reply', referenceMessageId: 50 };
    await wiring.ensureReplyAttachments(tabId, details);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    await wiring.ensureReplyAttachments(tabId, details);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });

  it('reprocesses when the same tab is reused for a new message', async () => {
    const browser = createBrowserMock({
      messageAttachments: [
        { name: 'a.txt', partName: '1', contentType: 'text/plain' },
        { name: 'b.txt', partName: '2', contentType: 'text/plain' },
      ],
      getFileByPart: async () => new Blob(['x']),
    });
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    const wiring = App.Composition.createAppWiring(browser);

    const tabId = 305;
    await wiring.ensureReplyAttachments(tabId, { type: 'reply', referenceMessageId: 'msg-A' });
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(2);

    browser.compose.addAttachment.mockClear();
    await wiring.ensureReplyAttachments(tabId, { type: 'reply', referenceMessageId: 'msg-B' });
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(2);
  });
});
