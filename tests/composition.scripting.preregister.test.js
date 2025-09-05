import { describe, it, expect, vi } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('composition — scripting preregistration', () => {
  it('registers confirm script when not present and injects on events', async () => {
    vi.resetModules();
    const browser = createBrowserMock();
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);
    await tick();
    expect(browser.scripting.compose.registerScripts).toHaveBeenCalledWith([{ id: 'rwa-confirm', js: ['content/confirm.js'] }]);
    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 5 });
    browser.messages.listAttachments.mockResolvedValueOnce([{ name: 'x.pdf', partName: '1' }]);
    await onStateCb(42);
    expect(browser.scripting.compose.executeScript).toHaveBeenCalled();
  });

  it('does not re-register when already present', async () => {
    vi.resetModules();
    const browser = createBrowserMock();
    browser.scripting.compose.getRegisteredScripts.mockResolvedValueOnce([{ id: 'rwa-confirm' }]);
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);
    await tick();
    expect(browser.scripting.compose.registerScripts).not.toHaveBeenCalled();
  });

  it('injects confirm script on compose events', async () => {
    vi.resetModules();
    const browser = createBrowserMock();
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);
    await tick();
    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockResolvedValueOnce({ type: 'reply', referenceMessageId: 5 });
    browser.messages.listAttachments.mockResolvedValueOnce([{ name: 'x.pdf', partName: '1', contentType: 'application/pdf' }]);
    browser.messages.getAttachmentFile = vi.fn().mockResolvedValue(new Blob(['x']));
    await onStateCb(42);
    expect(browser.scripting.compose.executeScript).toHaveBeenCalled();
  });
});

// legacy helper removed — use shared createBrowserMock instead

function tick() { return new Promise(r => setTimeout(r, 0)); }
