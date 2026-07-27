/*
 * Module: app/application/usecases.js
 * Purpose: Application layer orchestration. Small, intention‑revealing
 *          functions that coordinate domain rules and adapter ports.
 * Highlights:
 * - Pure decision making; no UI/HTTP details leak in.
 * - One selection pass over the source attachments, driven by App.Domain predicates.
 * - Idempotency handled by the caller (composition) via sessions.
 * Domain:
 * - Helper predicates (includeStrict/Relaxed, normalizedName) come from App.Domain.
 */

// Application layer: small, intention-revealing functions.
//
// The domain predicates are used directly off App.Domain. That global is
// guaranteed to exist: sources/background.html loads app/domain/filters.js
// before this file, and every test that exercises these use cases imports
// filters.js first. Do NOT reintroduce local fallback copies of the domain
// rules - a second copy of a rule is a second place to forget when it changes,
// and it silently applied a stale inline-image rule until it was removed.

const ATTACHMENT_RETRY_DEFAULT = Object.freeze({ attempts: 5, delayMs: 150 });

/**
 * Ceilings on what one reply will copy.
 *
 * Each file is fetched whole before it is attached, so an unbounded reply to a
 * message carrying dozens of large files moves gigabytes through the extension
 * process while the compose window looks frozen. What is skipped is reported to
 * the user rather than dropped quietly.
 */
const COPY_LIMITS = Object.freeze({
  maxCount: 50,
  maxTotalBytes: 100 * 1024 * 1024,
});

/**
 * @typedef {{ debug?: Function, info?: Function, warn?: Function, error?: Function }} Logger
 */

/**
 * Thunderbird hands out message ids as numbers, but a session marker round-trips
 * through storage and can come back as a string, so both are accepted throughout.
 * @typedef {{ stage: 'processing'|'done', messageId: string|number|null }} TabProcessingState
 */

function debugLog(logger, payload, message) {
  try {
    logger?.debug?.(payload, message);
  } catch (_) {
    // a logger must never break the caller
  }
  try {
    globalThis.log?.debug?.(payload, message);
  } catch (_) {
    // a logger must never break the caller
  }
}

/**
 * Decide which attachments to add from the replied-to message.
 * @param {{ compose: import('./ports.js').ComposeAttachPort, messages: import('./ports.js').MessagesPort, shouldExclude?: (name: string) => boolean, confirm?: import('./ports.js').ConfirmFn, warn?: (tabId: number, rows: any[]) => Promise<void>, warnOnBlacklist?: boolean, matchBlacklist?: Function|null, logger?: Logger, attachmentsRetry?: { attempts?: number, delayMs?: number } }} deps
 * @returns {(tabId: number, messageId: string|number) => Promise<number>} processReplyAttachments
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
      // What the original message embeds decides what counts as inline; a
      // Content-ID on its own does not (see App.Domain.isInlineImage).
      const inlineCids = await loadInlineCids(messages, messageId);

      // Warn about blacklist-excluded attachments (not inline/SMIME), if enabled — even
      // if ultimately no attachments will be added (e.g., everything was blacklisted).
      if (warnOnBlacklist) {
        try {
          const rows = computeBlacklistedRows(
            all,
            existingNames,
            shouldExclude,
            matchBlacklist,
            inlineCids
          );
          if (rows.length) await warn(tabId, rows);
        } catch (err) {
          // The warning is advisory; copying attachments must proceed without it.
          logger.warn?.({ err, tabId }, 'blacklist warning could not be shown');
        }
      }

      const { selected, skipped } = selectEligible(
        all,
        existingNames,
        shouldExclude,
        App.Domain.includeStrict,
        inlineCids
      );
      if (skipped.length) {
        logger.warn?.(
          { tabId, messageId, skipped: skipped.length, limits: COPY_LIMITS },
          'copy limit reached; some attachments were not copied'
        );
        try {
          await warn(tabId, skipped);
        } catch (err) {
          // The notice is advisory; the files that fit must still be copied.
          logger.warn?.({ err, tabId }, 'copy-limit notice could not be shown');
        }
      }
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
        logger.warn?.({ err, tabId, messageId }, 'processReplyAttachments failed');
      } catch (_) {
        // a logger must never break the caller
      }
      return 0;
    }
  };
}

// — process helpers —
/**
 * Load all attachments for the source message, retrying when Thunderbird has not
 * yet hydrated the parts for IMAP-backed messages.
 */
/** @param {Logger} [logger] */
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
/** Collect the Content-IDs the original message embeds in its HTML body. */
async function loadInlineCids(messages, messageId) {
  const parts = await safe(() => messages.listInlineTextParts?.(messageId), []);
  const html = (parts || [])
    .filter((p) =>
      String(p?.contentType || '')
        .toLowerCase()
        .includes('html')
    )
    .map((p) => String(p?.content || ''))
    .join('\n');
  return App.Domain.collectInlineCids(html);
}
/** Ask the user to confirm selected files. */
async function askUserToConfirm(confirm, tabId, selected) {
  return await confirm(tabId, selected.map(asSelection));
}
/** Attach selected files to the compose; returns the count added. */
/** @param {Logger} [logger] */
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
      } catch (_) {
        // a logger must never break the caller
      }
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
 * @param {{ compose: import('./ports.js').ComposePort, messages: import('./ports.js').MessagesPort, sessions: import('./ports.js').SessionsPort, state: Map<number,TabProcessingState>, sessionKey: string, shouldExclude?: (name: string) => boolean, confirm?: import('./ports.js').ConfirmFn, warn?: (tabId: number, rows: any[]) => Promise<void>, warnOnBlacklist?: boolean, matchBlacklist?: Function|null, logger?: Logger, attachmentsRetry?: { attempts?: number, delayMs?: number } }} deps
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
  const inflightEnsures = new Map();

  return async function ensureReplyAttachments(tabId, details) {
    if (!isReply(details)) {
      debugLog(logger, { tabId, type: details?.type }, 'ensureReplyAttachments: skip non-reply');
      return;
    }

    if (inflightEnsures.has(tabId)) {
      debugLog(logger, { tabId }, 'ensureReplyAttachments: join in-flight run');
      return inflightEnsures.get(tabId);
    }

    const run = (async () => {
      const hint = extractMessageId(details);
      const entryBefore = getStateEntry(state, tabId) || null;
      debugLog(
        logger,
        {
          tabId,
          hint,
          stateStage: entryBefore?.stage,
          stateMessageId: entryBefore?.messageId,
        },
        'ensureReplyAttachments: begin'
      );

      resetStateForNewMessage(state, tabId, hint);
      const currentEntry = getStateEntry(state, tabId);
      if (!hint && currentEntry?.stage === 'done') {
        debugLog(logger, { tabId }, 'ensureReplyAttachments: done-without-hint');
        return;
      }
      if (isProcessing(state, tabId)) {
        debugLog(logger, { tabId }, 'ensureReplyAttachments: already processing');
        return;
      }
      if (isDoneForMessage(state, tabId, hint)) {
        debugLog(logger, { tabId, hint }, 'ensureReplyAttachments: already done for message');
        return;
      }

      const { processed: alreadyProcessed, messageId: storedMessageId } = await wasAlreadyProcessed(
        sessions,
        tabId,
        sessionKey,
        hint
      );
      debugLog(
        logger,
        { tabId, hint, alreadyProcessed, storedMessageId },
        'ensureReplyAttachments: session marker check'
      );
      if (alreadyProcessed) {
        markDone(state, tabId, hint);
        debugLog(logger, { tabId, hint }, 'ensureReplyAttachments: already processed');
        return;
      }

      markProcessing(state, tabId, hint);
      debugLog(logger, { tabId, hint }, 'ensureReplyAttachments: marked processing');

      const messageId = await waitForMessageId(compose, tabId, details);
      if (!messageId) {
        debugLog(logger, { tabId, hint }, 'ensureReplyAttachments: messageId missing after wait');
        clearState(state, tabId);
        await safe(() => sessions.removeTabValue(tabId, sessionKey));
        return;
      }

      updateStateMessage(state, tabId, messageId);
      debugLog(
        logger,
        { tabId, messageId, hint },
        'ensureReplyAttachments: invoking processReplyAttachments'
      );

      const added = await processReplyAttachments(tabId, messageId);

      if (added > 0) {
        debugLog(logger, { tabId, messageId, added }, 'ensureReplyAttachments: attachments added');
        await markProcessed(sessions, tabId, sessionKey, state, messageId);
        return;
      }

      debugLog(
        logger,
        { tabId, messageId },
        'ensureReplyAttachments: nothing added, clearing state'
      );
      clearState(state, tabId);
      await safe(() => sessions.removeTabValue(tabId, sessionKey));
    })();

    inflightEnsures.set(
      tabId,
      run.finally(() => {
        inflightEnsures.delete(tabId);
      })
    );

    return inflightEnsures.get(tabId);
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
/**
 * @param {string|number|null} hint
 * @returns {Promise<{ processed: boolean, messageId: string|number|null }>}
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
 * @param {string|number|null} messageId
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

/**
 * Core selection loop: unique by part, not excluded, not already present,
 * and within the copy limits.
 * @returns {{ selected: any[], skipped: Array<{name: string, pattern: string}> }}
 *          `skipped` uses the same row shape as the blacklist notice so it can go
 *          through the same warning channel.
 */
function selectEligible(all, existingNames, shouldExclude, includeFn, inlineCids, limits) {
  const { maxCount, maxTotalBytes } = limits || COPY_LIMITS;
  // Select unique, non-excluded, and not-already-present attachments.
  const takenParts = new Set();
  const selected = [];
  const skipped = [];
  let totalBytes = 0;
  for (const att of all) {
    const name = App.Domain.normalizedName(att);
    if (shouldExclude(name)) continue;
    if (!includeFn(att, inlineCids)) continue;
    if (takenParts.has(att.partName)) continue;
    if (name && existingNames.has(name)) continue;

    const displayName = att.name || att.fileName || name;
    if (selected.length >= maxCount) {
      skipped.push({ name: displayName, pattern: `> ${maxCount}` });
      continue;
    }
    const size = Number.isFinite(att?.size) ? Number(att.size) : 0;
    // The first eligible file is always copied: a single attachment larger than
    // the whole budget is exactly the one the user is replying about, and
    // dropping it would be the silent loss this limit exists to avoid.
    if (selected.length > 0 && totalBytes + size > maxTotalBytes) {
      skipped.push({ name: displayName, pattern: `> ${Math.round(maxTotalBytes / 1048576)} MB` });
      continue;
    }

    selected.push(att);
    totalBytes += size;
    takenParts.add(att.partName);
    if (name) existingNames.add(name);
  }
  return { selected, skipped };
}

/** Build blacklist warning rows: [{name, pattern}] */
function computeBlacklistedRows(all, existingNames, shouldExclude, matchBlacklist, inlineCids) {
  // Aggregate all matching patterns per normalized file name, emit a single row per file
  /** @type {Map<string,{display:string, patterns:Set<string>}>} */
  const acc = new Map();
  for (const att of all) {
    if (!App.Domain.includeRelaxed(att, inlineCids)) continue; // skip inline/SMIME
    const nameNorm = App.Domain.normalizedName(att);
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
  const names = (attachments || []).map((a) => App.Domain.normalizedName(a)).filter(Boolean);
  return new Set(names);
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
App.UseCases = { createProcessReplyAttachments, createEnsureReplyAttachments, COPY_LIMITS };
