/**
 * Module contains environment related utils.
 * @module src/shared/utils/env
 */
import type { AnyObject, RunningMode } from '@sandbox/types';

import { LogLevel } from '../log';

export type Env = {
    browserLocale: string;
    defaultWindow?: Window | undefined;
    html: HTMLElement;
    isBrowser: boolean;
    isDarkTheme: boolean;
    isDevelopment: boolean;
    isProduction: boolean;
    logLevel: LogLevel;
    portal: HTMLDivElement;
    runningMode: RunningMode;
    tokens: {
        tmdb: string;
    }
};

/**
 * Indicates whether the `theme` is set to dark or not.
 * @function
 * @category env
 * @returns {boolean}
 *  returns `true` if is in dark mode.
 */
const isDarkTheme = (): boolean => window.matchMedia('(prefers-color-scheme: dark)').matches;

const isClient = typeof window !== 'undefined';

/**
 * Application running mode.
 * @readonly
 * @type {RunningMode}
 */
const runningMode: RunningMode = import.meta.env.MODE as RunningMode;

export const env: Env = {
    browserLocale: (navigator as AnyObject).browserLocale,
    defaultWindow: isClient
        ? window
        : undefined,
    /**
     * Refers to a current document `html` element.
     * @readonly
     * @type {HTMLElement}
     */
    html: document.documentElement,
    /**
     * True if runs in browser environment.
     * @readonly
     * @type {boolean}
     */
    isBrowser: Boolean(
        typeof window !== 'undefined'
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            && window.document
            && window.document.createElement
    ),
    /**
     * Refers true if dark theme is enabled,
     * @readonly
     * @type {boolean}
     */
    isDarkTheme: isDarkTheme(),
    /**
     * Equals `true` is running in development mode.
     * @readonly
     * @type {boolean}
     */
    isDevelopment: import.meta.env.DEV,
    /**
     * Equals `true` is running in production mode.
     * @readonly
     * @type {boolean}
     */
    isProduction: import.meta.env.PROD,
    /**
     * Current logger level mode.
     * @readonly
     * @type {LogLevel}
     */
    logLevel: (() => {
        let logLevel: LogLevel = LogLevel.ERROR;

        if (runningMode === 'test') {
            logLevel = LogLevel.SILENT;
        }

        if (runningMode === 'development') {
            logLevel = LogLevel.DEBUG;
        }

        return logLevel;
    })(),
    /**
     * Root portal container.
     * @readonly
     * @type {HTMLDivElement}
     */
    portal: document.getElementById('portal')! as HTMLDivElement,
    /**
     * App running mode.
     * @readonly
     * @type {string}
     */
    runningMode,
    /**
     * Application tokens.
     * @type {Object}
     */
    tokens: {
        /**
         * TMDB token.
         * @readonly
         * @type {string}
         */
        tmdb: import.meta.env.TMDB_TOKEN
    }
};
