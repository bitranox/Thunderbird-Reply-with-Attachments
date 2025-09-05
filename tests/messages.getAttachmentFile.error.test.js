import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

describe('getAttachmentFile error handling', () => {
  it('skips a failing part and continues with others', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const browser = createBrowserMock({
      messageAttachments: [
        { name: 'a.txt', partName: '1' },
        { name: 'b.txt', partName: '2' },
      ],
    });
    browser.messages.getAttachmentFile
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce(new Blob(['ok'], { type: 'text/plain' }));

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    const wiring = App.Composition.createAppWiring(browser);
    await triggerComposeState(browser, 101);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    expect(browser.compose.addAttachment.mock.calls[0][1].file).toBeInstanceOf(Blob);
    warnSpy.mockRestore();
  });
});
