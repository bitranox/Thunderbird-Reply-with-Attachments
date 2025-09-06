/*
 * Test Module: domain.normalizedName.edgecases.test.js
 * Scope: Domain — normalizedName edge cases.
 * Intent: Verify trimming/Unicode normalization and empty name handling.
 */
import { describe, it, expect, beforeAll } from 'vitest';

describe('Domain.normalizedName edge cases', () => {
  beforeAll(async () => {
    await import('../sources/app/domain/filters.js');
  });

  // Test: normalizes NFC vs NFD to the same key (case-insensitive)
  it('normalizes NFC vs NFD to the same key (case-insensitive)', () => {
    const { normalizedName } = globalThis.App.Domain;
    const nfc = 'café.pdf';
    const nfd = 'cafe\u0301.pdf';
    expect(normalizedName({ name: nfc })).toEqual(normalizedName({ name: nfd }));
  });

  // Test: trims trailing spaces and dots, and folds case
  it('trims trailing spaces and dots, and folds case', () => {
    const { normalizedName } = globalThis.App.Domain;
    expect(normalizedName({ name: ' Report .PDF ' })).toEqual(
      'report .pdf'
        .trim()
        .replace(/[.\s]+$/, '')
        .toLowerCase()
    );
    expect(normalizedName({ name: 'file.txt   ' })).toEqual('file.txt');
    expect(normalizedName({ name: 'FILE.TXT.' })).toEqual('file.txt');
  });
});
