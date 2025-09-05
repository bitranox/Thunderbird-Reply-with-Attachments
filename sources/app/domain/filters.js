/*
 * Module: app/domain/filters.js
 * Purpose: Pure domain helpers for attachment handling.
 * Contains small predicates and utilities used by the application layer
 * to decide whether an attachment should be included.
 * Notes: These functions are pure and framework‑free.
 */

/** Return a case‑folded (lowercased) copy of a value. */
function lower(s) {
  return String(s || '').toLowerCase();
}

/** Resolve a canonical, case‑insensitive filename for an attachment. */
function normalizedName(att) {
  let s = String(att?.name || att?.fileName || '');
  try { if (s.normalize) s = s.normalize('NFC'); } catch (_) {}
  // Trim outer whitespace and Windows-unfriendly trailing dots/spaces
  s = s.trim().replace(/[\.\s]+$/g, '');
  return lower(s);
}

/** Detect S/MIME signature and envelope types; these must never be copied. */
function isSmime(att) {
  const n = normalizedName(att);
  const t = lower(att?.contentType);
  return n === 'smime.p7s' ||
         t === 'application/pkcs7-signature' ||
         t === 'application/x-pkcs7-signature' ||
         t === 'application/pkcs7-mime';
}

/** Inline images referenced by CID should not be copied as file attachments. */
function isInlineImage(att) {
  const hasCid = Boolean(att?.contentId);
  const isImage = lower(att?.contentType).startsWith('image/');
  return hasCid && isImage;
}

/** Content-Disposition header explicitly set to inline should be skipped. */
function isInlineDisposition(att) {
  const disp = lower(att?.contentDisposition);
  return disp.startsWith('inline');
}

/** Strict pass: exclude S/MIME, any inline image, and inline disposition. */
function includeStrict(att) {
  if (isSmime(att)) return false;
  if (isInlineImage(att)) return false;
  if (isInlineDisposition(att)) return false;
  return true;
}

/** Relaxed pass: still exclude S/MIME and inline content, but be lenient otherwise. */
function includeRelaxed(att) {
  // Even on relaxed pass, never include inline content or S/MIME artifacts.
  return !isSmime(att) && !isInlineImage(att) && !isInlineDisposition(att);
}

// Optional namespacing for clarity (does not affect globals used by tests)
globalThis.App = globalThis.App || {};
App.Domain = { lower, normalizedName, isSmime, isInlineImage, isInlineDisposition, includeStrict, includeRelaxed };

// --- Glob matching utilities for blacklist ---------------------------------

/** Convert a simple glob to a RegExp (case‑insensitive via lowercasing). */
function globToRegExp(glob) {
  // Always normalize pattern to lowercase first
  glob = lower(glob);
  // Escape regex, then replace glob tokens. Support **/, *, ?, and character classes [] minimally.
  let re = '';
  let i = 0;
  const special = /[.+^${}()|\\]/g;
  while (i < glob.length) {
    const ch = glob[i];
    // Support escaping the next character using a backslash to force literal
    if (ch === '\\' && i + 1 < glob.length) {
      const next = glob[i + 1];
      if (next === '[' || next === ']') {
        re += '\\' + next; // escape bracket literally in regex
      } else {
        re += String(next).replace(special, '\\$&');
      }
      i += 2; continue;
    }
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

/** Build a predicate that checks if a filename should be excluded by patterns. */
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

// Intentionally no ESM exports here to keep compatibility with VM/script loading in tests.
