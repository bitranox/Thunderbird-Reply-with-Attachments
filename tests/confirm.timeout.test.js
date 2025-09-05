import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('confirm popup timeout path', () => {
  it('returns false if popup closes without responding (timeout)', async () => {
    vi.useFakeTimers();
    const browser = createBrowserMock({
      confirmBeforeAdd: true,
      messageAttachments: [{ name: 'a.txt', partName: '1' }],
      getFileByPart: async () => new Blob(['x'], { type: 'text/plain' }),
    });
    // Force targeted and broadcast confirm to fail to trigger popup timeout
    browser.tabs.sendMessage.mockRejectedValue(new Error('no targeted listener'));
    browser.runtime.sendMessage.mockRejectedValue(new Error('no broadcast listener'));
    // expose adapters factory expected by composition
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;

    await import('../sources/app/composition.js');
    const wiring = App.Composition.createAppWiring(browser);

    // trigger onStateChanged handler registered by wiring
    const stateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    const p = stateCb(1);
    // advance time beyond 20s timeout
    await vi.advanceTimersByTimeAsync(20050);
    await p;
    // Since confirmation timed out (treated as false), no attachments added
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
