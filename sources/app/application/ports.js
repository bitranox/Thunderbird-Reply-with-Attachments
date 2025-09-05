/*
 * Module: app/application/ports.js
 * Purpose: Define small, explicit port contracts (JSDoc typedefs) used by
 *          the application layer. Adapters (e.g., Thunderbird APIs) provide
 *          concrete implementations in app/adapters/*, and the composition
 *          root wires them together.
 * Notes: These typedefs are for documentation and IDE help; they have no
 *        runtime cost and keep the application layer framework‑free.
 */

/** @typedef {{ id: number }} TabLike */

/**
 * @typedef {object} ComposePort
 * @property {(tabId: number) => Promise<any>} getDetails
 * @property {(tabId: number) => Promise<Array<{ name?: string, fileName?: string }>>} listAttachments
 * @property {(tabId: number, att: { file: File|Blob }) => Promise<void>} addAttachment
 * @property {{ addListener: (fn: (tab: number|TabLike, details?: any) => void) => void }} onStateChanged
 * @property {{ addListener?: (fn: (tab: number|TabLike, details?: any) => Promise<object>|object) => void }} [onBeforeSend]
 */

/**
 * @typedef {object} MessagesPort
 * @property {(messageId: number) => Promise<Array<{ name?: string, fileName?: string, partName: string, contentType?: string, contentDisposition?: string, contentId?: string }>>} listAttachments
 * @property {(messageId: number, partName: string) => Promise<File|Blob|null>} getAttachmentFile
 */

/**
 * @typedef {object} SessionsPort
 * @property {(tabId: number, key: string) => Promise<any>} getTabValue
 * @property {(tabId: number, key: string, value: any) => Promise<void>} setTabValue
 * @property {(tabId: number, key: string) => Promise<void>} removeTabValue
 */

/**
 * @typedef {object} TabsPort
 * @property {{ addListener: (fn: (tabId: number|TabLike) => void) => void }} onRemoved
 * @property {(tabId: number, payload: any) => Promise<any>} sendMessage
 */

/**
 * @typedef {object} ScriptingComposePort
 * @property {(scripts: Array<{ id: string, js: string[] }>) => Promise<void>} registerScripts
 * @property {() => Promise<Array<{ id: string }>>} getRegisteredScripts
 * @property {(ids: string[]) => Promise<void>} unregisterScripts
 * @property {(tabId: number, files: string[]) => Promise<void>} executeScript
 */

/** @typedef {(tabId: number, selected: Array<{ name: string }>) => Promise<boolean>} ConfirmFn */

// Publish namespace for discoverability in the global App.* space.
globalThis.App = globalThis.App || {};
App.Ports = {};

