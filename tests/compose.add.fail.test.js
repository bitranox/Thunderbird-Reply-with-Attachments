import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

describe('compose.addAttachment failure path', () => {
  it('continues attaching subsequent files when one addAttachment throws', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const browser = createBrowserMock({
      messageAttachments: [
        { name: 'a.txt', partName: '1' },
        { name: 'b.txt', partName: '2' },
      ],
      getFileByPart: async (id, part) => new Blob(['x']),
    });
    // make first addAttachment throw, second succeed
    browser.compose.addAttachment
      .mockRejectedValueOnce(new Error('disk full'))
      .mockResolvedValueOnce(undefined);

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    await triggerComposeState(browser, 4);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(2);
    // second call went through despite first failure
    expect(browser.compose.addAttachment.mock.calls[1][1].file).toBeInstanceOf(Blob);
    warnSpy.mockRestore();
  });
});
