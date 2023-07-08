/**
 * Module contains application logger public API.
 * @module src/shared/log
 */
import { LogLevel, getLogger, setLogLevel } from './logger';

setLogLevel(LogLevel.DEBUG);

export { LogLevel, getLogger, setLogLevel };
