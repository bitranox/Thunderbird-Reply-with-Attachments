/*
 * Module: app/application/ports.js
 * Purpose: Define small, explicit port contracts (JSDoc typedefs) used by
 *          the application layer. Adapters (e.g., Thunderbird APIs) provide
 *          concrete implementations in app/adapters/*, and the composition
 *          root wires them together.
 * Notes: Types only. This file is never loaded at runtime - sources/background.html
 *        lists every script and this is not one of them - so it carries no runtime
 *        cost and keeps the application layer framework-free. It is a module so
 *        `tsc --checkJs` can resolve the `import('./ports.js')` references used
 *        throughout the application layer.
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
 * The slice of the compose surface the attachment copy step needs. Kept separate
 * from ComposePort so a caller that only copies files does not have to fake the
 * details/event members it never uses.
 * @typedef {object} ComposeAttachPort
 * @property {(tabId: number) => Promise<Array<{ name?: string, fileName?: string }>>} listAttachments
 * @property {(tabId: number, att: { file: File|Blob }) => Promise<void>} addAttachment
 */

/**
 * @typedef {object} MessagesPort
 * @property {(messageId: number) => Promise<Array<{ name?: string, fileName?: string, partName: string, contentType?: string, contentDisposition?: string, contentId?: string }>>} listAttachments
 * @property {(messageId: number, partName: string) => Promise<File|Blob|null>} getAttachmentFile
 * @property {(messageId: number) => Promise<Array<{ contentType?: string, content?: string }>>} [listInlineTextParts]
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

export {};
