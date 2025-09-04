import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './mocks/browser.js';
import { executeBackgroundWith } from './helpers/execute-background.js';

describe('Inline attachments are never added', () => {
  it('does not add inline image even when other attachments are blacklisted (fallback path)', async () => {
    const browser = createBrowserMock({
      attachments: [
        { name: 'pic1.gif', partName: 'p1', contentType: 'image/gif', contentId: '<cid:x>' }, // inline image
        { name: 'foo.pdf', partName: 'p2', contentType: 'application/pdf' }, // will be blacklisted
      ],
      getAttachmentFileResult: { size: 1 },
      storageLocalInit: { blacklistPatterns: ['*.pdf'] },
    });
    const ctx = executeBackgroundWith(browser);
    await new Promise((r) => setTimeout(r, 0));
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 7 });
    await ctx.handleComposeStateChanged(1, {});
    // Should add nothing: PDF excluded by blacklist; inline image must remain excluded even on fallback.
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });

  it('does not add attachments with contentDisposition inline', async () => {
    const browser = createBrowserMock({
      attachments: [
        { name: 'embed.txt', partName: 'e1', contentType: 'text/plain', contentDisposition: 'inline; filename=embed.txt' },
      ],
      getAttachmentFileResult: { size: 1 },
      storageLocalInit: { blacklistPatterns: [] },
    });
    const ctx = executeBackgroundWith(browser);
    await new Promise((r) => setTimeout(r, 0));
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 8 });
    await ctx.handleComposeStateChanged(2, {});
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });
});

