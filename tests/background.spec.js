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

  it('handleComposeStateChanged adds only non-SMIME, non-inline (contentId), non-duplicate attachments', async () => {
    // Arrange attachments: two SMIME variants, one normal, one inline image, and a duplicate
    const attachments = [
      { name: 'smime.p7s', partName: '2', contentType: 'application/octet-stream' },
      { name: 'signature', partName: '3', contentType: 'application/pkcs7-signature' },
      { name: 'normal.pdf', partName: '1', contentType: 'application/pdf', contentDisposition: 'attachment; filename="normal.pdf"' },
      { name: 'inline.png', partName: '4', contentType: 'image/png', contentId: 'cid:abc' },
      { name: 'duplicate.pdf', partName: '1', contentType: 'application/pdf', contentDisposition: 'attachment; filename="normal.pdf"' },
    ];

    browser.messages.listAttachments.mockResolvedValueOnce(attachments);

    const { handleComposeStateChanged } = ctx;

    const tabId = 42;
    const messageId = 1001;
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: messageId });

    await handleComposeStateChanged(tabId, {});

    // Expect addAttachment called only for normal.pdf; inline with contentId is skipped now
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    const calls = browser.compose.addAttachment.mock.calls.map(args => args[1]);
    const names = calls.map(o => o && o.file && o.file.name).filter(Boolean);
    // getAttachmentFile currently returns {}, so no name; assert by partName via messages.getAttachmentFile args
    const getFileCalls = browser.messages.getAttachmentFile.mock.calls;
    const partNames = getFileCalls.map(c => c[1]);
    expect(partNames).toEqual(['1']);
  });

  it('handleComposeStateChanged no-ops on empty attachment list', async () => {
    browser.messages.listAttachments.mockResolvedValueOnce([]);
    const { handleComposeStateChanged } = ctx;
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 500 });
    await handleComposeStateChanged(1, {});
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });

  it('onBeforeSend attaches if not yet processed and none present', async () => {
    const attachments = [ { name: 'a.pdf', partName: '1', contentType: 'application/pdf', contentDisposition: 'attachment; filename="a.pdf"' } ];
    browser.messages.listAttachments.mockResolvedValueOnce(attachments);
    const { handleComposeStateChanged } = ctx;
    const tabId = 21;
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 777 });
    // Simulate early state change with zero attachments found (none added)
    browser.messages.listAttachments.mockResolvedValueOnce([]);
    await handleComposeStateChanged(tabId, {});

    // Now trigger onBeforeSend: ui handler is registered in background.js at load
    const onBeforeSendFn = browser.compose.onBeforeSend.addListener?.mock?.calls?.[0]?.[0];
    if (onBeforeSendFn) {
      browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 777 });
      browser.compose.listAttachments = vi.fn().mockResolvedValue([]);
      browser.messages.listAttachments.mockResolvedValueOnce(attachments);
      await onBeforeSendFn(tabId, {});
      expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    }
  });

  it('does not duplicate when already processed (memory or sessions)', async () => {
    const attachments = [ { name: 'a.pdf', partName: '1', contentType: 'application/pdf', contentDisposition: 'attachment; filename="a.pdf"' } ];
    const { handleComposeStateChanged } = ctx;
    const tabId = 33;
    // First event adds
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 330 });
    browser.messages.listAttachments.mockResolvedValueOnce(attachments);
    await handleComposeStateChanged(tabId, {});
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);

    // onBeforeSend should skip due to memory flag
    const onBeforeSendFn = browser.compose.onBeforeSend.addListener?.mock?.calls?.[0]?.[0];
    if (onBeforeSendFn) {
      browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 330 });
      // Simulate compose.listAttachments returning [] to test our memory guard
      browser.compose.listAttachments = vi.fn().mockResolvedValue([]);
      await onBeforeSendFn(tabId, {});
      expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    }
  });

  it('relaxed fallback adds attachment even when contentId is present without inline disposition', async () => {
    // Arrange: attachment has contentId but no explicit inline disposition
    const attachments = [ { name: 'report.pdf', partName: '9', contentType: 'application/pdf', contentId: 'cid:maybe', contentDisposition: '' } ];
    const { handleComposeStateChanged } = ctx;
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 909 });
    browser.messages.listAttachments.mockResolvedValueOnce(attachments);
    await handleComposeStateChanged(77, {});
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });

  it('releases per-tab state on tab close (tabs.onRemoved)', async () => {
    const attachments = [ { name: 'a.pdf', partName: '1', contentType: 'application/pdf' } ];
    browser.messages.listAttachments.mockResolvedValueOnce(attachments);

    const { handleComposeStateChanged } = ctx;
    const tabId = 7;
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 10 });
    await handleComposeStateChanged(tabId, {});
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);

    // Trigger the onRemoved listener that background.js registered
    const onRemovedFn = browser.tabs.onRemoved.addListener.mock.calls[0][0];
    onRemovedFn(tabId, {});

    // After cleanup, processing the same tab again should re-run
    browser.messages.listAttachments.mockResolvedValueOnce(attachments);
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 10 });
    await handleComposeStateChanged(tabId, {});
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(2);
  });
});
