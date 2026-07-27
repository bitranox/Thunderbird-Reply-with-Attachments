/*
 * Module: tests/e2e/probe-addon/probe.js
 * Purpose: Run the add-on's real selection logic against real Thunderbird data.
 *
 *   The probe imports the test messages through messages.import(), then drives
 *   the shipped createProcessReplyAttachments() with the REAL Thunderbird
 *   messages port (listAttachments, listInlineTextParts, getAttachmentFile) and
 *   a recording stand-in for the compose port. Everything that decides what gets
 *   copied is production code over production data: real MIME parsing, real
 *   contentId and contentDisposition values, the real domain predicates.
 *
 *   It also reports the raw MessageAttachment records, which are the ground
 *   truth the whole inline-vs-attachment rule rests on.
 *
 * Why not open a real compose window: browser.compose.beginReply() segfaults
 * Thunderbird on this headless server (reproduced on 140 ESR and on 153, with
 * this add-on absent), so that path needs a desktop session. See the README.
 *
 * Results are printed to the console with a marker the runner reads out of
 * Thunderbird's stdout: an extension cannot write files, and an MV3 host
 * permission is not granted at install time, so HTTP is not available either.
 *
 * Never ship this: it is test scaffolding, not part of the add-on.
 */

const RESULT_MARKER = 'RWA_E2E_RESULT';
const MESSAGES = [
  'messages/rwa-1.eml',
  'messages/rwa-2.eml',
  'messages/rwa-3.eml',
  'messages/rwa-4.eml',
];

/** Progress breadcrumb: a crash mid-run still shows how far the probe got. */
function step(message) {
  console.log(`RWA_E2E_STEP ${message}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function findByName(folders, name) {
  for (const f of folders || []) {
    if (f.name === name) return f;
    const nested = findByName(f.subFolders, name);
    if (nested) return nested;
  }
  return null;
}

/**
 * Create the test folder and import the sample messages through the documented
 * API. Seeding an mbox file into the profile does not work: Thunderbird only
 * indexes a folder it has parsed, so messages.list() comes back empty.
 */
async function prepareTestFolder() {
  const accounts = await browser.accounts.list();
  const local = accounts.find((a) => a.type === 'local' || a.type === 'none') || accounts[0];
  if (!local) throw new Error('no local account');

  const existing = await browser.folders.getSubFolders(local.id, true);
  let folder = findByName(existing, 'RWA-Test');
  if (!folder) {
    folder = await browser.folders.create(local.id, 'RWA-Test');
    await sleep(2000); // let the new folder's database settle before importing
  }
  step(`folder ready: ${folder.id || folder.path}`);

  const known = await browser.messages.list(folder.id);
  if ((known.messages || []).length >= MESSAGES.length) return folder;

  for (const path of MESSAGES) {
    const response = await fetch(browser.runtime.getURL(path));
    const text = await response.text();
    const file = new File([text], path.split('/').pop(), { type: 'message/rfc822' });
    await browser.messages.import(file, folder.id, { read: true });
    step(`imported ${path}`);
  }
  return folder;
}

/** The raw records the decision rests on, straight from Thunderbird. */
async function describeParts(messageId) {
  const attachments = await browser.messages.listAttachments(messageId);
  const inlineParts = (await browser.messages.listInlineTextParts?.(messageId)) || [];
  return {
    parts: attachments.map((a) => ({
      name: a.name,
      partName: a.partName,
      contentType: a.contentType,
      contentId: a.contentId ?? null,
      contentDisposition: a.contentDisposition ?? null,
      size: a.size,
    })),
    inlineParts: inlineParts.map((p) => ({
      contentType: p.contentType,
      embedsCid: /["'(]cid:/i.test(String(p.content || '')),
      length: String(p.content || '').length,
    })),
  };
}

/**
 * Run the shipped use case for one message.
 * The messages port is the real adapter; only the compose side is recorded.
 */
async function runSelection(messageId) {
  const { messages } = App.Adapters.makeThunderbirdPorts(browser);
  const added = [];
  const compose = {
    async getDetails() {
      return { type: 'reply', referenceMessageId: messageId };
    },
    async listAttachments() {
      return [];
    },
    async addAttachment(_tabId, attachment) {
      added.push(attachment?.file?.name || '(unnamed)');
    },
    async setDetails() {
      throw new Error('the add-on must not write the compose body');
    },
  };
  const process = App.UseCases.createProcessReplyAttachments({
    compose,
    messages,
    logger: { debug() {}, info() {}, warn() {}, error() {} },
  });
  const count = await process(1, messageId);
  return { count, attachments: added.sort() };
}

async function run() {
  const report = { ok: false, error: null, cases: [], platform: null };
  try {
    report.platform = await browser.runtime.getBrowserInfo?.().catch(() => null);
    await sleep(8000);

    const folder = await prepareTestFolder();
    let page = await browser.messages.list(folder.id);
    const headers = [...page.messages];
    while (page.id) {
      page = await browser.messages.continueList(page.id);
      headers.push(...page.messages);
    }
    headers.sort((a, b) => String(a.subject).localeCompare(String(b.subject)));
    step(`messages found: ${headers.length}`);

    for (const header of headers) {
      const parts = await describeParts(header.id);
      const selection = await runSelection(header.id);
      const result = { subject: header.subject, ...parts, ...selection };
      step(`case ${result.subject} -> ${JSON.stringify(result.attachments)}`);
      report.cases.push(result);
    }
    report.ok = true;
  } catch (err) {
    report.error = String(err && err.stack ? err.stack : err);
  }

  // base64 so the console's own string escaping cannot corrupt the JSON.
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(report))));
  console.log(`${RESULT_MARKER} ${encoded}`);
}

run();
