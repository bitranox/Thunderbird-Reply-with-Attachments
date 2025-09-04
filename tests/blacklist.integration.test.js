import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './mocks/browser.js';
import { executeBackgroundWith } from './helpers/execute-background.js';

describe('Blacklist integration', () => {
  it('skips attachments whose names match blacklist patterns', async () => {
    const browser = createBrowserMock({
      attachments: [
        { name: 'image.png', partName: 'p1', contentType: 'image/png' },
        { name: 'report.pdf', partName: 'p2', contentType: 'application/pdf' },
        { name: 'smime.p7s', partName: 'p3', contentType: 'application/pkcs7-signature' },
      ],
      getAttachmentFileResult: { size: 1 },
      storageLocalInit: { blacklistPatterns: ['*.png', 'smime.*'] },
    });
    const ctx = executeBackgroundWith(browser);
    // wait for background entry to expose the helper
    await new Promise((r) => setTimeout(r, 0));
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 123 });
    await ctx.handleComposeStateChanged(1, {});
    // Only report.pdf should be added
    const getFileCalls = browser.messages.getAttachmentFile.mock.calls.map((c) => c[1]);
    expect(getFileCalls).toEqual(['p2']);
  });
});
