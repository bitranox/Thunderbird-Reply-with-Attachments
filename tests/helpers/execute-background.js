// Executes sources/background.js in a VM-like sandbox with a provided browser mock
// and returns the sandbox so tests can access globals defined by the script.

import fs from 'fs';
import vm from 'vm';
import path from 'path';

export function executeBackgroundWith(browser) {
  const code = fs.readFileSync(path.join(process.cwd(), 'sources', 'background.js'), 'utf8');
  const sandbox = {
    browser,
    console,
    setTimeout,
    clearTimeout,
  };
  const context = vm.createContext(sandbox);
  const script = new vm.Script(code, { filename: 'background.js' });
  script.runInContext(context);
  return context;
}

