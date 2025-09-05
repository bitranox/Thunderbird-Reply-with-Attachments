import { describe, it, expect } from 'vitest';

describe('Domain.normalizedName edge cases', () => {
  beforeAll(async () => {
    await import('../sources/app/domain/filters.js');
  });

  it('normalizes NFC vs NFD to the same key (case-insensitive)', () => {
    const { normalizedName } = globalThis.App.Domain;
    const nfc = 'café.pdf';
    const nfd = 'cafe\u0301.pdf';
    expect(normalizedName({ name: nfc })).toEqual(normalizedName({ name: nfd }));
  });

  it('trims trailing spaces and dots, and folds case', () => {
    const { normalizedName } = globalThis.App.Domain;
    expect(normalizedName({ name: ' Report .PDF ' })).toEqual('report .pdf'.trim().replace(/[.\s]+$/,'').toLowerCase());
    expect(normalizedName({ name: 'file.txt   ' })).toEqual('file.txt');
    expect(normalizedName({ name: 'FILE.TXT.' })).toEqual('file.txt');
  });
});

