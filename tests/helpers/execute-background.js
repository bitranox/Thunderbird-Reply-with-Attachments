// Executes sources/background.js in a VM-like sandbox with a provided browser mock
// and returns the sandbox so tests can access globals defined by the script.

import fs from 'fs';
import vm from 'vm';
import path from 'path';

function readScriptsFromBackgroundHtml() {
  const htmlPath = path.join(process.cwd(), 'sources', 'background.html');
  if (!fs.existsSync(htmlPath)) return null;
  const html = fs.readFileSync(htmlPath, 'utf8');
  const re = /<script\s+src=\"([^\"]+)\"/g;
  const files = [];
  let m;
  while ((m = re.exec(html))) {
    files.push(m[1]);
  }
  return files.length ? files : null;
}

export function executeBackgroundWith(browser) {
  const sandbox = { browser, console, setTimeout, clearTimeout };
  const context = vm.createContext(sandbox);
  const base = path.join(process.cwd(), 'sources');
  const scripts = readScriptsFromBackgroundHtml() || ['background.js'];
  for (const rel of scripts) {
    const p = path.join(base, rel);
    const code = fs.readFileSync(p, 'utf8');
    const script = new vm.Script(code, { filename: rel });
    script.runInContext(context);
  }
  return context;
}
