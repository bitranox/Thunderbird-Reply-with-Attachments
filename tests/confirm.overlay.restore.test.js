/*
 * Test Module: confirm.overlay.restore.test.js
 * Scope: Content confirm — overlay restores document state.
 * Intent: Ensure body overflow is restored after closing the modal.
 */
/* @vitest-environment jsdom */
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('confirm dialog — opens softly, leaves no trace', () => {
  let listener;
  beforeEach(async () => {
    document.body.innerHTML = '<div id="root"></div>';
    globalThis.browser = {
      runtime: {
        onMessage: {
          addListener: (fn) => {
            listener = fn;
          },
        },
      },
      i18n: { getMessage: vi.fn() },
    };
    await import('../sources/content/confirm.js');
  });

  // Test: toggles body overflow and then restores it
  it('toggles body overflow and then restores it', async () => {
    // Start with a custom body overflow to ensure we restore the exact value
    document.body.style.overflow = 'scroll';
    const p = listener({ type: 'rwa:confirm-add', files: ['a'], def: 'yes' });
    // Wait for dialog to mount
    await tick();
    expect(document.body.style.overflow).toBe('hidden');
    // Click yes to resolve and trigger cleanup
    document.querySelector('button:last-of-type').click();
    await p; // resolved
    expect(document.body.style.overflow).toBe('scroll');
  });
});

function tick() {
  return new Promise((r) => setTimeout(r, 0));
}
