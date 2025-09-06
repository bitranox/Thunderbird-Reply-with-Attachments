/*
 * Test Module: composition.warn.blacklist.only.test.js
 * Scope: Composition wiring — warn even when no attachments will be added.
 * Intent: Ensure warning dialog still shows if all candidates are blacklisted.
 */
import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

/**
 * Setup a mocked browser and composition wiring for all-blacklisted scenario.
 * @returns {Promise<{browser:any,wiring:any}>}
 */
async function setup() {
  const browser = createBrowserMock({
    confirmBeforeAdd: false,
    blacklistPatterns: ['*.pdf'],
    warnOnBlacklistExcluded: true,
    messageAttachments: [
      { name: 'secret.pdf', partName: '1', contentType: 'application/pdf' }, // blacklisted
    ],
  });
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  await import('../sources/app/composition.js');
  const { App } = globalThis;
  const wiring = App.Composition.createAppWiring(browser);
  await wiring.reloadSettings();
  return { browser, wiring };
}

describe('composition — warns on blacklist even if nothing will be added', () => {
  // Test: sends rwa:warn-blacklist and does not add attachments
  it('sends rwa:warn-blacklist and does not add attachments', async () => {
    const { browser, wiring } = await setup();
    await wiring.ensureReplyAttachments(10, { referenceMessageId: 300, type: 'reply' });
    const warnCall = browser.tabs.sendMessage.mock.calls.find(
      (c) => c?.[1]?.type === 'rwa:warn-blacklist'
    );
    expect(warnCall).toBeTruthy();
    expect(browser.compose.addAttachment).not.toHaveBeenCalled();
  });
});
