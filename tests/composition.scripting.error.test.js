/*
 * Test Module: composition.scripting.error.test.js
 * Scope: Composition — error paths when registering/executing scripts.
 * Intent: Ensure failures are caught and logged without breaking flow.
 */
import { describe, it, expect, vi } from 'vitest';

describe('composition — scripting.executeScript may fail but flow continues', () => {
  // Test: on compose state, injection errors are swallowed
  it('on compose state, injection errors are swallowed', async () => {
    vi.resetModules();
    const browser = makeBrowser();
    // Fail executeScript to simulate environments without MV3 compose scripting
    browser.scripting.compose.executeScript.mockRejectedValueOnce(new Error('nope'));
    globalThis.browser = browser;
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/composition.js');
    await import('../sources/background.js');
    // Should not throw and should still try to add an attachment
    browser.messages.listAttachments.mockResolvedValueOnce([{ name: 'x.pdf', partName: 'p1' }]);
    await globalThis.handleComposeStateChanged(9, {});
    expect(browser.compose.addAttachment).toHaveBeenCalled();
  });
});

/** Build a fake browser with failing scripting APIs to exercise error paths. */
function makeBrowser() {
  const compose = {
    getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 1 }),
    listAttachments: vi.fn().mockResolvedValue([]),
    addAttachment: vi.fn(),
    onComposeStateChanged: { addListener: vi.fn() },
    onBeforeSend: { addListener: vi.fn() },
  };
  const messages = {
    listAttachments: vi.fn().mockResolvedValue([]),
    getAttachmentFile: vi.fn().mockResolvedValue(new Blob()),
  };
  const sessions = {
    getTabValue: vi.fn().mockResolvedValue(false),
    setTabValue: vi.fn(),
    removeTabValue: vi.fn(),
  };
  const tabs = {
    onRemoved: { addListener: vi.fn() },
    query: vi.fn().mockResolvedValue([]),
    sendMessage: vi.fn(),
  };
  const scripting = {
    compose: {
      executeScript: vi.fn(),
      getRegisteredScripts: vi.fn().mockResolvedValue([]),
      registerScripts: vi.fn(),
    },
  };
  return {
    compose,
    messages,
    sessions,
    tabs,
    runtime: { onMessage: { addListener: vi.fn() } },
    storage: { local: { get: vi.fn().mockResolvedValue({}) }, onChanged: { addListener: vi.fn() } },
    scripting,
  };
}
