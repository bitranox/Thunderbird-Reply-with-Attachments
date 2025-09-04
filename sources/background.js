// background.js — entry point (composition root is in app/composition.js)

(async () => {
  // Optionally read debug flag to gate console noise
  let cfg = {};
  try { cfg = await (browser.storage?.local?.get?.({ debug: false }) ?? {}); } catch (_) {}
  const DEBUG = !!cfg?.debug;
  if (DEBUG) console.log('Reply with Attachments: wiring app…');

  // Expose helpers early for tests
  let _ensure = null;
  globalThis.extractNumericTabId = function extractNumericTabId(tabId) {
    if (typeof tabId === 'number') return tabId;
    if (tabId && typeof tabId === 'object' && typeof tabId.id === 'number') return tabId.id;
    return null;
  };
  globalThis.getComposeDetails = async function getComposeDetails(tabId) {
    try { return await browser.compose.getComposeDetails(tabId); } catch (_) { return null; }
  };
  globalThis.ensureReplyAttachments = async (...args) => { if (_ensure) return _ensure(...args); };
  globalThis.handleComposeStateChanged = async function handleComposeStateChanged(tabId, _details) {
    const id = extractNumericTabId(tabId);
    if (id == null) return;
    const details = await getComposeDetails(id);
    if (!details) return;
    await globalThis.ensureReplyAttachments(id, details);
  };
  // Placeholder; will be replaced after wiring
  globalThis.processReplyAttachments = async () => 0;

  const { ensureReplyAttachments, processedTabsState, SESSION_KEY } = App.Composition.createAppWiring(browser);

  // Surface for legacy tests expecting globals
  _ensure = ensureReplyAttachments;
  globalThis.ensureReplyAttachments = ensureReplyAttachments;
  globalThis.processedTabsState = processedTabsState;
  globalThis.SESSION_KEY = SESSION_KEY;
  globalThis.processReplyAttachments = App.UseCases.createProcessReplyAttachments({
    compose: { listAttachments: (id) => browser.compose.listAttachments?.(id) || Promise.resolve([]), addAttachment: (id, a) => browser.compose.addAttachment(id, a) },
    messages: { listAttachments: (id) => browser.messages.listAttachments(id), getAttachmentFile: (id, p) => browser.messages.getAttachmentFile(id, p) },
  });
})();
