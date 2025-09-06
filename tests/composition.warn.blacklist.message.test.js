/*
 * Test Module: composition.warn.blacklist.message.test.js
 * Scope: Composition wiring — emits a warn-blacklist message with proper rows.
 * Intent: Verify that blacklist-excluded, non-inline attachments trigger a warning payload.
 */
import { describe, it, expect } from 'vitest';
import { createBrowserMock, triggerComposeState } from './helpers/browserMock.js';

/**
 * Setup a mocked browser and composition wiring for blacklist warning tests.
 * @returns {Promise<{browser:any,wiring:any}>}
 */
async function setup() {
  const browser = createBrowserMock({
    confirmBeforeAdd: false,
    blacklistPatterns: ['*.pdf'],
    warnOnBlacklistExcluded: true,
    messageAttachments: [
      { name: 'foo.pdf', partName: '1', contentType: 'application/pdf' }, // blacklisted
      { name: 'logo.png', partName: '2', contentType: 'image/png', contentId: 'cid:1' }, // inline
      { name: 'smime.p7s', partName: '3', contentType: 'application/pkcs7-signature' }, // S/MIME
      { name: 'note.txt', partName: '4', contentType: 'text/plain' }, // eligible to ensure selection is non-empty
    ],
  });
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/domain/filters.js');
  await import('../sources/app/composition.js');
  const { App } = globalThis;
  const wiring = App.Composition.createAppWiring(browser);
  // Ensure latest settings are applied to the in-memory ensure function
  await wiring.reloadSettings();
  return { browser, wiring };
}

describe('composition — sends warn-blacklist message with rows', () => {
  // Test: emits rwa:warn-blacklist for blacklisted non-inline attachments
  it('emits rwa:warn-blacklist for blacklisted non-inline attachments', async () => {
    const { browser, wiring } = await setup();
    await wiring.ensureReplyAttachments(42, { referenceMessageId: 100, type: 'reply' });
    // find warn-blacklist message
    const call = browser.tabs.sendMessage.mock.calls.find(
      (c) => c?.[1]?.type === 'rwa:warn-blacklist'
    );
    expect(call).toBeTruthy();
    const payload = call[1];
    expect(Array.isArray(payload.rows)).toBe(true);
    expect(payload.rows.length).toBe(1);
    expect(payload.rows[0]).toEqual({ name: 'foo.pdf', pattern: '*.pdf' });
  });
});
