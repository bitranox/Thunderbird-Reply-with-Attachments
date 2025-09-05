import { describe, it, expect, vi } from 'vitest';

describe('storage corruption: non-array blacklistPatterns', () => {
  it('treats non-array blacklistPatterns as empty and proceeds safely', async () => {
    const browser = {
      runtime: { onMessage: { addListener: vi.fn(), removeListener: vi.fn() } },
      storage: { local: { get: vi.fn().mockResolvedValue({ blacklistPatterns: 'oops', confirmBeforeAdd: false, confirmDefaultChoice: 'yes' }) }, onChanged: { addListener: vi.fn() } },
      compose: {
        onComposeStateChanged: { addListener: vi.fn() },
        onBeforeSend: { addListener: vi.fn() },
        getDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 99 }),
        listAttachments: vi.fn().mockResolvedValue([]),
        addAttachment: vi.fn().mockResolvedValue(undefined)
      },
      messages: {
        listAttachments: vi.fn().mockResolvedValue([{ name: 'a.txt', partName: '1' }]),
        getAttachmentFile: vi.fn().mockResolvedValue(new Blob(['ok'], { type: 'text/plain' }))
      },
      sessions: { getTabValue: vi.fn().mockResolvedValue(false), setTabValue: vi.fn(), removeTabValue: vi.fn() },
      tabs: { onRemoved: { addListener: vi.fn() }, sendMessage: vi.fn().mockResolvedValue({ ok: true }) },
      scripting: { compose: { getRegisteredScripts: vi.fn().mockResolvedValue([]), registerScripts: vi.fn(), executeScript: vi.fn() } }
    };

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    (await import('../sources/app/composition.js'));
    const wiring = App.Composition.createAppWiring(browser);
    const cb = browser.compose.onStateChanged.addListener.mock.calls[0][0];
    await cb(1);
    // should have added the attachment; blacklist treated as empty
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);
  });
});
