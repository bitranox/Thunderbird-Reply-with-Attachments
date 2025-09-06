/*
 * Test Module: composition.onremoved.cacheclear.test.js
 * Scope: Composition — cleanup of injectedConfirmScriptTabs on tab removal.
 * Intent: Ensure injected tab id is removed from the set when tab closes.
 */
import { describe, it, expect } from 'vitest';

import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

describe('composition — onRemoved clears injectedConfirmScriptTabs', () => {
  // Test: removes tab id from injected set on tab close
  it('removes tab id from injected set on tab close', async () => {
    const browser = createBrowserMock({
      confirmBeforeAdd: true,
      messageAttachments: [{ name: 'a.txt', partName: '1', contentType: 'text/plain' }],
      getFileByPart: async () => new Blob(['x']),
    });
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/composition.js');
    const { App } = globalThis;
    App.Composition.createAppWiring(browser);

    await triggerComposeState(browser, 42);
    expect(globalThis.injectedConfirmScriptTabs.has(42)).toBe(true);

    const onRemoved = browser.tabs.onRemoved.addListener.mock.calls[0][0];
    await onRemoved(42);
    expect(globalThis.injectedConfirmScriptTabs.has(42)).toBe(false);
  });
});
