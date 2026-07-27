/*
 * Test Module: inline.never.test.js
 * Scope: Domain/Composition — what counts as inline content.
 * Intent: Images the original message embeds stay out of the attachment list,
 *         while images it does not embed are copied like any other file,
 *         even when the sender stamped a Content-ID on them.
 */
import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

/** Wire the app against a mock and fire one reply compose event. */
async function runReply(browser, { tabId = 1, referenceMessageId = 7 } = {}) {
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  const { App } = globalThis;
  await import('../sources/app/confirm_flow.js');
  await import('../sources/app/composition.js');
  App.Composition.createAppWiring(browser);
  const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
  browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId });
  await onStateCb(tabId);
}

describe('Inline content is excluded from the attachment list', () => {
  // Test: does NOT add an image the original message embeds by cid
  it('does NOT add an image the original message embeds by cid', async () => {
    const browser = createBrowserMock({
      messageHtml: '<p>original</p><img src="cid:x">',
      messageAttachments: [
        { name: 'pic1.gif', partName: 'p1', contentType: 'image/gif', contentId: '<x>' },
        { name: 'foo.pdf', partName: 'p2', contentType: 'application/pdf' }, // blacklisted below
      ],
      getFileByPart: async () => new Blob(['x']),
      blacklistPatterns: ['*.pdf'],
    });
    await runReply(browser);
    // Inline image excluded, PDF excluded by blacklist — nothing added.
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(0);
  });

  // Test: does NOT add attachments with contentDisposition inline by default
  it('does NOT add attachments with contentDisposition inline by default', async () => {
    const browser = createBrowserMock({
      messageAttachments: [
        {
          name: 'embed.txt',
          partName: 'e1',
          contentType: 'text/plain',
          contentDisposition: 'inline; filename=embed.txt',
        },
      ],
      getFileByPart: async () => new Blob(['x']),
    });
    await runReply(browser, { tabId: 2, referenceMessageId: 8 });
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(0);
  });

  // Test: DOES add an image that carries a Content-ID nothing references
  it('DOES add an image that carries a Content-ID nothing references', async () => {
    // Regression: senders such as Apple Mail and Outlook put a Content-ID on every
    // image part. Treating that as "inline" dropped genuine PNG/JPEG attachments
    // silently — no confirm dialog and no file in the reply.
    const browser = createBrowserMock({
      messageHtml: '<p>plain text, no embedded images</p>',
      messageAttachments: [
        {
          name: 'photo.png',
          partName: 'p1',
          contentType: 'image/png',
          contentId: '<5A3F@example.net>',
          contentDisposition: 'attachment; filename=photo.png',
        },
      ],
      getFileByPart: async () => new Blob(['x']),
    });
    await runReply(browser, { tabId: 3, referenceMessageId: 9 });
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });

  // Test: DOES add an image with a Content-ID on Thunderbird versions without contentDisposition
  it('DOES add an image with a Content-ID when contentDisposition is unavailable', async () => {
    // contentDisposition only exists from Thunderbird 135; on 128–134 the body
    // reference is the only evidence available, and there is none here.
    const browser = createBrowserMock({
      messageHtml: '<p>plain text, no embedded images</p>',
      messageAttachments: [
        { name: 'photo.jpeg', partName: 'p1', contentType: 'image/jpeg', contentId: '<abc>' },
      ],
      getFileByPart: async () => new Blob(['x']),
    });
    await runReply(browser, { tabId: 4, referenceMessageId: 10 });
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });

  // Test: does NOT add an image the body embeds through a CSS url(cid:...)
  it('does NOT add an image the body embeds through a CSS url(cid:...)', async () => {
    const browser = createBrowserMock({
      messageHtml: '<div style="background: url(cid:logo) no-repeat">text</div>',
      messageAttachments: [
        { name: 'logo.png', partName: '1.2', contentType: 'image/png', contentId: '<logo>' },
      ],
      getFileByPart: async () => new Blob(['x']),
    });
    await runReply(browser, { tabId: 5, referenceMessageId: 11 });
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(0);
  });
});
