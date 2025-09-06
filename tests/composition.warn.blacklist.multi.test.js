/*
 * Test Module: composition.warn.blacklist.multi.test.js
 * Scope: Composition wiring — merges multiple matching patterns per file.
 * Intent: Ensure warn payload groups rows per filename with comma-separated patterns.
 */
import { describe, it, expect } from 'vitest';
import { createBrowserMock } from './helpers/browserMock.js';

/**
 * Setup a mocked browser and composition wiring for merged-pattern tests.
 * @returns {Promise<{browser:any,wiring:any}>}
 */
async function setup() {
  const browser = createBrowserMock({
    confirmBeforeAdd: false,
    blacklistPatterns: ['*.pdf', '*report*'],
    warnOnBlacklistExcluded: true,
    messageAttachments: [
      { name: 'report.pdf', partName: '1', contentType: 'application/pdf' }, // matches both
      { name: 'ok.txt', partName: '2', contentType: 'text/plain' }, // selected → triggers flow
    ],
    getFileByPart: async () => new Blob(['x']),
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

describe('composition — blacklist warning shows merged patterns per file', () => {
  // Test: emits a single row with merged patterns for one file matched by two patterns
  it('emits a single row with merged patterns for one file matched by two patterns', async () => {
    const { browser, wiring } = await setup();
    await wiring.ensureReplyAttachments(7, { referenceMessageId: 200, type: 'reply' });
    const messages = browser.tabs.sendMessage.mock.calls.map((c) => c?.[1]).filter(Boolean);
    const warn = messages.find((m) => m.type === 'rwa:warn-blacklist');
    expect(warn).toBeTruthy();
    const row = warn.rows.find((r) => r.name === 'report.pdf');
    expect(row).toBeTruthy();
    const parts = String(row.pattern || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .sort();
    expect(parts).toEqual(['*.pdf', '*report*']);
  });
});
