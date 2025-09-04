import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './mocks/browser.js';
import { executeBackgroundWith } from './helpers/execute-background.js';

describe('Blacklist lowercase normalization', () => {
  it('upper/mixed-case patterns and filenames are normalized to lowercase', async () => {
    const browser = createBrowserMock({
      attachments: [
        { name: 'IMAGE.PNG', partName: 'a1', contentType: 'image/png' },
        { name: 'Doc.PDF', partName: 'a2', contentType: 'application/pdf' },
      ],
      getAttachmentFileResult: { size: 1 },
      storageLocalInit: { blacklistPatterns: ['*.PNG'] },
    });
    const ctx = executeBackgroundWith(browser);
    await new Promise((r) => setTimeout(r, 0));
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 55 });
    await ctx.handleComposeStateChanged(1, {});
    // Only the PDF should have been added, PNG excluded even though pattern was upper-case
    const calls = browser.messages.getAttachmentFile.mock.calls.map((c) => c[1]);
    expect(calls).toEqual(['a2']);
  });
});

