import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

function loadScript(filepath) {
  const code = fs.readFileSync(filepath, 'utf8');
  // eslint-disable-next-line no-new-func
  const fn = new Function(code);
  fn();
}

describe('content/confirm.js i18n', () => {
  let textShown;
  beforeEach(() => {
    textShown = undefined;
    // Mock confirm to capture the text
    globalThis.confirm = (t) => {
      textShown = t;
      return true;
    };
    // Mock i18n
    globalThis.browser = {
      i18n: {
        getMessage: (k, args) => {
          if (k === 'confirmAddOne') return `ONE:${args[0]}`;
          if (k === 'confirmAddMany') return `MANY:${args[0]}:${args[1]}:${args[2]}`;
          return '';
        },
      },
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

  it('uses confirmAddOne for single file', async () => {
    const res = await globalThis.__listener({ type: 'rwa:confirm-add', files: ['x.pdf'] });
    expect(textShown.startsWith('ONE:x.pdf')).toBe(true);
    expect(res).toEqual({ ok: true });
  });

  it('uses confirmAddMany for multiple files', async () => {
    const res = await globalThis.__listener({
      type: 'rwa:confirm-add',
      files: ['a.txt', 'b.txt', 'c.txt'],
    });
    expect(textShown.startsWith('MANY:3:a.txt, b.txt')).toBe(true);
    expect(res).toEqual({ ok: true });
  });
});
