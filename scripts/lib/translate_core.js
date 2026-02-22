// Shared translation utilities for sync and batch flows

export function splitFrontmatter(md) {
  const m = String(md).match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { front: null, body: String(md) };
  return { front: m[1], body: m[2] };
}

export function parseFront(front) {
  const out = {};
  if (!front) return out;
  for (const line of String(front).split(/\r?\n/)) {
    const mm = line.match(/^([a-zA-Z_][a-zA-Z0-9_\-]*):\s*(.*)$/);
    if (mm) out[mm[1]] = mm[2];
  }
  return out;
}

const CODE_TOKEN = (i) => `__CODE_TOKEN_${i}__`;
export function protectCode(md) {
  // Match fenced BEFORE inline so triple backticks don’t get split
  const codeRe = /```[\s\S]*?```|`[^`]*`/g;
  const tokens = [];
  const protectedMd = String(md).replace(codeRe, (m) => {
    const idx = tokens.push(m) - 1;
    return CODE_TOKEN(idx);
  });
  return { protectedMd, tokens };
}

export function restoreCode(md, tokens) {
  return String(md).replace(/__CODE_TOKEN_(\d+)__/g, (_, i) => tokens[Number(i)]);
}

export function scanCodeTokenIndices(s) {
  const re = /__CODE_TOKEN_(\d+)__/g;
  const seen = new Set();
  let m;
  while ((m = re.exec(String(s)))) {
    const idx = Number(m[1]);
    if (!Number.isNaN(idx)) seen.add(idx);
  }
  return seen;
}

export function assertTokensIntegrity(modelOut, tokens, { strict = true, log = () => {} } = {}) {
  const seen = scanCodeTokenIndices(modelOut);
  const outOfRange = [...seen].filter((i) => i < 0 || i >= tokens.length);
  const expected = Array.from({ length: tokens.length }, (_, i) => i);
  const missing = expected.filter((i) => !seen.has(i));
  if (outOfRange.length > 0 || missing.length > 0) {
    const detail = `expected=[${expected.join(',')}] seen=[${[...seen].sort((a, b) => a - b).join(',')}] missing=[${missing.join(',')}] extra=[${outOfRange.join(',')}]`;
    log(`[TOKENS] integrity failed ${detail}`);
    if (strict) throw new Error(`code-token integrity failed; ${detail}`);
  }
}

export function stripCodeWrapper(s) {
  if (!s) return s;
  const lines = String(s).split(/\r?\n/);
  const isFenceOpen = (t) => /^```(?:\s*[a-zA-Z0-9_-]+)?\s*$/.test(t);
  const isFenceClose = (t) => /^```\s*(?:[a-zA-Z0-9_-]+)?\s*$/.test(t);
  const stripRange = (L, start, end) => {
    const body = L.slice(start + 1, end);
    if (body[0] && /^\s*$/.test(body[0])) body.shift();
    if (body.length && /^\s*$/.test(body[body.length - 1])) body.pop();
    return body.join('\n');
  };
  let i = 0;
  while (i < lines.length && /^\s*$/.test(lines[i])) i++;
  let j = lines.length - 1;
  while (j >= 0 && /^\s*$/.test(lines[j])) j--;
  if (i <= j && isFenceOpen(lines[i]) && isFenceClose(lines[j])) return stripRange(lines, i, j);
  if (i <= j && /^---\s*$/.test(lines[i])) {
    let fmEnd = i + 1;
    while (fmEnd <= j && !/^---\s*$/.test(lines[fmEnd])) fmEnd++;
    if (fmEnd <= j) {
      let k = fmEnd + 1;
      while (k <= j && /^\s*$/.test(lines[k])) k++;
      if (k <= j && isFenceOpen(lines[k]) && isFenceClose(lines[j])) {
        const unwrapped = stripRange(lines, k, j);
        const fm = lines.slice(i, fmEnd + 1).join('\n');
        return fm + '\n\n' + unwrapped;
      }
    }
  }
  return s;
}

export function dedupeTopFrontMatter(text) {
  const lines = String(text).split(/\r?\n/);
  let i = 0;
  while (i < lines.length && /^\s*$/.test(lines[i])) i++;
  if (i >= lines.length || lines[i].trim() !== '---') return null;
  let fm1End = i + 1;
  while (fm1End < lines.length && lines[fm1End].trim() !== '---') fm1End++;
  if (fm1End >= lines.length) return null;
  let k = fm1End + 1;
  while (k < lines.length && /^\s*$/.test(lines[k])) k++;
  if (k >= lines.length || lines[k].trim() !== '---') return null;
  let fm2End = k + 1;
  let hasKey = false,
    onlyKeyLines = true;
  const keyRe = /^\s*([a-zA-Z_][a-zA-Z0-9_\-]*)\s*:\s*(.*)$/;
  while (fm2End < lines.length && lines[fm2End].trim() !== '---') {
    const ln = lines[fm2End];
    if (ln.trim() !== '') {
      const m = ln.match(keyRe);
      if (!m) {
        onlyKeyLines = false;
        break;
      }
      if (/^(id|title|sidebar_label)$/i.test(m[1])) hasKey = true;
    }
    fm2End++;
    if (fm2End - k > 30) break;
  }
  if (fm2End >= lines.length) return null;
  if (!onlyKeyLines || !hasKey) return null;
  const kept = lines.slice(k).join('\n');
  return kept.endsWith('\n') ? kept : kept + '\n';
}

export function rebuildFrontFromOriginal(originalFront, returnedFront) {
  const pick = (fm, key) => {
    if (!fm) return null;
    const m = fm.match(new RegExp(`^\\s*${key}\\s*:\\s*(.*)$`, 'mi'));
    return m ? m[1].trim() : null;
  };
  const titleVal = pick(returnedFront, 'title');
  const sideVal = pick(returnedFront, 'sidebar_label');
  const lines = String(originalFront || '').split(/\r?\n/);
  const out = lines.map((line) => {
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_\-]*)\s*:\s*(.*)$/);
    if (!m) return line;
    const key = m[1];
    if (key === 'title' && titleVal)
      return `title: ${JSON.stringify(titleVal.replace(/^['\"]|['\"]$/g, ''))}`;
    if (key === 'sidebar_label' && sideVal)
      return `sidebar_label: ${JSON.stringify(sideVal.replace(/^['\"]|['\"]$/g, ''))}`;
    return line;
  });
  return out.join('\n');
}

export function hasFrontMatter(s) {
  return /^---\n[\s\S]*?\n---\n/.test(String(s) + (String(s).endsWith('\n') ? '' : '\n'));
}

export function systemPromptLines() {
  return [
    'You are a professional localization engine.',
    'Translate a Docusaurus Markdown document while strictly preserving structure.',
    'NEVER translate or alter fenced/inline code — placeholders like __CODE_TOKEN_N__ must remain exactly as-is.',
    'If the input begins with a YAML front matter block delimited by --- lines, you MUST return a YAML front matter block as the very first lines in the output.',
    'In that front matter: keep every key/value exactly the same EXCEPT translate only the values of title: and sidebar_label: into the target language, and keep them quoted ("...").',
    'Do not change id:, do not add/remove keys, do not reorder keys, and keep the opening/closing --- lines intact. Ensure exactly one blank line after the closing ---.',
    'Do not add any extra code fences (no ```markdown wrappers).',
    'Preserve anchors like {#label} literally.',
    'Return ONLY the full Markdown document: front matter (if present), a blank line, then the translated body.',
  ];
}

export function userPromptForDoc(front, protectedBody, locale, targetLang) {
  return [
    `Locale: ${locale} (${targetLang})`,
    '',
    'Front matter (YAML) — copy verbatim except translate only title/sidebar_label values:',
    '---',
    front || '',
    '---',
    '',
    'Body to translate (code tokens must be kept exactly):',
    '',
    protectedBody,
  ].join('\n');
}

export function finalizeTranslatedDoc({
  originalFront,
  modelContent,
  tokens,
  strict = true,
  log = () => {},
}) {
  assertTokensIntegrity(modelContent, tokens, { strict, log });
  const restoredAll = stripCodeWrapper(restoreCode(modelContent, tokens));
  const { front: returnedFront, body } = splitFrontmatter(restoredAll);
  const finalFront = rebuildFrontFromOriginal(originalFront || '', returnedFront || '').replace(
    /\r?\n$/,
    ''
  );
  let finalText = `---\n${finalFront}\n---\n\n${(body || restoredAll).trim()}\n`;
  const dd = dedupeTopFrontMatter(finalText);
  if (dd != null) finalText = dd;
  // Normalize accidental double-braced anchors (e.g., "{{#id}}" → "{#id}")
  finalText = normalizeAnchors(finalText);
  if (/__CODE_TOKEN_/.test(finalText)) {
    const leftover = Array.from(scanCodeTokenIndices(finalText)).sort((a, b) => a - b);
    const msg = `[TOKENS] leftover after finalize indices=[${leftover.join(',')}]`;
    log(msg);
    if (strict) throw new Error(msg);
  }
  return finalText.endsWith('\n') ? finalText : finalText + '\n';
}

/**
 * Normalize accidental MDX-like double-brace anchors produced by LLMs.
 * Example: "{{#section-id}}" → "{#section-id}". Safe: only matches anchors with '#'.
 * Does not touch code blocks (they are protected earlier) and ignores non-anchors like {{var}}.
 * @param {string} s
 * @returns {string}
 */
export function normalizeAnchors(s) {
  return String(s).replace(/\{\{\s*#\s*([A-Za-z0-9_-]+)\s*\}\}/g, '{#$1}');
}
