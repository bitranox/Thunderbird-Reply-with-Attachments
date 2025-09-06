/*
 * Test Module: i18n.title.test.js
 * Scope: UI i18n — confirm page title and text formatting.
 * Intent: Verify message keys/arguments build expected strings.
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('confirm.html — default <title> fallback is present', () => {
  // Test: contains an English fallback title that code can override
  it('contains an English fallback title that code can override', () => {
    const html = fs.readFileSync(path.join(process.cwd(), 'sources', 'confirm.html'), 'utf8');
    // naive check that the <title> contains the expected fallback text
    expect(html).toMatch(/<title>\s*Confirm Attachments\s*<\/title>/);
  });
});
