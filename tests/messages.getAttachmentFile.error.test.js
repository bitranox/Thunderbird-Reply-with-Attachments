import { describe, it, expect, vi } from 'vitest';

describe('getAttachmentFile error handling', () => {
  it('skips a failing part and continues with others', async () => {
    const browser = {
      runtime: { onMessage: { addListener: vi.fn(), removeListener: vi.fn() } },
      storage: { local: { get: vi.fn().mockResolvedValue({ blacklistPatterns: [], confirmBeforeAdd: false, confirmDefaultChoice: 'yes' }) }, onChanged: { addListener: vi.fn() } },
      compose: {
        onComposeStateChanged: { addListener: vi.fn() },
        onBeforeSend: { addListener: vi.fn() },
        getDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 99 }),
        listAttachments: vi.fn().mockResolvedValue([]),
        addAttachment: vi.fn().mockResolvedValue(undefined)
      },
      messages: {
        listAttachments: vi.fn().mockResolvedValue([
          { name: 'a.txt', partName: '1' },
          { name: 'b.txt', partName: '2' }
        ]),
        getAttachmentFile: vi.fn()
          .mockRejectedValueOnce(new Error('network'))
          .mockResolvedValueOnce(new Blob(['ok'], { type: 'text/plain' }))
      },
      sessions: { getTabValue: vi.fn().mockResolvedValue(false), setTabValue: vi.fn(), removeTabValue: vi.fn() },
      tabs: { onRemoved: { addListener: vi.fn() }, sendMessage: vi.fn().mockResolvedValue({ ok: true }) },
      scripting: { compose: { getRegisteredScripts: vi.fn().mockResolvedValue([]), registerScripts: vi.fn(), executeScript: vi.fn() } }
    };

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    const wiring = (await import('../sources/app/composition.js')) && App.Composition.createAppWiring(browser);
    const cb = browser.compose.onStateChanged.addListener.mock.calls[0][0];
    await cb(1);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
    expect(browser.compose.addAttachment.mock.calls[0][1].file).toBeInstanceOf(Blob);
  });
});
