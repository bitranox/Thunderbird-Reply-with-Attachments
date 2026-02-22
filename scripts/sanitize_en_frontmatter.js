// Ensure EN docs front matter (website/docs/*.md) quote title and sidebar_label with double quotes.
// Also strips zero-width/combining marks and trims values. Leaves other fields untouched.

import fs from 'node:fs';
import path from 'node:path';

function sanitizeFrontMatterBlock(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---', 4);
  if (end === -1) return null;
  const fm = text.slice(4, end + 1);
  const body = text.slice(end + 4);
  const lines = fm.split(/\r?\n/);
  let changed = false;
  const out = lines.map((line) => {
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_\-]*)\s*:\s*(.*)$/);
    if (!m) return line;
    const key = m[1];
    let val = m[2];
    if (key === 'title' || key === 'sidebar_label') {
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      val = val.replace(/(?:\u200B|\u200C|\u200D|\uFEFF)/g, '');
      try {
        val = val.replace(/^\p{M}+/u, '');
      } catch {}
      val = val.trim();
      const quoted = JSON.stringify(val);
      if (m[2] !== quoted) changed = true;
      return `${key}: ${quoted}`;
    }
    return line;
  });
  if (!changed) return null;
  const rebuilt = `---\n${out.join('\n')}\n---${body}`;
  return rebuilt.endsWith('\n') ? rebuilt : rebuilt + '\n';
}

function run() {
  const docsDir = path.join(process.cwd(), 'website', 'docs');
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith('.md'));
  let fixed = 0;
  for (const f of files) {
    const p = path.join(docsDir, f);
    const orig = fs.readFileSync(p, 'utf8');
    const out = sanitizeFrontMatterBlock(orig);
    if (out != null) {
      fs.writeFileSync(p, out, 'utf8');
      console.log('fixed:', path.relative(process.cwd(), p));
      fixed++;
    }
  }
  console.log(`Done. Fixed ${fixed}/${files.length} file(s).`);
}

run();
