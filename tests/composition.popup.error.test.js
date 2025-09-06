/*
 * Test Module: composition.popup.error.test.js
 * Scope: Composition — popup fallback error handling.
 * Intent: If creating popup fails, selection is canceled (no attachments added).
 */
import { describe, it, expect } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

describe('composition — askInPopup catch path when windows.create fails', () => {
  // Test: returns false and does not add attachments
  it('returns false and does not add attachments', async () => {
    const browser = createBrowserMock({
      confirmBeforeAdd: true,
      messageAttachments: [{ name: 'a.txt', partName: '1', contentType: 'text/plain' }],
      getFileByPart: async () => new Blob(['x']),
    });
    // Fail targeted and broadcast
    browser.tabs.sendMessage.mockRejectedValue(new Error('targeted fail'));
    browser.runtime.sendMessage.mockRejectedValue(new Error('broadcast fail'));
    // Fail popup creation so askInPopup catches
    browser.windows.create.mockRejectedValueOnce(new Error('create-fail'));

    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/composition.js');
    const { App } = globalThis;
    App.Composition.createAppWiring(browser);

    await triggerComposeState(browser, 42);
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });
});
