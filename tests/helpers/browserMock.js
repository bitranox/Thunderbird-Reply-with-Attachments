/*
 * Test Helper: helpers/browserMock.js
 * Scope: Provide a configurable fake `browser` API for tests.
 * Intent: Centralize mocks for compose/messages/tabs/storage/runtime.
 */
import { vi } from 'vitest';

/**
 * Create a test browser mock with commonly used APIs and defaults.
 * @param {Object} [opts]
 * @param {any[]} [opts.composeExisting]
 * @param {any[]} [opts.messageAttachments]
 * @param {(id:number,part:string)=>Promise<Blob|null>} [opts.getFileByPart]
 * @param {boolean} [opts.confirmBeforeAdd]
 * @param {'yes'|'no'} [opts.confirmDefaultChoice]
 * @param {string[]} [opts.blacklistPatterns]
 * @param {boolean} [opts.warnOnBlacklistExcluded]
 */
export function createBrowserMock({
  composeExisting = [],
  messageAttachments = [],
  getFileByPart = async () => null,
  confirmBeforeAdd = false,
  confirmDefaultChoice = 'yes',
  blacklistPatterns = [],
  warnOnBlacklistExcluded = true,
} = {}) {
  const compose = {
    onComposeStateChanged: { addListener: vi.fn() },
    onBeforeSend: { addListener: vi.fn() },
    getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 101 }),
    listAttachments: vi.fn().mockResolvedValue(composeExisting),
    addAttachment: vi.fn().mockResolvedValue(undefined),
    setComposeDetails: vi.fn().mockResolvedValue(undefined),
  };
  const messages = {
    listAttachments: vi.fn().mockResolvedValue(messageAttachments),
    getAttachmentFile: vi.fn(getFileByPart),
  };
  const sessionStore = new Map();
  const keyFor = (tabId, key) => `${tabId}:${key}`;

  const browser = {
    runtime: { onMessage: { addListener: vi.fn(), removeListener: vi.fn() }, sendMessage: vi.fn() },
    windows: {
      create: vi.fn().mockResolvedValue({ id: 1 }),
      update: vi.fn().mockResolvedValue({}),
    },
    tabs: {
      onRemoved: { addListener: vi.fn() },
      sendMessage: vi.fn().mockResolvedValue({ ok: true }),
    },
    storage: {
      local: {
        get: vi.fn().mockResolvedValue({
          blacklistPatterns,
          confirmBeforeAdd,
          confirmDefaultChoice,
          warnOnBlacklistExcluded,
        }),
      },
      onChanged: { addListener: vi.fn() },
    },
    compose,
    messages,
    sessions: {
      getTabValue: vi.fn(async (tabId, key) => sessionStore.get(keyFor(tabId, key)) ?? null),
      setTabValue: vi.fn(async (tabId, key, value) => {
        sessionStore.set(keyFor(tabId, key), value);
      }),
      removeTabValue: vi.fn(async (tabId, key) => {
        sessionStore.delete(keyFor(tabId, key));
      }),
    },
    scripting: {
      compose: {
        getRegisteredScripts: vi.fn().mockResolvedValue([]),
        registerScripts: vi.fn(),
        executeScript: vi.fn(),
      },
    },
  };
  return browser;
}

/** Trigger the registered onComposeStateChanged listener for the given tab. */
export function triggerComposeState(browser, tabId = 1) {
  const cb = browser.compose.onComposeStateChanged.addListener.mock.calls[0][0];
  return cb(tabId);
}
