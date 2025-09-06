import { describe, it, expect, vi } from 'vitest';

describe('composition internals — small pure helpers', () => {
  it('yesNo maps truthy to yes except explicit no', async () => {
    await import('../sources/app/composition.js');
    const { yesNo } = globalThis.App.Composition.Internal;
    expect(yesNo('no')).toBe('no');
    expect(yesNo('NO')).toBe('no');
    expect(yesNo(undefined)).toBe('yes');
    expect(yesNo('yes')).toBe('yes');
  });

  it('shouldAsk requires both toggle and non-empty selection', async () => {
    await import('../sources/app/composition.js');
    const { shouldAsk } = globalThis.App.Composition.Internal;
    expect(shouldAsk(true, [{ name: 'a' }])).toBe(true);
    expect(shouldAsk(false, [{ name: 'a' }])).toBe(false);
    expect(shouldAsk(true, [])).toBe(false);
    expect(shouldAsk(true, null)).toBe(false);
  });

  it('isDecision only true for explicit boolean ok', async () => {
    await import('../sources/app/composition.js');
    const { isDecision } = globalThis.App.Composition.Internal;
    expect(isDecision({ ok: true })).toBe(true);
    expect(isDecision({ ok: false })).toBe(true);
    expect(isDecision({ ok: 'yes' })).toBe(false);
    expect(isDecision(null)).toBeFalsy();
  });

  it('buildConfirmUrl includes def=no and counts', async () => {
    await import('../sources/app/composition.js');
    const { buildConfirmUrl } = globalThis.App.Composition.Internal;
    const fake = { runtime: { getURL: (p) => `tb://ext/${p}` } };
    const url = buildConfirmUrl(fake, 'tok', ['a', 'b', 'c', 'd', 'e', 'f'], 'no');
    expect(url.startsWith('tb://ext/confirm.html?')).toBe(true);
    expect(url).toContain('c=6');
    expect(url).toContain('more=1');
    expect(url).toContain('def=no');
  });

  it('waitForConfirm resolves false on timeout', async () => {
    await import('../sources/app/composition.js');
    const { waitForConfirm } = globalThis.App.Composition.Internal;
    vi.useFakeTimers();
    const browser = { runtime: { onMessage: { addListener: vi.fn(), removeListener: vi.fn() } } };
    const p = waitForConfirm(browser, 't1');
    await vi.advanceTimersByTimeAsync(20050);
    await expect(p).resolves.toBe(false);
    vi.useRealTimers();
  });
});
