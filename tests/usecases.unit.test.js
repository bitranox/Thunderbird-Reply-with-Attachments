/*
 * Test Module: usecases.unit.test.js
 * Scope: Application use-cases — focused unit tests for selection/processing helpers.
 * Intent: Validate two-pass selection, safe helpers, and edge cases.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

/**
 * Load a script file into the current context for tests (non-ESM helper).
 * @param {string} filepath
 * @param {Record<string,any>} context
 */
function loadScript(filepath, context = {}) {
  const code = fs.readFileSync(filepath, 'utf8');
  const fn = new Function(...Object.keys(context), code);
  fn(...Object.values(context));
}

describe('UseCases — unit', () => {
  beforeEach(() => {
    // Load domain helpers to globals (normalizedName, includeStrict/Relaxed)
    loadScript(path.join(process.cwd(), 'sources', 'app', 'domain', 'filters.js'), {});
    // Expose functions that usecases.js expects as globals
    globalThis.lower = App.Domain.lower;
    globalThis.normalizedName = App.Domain.normalizedName;
    globalThis.isSmime = App.Domain.isSmime;
    globalThis.isInlineImage = App.Domain.isInlineImage;
    globalThis.isInlineDisposition = App.Domain.isInlineDisposition;
    globalThis.includeStrict = App.Domain.includeStrict;
    globalThis.includeRelaxed = App.Domain.includeRelaxed;
    // Load use cases factory
    loadScript(path.join(process.cwd(), 'sources', 'app', 'application', 'usecases.js'), {});
  });

  // Test: createProcessReplyAttachments skips duplicates and never adds inline content even on fallback
  it('createProcessReplyAttachments skips duplicates and never adds inline content even on fallback', async () => {
    const compose = {
      listAttachments: vi.fn().mockResolvedValue([{ name: 'doc.PDF' }]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const attachments = [
      { name: 'doc.pdf', partName: '1', contentType: 'application/pdf' }, // duplicate by name
      { name: 'img.png', partName: '2', contentType: 'image/png', contentId: '<cid>' }, // inline → never added
    ];
    const messages = {
      listAttachments: vi.fn().mockResolvedValue(attachments),
      getAttachmentFile: vi
        .fn()
        .mockImplementation(async (_mid, part) => ({ name: `part-${part}` })),
    };
    const proc = App.UseCases.createProcessReplyAttachments({ compose, messages });
    const added = await proc(1, 100);
    expect(added).toBe(0);
    expect(compose.addAttachment).not.toHaveBeenCalled();
  });

  // Test: createEnsureReplyAttachments marks sessions and avoids duplicates across calls
  it('createEnsureReplyAttachments marks sessions and avoids duplicates across calls', async () => {
    const compose = {
      getDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 200 }),
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi
        .fn()
        .mockResolvedValue([{ name: 'a.txt', partName: 'p1', contentType: 'text/plain' }]),
      getAttachmentFile: vi.fn().mockResolvedValue({ name: 'a.txt' }),
    };
    const _tab = new Map();
    const sessions = {
      async getTabValue(tab, key) {
        return _tab.get(`${tab}:${key}`);
      },
      async setTabValue(tab, key, val) {
        _tab.set(`${tab}:${key}`, val);
      },
    };
    const state = new Map();
    const ensure = App.UseCases.createEnsureReplyAttachments({
      compose,
      messages,
      sessions,
      state,
      sessionKey: 'S',
    });
    await ensure(5, { type: 'reply', referenceMessageId: 200 });
    await ensure(5, { type: 'reply', referenceMessageId: 200 });
    expect(compose.addAttachment).toHaveBeenCalledTimes(1);
    expect(await sessions.getTabValue(5, 'S')).toBe(true);
  });
});
