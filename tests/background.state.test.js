import { describe, it, expect, beforeEach } from 'vitest';
import vm from 'vm';
import { createBrowserMock } from './mocks/browser.js';
import { executeBackgroundWith } from './helpers/execute-background.js';

function att(name, partName) {
  return { name, partName, contentType: 'text/plain' };
}

describe('background.js — state & ensureReplyAttachments', () => {
  let browser;
  let ctx;

  beforeEach(() => {
    browser = createBrowserMock({ attachments: [att('one.txt', '1.1')], getAttachmentFileResult: { size: 1 } });
    ctx = executeBackgroundWith(browser);
  });

  it('processes once per tab and marks as done in sessions', async () => {
    const ensureReplyAttachments = vm.runInContext('ensureReplyAttachments', ctx);
    const SESSION_KEY = vm.runInContext('SESSION_KEY', ctx);

    const tabId = 201;
    const details = { type: 'reply', referenceMessageId: 50 };

    // First run adds one
    await ensureReplyAttachments(tabId, details);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);

    // Second run should be skipped (already processed)
    await ensureReplyAttachments(tabId, details);
    expect(browser.compose.addAttachment).toHaveBeenCalledTimes(1);

    // sessions has the processed flag
    const done = await browser.sessions.getTabValue(tabId, SESSION_KEY);
    expect(done).toBe(true);
  });

  it('on tab close clears in-memory and sessions state', async () => {
    // Produce a processed state
    const ensureReplyAttachments = vm.runInContext('ensureReplyAttachments', ctx);
    const SESSION_KEY = vm.runInContext('SESSION_KEY', ctx);
    const processedTabsState = vm.runInContext('processedTabsState', ctx);
    const tabId = 202;
    await ensureReplyAttachments(tabId, { type: 'reply', referenceMessageId: 55 });

    // Find onRemoved listener and call it
    const cb = browser.tabs.onRemoved.addListener.mock.calls[0][0];
    await cb(tabId);

    // processedTabsState no longer has the tab
    expect(processedTabsState.has(tabId)).toBe(false);
    // Session value removed
    const val = await browser.sessions.getTabValue(tabId, SESSION_KEY);
    expect(val).toBeUndefined();
  });
});

