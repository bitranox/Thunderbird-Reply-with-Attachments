/*
 * Test Module: composition.safety.test.js
 * Scope: Composition — resilience to compose.getComposeDetails failures.
 * Intent: Ensure errors are caught and flow aborts safely.
 */
import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

describe('Composition — safety around compose details', () => {
  // Test: stays calm when compose.getComposeDetails rejects
  it('stays calm when compose.getComposeDetails rejects', async () => {
    const browser = createBrowserMock();
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/domain/filters.js');
    const { App } = globalThis;
    await import('../sources/app/composition.js');
    App.Composition.createAppWiring(browser);

    const onStateCb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
    browser.compose.getComposeDetails.mockRejectedValueOnce(new Error('boom'));
    await expect(onStateCb(1)).resolves.toBeUndefined();
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });
});
