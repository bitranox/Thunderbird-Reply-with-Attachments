/*
 * Ambient declarations for the globals this add-on shares between its scripts.
 *
 * The add-on is loaded as classic scripts (see sources/background.html), so the
 * layers publish themselves on `globalThis.App` instead of exporting. TypeScript
 * cannot infer that from an assignment, so the shape is declared here and
 * `tsc --noEmit` checks every call site against it.
 *
 * Keep this in step with what the modules actually publish. A mismatch here is a
 * type error at the call site, which is the point.
 */

import type {
  ComposeAttachPort,
  ComposePort,
  MessagesPort,
  SessionsPort,
  TabsPort,
  ScriptingComposePort,
  ConfirmFn,
} from '../sources/app/application/ports.js';

type Attachmentish = {
  name?: string;
  fileName?: string;
  partName?: string;
  contentType?: string;
  contentId?: string;
  contentDisposition?: string;
};

/**
 * The loggers in this codebase are duck-typed: console, the shared factory, and
 * the test doubles all satisfy it, and every call site optional-chains the member.
 */
type Logger = {
  debug?: Function;
  info?: Function;
  warn?: Function;
  error?: Function;
};

declare global {
  /** Published by sources/app/domain/filters.js. */
  interface AppDomain {
    lower(value: unknown): string;
    normalizedName(att: Attachmentish): string;
    isSmime(att: Attachmentish): boolean;
    isImage(att: Attachmentish): boolean;
    stripAngleBrackets(value: unknown): string;
    collectInlineCids(html: string): Set<string>;
    isReferencedInline(att: Attachmentish, inlineCids?: Set<string>): boolean;
    isInlineImage(att: Attachmentish, inlineCids?: Set<string>): boolean;
    isInlineDisposition(att: Attachmentish): boolean;
    includeStrict(att: Attachmentish, inlineCids?: Set<string>): boolean;
    includeRelaxed(att: Attachmentish, inlineCids?: Set<string>): boolean;
    globToRegExp(glob: string): RegExp;
    makeNameExcluder(patterns: string[]): (name: string) => boolean;
  }

  /** Published by sources/app/application/usecases.js. */
  interface AppUseCases {
    createProcessReplyAttachments(deps: {
      compose: ComposeAttachPort;
      messages: MessagesPort;
      shouldExclude?: (name: string) => boolean;
      confirm?: ConfirmFn;
      warn?: (tabId: number, rows: Array<{ name: string; pattern: string }>) => Promise<void>;
      warnOnBlacklist?: boolean;
      matchBlacklist?: ((name: string) => string[]) | null;
      logger?: Logger;
      attachmentsRetry?: { attempts?: number; delayMs?: number };
    }): (tabId: number, messageId: string | number) => Promise<number>;

    createEnsureReplyAttachments(deps: {
      compose: ComposePort;
      messages: MessagesPort;
      sessions: SessionsPort;
      state: Map<number, { stage: 'processing' | 'done'; messageId: string | number | null }>;
      sessionKey: string;
      shouldExclude?: (name: string) => boolean;
      confirm?: ConfirmFn;
      warn?: (tabId: number, rows: Array<{ name: string; pattern: string }>) => Promise<void>;
      warnOnBlacklist?: boolean;
      matchBlacklist?: ((name: string) => string[]) | null;
      logger?: Logger;
      attachmentsRetry?: { attempts?: number; delayMs?: number };
    }): (tabId: number, details: unknown) => Promise<void>;

    /** Ceilings on what one reply will copy. */
    COPY_LIMITS: { maxCount: number; maxTotalBytes: number };
  }

  /** Published by sources/app/adapters/thunderbird.js. */
  interface AppAdapters {
    makeThunderbirdPorts(browser: unknown): {
      compose: ComposePort;
      messages: MessagesPort;
      sessions: SessionsPort;
      tabs: TabsPort;
      scriptingCompose: ScriptingComposePort;
    };
  }

  /** Published by sources/app/shared/utils.js. */
  interface AppShared {
    toNumericId(value: unknown): number | null;
    makeLogger(enabled: boolean): {
      debug: Function;
      info: Function;
      warn: Function;
      error: Function;
    };
    yesNo(value: unknown): 'yes' | 'no';
  }

  /** Published by sources/app/confirm_flow.js. */
  interface AppConfirmFlow {
    CONFIRM_TIMEOUT_MS: number;
    ensureConfirmInjected(tabId: number, scriptingCompose: unknown, logger?: Logger): Promise<void>;
    askUserForConfirmation(
      opts: { files: string[]; def: 'yes' | 'no' },
      tabId: number,
      browser: unknown,
      tabs: TabsPort,
      logger?: Logger
    ): Promise<boolean>;
    tryTargetedConfirm(tabs: TabsPort, tabId: number, payload: unknown): Promise<any>;
    tryBroadcastConfirm(browser: unknown, payload: unknown): Promise<any>;
    isDecision(value: unknown): boolean;
    askInPopup(
      browser: unknown,
      files: string[],
      def: 'yes' | 'no',
      logger?: Logger
    ): Promise<boolean>;
    buildConfirmUrl(browser: unknown, token: string, files: string[], def: 'yes' | 'no'): string;
    waitForConfirm(browser: unknown, token: string): Promise<'yes' | 'no' | 'timeout'>;
    resolveConfirmOutcome(
      outcome: 'yes' | 'no' | 'timeout',
      def: 'yes' | 'no',
      files: string[]
    ): boolean;
    forgetTab(tabId: number): void;
  }

  /** Published by sources/app/composition.js. */
  interface AppComposition {
    createAppWiring(browser: unknown): {
      ensureReplyAttachments: (tabId: number, details: unknown) => Promise<void>;
      processedTabsState: Map<number, unknown>;
      SESSION_KEY: string;
      reloadSettings: () => Promise<void>;
    };
    reloadSettings?: () => Promise<void>;
    /** Small internals exposed for focused unit tests only. */
    Internal?: Record<string, unknown>;
  }

  /**
   * Every member is optional: each script publishes its own slice with the
   * `globalThis.App = globalThis.App || {}` idiom, so at any given moment only
   * the already-loaded layers are present. Load order is fixed by background.html.
   */
  interface AppNamespace {
    Domain?: AppDomain;
    UseCases?: AppUseCases;
    Adapters?: AppAdapters;
    Shared?: AppShared;
    ConfirmFlow?: AppConfirmFlow;
    Composition?: AppComposition;
    /** Published by sources/content/confirm.js inside the compose document. */
    ContentConfirm?: { Internal?: Record<string, unknown> };
  }

  // eslint-disable-next-line no-var
  var App: AppNamespace;

  /** Published by sources/shared_link_opener.js for the handle_*_link.js scripts. */
  // eslint-disable-next-line no-var
  var RWA_LinkOpener: {
    openHref(anchor: HTMLElement | null, event: Event): void;
    bindOnReady(...ids: string[]): void;
  };

  /** Optional global logger mirror installed by background.js when debugging. */
  // eslint-disable-next-line no-var
  var log: Logger | undefined;
}

export {};
