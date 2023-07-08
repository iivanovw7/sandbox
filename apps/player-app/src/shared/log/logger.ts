/**
 * Module contains logger.
 * @module src/shared/log/logger
 */

import type { LogLevelDesc, LogLevel as LogLevelOptions, Logger } from 'loglevel';
import logger from 'loglevel';

/**
 * Log messages map.
 * @readonly
 * @enum {LogLevelDesc}
 */
export const LogLevel = {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
    SILENT: 'silent',
    TRACE: 'trace',
    WARN: 'warn',
} as const satisfies { [Key in keyof LogLevelOptions]: LogLevelDesc };

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

/**
 * Disables all logging below the given level.
 * @param {LogLevelDesc} level - log level.
 */
export const setLogLevel = (level: LogLevelDesc): void => {
    logger.setLevel(level);
};

/**
 * Creates new logger object.
 * @param {string} [loggerName=''] - new logger name.
 * @returns {Object} new logger object.
 */
export const getLogger = (loggerName: string): Logger => logger.getLogger(loggerName || '');
