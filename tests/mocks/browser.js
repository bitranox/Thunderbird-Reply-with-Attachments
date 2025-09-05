// Minimal mock of Thunderbird's WebExtension APIs used in background.js
// Provides spies via Vitest's vi.fn to assert calls.

import { vi } from 'vitest';

export function createBrowserMock({
  attachments = [],
  getAttachmentFileResult = {},
  storageLocalInit = {},
} = {}) {
  const compose = {
    onComposeStateChanged: { addListener: vi.fn() },
    onBeforeSend: { addListener: vi.fn() },
    getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 0 }),
    listAttachments: vi.fn().mockResolvedValue([]),
    addAttachment: vi.fn().mockResolvedValue(undefined),
  };

  const messages = {
    listAttachments: vi.fn().mockResolvedValue(attachments),
    getAttachmentFile: vi.fn().mockResolvedValue(getAttachmentFileResult),
  };

  const tabs = {
    onRemoved: { addListener: vi.fn() },
  };

  // Simple in-memory sessions storage
  const _tabValues = new Map();
  const sessions = {
    async getTabValue(tabId, key) {
      return _tabValues.get(`${tabId}:${key}`);
    },
    async setTabValue(tabId, key, value) {
      _tabValues.set(`${tabId}:${key}`, value);
    },
    async removeTabValue(tabId, key) {
      _tabValues.delete(`${tabId}:${key}`);
    },
  };

  // storage.local mock with onChanged
  const _storage = { ...storageLocalInit };
  const storage = {
    local: {
      async get(defaults) {
        if (!defaults) return { ..._storage };
        const out = { ...defaults };
        for (const k of Object.keys(defaults)) {
          if (_storage[k] !== undefined) out[k] = _storage[k];
        }
        return out;
      },
      async set(obj) {
        const changes = {};
        for (const [k, v] of Object.entries(obj)) {
          changes[k] = { oldValue: _storage[k], newValue: v };
          _storage[k] = v;
        }
        storage.onChanged._fire(changes, 'local');
      },
    },
    onChanged: {
      _listeners: [],
      addListener(fn) {
        this._listeners.push(fn);
      },
      _fire(changes, area) {
        this._listeners.forEach((fn) => fn(changes, area));
      },
    },
  };

  return { compose, messages, tabs, sessions, storage };
}
