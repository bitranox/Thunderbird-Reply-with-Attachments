/*
 * Module: background.js
 * Purpose: Entry point for the add-on. Boots the composition root,
 *          exposes tiny helpers for tests, and wires the primary
 *          ensure-on-reply behavior into Thunderbird’s background context.
 * Notes:
 * - Composition and domain logic live in app/* to keep responsibilities clear.
 * - This file stays thin: no business rules, only bootstrapping and facades.
 */

(async () => {
  const DEBUG = await readDebugFlag();
  const makeLoggerFn = (globalThis.App && App.Shared && App.Shared.makeLogger) || makeLogger;
  const log = makeLoggerFn(DEBUG);
  globalThis.log = log;
  log.debug('Reply with Attachments: wiring app…');

  // Settings initialization & migrations — never overwrite user values.
  try {
    const SCHEMA_VERSION = 1;
    browser.runtime?.onInstalled?.addListener?.(async (details) => {
      try {
        await initializeOrMigrateSettings(details, SCHEMA_VERSION);
      } catch (_) {}
    });

    /**
     * Initialize defaults on fresh install and migrate on updates.
     * Rules:
     * - Only set defaults when a key is strictly undefined (not present).
     * - Never override user‑saved values (including empty arrays/false/no).
     */
    async function initializeOrMigrateSettings(details, targetVersion) {
      const DEFAULTS = {
        blacklistPatterns: ['*intern*', '*secret*', '*passwor*'],
        confirmBeforeAdd: false,
        confirmDefaultChoice: 'yes',
        warnOnBlacklistExcluded: true,
      };

      const cur = await readSchemaVersion();
      if (details?.reason === 'install') {
        await seedDefaultsOnInstall(DEFAULTS, targetVersion);
        return;
      }
      if (details?.reason === 'update' && cur < targetVersion) {
        await migrateMissingDefaults(DEFAULTS, targetVersion);
      }
    }

    async function readSchemaVersion() {
      const now = await browser.storage?.local?.get?.({ settingsVersion: 0 });
      return Number(now?.settingsVersion || 0);
    }
    async function seedDefaultsOnInstall(DEFAULTS, version) {
      const existing = await browser.storage?.local?.get?.({
        blacklistPatterns: undefined,
        confirmBeforeAdd: undefined,
        confirmDefaultChoice: undefined,
        warnOnBlacklistExcluded: undefined,
      });
      const toSet = onlyMissing(existing, DEFAULTS);
      if (Object.keys(toSet).length) await browser.storage?.local?.set?.(toSet);
      await browser.storage?.local?.set?.({ settingsVersion: version });
    }
    async function migrateMissingDefaults(DEFAULTS, version) {
      const snapshot = await browser.storage?.local?.get?.({
        blacklistPatterns: undefined,
        confirmBeforeAdd: undefined,
        confirmDefaultChoice: undefined,
        warnOnBlacklistExcluded: undefined,
      });
      const toSet = onlyMissing(snapshot, DEFAULTS);
      if (Object.keys(toSet).length) await browser.storage?.local?.set?.(toSet);
      await browser.storage?.local?.set?.({ settingsVersion: version });
    }
    function onlyMissing(existing, defaults) {
      /** @type {Record<string, any>} */
      const out = {};
      for (const [k, v] of Object.entries(defaults)) {
        if (typeof existing[k] === 'undefined') out[k] = v;
      }
      return out;
    }
  } catch (_) {}

  // Expose small helpers early for tests
  let _ensure = null;
  const toNumericIdFn = (globalThis.App && App.Shared && App.Shared.toNumericId) || toNumericId;
  globalThis.extractNumericTabId = toNumericIdFn;
  globalThis.getComposeDetails = safeGetComposeDetails;
  globalThis.ensureReplyAttachments = async (...args) => {
    if (_ensure) return _ensure(...args);
  };
  globalThis.handleComposeStateChanged = onComposeStateChangedFacade;
  globalThis.processReplyAttachments = async () => 0; // placeholder

  const { ensureReplyAttachments, processedTabsState, SESSION_KEY } =
    App.Composition.createAppWiring(browser);
  _ensure = ensureReplyAttachments;
  globalThis.ensureReplyAttachments = ensureReplyAttachments;
  globalThis.processedTabsState = processedTabsState;
  globalThis.SESSION_KEY = SESSION_KEY;
  globalThis.processReplyAttachments = App.UseCases.createProcessReplyAttachments({
    compose: {
      listAttachments: (id) => browser.compose.listAttachments?.(id) || Promise.resolve([]),
      addAttachment: (id, a) => browser.compose.addAttachment(id, a),
    },
    messages: {
      listAttachments: (id) => browser.messages.listAttachments(id),
      getAttachmentFile: (id, p) => browser.messages.getAttachmentFile(id, p),
    },
  });

  registerApplySettingsListener(applySettingsToOpenComposers);

  /**
   * Read the debug flag from storage.local.
   * @returns {Promise<boolean>} true when debug logging is enabled
   */
  async function readDebugFlag() {
    try {
      const cfg = await (browser.storage?.local?.get?.({ debug: false }) ?? {});
      return !!cfg?.debug;
    } catch (_) {
      return false;
    }
  }
  /**
   * Create a minimal logger (debug/info/warn/error) gated by a boolean.
   * @param {boolean} enabled
   * @returns {{debug:Function,info:Function,warn:Function,error:Function}}
   */
  function makeLogger(enabled) {
    return {
      debug: (...args) => {
        if (enabled) {
          try {
            console.debug('[RWA]', ...args);
          } catch (_) {}
        }
      },
      info: (...args) => {
        try {
          console.info('[RWA]', ...args);
        } catch (_) {}
      },
      warn: (...args) => {
        try {
          console.warn('[RWA]', ...args);
        } catch (_) {}
      },
      error: (...args) => {
        try {
          console.error('[RWA]', ...args);
        } catch (_) {}
      },
    };
  }
  /** Convert a tab reference (number or {id}) to a numeric id. */
  function toNumericId(v) {
    return typeof v === 'number' ? v : v && typeof v.id === 'number' ? v.id : null;
  }
  /**
   * Safely fetch compose details. Returns null if the API throws (tab closed or not a compose tab).
   * @param {number} tabId
   * @returns {Promise<any|null>}
   */
  async function safeGetComposeDetails(tabId) {
    try {
      return await browser.compose.getComposeDetails(tabId);
    } catch (_) {
      return null;
    }
  }
  /**
   * Facade for compose state changes used by tests.
   * Resolves the id, loads details safely, delegates to ensureReplyAttachments.
   * @param {number|{id:number}} tabId
   */
  async function onComposeStateChangedFacade(tabId, _details) {
    const id = toNumericIdFn(tabId);
    if (id == null) return;
    const details = await safeGetComposeDetails(id);
    if (!details) return;
    await globalThis.ensureReplyAttachments(id, details);
  }
  /**
   * Apply current settings to all open reply composers.
   * Clears per-tab markers and runs one ensure pass per eligible tab.
   */
  async function applySettingsToOpenComposers() {
    try {
      const tabs = (await browser.tabs?.query?.({})) || [];
      for (const t of tabs) {
        const id = toNumericIdFn(t);
        if (id == null) continue;
        const details = await safeGetComposeDetails(id);
        if (!details) continue;
        const type = String(details?.type || '').toLowerCase();
        if (!type.startsWith('reply')) continue;
        try {
          await browser.sessions?.removeTabValue?.(id, globalThis.SESSION_KEY);
        } catch (_) {}
        try {
          globalThis.processedTabsState?.delete?.(id);
        } catch (_) {}
        try {
          await globalThis.ensureReplyAttachments?.(id, details);
        } catch (_) {}
      }
    } catch (err) {
      globalThis.log?.warn?.({ err }, 'applySettingsToOpenComposers failed');
    }
  }
  /** Register the message listener that triggers applySettingsToOpenComposers. */
  function registerApplySettingsListener(fn) {
    try {
      browser.runtime.onMessage.addListener((msg) => {
        if (msg && msg.type === 'rwa:apply-settings-open-compose') {
          try {
            // Reload settings to ensure new replies honor the latest options
            if (typeof globalThis.App?.Composition?.reloadSettings === 'function') {
              globalThis.App.Composition.reloadSettings(browser).catch(() => {
                if (msg && msg.type === 'rwa:open-url' && typeof msg.url === 'string') {
                  try {
                    browser.tabs?.create?.({ url: msg.url, active: true });
                  } catch (_) {}
                  return Promise.resolve({ ok: true });
                }
              });
            }
          } catch (_) {}
          fn();
          return Promise.resolve({ ok: true });
        }
      });
    } catch (_) {}
  }
})();
