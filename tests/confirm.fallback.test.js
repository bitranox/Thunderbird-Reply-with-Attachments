/*
 * Test Module: confirm.fallback.test.js
 * Scope: Content confirm — English fallback when i18n missing.
 * Intent: Ensure user-facing text is sensible without localization APIs.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';

function loadScript(filepath) {
  const code = fs.readFileSync(filepath, 'utf8');
  const fn = new Function(code);
  fn();
}

describe('content/confirm.js English fallback when i18n missing', () => {
  let textShown;
  beforeEach(() => {
    textShown = undefined;
    globalThis.confirm = (t) => {
      textShown = t;
      return true;
    };
    // Provide only runtime messaging, no i18n
    globalThis.browser = {
      runtime: {
        onMessage: {
          addListener: (fn) => {
            globalThis.__listener = fn;
          },
        },
      },
    };
    loadScript(path.join(process.cwd(), 'sources', 'content', 'confirm.js'));
  });

  // Test: falls back to English for single file
  it('falls back to English for single file', async () => {
    await globalThis.__listener({ type: 'rwa:confirm-add', files: ['x.pdf'] });
    expect(textShown.startsWith('Add attachment:')).toBe(true);
  });

  // Test: falls back to English for multiple files
  it('falls back to English for multiple files', async () => {
    await globalThis.__listener({ type: 'rwa:confirm-add', files: ['a.txt', 'b.txt', 'c.txt'] });
    expect(textShown.startsWith('Add attachments (3):')).toBe(true);
  });
});
