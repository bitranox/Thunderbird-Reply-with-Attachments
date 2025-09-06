/*
 * Test Module: shared.utils.test.js
 * Scope: Shared utilities — toNumericId and logger behavior.
 * Intent: Ensure utility functions are stable and predictable.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('App.Shared utils', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  // Test: toNumericId handles number, object, and invalid
  it('toNumericId handles number, object, and invalid', async () => {
    await import('../sources/app/shared/utils.js');
    const { toNumericId } = globalThis.App.Shared;
    expect(toNumericId(5)).toBe(5);
    expect(toNumericId({ id: 7 })).toBe(7);
    expect(toNumericId({ id: 'x' })).toBe(null);
    expect(toNumericId(null)).toBe(null);
  });

  // Test: makeLogger logs at all levels; debug definitely logs when enabled
  it('makeLogger logs at all levels; debug definitely logs when enabled', async () => {
    await import('../sources/app/shared/utils.js');
    const { makeLogger } = globalThis.App.Shared;
    const d = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const i = vi.spyOn(console, 'info').mockImplementation(() => {});
    const w = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const e = vi.spyOn(console, 'error').mockImplementation(() => {});

    const off = makeLogger(false);
    off.debug('x');
    off.info('y');
    off.warn('z');
    off.error('k');
    expect(i).toHaveBeenCalled();
    expect(w).toHaveBeenCalled();
    expect(e).toHaveBeenCalled();

    d.mockClear();
    i.mockClear();
    w.mockClear();
    e.mockClear();
    const on = makeLogger(true);
    on.debug('a');
    on.info('b');
    on.warn('c');
    on.error('d');
    expect(d).toHaveBeenCalled();
    expect(i).toHaveBeenCalled();
    expect(w).toHaveBeenCalled();
    expect(e).toHaveBeenCalled();
  });
});
