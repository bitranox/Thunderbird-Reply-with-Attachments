/*
 * Module: background.js
 * Purpose: Bootstrap the add-on in Thunderbird’s background scope.
 *          Responsibility stops at wiring, observability, and test facades.
 *          Domain decisions live under sources/app.
 */

let ensureDelegate = null;

/**
 * Report a problem without letting the reporting itself throw.
 * Bootstrap runs before any logger exists and an exception from console here
 * would take the whole add-on down; a logger must never break its caller.
 * @param {...unknown} args
 */
function warnSafe(...args) {
  try {
    console.warn('[RWA]', ...args);
  } catch (_) {
    // a logger must never break the caller
  }
}

(async function bootstrapBackground() {
  const logging = await createLoggingController(browser);
  const toNumericId = resolveNumericIdFn();
  const getComposeDetails = makeSafeComposeDetailsGetter(browser);

  exposeTestingFacades({ toNumericId, getComposeDetails });
  registerSettingsLifecycle(browser);

  const wiring = App.Composition.createAppWiring(browser);
  adoptApplicationWiring(wiring);

  globalThis.processReplyAttachments = createProcessReplyAttachmentsFacade(browser);

  const applyContext = buildApplySettingsContext({
    browser,
    wiring,
    toNumericId,
    getComposeDetails,
    logging,
  });

  async function ensureComposeForTab(tabId) {
    if (!Number.isFinite(tabId)) return;
    try {
      const details = await getComposeDetails(tabId);
      if (!details) return;
      await runEnsure(applyContext, tabId, details);
    } catch (err) {
      logWarn(logging, { err, tabId }, 'ensureComposeForTab failed');
    }
  }

  registerApplySettingsListener(browser, {
    onApply: () => applySettingsToOpenComposers(applyContext),
    // reloadSettings closes over the browser it was wired with; it takes no argument.
    reloadSettings: wiring.reloadSettings ? () => wiring.reloadSettings() : null,
    refreshDebug: logging.refresh,
    ensureForTab: ensureComposeForTab,
  });

  registerDebugWatcher(browser, logging.refresh);

  safe(() => applySettingsToOpenComposers(applyContext));
})();

// — Bootstrap helpers -------------------------------------------------------

function adoptApplicationWiring({ ensureReplyAttachments, processedTabsState, SESSION_KEY }) {
  setEnsureDelegate(ensureReplyAttachments);
  globalThis.ensureReplyAttachments = ensureReplyAttachments;
  globalThis.processedTabsState = processedTabsState;
  globalThis.SESSION_KEY = SESSION_KEY;
}

function buildApplySettingsContext({ browser, wiring, toNumericId, getComposeDetails, logging }) {
  return {
    browser,
    ensure: () => globalThis.ensureReplyAttachments,
    processedTabsState: wiring.processedTabsState,
    sessionKey: wiring.SESSION_KEY,
    toNumericId,
    getComposeDetails,
    logging,
  };
}

function exposeTestingFacades({ toNumericId, getComposeDetails }) {
  globalThis.extractNumericTabId = toNumericId;
  globalThis.getComposeDetails = getComposeDetails;
  globalThis.ensureReplyAttachments = async (...args) => {
    if (ensureDelegate) return ensureDelegate(...args);
    return undefined;
  };
  globalThis.handleComposeStateChanged = createComposeStateChangedFacade(
    toNumericId,
    getComposeDetails
  );
  globalThis.processReplyAttachments = async () => 0;
}

// — Apply-settings orchestration --------------------------------------------

/**
 * @typedef {object} ApplySettingsContext
 * @property {any} browser MailExtension browser/messenger object
 * @property {{ log?: any, refresh?: Function }} logging
 * @property {(value: any) => number|null} toNumericId
 * @property {(tabId: number) => Promise<any>} getComposeDetails
 * @property {() => ((tabId: number, details: any) => Promise<void>)|null} [ensure] Supplies the
 *           current ensure function; it is re-created whenever settings change, so it is
 *           looked up per call rather than captured.
 * @property {Map<number, any>} [processedTabsState]
 * @property {string} [sessionKey]
 */

/**
 * Re-apply settings to every currently open reply-compose tab by
 * clearing markers and re-running the ensure pipeline.
 * @param {ApplySettingsContext} context - Apply-settings context from buildApplySettingsContext
 */
async function applySettingsToOpenComposers(context) {
  try {
    const tabs = await listAllTabs(context.browser);
    const work = [];
    for (const tab of tabs) {
      const target = await resolveReplyCompose(tab, context);
      if (!target) continue;
      await clearTabMarkers(context, target.id);
      work.push(runEnsure(context, target.id, target.details));
    }
    await settleAll(work);
  } catch (err) {
    logWarn(context.logging, { err }, 'applySettingsToOpenComposers failed');
  }
}

async function listAllTabs(browser) {
  return (await browser.tabs?.query?.({})) || [];
}

/**
 * Determine whether a tab is a reply-compose window and return its id/details.
 * @param {object} tab - Tab object from browser.tabs.query
 * @param {ApplySettingsContext} context - Apply-settings context
 * @returns {Promise<{id: number, details: object}|null>} Resolved target or null
 */
async function resolveReplyCompose(tab, context) {
  const id = context.toNumericId(tab);
  if (id == null) return null;
  const details = await context.getComposeDetails(id);
  if (!details) return null;
  const type = String(details?.type || '').toLowerCase();
  if (!type.startsWith('reply')) return null;
  return { id, details };
}

/**
 * @param {Pick<ApplySettingsContext, 'browser'|'processedTabsState'|'sessionKey'>} context
 * @param {number} tabId
 */
async function clearTabMarkers({ browser, processedTabsState, sessionKey }, tabId) {
  await safe(() => browser.sessions?.removeTabValue?.(tabId, sessionKey));
  try {
    processedTabsState?.delete?.(tabId);
  } catch (e) {
    warnSafe('clearing per-tab state failed for tab', tabId, e);
  }
}

/**
 * Execute the ensureReplyAttachments delegate for one tab, catching errors.
 * @param {ApplySettingsContext} context - Apply-settings context
 * @param {number} tabId - Compose tab identifier
 * @param {any} details - Compose details for the tab
 * @returns {Promise<void>}
 */
function runEnsure(context, tabId, details) {
  const ensure = typeof context.ensure === 'function' ? context.ensure() : null;
  try {
    if (typeof ensure !== 'function') return Promise.resolve();
    return ensure(tabId, details).catch((err) => {
      logWarn(
        context.logging,
        { err, tabId },
        'ensureReplyAttachments failed during apply settings'
      );
    });
  } catch (err) {
    logWarn(context.logging, { err, tabId }, 'ensureReplyAttachments threw during apply settings');
    return Promise.resolve();
  }
}

async function settleAll(tasks) {
  if (!tasks.length) return;
  // allSettled never rejects; individual failures are reported by their own task.
  await Promise.allSettled(tasks);
}

// — Logging -----------------------------------------------------------------

/**
 * Create a logging controller that reads the debug flag from storage
 * and rebuilds the logger when the flag changes.
 * @param {any} browser - WebExtension browser API
 * @returns {Promise<{log: object, refresh: Function}>} Controller with log getter and refresh method
 */
async function createLoggingController(browser) {
  const makeLoggerFn = resolveLoggerFactory();
  let debugEnabled = await readDebugFlag(browser);
  let currentLogger = makeLoggerFn(debugEnabled);
  assignGlobalLogger(currentLogger);
  currentLogger.debug('Reply with Attachments: wiring app…');

  async function refresh() {
    try {
      const next = await readDebugFlag(browser);
      if (next === debugEnabled) return;
      debugEnabled = next;
      currentLogger = makeLoggerFn(debugEnabled);
      assignGlobalLogger(currentLogger);
      currentLogger.info(
        `Reply with Attachments: debug logging ${debugEnabled ? 'enabled' : 'disabled'}`
      );
    } catch (err) {
      try {
        console.warn('[RWA]', { err }, 'refreshDebugLogging failed');
      } catch (_) {
        // a logger must never break the caller
      }
    }
  }

  return {
    get log() {
      return currentLogger;
    },
    refresh,
  };
}

function resolveLoggerFactory() {
  const shared = globalThis.App?.Shared?.makeLogger;
  return typeof shared === 'function' ? shared : makeLogger;
}

function assignGlobalLogger(logger) {
  globalThis.log = logger;
}

function logWarn(logging, payload, message) {
  try {
    logging.log?.warn?.(payload, message);
  } catch (_) {
    // a logger must never break the caller
  }
}

// — Runtime wiring ----------------------------------------------------------

/**
 * Register a runtime message listener that triggers settings re-application
 * or per-tab ensure when compose windows signal readiness.
 * @param {any} browser - WebExtension browser API
 * @param {object} callbacks
 * @param {Function} callbacks.onApply - Called to re-apply settings to all open composers
 * @param {Function|null} callbacks.reloadSettings - Reloads settings from storage
 * @param {Function} callbacks.refreshDebug - Refreshes the debug logging flag
 * @param {Function} callbacks.ensureForTab - Ensures attachments for a single tab
 */
function registerApplySettingsListener(
  browser,
  { onApply, reloadSettings, refreshDebug, ensureForTab }
) {
  if (typeof browser.runtime?.onMessage?.addListener !== 'function') {
    warnSafe('runtime.onMessage is unavailable; the options page cannot reach us');
    return;
  }
  // A host that rejects the registration must not take the whole bootstrap with
  // it: the add-on still copies attachments, it just cannot be re-configured live.
  try {
    browser.runtime.onMessage.addListener((msg, sender) => {
      if (!msg || typeof msg.type !== 'string') return undefined;
      if (msg.type === 'rwa:apply-settings-open-compose') {
        maybeReloadSettings(reloadSettings);
        maybeRefreshDebug(refreshDebug);
        if (typeof onApply === 'function') onApply();
        return Promise.resolve({ ok: true });
      }
      if (msg.type === 'rwa:compose-content-ready') {
        const tabId = extractTabId(sender, msg);
        if (typeof ensureForTab === 'function' && Number.isFinite(tabId)) {
          return Promise.resolve(ensureForTab(tabId)).then(() => ({ ok: true }));
        }
        if (typeof onApply === 'function') onApply();
        return Promise.resolve({ ok: true });
      }
      return undefined;
    });
  } catch (e) {
    warnSafe('could not register the settings listener:', e);
  }
}

/**
 * Extract a numeric tab ID from a runtime message sender or message payload.
 * @param {{ tab?: { id?: number } }} sender - Message sender
 * @param {{ tabId?: number|string }} msg - Message payload
 * @returns {number|null} Finite tab ID or null
 */
function extractTabId(sender, msg) {
  if (sender && sender.tab && typeof sender.tab.id === 'number') return sender.tab.id;
  if (msg && typeof msg.tabId !== 'undefined') {
    const candidate = Number(msg.tabId);
    if (Number.isFinite(candidate)) return candidate;
  }
  return null;
}

/**
 * Reload settings from storage if a reload function is available.
 * @param {Function|null} reloadSettings - Async function that reloads settings
 */
function maybeReloadSettings(reloadSettings) {
  if (typeof reloadSettings !== 'function') return;
  try {
    reloadSettings().catch((e) => console.error('[RWA] reloadSettings failed:', e));
  } catch (e) {
    warnSafe('reloadSettings threw synchronously:', e);
  }
}

function maybeRefreshDebug(refreshDebug) {
  if (typeof refreshDebug !== 'function') return;
  const result = refreshDebug();
  if (result && typeof result.catch === 'function') {
    result.catch((e) => console.error('[RWA] refreshDebug failed:', e));
  }
}

function registerDebugWatcher(browser, refreshDebug) {
  if (typeof browser.storage?.onChanged?.addListener !== 'function') {
    warnSafe('storage.onChanged is unavailable; the debug flag needs a restart');
    return;
  }
  try {
    browser.storage.onChanged.addListener((changes, area) => {
      if (area !== 'local') return;
      if (!changes || !Object.prototype.hasOwnProperty.call(changes, 'debug')) return;
      maybeRefreshDebug(refreshDebug);
    });
  } catch (e) {
    warnSafe('could not watch the debug flag:', e);
  }
}

// — Settings lifecycle ------------------------------------------------------

const SETTINGS_DEFAULTS = Object.freeze({
  blacklistPatterns: ['*intern*', '*secret*', '*passwor*'],
  confirmBeforeAdd: false,
  confirmDefaultChoice: 'yes',
  warnOnBlacklistExcluded: true,
});

function registerSettingsLifecycle(browser) {
  const SCHEMA_VERSION = 1;
  if (typeof browser.runtime?.onInstalled?.addListener !== 'function') {
    warnSafe('runtime.onInstalled is unavailable; default settings will not be seeded');
    return;
  }
  try {
    browser.runtime.onInstalled.addListener((details) => {
      return initializeOrMigrateSettings(browser, details, SCHEMA_VERSION).catch((e) =>
        console.error('[RWA] settings init/migrate failed:', e)
      );
    });
  } catch (e) {
    warnSafe('could not register the install/upgrade hook:', e);
  }
}

/**
 * Seed default settings on fresh install or migrate missing keys on update.
 * @param {any} browser - WebExtension browser API
 * @param {{ reason?: string }} details - Install/update details from runtime.onInstalled
 * @param {number} targetVersion - Schema version to write after migration
 */
async function initializeOrMigrateSettings(browser, details, targetVersion) {
  const currentVersion = await readSchemaVersion(browser);
  if (details?.reason === 'install') {
    await seedDefaultsOnInstall(browser, SETTINGS_DEFAULTS, targetVersion);
    return;
  }
  if (details?.reason === 'update' && currentVersion < targetVersion) {
    await migrateMissingDefaults(browser, SETTINGS_DEFAULTS, targetVersion);
  }
}

async function readSchemaVersion(browser) {
  const now = await browser.storage?.local?.get?.({ settingsVersion: 0 });
  return Number(now?.settingsVersion || 0);
}

/**
 * Write default settings values for any keys not already present in storage.
 * @param {any} browser - WebExtension browser API
 * @param {object} defaults - Key/value map of default settings
 * @param {number} version - Schema version to stamp after seeding
 */
async function seedDefaultsOnInstall(browser, defaults, version) {
  const existing = await browser.storage?.local?.get?.({
    blacklistPatterns: undefined,
    confirmBeforeAdd: undefined,
    confirmDefaultChoice: undefined,
    warnOnBlacklistExcluded: undefined,
  });
  const toSet = onlyMissing(existing, defaults);
  if (Object.keys(toSet).length) await browser.storage?.local?.set?.(toSet);
  await browser.storage?.local?.set?.({ settingsVersion: version });
}

/**
 * Backfill any settings keys added in newer versions that are missing in storage.
 * @param {any} browser - WebExtension browser API
 * @param {object} defaults - Key/value map of default settings
 * @param {number} version - Schema version to stamp after migration
 */
async function migrateMissingDefaults(browser, defaults, version) {
  const snapshot = await browser.storage?.local?.get?.({
    blacklistPatterns: undefined,
    confirmBeforeAdd: undefined,
    confirmDefaultChoice: undefined,
    warnOnBlacklistExcluded: undefined,
  });
  const toSet = onlyMissing(snapshot, defaults);
  if (Object.keys(toSet).length) await browser.storage?.local?.set?.(toSet);
  await browser.storage?.local?.set?.({ settingsVersion: version });
}

function onlyMissing(existing, defaults) {
  const out = {};
  for (const [key, value] of Object.entries(defaults)) {
    if (typeof existing[key] === 'undefined') out[key] = value;
  }
  return out;
}

// — Facades -----------------------------------------------------------------

function createComposeStateChangedFacade(toNumericId, getComposeDetails) {
  return async function onComposeStateChangedFacade(tabId) {
    const id = toNumericId(tabId);
    if (id == null) return;
    const details = await getComposeDetails(id);
    if (!details) return;
    if (ensureDelegate) await ensureDelegate(id, details);
  };
}

function createProcessReplyAttachmentsFacade(browser) {
  return App.UseCases.createProcessReplyAttachments({
    compose: {
      listAttachments: (tabId) => browser.compose.listAttachments?.(tabId) || Promise.resolve([]),
      addAttachment: (tabId, attachment) => browser.compose.addAttachment(tabId, attachment),
    },
    messages: {
      listAttachments: (messageId) => browser.messages.listAttachments(messageId),
      getAttachmentFile: (messageId, partName) =>
        browser.messages.getAttachmentFile(messageId, partName),
    },
  });
}

function setEnsureDelegate(fn) {
  ensureDelegate = typeof fn === 'function' ? fn : null;
}

// — Numeric & compose helpers ----------------------------------------------

function resolveNumericIdFn() {
  const shared = globalThis.App?.Shared?.toNumericId;
  return typeof shared === 'function' ? shared : toNumericId;
}

function toNumericId(value) {
  return typeof value === 'number'
    ? value
    : value && typeof value.id === 'number'
      ? value.id
      : null;
}

function makeSafeComposeDetailsGetter(browser) {
  return async function safeGetComposeDetails(tabId) {
    try {
      return await browser.compose.getComposeDetails(tabId);
    } catch (_) {
      return null;
    }
  };
}

// — Utilities ---------------------------------------------------------------

async function readDebugFlag(browser) {
  try {
    const cfg = await (browser.storage?.local?.get?.({ debug: false }) ?? {});
    return !!cfg?.debug;
  } catch (_) {
    return false;
  }
}

function makeLogger(enabled) {
  return {
    debug: (...args) => {
      if (!enabled) return;
      try {
        console.debug('[RWA]', ...args);
      } catch (_) {
        // a logger must never break the caller
      }
    },
    info: (...args) => {
      try {
        console.info('[RWA]', ...args);
      } catch (_) {
        // a logger must never break the caller
      }
    },
    warn: (...args) => {
      try {
        console.warn('[RWA]', ...args);
      } catch (_) {
        // a logger must never break the caller
      }
    },
    error: (...args) => {
      try {
        console.error('[RWA]', ...args);
      } catch (_) {
        // a logger must never break the caller
      }
    },
  };
}

async function safe(fn) {
  try {
    return await fn();
  } catch (_) {
    return undefined;
  }
}
