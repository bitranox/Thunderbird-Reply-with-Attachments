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
  try {
    if (s.normalize) s = s.normalize('NFC');
  } catch (_) {
    // an exotic name that cannot be normalized is compared as-is
  }
  // Trim outer whitespace and Windows-unfriendly trailing dots/spaces
  s = s.trim().replace(/[\.\s]+$/g, '');
  return lower(s);
}

/** Detect S/MIME signature and envelope types; these must never be copied. */
function isSmime(att) {
  const n = normalizedName(att);
  const t = lower(att?.contentType);
  return (
    n === 'smime.p7s' ||
    t === 'application/pkcs7-signature' ||
    t === 'application/x-pkcs7-signature' ||
    t === 'application/pkcs7-mime'
  );
}

/** True when the part carries an image content type. */
function isImage(att) {
  return lower(att?.contentType).startsWith('image/');
}

/** Strip angle brackets from a Content-ID value. */
function stripAngleBrackets(s) {
  return String(s || '')
    .replace(/^</, '')
    .replace(/>$/, '');
}

/**
 * Collect the Content-IDs an HTML body embeds.
 *
 * Scans for `cid:` targets anywhere in the markup rather than only inside
 * src/background attributes, because embedded images also reach the body
 * through CSS `url(cid:...)` and through srcset. A bare "cid:" in prose cannot
 * produce a false hit on its own: the value has to equal an attachment's
 * Content-ID before anything downstream acts on it.
 *
 * The source is the ORIGINAL message, never the compose body. Thunderbird
 * rewrites inline sources in the composer after loading it (bug 1997519), so a
 * compose-body scan reads a different answer depending on when it runs.
 * @param {string} html message body markup
 * @returns {Set<string>} referenced Content-IDs, without angle brackets
 */
function collectInlineCids(html) {
  const found = new Set();
  const text = String(html || '');
  if (!text) return found;
  const rx = /cid:([^"'\s)>\\]+)/gi;
  let m;
  while ((m = rx.exec(text)) !== null) {
    const cid = stripAngleBrackets(m[1]);
    if (cid) found.add(cid);
  }
  return found;
}

/** True when the message body embeds this part by Content-ID. */
function isReferencedInline(att, inlineCids) {
  if (!inlineCids || typeof inlineCids.has !== 'function') return false;
  const cid = stripAngleBrackets(att?.contentId);
  return Boolean(cid && inlineCids.has(cid));
}

/**
 * Inline images belong in the body, not in the attachment list.
 *
 * An image counts as inline only when the original message body embeds it, or
 * when the sender explicitly marked it Content-Disposition: inline. A bare
 * Content-ID is deliberately NOT enough: many mail clients stamp a Content-ID on
 * every image part, genuine attachments included, so treating it as proof of
 * inlineness dropped real attachments without any trace (no dialog, no file).
 */
function isInlineImage(att, inlineCids) {
  if (!isImage(att)) return false;
  if (isReferencedInline(att, inlineCids)) return true;
  return isInlineDisposition(att);
}

/** Content-Disposition header explicitly set to inline should be skipped. */
function isInlineDisposition(att) {
  const disp = lower(att?.contentDisposition);
  return disp.startsWith('inline');
}

/**
 * Selection predicate: exclude S/MIME, inline images, and inline disposition.
 * `inlineCids` comes from collectInlineCids() over the original message body;
 * omitting it means "nothing known to be embedded", which keeps images as
 * regular attachments.
 */
function includeStrict(att, inlineCids) {
  if (isSmime(att)) return false;
  if (isInlineImage(att, inlineCids)) return false;
  if (isInlineDisposition(att)) return false;
  return true;
}

/**
 * Same rule as includeStrict, applied when deciding which parts a user would
 * recognise as attachments (used for the blacklist warning rows).
 */
function includeRelaxed(att, inlineCids) {
  if (isSmime(att)) return false;
  if (isInlineImage(att, inlineCids)) return false;
  if (isInlineDisposition(att)) return false;
  return true;
}

// Optional namespacing for clarity (does not affect globals used by tests)
globalThis.App = globalThis.App || {};
App.Domain = {
  lower,
  normalizedName,
  isSmime,
  isImage,
  stripAngleBrackets,
  collectInlineCids,
  isReferencedInline,
  isInlineImage,
  isInlineDisposition,
  includeStrict,
  includeRelaxed,
  globToRegExp,
  // assigned after its definition below; declared here so the published shape is
  // the whole domain surface in one place
  makeNameExcluder: undefined,
};

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
      i += 2;
      continue;
    }
    if (ch === '*') {
      // ** -> match any path segments
      if (glob[i + 1] === '*') {
        re += '.*';
        i += 2;
        continue;
      }
      re += '[^/]*';
      i += 1;
      continue;
    }
    if (ch === '?') {
      re += '[^/]';
      i += 1;
      continue;
    }
    if (ch === '[') {
      const j = glob.indexOf(']', i + 1);
      if (j !== -1) {
        re += glob.slice(i, j + 1);
        i = j + 1;
        continue;
      }
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
    .map((p) =>
      String(p || '')
        .trim()
        .toLowerCase()
    )
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
