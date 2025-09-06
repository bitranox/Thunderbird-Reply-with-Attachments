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

/**
 * Decide which attachments to add, in two passes (strict → relaxed).
 * @param {{ compose: import('./ports.js').ComposePort, messages: import('./ports.js').MessagesPort, shouldExclude?: (name: string) => boolean, confirm?: import('./ports.js').ConfirmFn }} deps
 * @returns {(tabId: number, messageId: number) => Promise<number>} processReplyAttachments
 */
function createProcessReplyAttachments({
  compose,
  messages,
  shouldExclude = () => false,
  confirm = async () => true,
  logger = console,
}) {
  return async function processReplyAttachments(tabId, messageId) {
    try {
      const all = await getAllAttachments(messages, messageId);
      if (isEmpty(all)) return 0;

      const existingNames = await getExistingAttachmentNames(compose, tabId);
      const selected = pickFirstNonEmpty([
        selectStrict(all, existingNames, shouldExclude),
        selectRelaxed(all, existingNames, shouldExclude),
      ]);
      if (isEmpty(selected)) return 0;

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
/** Load all attachments for the source message. */
async function getAllAttachments(messages, messageId) {
  return await messages.listAttachments(messageId);
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
 * @param {{ compose: import('./ports.js').ComposePort, messages: import('./ports.js').MessagesPort, sessions: import('./ports.js').SessionsPort, state: Map<number,'processing'|'done'>, sessionKey: string, shouldExclude?: (name: string) => boolean, confirm?: import('./ports.js').ConfirmFn }} deps
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
  logger = console,
}) {
  const processReplyAttachments = createProcessReplyAttachments({
    compose,
    messages,
    shouldExclude,
    confirm,
    logger,
  });
  return async function ensureReplyAttachments(tabId, details) {
    if (!isReply(details)) return; // only for replies
    if (isProcessingOrDone(state, tabId)) return; // skip duplicates in memory
    markProcessing(state, tabId);

    const already = await wasAlreadyProcessed(sessions, tabId, sessionKey);
    if (already) return markDone(state, tabId);

    const messageId = await waitForMessageId(compose, tabId, details);
    if (!messageId) return clearState(state, tabId);

    const added = await processReplyAttachments(tabId, messageId);
    if (added > 0) {
      await markProcessed(sessions, tabId, sessionKey, state);
    } else {
      clearState(state, tabId);
    }
  };
}

// — ensure helpers —
async function wasAlreadyProcessed(sessions, tabId, key) {
  return await safe(() => sessions.getTabValue(tabId, key), false);
}
async function markProcessed(sessions, tabId, key, state) {
  markDone(state, tabId);
  await safe(() => sessions.setTabValue(tabId, key, true));
}

// — helpers —

function isReply(details) {
  // Thunderbird composes label reply flavors like 'reply', 'replyAll', etc.
  return String(details?.type || '')
    .toLowerCase()
    .startsWith('reply');
}

function isProcessingOrDone(state, tabId) {
  // Memory guard to avoid duplicate runs within a single background session.
  const s = state.get(tabId);
  return s === 'processing' || s === 'done';
}

function markProcessing(state, tabId) {
  state.set(tabId, 'processing');
}
function markDone(state, tabId) {
  state.set(tabId, 'done');
}
function clearState(state, tabId) {
  state.delete(tabId);
}

async function waitForMessageId(compose, tabId, initial, { attempts = 10, delayMs = 200 } = {}) {
  // Poll the compose details until Thunderbird provides a reference/related id.
  let details = initial;
  for (let i = 0; i < attempts; i++) {
    const id = details?.referenceMessageId || details?.relatedMessageId;
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

function delay(ms) {
  return new Promise((r) => (globalThis.setTimeout ? globalThis.setTimeout(r, ms) : setTimeout(r, ms)));
}

async function safe(fn, fallback) {
  try {
    return await fn();
  } catch (_) {
    return fallback;
  }
}

globalThis.App = globalThis.App || {};
App.UseCases = { createProcessReplyAttachments, createEnsureReplyAttachments };
