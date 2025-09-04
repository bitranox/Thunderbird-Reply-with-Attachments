import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBrowserMock } from './mocks/browser.js';
import { executeBackgroundWith } from './helpers/execute-background.js';

describe('background.js core logic', () => {
  let browser;
  let ctx;

  beforeEach(() => {
    browser = createBrowserMock({ attachments: [] });
    ctx = executeBackgroundWith(browser);
  });

  it('extractNumericTabId handles number, object, and invalid', () => {
    const { extractNumericTabId } = ctx;
    expect(extractNumericTabId(5)).toBe(5);
    expect(extractNumericTabId({ id: 7 })).toBe(7);
    expect(extractNumericTabId({})).toBeNull();
    expect(extractNumericTabId('x')).toBeNull();
  });

  it('handleComposeStateChanged adds only non-SMIME, non-duplicate attachments (via processReplyAttachments)', async () => {
    // Arrange attachments: two SMIME variants, one normal, one inline image, and a duplicate
    const attachments = [
      { name: 'smime.p7s', partName: '2', contentType: 'application/octet-stream' },
      { name: 'signature', partName: '3', contentType: 'application/pkcs7-signature' },
      { name: 'normal.pdf', partName: '1', contentType: 'application/pdf' },
      { name: 'inline.png', partName: '4', contentType: 'image/png', contentId: 'cid:abc' },
      { name: 'duplicate.pdf', partName: '1', contentType: 'application/pdf' },
    ];

    browser.messages.listAttachments.mockResolvedValueOnce(attachments);

    const { handleComposeStateChanged } = ctx;

    const tabId = 42;
    const messageId = 1001;
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: messageId });

    await handleComposeStateChanged(tabId, {});

    // Expect addAttachment called for normal.pdf and inline.png only (current behavior)
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(2);
    const calls = browser.compose.addAttachment.mock.calls.map(args => args[1]);
    const names = calls.map(o => o && o.file && o.file.name).filter(Boolean);
    // getAttachmentFile currently returns {}, so no name; assert by partName via messages.getAttachmentFile args
    const getFileCalls = browser.messages.getAttachmentFile.mock.calls;
    const partNames = getFileCalls.map(c => c[1]);
    expect(partNames).toEqual(['1', '4']);
  });

  it('handleComposeStateChanged no-ops on empty attachment list', async () => {
    browser.messages.listAttachments.mockResolvedValueOnce([]);
    const { handleComposeStateChanged } = ctx;
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 500 });
    await handleComposeStateChanged(1, {});
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });
});
