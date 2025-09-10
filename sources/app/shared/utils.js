/*
 * Module: app/shared/utils.js
 * Purpose: Shared helpers used across background/composition/tests.
 * Exposes: App.Shared = { toNumericId, makeLogger }
 */
(function () {
  /**
   * Convert a value that may be a number or `{ id:number }` into a numeric tab id.
   * @param {number|{id:number}|any} v
   * @returns {number|null} The numeric id or `null` if not resolvable.
   */
  function toNumericId(v) {
    return typeof v === 'number' ? v : v && typeof v.id === 'number' ? v.id : null;
  }
  /**
   * Coerce a value to 'yes' | 'no'. Any value other than a case‑insensitive 'no'
   * maps to 'yes'. Undefined/empty defaults to 'yes'.
   * @param {any} v
   * @returns {'yes'|'no'}
   */
  function yesNo(v) {
    return String(v ?? 'yes').toLowerCase() === 'no' ? 'no' : 'yes';
  }
  /**
   * Create a simple logger wrapper that prefixes messages and optionally mutes debug.
   * Intent: provide consistent logging without pulling a logging library.
   * @param {boolean} enabled When false, `debug` becomes a no-op; others always log.
   * @returns {{debug:Function,info:Function,warn:Function,error:Function}}
   */
  function makeLogger(enabled) {
    const wrap =
      (fn) =>
      (...args) => {
        try {
          if (fn === console.debug && !enabled) return;
          fn('[RWA]', ...args);
        } catch (_) {}
      };
    return {
      debug: wrap(console.debug.bind(console)),
      info: wrap(console.info.bind(console)),
      warn: wrap(console.warn.bind(console)),
      error: wrap(console.error.bind(console)),
    };
  }
  globalThis.App = globalThis.App || {};
  App.Shared = { toNumericId, makeLogger, yesNo };
})();
