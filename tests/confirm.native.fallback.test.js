/* @vitest-environment jsdom */
import { describe, it, expect, vi } from 'vitest';

describe('content/confirm — native confirm fallback when no document.body', () => {
  it('calls global confirm and returns its boolean', async () => {
    await import('../sources/content/confirm.js');
    const { showDialogAndReturnResult } = globalThis.App.ContentConfirm.Internal;
    // Temporarily remove document.body
    const origDesc = Object.getOwnPropertyDescriptor(document, 'body');
    Object.defineProperty(document, 'body', { value: undefined, configurable: true });
    const confirmSpy = vi.spyOn(globalThis, 'confirm').mockReturnValueOnce(true);
    const r1 = await showDialogAndReturnResult('x', 'yes');
    expect(r1).toEqual({ ok: true });
    confirmSpy.mockReturnValueOnce(false);
    const r2 = await showDialogAndReturnResult('x', 'yes');
    expect(r2).toEqual({ ok: false });
    // restore
    if (origDesc) Object.defineProperty(document, 'body', origDesc);
    confirmSpy.mockRestore();
  });
});
