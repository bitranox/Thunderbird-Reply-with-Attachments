import { describe, it, expect } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

describe('Composition processReplyAttachments via wiring', () => {
  it('adds only eligible attachments; skips S/MIME, inline and duplicates', async () => {
    const attachments = [
      { name: 'logo.png', partName: 'p1', contentType: 'image/png', contentId: 'cid:logo' }, // inline
      { name: 'smime.p7s', partName: 'p2', contentType: 'application/pkcs7-signature' },     // smime
      { name: 'Report.pdf', partName: 'p3', contentType: 'application/pdf' },
      { name: 'notes.txt', partName: 'p4', contentType: 'text/plain' },
    ];
    const browser = createBrowserMock({
      composeExisting: [],
      messageAttachments: attachments,
      getFileByPart: async (id, part) => new Blob(['x'])
    });

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    await triggerComposeState(browser, 11);
    await triggerComposeState(browser, 11);
    // Should attach 2 eligible files (Report.pdf and notes.txt)
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(2);
  });

  it('handles getAttachmentFile returning null by skipping that part', async () => {
    const attachments = [
      { name: 'x.txt', partName: '1', contentType: 'text/plain' },
      { name: 'y.txt', partName: '2', contentType: 'text/plain' },
    ];
    const browser = createBrowserMock({
      messageAttachments: attachments,
      getFileByPart: async (id, part) => (part === '1' ? null : new Blob(['ok']))
    });

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    await triggerComposeState(browser, 12);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });
});
