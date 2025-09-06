import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

describe('composition — isDecision negative (no ok prop) falls back to popup', () => {
  it('treats {} from targeted and broadcast as non-decisions and uses popup', async () => {
    const browser = createBrowserMock({ confirmBeforeAdd: true, messageAttachments: [{ name: 'z.txt', partName: '1', contentType: 'text/plain' }], getFileByPart: async () => new Blob(['z']) });
    browser.tabs.sendMessage.mockResolvedValue({});
    browser.runtime.sendMessage.mockResolvedValue({});
    // Deterministic token
    vi.spyOn(Math, 'random').mockReturnValue(0.3333333);

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/composition.js');
    const { App } = globalThis;
    App.Composition.createAppWiring(browser);

    const p = triggerComposeState(browser, 77);
    await new Promise((r) => setTimeout(r, 0));
    const token = (0.3333333).toString(36).slice(2);
    const listener = browser.runtime.onMessage.addListener.mock.calls.at(-1)[0];
    listener({ type: 'rwa:confirm-result', t: token, ok: true });
    await p;
    expect(browser.windows.create).toHaveBeenCalled();
    expect(browser.compose.addAttachment).toHaveBeenCalled();
  });
});

