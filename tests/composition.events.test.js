import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createBrowserMock } from './mocks/browser.js';
import { executeBackgroundWith } from './helpers/execute-background.js';

describe('Composition wiring — events', () => {
  let browser;
  let ctx;

  beforeEach(() => {
    browser = createBrowserMock({ attachments: [], getAttachmentFileResult: { size: 1 } });
    ctx = executeBackgroundWith(browser);
  });

  it('onComposeStateChanged triggers ensureReplyAttachments only for replies', async () => {
    // Grab listener
    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    // Non-reply
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'new' });
    await onStateCb(10);
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();

    // Reply with one attachment
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 99 });
    browser.messages.listAttachments.mockResolvedValueOnce([{ name: 'x.pdf', partName: '1', contentType: 'application/pdf' }]);
    await onStateCb(11);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });

  it('onBeforeSend returns {} and ensures attachments if not yet processed', async () => {
    const onBefore = browser.compose.onBeforeSend.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 100 });
    browser.messages.listAttachments.mockResolvedValueOnce([{ name: 'y.pdf', partName: '2', contentType: 'application/pdf' }]);
    const res = await onBefore(22, {});
    expect(res).toEqual({});
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });
});

