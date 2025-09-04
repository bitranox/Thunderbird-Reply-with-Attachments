// Application: use cases orchestrate domain + ports

// Expect domain helpers on global (loaded from domain/filters.js)

/**
 * Create a function that processes reply attachments (strict + relaxed passes).
 * @param {object} ports
 * @param {object} ports.compose
 * @param {function(number): Promise<Array>} ports.compose.listAttachments
 * @param {function(number, {file: any}): Promise<void>} ports.compose.addAttachment
 * @param {object} ports.messages
 * @param {function(number): Promise<Array>} ports.messages.listAttachments
 * @param {function(number,string): Promise<any>} ports.messages.getAttachmentFile
 */
function createProcessReplyAttachments({ compose, messages, shouldExclude = () => false, confirm = async () => true }) {
  return async function processReplyAttachments(tabId, messageId) {
    try {
      const attachments = await messages.listAttachments(messageId);
      if (!attachments?.length) return 0;

      const existing = await compose.listAttachments(tabId).catch(() => []);
      const existingNames = new Set((existing || []).map((a) => normalizedName(a)).filter(Boolean));
      const addedPartNames = new Set();
      let added = 0;

      const selected = [];

      async function trySelect(att) {
        if (addedPartNames.has(att.partName)) return false;
        const key = normalizedName(att);
        if (key && existingNames.has(key)) return false;
        if (shouldExclude(key)) return false;
        selected.push(att);
        addedPartNames.add(att.partName);
        if (key) existingNames.add(key);
        return true;
      }

      for (const att of attachments) {
        if (!shouldExclude(normalizedName(att)) && includeStrict(att)) {
          if (await trySelect(att)) added += 1;
        }
      }
      if (added === 0) {
        for (const att of attachments) {
          if (!shouldExclude(normalizedName(att)) && includeRelaxed(att)) {
            if (await trySelect(att)) added += 1;
          }
        }
      }

      if (selected.length === 0) return 0;

      // Ask caller whether to proceed (e.g., show confirm to user)
      const proceed = await confirm(tabId, selected.map(a => ({ name: a.name || a.fileName, partName: a.partName })));
      if (!proceed) return 0;

      // Fetch and attach selected files
      let actuallyAdded = 0;
      for (const att of selected) {
        const file = await messages.getAttachmentFile(messageId, att.partName);
        if (!file) continue;
        await compose.addAttachment(tabId, { file });
        actuallyAdded += 1;
      }
      return actuallyAdded;
    } catch (_) {
      return 0;
    }
  };
}

/**
 * Create a function that ensures original attachments are present for reply compose.
 * Handles per-tab idempotency via sessions and an in-memory state map.
 * @param {object} deps
 * @param {object} deps.compose
 * @param {function(number): Promise<any>} deps.compose.getDetails
 * @param {object} deps.messages
 * @param {object} deps.sessions
 * @param {Map<number,'processing'|'done'>} deps.state
 * @param {string} deps.sessionKey
 */
function createEnsureReplyAttachments({ compose, messages, sessions, state, sessionKey, shouldExclude = () => false, confirm = async () => true }) {
  const processReplyAttachments = createProcessReplyAttachments({ compose, messages, shouldExclude, confirm });

  async function resolveMessageId(tabId, initialDetails, { attempts = 10, delayMs = 200 } = {}) {
    let details = initialDetails;
    for (let i = 0; i < attempts; i++) {
      const id = details?.referenceMessageId || details?.relatedMessageId;
      if (id) return id;
      await new Promise((r) => setTimeout(r, delayMs));
      details = await compose.getDetails(tabId).catch(() => null);
    }
    return null;
  }

  return async function ensureReplyAttachments(tabId, composeDetails) {
    const type = lower(composeDetails?.type);
    if (!type.startsWith('reply')) return;
    const mem = state.get(tabId);
    if (mem === 'processing' || mem === 'done') return;
    state.set(tabId, 'processing');
    try {
      const already = await sessions.getTabValue(tabId, sessionKey).catch(() => false);
      if (already) { state.set(tabId, 'done'); return; }
    } catch (_) {}
    const messageId = await resolveMessageId(tabId, composeDetails);
    if (!messageId) { state.delete(tabId); return; }
    const added = await processReplyAttachments(tabId, messageId);
    if (added > 0) {
      state.set(tabId, 'done');
      try { await sessions.setTabValue(tabId, sessionKey, true); } catch (_) {}
    } else {
      state.delete(tabId);
    }
  };
}

globalThis.App = globalThis.App || {};
App.UseCases = { createProcessReplyAttachments, createEnsureReplyAttachments };
