// Domain: attachment filtering and helpers (pure functions)

function lower(s) {
  return String(s || '').toLowerCase();
}

function normalizedName(att) {
  return lower(att?.name || att?.fileName);
}

function isSmime(att) {
  const n = normalizedName(att);
  const t = lower(att?.contentType);
  return n === 'smime.p7s' ||
         t === 'application/pkcs7-signature' ||
         t === 'application/x-pkcs7-signature' ||
         t === 'application/pkcs7-mime';
}

function isInlineImage(att) {
  const hasCid = Boolean(att?.contentId);
  const isImage = lower(att?.contentType).startsWith('image/');
  return hasCid && isImage;
}

function isInlineDisposition(att) {
  const disp = lower(att?.contentDisposition);
  return disp.startsWith('inline');
}

function includeStrict(att) {
  if (isSmime(att)) return false;
  if (isInlineImage(att)) return false;
  if (isInlineDisposition(att)) return false;
  return true;
}

function includeRelaxed(att) {
  // Even on relaxed pass, never include inline content or S/MIME artifacts.
  return !isSmime(att) && !isInlineImage(att) && !isInlineDisposition(att);
}

// Optional namespacing for clarity (does not affect globals used by tests)
globalThis.App = globalThis.App || {};
App.Domain = { lower, normalizedName, isSmime, isInlineImage, isInlineDisposition, includeStrict, includeRelaxed };

// --- Glob matching utilities for blacklist ---------------------------------

function globToRegExp(glob) {
  // Always normalize pattern to lowercase first
  glob = lower(glob);
  // Escape regex, then replace glob tokens. Support **/, *, ?, and character classes [] minimally.
  let re = '';
  let i = 0;
  const special = /[.+^${}()|\\]/g;
  while (i < glob.length) {
    const ch = glob[i];
    if (ch === '*') {
      // ** -> match any path segments
      if (glob[i + 1] === '*') { re += '.*'; i += 2; continue; }
      re += '[^/]*'; i += 1; continue;
    }
    if (ch === '?') { re += '[^/]'; i += 1; continue; }
    if (ch === '[') {
      const j = glob.indexOf(']', i + 1);
      if (j !== -1) { re += glob.slice(i, j + 1); i = j + 1; continue; }
    }
    re += ch.replace(special, '\\$&');
    i += 1;
  }
  // Case-insensitive behavior is achieved by lowercasing both pattern and name.
  return new RegExp('^' + re + '$');
}

function makeNameExcluder(patterns) {
  const regs = (patterns || [])
    .map((p) => String(p || '').trim().toLowerCase())
    .filter(Boolean)
    .map((s) => globToRegExp(s));
  return function shouldExclude(name) {
    // Normalize the compared name to lowercase as well
    const n = lower(name);
    if (!n) return false;
    return regs.some((rx) => rx.test(n));
  };
}

App.Domain.makeNameExcluder = makeNameExcluder;
