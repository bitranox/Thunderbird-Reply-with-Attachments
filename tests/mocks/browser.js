// Minimal mock of Thunderbird's WebExtension APIs used in background.js
// Provides spies via Vitest's vi.fn to assert calls.

import { vi } from 'vitest';

export function createBrowserMock({ attachments = [], getAttachmentFileResult = {} } = {}) {
  const compose = {
    onComposeStateChanged: { addListener: vi.fn() },
    getComposeDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 0 }),
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

  return { compose, messages, tabs, sessions };
}
