/**
 * Module contains application configuration data.
 * @module src/shared/config/data
 */
import { mergeRight } from 'ramda';

import { LogLevel } from '../log/logger';

export type TConfigEnv = {
    reconfig?: {
        logLevel?: LogLevel;
    }
};

/**
 * Combines fallback config data with overrides.
 * @param {TConfigEnv} env - current environment.
 * @returns {Object} application configuration.
 */
export const getConfig = (env: TConfigEnv) => {
    const config = {
        /**
         * Log level, can be set to below options:
         *  - error [default, only errors]
         *  - debug [all levels]
         *  - off   [no logging]
         * @type {LogLevelDesc}
         */
        logLevel: LogLevel.DEBUG,
        /**
         * Network config.
         * @type {Object}
         */
        net: {
            /**
             * Default request timeout.
             * @type {number}
             */
            requestTimeout: 20000,
            /**
             * Base the movie db API image url.
             * @type {string}
             */
            tmdbImageUrl: 'https://image.tmdb.org',
            /**
             * Base the movie db API url.
             * @type {string}
             */
            tmdbUrl: 'https://api.themoviedb.org/3',
        },
        ui: {
            billboard: {
                /**
                 * Billboard play delay in `ms`.
                 * @type {number}
                 */
                playDelay: 20000,
            },
            /**
             * Debounce delay in `ms`.
             * @type {number}
             */
            debounce: 300,
            /**
             * Throttle delay in `ms`.
             * @type {number}
             */
            throttle: 1000,
        }
    };

    return mergeRight(
        config,
        env.reconfig || {}
    );
};
