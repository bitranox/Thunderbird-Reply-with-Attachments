/*
 * Test Module: background.settings.migration.test.js
 * Scope: Settings initialization and migration never overwrite user values.
 */
import { describe, it, expect, vi } from 'vitest';

describe('background — settings persistence across updates', () => {
  it('on install seeds defaults only when keys are undefined', async () => {
    const store = {}; // empty -> first install
    const storage = makeStorageMock(store);
    const browser = makeBrowserMock({ storage });
    globalThis.browser = browser;

    vi.resetModules();
    await loadBackground();

    // Grab the onInstalled listener
    const listener = browser.runtime.onInstalled.addListener.mock.calls[0][0];
    await listener({ reason: 'install' });

    expect(store.settingsVersion).toBe(1);
    // Defaults applied on first install
    expect(store.blacklistPatterns).toEqual(['*intern*', '*secret*', '*passwor*']);
    expect(store.confirmBeforeAdd).toBe(false);
    expect(store.confirmDefaultChoice).toBe('yes');
    expect(store.warnOnBlacklistExcluded).toBe(true);
  });

  it('on update only fills missing keys; preserves existing user values', async () => {
    const store = {
      blacklistPatterns: ['custom'],
      confirmBeforeAdd: true,
      confirmDefaultChoice: 'no',
      // intentionally omit warnOnBlacklistExcluded to simulate new key
      settingsVersion: 0,
    };
    const storage = makeStorageMock(store);
    const browser = makeBrowserMock({ storage });
    globalThis.browser = browser;

    vi.resetModules();
    await loadBackground();
    const listener = browser.runtime.onInstalled.addListener.mock.calls[0][0];
    await listener({ reason: 'update', previousVersion: '2.0.0' });

    // Existing values not overwritten
    expect(store.blacklistPatterns).toEqual(['custom']);
    expect(store.confirmBeforeAdd).toBe(true);
    expect(store.confirmDefaultChoice).toBe('no');
    // Missing key filled with default
    expect(store.warnOnBlacklistExcluded).toBe(true);
    expect(store.settingsVersion).toBe(1);
  });
});

function makeStorageMock(store) {
  return {
    local: {
      get: vi.fn(async (defaults) => {
        if (!defaults) return { ...store };
        const out = { ...defaults };
        for (const k of Object.keys(defaults)) {
          if (typeof store[k] !== 'undefined') out[k] = store[k];
        }
        return out;
      }),
      set: vi.fn(async (obj) => {
        Object.assign(store, obj);
      }),
    },
  };
}

function makeBrowserMock({ storage }) {
  return {
    runtime: {
      onInstalled: { addListener: vi.fn() },
      onMessage: { addListener: vi.fn(), removeListener: vi.fn() },
    },
    tabs: {
      onRemoved: { addListener: vi.fn() },
      query: vi.fn().mockResolvedValue([]),
      sendMessage: vi.fn(),
    },
    compose: {
      onComposeStateChanged: { addListener: vi.fn() },
      onBeforeSend: { addListener: vi.fn() },
      getComposeDetails: vi.fn().mockResolvedValue({}),
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn(),
    },
    messages: {
      listAttachments: vi.fn().mockResolvedValue([]),
      getAttachmentFile: vi.fn(),
    },
    sessions: {
      getTabValue: vi.fn(),
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
    storage,
    windows: { create: vi.fn(), update: vi.fn() },
  };
}

async function loadBackground() {
  // Load modules in order; background bootstraps on import
  await import('../sources/app/adapters/thunderbird.js');
  await import('../sources/app/domain/filters.js');
  await import('../sources/app/application/usecases.js');
  await import('../sources/app/composition.js');
  await import('../sources/background.js');
}
