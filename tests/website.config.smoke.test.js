/*
 * Test Module: website.config.smoke.test.js
 * Scope: Website — config sanity.
 * Intent: Ensure docusaurus.config.js exports expected fields.
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

/** Import a CommonJS config file in ESM tests by eval. */
async function importCjs(filepath) {
  const url = pathToFileURL(filepath).href;
  const mod = await import(url);
  return mod.default || mod;
}

describe('Website config — basic shape', () => {
  // Test: docusaurus.config.js parses and has expected fields
  it('docusaurus.config.js parses and has expected fields', async () => {
    const cfgPath = path.join(process.cwd(), 'website', 'docusaurus.config.js');
    const cfg = await importCjs(cfgPath);
    expect(cfg.url).toBe('https://bitranox.github.io');
    expect(cfg.baseUrl).toBe('/Thunderbird-Reply-with-Attachments/');
    expect(cfg.i18n?.locales).toEqual(expect.arrayContaining(['en', 'de']));
    // Footer should not reference non-existent /docs/intro
    const footerDocs = cfg.themeConfig?.footer?.links?.find((l) => l.title === 'Docs');
    const homeItem = footerDocs?.items?.find((i) => i.label === 'Home');
    expect(homeItem?.to).toBe('/docs/features');
    // Plugins should be an array (guarded local-search may resolve to [])
    expect(Array.isArray(cfg.plugins)).toBe(true);
  });

  // Test: sidebars.js lists docs that exist
  it('sidebars.js lists docs that exist', async () => {
    const sidebarsPath = path.join(process.cwd(), 'website', 'sidebars.js');
    const sidebars = await importCjs(sidebarsPath);
    const docs = sidebars.docs || sidebars.default?.docs || sidebars.default || [];
    const required = ['features', 'install', 'configuration', 'usage'];
    for (const id of required) {
      expect(docs).toContain(id);
      const md = path.join(process.cwd(), 'website', 'docs', `${id}.md`);
      expect(fs.existsSync(md)).toBe(true);
    }
  });
});
