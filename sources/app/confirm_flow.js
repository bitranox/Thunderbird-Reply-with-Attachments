/*
 * Module: app/confirm_flow.js
 * Purpose: Ask the user whether to copy the attachments, and report the answer.
 *          Owns the whole interaction: injecting the in-compose dialog, the
 *          targeted -> broadcast -> popup fallback chain, the popup window and
 *          its token protocol, and what an unanswered popup means.
 * Design:  Split out of the composition root, which should say what is wired to
 *          what rather than carry the branchiest logic in the add-on.
 * Loaded:  by background.html, before app/composition.js.
 */
(function () {
  /**
   * A backstop against a popup that never answers (closed window, lost content
   * script), NOT a decision deadline: a person reading a file list, checking the
   * original mail and switching windows can easily need a minute.
   */
  const CONFIRM_TIMEOUT_MS = 120000;

  /** @type {Set<number>} Tabs where the confirm content script has been injected */
  const injectedConfirmScriptTabs = new Set();

  /**
   * Report a problem without letting the reporting itself throw.
   * Defined per script because each one is loadable on its own (the tests do
   * exactly that); it is a logging guard, not a rule that could drift.
   * @param {...unknown} args
   */
  function warnSafe(...args) {
    try {
      console.warn('[RWA]', ...args);
    } catch (_) {
      // a logger must never break the caller
    }
  }

  /**
   * Ensure the confirm content script is injected into the target compose tab.
   * @param {number} tabId
   * @param {any} scriptingCompose
   * @param {{debug?:Function,info?:Function,warn?:Function,error?:Function}} [logger]
   */
  async function ensureConfirmInjected(tabId, scriptingCompose, logger = console) {
    const emitDebug = (payload, message) => {
      try {
        logger.debug?.(payload, message);
      } catch (_) {
        // a logger must never break the caller
      }
      try {
        globalThis.log?.debug?.(payload, message);
      } catch (_) {
        // a logger must never break the caller
      }
    };
    try {
      if (injectedConfirmScriptTabs.has(tabId)) {
        emitDebug({ tabId }, 'ensureConfirmInjected: already injected');
        return;
      }
      await scriptingCompose.executeScript?.(tabId, ['content/confirm.js']);
      injectedConfirmScriptTabs.add(tabId);
      emitDebug({ tabId }, 'ensureConfirmInjected: script executed');
    } catch (err) {
      try {
        logger.debug({ err, tabId }, 'ensureConfirmInjected failed');
      } catch (_) {
        // a logger must never break the caller
      }
      emitDebug({ tabId, err }, 'ensureConfirmInjected: executeScript error');
    }
  }
  /** Ask the user via content script; fall back progressively if needed. */
  /**
   * Ask the user via targeted tab → broadcast → popup fallback.
   * @param {{files:string[], def:'yes'|'no'}} opts
   */
  /**
   * @param {{files:string[], def:'yes'|'no'}} opts
   * @param {any} [logger]
   */
  async function askUserForConfirmation({ files, def }, tabId, browser, tabs, logger) {
    const payload = { type: 'rwa:confirm-add', files, def };
    const targeted = await tryTargetedConfirm(tabs, tabId, payload);
    if (isDecision(targeted)) return targeted.ok;
    const broadcast = await tryBroadcastConfirm(browser, payload);
    if (isDecision(broadcast)) return broadcast.ok;
    return await askInPopup(browser, files, def, logger);
  }
  /** Try targeted tab messaging; return decision or null on error. */
  async function tryTargetedConfirm(tabs, tabId, payload) {
    try {
      return await tabs.sendMessage(tabId, payload);
    } catch (_) {
      return null;
    }
  }
  /** Try runtime broadcast; return decision or null on error. */
  async function tryBroadcastConfirm(browser, payload) {
    try {
      return await browser.runtime?.sendMessage?.(payload);
    } catch (_) {
      return null;
    }
  }
  /** Predicate: object has a boolean `ok` field (confirm/warn result). */
  function isDecision(x) {
    return x && typeof x.ok === 'boolean';
  }
  /** Last resort: open a small popup window to ask for confirmation. */
  async function askInPopup(browser, files, def, logger) {
    try {
      const token = Math.random().toString(36).slice(2);
      const url = buildConfirmUrl(browser, token, files, def);
      const result = waitForConfirm(browser, token);
      const win = await browser.windows?.create?.({
        url,
        type: 'popup',
        width: 520,
        height: 180,
        focused: true,
      });
      try {
        if (win && typeof win.id === 'number')
          await browser.windows?.update?.(win.id, { focused: true });
      } catch (e) {
        warnSafe('could not focus the confirmation popup', e);
      }
      return resolveConfirmOutcome(await result, def, files);
    } catch (err) {
      try {
        logger?.warn?.({ err }, 'askInPopup failed');
      } catch (_) {
        // a logger must never break the caller
      }
      return false;
    }
  }
  /** Build confirm.html URL with query parameters. */
  function buildConfirmUrl(browser, token, files, def) {
    const base =
      (browser.runtime?.getURL && browser.runtime.getURL('confirm.html')) || 'confirm.html';
    const count = files.length;
    const list = files.slice(0, 5).join(', ');
    const more = count > 5 ? String(count - 5) : '';
    const q = new URLSearchParams({ t: token, c: String(count), list, more, def: def || 'yes' });
    return `${base}?${q.toString()}`;
  }
  // matchBlacklist and warnBlacklisted are defined inside createAppWiring to access settings
  /**
   * Wait for the popup page to send its decision back via runtime messaging.
   *
   * Resolves a tri-state rather than a boolean so the caller can tell "the user
   * said no" from "nobody answered". Collapsing the two silently dropped the
   * attachments while the user believed they had been added.
   * @returns {Promise<'yes'|'no'|'timeout'>}
   */
  function waitForConfirm(browser, token) {
    return new Promise((resolve) => {
      const stopListening = () => {
        try {
          browser.runtime.onMessage.removeListener(listener);
        } catch (_) {
          // best-effort teardown; a listener that is already gone is fine
        }
      };
      const listener = (msg) => {
        if (!msg || msg.type !== 'rwa:confirm-result' || msg.t !== token) return;
        stopListening();
        resolve(msg.ok ? 'yes' : 'no');
      };
      browser.runtime.onMessage.addListener(listener);
      setTimeout(() => {
        stopListening();
        resolve('timeout');
      }, CONFIRM_TIMEOUT_MS);
    });
  }

  /**
   * Resolve an unanswered confirmation against the user's configured default.
   * @param {'yes'|'no'|'timeout'} outcome
   * @param {'yes'|'no'} def The "Default answer" setting from the options page
   * @param {string[]} files
   */
  function resolveConfirmOutcome(outcome, def, files) {
    if (outcome !== 'timeout') return outcome === 'yes';
    const fallback = def !== 'no';
    console.warn(
      `[RWA] the confirmation popup went unanswered for ${CONFIRM_TIMEOUT_MS / 1000}s; ` +
        `applying the configured default (${def || 'yes'}) to ${files.length} file(s)`
    );
    return fallback;
  }

  /**
   * Forget a closed compose tab: its content script died with it, so the next
   * compose in a recycled tab id must be injected again.
   * @param {number} tabId
   */
  function forgetTab(tabId) {
    injectedConfirmScriptTabs.delete(tabId);
  }

  globalThis.App = globalThis.App || {};
  App.ConfirmFlow = {
    CONFIRM_TIMEOUT_MS,
    ensureConfirmInjected,
    askUserForConfirmation,
    tryTargetedConfirm,
    tryBroadcastConfirm,
    isDecision,
    askInPopup,
    buildConfirmUrl,
    waitForConfirm,
    resolveConfirmOutcome,
    forgetTab,
  };

  try {
    const __TEST__ = !!(
      globalThis.process &&
      globalThis.process.env &&
      globalThis.process.env.NODE_ENV === 'test'
    );
    if (__TEST__) globalThis.injectedConfirmScriptTabs = injectedConfirmScriptTabs;
  } catch (_) {
    // test-only hook; absent outside the test runner
  }
})();
