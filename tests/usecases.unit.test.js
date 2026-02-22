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

  // Test: restoreInlineImages replaces CID references with data URIs in the body
  it('ensureReplyAttachments restores inline images as data URIs when includeInlinePictures is true', async () => {
    const htmlBody = '<html><body><img src="cid:abc123"></body></html>';
    const pngBytes = new Uint8Array([137, 80, 78, 71]); // minimal PNG header bytes
    const pngBlob = new Blob([pngBytes], { type: 'image/png' });
    const compose = {
      getDetails: vi.fn().mockResolvedValue({
        type: 'reply',
        referenceMessageId: 300,
        body: htmlBody,
      }),
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
      getAttachmentFile: vi.fn().mockResolvedValue(pngBlob),
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
    const state = new Map();
    const logger = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const ensure = App.UseCases.createEnsureReplyAttachments({
      compose,
      messages,
      sessions,
      state,
      sessionKey: 'S',
      logger,
      includeInlinePictures: true,
    });
    await ensure(10, { type: 'reply', referenceMessageId: 300 });
    expect(compose.setDetails).toHaveBeenCalledTimes(1);
    const call = compose.setDetails.mock.calls[0];
    expect(call[0]).toBe(10);
    expect(call[1].body).toContain('data:image/png;base64,');
    expect(call[1].body).not.toContain('cid:abc123');
  });

  // Test: restoreInlineImages replaces Thunderbird imap:// URLs with data URIs
  // getComposeDetails returns serialized HTML where & in URLs becomes &amp;
  it('ensureReplyAttachments restores inline images from imap:// URLs with &amp; encoding', async () => {
    const imapUrl =
      'imap://user@imap.example.com:993/fetch%3EUID%3E/INBOX%3E12345?header=quotebody&amp;part=1.2.2&amp;filename=Logo.png';
    const htmlBody = `<html><body><img src="${imapUrl}"></body></html>`;
    const pngBytes = new Uint8Array([137, 80, 78, 71]);
    const pngBlob = new Blob([pngBytes], { type: 'image/png' });
    const compose = {
      getDetails: vi.fn().mockResolvedValue({
        type: 'reply',
        referenceMessageId: 350,
        body: htmlBody,
      }),
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
      setDetails: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi.fn().mockResolvedValue([
        {
          name: 'Logo.png',
          partName: '1.2.2',
          contentType: 'image/png',
          contentId: '<logo-cid>',
        },
      ]),
      getAttachmentFile: vi.fn().mockResolvedValue(pngBlob),
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
    const state = new Map();
    const logger = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const ensure = App.UseCases.createEnsureReplyAttachments({
      compose,
      messages,
      sessions,
      state,
      sessionKey: 'S',
      logger,
      includeInlinePictures: true,
    });
    await ensure(13, { type: 'reply', referenceMessageId: 350 });
    expect(compose.setDetails).toHaveBeenCalledTimes(1);
    const call = compose.setDetails.mock.calls[0];
    expect(call[0]).toBe(13);
    expect(call[1].body).toContain('data:image/png;base64,');
    expect(call[1].body).not.toContain('imap://');
  });

  // Test: restoreInlineImages is a no-op when body has no inline references
  it('ensureReplyAttachments skips inline restore when body has no CID refs', async () => {
    const compose = {
      getDetails: vi.fn().mockResolvedValue({
        type: 'reply',
        referenceMessageId: 400,
        body: '<html><body>No images here</body></html>',
      }),
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
      setDetails: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi.fn().mockResolvedValue([]),
      getAttachmentFile: vi.fn().mockResolvedValue(null),
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
    const state = new Map();
    const logger = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const ensure = App.UseCases.createEnsureReplyAttachments({
      compose,
      messages,
      sessions,
      state,
      sessionKey: 'S',
      logger,
      includeInlinePictures: true,
    });
    await ensure(11, { type: 'reply', referenceMessageId: 400 });
    expect(compose.setDetails).not.toHaveBeenCalled();
  });

  // Test: restoreInlineImages gracefully skips when attachment fetch fails
  it('ensureReplyAttachments handles inline image fetch failure gracefully', async () => {
    const htmlBody = '<html><body><img src="cid:fail-id"></body></html>';
    const compose = {
      getDetails: vi.fn().mockResolvedValue({
        type: 'reply',
        referenceMessageId: 500,
        body: htmlBody,
      }),
      listAttachments: vi.fn().mockResolvedValue([]),
      addAttachment: vi.fn().mockResolvedValue(undefined),
      setDetails: vi.fn().mockResolvedValue(undefined),
    };
    const messages = {
      listAttachments: vi
        .fn()
        .mockResolvedValue([
          { name: 'broken.png', partName: 'p1', contentType: 'image/png', contentId: '<fail-id>' },
        ]),
      getAttachmentFile: vi.fn().mockRejectedValue(new Error('network error')),
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
    const state = new Map();
    const logger = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() };
    const ensure = App.UseCases.createEnsureReplyAttachments({
      compose,
      messages,
      sessions,
      state,
      sessionKey: 'S',
      logger,
      includeInlinePictures: true,
    });
    await ensure(12, { type: 'reply', referenceMessageId: 500 });
    // setDetails should not be called since the only image fetch failed
    expect(compose.setDetails).not.toHaveBeenCalled();
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
