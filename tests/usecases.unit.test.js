/*
 * Test Module: usecases.unit.test.js
 * Scope: Application use-cases — focused unit tests for selection/processing helpers.
 * Intent: Validate attachment selection, safe helpers, and edge cases.
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
    globalThis.collectInlineCids = App.Domain.collectInlineCids;
    // Load use cases factory
    loadScript(path.join(process.cwd(), 'sources', 'app', 'application', 'usecases.js'), {});
  });

  // Test: createProcessReplyAttachments skips duplicates and inline images
  it('createProcessReplyAttachments skips duplicates and inline images', async () => {
    const compose = {
      listAttachments: vi.fn().mockResolvedValue([{ name: 'doc.PDF' }]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const attachments = [
      { name: 'doc.pdf', partName: '1', contentType: 'application/pdf' }, // duplicate by name
      { name: 'img.png', partName: '2', contentType: 'image/png', contentId: '<cid>' }, // inline → excluded
    ];
    const messages = {
      listAttachments: vi.fn().mockResolvedValue(attachments),
      listInlineTextParts: vi
        .fn()
        .mockResolvedValue([{ contentType: 'text/html', content: '<img src="cid:cid">' }]),
      getAttachmentFile: vi
        .fn()
        .mockImplementation(async (_mid, part) => ({ name: `part-${part}` })),
    };
    const logger = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const proc = App.UseCases.createProcessReplyAttachments({ compose, messages, logger });
    const added = await proc(1, 100);
    expect(added).toBe(0);
    expect(compose.addAttachment).toHaveBeenCalledTimes(0);
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
    expect(await sessions.getTabValue(5, 'S')).toEqual({ messageId: 200 });
  });

  // Test: createProcessReplyAttachments still excludes inline images from file attachments
  it('createProcessReplyAttachments excludes inline images from file attachments', async () => {
    const compose = {
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const attachments = [
      { name: 'img.png', partName: '2', contentType: 'image/png', contentId: '<cid>' },
      {
        name: 'embed.txt',
        partName: '3',
        contentType: 'text/plain',
        contentDisposition: 'inline; filename=embed.txt',
      },
    ];
    const messages = {
      listAttachments: vi.fn().mockResolvedValue(attachments),
      listInlineTextParts: vi
        .fn()
        .mockResolvedValue([{ contentType: 'text/html', content: '<img src="cid:cid">' }]),
      getAttachmentFile: vi
        .fn()
        .mockImplementation(async (_mid, part) => ({ name: `part-${part}` })),
    };
    const logger = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const proc = App.UseCases.createProcessReplyAttachments({
      compose,
      messages,
      logger,
    });
    const added = await proc(1, 100);
    expect(added).toBe(0);
    expect(compose.addAttachment).toHaveBeenCalledTimes(0);
  });

  // Test: an image whose Content-ID the body never references is a real attachment
  it('createProcessReplyAttachments adds an image whose Content-ID the body never references', async () => {
    const compose = {
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const attachments = [
      {
        name: 'photo.png',
        partName: '2',
        contentType: 'image/png',
        contentId: '<5A3F@example.net>',
        contentDisposition: 'attachment; filename=photo.png',
      },
    ];
    const messages = {
      listAttachments: vi.fn().mockResolvedValue(attachments),
      getAttachmentFile: vi
        .fn()
        .mockImplementation(async (_mid, part) => ({ name: `part-${part}` })),
    };
    const logger = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const proc = App.UseCases.createProcessReplyAttachments({ compose, messages, logger });
    const added = await proc(1, 100);
    expect(added).toBe(1);
    expect(compose.addAttachment).toHaveBeenCalledTimes(1);
  });

  // Test: the confirm dialog is offered for such an attachment instead of silently skipped
  it('createProcessReplyAttachments asks for confirmation for an unreferenced Content-ID image', async () => {
    const compose = {
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi
        .fn()
        .mockResolvedValue([
          { name: 'photo.jpeg', partName: '2', contentType: 'image/jpeg', contentId: '<abc>' },
        ]),
      getAttachmentFile: vi.fn().mockResolvedValue({ name: 'photo.jpeg' }),
    };
    const confirm = vi.fn().mockResolvedValue(true);
    const proc = App.UseCases.createProcessReplyAttachments({ compose, messages, confirm });
    await proc(1, 100);
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(confirm.mock.calls[0][1]).toEqual([{ name: 'photo.jpeg', partName: '2' }]);
  });

  // Test: the reply body is never rewritten
  it('ensureReplyAttachments never writes the compose body', async () => {
    // Thunderbird restores inline images in the composer itself (bug 1997519).
    // Writing the body back raced that conversion and relied on the internal
    // imap:/mailbox: URL format, which is not a stable API.
    const compose = {
      getDetails: vi.fn().mockResolvedValue({ type: 'reply', referenceMessageId: 300 }),
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
      setDetails: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi
        .fn()
        .mockResolvedValue([
          { name: 'photo.png', partName: 'p1', contentType: 'image/png', contentId: '<abc123>' },
        ]),
      listInlineTextParts: vi
        .fn()
        .mockResolvedValue([
          { contentType: 'text/html', content: '<html><body><img src="cid:abc123"></body></html>' },
        ]),
      getAttachmentFile: vi.fn().mockResolvedValue({ name: 'photo.png' }),
    };
    const _tab = new Map();
    const sessions = {
      async getTabValue(tab, key) {
        return _tab.get(`${tab}:${key}`);
      },
      async setTabValue(tab, key, val) {
        _tab.set(`${tab}:${key}`, val);
      },
      async removeTabValue(tab, key) {
        _tab.delete(`${tab}:${key}`);
      },
    };
    const logger = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const ensure = App.UseCases.createEnsureReplyAttachments({
      compose,
      messages,
      sessions,
      state: new Map(),
      sessionKey: 'S',
      logger,
    });
    await ensure(10, { type: 'reply', referenceMessageId: 300 });
    expect(compose.setDetails).not.toHaveBeenCalled();
    // The embedded image is left to Thunderbird, so it is not attached either.
    expect(compose.addAttachment).not.toHaveBeenCalled();
  });

  // Test: the count limit caps a reply and reports what was left out
  it('copies at most COPY_LIMITS.maxCount attachments and reports the rest', async () => {
    const { maxCount } = App.UseCases.COPY_LIMITS;
    const attachments = Array.from({ length: maxCount + 3 }, (_, i) => ({
      name: `doc${i}.txt`,
      partName: String(i),
      contentType: 'text/plain',
      size: 10,
    }));
    const compose = {
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi.fn().mockResolvedValue(attachments),
      listInlineTextParts: vi.fn().mockResolvedValue([]),
      getAttachmentFile: vi.fn().mockImplementation(async (_m, part) => ({ name: `part-${part}` })),
    };
    const warn = vi.fn().mockResolvedValue(undefined);
    const logger = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const proc = App.UseCases.createProcessReplyAttachments({ compose, messages, warn, logger });

    const added = await proc(1, 100);
    expect(added).toBe(maxCount);
    expect(warn).toHaveBeenCalledTimes(1);
    const rows = warn.mock.calls[0][1];
    expect(rows.map((r) => r.name)).toEqual([
      `doc${maxCount}.txt`,
      `doc${maxCount + 1}.txt`,
      `doc${maxCount + 2}.txt`,
    ]);
    expect(rows[0].pattern).toBe(`> ${maxCount}`);
  });

  // Test: the size limit stops the copy once the budget is spent
  it('stops copying once COPY_LIMITS.maxTotalBytes is exceeded', async () => {
    const { maxTotalBytes } = App.UseCases.COPY_LIMITS;
    const half = Math.floor(maxTotalBytes / 2);
    const attachments = [
      { name: 'a.bin', partName: '1', contentType: 'application/octet-stream', size: half },
      { name: 'b.bin', partName: '2', contentType: 'application/octet-stream', size: half },
      { name: 'c.bin', partName: '3', contentType: 'application/octet-stream', size: half },
    ];
    const compose = {
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi.fn().mockResolvedValue(attachments),
      listInlineTextParts: vi.fn().mockResolvedValue([]),
      getAttachmentFile: vi.fn().mockImplementation(async (_m, part) => ({ name: `part-${part}` })),
    };
    const warn = vi.fn().mockResolvedValue(undefined);
    const proc = App.UseCases.createProcessReplyAttachments({ compose, messages, warn });

    const added = await proc(1, 100);
    expect(added).toBe(2);
    const rows = warn.mock.calls[0][1];
    expect(rows).toEqual([
      { name: 'c.bin', pattern: `> ${Math.round(maxTotalBytes / 1048576)} MB` },
    ]);
  });

  // Test: a single oversized attachment is still copied
  it('copies a lone attachment that is larger than the whole byte budget', async () => {
    // Dropping it would be the silent loss the limit exists to prevent: it is the
    // only file, and it is what the user is replying about.
    const { maxTotalBytes } = App.UseCases.COPY_LIMITS;
    const attachments = [
      { name: 'huge.zip', partName: '1', contentType: 'application/zip', size: maxTotalBytes * 3 },
    ];
    const compose = {
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi.fn().mockResolvedValue(attachments),
      listInlineTextParts: vi.fn().mockResolvedValue([]),
      getAttachmentFile: vi.fn().mockResolvedValue({ name: 'huge.zip' }),
    };
    const warn = vi.fn().mockResolvedValue(undefined);
    const proc = App.UseCases.createProcessReplyAttachments({ compose, messages, warn });

    expect(await proc(1, 100)).toBe(1);
    expect(warn).not.toHaveBeenCalled();
  });

  it('retries fetching attachments when the first attempt is empty', async () => {
    const compose = {
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
    };
    const attachments = [{ name: 'report.pdf', partName: '1', contentType: 'application/pdf' }];
    const messages = {
      listAttachments: vi.fn().mockResolvedValueOnce([]).mockResolvedValueOnce(attachments),
      getAttachmentFile: vi.fn().mockResolvedValue({ name: 'report.pdf' }),
    };
    const logger = { debug: vi.fn(), warn: vi.fn() };
    const proc = App.UseCases.createProcessReplyAttachments({
      compose,
      messages,
      logger,
      attachmentsRetry: { attempts: 2, delayMs: 0 },
    });
    const added = await proc(7, 4242);
    expect(messages.listAttachments).toHaveBeenCalledTimes(2);
    expect(compose.addAttachment).toHaveBeenCalledTimes(1);
    expect(added).toBe(1);
  });
});
