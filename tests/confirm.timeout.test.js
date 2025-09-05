import { describe, it, expect, vi } from 'vitest';

function createBrowserMock() {
  const listeners = new Set();
  return {
    runtime: {
      onMessage: {
        addListener: (fn) => listeners.add(fn),
        removeListener: (fn) => listeners.delete(fn)
      },
      sendMessage: vi.fn().mockRejectedValue(new Error('no broadcast listener'))
    },
    windows: {
      create: vi.fn().mockResolvedValue({ id: 1 }),
      update: vi.fn().mockResolvedValue({})
    },
    tabs: {
      sendMessage: vi.fn().mockRejectedValue(new Error('no targeted listener'))
    },
    storage: { local: { get: vi.fn().mockResolvedValue({ confirmBeforeAdd: true, confirmDefaultChoice: 'yes', blacklistPatterns: [] }) }, onChanged: { addListener: vi.fn() } },
    compose: {
      onComposeStateChanged: { addListener: vi.fn() },
      onBeforeSend: { addListener: vi.fn() },
      getDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 99 }),
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn()
    },
    messages: {
      listAttachments: vi.fn().mockResolvedValue([{ name: 'a.txt', partName: '1' }]),
      getAttachmentFile: vi.fn().mockResolvedValue(new Blob(['x'], { type: 'text/plain' }))
    },
    sessions: { getTabValue: vi.fn().mockResolvedValue(false), setTabValue: vi.fn(), removeTabValue: vi.fn() },
    scripting: { compose: { getRegisteredScripts: vi.fn().mockResolvedValue([]), registerScripts: vi.fn(), executeScript: vi.fn() } }
  };
}

describe('confirm popup timeout path', () => {
  it('returns false if popup closes without responding (timeout)', async () => {
    vi.useFakeTimers();
    const browser = createBrowserMock();
    // expose adapters factory expected by composition
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;

    const wiring = (await import('../sources/app/composition.js')) && App.Composition.createAppWiring(browser);

    // trigger onStateChanged handler registered by wiring
    const stateCb = browser.compose.onStateChanged.addListener.mock.calls[0][0];
    const p = stateCb(1);
    // advance time beyond 20s timeout
    await vi.advanceTimersByTimeAsync(20050);
    await p;
    // Since confirmation timed out (treated as false), no attachments added
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
