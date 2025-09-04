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

  return { compose, messages, tabs };
}
