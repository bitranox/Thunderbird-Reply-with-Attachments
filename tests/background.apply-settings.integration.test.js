/*
 * Test Module: background.apply-settings.integration.test.js
 * Scope: Background bootstrap — applying settings to open compose tabs.
 * Intent: Verify per-tab markers cleared and ensure pass executes for reply tabs.
 */
import { describe, it, expect, vi } from 'vitest';

describe('background — apply settings to open composers', () => {
  // Test: handles rwa:apply-settings-open-compose by clearing markers and ensuring tabs
  it('handles rwa:apply-settings-open-compose by clearing markers and ensuring tabs', async () => {
    const browser = {
      runtime: { onMessage: { addListener: vi.fn(), removeListener: vi.fn() } },
      tabs: {
        query: vi.fn().mockResolvedValue([{ id: 3 }, { id: 4 }]),
        onRemoved: { addListener: vi.fn() },
        sendMessage: vi.fn().mockResolvedValue({ ok: true }),
      },
      compose: {
        onComposeStateChanged: { addListener: vi.fn() },
        onBeforeSend: { addListener: vi.fn() },
        getComposeDetails: vi.fn(async (id) => ({ type: 'reply', referenceMessageId: 500 + id })),
        listAttachments: vi.fn().mockResolvedValue([]),
        addAttachment: vi.fn(),
      },
      messages: {
        listAttachments: vi.fn().mockResolvedValue([]),
        getAttachmentFile: vi.fn(),
      },
      sessions: {
        getTabValue: vi.fn().mockResolvedValue(false),
        setTabValue: vi.fn(),
        removeTabValue: vi.fn(),
      },
      scripting: {
        compose: {
          getRegisteredScripts: vi.fn().mockResolvedValue([]),
          registerScripts: vi.fn(),
          executeScript: vi.fn(),
        },
      },
      storage: {
        local: {
          get: vi.fn().mockResolvedValue({
            debug: false,
            blacklistPatterns: [],
            confirmBeforeAdd: false,
            confirmDefaultChoice: 'yes',
          }),
        },
        onChanged: { addListener: vi.fn() },
      },
      windows: { create: vi.fn(), update: vi.fn() },
    };
    globalThis.browser = browser;

    // Load modules in order; background bootstraps on import
    await import('../sources/app/adapters/thunderbird.js');
    await import('../sources/app/domain/filters.js');
    await import('../sources/app/application/usecases.js');
    await import('../sources/app/composition.js');
    await import('../sources/background.js');

    // Bootstrap now runs an ensure pass on import
    for (let i = 0; i < 5; i += 1) {
      await new Promise((r) => setTimeout(r, 10));
      if (browser.sessions.removeTabValue.mock.calls.length >= 2) break;
    }
    expect(browser.sessions.removeTabValue).toHaveBeenCalledTimes(2);
    const key = globalThis.SESSION_KEY;
    expect(browser.sessions.removeTabValue).toHaveBeenCalledWith(3, key);
    expect(browser.sessions.removeTabValue).toHaveBeenCalledWith(4, key);

    // Ensure path triggers compose detail checks for each tab
    expect(browser.compose.getComposeDetails).toHaveBeenCalledWith(3);
    expect(browser.compose.getComposeDetails).toHaveBeenCalledWith(4);

    browser.sessions.removeTabValue.mockClear();
    browser.compose.getComposeDetails.mockClear();

    const listener = browser.runtime.onMessage.addListener.mock.calls[0][0];
    const res = await listener({ type: 'rwa:apply-settings-open-compose' });
    expect(res?.ok).toBe(true);

    for (let i = 0; i < 5; i += 1) {
      await new Promise((r) => setTimeout(r, 10));
      if (browser.sessions.removeTabValue.mock.calls.length >= 2) break;
    }

    expect(browser.sessions.removeTabValue).toHaveBeenCalledTimes(2);
    expect(browser.sessions.removeTabValue).toHaveBeenCalledWith(3, key);
    expect(browser.sessions.removeTabValue).toHaveBeenCalledWith(4, key);
    expect(browser.compose.getComposeDetails).toHaveBeenCalledWith(3);
    expect(browser.compose.getComposeDetails).toHaveBeenCalledWith(4);

    browser.compose.getComposeDetails.mockClear();
    const ensureRes = await listener({ type: 'rwa:compose-content-ready' }, { tab: { id: 42 } });
    expect(ensureRes?.ok).toBe(true);
    expect(browser.compose.getComposeDetails).toHaveBeenCalledWith(42);
  });
});
