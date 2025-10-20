/*
 * Module: app/application/usecases.js
 * Purpose: Application layer orchestration. Small, intention‑revealing
 *          functions that coordinate domain rules and adapter ports.
 * Highlights:
 * - Pure decision making; no UI/HTTP details leak in.
 * - Two‑pass selection of attachments (strict → relaxed) for clarity.
 * - Idempotency handled by the caller (composition) via sessions.
 * Domain:
 * - Helper predicates (includeStrict/Relaxed, normalizedName) come from App.Domain.
 */

// Application layer: small, intention-revealing functions
// Domain helpers are exposed on global App.Domain (loaded from domain/filters.js)

const ATTACHMENT_RETRY_DEFAULT = Object.freeze({ attempts: 5, delayMs: 150 });

/**
 * @typedef {{ stage: 'processing'|'done', messageId: string|null }} TabProcessingState
 */

function debugLog(logger, payload, message) {
  try {
    logger?.debug?.(payload, message);
  } catch (_) {}
  try {
    globalThis.log?.debug?.(payload, message);
  } catch (_) {}
}

/**
 * Decide which attachments to add, in two passes (strict → relaxed).
 * @param {{ compose: import('./ports.js').ComposePort, messages: import('./ports.js').MessagesPort, shouldExclude?: (name: string) => boolean, confirm?: import('./ports.js').ConfirmFn, warn?: (tabId: number, rows: any[]) => Promise<void>, warnOnBlacklist?: boolean, matchBlacklist?: Function|null, logger?: { debug?: Function, info?: Function, warn?: Function, error?: Function }, attachmentsRetry?: { attempts?: number, delayMs?: number } }} deps
 * @returns {(tabId: number, messageId: number) => Promise<number>} processReplyAttachments
 */
function createProcessReplyAttachments({
  compose,
  messages,
  shouldExclude = () => false,
  confirm = async () => true,
  warn = async () => {},
  warnOnBlacklist = false,
  matchBlacklist = null,
  logger = console,
  attachmentsRetry = ATTACHMENT_RETRY_DEFAULT,
}) {
  return async function processReplyAttachments(tabId, messageId) {
    try {
      const all = await loadAllAttachments(messages, messageId, attachmentsRetry, logger);
      if (isEmpty(all)) {
        debugLog(
          logger,
          { tabId, messageId },
          'processReplyAttachments: no attachments discovered'
        );
        return 0;
      }

      const existingNames = await getExistingAttachmentNames(compose, tabId);

      // Warn about blacklist-excluded attachments (not inline/SMIME), if enabled — even
      // if ultimately no attachments will be added (e.g., everything was blacklisted).
      if (warnOnBlacklist) {
        try {
          const rows = computeBlacklistedRows(all, existingNames, shouldExclude, matchBlacklist);
          if (rows.length) await warn(tabId, rows);
        } catch (_) {}
      }

      const selected = pickFirstNonEmpty([
        selectStrict(all, existingNames, shouldExclude),
        selectRelaxed(all, existingNames, shouldExclude),
      ]);
      if (isEmpty(selected)) {
        debugLog(
          logger,
          { tabId, messageId },
          'processReplyAttachments: nothing eligible after filtering'
        );
        return 0;
      }

      const approved = await askUserToConfirm(confirm, tabId, selected);
      if (!approved) return 0;

      return await attachSelectedFiles(compose, messages, tabId, messageId, selected);
    } catch (err) {
      try {
        logger.warn?.({ err }, 'processReplyAttachments failed');
      } catch (_) {}
      return 0;
    }
  };
}

// — process helpers —
/**
 * Load all attachments for the source message, retrying when Thunderbird has not
 * yet hydrated the parts for IMAP-backed messages.
 */
async function loadAllAttachments(messages, messageId, retryConfig, logger = console) {
  const { attempts, delayMs } = normalizeRetryConfig(retryConfig);
  let last = [];
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    last = await safe(() => messages.listAttachments(messageId), []);
    if (Array.isArray(last) && last.length > 0) {
      if (attempt > 0)
        debugLog(
          logger,
          { attempt: attempt + 1, count: last.length, messageId },
          'loadAllAttachments: succeeded after retry'
        );
      return last;
    }
    if (attempt < attempts - 1) {
      debugLog(
        logger,
        { attempt: attempt + 1, messageId },
        'loadAllAttachments: empty result, retrying'
      );
      await delay(delayMs);
    }
  }
  if (!Array.isArray(last)) return [];
  if (last.length === 0)
    debugLog(logger, { messageId, attempts }, 'loadAllAttachments: empty after retries');
  return last;
}
/** Load existing compose attachments and build a case-insensitive name set. */
async function getExistingAttachmentNames(compose, tabId) {
  const a = await safe(() => compose.listAttachments(tabId), []);
  return makeNameSet(a);
}
/** Select strictly eligible attachments (never inline/SMIME). */
function selectStrict(all, existingNames, shouldExclude) {
  return selectEligible(all, existingNames, shouldExclude, domainIncludeStrict());
}
/** Select relaxed eligible attachments as a fallback. */
function selectRelaxed(all, existingNames, shouldExclude) {
  return selectEligible(all, existingNames, shouldExclude, domainIncludeRelaxed());
}
/** Return the first non-empty array; otherwise an empty array. */
function pickFirstNonEmpty(candidates) {
  return candidates.find((x) => x && x.length) || [];
}
/** Ask the user to confirm selected files. */
async function askUserToConfirm(confirm, tabId, selected) {
  return await confirm(tabId, selected.map(asSelection));
}
/** Attach selected files to the compose; returns the count added. */
async function attachSelectedFiles(
  compose,
  messages,
  tabId,
  messageId,
  selected,
  logger = console
) {
  let added = 0;
  for (const att of selected) {
    try {
      const file = await messages.getAttachmentFile(messageId, att.partName);
      if (!file) continue;
      await compose.addAttachment(tabId, { file });
      added += 1;
    } catch (err) {
      // Skip this part and continue with the rest
      try {
        logger.warn?.(
          { err, part: att?.partName },
          'attachSelectedFiles: getAttachmentFile/addAttachment failed; skipping'
        );
      } catch (_) {}
      continue;
    }
  }
  return added;
}
function isEmpty(arr) {
  return !arr || arr.length === 0;
}

/**
 * Ensure original attachments for reply compose; idempotent per tab via memory + sessions.
 * @param {{ compose: import('./ports.js').ComposePort, messages: import('./ports.js').MessagesPort, sessions: import('./ports.js').SessionsPort, state: Map<number,TabProcessingState>, sessionKey: string, shouldExclude?: (name: string) => boolean, confirm?: import('./ports.js').ConfirmFn, attachmentsRetry?: { attempts?: number, delayMs?: number } }} deps
 * @returns {(tabId: number, details: any) => Promise<void>} ensureReplyAttachments
 */
function createEnsureReplyAttachments({
  compose,
  messages,
  sessions,
  state,
  sessionKey,
  shouldExclude = () => false,
  confirm = async () => true,
  warn = async () => {},
  warnOnBlacklist = false,
  matchBlacklist = null,
  logger = console,
  attachmentsRetry = ATTACHMENT_RETRY_DEFAULT,
}) {
  const processReplyAttachments = createProcessReplyAttachments({
    compose,
    messages,
    shouldExclude,
    confirm,
    warn,
    warnOnBlacklist,
    matchBlacklist,
    logger,
    attachmentsRetry,
  });
  return async function ensureReplyAttachments(tabId, details) {
    if (!isReply(details)) return; // only for replies
    const hint = extractMessageId(details);
    resetStateForNewMessage(state, tabId, hint);
    const currentEntry = getStateEntry(state, tabId);
    if (!hint && currentEntry?.stage === 'done') return;
    if (isProcessing(state, tabId)) return;
    if (isDoneForMessage(state, tabId, hint)) return;

    const { processed: alreadyProcessed } = await wasAlreadyProcessed(
      sessions,
      tabId,
      sessionKey,
      hint
    );
    if (alreadyProcessed) {
      markDone(state, tabId, hint);
      return;
    }

    markProcessing(state, tabId, hint);

    const messageId = await waitForMessageId(compose, tabId, details);
    if (!messageId) {
      clearState(state, tabId);
      await safe(() => sessions.removeTabValue(tabId, sessionKey));
      return;
    }

    updateStateMessage(state, tabId, messageId);

    const added = await processReplyAttachments(tabId, messageId);
    if (added > 0) {
      await markProcessed(sessions, tabId, sessionKey, state, messageId);
      return;
    }

    clearState(state, tabId);
    await safe(() => sessions.removeTabValue(tabId, sessionKey));
  };
}

// — ensure helpers —
/**
 * Read the per-tab session marker indicating processing has already happened.
 * @param {import('./ports.js').SessionsPort} sessions
 * @param {number} tabId
 * @param {string} key
 * @param {string|null} hint
 * @returns {Promise<{ processed: boolean, messageId: string|null }>}
 */
async function wasAlreadyProcessed(sessions, tabId, key, hint) {
  const stored = await safe(() => sessions.getTabValue(tabId, key), null);
  if (!stored) return { processed: false, messageId: null };

  if (stored === true) {
    await safe(() => sessions.removeTabValue(tabId, key));
    return { processed: false, messageId: null };
  }

  const messageId =
    typeof stored === 'object' && stored
      ? normalizeMessageId(stored.messageId)
      : normalizeMessageId(stored);

  if (!messageId) return { processed: false, messageId: null };
  if (hint && messageId !== hint) {
    await safe(() => sessions.removeTabValue(tabId, key));
    return { processed: false, messageId };
  }

  return { processed: !hint ? false : true, messageId };
}
/**
 * Mark a tab as processed in memory and in session storage.
 * @param {import('./ports.js').SessionsPort} sessions
 * @param {number} tabId
 * @param {string} key
 * @param {Map<number, TabProcessingState>} state
 * @param {string|null} messageId
 */
async function markProcessed(sessions, tabId, key, state, messageId) {
  markDone(state, tabId, messageId);
  await safe(() => sessions.setTabValue(tabId, key, { messageId: normalizeMessageId(messageId) }));
}

// — helpers —

/** Return true when compose details represent a reply flavor. */
function isReply(details) {
  // Thunderbird composes label reply flavors like 'reply', 'replyAll', etc.
  return String(details?.type || '')
    .toLowerCase()
    .startsWith('reply');
}

/** In-memory guard to avoid duplicate runs for a tab in one background session. */
function getStateEntry(state, tabId) {
  return /** @type {TabProcessingState|null} */ (state.get(tabId) || null);
}

function isProcessing(state, tabId) {
  return getStateEntry(state, tabId)?.stage === 'processing';
}

function isDoneForMessage(state, tabId, messageId) {
  if (!messageId) return false;
  const entry = getStateEntry(state, tabId);
  return entry?.stage === 'done' && entry.messageId === messageId;
}

function markProcessing(state, tabId, messageId) {
  state.set(tabId, {
    stage: 'processing',
    messageId: normalizeMessageId(messageId),
  });
}

function markDone(state, tabId, messageId) {
  state.set(tabId, {
    stage: 'done',
    messageId: normalizeMessageId(messageId),
  });
}

function updateStateMessage(state, tabId, messageId) {
  const entry = getStateEntry(state, tabId);
  const stage = entry?.stage || 'processing';
  state.set(tabId, { stage, messageId: normalizeMessageId(messageId) });
}

function resetStateForNewMessage(state, tabId, messageId) {
  const normalized = normalizeMessageId(messageId);
  if (normalized == null) return;
  const entry = getStateEntry(state, tabId);
  if (entry && entry.messageId != null && entry.messageId !== normalized) {
    state.delete(tabId);
  }
}

function clearState(state, tabId) {
  state.delete(tabId);
}

async function waitForMessageId(compose, tabId, initial, { attempts = 10, delayMs = 200 } = {}) {
  // Poll the compose details until Thunderbird provides a reference/related id.
  let details = initial;
  for (let i = 0; i < attempts; i++) {
    const id = extractMessageId(details);
    if (id) return id;
    await delay(delayMs);
    details = await safe(() => compose.getDetails(tabId), null);
  }
  return null;
}

/** Core selection loop: unique by part, not excluded, not already present. */
function selectEligible(all, existingNames, shouldExclude, includeFn) {
  // Select unique, non‑excluded, and not‑already‑present attachments.
  const takenParts = new Set();
  const selected = [];
  const nn = domainNormalizedName();
  for (const att of all) {
    const name = nn(att);
    if (shouldExclude(name)) continue;
    if (!includeFn(att)) continue;
    if (takenParts.has(att.partName)) continue;
    if (name && existingNames.has(name)) continue;
    selected.push(att);
    takenParts.add(att.partName);
    if (name) existingNames.add(name);
  }
  return selected;
}

/** Build blacklist warning rows: [{name, pattern}] */
function computeBlacklistedRows(all, existingNames, shouldExclude, matchBlacklist) {
  // Aggregate all matching patterns per normalized file name, emit a single row per file
  const nn = domainNormalizedName();
  const includeR = domainIncludeRelaxed();
  /** @type {Map<string,{display:string, patterns:Set<string>}>} */
  const acc = new Map();
  for (const att of all) {
    if (!includeR(att)) continue; // skip inline/SMIME
    const nameNorm = nn(att);
    if (!nameNorm) continue;
    if (existingNames.has(nameNorm)) continue;
    if (!shouldExclude(nameNorm)) continue;
    const displayName = att.name || att.fileName || nameNorm;
    const entry = acc.get(nameNorm) || { display: displayName, patterns: new Set() };
    const patterns = typeof matchBlacklist === 'function' ? matchBlacklist(nameNorm) : [];
    for (const p of patterns) entry.patterns.add(String(p));
    acc.set(nameNorm, entry);
  }
  const rows = [];
  for (const { display, patterns } of acc.values()) {
    const list = Array.from(patterns.values());
    rows.push({ name: display, pattern: list.join(', ') });
  }
  return rows;
}

/** Build a case-insensitive set of names from compose attachments. */
function makeNameSet(attachments) {
  // Build a case‑insensitive set of attachment names for quick membership tests.
  const nn = domainNormalizedName();
  const names = (attachments || []).map((a) => nn(a)).filter(Boolean);
  return new Set(names);
}

// — domain fallbacks —
/** Domain fallback for normalizedName if App.Domain is not loaded. */
function domainNormalizedName() {
  const fn = globalThis.App?.Domain?.normalizedName;
  if (typeof fn === 'function') return fn;
  return (att) => String(att?.name || att?.fileName || '').toLowerCase();
}
/** Domain fallback for includeStrict if App.Domain is not loaded. */
function domainIncludeStrict() {
  const fn = globalThis.App?.Domain?.includeStrict;
  if (typeof fn === 'function') return fn;
  return (att) => {
    const name = domainNormalizedName()(att);
    const ct = String(att?.contentType || '').toLowerCase();
    const cd = String(att?.contentDisposition || '').toLowerCase();
    const cid = !!att?.contentId;
    if (name === 'smime.p7s') return false;
    if (
      ct === 'application/pkcs7-signature' ||
      ct === 'application/x-pkcs7-signature' ||
      ct === 'application/pkcs7-mime'
    )
      return false;
    if (cid && ct.startsWith('image/')) return false;
    if (cd.startsWith('inline')) return false;
    return true;
  };
}
/** Domain fallback for includeRelaxed if App.Domain is not loaded. */
function domainIncludeRelaxed() {
  const fn = globalThis.App?.Domain?.includeRelaxed;
  if (typeof fn === 'function') return fn;
  return domainIncludeStrict();
}

function asSelection(a) {
  return { name: a.name || a.fileName, partName: a.partName };
}

/** Delay for a number of milliseconds. */
function delay(ms) {
  return new Promise((r) =>
    globalThis.setTimeout ? globalThis.setTimeout(r, ms) : setTimeout(r, ms)
  );
}

function normalizeRetryConfig(config) {
  const base = typeof config === 'object' && config ? config : ATTACHMENT_RETRY_DEFAULT;
  const attempts = Number.isFinite(base.attempts)
    ? Math.max(1, Math.floor(base.attempts))
    : ATTACHMENT_RETRY_DEFAULT.attempts;
  const delayMs = Number.isFinite(base.delayMs)
    ? Math.max(0, Math.floor(base.delayMs))
    : ATTACHMENT_RETRY_DEFAULT.delayMs;
  if (
    attempts === ATTACHMENT_RETRY_DEFAULT.attempts &&
    delayMs === ATTACHMENT_RETRY_DEFAULT.delayMs
  )
    return ATTACHMENT_RETRY_DEFAULT;
  return { attempts, delayMs };
}

/**
 * Run an async function and return a fallback on error.
 * @template T
 * @param {() => Promise<T>} fn
 * @param {T} [fallback]
 * @returns {Promise<T>}
 */
async function safe(fn, fallback) {
  try {
    return await fn();
  } catch (_) {
    return fallback;
  }
}

function extractMessageId(details) {
  const candidates = [
    details?.referenceMessageId,
    details?.relatedMessageId,
    details?.originalMessageId,
    details?.messageId,
  ];
  for (const value of candidates) {
    const normalized = normalizeMessageId(value);
    if (normalized) return normalized;
  }
  return null;
}

function normalizeMessageId(value) {
  if (value == null) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const trimmed = String(value).trim();
  if (!trimmed.length) return null;
  if (/^-?\d+$/.test(trimmed)) {
    const n = Number.parseInt(trimmed, 10);
    if (Number.isFinite(n)) return n;
  }
  return trimmed;
}

globalThis.App = globalThis.App || {};
App.UseCases = { createProcessReplyAttachments, createEnsureReplyAttachments };
