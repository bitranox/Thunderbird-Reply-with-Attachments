import { describe, it, expect, beforeEach, vi } from 'vitest';
import vm from 'vm';
import { createBrowserMock } from './mocks/browser.js';
import { executeBackgroundWith } from './helpers/execute-background.js';

function makeAtt(name, partName, extra = {}) {
  return { name, partName, contentType: 'application/octet-stream', ...extra };
}

describe('background.js — processReplyAttachments', () => {
  let browser;
  let ctx;

  beforeEach(() => {
    // Default attachments list (overridden per test)
    browser = createBrowserMock({ attachments: [], getAttachmentFileResult: { size: 1 } });
    ctx = executeBackgroundWith(browser);
  });

  it('adds only eligible attachments, skipping S/MIME, inline images, and duplicates by name', async () => {
    // Message attachments from original mail
    const atts = [
      makeAtt('doc.pdf', '1.2', { contentType: 'application/pdf' }),
      makeAtt('smime.p7s', '1.3', { contentType: 'application/pkcs7-signature' }),
      makeAtt('logo.png', '1.4', { contentType: 'image/png', contentId: '<cid:1>' }),
      makeAtt('notes.txt', '1.5', { contentType: 'text/plain', contentDisposition: 'attachment; filename=notes.txt' }),
    ];
    browser.messages.listAttachments.mockResolvedValueOnce(atts);

    // Compose already has doc.pdf -> should be skipped by name
    browser.compose.listAttachments.mockResolvedValueOnce([{ name: 'doc.pdf' }]);

    const processReplyAttachments = vm.runInContext('processReplyAttachments', ctx);
    const added = await processReplyAttachments(101, 42);

    expect(added).toBe(1);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    const arg = browser.compose.addAttachment.mock.calls[0][1];
    expect(arg).toHaveProperty('file');
  });

  it('relaxed fallback does not add inline content; remains at zero if strict added nothing', async () => {
    // Inline-only attachments on first pass
    const atts = [
      makeAtt('chart.png', '2.1', { contentType: 'image/png', contentId: '<cid:x>' }),
      makeAtt('inline.txt', '2.2', { contentType: 'text/plain', contentDisposition: 'inline; filename=inline.txt' }),
    ];
    browser.messages.listAttachments.mockResolvedValueOnce(atts);
    browser.compose.listAttachments.mockResolvedValueOnce([]);

    const processReplyAttachments = vm.runInContext('processReplyAttachments', ctx);
    const added = await processReplyAttachments(102, 77);

    // relaxed still excludes inline → adds none
    expect(added).toBe(0);
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });

  it('handles getAttachmentFile returning null by skipping that part', async () => {
    const atts = [makeAtt('bad.bin', '3.1')];
    browser.messages.listAttachments.mockResolvedValueOnce(atts);
    browser.compose.listAttachments.mockResolvedValueOnce([]);
    // All calls return null -> fail; no file added
    browser.messages.getAttachmentFile.mockResolvedValue(null);

    const processReplyAttachments = vm.runInContext('processReplyAttachments', ctx);
    const added = await processReplyAttachments(103, 88);

    expect(added).toBe(0);
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });
});
/*
 * Scope: processReplyAttachments behavior under background wiring.
 * Intent: ensure only eligible attachments are added, null files are skipped,
 *         and relaxed fallback does not include inline content.
 */
